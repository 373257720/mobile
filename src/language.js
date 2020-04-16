import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import store from './store/store'
Vue.use(VueI18n)
import chinese from './assets/language/chinese';
import english from './assets/language/english';
export const i18n = new VueI18n({
  locale: window.localStorage.getItem('language')?window.localStorage.getItem('language'): 'en_US' ,
  messages: {
    'zh_CN': chinese,
    'en_US': english
  }
})
