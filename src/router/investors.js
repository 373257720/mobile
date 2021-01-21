// / investor/
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
export default [
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
  }
];
