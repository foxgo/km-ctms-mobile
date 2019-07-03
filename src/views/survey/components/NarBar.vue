<template>
  <mt-navbar v-model="selected" class="nav" >
    <mt-tab-item id="person"><router-link to="person">基础信息</router-link></mt-tab-item>
    <mt-tab-item id="health"><router-link to="health">健康史</router-link></mt-tab-item>
    <mt-tab-item id="diet"><router-link to="diet">饮&nbsp;食</router-link></mt-tab-item>
    <mt-tab-item id="sport"><router-link to="sport">运&nbsp;动</router-link></mt-tab-item>
    <mt-tab-item id="smoke"><router-link to="smoke">吸烟饮酒</router-link></mt-tab-item>
  </mt-navbar>
</template>
<script>
export default {
  name: 'NarBar',
  data() {
    return {
      selected: 'person'
    }
  },
  watch: {
    $route(to, from) {
      this.getItemSelected()
    }
  },
  created() {
    this.getItemSelected()
  },
  methods: {
    getItemSelected() {
      const matched = this.$route.matched.filter(item => item.name)
      this.selected = matched[0].name
    }
  }
}
</script>
<style scoped lang="stylus">
  @import '~@/assets/styles/varibles.styl'
  .nav >>> a{font-size:px2rem(36px);padding-top:px2rem(30px);text-decoration:none;color:#999;}
    .nav >>> .is-selected a{color:#333;font-weight:bold;}
    .nav
      position:fixed
      left:0
      z-index:2
      width:96%
      margin:0 auto
      border-bottom:1px solid #999
      padding-left:px2rem(22px)
      padding-right:px2rem(22px)
      height:px2rem(90px)
  .mint-navbar{border-bottom:1px solid #eee;}

</style>
