<template>
	<div>
		<div v-if="typeof dietSuggestion == 'object' && !!dietSuggestion && dietSuggestion.WeightEnergy != null">
			<with-data :suggestionData="dietSuggestion" :suggestionDetailData="dietSuggestionDetail"></with-data>
		</div>
		<div v-else>
			<div class="suggetion_content_text" style="padding-top:10px;">
			&nbsp;&nbsp;为了科学的为您定制饮食计划，您需要完善您的健康档案信息。请完善您的<strong style="color:red;"> 身高、体重、体力活动 </strong>信息
			</div>
			<div class="noRecord_background"><div/></div>
			<div class="suggetion_content_text" style="text-align:center;">没有数据哦</div>
		</div>
		<br>
	</div>
</template>

<script>
import NoData from './NoData'
import WithData from './WithData'

export default {
  	name: 'eatting-suggest',
  	props:['suggestionData','suggestionDetailData'],
  	components:{ NoData,WithData },
  	computed: {
		dietSuggestion(){
			return this.suggestionData;
		},
		dietSuggestionDetail(){
			return this.suggestionDetailData;
		}
	},
}
</script>

<style scoped >
	.suggetion_content_text {
	    line-height: 22px;
	    padding-left: 10px;
	    padding-right: 10px;
	    color: rgb(51,51,51);
	    text-align: left;
	    font-size: 14px;
	}

	.noRecord_background {
    	text-align:center;
    	margin-top:40px;
	}

	.noRecord_background>div {
	    display: inline-block;
	    width:150px;
	    height:100px;
	    border-style:none;
	    background: url(../../../../assets/images/healthEvaluate/noRecord.png) no-repeat;
	    background-size:100% 100%;
	    -moz-background-size:100% 100%;
	    -webkit-background-size:100% 100%;
	}
</style>
