<template>
<van-dialog @confirm="closeSimple" v-model="remindervisible" :title="titleOne">
  <div class="van-dialog__message">
    {{msg}}
  </div>
</van-dialog>
  <!-- <mu-dialog
    dialog-class="selfDialog"
    :overlay-close="false"
    :esc-press-close="false"
    :title="titleOne"
    :open.sync="remindervisible"
    width="80%"
  >
    {{msg}}
    <mu-button slot="actions" flat color="primary" @click="closeSimple()">Close</mu-button>
  </mu-dialog> -->
</template>
<script>
export default {
  props: ["title", "msg", "isSuccess", "remindervisible"],
  data() {
    return {};
  },
  computed: {
    titleOne() {
      return this.title || this.$t("common.Reminder");
    }
  },
  watch: {},
  methods: {
    closeSimple() {
      this.$emit("update:remindervisible", false);
      if (this.issuccess) {
        console.log(this.issuccess);

        // this.$router.replace({
        //   path: "/login" //跳转的路径
        // });
      }
    }
  }
};
</script>
<style lang='scss'>
.van-dialog{
  background: #00E3A2;
  color: #FFFFFF;
}
.van-button--default{
   background: #00E3A2;
   color: #FFFFFF;
}
.van-dialog__header{
  font-size: vw(36)
}
.van-hairline--top::after{
  border-top-width: 2px;






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
