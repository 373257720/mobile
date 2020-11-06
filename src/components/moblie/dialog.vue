<template>
  <van-dialog
    class="selfDialog"
    @cancel="closeSimple"
    @confirm="comfirm"
    v-model="ishow"
    :confirmButtonText="confirmButtonText"
    :cancelButtonText="cancelButtonText"
    :title="title"
    :show-cancel-button="showCancel"
  >
    <div class="van-dialog__message">{{msg}}</div>
  </van-dialog>
</template>
<script>
export default {
  props: {
    cancelButtonText: {
      default: "",
      type: String
    },
    confirmButtonText: {
      default: "",
      type: String
    },
    msgtype: String,
    remindervisible: Boolean,
    showCancel: Boolean,
    title: String,
    msg: String
  },
  data() {
    return {
      ishow: this.remindervisible
    };
  },
  computed: {},
  watch: {
    remindervisible: function(neww, old) {
      this.ishow = neww;
      // console.log(neww);
    }
  },
  methods: {
    comfirm() {
      this.$emit("comfirmFromDialog", this.msgtype);
      //  this.$emit("update:remindervisible", false);
    },
    closeSimple() {
      // console.log(1)
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
.selfDialog {
  background: #00e3a2;
  color: #ffffff;

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
    border-top-width: vw(2);
    border-top-color: #fff;
  }
  .van-hairline--left::after {
    border-left-width: vw(2);
    border-left-color: #fff;
  }
  .van-dialog__message {
    padding: vw(72) vw(58) vw(72);

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
