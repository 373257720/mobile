<template>
  <div id="app" :class="{'ispaddingBottom':ispaddingBottom}">
    <!-- <van-overlay class="layer" :show="layerShow"></van-overlay>
    <van-loading color="#0ce5b2" :show="layerShow"/>-->
    <keep-alive include="mhome,mine,mysign,userpass">
      <router-view></router-view>
    </keep-alive>
    <mbottom v-if="$route.meta.isshowbottom"></mbottom>
  </div>
</template>
<script>
// import {mapState} from 'vuex'

// import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
// import Vue from "vue";
// import Loading from "muse-ui-loading";
// Vue.use(Loading);
export default {
  name: "App",
  data() {
    return {
      layerShow: true
    };
  },
  watch: {
    $route: function(to, from) {
      // console.log(this.$route);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  computed: {
    ispaddingBottom() {
      return this.$route.meta.ispaddingBottom;
    }
  },
  created() {
    // console.log(this);
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
body {
  background: #2f36ac;
}

// @media all and (orientation: landscape) {
//   #app {
//     padding-bottom: vw(90);
//   }
// }
.ispaddingBottom {
  padding-bottom: vw(90);
}
#app {
  // background: #2f36ac;
  position: relative;

  // height: 100%;
  // width: 100%;

  // rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
  .van-dropdown-menu__bar {
    height: 100%;
    background: none;
    box-shadow: initial;
  }
  .van-loading__spinner {
    // position: absolute;
    // top: 50%;
    // left: 50%;

    //  transform: translate(-50%, -50%);
  }

  div.van-loading {
    // background: none;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 1;
    transform: translate(-50%, -50%);
    // background:white;
  }
  .van-dialog {
  }
}
// .van-toast {
//   background: none;
// }
div.layer {
  // background: white;
  opacity: 0.4;
}
// .van-toast__loading{
//   color: #1989fa;
// }
</style>
