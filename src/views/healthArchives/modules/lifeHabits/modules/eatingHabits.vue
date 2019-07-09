<template>
  <keep-alive>
    <div class="content-box smoking">
      <LifeHabitSelectionItem v-for="(item,index) in dataArr" :key="index" :itemData="item" :indexInList="index" v-on:listenToItem="itemEvent"></LifeHabitSelectionItem>
      <input type="submit" class="submit-btn" value="保存" v-on:click="setPersonEatHabit" />
    </div>
  </keep-alive>
</template>

<script>
import LifeHabitSelectionItem from "./components/LifeHabitSelectionItem"
import { getQuestionSelections,getPersonEatHabit,postPersonEatHabit } from "@/api/healthArchives"
import { Toast } from 'mint-ui'
import Vue from 'vue'

export default {
  name: "EatingHabits",
  data() {
    return {
      dataArr :[
        { "id_key":"CM33.014",
          "key":"WeeklyVegetables",
          "title":"您一周会有几天吃新鲜蔬菜?",
          "value":"-1"
        },
        { "id_key":"CM33.015",
          "key":"DailyVegetables",
          "title":"每天大概吃多少?(1碟蔬菜约150g)",
          "value":"-1"
        },
        { "id_key":"CM33.016",
          "key":"WeeklyFruit",
          "title":"您一周会有几天吃新鲜水果?",
          "value":"-1"
        },
        { "id_key":"CM33.017",
          "key":"DailyFruit",
          "title":"每天大概吃多少?",
          "value":"-1"
        },
        { "id_key":"CM33.018",
          "key":"WeeklyMeat",
          "title":"您一周会有几天吃禽/瘦肉?",
          "value":"-1"
        },
        { "id_key":"CM33.019",
          "key":"DailyMeat",
          "title":"每天大概吃多少?(1碟荤菜约100g)",
          "value":"-1"
        },
        { "id_key":"CM33.006",
          "key":"DailySalt",
          "title":"每天食盐摄入量?(1啤酒盖盐约6g)",
          "value":"-1"
        }
      ],
      LifeStyleID :"",
    }
  },
  components: {
    LifeHabitSelectionItem
  },
  mounted() {
    // this.$store.state.app.pageTitle = '饮食习惯';
    this.getSelectionData();
  },
  methods: {
    //根据指定id获取题目
    getSelectionData(){
      let that = this;
      let upData = new Array();
      that.dataArr.forEach(function (value,i) {
        upData.push(value.id_key);
      });

      getQuestionSelections({"ItemTypes":upData})
      .then(function(response){
        if (response.data.IsSuccess === true) {
          let getData = response.data.ReturnData;
          for (var i = 0; i < that.dataArr.length; i++) {
            var itemData = that.dataArr[i];
            let idKey = itemData.id_key;
            Vue.set(that.dataArr,i,Object.assign({}, that.dataArr[i], {"answer":getData[idKey]}));
          }

          that.getEatHabit();
        }else {
          Toast(response.data.ReturnMessage);
        }
      })
      .catch(function(error){
        Toast(error);
      });
    },

    //获取饮食数据
    getEatHabit() {
      let that = this;
      getPersonEatHabit()
      .then(function(response){
        if (response.data.IsSuccess === true) {
          let getData = response.data.ReturnData;

          that.LifeStyleID = getData.LifeStyleID;
          for (var i = 0; i < that.dataArr.length; i++) {
            var itemData = that.dataArr[i];
            let key = itemData.key;
            if (getData[key] != null) {
              itemData.value = getData[key];
            }
            Vue.set(that.dataArr,i,itemData);
          }
        }else {
          Toast(response.data.ReturnMessage);
        }
      })
      .catch(function(error){
        Toast(error);
      });
    },

    //提交饮食数据
    setPersonEatHabit() {
      let that = this;
      var upData = new Object();
      for(var i = 0, length1 = this.dataArr.length; i < length1; i++){
        let item = this.dataArr[i];
        let key = item.key;
        let value = item.value;
        if (value != -1) {
          upData[key] = value;
        }
      }
      if (Object.getOwnPropertyNames(upData).length <= 0) {
        Toast('请至少选择一项'); return;
      }

      upData.LifeStyleID = this.LifeStyleID;
      postPersonEatHabit(upData)
        .then(function(response){
          if (response.data.IsSuccess === true) {
            Toast("保存成功");
          }else {
            Toast(response.data.ReturnMessage);
          }
        })
        .catch(function(error){
          Toast(error);
        });
    },

    //选项点击事件
    itemEvent(indexInList,itemCode) {
      console.log('indexInList==' + indexInList);
      console.log('itemCode==' + itemCode);
    }

  }
}
</script>

<style scoped>

</style>
