<template>
  <div class="home root-page-box clearfix">
    <a class="km-header-bar" href="./static/login_H5&360App.html" style="color:white;">登录</a>
    
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">首页</mt-tab-item>
      <mt-tab-item id="2">商城</mt-tab-item>
      <mt-tab-item id="3">数据</mt-tab-item>
      <mt-tab-item id="4">家庭成员</mt-tab-item>
    </mt-navbar>

    <banner />
    <health-record />
    <health-one />
    <health-two />
    <health-three />
    <list-news />
  </div>
</template>

<script>
import { Toast, Navbar, TabItem } from 'mint-ui'
import Banner from './components/Banner'
import HealthRecord from './components/HealthRecord'
import HealthOne from './components/HealthOne'
import HealthTwo from './components/HealthTwo'
import HealthThree from './components/HealthThree'
import ListNews from './components/ListNews'

export default {
  name: 'Home',
  components: {
    Banner,HealthRecord, HealthOne,HealthTwo,HealthThree,ListNews,Navbar,TabItem
  },
  data() {
    return {
      selected:"1"
    }
  },
  mounted() {
    this.$store.state.app.pageTitle = '健康管理';
  },
  methods: {

  },
  beforeRouteLeave (to, from, next) {
    // 判断是否可以跳转
    if(1) {
      next()
    }
    // Toast('请先完善个人档案信息');
  },
  watch:{
    selected(newval,oldval){
      this.selected = "1"
      switch (newval) {
        case '1': break;
        case '2':
          this.$root.actionToNative('gotoShoppingMall')
          break;
        case '3':
          this.$router.push({
            path:'/healthRecord'
          })
          break;
        case '4':
          this.$router.push({ path:'/familyMembers' })
          break;
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .home>a {
    // display: none
  }


</style>
