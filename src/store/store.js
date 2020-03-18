import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    currentUser: '',
    currentUsertype: null,
    contract: {
      article:'',
      owner_sign:'',
      owner_name:'',
      owner_title:'',
      owner_signdate:null,
      agent_sign:"",
      agent_name:'',
      agent_title:'',
      agent_signdate:null,
    },
    inverstor:{
      investorsType:null,
      investorsCompany:'',
      investorsName:'',
    },
    genre: [],
  },
  getters: {

  },
  mutations: {
    inverstor_mutation(state, content) {
      var arr = Object.keys(content);
      if (arr.length > 0) {
        state.inverstor = Object.assign({}, content);
        // console.log(state);
      } else if (arr.length == 0) {
        state.inverstor = {};
      }
    },
    agent_signdate(state, content) {
      if (content) {
        state.contract.agent_signdate = content;
      } else if (content == null) {
        state.contract.agent_signdate = null
      }
    },
    owner_signdate(state, content) {
      if (content) {
        state.contract.owner_signdate = content;
      } else if (content == null) {
        state.contract.owner_signdate = null
      }
    },
    genre_array(state, content) {
      if (content.length > 0) {
        state.genre = [];
        state.genre = [...content];

      } else if (content.length <= 0) {
        state.genre = [];
      }

    },
    // 项目方点击项目跳转
    // genre_projectid(state, content) {
    //   if (content.length > 0) {
    //     state.genre_projectid = [];
    //     state.genre_projectid = [...content];

    //   } else if (content.length <= 0) {
    //     state.genre_projectid = [];
    //   }

    // },
    contract_sign(state, content) {
      var arr = Object.keys(content);
      if (arr.length > 0) {
        state.contract = Object.assign({}, content);
        console.log(state);
      } else if (arr.length == 0) {
        state.contract = {};
      }
    },
    contract_owner(state, content) {
      if (content) {
        state.contract.owner_sign = content;
      }
    },
    contract_agent(state, content) {
      if (content) {
        if (state.contract) {
          state.contract.agent_sign = content;
        }

      }
    },
    contract_set(state, content) {
      if (content) {
        state.contract.article = content;
      }
    },
    username_set(state, user) {
      if (user && user != 'null') {
        state.currentUser = user
        //    state.isLogin = true
      } else if (user == null) {
        //退出的时候清空sessionStorage里的东西
        // sessionStorage.clear();
        // sessionStorage.setItem('userName', null);
        //  sessionStorage.setItem('userToke','');
        state.currentUser = null;
        //  state.isLogin = false;
      }
    },
    userStatus(state, usertype) {
      if (usertype) {
        state.currentUsertype = usertype
      } else if (usertype == null) {
        state.currentUsertype = null;
      }
    },
    reset_mutation(state, usertype) {
        Object.assign(state, usertype)
    },
    // RESET_STATE(state, initState) {
    //   if (initState) {
    //     /**
    //      * 注：如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
    //      * Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。
    //      *  */
    //     Object.assign(state, initState);
    //   }
    // }
  },
  actions: {
      // 重置所有状态
    reset_actions(context,obj) {
      context.commit('reset_mutation',obj)
    },
    // genre_projectid_action(context, username) {
    //   // commit('userStatus',user)
    //   context.commit('genre_projectid', username)
    //   //context.commit('userStatus',user)
    //   // 通过接口获取的后台数据保存到store中，等待组件取用
    // },
    genre_action(context, username) {
      // commit('userStatus',user)
      context.commit('genre_array', username)
      //context.commit('userStatus',user)
      // 通过接口获取的后台数据保存到store中，等待组件取用
    },
    setUser(context, username) {
      // commit('userStatus',user)
      context.commit('username_set', username)
      //context.commit('userStatus',user)
      // 通过接口获取的后台数据保存到store中，等待组件取用
    },

    contract_agentsign(context, content) {
      context.commit('contract_sign', content)
    },
    // contract_check(context, content) {

    //   context.commit('contract_set', content)

    // },
    usertype(context, usertype) {
      console.log(context);
      context.commit('userStatus', usertype)
    },

  }
});
