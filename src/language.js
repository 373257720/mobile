import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
import chinese from './assets/language/chinese';
import english from './assets/language/english';
export const i18n = new VueI18n({
  locale: 'Chinese',
  messages: {
    'Chinese': chinese,
    'English': english
  }
})
