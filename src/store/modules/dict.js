import { fetchList } from '@/api/dict'

const dict = {
  state: {
    items: [],
    types: []
  },

  mutations: {
    SET_DICT: (state, result) => {
      state.items = state.items.concat(result.data)
    },
    SET_TYPE: (state, result) => {
      state.types = state.types.concat(result)
    }
  },

  actions: {
    // 获取数据字典
    getDict({ commit, state }, ids) {
      return new Promise((resolve, reject) => {
        fetchList(ids).then(response => {
          console.log(response)
          const data = response.data
          if (!data.IsSuccess) {
            reject('error')
          }
          commit('SET_TYPE', { type: ids })
          commit('SET_DICT', { type: ids, data: data.ReturnData })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dict
