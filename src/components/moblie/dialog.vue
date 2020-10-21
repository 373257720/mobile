<template>
  <van-dialog @confirm="closeSimple" v-model="remindervisible" :title="titleOne"
   :show-cancel-button="showCancel">
    <div class="van-dialog__message">{{msg}}</div>
  </van-dialog>
</template>
<script>
export default {
  props: ["title", "msg", "isSuccess", "remindervisible", "showCancel"],
  data() {
    return {};
  },
  computed: {
    titleOne() {
      return this.title;
    }
  },
  watch: {},
  methods: {
    closeSimple() {
      this.$emit("update:remindervisible", false);
      // if (this.issuccess) {
      //   console.log(this.issuccess);

      //   this.$router.replace({
      //     path: "/login" //跳转的路径
      //   });
      // }
    }
  }
};
</script>

<style lang='scss'>
.van-dialog {
  background: #00e3a2;
  color: #ffffff;
}
.van-button--default {
  background: #00e3a2;
  color: #ffffff;
}
.van-dialog__header {
  font-size: vw(36);
}
.van-hairline--top::after {
  // border: 0 solid #fff;
  border-top-width: vw(2);
  border-top-color: #fff;
}
.van-hairline--left::after {
  border-left-width: vw(2);
  border-left-color: #fff;
}
.van-dialog__message {
  padding: vw(184) vw(58) vw(120);

  font-size: vw(30);
  line-height: vw(34);
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
.selfDialog {
  // .mu-dialog-title {
  //   font-size: vw(50);
  //   padding: vw(36) vw(36) vw(20);
  //   line-height: vw(56);
  // }
  // .mu-dialog-body {
  //   font-size: vw(32);
  //   padding: vw(20) vw(36);
  // }
  // .mu-dialog-actions {
  //   padding: vw(20) vw(10);
  // }
  // .mu-flat-button {
  //   font-size: vw(30);
  // }
}
</style>
