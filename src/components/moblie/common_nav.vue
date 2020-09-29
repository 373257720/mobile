<template>
  <div id="common_nav">
    <p></p>
    <nav class="common_nav">
      <van-icon name="arrow-left" @click="$global.previous()" />
      <span>
        <slot></slot>
      </span>
    </nav>
  </div>
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
#common_nav {
  width: 100%;
  font-weight: bold;
  position: fixed;
  top: 0;
  z-index: 200;
  background: #fff;
  // padding-top: vw(46);
  text-align: center;
  color: #4f3dad;
  font-size: vw(40);
  // height: vw(50);
 
  p {
    height: vw(46);
    width: 100%;
  }
}
nav.common_nav {
  // margin-top: vw(46);
  position: relative;
   line-height: vw(50);
  height: vw(50);
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
