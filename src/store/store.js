import Vue from "vue";
import Vuex from "vuex";
// import { connect } from "echarts";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loading: false,
    selectedItem: {},
    selectedProjectStatus:{},
    usercheck: {
      nation: {},
      genus: "",
      identity: ""
    },
    currentUser: "",
    X_Token: "",
    currentUsertype: null,
    // contract: {
    //   article: "",
    //   owner_sign: "",
    //   owner_name: "",
    //   owner_title: "",
    //   owner_signdate: null,
    //   agent_sign: "",
    //   agent_name: "",
    //   agent_title: "",
    //   agent_signdate: null
    // },
    inverstor: {
      investorsType: null,
      investorsCompany: "",
      investorsName: ""
    },
    electedList: {
      industryList: [],
      regionList: [],
      taglist: []
    },
  },
  getters: {
    totalResults: state => {
      return [
        ...state.electedList.industryList,
        ...state.electedList.regionList,
        ...state.electedList.taglist
      ];
    }
  },
  mutations: {
    selectedProjectStatusMutations(state, content) {
      // if (content.name) {
      state.selectedProjectStatus = content;
      // }
      // state.electedList = content;
    },
    selectedItemMutations(state, content) {
      // if (content.name) {
      state.selectedItem = content;
      // }
      // state.electedList = content;
    },
    electedList(state, content) {
      if (content.name) {
        state.electedList[content.name] = content.arr;
      }
      // state.electedList = content;
    },
    delect(state, content) {
      if (content.name) {
        console.log(content);
        state.electedList[content.name].splice(content.index, 1);
      }
    },
    isloading(state, content) {
      state.loading = content;
    },
    pickIdentity(state, content) {
      // console.log(state, content);
      state.usercheck.identity = Object.assign({}, content);
    },
    pickgenus(state, content) {
      // console.log(state, content);
      state.usercheck.genus = Object.assign({}, content);
    },
    pickNation(state, content) {
      // console.log(state, content);
      state.usercheck.nation = Object.assign({}, content);
    },
    inverstor_mutation(state, content) {
      var arr = Object.keys(content);
      if (arr.length > 0) {
        state.inverstor = Object.assign({}, content);
        // console.log(state);
      } else if (arr.length == 0) {
        state.inverstor = {};
      }
    },
    username_set(state, user) {
      if (user && user != "null") {
        state.currentUser = user;
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
        state.currentUsertype = usertype;
      } else if (usertype == null) {
        state.currentUsertype = null;
      }
    },
    reset_mutation(state, usertype) {
      Object.assign(state, usertype);
    },
    X_Token_mutation(state, usertype) {
      if (usertype) {
        state.X_Token = usertype;
      }
    }
  },
  actions: {
    // 重置所有状态
    X_Token_actions(context, obj) {
      context.commit("X_Token_mutation", obj);
    },
    reset_actions(context, obj) {
      context.commit("reset_mutation", obj);
    },
    setUser(context, username) {
      // commit('userStatus',user)
      context.commit("username_set", username);
      //context.commit('userStatus',user)
      // 通过接口获取的后台数据保存到store中，等待组件取用
    },
    usertype(context, usertype) {
      console.log(context);
      context.commit("userStatus", usertype);
    }
  }
});
