'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const preEnv = require('./pre.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://test-hmmobile.kmhealth360.com"',
  BASE_API_APP: '"http://test-app.kmhealth360.com"',
  IS_MOCK: true
})
