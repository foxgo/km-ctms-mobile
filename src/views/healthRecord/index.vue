<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">首页</mt-tab-item>
      <mt-tab-item id="2">商城</mt-tab-item>
      <mt-tab-item id="3">数据</mt-tab-item>
      <mt-tab-item id="4">家庭成员</mt-tab-item>
    </mt-navbar>
    <health-record-nav />
    <router-view />
  </div>
</template>

<script>
import { Navbar, TabItem } from 'mint-ui'
import HealthRecordNav from './components/HealthRecordNav'

export default {
  name: 'Index',
  components: { HealthRecordNav,Navbar,TabItem },
  data() {
    return {
      selected:"3"
    }
  },
  mounted() {
    // 修改导航标题
    this.$store.state.app.pageTitle = '健康测量'
  },
  watch:{
    selected(newval,oldval){
      console.log(newval+"------"+oldval);
      this.selected = "3"
      switch (newval) {
        case '1': 
          this.$router.push({
            path:'/'
          })
          break;
        case '2':
          // this.$router.push({
          //   path:'/'
          // })
          break;
        case '3': break;
        case '4':     
          // this.$router.push({
          //   path:'/'
          // })
          break;
      }
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //     //点击返回按钮后跳到首页
  //     console.log(to)
	//     if (Object.keys(to.query).length <= 0) {
	//       this.$router.back();
	//     }else{
	//       next();
	//     }
	// },
}
</script>

<style scoped>

</style>
