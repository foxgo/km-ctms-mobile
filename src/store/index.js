import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import dailyHealth from './modules/dailyHealth'
import personInfo from './modules/personInfo'
import getters from './getters'
import dict from './modules/dict'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    dailyHealth,
    personInfo,
    dict
  },
  getters
})
export default store
