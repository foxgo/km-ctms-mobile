<template>
  <div>
    <div v-if="suggestionData.EvaluateErrorList instanceof Array">
      <no-data :suggestion="suggestionData.EvaluateErrorList" />
    </div>
    <div v-else-if="typeof suggestionData == 'object' ">
      <with-data :suggestion="suggestionData"/>
    </div>
  </div>
</template>

<script>
import NoData from './noData'
import WithData from './withData'
export default {
  name: 'SportSuggest',
  components: { NoData, WithData },
  props: ['suggestionData']
}
</script>

<style scoped >

</style>
