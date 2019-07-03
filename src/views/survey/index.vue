<template>
  <div class="survey-main">
    <nar-bar/>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" class="container"/>
    </transition>
  </div>
</template>

<script>
import NarBar from './components/NarBar'
export default {
  name: 'SurveyMain',
  components: { NarBar },
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>

  .survey-main {
    min-height: calc(100vh - 84px);
    position: relative;
    overflow: hidden;
  }
  .container{margin-top:60px;padding-left:10px;padding-right:10px;}

</style>
