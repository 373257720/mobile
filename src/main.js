// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "vant/lib/index.css";
import axios from "../node_modules/axios";
import qs from "qs";
import Promise from "es6-promise";
Promise.polyfill();
import global from "@/components/moblie/global.js";
import store from "./store/store";
import { i18n } from "./language";
import "../static/icon/iconfont.css";
Vue.config.productionTip = false;
Vue.prototype.$qs = qs;
// 富文本
const url = process.env.BASE_API;
axios.defaults.baseURL = url;
axios.default.timeout = 5000;
import "./components/moblie/vee-validate/validate";
import { Validator } from "../src/components/moblie/validation";
Vue.prototype.$Validator = Validator;
// import "font-awesome/css/font-awesome.css";
// import initRichText from "./editor";
// initRichText();
import "amfe-flexible/index.js";

// import Validator from "vue-validator";
// Vue.use(Validator);

// import Vue from 'vue'
import VueDraggableResizable from "vue-draggable-resizable";
// 可选择导入默认样式
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
Vue.component("vue-draggable-resizable", VueDraggableResizable);
// vuex
import Vuex from "vuex";
Vue.use(Vuex);
import "./vant";
// import ant from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.less'
// Vue.use(ant)
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import input from "ant-design-vue/lib/input";
import "ant-design-vue/lib/input/style/css";
Vue.use(input);
import Select from "ant-design-vue/lib/select";
import "ant-design-vue/lib/select/style/css";
Vue.use(Select);
import Spin from "ant-design-vue/lib/spin";
import "ant-design-vue/lib/spin/style/css";
Vue.use(Spin);

// import VueQuillEditor from "vue-quill-editor";
// // require styles
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

// Vue.use(VueQuillEditor /* { default global options } */);

// import Vconsole from "vconsole";
// let vConsole = new Vconsole();
// Vue.use(vConsole);

Vue.prototype.$axios = axios;
const restore_obj = global.deepCopy(store._modules.root.state);
Vue.prototype.$restore_obj = restore_obj;
// Vue.prototype.$AsyncValidator=AsyncValidator;
// Vue.use(AsyncValidator)
// import MuseUI from "muse-ui";
// console.log(MuseUI.Select);

// import "muse-ui/dist/muse-ui.css";
// Vue.use(MuseUI);
import "./css/base.css";
import "./css/base.scss";
import { Dialog } from "vant";
Vue.use(Dialog);

import { Toast } from "vant";
Vue.use(Toast);
import { Locale } from "vant";
import en_US from "vant/lib/locale/lang/en-US";
import zh_CN from "vant/lib/locale/lang/zh-CN";
// zh-CN
function locales(a) {
  if (a == "en_US") {
    Locale.use("en-US", en_US);
  }
  if (a == "zh_CN") {
    Locale.use("zh_CN", zh_CN);
  }
}
Vue.prototype.$Local = locales;
// 多语言设置
let z = localStorage.getItem("language")
  ? localStorage.getItem("language")
  : "en_US";
locales(z);
i18n.locale = localStorage.getItem("language")
  ? localStorage.getItem("language")
  : "en_US";

window.addEventListener(
  "popstate",
  function(e) {
    router.isBack = true;
    console.log(router);
  },
  false
);

// import moment from 'moment'
// Vue.prototype.$moment = moment
// 引入公共组件

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
let loadingCount = 0;
let isShowLoading = true;
Vue.prototype.$isShowLoading = isShowLoading;
// const exceptUrls = [ '/bsl_web/base/sendEmail.do','/bsl_web/user/forgetPwd.do'];
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    loadingCount++;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    if (res.data && res.data.resultCode) {
      let code = res.data.resultCode;
      loadingCount--;
      // 如果是未登录直接踢出去
      if (code == 10090) {
        // if (isShowLoading) {
        //   isShowLoading = false;
        let mes;
        if (i18n.locale == "en_US") {
          mes = res.data.resultDesc.slice(11, -1);
        } else {
          mes = res.data.resultDesc.slice(0, 10);
        }
        Dialog.alert({
          title: mes
        }).then(() => {
          store.dispatch("reset_actions", restore_obj);
          window.sessionStorage.clear();
          router.push({ name: "login" });
          // location.href = process.env.WEB_API;
        });
        // }
      }
      // if (loadingCount == 0) {
      //   isShowLoading = true;
      // }
      return res;
    }
  },
  error => {
    loadingCount--;
    store.commit("isloading", false);
    // if (isShowLoading) {
    //   isShowLoading = false;
    Dialog.alert({
      title: i18n.t("common.network")
    }).then(() => {
      store.dispatch("reset_actions", restore_obj);
      window.sessionStorage.clear();
      router.push({ name: "login" });
      // location.href = process.env.WEB_API;
    });
    // }
    return Promise.reject(error);
  }
);
// console.log(process.env);

// import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
// import Loading from "muse-ui-loading";
// Vue.use(Loading);
Vue.prototype.$routerto = function routerTo(name, obj) {
  router.push({
    name: name,
    query: obj
  });
};
Vue.prototype.$loading = function loading() {
  this.$toast.loading({
    loadingType: "circular",
    overlay: true,
    className: "selfloading",
    // message: 'loading...',
    forbidClick: true,
    duration: 0
  });
};
Vue.prototype.$loadingfail = function loadingfail() {
  this.$toast.fail({
    // loadingType: 'spinner',
    message: "failed"
  });
};
Array.prototype.$TONY=111;
var baseurl = {
  // api: "http://192.168.1.37:8085",
  api2: "http://47.90.62.114:8081", //(后台管理)
  // api3:'http://192.168.1.21:8080',
  api3: "http://47.90.62.114:8083", //(前段服务器端口)
  // api3:'http://localhost:8080',

  api: "http://47.90.62.114:8086" //(后台正式服务器端口)
};
Vue.prototype.$baseurl3 = baseurl.api3;
Vue.prototype.$baseurl2 = baseurl.api2;
Vue.prototype.$baseurl = baseurl.api;

Vue.prototype.$global = global;
import Router from "vue-router";
// console.log(Router.prototype);

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

import mbottom from "./components/moblie/bottom.vue";
Vue.component("mbottom", mbottom);
import cavans from "./components/moblie/cavans.vue";
Vue.component("cavans", cavans);
import common_nav from "./components/moblie/common/common_nav.vue";
Vue.component("commonnav", common_nav);
import box from "./components/moblie/3box";
Vue.component("boxx", box);
import commondetails from "./components/moblie/common/common_details";
Vue.component("commondetails", commondetails);
import commoninvestors from "./components/moblie/common/common_investors";
Vue.component("commoninvestors", commoninvestors);
import contract from "./components/moblie/contract";
Vue.component("contractcomponent", contract);
import DialogMsg from "./components/moblie/dialog";
Vue.component("DialogMsg", DialogMsg);
import commonSearch from "./components/moblie/common/commonSearch";
Vue.component("commonSearch", commonSearch);
// Vue.component('Vue-ueditor-wrap ',VueUeditorWrap )
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  components: {
    App
  },
  template: "<App/>"
});
