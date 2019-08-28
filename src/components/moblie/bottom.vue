<template>
  <van-tabbar v-model="active" id="moblie_bottom">
    <van-tabbar-item name="mhome" icon="home-o" @click="$goto('mhome')">首页</van-tabbar-item>
    <van-tabbar-item name="mysign" icon="records" @click="$goto('mysign')">签约</van-tabbar-item>
    <van-tabbar-item
      v-if="this.$store.state.currentUsertype==1"
      name="user_contact"
      icon="contact"
      @click="$goto('user_contact')"
    >联络</van-tabbar-item>
    <van-tabbar-item name="mine" icon="contact" @click="$goto('mine')">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: "moblie_bottom",
  data() {
    return {
      active: "mhome"
    };
  },
  created() {
    this.active = this.$route.name;
    console.log(this.$route.name);
  }
};
</script>
<style lang='scss' >
#moblie_bottom {
  background: #eeeeee;
  height: 1.2rem;
  .van-icon {
    font-size: 0.4rem;
  }
  .van-tabbar-item__text {
    font-size: 0.1rem;
  }
}
</style>
