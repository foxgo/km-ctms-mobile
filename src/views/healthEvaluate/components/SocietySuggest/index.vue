<template>
	<div>
		<div v-if="suggestionData">
			<div class="suggetion_content_text" style="padding-top:40px;">&nbsp;&nbsp;&nbsp;&nbsp;{{suggestionData}}</div>
		</div>
		<div v-else>
			<div class="suggetion_content_text" style="padding-top:40px;">
			&nbsp;&nbsp;为了科学的为您制定社会建议,您需要完善您的健康档案信息。
			</div>
			<div class="noRecord_background"><div/></div>
			<div class="suggetion_content_text" style="text-align:center;">没有数据哦</div>
		</div>
	</div>
</template>

<script>
export default {
  	name: 'society-suggest',
  	props:['suggestionData'],
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
