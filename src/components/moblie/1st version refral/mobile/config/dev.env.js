'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG:'"dev"',
  BASE_API:'"http://47.90.62.114:8086"',
  indexUrl:'"http://192.168.1.21:8080"',
  backStageUrl:'"http://47.90.62.114:8081"',
})


