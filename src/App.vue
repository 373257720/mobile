<template>
  <div id="app">
		<!-- <keep-alive include="mhome,mysign"> -->
			  <router-view></router-view>
		<!-- </keep-alive> -->
    
<!--    <router-view />-->
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
	  // function lockOrientation(){
	  // 	window.screen.lockOrientation("landscape-primary");
	  // };
	  // lockOrientation();
	  // window.screen.lockOrientation("landscape-primary");
    //在页面加载时读取sessionStorage里的状态信息
    // console.log(sessionStorage.getItem("test"))
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    });
  },
  mounted() {
      // plus.screen.lockOrientation("landscape-primary");
    // plus.screen.lockOrientation( 'portrait-primary')
  }
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
 .van-overlay{
  /* background-color: white; */
  /* opacity: 0.5; */
  /*transition-property:*/
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


.van-toast__loading{
  /* color:#00adef; */
}
</style>
