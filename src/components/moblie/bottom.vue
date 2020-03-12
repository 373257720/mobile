<template>
  <van-tabbar v-model="active" id="moblie_bottom">
    <van-tabbar-item name="mhome" icon="home-o" @click="$goto('mhome')">首页</van-tabbar-item>
    <van-tabbar-item name="mysign" icon="records" @click="$goto('mysign')">我的项目</van-tabbar-item>
    <van-tabbar-item name="connected_projects"   icon="certificate" @click="$routerto('connected_projects')"
    v-if="this.$store.state.currentUsertype==1 || this.$store.state.currentUsertype==4"
    >已连接项目</van-tabbar-item>
    <van-tabbar-item
      name="p_user_contact"
      icon="friends-o"
      v-if="this.$store.state.currentUsertype==1"
      @click="$goto('p_user_contact')"
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
  }
};
</script>
<style lang='scss' >
#moblie_bottom {
  background: #eeeeee;
  height: 1.3rem;
  .van-icon {
    font-size: 0.55rem;
  }
  .van-tabbar-item__text {
    font-size: 0.28rem;
  }
}
</style>
