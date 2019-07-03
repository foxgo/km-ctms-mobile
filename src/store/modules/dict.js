import { fetchMap } from '@/api/dict'

const dict = {
  state: {
    items: [],
    types: []
  },

  mutations: {
    SET_DICT: (state, result) => {
      state.items = state.items.concat(result)
    },
    SET_TYPE: (state, result) => {
      state.types = state.types.concat(result)
    }
  },

  actions: {
    // 获取数据字典
    getDict({ commit, state }, ids) {
      return new Promise((resolve, reject) => {
        fetchMap(ids).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          commit('SET_DICT', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dict
