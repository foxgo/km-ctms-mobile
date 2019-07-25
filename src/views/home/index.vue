<template>
  <div class="home clearfix">
    <a class="km-header-bar" href="../../static/login_H5&360App.html" style="color:white;">登录</a>
    <banner />
    <health-record />
    <health-one />
    <health-two />
    <health-three />
    <list-news />
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Banner from './components/Banner'
import HealthRecord from './components/HealthRecord'
import HealthOne from './components/HealthOne'
import HealthTwo from './components/HealthTwo'
import HealthThree from './components/HealthThree'
import ListNews from './components/ListNews'

export default {
  name: 'Home',
  components: {
    Banner,HealthRecord, HealthOne,HealthTwo,HealthThree,ListNews
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$store.state.app.pageTitle = '全程健康管理';
  },
  methods: {
    
  },
  beforeRouteLeave (to, from, next) {
    // 判断是否可以跳转
    if(1) {
      next()
    }
    // Toast('请先完善个人档案信息');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  background:#fafafa;
  margin-top: 40px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
