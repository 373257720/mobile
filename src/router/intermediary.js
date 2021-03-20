// agent/
const Interested = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/Interested"
  );
const ndaRoot = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/nda/ndaRoot"
  );
const aNdaRoot = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/nda/aNdaRoot"
  );
const ndaClause = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/nda/ndaClause"
  );
const NDAsignature = () =>
  import(
  /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/nda/NDAsignature"
  );
const NDAsubmit = () =>
  import(
  /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/nda/NDAsubmit"
  );

const recommand = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommand"
  );
const recommandMiddleman = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommandMiddleman"
  );
const a_recommandHistory = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommandHistory"
  );

const A_bargin = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/bargin"
  );
const middmanAbargin = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/middmanAbargin"
  );

const middlemanBargin = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/middlemanBargin"
  );
const middlemanBconfirmContract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/middlemanBconfirmContract"
  );
const a_previewContract = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/agent/contract/a_previewContract"
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

const agentProjectDetail = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/agentProjectDetail"
  );


const recommandRoot = () =>
  import(
  /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommandRoot"
  );
const a_recommand_i = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/agent/recommand_i"
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

export default [
  // agent

  {
    path: "/a_recommandHistory",
    name: "a_recommandHistory",
    component: a_recommandHistory,
    meta: {
      isshowbottom: true
    }
  },

  {
    path: "/Interested",
    name: "Interested",
    component: Interested,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/agentProjectDetail",
    name: "agentProjectDetail",
    component: agentProjectDetail,
    meta: {
      isshowbottom: false
    }
  },
  // {
  //   path: "a_recommand_i",
  //   name: "a_recommand_i",
  //   component: a_recommand_i,
  //   meta: {
  //     isshowbottom: false
  //   }
  // },
  // {
  //   path: "/recent_recommand",
  //   name: "recent_recommand",
  //   component: recent_recommand,
  //   meta: {
  //     isshowbottom: false
  //   }
  // },
  {
    path: "/recommandRoot",
    name: "recommandRoot",
    component: recommandRoot,
    redirect: "/recommandRoot/recent_recommand",
    meta: {
      isshowbottom: false,
      eepAlive: true,
    },
    children: [
      {
        path: "recent_recommand",
        name: "recent_recommand",
        component: recent_recommand,
        meta: {
          isshowbottom: false,
          keepAlive: true,
        }
      },
      {
        path: "recommandMiddleman",
        name: "recommandMiddleman",
        component: recommandMiddleman,
        meta: {
          isshowbottom: false,
          eepAlive: true,
        }
      },
      {
        path: "a_recommand_i",
        name: "a_recommand_i",
        component: a_recommand_i,
        meta: {
          isshowbottom: false,
          keepAlive: true,
        }
      },
    ]
  },
  {
    path: "/a_previewContract",
    name: "a_previewContract",
    component: a_previewContract,
    meta: {
      isshowbottom: false
    }
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
    path: "/recommand",
    name: "recommand",
    component: recommand,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/aNdaRoot",
    name: "aNdaRoot",
    component: aNdaRoot,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/ndaRoot",
    name: "ndaRoot",
    component: ndaRoot,
    meta: {
      isshowbottom: false
    },
    // redirect: "/ndaRoot/ndaClause",
    // children: [
    //   {
    //     path: "ndaClause",
    //     name: "ndaClause",
    //     component: ndaClause,
    //     meta: {
    //       isshowbottom: false
    //     }
    //   },
    //   {
    //     path: "NDAsignature",
    //     name: "NDAsignature",
    //     component: NDAsignature,
    //     meta: {
    //       isshowbottom: false
    //     }
    //   },
    //   {
    //     path: "NDAsubmit",
    //     name: "NDAsubmit",
    //     component: NDAsubmit,
    //     meta: {
    //       isshowbottom: false
    //     }
    //   }

    // ]
  },

  {
    path: "/A_bargin",
    name: "A_bargin",
    component: A_bargin,
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
    path: "/middlemanBconfirmContract",
    name: "middlemanBconfirmContract",
    component: middlemanBconfirmContract,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/middlemanBargin",
    name: "middlemanBargin",
    component: middlemanBargin,
    meta: {
      isshowbottom: false
    }
  },
  {
    path: "/middmanAbargin",
    name: "middmanAbargin",
    component: middmanAbargin,
    meta: {
      isshowbottom: false
    }
  },


];
