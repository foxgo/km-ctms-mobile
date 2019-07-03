<template>
	<div>
		<div class="suggetion_content_text" style="padding-top:40px;">
			&nbsp;&nbsp;为了科学的为您定制饮食计划，您需要完善您的健康档案信息。请完善您的<strong style="color:red;"> 身高、体重、体力活动 </strong>信息
		</div>
		<div class="noRecord_background"><div/></div>
		<div class="suggetion_content_text" style="text-align:center;">没有数据哦</div>
	</div>
</template>

<script>
export default {
  name: 'eatting-suggest-child-nodata'
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
</style>
