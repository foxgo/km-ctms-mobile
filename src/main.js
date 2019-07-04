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

import store from './store'
import './icons' // icon
import './permission' // permission control
import './assets/styles/common.css'
import './assets/styles/iconfont.css'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont/iconfont.js'
// import './mock' // simulation data
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
Vue.use(install);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  mixins: [globalMixin],
  components: { App },
  template: '<App/>'
})
