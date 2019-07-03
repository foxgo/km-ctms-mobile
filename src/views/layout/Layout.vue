<template>
  <div class="app-wrapper">
    <div class="main-container">
      <header-bar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { HeaderBar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    HeaderBar,
    AppMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
</style>
