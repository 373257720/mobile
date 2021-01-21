
const p_bargin = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/contract/bargin"
  );
const p_projectdetail = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/p_projectdetail"
  );
const P_signContractStep1 = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/contract/signContractStep1"
  );
const P_signContractStep2 = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/contract/signContractStep2"
  );
  const P_signContractStep3  = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/contract/signContractStep3"
  );
  
const login = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/login/login");

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

const p_inverstor_details = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/inverstor_details"
  );

const connected_projects = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/project_owner/connected_projects"
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
    path: "/p_investor_lists",
    name: "p_investor_lists",
    component: p_investor_lists,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/p_projectdetail",
    name: "p_projectdetail",
    component: p_projectdetail,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/P_signContractStep1",
    name: "P_signContractStep1",
    component: P_signContractStep1,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/P_signContractStep2",
    name: "P_signContractStep2",
    component: P_signContractStep2,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/P_signContractStep3",
    name: "P_signContractStep3",
    component: P_signContractStep3,
    meta: {
      isshowbottom: false
    }
  },
  

  {
    path: "/p_bargin",
    name: "p_bargin",
    component: p_bargin,
    meta: {
      isshowbottom: false
    }
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
    path: "/p_inverstor_details",
    name: "p_inverstor_details",
    component: p_inverstor_details,
    meta: {
      isshowbottom: false
    }
  }
];
