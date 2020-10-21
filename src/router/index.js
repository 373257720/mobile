import Vue from "vue";
import Router from "vue-router";



const register = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/register");
const login = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/login");
const login1st = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/login/login1st"
  );
const login2nd = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/login/login2nd"
  );
const signin = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/login/signin"
  );
const forgotpassword = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/forgotpassword"
  );
const usercheck = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/usercheck");

const mysign = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/mysign"
  );
const projectStatus = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/projectStatus"
  );
const projectSubStatus = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/projectSubStatus"
  );
  const projectsDetails = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/projectsDetails"
  );
  const projectDetails = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/projectDetails"
  );
const projectList = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/projectList"
  );

const userpass = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/userpass");
const mhome = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/mhome");
const fliter = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/home/fliter");
  const mutilPick = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/home/mutilPick");
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

const p_wait_agent_input = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/wait_agent_input"
  );
const p_check_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/check_contract"
  );
const p_investor_lists = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/investor_lists"
  );
const p_investor_details = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/inverstor_details"
  );
const p_sign_failed = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/project_owner/sign_failed"
  );
const p_sign_request = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/sign_request"
  );
const p_wait_investor = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/wait_investor"
  );
const p_goods_details = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/goods_details"
  );
const p_user_contact = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/user_contact"
  );
const p_user_contact2 = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/user_contact2"
  );
const p_sign_successful = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/sign_successful"
  );
const p_inverstor_details = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/inverstor_details"
  );
const tobeSigned_roots = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/tobeSigned_roots"
  );
const connected_projects = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/connected_projects"
  );
const owner_roots = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/owner_set_contract/owner_roots"
  );
const p_submit_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/owner_set_contract/submit_contract"
  );
const owner_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/project_owner/owner_set_contract/owner_contract"
  );
const contract_items = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/project_owner/owner_set_contract/contract_items"
  );
const p_set_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/owner_set_contract/set_contract"
  );
const owner_set_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/owner_set_contract/owner_set_contract"
  );
const p_sign_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/owner_set_contract/sign_contract"
  );

// agent/
const bargin = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/bargin"
  );
const signContractStep1 = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/signContractStep1"
  );
  const signContractStep2 = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/signContractStep2"
  );
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

// Account
const AccountMessage = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/accountMessage"
  );
const MessageDetails = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/MessageDetails"
  );
const setNickname = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/setNickname"
  );
const vip = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/vip"
  );
const vipRules = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/vipRules"
  );
const personalReview = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/personalReview"
  );
// console.log(AccountMessage);

Vue.use(Router);

const routes = [
  //  account
  {
    path: "/personalReview",
    name: "personalReview",
    component: personalReview,
    meta: {
      isshowbottom: false
      // ispaddingBottom: true
    }
  },
  {
    path: "/vipRules",
    name: "vipRules",
    component: vipRules,
    meta: {
      isshowbottom: false
      // ispaddingBottom: true
    }
  },
  {
    path: "/vip",
    name: "vip",
    component: vip,
    meta: {
      isshowbottom: false,
      ispaddingBottom: true
    }
  },
  {
    path: "/AccountMessage",
    name: "AccountMessage",
    component: AccountMessage,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/setNickname",
    name: "setNickname",
    component: setNickname,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/MessageDetails",
    name: "MessageDetails",
    component: MessageDetails,
    meta: {
      isshowbottom: false
    }
  },
  // project/

  {
    path: "/p_user_contact",
    name: "p_user_contact",
    component: p_user_contact,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/p_user_contact2",
    name: "p_user_contact2",
    component: p_user_contact2,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/p_goods_details",
    name: "p_goods_details",
    component: p_goods_details,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/p_investor_lists",
    name: "p_investor_lists",
    component: p_investor_lists,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/p_sign_failed",
    name: "p_sign_failed",
    component: p_sign_failed,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/tobeSigned_roots",
    name: "tobeSigned_roots",
    component: tobeSigned_roots,
    redirect: "/tobeSigned_roots/p_wait_agent_input",
    meta: {
      isshowbottom: false
    },
    children: [
      {
        path: "p_wait_agent_input",
        name: "p_wait_agent_input",
        component: p_wait_agent_input,
        meta: {
          isshowbottom: false
        }
      },
      {
        path: "p_check_contract",
        name: "p_check_contract",
        component: p_check_contract,
        meta: {
          isshowbottom: false
        }
      }
    ]
  },
  {
    path: "/signin",
    name: "signin",
    component: signin,
    redirect: "/signin/login1st",
    meta: {
      isshowbottom: false
    },
    children: [
      {
        path: "login1st",
        name: "login1st",
        component: login1st,
        meta: {
          isshowbottom: false
        }
      },
      {
        path: "login2nd",
        name: "login2nd",
        component: login2nd,
        meta: {
          isshowbottom: false
        }
      }
    ]
  },
  {
    path: "/p_wait_investor",
    name: "p_wait_investor",
    component: p_wait_investor,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/p_investor_details",
    name: "p_investor_details",
    component: p_investor_details,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/connected_projects",
    name: "connected_projects",
    component: connected_projects,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/owner_roots",
    name: "owner_roots",
    component: owner_roots,
    redirect: "/owner_roots/p_sign_request",
    meta: {
      isshowbottom: false
    },
    children: [
      {
        path: "p_sign_request",
        name: "p_sign_request",
        component: p_sign_request,
        meta: {
          isshowbottom: false
        }
      },
      {
        path: "owner_contract",
        name: "owner_contract",
        component: owner_contract,
        redirect: "/owner_roots/owner_contract/owner_set_contract",
        meta: {
          isshowbottom: false
        },
        children: [
          {
            path: "owner_set_contract",
            name: "owner_set_contract",
            component: owner_set_contract,
            meta: {
              isshowbottom: false
            },
            redirect:
              "/owner_roots/owner_contract/owner_set_contract/p_set_contract",
            children: [
              {
                path: "p_set_contract",
                name: "p_set_contract",
                component: p_set_contract,
                meta: {
                  isshowbottom: false
                }
              },
              {
                path: "p_sign_contract",
                name: "p_sign_contract",
                component: p_sign_contract,
                meta: {
                  isshowbottom: false
                }
              },
              {
                path: "p_submit_contract",
                name: "p_submit_contract",
                component: p_submit_contract,
                meta: {
                  isshowbottom: false
                }
              },
              {
                path: "contract_items",
                name: "contract_items",
                component: contract_items,
                meta: {
                  isshowbottom: false
                }
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: "/p_sign_successful",
    name: "p_sign_successful",
    component: p_sign_successful,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/p_inverstor_details",
    name: "p_inverstor_details",
    component: p_inverstor_details,
    meta: {
      isshowbottom: false
    }
  },

  // agent
  {
    path: "/a_sign_successful",
    name: "a_sign_successful",
    component: a_sign_successful,
    meta: {
      isshowbottom: false
    }
  },

  {
    path: "/uploadtoblock",
    name: "uploadtoblock",
    component: uploadtoblock,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/a_project_intro_roots",
    name: "a_project_intro_roots",
    component: a_project_intro_roots,
    redirect: "/a_project_intro_roots/a_check_contract",
    meta: {
      isshowbottom: false
    },
    children: [
      {
        path: "a_project_intro",
        name: "a_project_intro",
        component: a_project_intro,
        meta: {
          isshowbottom: false
        }
      },
      {
        path: "a_recommand_i",
        name: "a_recommand_i",
        component: a_recommand_i,
        meta: {
          isshowbottom: false
        }
      },
      {
        path: "recent_recommand",
        name: "recent_recommand",
        component: recent_recommand,
        meta: {
          isshowbottom: false
        }
      }
    ]
  },
  {
    path: '/signContractStep1',
    name: 'signContractStep1',
    component: signContractStep1,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: '/signContractStep2',
    name: 'signContractStep2',
    component: signContractStep2,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/a_sign_failed",
    name: "a_sign_failed",
    component: a_sign_failed,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/a_tobeSigned_roots",
    name: "a_tobeSigned_roots",
    component: a_tobeSigned_roots,
    meta: {
      isshowbottom: false
    },
    redirect: "/a_tobeSigned_roots/a_wait_signed",
    children: [
      {
        path: "a_wait_signed",
        name: "a_wait_signed",
        component: a_wait_signed,
        meta: {
          isshowbottom: false
        }
      },
      {
        path: "agent_set_contract",
        name: "agent_set_contract",
        component: agent_set_contract,
        redirect: "/a_tobeSigned_roots/agent_set_contract/a_check_contract",
        meta: {
          isshowbottom: false
        },
        children: [
          {
            path: "a_check_contract",
            name: "a_check_contract",
            component: a_check_contract,
            meta: {
              isshowbottom: false
            }
          },
          {
            path: "a_sign_contract",
            name: "a_sign_contract",
            component: a_sign_contract,
            meta: {
              isshowbottom: false
            }
          },
          {
            path: "a_submit_contract",
            name: "a_submit_contract",
            component: a_submit_contract,
            meta: {
              isshowbottom: false
            }
          }
        ]
      }
    ]
  },
  {
    path: "/a_wait_investor_comfirm",
    name: "a_wait_investor_comfirm",
    component: a_wait_investor_comfirm,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/a_wait_review",
    name: "a_wait_review",
    component: a_wait_review,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/a_wait_sendemail",
    name: "a_wait_sendemail",
    component: a_wait_sendemail,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/bargin",
    name: "bargin",
    component: bargin,
    meta: {
      isshowbottom: false
    }
  },
  

  // investor
  {
    path: "/investor_roots",
    name: "investor_roots",
    component: investor_roots,
    meta: {
      isshowbottom: false
    },
    redirect: "/investor_roots/i_conected_project",
    children: [
      {
        path: "/i_conected_project",
        name: "i_conected_project",
        component: i_conected_project,
        meta: {
          isshowbottom: false
        }
      },
      {
        path: "/i_inverstor_infor",
        name: "i_inverstor_infor",
        component: i_inverstor_infor,
        meta: {
          isshowbottom: false
        }
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
    component: i_sign_failed,
    meta: {
      isshowbottom: false
    }
  },

  {
    path: "/i_emailto_confirm",
    name: "i_emailto_confirm",
    component: i_emailto_confirm,
    meta: {
      isshowbottom: false
    }
  },

  {
    path: "/wait_confirmRoot",
    name: "wait_confirmRoot",
    component: wait_confirmRoot,
    meta: {
      isshowbottom: false
    },
    redirect: "/wait_confirmRoot/i_conected_project",
    children: [
      {
        path: "i_wait_confirm",
        name: "i_wait_confirm",
        component: i_wait_confirm,
        meta: {
          isshowbottom: false
        }
      },
      {
        path: "i_perfect_infor",
        name: "i_perfect_infor",
        component: i_perfect_infor,
        meta: {
          isshowbottom: false
        }
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
    component: upload_contract,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/common_details",
    name: "common_details",
    component: common_details,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/mhome",
    name: "mhome",
    component: mhome,
    meta: {
      isshowbottom: true
    }
  },
  {
    path: "/fliter",
    name: "fliter",
    component: fliter,
    meta: {
      isshowbottom: false
    }
  }, {
    path: "/mutilPick",
    name: "mutilPick",
    component: mutilPick,
    meta: {
      isshowbottom: false
    }
  },
  

  {
    path: "/mine",
    name: "mine",
    component: mine,
    meta: {
      isshowbottom: true
    }
  },

  {
    path: "/userpass",
    name: "userpass",
    component: userpass,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/mysign",
    name: "mysign",
    component: mysign,
    meta: {
      isshowbottom: true
    }
  },
  {
    path: "/projectSubStatus",
    name: "projectSubStatus",
    component: projectSubStatus,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/projectList",
    name: "projectList",
    component: projectList,
    meta: {
      isshowbottom: false
    }
  },

  {
    path: "/projectStatus",
    name: "projectStatus",
    component: projectStatus,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/projectsDetails",
    name: "projectsDetails",
    component: projectsDetails,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/projectDetails",
    name: "projectDetails",
    component: projectDetails,
    meta: {
      isshowbottom: false
    }
  },
  

  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: forgotpassword,
    meta: {
      isshowbottom: false,
      ispaddingBottom: true
    }
  },

  {
    path: "/register",
    name: "register",
    component: register,
    meta: {
      isshowbottom: false,
      ispaddingBottom: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      isshowbottom: false,
      ispaddingBottom: false
    }
  },
  {
    path: "/usercheck",
    name: "usercheck",
    component: usercheck,
    meta: {
      isshowbottom: false,
      ispaddingBottom: true
    }
  },
  {
    path: "/cavans",
    name: "cavans",
    component: cavans,
    meta: {
      isshowbottom: false
    }
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
