<template>
  <div id="usercheckRoot">
    <!-- <transition :name="transitionName"> -->
    <!-- <router-view :usercheck="usercheck"></router-view> -->
    <div @fromto="goto" :usercheck="usercheck" :is="currentView"></div>
    <!-- </transition> -->
  </div>
</template>
<script>
import Verify from "@/components/moblie/login/Verify";
import genus from "@/components/moblie/common/genus";
// import nationality from "@/components/moblie/common/nationality";
// import identity from "@/components/moblie/common/identity";
// import usercheck from "@/components/moblie/common/usercheck";
export default {
  name: "usercheckRoot",
  components: {
    genus,
    // nationality,
    // identity,
    Verify
  },
  data() {
    return {
      currentView: "Verify",
      transitionName: "",
      usercheck: {
        nation: {},
        genus: {},
        identity: {}
      }
    };
  },
  methods: {
    goto(name) {
      console.log(name);

      this.currentView = name;
    }
  },
  watch: {
    $route(to, from) {
      //   console.log(to, from);
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
      // console.log(this.transitionName);
    }
  }
};
</script>
<style lang="scss">
//转场动画
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  // 启用硬件加速
  will-change: transform;
  transition: all 3000ms;
  position: fixed;
}
.slide-left-enter {
  transform: translate(100%, 0);
  transition-timing-function: ease-in;
}
.slide-left-enter-to {
  transform: translate(0, 0);
}
.slide-right-enter {
  transform: translate(-100%, 0);
  transition-timing-function: ease-in;
}
.slide-right-enter-to {
  transform: translate(0, 0);
}
</style>