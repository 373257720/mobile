import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    currentUser: '',
    // login: false,
    currentUsertype: null,
    contract: {
      owner:'',
      article:'',
      agent:'',
      owner_signdate:null,
      agent_signdate:null,
    },
    genre: [],
  },
  getters: {
  
  },
  mutations: {
    agent_signdate(state, content) {
      if (content) {    
        state.contract.agent_signdate= content;
      }else if(content==null){
        state.contract.agent_signdate=null
      }

    },
    owner_signdate(state, content) {
      if (content) {    
        state.contract.owner_signdate= content;
      }else if(content==null){
        state.contract.owner_signdate=null
      }
    },
    genre_array(state, content) {
      if (content.length>0) {    
        state.genre = [];
        state.genre = [...content];
        
      }else if(content.length<=0){
        state.genre = [];
      }

    },
    contract_sign(state, content) {
      var arr = Object.keys(content);
      if (arr.length>0) {
        state.contract= Object.assign({}, content);
        console.log(state);
        // state.contract = content;
      }else if(arr.length == 0){
        state.contract={};
      }


    },
    contract_owner(state, content) {
      if (content) {
        state.contract.owner = content;
      }
    },
    contract_agent(state, content) {
      if (content) {
        if (state.contract) {
          state.contract.agent = content;
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

    // topright(state, user) {
    //   if (user == 'login' || user == 'register' || user == 'usercheck') {
    //     state.topright = false;
    //   } else {
    //     state.topright = true;
    //   }

    // },
  },
  actions: {
    // reset_actions(context) {
    //   // commit('userStatus',user)
    //   context.commit('reset')
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
