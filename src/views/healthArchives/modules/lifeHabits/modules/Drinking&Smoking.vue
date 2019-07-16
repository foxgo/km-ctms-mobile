<template>
  <keep-alive>
    <div class="content-box" v-cloak>
      <LifeHabitSelectionItem 
        v-for="(item,index) in dataArr" 
        :key="index" 
        :itemData="item" 
        :indexInList="index" 
        v-on:listenToItem="itemEvent">
      </LifeHabitSelectionItem>
      <input type="submit" class="submit-btn" value="保存" v-on:click="setSavePersonDrink" />
    </div>
  </keep-alive>
    
</template>

<script>
import LifeHabitSelectionItem from "./components/LifeHabitSelectionItem"
import { getQuestionSelections,getPersonSmokeDrink,postPersonSmokeDrink } from "@/api/healthArchives"
import { Toast } from 'mint-ui'
import Vue from 'vue'

export default {
  name: "drinkingSmoking",
  data() {
    return {
      dataArr :[
        { "id_key":"CM37.15",
          "key":"IsSmoking",
          "title":"你吸烟吗?",
          "value":"-1"
        },
        { "id_key":"CM33.002",
          "key":"IsDrink",
          "title":"您饮酒吗?",
          "value":"-1"
        },
        { "id_key":"CM33.13",
          "key":"WeeklyDrink",
          "title":"您平均每周喝几次酒?",
          "value":"-1"
        },
        { "id_key":"CM37.11",
          "key":"SpiritDailyDrink",
          "title":"您平均每次喝多少量？(只填写您常喝的酒类) 白酒",
          "value":"-1"
        },
        { "id_key":"CM37.12",
          "key":"YellowWineDailyDrink",
          "title":"您平均每次喝多少量？(只填写您常喝的酒类) 黄酒",
          "value":"-1"
        },
        { "id_key":"CM37.13",
          "key":"RedWineDailyDrink",
          "title":"您平均每次喝多少量？(只填写您常喝的酒类) 红酒",
          "value":"-1"
        },
        { "id_key":"CM37.14",
          "key":"BeerDailyDrink",
          "title":"您平均每次喝多少量？(只填写您常喝的酒类) 啤酒",
          "value":"-1"
        }
      ],
      LifeStyleID :"",
      tempDataArr:[],
    }
  },
  components: {
    LifeHabitSelectionItem
  },
  mounted() {
    // this.$store.state.app.pageTitle = '吸烟饮酒';
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

          that.getSavePersonDrink();
        }else{
          Toast(response.data.ReturnMessage);
        }
      })
      .catch(function(error){
        Toast(error);
      });
    },

    //获取吸烟饮酒数据
    getSavePersonDrink() {
      let that = this;
      getPersonSmokeDrink()
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

            that.tempDataArr = that.dataArr.slice(0, 7);
          }

          //从不饮酒或者已戒酒或者未选择
          if (parseInt(that.dataArr[1].value) > 1 || parseInt(that.dataArr[1].value) <= -1) {
            that.dataArr.splice(2, 5);
          }
        }else{
          Toast(response.data.ReturnMessage);
        }
      })
      .catch(function(error){
        Toast(error);
      });
    },

    //提交吸烟饮酒数据
    setSavePersonDrink() {
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

      postPersonSmokeDrink(upData)
      .then(function(response){
        if (response.data.IsSuccess === true) {
          Toast("保存成功");
        } else{
          Toast(response.data.ReturnMessage);
        }
      })
      .catch(function(error){
        Toast(error);
      });
    },

    //选项点击事件
    itemEvent(indexInList,itemCode) {
      //选择从不饮酒或者已戒酒
      if (indexInList == 1 && (itemCode == 2 || itemCode == 3)) {
        //修改dataArr数据
        this.dataArr.splice(2, 5);
      }else if (indexInList == 1 && itemCode != 3) {
        this.dataArr = this.tempDataArr.slice(0, 7);
      }

    }
  }
}
</script>

<style scoped>

</style>
