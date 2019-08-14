// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./css/base.css";
import 'vant/lib/index.css';
import axios from '../node_modules/axios'
import qs from 'qs'
Vue.config.productionTip = false
Vue.prototype.$qs=qs;
// Vue.use(Vant);
import { Field } from 'vant';
Vue.use(Field);
import { DropdownMenu, DropdownItem } from 'vant';
Vue.use(DropdownMenu).use(DropdownItem);
import { Uploader } from 'vant';
Vue.use(Uploader);
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
import { Search } from 'vant';
Vue.use(Search);
import { List } from 'vant';
Vue.use(List);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
import { Icon } from 'vant';
Vue.use(Icon);
import { TreeSelect } from 'vant';
Vue.use(TreeSelect);
Vue.prototype.$axios = axios;

// 引入公共组件
axios.defaults.withCredentials = true;
Vue.prototype.$goto = function goto(name, id) {
  let obj = {
    name
  };
  if (id) {
    obj.params = {
        idx:id
    };
  } 
  this.$router.push(obj);
}
var baseurl = {
  api: "http://192.168.1.37:8080",
  //  api: "http://192.168.1.37:8080",
}
Vue.prototype.$baseurl = baseurl.api
import mbottom from './components/moblie/bottom.vue'
Vue.component('mbottom', mbottom)
// Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
