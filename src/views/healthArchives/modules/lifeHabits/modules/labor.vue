<template>
  <keep-alive>
    <div class="content-box smoking">
      <LifeHabitSelectionItem v-for="(item,index) in dataArr" :key="index" :itemData="item" :indexInList="index" :maxItems="index==dataArr.length-1 ? 3 : 1" v-on:listenToItem="itemEvent"></LifeHabitSelectionItem>
      <input type="submit" class="submit-btn" value="保存" v-on:click="setPersonSport"/>
    </div>
  </keep-alive>
</template>

<script>
import LifeHabitSelectionItem from "./components/LifeHabitSelectionItem"
import { getQuestionSelections,getPersonSport,postPersonSport } from "@/api/healthArchives"
import { Toast } from 'mint-ui'
import Vue from 'vue'

export default {
  name: "Labor",
  data() {
    return {
      dataArr :[
          { "id_key":"CM33.003",
            "key":"IsExercise",
            "title":"您的工作性质是?",
            "value":"-1"
          },
          { "id_key":"CM33.11",
            "key":"WeeklyExercise",
            "title":"您每周锻炼次数?",
            "value":"-1"
          },
          { "id_key":"CM33.12",
            "key":"ExerciseMinutes",
            "title":"平均每次锻炼时间?",
            "value":"-1"
          },
          { "id_key":"CM33.005",
            "key":"ExerciseState",
            "title":"您锻炼的自我感觉是?",
            "value":"-1"
          },
          { "id_key":"SportTemplate",
            "key":"SportTemplate",
            "title":"您经常进行的3种运动项目是?",
            "value":[]
          },
        ],
        LifeStyleID :"",
        exerciseModeArr :[], //经常进行的<=3项运动
        SportTemplates:[],
    }
  },
  components: {
      LifeHabitSelectionItem
  },
  mounted() {
    // this.$store.state.app.pageTitle = '体力活动与运动';
    this.loadSelectionData();
  },
  methods: {

    //根据指定id获取题目
    loadSelectionData(){
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

          that.getPersonSport();
        }else {
          Toast(response.data.ReturnMessage);
        }
      })
      .catch(function(error){
        Toast(error);
      });
    },

    //获取运动数据
    getPersonSport() {
      let that = this;
      getPersonSport()
      .then(function (response) {
        if (response.data.IsSuccess === true) {
          let getData = response.data.ReturnData;

          that.LifeStyleID = getData.LifeStyleID;
          for (var i = 0; i < that.dataArr.length; i++) {
            var itemData = that.dataArr[i];

            if (i < that.dataArr.length-1) {
              let key = itemData.key;
              if (getData[key] != null) {
                itemData.value = getData[key];
              }
            }else{
              var exerciseModeValueArr = new Array();
              let value = getData.ExerciseMode;
              let value2 = getData.ExerciseMode2;
              let value3 = getData.ExerciseMode3;
              if (value != null) { exerciseModeValueArr.push(value+''); }
              if (value2 != null) { exerciseModeValueArr.push(value2+''); }
              if (value3 != null) { exerciseModeValueArr.push(value3+''); }
              itemData.value = exerciseModeValueArr;
            }

            Vue.set(that.dataArr,i,Object.assign({},itemData,{"value":itemData.value}));
          }
        }else {
          Toast(response.data.ReturnMessage);
        }
      })
    },

    //提交运动数据
    setPersonSport() {
      let that = this;
      var upData = new Object();
      for(var i = 0, length1 = this.dataArr.length; i < length1-1; i++){
        let item = this.dataArr[i];
        let key = item.key;
        let value = item.value;
        if (value != -1) {
          upData[key] = value;
        }
      }
      //经常进行的3种运动项目
      let lastItemData = this.dataArr[this.dataArr.length-1];
      let valueArr = lastItemData.value;
      let exerciseModeTitleArr = ["ExerciseMode","ExerciseMode2","ExerciseMode3"];
      for(var i = 0, length1 = valueArr.length; i < length1; i++){
        let key = exerciseModeTitleArr[i];
        upData[key] = valueArr[i];
      }

      if (Object.getOwnPropertyNames(upData).length <= 0) {
        Toast('请至少选择一项'); return;
      }

      upData.LifeStyleID = this.LifeStyleID;
      postPersonSport(upData)
      .then(function (response) {
        if (response.data.IsSuccess === true) {
          Toast("保存成功！");
        }else {
          Toast(response.data.ReturnMessage);
        }
      })
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
  .pc-box {
    width: 4.44rem;
    text-align: right;
    float: right;
    font-size: 0.4rem;
    height: 0.7733333333333333rem;
    line-height: 0.7733333333333333rem;
    border: solid 1px #d5d5d5;
    outline: none;
    border-radius: 4px;
    color: #333;
  }
</style>
