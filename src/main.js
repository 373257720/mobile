// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./css/base.css";
import 'vant/lib/index.css';
import axios from '../node_modules/axios'
import qs from 'qs'
import global from '@/components/moblie/global.js'
import store from './store/store'
Vue.config.productionTip = false
Vue.prototype.$qs = qs;
import Vuex from 'vuex';
  // import Vconsole from 'vconsole'
  // let vConsole = new Vconsole()
  // Vue.use(vConsole);
Vue.use(Vuex);
import Vant from 'vant';
Vue.use(Vant)
Vue.prototype.$axios = axios;


import moment from 'moment'
Vue.prototype.$moment = moment
// 引入公共组件
axios.defaults.withCredentials = true;
axios.interceptors.response.use(res => {
    if (res.data && res.data.resultCode) {
      let code = res.data.resultCode
      // 10101是未登录状态码
      if (code == 10090) { // 如果是未登录直接踢出去 
        console.log(code);
        location.href = '/'
      }
    }
    return res
  },
  error => {
    alert('请求超时，请稍后重试！')
    return Promise.reject(error)
  }
)
Vue.prototype.$goto = function goto(name, id) {
  let obj = {
    name
  };
  if (id) {
    obj.params = {
      idx: id
    };
  }
  // console.log(this.$router);
  this.$router.push(obj);
}

Vue.prototype.$routerto = function routerTo(name, obj) {
  this.$router.push({
    name: name,
    query: obj
  })
}
Vue.prototype.$loading=function loading(){
    // console.log(this);
    
    this.$toast.loading({
      loadingType: 'spinner',
      message: 'loading...',
      // forbidClick:true,
      duration:0,
    });
};
Vue.prototype.$loadingfail=function loadingfail(){
  this.$toast.fail({
    // loadingType: 'spinner',
    message: 'failed',
  });
};

// Vue.prototype.$previous=function previous(){
//   this.$router.go(-1);
//   console.log(this.$router);

// };

var baseurl = {
  api: "http://192.168.1.37:8080",
  // api3:'http://47.90.62.114:8083',
  api3:'http://localhost:8080',
  //  api: "http://47.90.62.114:8082",
}
Vue.prototype.$baseurl3 = baseurl.api3;
Vue.prototype.$baseurl = baseurl.api;
Vue.prototype.$global = global;

import Router from 'vue-router'
// console.log(Router.prototype);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

import mbottom from './components/moblie/bottom.vue'
Vue.component('mbottom', mbottom)
import cavans from './components/moblie/cavans.vue'
Vue.component('cavans', cavans)
import common_nav from './components/moblie/common_nav.vue'
Vue.component('commonnav', common_nav)
import box from './components/moblie/3box'
Vue.component('boxx', box)


// Vue.component('Vue-ueditor-wrap ',VueUeditorWrap )
// Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
