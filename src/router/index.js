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
import testcavans from '@/components/moblie/test_canvans'



// project_owner/
import p_wait_agent_input from '@/components/moblie/project_owner/wait_agent_input'
import p_check_contract from '@/components/moblie/project_owner/check_contract'
import p_investor_infor from '@/components/moblie/project_owner/investor_infor'
import p_investor_details from '@/components/moblie/project_owner/inverstor_details'
import p_set_contract from '@/components/moblie/project_owner/set_contract'
import p_sign_failed from '@/components/moblie/project_owner/sign_failed'
import p_sign_contract from '@/components/moblie/project_owner/sign_contract'
import p_sign_request from '@/components/moblie/project_owner/sign_request'
// import p_wait_investor from '@/components/moblie/project_owner/wait_investor'
import p_goods_details from '@/components/moblie/project_owner/goods_details'
import p_user_contact from '@/components/moblie/project_owner/user_contact'
import p_user_contact2 from '@/components/moblie/project_owner/user_contact2' 
import p_submit_contract from '@/components/moblie/project_owner/submit_contract'
import p_sign_successful from '@/components/moblie/project_owner/sign_successful'
import p_inverstor_details from'@/components/moblie/project_owner/inverstor_details'


// agent/
import a_project_intro from '@/components/moblie/agent/project_intro'
import a_wait_review from '@/components/moblie/agent/wait_review'
import a_recommand_i from '@/components/moblie/agent/recommand_i'
import a_wait_investor_comfirm from '@/components/moblie/agent/wait_investor_comfirm'
import a_wait_signed from '@/components/moblie/agent/wait_signed'
import a_input_investor_infor from '@/components/moblie/agent/input_investor_infor'
import a_sign_failed from '@/components/moblie/agent/sign_failed'
import a_sign_successful from '@/components/moblie/agent/sign_successful'
import a_sign_contract from '@/components/moblie/agent/sign_contract'


// investor/
// import i_wait_confirm from '@/components/moblie/investor/wait_comfirm'
import i_conected_project from '@/components/moblie/investor/conected_project'
import i_inverstor_infor from '@/components/moblie/investor/investor_infor'
import i_perfect_infor from '@/components/moblie/investor/perfect_infor'
import i_sign_failed from '@/components/moblie/investor/sign_failed'

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
    path: '/p_check_contract',
    name: 'p_check_contract',
    component: p_check_contract,
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
    path: '/p_wait_agent_input',
    name: 'p_wait_agent_input',
    component: p_wait_agent_input,
  },
  // {
  //   path: '/p_wait_investor',
  //   name: 'p_wait_investor',
  //   component: p_wait_investor,
  // },
  {
    path: '/p_investor_details',
    name: 'p_investor_details',
    component: p_investor_details,
  },
  {
    path: '/p_set_contract',
    name: 'p_set_contract',
    component: p_set_contract,
  },
  {
    path: '/p_sign_contract',
    name: 'p_sign_contract',
    component: p_sign_contract,
  },
  {
    path: '/p_submit_contract',
    name: 'p_submit_contract',
    component: p_submit_contract,
  },
  {
    path: '/p_sign_successful',
    name: 'p_sign_successful',
    component: p_sign_successful,
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
  }, 
  {
    path: '/a_wait_signed',
    name: 'a_wait_signed',
    component: a_wait_signed,
  },{
    path: '/a_wait_investor_comfirm',
    name: 'a_wait_investor_comfirm',
    component: a_wait_investor_comfirm,
  },
  {
    path: '/a_wait_review',
    name: 'a_wait_review',
    component: a_wait_review,
  },
  {
    path: '/a_recommand_i',
    name: 'a_recommand_i',
    component:a_recommand_i,
  },
  {
    path: '/p_inverstor_details',
    name: 'p_inverstor_details',
    component:p_inverstor_details,
  },
  {
    path: '/p_inverstor_details',
    name: 'p_inverstor_details',
    component:p_inverstor_details,
  },
// investor

{
  path: '/a_sign_contract',
  name: 'a_sign_contract',
  component: a_sign_contract,
},
{
  path: '/i_conected_project',
  name: 'i_conected_project',
  component: i_conected_project,
},
{
  path: '/i_inverstor_infor',
  name: 'i_inverstor_infor',
  component: i_inverstor_infor,
},
{
  path: '/i_perfect_infor',
  name: 'i_perfect_infor',
  component: i_perfect_infor,
},
{
  path: '/i_sign_failed',
  name: 'i_sign_failed',
  component: i_sign_failed,
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
    path: '/testcavans',
    name: 'testcavans',
    component: testcavans,
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
