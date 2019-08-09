'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',

  // 测试服务器
  BASE_API: '"http://test-hmmobile.kmhealth360.com"',
  BASE_API_APP: '"http://test-app.kmhealth360.com"',

  // 开发服务器
  // BASE_API: '"http://mobile.hmtest.kmhealthcloud.cn:8165"',
  // BASE_API_APP: '"http://app-test.kmhealth360.com:8165"',
  
  IS_MOCK: true
})
