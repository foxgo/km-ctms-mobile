<template>
	<div>
		<food-chart :data="suggestionData"></food-chart>
		<categary-list v-if="suggestionDetailData != null" :data="suggestionDetailData"></categary-list>
	</div>
</template>

<script>
	import CategaryList from './CategaryList'
	import FoodChart from './FoodChart'
export default {
  	name: 'eatting-suggest-child-withdata',
  	props:['suggestionData','suggestionDetailData'],
  	components:{ 
		CategaryList,
		FoodChart
	},
}
</script>

<style scoped >
	
</style>
