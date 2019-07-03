// 'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')
//
// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://test-hmmobile.kmhealth360.com"',
  IS_MOCK: true
}

//let baseUrl = "http://pre-hmmobile.kmhealth360.com";//预发布
//let baseUrl = "http://test-hmmobile.kmhealth360.com";//开发、测试
 // let baseUrl = "http://hmmobile.kmhealthcloud.com"//生产