import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/moblie/home'
import register from '@/components/moblie/register'
import login from '@/components/moblie/login'
import usercheck from '@/components/moblie/usercheck'
import project_intro from '@/components/moblie/project_intro'
import mysign from '@/components/moblie/mysign'
import goods_details from '@/components/moblie/goods_details'
import userpass from '@/components/moblie/userpass'
import mhome from '@/components/moblie/mhome'
import mine from '@/components/moblie/mine'
import mpro_sign from '@/components/moblie/mpro_sign'
// moblie

Vue.use(Router);
const routes = [{
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/usercheck',
    name: 'usercheck',
    component: usercheck,
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: home,
  //   // meta: {
  //   //   // keepAlive: true, // 需要被缓
  //   //   requireAuth: true
  //   // }
  // }, 
  {
    path: '/mhome',
    name: 'mhome',
    component: mhome,
  },
  //  {
  //   path: '/mpro_sign',
  //   name: 'mpro _sign',
  //   component: mpro_sign,
  // },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
  },
  {
    path: '/project_intro',
    name: 'project_intro',
    component: project_intro,
  },
  {
    path: '/userpass',
    name: 'userpass',
    component: userpass,
  },
  {
    path: '/mysign',
    name: 'mysign',
    component: mysign,
  },
  {
    path: '/goods_details',
    name: 'goods_details',
    component: goods_details,
  },
  {
    path: '*',
    name: 'login',
    component: login
  },
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
]

let router = new Router({
  // mode:'history',
  routes
});
export default router;
