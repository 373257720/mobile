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
Vue.use(Vuex);
import Vant from 'vant';
Vue.use(Vant)
Vue.prototype.$axios = axios;

// 引入公共组件
axios.defaults.withCredentials = true;
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
// Vue.prototype.$previous=function previous(){
//   this.$router.go(-1);
//   console.log(this.$router);

// };

var baseurl = {
  api: "http://192.168.1.37:8080",
  //  api: "http://192.168.1.37:8080",
}
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
import cavans  from './components/moblie/cavans.vue'
Vue.component('cavans', cavans)
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
