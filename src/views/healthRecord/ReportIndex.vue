<template>
  <div>
    <report-tab/>
    <router-view />
  </div>
</template>

<script>
import ReportTab from './components/ReportTab'
export default {
  name: 'ReportIndex',
  components: { ReportTab }
}
</script>

<style scoped>

</style>
