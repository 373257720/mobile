<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  watch: {
    $route: function(to, from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      console.log('beforeunload');
      
      sessionStorage.setItem("usertype", this.$store.state.currentUsertype);
      sessionStorage.setItem("username", this.$store.state.currentUser);
      sessionStorage.setItem(
        "contract",
        JSON.stringify(this.$store.state.contract)
      );
       sessionStorage.setItem(
        "genre_array",
        JSON.stringify(this.$store.state.genre)
      );
    });
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("usertype")) {
      console.log('beggin');  
      this.$store.commit("username_set", sessionStorage.getItem("username"));
      this.$store.commit("userStatus", sessionStorage.getItem("usertype"));
      this.$store.commit(
        "contract_sign",
        JSON.parse(sessionStorage.getItem("contract"))
      );
       this.$store.commit(
        "genre_array",
        JSON.parse(sessionStorage.getItem("genre_array"))
      );
    }

  }
};
</script>

<style>
#app {
  /* height: 100%; */
  width: 100%;
 /* background: #EEEEEE;  */
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
