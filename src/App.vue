<template>
  <div id="app">
    <!-- <van-overlay class="layer" :show="layerShow"></van-overlay>
    <van-loading color="#0ce5b2" :show="layerShow"/>-->
    <!-- <transition name="Skright"> -->
    <!-- <div
      v-loading="true"
      data-mu-loading-overlay-color="rgba(0, 0, 0, .6)"
      style="position: relative; width: 500px; height: 400px;"
    >-->
    <layer></layer>
    <keep-alive include="mine,userpass,AccountMessage">
      <router-view
        v-on:cancelCountUserMessageUnread="cancelCountUserMessageUnread"
        v-on:getCountUserMessageUnread="setMessageUnread"
        :class="{ ispaddingBottom: ispaddingBottom }"
      ></router-view>
    </keep-alive>
    <mbottom v-if="$route.meta.isshowbottom"></mbottom>
    <!-- </div> -->

    <!-- </transition> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import layer from "@/components/moblie/common/layer";
// import {mapState} from 'vuex'
// import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
// import Vue from "vue";
// import Loading from "muse-ui-loading";
// Vue.use(Loading);
export default {
  name: "App",
  data() {
    return {
      layerShow: true,
      SkipSwitchName: "",
      messageTimer: null,
    };
  },
  components: {
    layer: layer,
  },
  watch: {
    $route: function (to, from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  computed: {
    ispaddingBottom() {
      return this.$route.meta.ispaddingBottom;
    },
  },
  created() {
    // console.log(this);
    // console.log(this.$store.state.loaded);
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
    if (this.$store.state.X_Token) {
      this.setMessageUnread();
    }
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    // console.log("7-13更新");
    // if(this.messageTimer===null && ){
    //     this.setMessageUnread()
    // }
  },

  beforeDestroy() {
    this.cancelCountUserMessageUnread();
  },
  methods: {
    cancelCountUserMessageUnread() {
      clearInterval(this.messageTimer);
    },
    setMessageUnread() {
      this.messageTimer = setInterval(this.getCountUserMessageUnread, 30000);
    },
    getCountUserMessageUnread() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/getCountUserMessageUnread`
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            // console.log("timer");
            this.$store.dispatch("UnreadMessage_action", res.data.data);
          }
        });
    },
  },
};
</script>

<style lang="scss">
body {
  background: #fff;
  position: relative;
}
.van-button--default {
  border: none !important;
}
input {
  border-radius: 0;
}
.van-dialog {
  color: #ffffff;
  background-color: #00e3a2 !important;
  .van-cell-group {
    //  background-color: #00e3a2;
    .van-cell {
      background-color: #00e3a2;
      color: #fff;
    }
  }
  .van-button--default {
    background: #00e3a2;
    color: #ffffff;
  }
  .van-dialog__header {
    font-size: vw(36);
    font-weight: bold;
  }
  .van-hairline--top::after {
    // border: 0 solid #fff;
    border-top-width: 2px;
    border-top-color: #fff;
  }
  .van-hairline--left::after {
    border-left-width: 2px;
    border-left-color: #fff;
  }
  .van-dialog__message {
    // padding: vw(72) vw(58) vw(72);
    font-size: vw(30);
    line-height: vw(34);
    color: #ffffff;
    font-weight: bold;
  }
  .van-dialog__cancel,
  .van-dialog__confirm {
    height: initial;
  }
  .van-button__content {
    .van-button__text {
      color: #ffffff;
      font-size: vw(40);
      padding: vw(42) 0;
    }
  }
}
.van-button--primary {
  border: none;
}
.Skright-enter-active,
.Skright-leave-active,
.Skleft-enter-active,
.Sklef-leave-active {
  transition: all 600ms;
}
//先给 所要用的上下层级跳转写一个过渡时间
//然后你就可以发挥自己的想象力来写自己动画了 下面是一个例子
.Skright-enter {
  transform: translate3d(-100%, 0, 0);
}
.Skright-leave-to {
  transform: translate3d(100%, 0, 0);
}
.Skleft-enter {
  transform: translate3d(100%, 0, 0);
}
.Skleft-leave-to {
  transform: translate3d(-100%, 0, 0);
}
// @media all and (orientation: landscape) {
//   #app {
//     padding-bottom: vw(90);
//   }
// }
.ispaddingBottom {
  // padding-bottom: vw(90);
  padding-bottom: 50px;
}
// @media all and (orientation: landscape) {
//   .ispaddingBottom > div:nth-child(1) {
//     padding-bottom: 0;
//   }
// #app > div:nth-child(1)>div:nth-child(1) {
//   padding-bottom: vw(90);
// }
// }
#app {
  // background: #2f36ac;
  position: relative;
  background: #fff;

  height: 100%;
  width: 100%;

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

div.selfloading {
  background: none;
}
div.van-overlay {
  // opacity: 0.6;
}
.van-toast__loading {
  color: #0ce5b2;
}
.van-toast {
  font-size: vw(36);
  line-height: vw(36);
}
.van-loading__circular circle {
  stroke-width: 6px;
}
.van-toast--html,
.van-toast--text {
  padding: vw(20);
}
</style>
