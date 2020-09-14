<template>
  <nav class="common_nav">
    <van-icon name="arrow-left" @click="$global.previous()" />
    <span>{{msg}}</span>
  </nav>
</template>
<script >
export default {
  name: "common_nav",
  props: {
    msg: String
  }
};
</script>
<style lang="scss">
nav.common_nav {
  // width: 100%;
  // font-weight: bold;
  // position: relative;
  // height: 100%;
  // text-align: center;
  // line-height: 1.6rem;
  // height: 1.6rem;
  // position: fixed;
  // top: 0;
  // z-index: 5;
  // font-size: 0.46rem;
  // background: white;
  // border-bottom: 0.1rem solid #b5b5b5;
  // .van-icon-arrow-left {
  //   position: absolute;
  //   left: 0.6rem;
  //   top: 50%;
  //   transform: (translate(0, -50%));
  // }
  width: 100%;
  font-weight: bold;
  // position: relative;
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 200;
  background: #2f36ac;
  text-align: center;
  line-height: vw(98);
  height: vw(98);
  color: #ffffff;
  font-size: vw(30);
  // margin-bottom: vw(199);
  .van-icon-arrow-left {
    position: absolute;
    left: vw(36);
    top: 50%;
    transform: (translate(0, -50%));
  }
}
@media (min-width: 768px) {
  nav.common_nav {
    // margin-bottom: vw(100);
  }
}
</style>
