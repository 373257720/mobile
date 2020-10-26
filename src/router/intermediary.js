// agent/
const ndaClause = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/ndaClause"
  );
const recommand = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommand"
  );
const recommandMiddleman = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommandMiddleman"
  );
const recommandHistory = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommandHistory"
  );

const bargin = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/bargin"
  );
const projectDetail = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/projectDetail"
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
// // agent_set_contract
// const a_tobeSigned_roots = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/agent/contract/tobeSigned_roots"
//   );
// const a_submit_contract = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/agent/contract/submit_contract"
//   );
// const a_check_contract = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/agent/contract/check_contract"
//   );
// const agent_set_contract = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/agent/contract/agent_set_contract"
//   );
// const uploadtoblock = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/agent/contract/uploadtoblock"
//   );
// // investor/

// const investor_roots = () =>
//   import(
//     /* webpackChunkName: "group-foo" */ "@/components/moblie/investor/investor_roots"
//   );
// const i_conected_project = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/investor/conected_project"
//   );
// const i_inverstor_infor = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/investor/investor_infor"
//   );
// const i_perfect_infor = () =>
//   import(
//     /* webpackChunkName: "group-foo" */ "@/components/moblie/investor/perfect_infor"
//   );
// const i_wait_confirm = () =>
//   import(
//     /* webpackChunkName: "group-foo" */ "@/components/moblie/investor/wait_comfirm"
//   );
// const i_sign_failed = () =>
//   import(
//     /* webpackChunkName: "group-foo" */ "@/components/moblie/investor/sign_failed"
//   );
// const i_emailto_confirm = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/investor/emailto_confirm"
//   );
// const wait_confirmRoot = () =>
//   import(
//     /* webpackChunkName: "group-foo" */
//     "@/components/moblie/investor/wait_confirmRoot"
//   );
export default [
  // agent
  {
    path: "/recommandMiddleman",
    name: "recommandMiddleman",
    component: recommandMiddleman,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/recommandHistory",
    name: "recommandHistory",
    component: recommandHistory,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/a_sign_successful",
    name: "a_sign_successful",
    component: a_sign_successful,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/projectDetail",
    name: "projectDetail",
    component: projectDetail,
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
    path: "/signContractStep1",
    name: "signContractStep1",
    component: signContractStep1,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/signContractStep2",
    name: "signContractStep2",
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
    path: "/recommand",
    name: "recommand",
    component: recommand,
    meta: {
      isshowbottom: false
    }
  },

  {
    path: "/ndaClause",
    name: "ndaClause",
    component: ndaClause,
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
  }
];
