// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import echarts from 'echarts'
import globalMixin from "@/mixins/global";
import install from "@/utils/install";
import "@/assets/styles/page/main.scss";
import "@/styles/mint-ui.scss";  //自定义mint-ui样式

import store from './store'
import './icons' // icon
import './permission' // 访问权限控制
import './assets/styles/common.css'
import './assets/styles/iconfont.css'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont/iconfont.js'

// 全部调用前端数据
if (process.env.IS_MOCK) {
  import('./mock')
}

// 遍历meta里面设置页面的title
// router.beforeEach((to, from, next) => {
// 路由发生变化修改页面title
// if (to.meta.title) {
//  document.title = to.mata.title
//  }
//  next()
// })

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.prototype.$echarts = echarts

Vue.use(MintUI)
Vue.use(install)

// Vue.config.productionTip = false

// Token获取与保存
setToken_H5('tempToken')
import { setToken_H5, setToken_360App } from '@/utils/auth'
// 解析URL传入的参数
var reg1 = new RegExp('(^|&)' + 'token_H5' + '=([^&]*)(&|$)', 'i')
var reg2 = new RegExp('(^|&)' + 'token_360App' + '=([^&]*)(&|$)', 'i')
var paramStr = window.location.search.substr(1)
if (paramStr) {
  const token_H5 = paramStr.match(reg1)[2]
  const token_360App = paramStr.match(reg2)[2]
  console.log('H5 ===' + token_H5)
  console.log('360 ===' + token_360App)

  setToken_H5(token_H5)
  setToken_360App(token_360App)
}

new Vue({
  el: '#app',
  router,
  store,
  mixins: [globalMixin],
  components: { App },
  template: '<App/>'
})

