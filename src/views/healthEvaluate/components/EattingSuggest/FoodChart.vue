<template>
	<div>
		<div class="food_recommend_text">您目前的体重指数：<strong>{{data.BMI}}</strong>kg/m²，属于<strong>{{data.BMIDescription}}</strong>。&#10;为您推荐每日饮食热量供给量： <strong>{{data.DietCalory}}</strong> kcal</div>
		<div class="chart_background">
			<div class="chart_item" v-for="(item,index) in percentList" v-bind:key="index" :class="{right_chart_item:index>2}">
				<img v-bind:src="item.image"></img>
				<div class="chart_item_title">{{item.title}}</div>
				<div class="chart_item_percent">{{item.percent + '%'}}</div>
			</div>
			<div class="chart_circle">
				<svg height="100%" width="100%">
					<circle cx="150" cy="70" r="55" fill="rgb(242,242,242)"/>
					<text x="150" y="70" fill="rgb(51,51,51)" textLength="50" style="font-size:25px; text-anchor:middle;">2800
						<tspan x="150" y="92" style="font-size:16px;">kcal</tspan>
					</text>
	    			<symbol>
	    				<circle id="circle_path" cx="150" cy="70" r="55"  stroke-width="20" stroke-dasharray="86.35 259.05" fill="none"/>'+
					</symbol>
					<use xlink:href="#circle_path" id="circle_path1" stroke="rgb(32,228,164)" stroke-dashoffset="0"/>
					<use xlink:href="#circle_path" id="circle_path2" stroke="rgb(149,188,12)" stroke-dashoffset="-12.78"/>
					<use xlink:href="#circle_path" id="circle_path3" stroke="rgb(220,103,17)" stroke-dashoffset="-25.56"/>
					<use xlink:href="#circle_path" id="circle_path4" stroke="rgb(230,174,28)" stroke-dashoffset="-70.46"/>
					<use xlink:href="#circle_path" id="circle_path5" stroke="rgb(200,51,129)" stroke-dashoffset="-90"/>
						// 补偿计算
					<use xlink:href="#circle_path" id="circle_path6" stroke="rgb(71,58,140)" stroke-dashoffset="-154"/>
					<use xlink:href="#circle_path" id="circle_path6" stroke="rgb(71,58,140)" stroke-dashoffset="86.35"/>
					<use xlink:href="#circle_path" id="circle_path6" stroke="rgb(71,58,140)" stroke-dashoffset="171"/>
					</svg>
				</div>
			</div>

		<div class="chart_background_after" ></div>
	</div>
</template>

<script>

export default {
  	name: 'recommend-food-chart',
  	props:['data'],
	computed:{
		percentList(){
			return [
						{title:"谷薯类",percent:this.data.Potato,image:require("@/assets/images/healthEvaluate/food/diet.png")},
						{title:"肉蛋类",percent:this.data.MeatEgg,image:require("@/assets/images/healthEvaluate/food/diet1.png")},
						{title:"豆奶类",percent:this.data.SoyMilk,image:require("@/assets/images/healthEvaluate/food/diet2.png")},
						{title:"蔬菜类",percent:this.data.Vegetables,image:require("@/assets/images/healthEvaluate/food/diet3.png")},
						{title:"水果类",percent:this.data.Fruits,image:require("@/assets/images/healthEvaluate/food/diet4.png")},
						{title:"油脂类",percent: this.data.Fats,image:require("@/assets/images/healthEvaluate/food/diet5.png")}
					];
		}
	},
}
</script>

<style scoped >
.food_recommend_text {
	font-size: 14px;
	color: rgb(51,51,51);
	line-height: 20px;
	padding-left: 10px;
	padding-top: 40px;
	/*white-space:pre-wrap;*/
}

.food_recommend_text strong {
    color:rgb(0, 141, 253);
}

.chart_background {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:column;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 150px;
    margin-top: 10px;
    margin-bottom: 10px;
    /*background: red;*/
}

.chart_background_after {
    height: 15px;
    width: 100%;
    background: rgb(242,242,242);
}

.chart_item {
    width: 100px;
    height: 50px;
    position: relative;
    /*background: green;*/
}

.right_chart_item {
    margin-left: calc(100% - 2*100px);
}

.chart_item div {
    height: 20px;
    color: rgb(51,51,51);
    line-height: 20px;
    font-size: 14px;
    position: absolute;
}

.chart_item img {
    width:28px;
    height:28px;
    left: 10px;
    top: calc((50px - 28px)/2);
    position: absolute;
}

.chart_item .chart_item_title {
    left: 42px;
    top: 8px;
}

.chart_item .chart_item_percent {
    left: 42px;
    top: 28px;
}

.chart_circle {
    width: 300px;
    height: 150px;

    flex: 1;
    text-align: center;
    margin-left: calc(-150px - 50%);
    margin-top: 10px;
}
</style>
