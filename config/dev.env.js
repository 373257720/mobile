'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG:'"dev"',
  BASE_API: "'http://192.168.1.45:8080'",
  WEB_API:'"http://192.168.1.17:8080"',
})
