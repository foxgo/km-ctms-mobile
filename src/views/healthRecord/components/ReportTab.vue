<template>
  <div>
    <ul>
      <li id="BloodPressure"><router-link to="BloodPressure">近一周</router-link></li>
      <li><router-link to="BloodSugar">近一月</router-link></li>
      <li><router-link to="Pulse">近三月</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ReportTab'
}
</script>

<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  ul
    display: flex
    height:px2rem(90)
    line-height:px2rem(90)
    &>li
      flex: 1
      font-size:px2rem(32)
      border-bottom:1px solid #e2e2e3
    .router-link-active
      border-bottom:px2rem(4) solid #008dfd  // 改变路由的状态
      color:#008dfd
      padding-bottom:px2rem(21)
</style>
