<template>
	<div>
		<div class="categary_list">
        	<div class="categary_cell" v-for="(cellItem,index) in foodCategarylist" v-bind:key="index">
            	<div class="food_categary_subtitle">{{cellItem.title}}</div>
            	<div class="food_categary_content">
               		<div class="food_categary_item" v-for="item in cellItem.contents">
                    	<img v-bind:src="item.image" style="width:40px; height:40px;"></img><br/>
                    	<span >{{item.subtitle}}</span><span style="color:rgb(0, 141, 253);">{{item.amount}}</span><span>{{item.unit}}</span>
               	 	</div>
            	</div>
        	</div>
    	</div>
    	<div class="red_tips">*每日食盐摄入量<6g，水1500-1700毫升 &#10;*饮食方案仅适用于正常成年人</div>
	</div>
</template>

<script>
export default {
  name: 'common-food-categary',
  props:['data'],
  computed:{
    	foodCategarylist(){
 			let tempArr = [];
 			let titleArr = [
							{
                                title:"谷薯类",
                                contents:[
                                    {subtitle:"大米",key:"Rice",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/rice1.png")}, 
                                    {subtitle:"馒头",key:"SteamedBun",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/rice2.png")},
                                    {subtitle:"红薯",key:"Potato",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/rice3.png")}]},
							{
                                title:"肉蛋类",
                                contents:[
                                    {subtitle:"牛肉",key:"Meat",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/meat1.png")}, 
                                    {subtitle:"鸡蛋",key:"Egg",unit:"个",amount:"0",image:require("@/assets/images/healthEvaluate/food/meat2.png")}, 
                                    {subtitle:"鱼",key:"Fish",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/meat3.png")}]},
							{
                                title:"豆奶类",
                                contents:[
                                    {subtitle:"牛奶",key:"Milk",unit:"ml",amount:"0",image:require("@/assets/images/healthEvaluate/food/milk1.png")}, 
                                    {subtitle:"南方豆腐",key:"Tofu",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/milk2.png")}, 
                                    {subtitle:"豆腐干",key:"DriedTofu",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/milk3.png")}]},
							{
                                title:"蔬菜类",
                                contents:[
                                    {subtitle:"番茄",key:"ChineseCabbage",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/vegetables1.png")}, 
                                    {subtitle:"南瓜",key:"Pumpkin",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/vegetables2.png")}, 
                                    {subtitle:"胡萝卜",key:"Carrot",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/vegetables3.png")}]},
							{
                                title:"水果类",
                                contents:[
                                    {subtitle:"苹果",key:"Apple",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/fruits1.png")}, 
                                    {subtitle:"香蕉",key:"Banana",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/fruits2.png")}, 
                                    {subtitle:"西瓜",key:"Watermelon",unit:"两",amount:"0",image:require("@/assets/images/healthEvaluate/food/fruits3.png")}]},
							{
                                title:"油脂类",
                                contents:[
                                    {subtitle:"各种动植物油",key:"Oil",unit:"汤匙(10g每汤匙)",amount:"0",image:require("@/assets/images/healthEvaluate/food/grease.png")}]}
 							];

 			for (var i = 0; i < titleArr.length; i++) {
 				let item = titleArr[i];
 				let contents = item.contents;
 				
 				for(var j = 0; j < contents.length; j++){
 					let keyString = contents[j].key;
 					contents[j].amount = this.data[keyString];
 				}
 			}

 			return titleArr;
    	}
    }
}
</script>

<style scoped >
	.categary_list::before {
    content:"常见食物举例";
    height: 36px;
    line-height: 36px;
    color: rgb(51,51,51);
    font-size: 15px;
    padding-left: 10px;
}

.categary_cell .food_categary_subtitle {
    padding-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: black;
    border: 1px rgb(242,242,242) solid;
    height: 32px;
    line-height: 32px;
    text-align: left;
}

.categary_cell .food_categary_content {
    /*height: 60px;*/
    /*width: 100%;*/
    /*background: red;*/
}

.categary_cell  .food_categary_content .food_categary_item {
    display: inline-block;
    width: 33.33%;
    text-align: center;
    color: rgb(51,51,51);
    font-size: 14px;
    line-height: 20px;
    padding-top: 10px;
    padding-bottom: 6px;
}

.red_tips {
    color: #d91f1f;
    font-size: 14px;
    line-height: 20px;
    padding:8px 10px;
    border: 1px solid rgb(242,242,242);
    border-width:1px 0;
    white-space:pre-wrap;
    text-align: left;;
}
</style>
