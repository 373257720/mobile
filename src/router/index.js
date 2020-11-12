import Vue from "vue";
import Router from "vue-router";
import intermediary from "./intermediary";
import investors from "./investors";
import projectOwner from "./projectOwner";
// const nationality = () =>
//   import(
//     /* webpackChunkName: "group-foo" */ "@/components/moblie/common/nationality"
//   );
// const identity = () =>
//   import(
//     /* webpackChunkName: "group-foo" */ "@/components/moblie/common/identity"
//   );

// const genus = () =>
//   import(
//     /* webpackChunkName: "group-foo" */ "@/components/moblie/common/genus"
//   );
const register = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/login/register"
  );
const homePage = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/homePage");
const forgetpassword = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/login/forgetPassword"
  );
const forgotpassword = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/login/forgotpassword"
  );
const usercheckroot = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/login/usercheckroot"
  );
const verify = () =>
import(
  /* webpackChunkName: "group-foo" */ "@/components/moblie/login/Verify"
);

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
const projectDetail = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/projectDetail"
  );

const projectList = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/projectList"
  );
  const projectChain = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/projects/projectChain"
  );
  

const userpass = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/userpass");
const mhome = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/mhome");
const fliter = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/home/fliter");
const mutilPick = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/home/mutilPick"
  );
const mine = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/mine");
const cavans = () =>
  import(/* webpackChunkName: "group-foo" */ "@/components/moblie/cavans");
const common_details = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/common/common_details"
  );
const upload_contract = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/upload_contract"
  );
  
 
// Account
const AccountMessage = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/accountMessage"
  );
  const pointsRedemption = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/pointsRedemption"
  );
  
  const leaderboard = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/leaderboard"
  );
   
const vipGrade = () =>
  import(
    /* webpackChunkName: "group-foo" */
    "@/components/moblie/account/vipGrade"
  );
vipGrade;
const pointsHistory = () =>
  import(
    /* webpackChunkName: "group-foo" */ "@/components/moblie/account/pointsHistory"
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
  ...intermediary,
  ...investors,
  ...projectOwner,
  //  account
  {
    path: "/vipGrade",
    name: "vipGrade",
    component: vipGrade,
    meta: {
      isshowbottom: false
      // ispaddingBottom: true
    }
  },
  {
    path: "/pointsRedemption",
    name: "pointsRedemption",
    component:   pointsRedemption,
    meta: {
      isshowbottom: false
      // ispaddingBottom: true
    }
  },

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
  {
    path: "/pointsHistory",
    name: "pointsHistory",
    component: pointsHistory,
    meta: {
      isshowbottom: false
    }
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
  },
  {
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
    path: "/projectChain",
    name: "projectChain",
    component:  projectChain,
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
    path: "/projectDetail",
    name: "projectDetail",
    component: projectDetail,
    meta: {
      isshowbottom: false
    }
  },
  // {
  //   path: "/projecstList",
  //   name: "projecstList",
  //   component: projecstList,
  //   meta: {
  //     isshowbottom: false
  //   }
  // },
  {
    path: "/forgetpassword",
    name: "forgetpassword",
    component: forgetpassword,
    meta: {
      isshowbottom: false,
      ispaddingBottom: true
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
    path: "/homePage",
    name: "homePage",
    component: homePage,
    meta: {
      isshowbottom: false,
      ispaddingBottom: false
    }
  },
  {
    path: "/usercheckroot",
    name: "usercheckroot",
    component: usercheckroot,
    // redirect: "/usercheckroot/usercheck",
    meta: {
      isshowbottom: false,
      ispaddingBottom: true
    },
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: leaderboard,
    // redirect: "/usercheckroot/usercheck",
    meta: {
      isshowbottom: false,
      ispaddingBottom: true
    },
  },
  
  {
    path: "/verify",
    name: "verify",
    component: verify,
    // redirect: "/usercheckroot/usercheck",
    meta: {
      isshowbottom: false,
      ispaddingBottom: true
    },
    // children: [
    //   {
    //     path: "usercheck",
    //     name: "usercheck",
    //     component: usercheck,
    //     meta: {
    //       isshowbottom: false,
    //       ispaddingBottom: true,
    //       index: 1
    //     }
    //   },
    //   {
    //     path: "nationality",
    //     name: "nationality",
    //     component: nationality,
    //     meta: {
    //       isshowbottom: false,
    //       index: 2
    //     }
    //   },
    //   {
    //     path: "identity",
    //     name: "identity",
    //     component: identity,
    //     meta: {
    //       isshowbottom: false,
    //       index: 2
    //     }
    //   },
    //   {
    //     path: "genus",
    //     name: "genus",
    //     component: genus,
    //     meta: {
    //       isshowbottom: false,
    //       index: 2
    //     }
    //   }
    // ]
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
    component: homePage
  },
  {
    path: "/",
    redirect: {
      name: "homePage"
    }
  }
];

let router = new Router({
  // mode:'history',
  base: process.env.BASE_URL,
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
