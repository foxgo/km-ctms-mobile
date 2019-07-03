<!-- 选项单元格组件 -->
<template>
    <div>
      <h4>{{ this.itemData.title }}</h4>
      <ul class="selections_ul">
        <li class="selectionButton_li" v-for="(answerItem,index) in itemData.answer" v-bind:key="index" v-bind:class="{active: answerItem.ItemCode == itemData.value || selectedCodesArr.indexOf(answerItem.ItemCode) > -1 }" @click="buttonClick(answerItem.ItemCode)">{{ answerItem.ItemName}}</li>
      </ul>
    </div>
</template>

<script>
    export default {
      name: "LifeHabitSelectionItem",
      props:[
        'itemData',     //数据元
        'indexInList',  //当前单元格在列表中的索引
        'maxItems'      //复选项最多个数
        ],
      data() {
        return {
          selectedCodesArr:[],
        }
      },
      watch:{
        itemData(val, oldVal){
          if (this.maxItems > 1) {
            this.selectedCodesArr = val.value;
            // console.log("values: "+val);
          }
        }
      },
      methods: {
        buttonClick(itemCode){
          //单选项
          if (this.maxItems == undefined || this.maxItems <= 1) {
            if (this.itemData.value == itemCode) {
              this.itemData.value = '-1';
            }else {
              this.itemData.value = itemCode;
            }
          }
          //多选项
          else{
            let index = this.selectedCodesArr.indexOf(itemCode);
            if (index > -1) {
              this.selectedCodesArr.splice(index, 1);
            }else if (this.selectedCodesArr.length < 3) {
              this.selectedCodesArr.push(itemCode);
            }
            this.itemData.value = this.selectedCodesArr;
          }          

          this.$emit("listenToItem",this.indexInList,this.itemData.value); 
        }
      }
    }
</script>

<style scoped>
div {
  width: 92%;
  margin: 0 auto;
  padding-top: 0.2rem;
}
div h4 {
  font-size: 0.4266666666666667rem;
  color: #333;
  text-align: left;
  line-height: 0.6rem;
  font-weight: normal;
}
.selections_ul {
  margin: 0;
  text-align: left;
  font-size: 0;
}
.selections_ul > li {
  display: inline-block;
  padding: 0 0.25rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #888;
  border: solid 1px #d5d5d5;
  text-align: center;
  font-size: 0.3733333333333333rem;
  border-radius: 0.4rem;
  position: relative;
  margin: 0.2rem 0.2rem 0.15rem 0;
  cursor: pointer;
}
.selections_ul > li:last-child {
  margin-right: 0;
}
.selections_ul > li.active {
  border: solid 1px #008dfd;
  color: #008dfd;
}
.selections_ul > li.active:before {
  content: '';
  width: 0.32rem;
  height: 0.32rem;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 1;
  background-color: #008dfd;
  border-radius: 50%;
}
.selections_ul > li.active:after {
  content: '';
  width: 0.2133333333333333rem;
  height: 0.1066666666666667rem;
  position: absolute;
  top: 1px;
  right: 1px;
  opacity: 1;
  border: 1px solid #fff;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
}
</style>
