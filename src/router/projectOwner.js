const p_wait_agent_input = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/wait_agent_input"
  );
const login = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/login/login");

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
export default [
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
    path: "/login",
    name: "login",
    component: login,
    meta: {
      isshowbottom: false
    }
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
  }
];
