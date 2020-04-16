// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css';
import axios from '../node_modules/axios'
import qs from 'qs'
import Promise from 'es6-promise';
Promise.polyfill();
import global from '@/components/moblie/global.js'
import store from './store/store'
import { i18n } from './language'
Vue.config.productionTip = false
Vue.prototype.$qs = qs;
// 富文本
import  "font-awesome/css/font-awesome.css";
import initRichText from './editor';
initRichText();
// vuex
import Vuex from 'vuex';
Vue.use(Vuex);

// import ant from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.less'
// Vue.use(ant)
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import Select from 'ant-design-vue/lib/select';
import 'ant-design-vue/lib/select/style/css';
Vue.use(Select);

import Spin from 'ant-design-vue/lib/spin';
import 'ant-design-vue/lib/spin/style/css';
Vue.use(Spin);
import "./css/base.css"

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, /* { default global options } */)

// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole);
import Vant from 'vant';
Vue.use(Vant);
Vue.prototype.$axios = axios;
const restore_obj=deepCopy(store._modules.root.state);
Vue.prototype.$restore_obj=restore_obj;
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]); //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};
import {Dialog} from 'vant';
Vue.use(Dialog);
import {Toast} from 'vant';
Vue.use(Toast);
import { Locale } from 'vant';
import en_US from 'vant/lib/locale/lang/en-US';
import zh_CN from 'vant/lib/locale/lang/zh-CN';
// zh-CN
function locales(a) {
  if(a == 'en_US'){
    Locale.use('en-US', en_US);
  }
  if(a == 'zh_CN'){
    Locale.use('zh_CN',zh_CN)
  }
}
Vue.prototype.$Local = locales;
// 多语言设置



let z = localStorage.getItem('language')?localStorage.getItem('language'):'en_US';
locales(z);
// console.log(window.localStorage.getItem('language'))
i18n.locale=localStorage.getItem('language')?localStorage.getItem('language'):'en_US';
// console.log(i18n.locale)
// Toast
// console.log(Vant.Toast)
// import moment from 'moment'
// Vue.prototype.$moment = moment
// 引入公共组件
// let loadingCount=0;
// let isShowLoading =false;
// function addLoading() {
//   isShowLoading = true;
//   loadingCount++;
//   if(loadingCount==1){
//     Vue.prototype.$toast.loading({
//       loadingType: 'circular',
//       overlay:true,
//       className:'loading',
//       duration: 0,
//     });
//   }
// };

// function isCloseLoading() {
//   loadingCount--
//   if (loadingCount == 0) {
//      isShowLoading = false
//      Vue.prototype.$toast.clear();
//   }
// };
axios.defaults.withCredentials = true;
let isShowLoading =true;
// const exceptUrls = [ '/bsl_web/base/sendEmail.do','/bsl_web/user/forgetPwd.do'];
// axios.interceptors.request.use(function (config) {
//   　　// 在发送请求之前做些什么
//   return config;
//   }, function (error) {
//   　　// 对请求错误做些什么
//     Dialog.alert({
//       title:i18n.t('common.network'),
//       // message: i18n.t('common.network'),
//     }).then(() => {
//       store.dispatch("reset_actions",restore_obj);
//       window.sessionStorage.clear();
//       location.href = '/'
//     });
//   return Promise.reject(error)
//   });

axios.interceptors.response.use(res => {
  if (res.data && res.data.resultCode) {
    let code = res.data.resultCode
    if (code == 10090) { // 如果是未登录直接踢出去
      if(isShowLoading){
        isShowLoading=false;
        Dialog.alert({
          title: res.data.resultDesc,
        }).then(() => {
          store.dispatch("reset_actions",restore_obj)
          window.sessionStorage.clear();
          router.push({name:'login'})
        });
      }
    }
    return res
  }
} ,error => {
    Toast.clear();
    if(isShowLoading){
      isShowLoading=false;
      Dialog.alert({
        title:i18n.t('common.network'),
      }).then(() => {
        store.dispatch("reset_actions",restore_obj)
        window.sessionStorage.clear();
        router.push({name:'login'})
      });
    }
    return Promise.reject(error)
  }
)


Vue.prototype.$routerto = function routerTo(name, obj) {
  this.$router.push({
    name: name,
    query: obj
  })
}
Vue.prototype.$loading = function loading() {
  this.$toast.loading({
    loadingType: 'circular',
    overlay:true,
    className:'loading',
    // message: 'loading...',
    // forbidClick:true,
    duration: 0,
  });
};
Vue.prototype.$loadingfail = function loadingfail() {
  this.$toast.fail({
    // loadingType: 'spinner',
    message: 'failed',
  });
};
var baseurl = {
  // api: "http://192.168.1.37:8085",
  // api3:'www.aaa.com',
  api2:'http://47.90.62.114:8081',
  api3: 'http://47.90.62.114:8083',//(前段服务器端口)
  api: "http://47.90.62.114:8086",//(后台正式服务器端口)
}
Vue.prototype.$baseurl3 = baseurl.api3;
Vue.prototype.$baseurl2 = baseurl.api2;
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
import commondetails from './components/moblie/common_details'
Vue.component('commondetails', commondetails)
import commoninvestors from './components/moblie/common_investors'
Vue.component('commoninvestors', commoninvestors)
import contract from './components/moblie/contract'
Vue.component('contractcomponent', contract)
// Vue.component('Vue-ueditor-wrap ',VueUeditorWrap )
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
