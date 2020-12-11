<template>
  <div id="example-1">
    <button @click="show = !show">Toggle render</button>
    <transition name="slide-fade">
      <p @click="show = !show" v-show="!show">hello</p>
    </transition>
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
      show: true
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
// #example-1 {
//   position: relative;
// }
// // p {
// //   position: fixed;
// //   top: 0;
// //   background: #fff;
// // }
// .slide-fade-enter-active {
//   transition: all 1s ease;
//   // position: fixed;
// }
// .slide-fade-leave-active {
//   transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
// }
// .slide-fade-enter, .slide-fade-leave-to
// /* .slide-fade-leave-active for below version 2.1.8 */ {
//   transform: translateX(100%);
//   opacity: 0;
// }
</style>