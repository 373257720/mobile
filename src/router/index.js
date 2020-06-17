import Vue from "vue";
import Router from "vue-router";
// import merge from 'webpack-merge';
// import register from '@/components/moblie/register'
// import login from '@/components/moblie/login'
// import forgotpassword from "../components/moblie/forgotpassword";
// import usercheck from '@/components/moblie/usercheck'
// import mysign from '@/components/moblie/mysign'
// import userpass from '@/components/moblie/userpass'
// import mhome from '@/components/moblie/mhome'
// import mine from '@/components/moblie/mine'
// import cavans from '@/components/moblie/cavans'
// import common_details from '@/components/moblie/common_details'
// import upload_contract from '@/components/moblie/upload_contract'

// project_owner/
// import p_wait_agent_input from '@/components/moblie/project_owner/wait_agent_input'
// import p_check_contract from '@/components/moblie/project_owner/check_contract'
// import p_investor_lists from '@/components/moblie/project_owner/investor_lists'
// import p_investor_details from '@/components/moblie/project_owner/inverstor_details'
// import p_sign_failed from '@/components/moblie/project_owner/sign_failed'
// import p_sign_request from '@/components/moblie/project_owner/sign_request'
// import p_wait_investor from '@/components/moblie/project_owner/wait_investor'
// import p_goods_details from '@/components/moblie/project_owner/goods_details'
// import p_user_contact from '@/components/moblie/project_owner/user_contact'
// import p_user_contact2 from '@/components/moblie/project_owner/user_contact2'
// import p_sign_successful from '@/components/moblie/project_owner/sign_successful'
// import p_inverstor_details from'@/components/moblie/project_owner/inverstor_details'
// import tobeSigned_roots from '@/components/moblie/project_owner/tobeSigned_roots'
// // import p_check_done_contract from'@/components/moblie/project_owner/check_done_contract'
// import connected_projects from "../components/moblie/project_owner/connected_projects";
// import owner_roots from '@/components/moblie/project_owner/owner_set_contract/owner_roots'
// import p_submit_contract from '@/components/moblie/project_owner/owner_set_contract/submit_contract'
// import p_set_contract from '@/components/moblie/project_owner/owner_set_contract/set_contract'
// import owner_set_contract from "../components/moblie/project_owner/owner_set_contract/owner_set_contract";
// import p_sign_contract from '@/components/moblie/project_owner/owner_set_contract/sign_contract'

// agent/
// import a_project_intro_roots from '@/components/moblie/agent/a_project_intro_roots'
// import a_project_intro from '@/components/moblie/agent/project_intro'
// import a_wait_review from '@/components/moblie/agent/wait_review'
// import a_recommand_i from '@/components/moblie/agent/recommand_i'
// import a_wait_investor_comfirm from '@/components/moblie/agent/wait_investor_comfirm'
// import a_wait_signed from '@/components/moblie/agent/wait_signed'
// import a_sign_failed from '@/components/moblie/agent/sign_failed'
// import a_sign_successful from '@/components/moblie/agent/sign_successful'
// import a_wait_sendemail from '@/components/moblie/agent/wait_sendemail'
// import recent_recommand from '@/components/moblie/agent/recent_recommand'
// // agent_set_contract
// import a_tobeSigned_roots from '@/components/moblie/agent/contract/tobeSigned_roots'
// import a_sign_contract from '@/components/moblie/agent/contract/sign_contract'
// import a_submit_contract from '@/components/moblie/agent/contract/submit_contract'
// import a_check_contract from '@/components/moblie/agent/contract/check_contract'
// import agent_set_contract from "../components/moblie/agent/contract/agent_set_contract";
// import uploadtoblock from  "../components/moblie/agent/contract/uploadtoblock";

// // investor/
// import  investor_roots from '@/components/moblie/investor/investor_roots'
// import i_wait_confirm from '@/components/moblie/investor/wait_comfirm'
// import i_conected_project from '@/components/moblie/investor/conected_project'
// import i_inverstor_infor from '@/components/moblie/investor/investor_infor'
// import i_perfect_infor from '@/components/moblie/investor/perfect_infor'
// import i_sign_failed from '@/components/moblie/investor/sign_failed'
// import i_emailto_confirm from '@/components/moblie/investor/emailto_confirm'
// import wait_confirmRoot from "@/components/moblie/investor/wait_confirmRoot";

// moblie
// const register = resolve => require(['@/components/moblie/register'], resolve)
const register = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/register");
const login = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/login");
const forgotpassword = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/forgotpassword"
  );
const usercheck = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/usercheck");
const mysign = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/mysign");
const userpass = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/userpass");
const mhome = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/mhome");
const mine = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/mine");
const cavans = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/cavans");
const common_details = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/common_details"
  );
const upload_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/upload_contract"
  );

// project_owner//

const p_wait_agent_input = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/wait_agent_input"
  );
const p_check_contract = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/check_contract"
  );
const p_investor_lists = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/investor_lists"
  );
const p_investor_details = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/inverstor_details"
  );
const p_sign_failed = () =>
  import(
    /* webpackChunkName: "project_owner" */ "@/components/moblie/project_owner/sign_failed"
  );
const p_sign_request = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/sign_request"
  );
const p_wait_investor = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/wait_investor"
  );
const p_goods_details = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/goods_details"
  );
const p_user_contact = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/user_contact"
  );
const p_user_contact2 = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/user_contact2"
  );
const p_sign_successful = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/sign_successful"
  );
const p_inverstor_details = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/inverstor_details"
  );
const tobeSigned_roots = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/tobeSigned_roots"
  );
const connected_projects = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/connected_projects"
  );
const owner_roots = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/owner_set_contract/owner_roots"
  );
const p_submit_contract = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/owner_set_contract/submit_contract"
  );
const owner_contract = () =>
  import(
    /* webpackChunkName: "project_owner" */ "@/components/moblie/project_owner/owner_set_contract/owner_contract"
  );
  const contract_items = () =>
  import(
    /* webpackChunkName: "project_owner" */ "@/components/moblie/project_owner/owner_set_contract/contract_items"
  );
const p_set_contract = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/owner_set_contract/set_contract"
  );
const owner_set_contract = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/owner_set_contract/owner_set_contract"
  );
const p_sign_contract = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/moblie/project_owner/owner_set_contract/sign_contract"
  );

// const p_wait_agent_input = resolve => require(['@/components/moblie/project_owner/wait_agent_input'], resolve)
// const p_check_contract = resolve => require(['@/components/moblie/project_owner/investor_lists'], resolve)
// const p_investor_lists = resolve => require(['@/components/moblie/project_owner/investor_lists'], resolve)
// const p_investor_details = resolve => require(['@/components/moblie/project_owner/inverstor_details'], resolve)
// const p_sign_failed = resolve => require(['@/components/moblie/project_owner/sign_failed'], resolve)
// const p_sign_request = resolve => require(['@/components/moblie/project_owner/sign_request'], resolve)
// const p_wait_investor = resolve => require(['@/components/moblie/project_owner/wait_investor'], resolve)
// const p_goods_details = resolve => require(['@/components/moblie/project_owner/goods_details'], resolve)
// const p_user_contact = resolve => require(['@/components/moblie/project_owner/user_contact'], resolve)
// const p_user_contact2 = resolve => require(['@/components/moblie/project_owner/user_contact2'], resolve)
// const p_sign_successful = resolve => require(['@/components/moblie/project_owner/sign_successful'], resolve)
// const p_inverstor_details = resolve => require(['@/components/moblie/project_owner/inverstor_details'], resolve)
// const tobeSigned_roots = resolve => require(['@/components/moblie/project_owner/tobeSigned_roots'], resolve)
// const connected_projects = resolve => require(['@/components/moblie/project_owner/connected_projects'], resolve)
// const owner_roots = resolve => require(['@/components/moblie/project_owner/owner_set_contract/owner_roots'], resolve)
// const p_submit_contract = resolve => require(['@/components/moblie/project_owner/owner_set_contract/submit_contract'],
// 	resolve)
// const p_set_contract = resolve => require(['@/components/moblie/project_owner/owner_set_contract/set_contract'],
// 	resolve)
// const owner_set_contract = resolve => require([
// 	'@/components/moblie/project_owner/owner_set_contract/owner_set_contract'
// ], resolve)
// const p_sign_contract = resolve => require(['@/components/moblie/project_owner/owner_set_contract/sign_contract'],
// 	resolve)

// agent/
const a_project_intro_roots = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/a_project_intro_roots"
  );
const a_project_intro = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/project_intro"
  );
const a_wait_review = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/wait_review"
  );
const a_recommand_i = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommand_i"
  );
const a_wait_investor_comfirm = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/wait_investor_comfirm"
  );
const a_wait_signed = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/wait_signed"
  );
const a_sign_failed = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/sign_failed"
  );
const a_sign_successful = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/sign_successful"
  );
const a_wait_sendemail = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/wait_sendemail"
  );
const a_sign_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/sign_contract"
  );
const recent_recommand = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recent_recommand"
  );
// const a_project_intro_roots = resolve => require(['@/components/moblie/agent/a_project_intro_roots'], resolve)
// const a_project_intro = resolve => require(['@/components/moblie/agent/project_intro'], resolve)
// const a_wait_review = resolve => require(['@/components/moblie/agent/wait_review'], resolve)
// const a_recommand_i = resolve => require(['@/components/moblie/agent/recommand_i'], resolve)
// const a_wait_investor_comfirm = resolve => require(['@/components/moblie/agent/wait_investor_comfirm'], resolve)
// const a_wait_signed = resolve => require(['@/components/moblie/agent/wait_signed'], resolve)
// const a_sign_failed = resolve => require(['@/components/moblie/agent/sign_failed'], resolve)
// const a_sign_successful = resolve => require(['@/components/moblie/agent/sign_successful'], resolve)
// const a_wait_sendemail = resolve => require(['@/components/moblie/agent/wait_sendemail'], resolve)
// const a_sign_contract =resolve => require(['@/components/moblie/agent/contract/sign_contract'], resolve)
// const recent_recommand = resolve => require(['@/components/moblie/agent/recent_recommand'], resolve)

// agent_set_contract
const a_tobeSigned_roots = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/tobeSigned_roots"
  );
const a_submit_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/submit_contract"
  );
const a_check_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/check_contract"
  );
const agent_set_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/agent_set_contract"
  );
const uploadtoblock = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/uploadtoblock"
  );
// const a_tobeSigned_roots = resolve => require(['@/components/moblie/agent/contract/tobeSigned_roots'], resolve)
// const a_submit_contract = resolve => require(['@/components/moblie/agent/contract/submit_contract'], resolve)
// const a_check_contract = resolve => require(['@/components/moblie/agent/contract/check_contract'], resolve)
// const agent_set_contract = resolve => require(['@/components/moblie/agent/contract/agent_set_contract'], resolve)
// const uploadtoblock = resolve => require(['@/components/moblie/agent/contract/uploadtoblock'], resolve)
// investor/

const investor_roots = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/investor/investor_roots"
  );
const i_conected_project = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/investor/conected_project"
  );
const i_inverstor_infor = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/investor/investor_infor"
  );
const i_perfect_infor = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/investor/perfect_infor"
  );
const i_wait_confirm = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/investor/wait_comfirm"
  );
const i_sign_failed = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/investor/sign_failed"
  );
const i_emailto_confirm = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/investor/emailto_confirm"
  );
const wait_confirmRoot = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/investor/wait_confirmRoot"
  );
// const investor_roots = resolve => require(['@/components/moblie/investor/investor_roots'], resolve)
// const i_conected_project = resolve => require(['@/components/moblie/investor/conected_project'], resolve)
// const i_inverstor_infor = resolve => require(['@/components/moblie/investor/investor_infor'], resolve)
// const i_perfect_infor = resolve => require(['@/components/moblie/investor/perfect_infor'], resolve)
// const i_wait_confirm =resolve =>require(['@/components/moblie/investor/wait_comfirm'],resolve)
// const i_sign_failed = resolve => require(['@/components/moblie/investor/sign_failed'], resolve)
// const i_emailto_confirm = resolve => require(['@/components/moblie/investor/emailto_confirm'], resolve)
// const wait_confirmRoot= resolve => require(['@/components/moblie/investor/wait_confirmRoot'], resolve)
Vue.use(Router);

const routes = [
  // project/

  {
    path: "/p_user_contact",
    name: "p_user_contact",
    component: p_user_contact
  },
  {
    path: "/p_user_contact2",
    name: "p_user_contact2",
    component: p_user_contact2
  },

  {
    path: "/p_goods_details",
    name: "p_goods_details",
    component: p_goods_details
  },
  {
    path: "/p_investor_lists",
    name: "p_investor_lists",
    component: p_investor_lists
  },
  {
    path: "/p_sign_failed",
    name: "p_sign_failed",
    component: p_sign_failed
  },

  {
    path: "/tobeSigned_roots",
    name: "tobeSigned_roots",
    component: tobeSigned_roots,
    redirect: "/tobeSigned_roots/p_wait_agent_input",
    children: [
      {
        path: "p_wait_agent_input",
        name: "p_wait_agent_input",
        component: p_wait_agent_input
      },
      {
        path: "p_check_contract",
        name: "p_check_contract",
        component: p_check_contract
      }
    ]
  },

  {
    path: "/p_wait_investor",
    name: "p_wait_investor",
    component: p_wait_investor
  },
  {
    path: "/p_investor_details",
    name: "p_investor_details",
    component: p_investor_details
  },
  {
    path: "/connected_projects",
    name: "connected_projects",
    component: connected_projects
  },
  {
    path: "/owner_roots",
    name: "owner_roots",
    component: owner_roots,
    redirect: "/owner_roots/p_sign_request",
    children: [
      {
        path: "p_sign_request",
        name: "p_sign_request",
        component: p_sign_request
      },
      {
        path: "owner_contract",
        name: "owner_contract",
		component: owner_contract,
		redirect: "/owner_roots/owner_contract/owner_set_contract",
        children: [
          {
            path: "owner_set_contract",
            name: "owner_set_contract",
			component: owner_set_contract,
			redirect: "/owner_roots/owner_contract/owner_set_contract/p_set_contract",
            children: [
              {
                path: "p_set_contract",
                name: "p_set_contract",
                component: p_set_contract
              },
              {
                path: "p_sign_contract",
                name: "p_sign_contract",
                component: p_sign_contract
              },
              {
                path: "p_submit_contract",
                name: "p_submit_contract",
                component: p_submit_contract
			  },
			  {
				path: "contract_items",
				name: "contract_items",
				component: contract_items
			  }
            ]
          },
        
        ]
      }
    ]
  },

  {
    path: "/p_sign_successful",
    name: "p_sign_successful",
    component: p_sign_successful
  },
  {
    path: "/p_inverstor_details",
    name: "p_inverstor_details",
    component: p_inverstor_details
  },

  // agent
  {
    path: "/a_sign_successful",
    name: "a_sign_successful",
    component: a_sign_successful
  },

  {
    path: "/uploadtoblock",
    name: "uploadtoblock",
    component: uploadtoblock
  },
  {
    path: "/a_project_intro_roots",
    name: "a_project_intro_roots",
    component: a_project_intro_roots,
    redirect: "/a_project_intro_roots/a_check_contract",
    children: [
      {
        path: "a_project_intro",
        name: "a_project_intro",
        component: a_project_intro
      },
      {
        path: "a_recommand_i",
        name: "a_recommand_i",
        component: a_recommand_i
      },
      {
        path: "recent_recommand",
        name: "recent_recommand",
        component: recent_recommand
      }
    ]
  },
  // {
  //   path: '/a_project_intro',
  //   name: 'a_project_intro',
  //   component: a_project_intro,
  // },
  {
    path: "/a_sign_failed",
    name: "a_sign_failed",
    component: a_sign_failed
  },
  {
    path: "/a_tobeSigned_roots",
    name: "a_tobeSigned_roots",
    component: a_tobeSigned_roots,
    redirect: "/a_tobeSigned_roots/a_check_contract",
    children: [
      {
        path: "a_wait_signed",
        name: "a_wait_signed",
        component: a_wait_signed
      },
      {
        path: "agent_set_contract",
        name: "agent_set_contract",
        component: agent_set_contract,
        redirect: "/a_tobeSigned_roots/agent_set_contract/a_check_contract",
        children: [
          {
            path: "a_check_contract",
            name: "a_check_contract",
            component: a_check_contract
          },
          {
            path: "a_sign_contract",
            name: "a_sign_contract",
            component: a_sign_contract
          },
          {
            path: "a_submit_contract",
            name: "a_submit_contract",
            component: a_submit_contract
          }
        ]
      }
    ]
  },
  {
    path: "/a_wait_investor_comfirm",
    name: "a_wait_investor_comfirm",
    component: a_wait_investor_comfirm
  },
  {
    path: "/a_wait_review",
    name: "a_wait_review",
    component: a_wait_review
  },

  {
    path: "/a_wait_sendemail",
    name: "a_wait_sendemail",
    component: a_wait_sendemail
  },

  // investor
  {
    path: "/investor_roots",
    name: "investor_roots",
    component: investor_roots,
    redirect: "/investor_roots/i_conected_project",
    children: [
      {
        path: "/i_conected_project",
        name: "i_conected_project",
        component: i_conected_project
      },
      {
        path: "/i_inverstor_infor",
        name: "i_inverstor_infor",
        component: i_inverstor_infor
      }
    ]
  },
  // {
  //   path: '/i_conected_project',
  //   name: 'i_conected_project',
  //   component: i_conected_project,
  // },
  // {
  //   path: '/i_inverstor_infor',
  //   name: 'i_inverstor_infor',
  //   component: i_inverstor_infor,
  // },

  {
    path: "/i_sign_failed",
    name: "i_sign_failed",
    component: i_sign_failed
  },

  {
    path: "/i_emailto_confirm",
    name: "i_emailto_confirm",
    component: i_emailto_confirm
  },

  {
    path: "/wait_confirmRoot",
    name: "wait_confirmRoot",
    component: wait_confirmRoot,
    redirect: "/wait_confirmRoot/i_conected_project",
    children: [
      {
        path: "i_wait_confirm",
        name: "i_wait_confirm",
        component: i_wait_confirm
      },
      {
        path: "i_perfect_infor",
        name: "i_perfect_infor",
        component: i_perfect_infor
      }
      // {
      //   path: '/i_conected_project',
      //   name: 'i_conected_project',
      //   component: i_conected_project,
      // },
      // {
      //   path: '/i_inverstor_infor',
      //   name: 'i_inverstor_infor',
      //   component: i_inverstor_infor,
      // },
    ]
  },

  {
    path: "/upload_contract",
    name: "upload_contract",
    component: upload_contract
  },
  {
    path: "/common_details",
    name: "common_details",
    component: common_details
  },

  {
    path: "/mhome",
    name: "mhome",
    component: mhome
  },

  {
    path: "/mine",
    name: "mine",
    component: mine
  },

  {
    path: "/userpass",
    name: "userpass",
    component: userpass
  },
  {
    path: "/mysign",
    name: "mysign",
    component: mysign
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: forgotpassword
  },

  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/usercheck",
    name: "usercheck",
    component: usercheck
  },
  {
    path: "/cavans",
    name: "cavans",
    component: cavans
  },
  // {
  //   path: '/testcavans',
  //   name: 'testcavans',
  //   component: testcavans,
  // },
  {
    path: "*",
    // name: 'login',
    component: login
  },
  {
    path: "/",
    redirect: {
      name: "login"
    }
  }
];

let router = new Router({
  // mode:'history',
  routes
});
// 全局路由守卫
//在进入某个路由前执行的代码
// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem('token');
//   if (to.meta.requireAuth) {
//     // 判断是否登录
//     if (token) {
//       next();
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     if (to.path === '/login' && token) {
//       next({
//         path: '/home'
//       });
//     } else {
//       next();
//     }
//     // 要进入to路由，必须调用next()方法
// router.afterEach((to, from) => {
// // console.log('after')
// })
export default router;
