<template>
	<div>
		<div class="suggetion_content_text" style="padding-top:10px;">
			&nbsp;&nbsp;为了科学的为您制定运动计划，您需要完善您的健康档案信息。请完善您的：
		</div>
		<div v-for="(item, index) in suggestion" class="suggetion_content_text">
					&nbsp;&nbsp;&nbsp;&nbsp;{{"（" +index+"）"  + item}}</div>
		<div class="noRecord_background"><div/></div>
		<div class="suggetion_content_text nodata_text" style="text-align:center;">没有数据哦</div>
	</div>
</template>

<script>
export default {
  name: 'sport-suggest-child-nodata',
  props:['suggestion'],
  mounted(){
  	console.log('suggestion == ')
  	console.log(this.suggestion)
  }
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

	.nodata_text{
    	height: 100%;
	}
</style>
