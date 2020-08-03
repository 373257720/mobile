'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',　　//添加
  API_ROOT: '"http://47.90.62.114:8086"'
})
