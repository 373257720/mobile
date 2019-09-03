import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/moblie/home'
import register from '@/components/moblie/register'
import login from '@/components/moblie/login'
import usercheck from '@/components/moblie/usercheck'

import mysign from '@/components/moblie/mysign'

import userpass from '@/components/moblie/userpass'
import mhome from '@/components/moblie/mhome'
import mine from '@/components/moblie/mine'
import cavans from '@/components/moblie/cavans'




// project_owner/
import p_wait_input from '@/components/moblie/project_owner/wait_input'
import p_check_contact from '@/components/moblie/project_owner/check_contact'
import p_investor_infor from '@/components/moblie/project_owner/investor_infor'
import p_sign_failed from '@/components/moblie/project_owner/sign_failed'
import p_sign_request from '@/components/moblie/project_owner/sign_request'
import p_wait_investor from '@/components/moblie/project_owner/wait_investor'
import p_goods_details from '@/components/moblie/project_owner/goods_details'
import p_user_contact from '@/components/moblie/project_owner/user_contact'
import p_user_contact2 from '@/components/moblie/project_owner/user_contact2'

// agent/
import a_project_intro from '@/components/moblie/agent/project_intro'
import a_wait_correct from '@/components/moblie/agent/wait_investor_correct'
import a_waitsign from '@/components/moblie/agent/waitsign'
import a_wait_investor_comfirm from '@/components/moblie/agent/wait_investor_comfirm'
import a_input_investor_infor from '@/components/moblie/agent/input_investor_infor'
import a_sign_failed from '@/components/moblie/agent/sign_failed'
import a_sign_successful from '@/components/moblie/agent/sign_successful'

// investor/
import i_wait_comfirm from '@/components/moblie/investor/wait_comfirm'
import i_conected_project from '@/components/moblie/investor/conected_project'

// moblie

Vue.use(Router);
const routes = [
  // project/
  {
    path: '/p_sign_request',
    name: 'p_sign_request',
    component: p_sign_request,
  },
  {
    path: '/p_user_contact',
    name: 'p_user_contact',
    component: p_user_contact,
  },
  {
    path: '/p_user_contact2',
    name: 'p_user_contact2',
    component: p_user_contact2,
  },
  {
    path: '/p_check_contact',
    name: 'p_check_contact',
    component: p_check_contact,
  },
  {
    path: '/p_goods_details',
    name: 'p_goods_details',
    component: p_goods_details,
  },
  {
    path: '/p_investor_infor',
    name: 'p_investor_infor',
    component: p_investor_infor,
  },
  {
    path: '/p_sign_failed',
    name: 'p_sign_failed',
    component: p_sign_failed,
  },
  {
    path: '/p_wait_input',
    name: 'p_wait_input',
    component: p_wait_input,
  },
  {
    path: '/p_wait_investor',
    name: 'p_wait_investor',
    component: p_wait_investor,
  },

  // agent
  {
    path: '/a_sign_successful',
    name: 'a_sign_successful',
    component: a_sign_successful,
  },
  {
    path: '/a_input_investor_infor',
    name: 'a_input_investor_infor',
    component: a_input_investor_infor,
  },
  {
    path: '/a_project_intro',
    name: 'a_project_intro',
    component: a_project_intro,
  }, {
    path: '/a_sign_failed',
    name: 'a_sign_failed',
    component: a_sign_failed,
  }, {
    path: '/a_wait_investor',
    name: 'a_wait_investor_confirm',
    component: a_wait_investor_comfirm,
  },
  {
    path: '/a_wait_correct',
    name: 'a_wait_correct',
    component: a_wait_correct,
  },
  {
    path: '/a_waitsign',
    name: 'a_waitsign',
    component: a_waitsign,
  },
// investor

{
  path: '/i_wait_comfirm',
  name: 'i_wait_comfirm',
  component: i_wait_comfirm,
},
{
  path: '/i_conected_project',
  name: 'i_conected_project',
  component: i_conected_project,
},




  {
    path: '/mhome',
    name: 'mhome',
    component: mhome,
  },

  {
    path: '/mine',
    name: 'mine',
    component: mine,
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
  {
    path: '/cavans',
    name: 'cavans',
    component: cavans,
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
