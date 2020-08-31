<template>
  <div id="app">
    <keep-alive include="mhome,mine,mysign,userpass">
      <router-view></router-view>
    </keep-alive>
    <mbottom v-if="$route.meta.isshowbottom"></mbottom>
  </div>
</template>
<script>
// import {mapState} from 'vuex'
export default {
  name: "App",
  watch: {
    $route: function(to, from) {
      console.log(this.$route);

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
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
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    // console.log("7-13更新");
  }
};
</script>

<style lang="scss">
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vm_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function pxtorem($px) {
     @return ($px / $vm_fontsize ) * 1rem;
}



#app {
  height: 100%;
  width: 100%;
  // rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推

  .van-dropdown-menu__bar {
    height: 100%;
    background: none;
    box-shadow: initial;
  }

  div.loading {
    // background: none;
  }
  .van-dialog {
  }
}
// .van-toast {
//   background: none;
// }
// .van-overlay{
//     background: white;
//     opacity: 0.6;
// }
// .van-toast__loading{
//   color: #1989fa;
// }
</style>
