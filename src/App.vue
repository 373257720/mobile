<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

    // import {mapState} from 'vuex'
export default {
  name: "App",
  watch: {
    $route: function(to, from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    // console.log(sessionStorage.getItem("test"))
    // localStorage.getItem("store", JSON.stringify(this.$store.state))
    alert(localStorage.getItem("store", JSON.stringify(this.$store.state)));
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      alert('beforeunload');
      localStorage.setItem("store", JSON.stringify(this.$store.state))
      // sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    window.addEventListener("pagehide", () => {
      alert('onpagehide');
      localStorage.setItem("store", JSON.stringify(this.$store.state))
      // sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
  // created() {
  //   if (sessionStorage.getItem("usertype")) {
  //     console.log(this.$store.state);
  //     console.log(JSON.parse(sessionStorage.getItem("contract")));
  //     this.$store.commit("username_set", sessionStorage.getItem("username"));
  //     this.$store.commit("userStatus", sessionStorage.getItem("usertype"));
  //     this.$store.commit(
  //       "contract_sign",
  //       JSON.parse(sessionStorage.getItem("contract"))
  //     );
  //     this.$store.commit(
  //       "genre_array",
  //       JSON.parse(sessionStorage.getItem("genre_array"))
  //     );
  //     // alert(JSON.stringify(this.$store.state.contract))
  //   }
  //   //在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener("beforeunload", () => {
  //     sessionStorage.setItem("store", JSON.stringify(this.$store.state));
  //     console.log(JSON.stringify(this.$store.state.contract));
  //     sessionStorage.setItem("usertype", this.$store.state.currentUsertype);
  //     sessionStorage.setItem("username", this.$store.state.currentUser);
  //     console.log(this.$store.state.contract);
  //     sessionStorage.setItem(
  //       "contract",
  //       JSON.stringify(this.$store.state.contract)
  //     );
  //     sessionStorage.setItem(
  //       "genre_array",
  //       JSON.stringify(this.$store.state.genre)
  //     );
  //     // alert(JSON.stringify(this.$store.state.contract))
  //   });
  //   //在页面加载时读取sessionStorage里的状态信息

  //   // console.log(this.$store.state );
  // }
};
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
  /* background: #EEEEEE;  */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

div.loading{
  background: none;

}
.van-dialog{

  /* border: 1px solid; */
}

/*.van-dialog__message {*/
/*  font-size: 0.4375rem;*/
/*}*/
/*.van-button {*/
/*  !*font-size: 0.48rem;*!*/
/*}*/
/*.van-dialog{*/
/*    font-size: 0.5rem;*/

/*  }*/
/* .van-overlay{
  background-color:white;
  opacity: 0.5;
} */
/* .van-toast__loading{
  color:#1989fa;
} */
</style>
