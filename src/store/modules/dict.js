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
          const data = response.data;
          if (!data.IsSuccess) {
            reject('error')
          }
          let resultData = data.Data;
          
          data.Data = [{
            'ItemType': 'CM37.09',
            'ItemCode': '1000004',
            'ItemName': '空腹'
          }, {
            'ItemType': 'CM37.09',
            'ItemCode': '060500',
            'ItemName': '随机'
          }, {
            'ItemType': 'CM37.09',
            'ItemCode': '060501',
            'ItemName': '早餐后'
          }, {
            'ItemType': 'CM37.09',
            'ItemCode': '060502',
            'ItemName': '午餐前'
          }, {
            'ItemType': 'CM37.09',
            'ItemCode': '060503',
            'ItemName': '午餐后'
          }, {
            'ItemType': 'CM37.09',
            'ItemCode': '060504',
            'ItemName': '晚餐前'
          }, {
            'ItemType': 'CM37.09',
            'ItemCode': '060505',
            'ItemName': '晚餐后'
          }, {
            'ItemType': 'CM37.09',
            'ItemCode': '060506',
            'ItemName': '睡前'
          }, {
            'ItemType': 'CM37.09',
            'ItemCode': '060507',
            'ItemName': '凌晨'
          }];

          commit('SET_TYPE', { type: ids })
          commit('SET_DICT', { type: ids, data: data.Data })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dict
