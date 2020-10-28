<template>
  <div id="common_nav">
    <header>
      <slot name="arrowLeft"></slot>
      <span>
        <slot></slot>
      </span>
      <slot name="arrowRight"></slot>
    </header>
    <slot name="search"></slot>
  </div>
</template>
<script >
export default {
  name: "common_nav",
  props: {
    msg: String,
    transition: Boolean
  },
  created() {
    console.log(this.transition);
  },
  methods: {
    transitionToDad() {
      this.$emit("update:transition", true);
      // this.$emit('update:transition',1234567);
    }
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
  header {
    height: vw(140);
    position: relative;
    line-height: vw(140);
    .van-icon-arrow-left {
      position: absolute;
      left: vw(36);
      top: 50%;
      transform: (translate(0, -50%));
    }
    .van-icon-arrow {
      position: absolute;
      right: vw(36);
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-search {
    height: vw(68);
    width: vw(598);
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0;
    // padding-top: 0;
    .van-search__content {
      border: vw(2) solid #3ab5cc;
      background: #fff;
      .van-icon-search,
      .van-icon-clear {
        color: #3ab5cc;
      }
    }
  }
}

@media (min-width: 768px) {
  nav.common_nav {
    // margin-bottom: vw(100);
  }
}
</style>
