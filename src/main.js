// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css';
import axios from '../node_modules/axios'
import qs from 'qs'
import global from '@/components/moblie/global.js'
import store from './store/store'
Vue.config.productionTip = false
Vue.prototype.$qs = qs;
import Vuex from 'vuex';
// 复制插件
Vue.use(Vuex);
// import Vconsole from 'vconsole';
// new Vconsole();
import Promise from 'es6-promise';
Promise.polyfill();

// import ant from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.less'
// Vue.use(ant)
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
  Vue.use(Antd)
  import "./css/base.css"
// 复制插件
// import VueClipboards from 'vue-clipboard2'
// Vue.use(VueClipboards);
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole);
// import Promise from 'es6-promise';
// Promise.polyfill()
Vue.use(Vuex);
import Vant from 'vant';
Vue.use(Vant)
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
// Toast
// console.log(Toast)
// import moment from 'moment'
// Vue.prototype.$moment = moment
// 引入公共组件
axios.defaults.withCredentials = true;
axios.interceptors.response.use(res => {
  if (res.data && res.data.resultCode) {
    let code = res.data.resultCode
    if (code == 10090) { // 如果是未登录直接踢出去
      Dialog.alert({
        message: res.data.resultDesc,
      }).then(() => {
        location.href = '/'
      });
    }
    return res
  }
} ,error => {
    Dialog.alert({
      message: '请求超时，请稍后重试！',
    }).then(() => {
      location.href = '/'
    });
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
Vue.prototype.$loading = function loading() {
  // console.log(this);
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
  api3: 'http://47.90.62.114:8083',//(前段服务器端口)
  api: "http://47.90.62.114:8086",//(后台正式服务器端口)
}
Vue.prototype.$baseurl3 = baseurl.api3;
Vue.prototype.$baseurl = baseurl.api;
Vue.prototype.$global = global;
// import 'muse-ui/lib/styles/base.less';
// import 'muse-ui/lib/styles/theme.less';
// import { Button, Select } from 'muse-ui';
// Vue.use(Button);
// Vue.use(Select);
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
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
Vue.component('contract_component', contract)
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
