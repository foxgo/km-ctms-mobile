<template>
  <div>
    <health-record-nav />
    <router-view />
  </div>
</template>

<script>
import HealthRecordNav from './components/HealthRecordNav'
export default {
  name: 'Index',
  components: { HealthRecordNav },
  mounted() {
    // 修改导航标题
    this.$store.state.app.pageTitle = '健康测量'
  }
}
</script>

<style scoped>

</style>
