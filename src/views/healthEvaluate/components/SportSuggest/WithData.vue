<template>
	<div>
		<div style="padding-top:30px;"></div>
		<div class="sport_plan_header">
			<div class="sportImg_container"><img v-bind:src="require('@/assets/images/healthEvaluate/sport/sportIcon.png')"/></div>
			<div class="sport_title_text">您最近一周的有氧运动计划</div>
		</div>
		<div class="dayItem_container">
			<div class="dayItem" style="" v-for="dayItem in dayItemArray">
				<div class="sport_day_title sport_title_text">{{dayItem.WeekName ? dayItem.WeekName : dayItem}}
				</div>
				<img v-bind:src="dayItem.SportIcon ? dayItem.SportIcon : require('@/assets/images/healthEvaluate/sport/noSport.png')" style="width:30px; height:30px;" />
				<div class="sport_time_title sport_subtitle_text">{{dayItem.SportType ? (dayItem.SportTimeMin+'-'+dayItem.SportTimeMax) : '&nbsp;'}}
				</div>
				<div class="sport_subtitle_text">{{dayItem.SportType ? 'min' : '&nbsp;'}}</div>
			</div>
		</div>
		<div class="sport_plan_state sport_content_text" style="margin:10px; height: 0.3rem">按照上述安排进行锻炼，您本周可以通过运动消耗热量：<strong>{{suggestion.Calory}}</strong>Kcal，相当于减少脂肪：<strong>{{suggestion.Fat}}</strong>g
		</div>
		<div style="background-color: rgb(242,242,242); height: 10px; margin-top:15px;">
		</div>

		<div class="sport_title_text" style="height:32px; position:relative;">
			<div style="position:absolute; height:14px; padding-left:10px; top:8px;">运动流程</div>
		</div>
		<div style="background-color: rgb(242,242,242); height: 1px;">
		</div>
		<div class="sport_content_text">（1）准备活动：进行5分钟左右速度稍慢的快走，并活动全身关节 &#10;（2）主体部分：按照运动计划进行{{suggestion.SportContent}} &#10;（3）整体活动：
		 1）慢走3分钟（预防突然停止运动所导致的头晕、休克）
		 2）进行全身各大肌肉群的牵拉练习，每个动作保持20秒
		</div>
		<div style="background-color: rgb(242,242,242); height: 1px;">
		</div>
	</div>
</template>

<script>
export default {
  name: 'sport-suggest-child-data',
  props:['suggestion'],
  computed:{
		dayItemArray(){
			var originArray = this.suggestion.SportWeekPlanDetailList;

			var tempArray = new Array("周一","周二","周三","周四","周五","周六","周日");
			for (var i = 0; i < originArray.length; i++) {
				let dayItem = originArray[i];

				for (var j = 0; j < tempArray.length; j++) {
					if (tempArray[j] == dayItem.WeekName) {
						let splitArr = dayItem.SportIcon.split("/");
						let iconName = splitArr[splitArr.length-1];
						var tempItem = Object.assign({},dayItem);
						tempItem.SportIcon = require('@/assets/images/healthEvaluate/sport/' + iconName);
						tempArray.splice(j, 1, tempItem);
						
						break;
					}
				}
			}

			return tempArray;
		}
	}
}
</script>

<style scoped >
	.sport_title_text {
    color: rgb(51,51,51);
    font-size: 15px;
}

.sport_content_text {
    color: rgb(51,51,51);
    font-size: 14px;
	margin:15px 10px; 
	line-height:25px; 
	white-space:pre-wrap;
	text-align: left;
}

.sport_subtitle_text {
    color: rgb(102,102,102);
    font-size: 12px;
}

.sport_plan_header {
    height:40px;
    text-align: left;
}

.sport_plan_header .sport_title_text {
    display: inline-block;
    line-height: 40px;
}

.sport_plan_header .sportImg_container{
    display: inline-block;
    width: 32px;
    height:20px;
    text-align: center;
    vertical-align: middle;
    padding-left: 4px;
}

.sport_plan_header .sportImg_container img {
    width:20px;
    height:20px;
}

.dayItem_container .dayItem {
    display: inline-block;
    width: 14.28%;
    text-align: center;
}

.dayItem_container .dayItem .sport_day_title{
    line-height: 36px;
}

.dayItem_container .dayItem .sport_time_title{
    line-height: 16px;
    padding-top: 5px;
}

.sport_plan_state strong  {
    color:rgb(0, 141, 253);
}
</style>
