<template>
  <van-tabbar v-model="active" id="moblie_bottom" inactive-color="#fff" active-color="#00F0AB">
    <van-tabbar-item name="mhome" @click="$routerto('mhome')">
      <van-icon class="iconfont" class-prefix="icon" slot="icon" name="home"></van-icon>
      <span>{{$t('common.Home')}}</span>
    </van-tabbar-item>
    <van-tabbar-item name="mysign"  @click="$routerto('mysign')">
      <van-icon class="iconfont" class-prefix="icon" slot="icon" name="project"></van-icon>
      <span>{{$t('common.MyProjectS')}}</span>
    </van-tabbar-item>
    <van-tabbar-item name="connected_projects">
      <!-- v-if="this.$store.state.currentUsertype==1 || this.$store.state.currentUsertype==4" -->
      <van-icon class="iconfont" class-prefix="icon" slot="icon" name="contact"></van-icon>
      <span>{{$t('common.ConnectedItems')}}</span>
    </van-tabbar-item>
    <van-tabbar-item
      name="p_user_contact"
      icon="friends-o"
      color="#fff"
      v-if="this.$store.state.currentUsertype==1"
    >{{$t('common.Contacts')}}</van-tabbar-item>
    <van-tabbar-item name="mine" @click="$routerto('mine')">
      <van-icon class="iconfont" class-prefix="icon" slot="icon" name="account"></van-icon>
      <span>{{$t('common.ME')}}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: "moblie_bottom",
  data() {
    return {
      // active: "mhome"
    };
  },
  created() {
    // this.active = this.$route.name;
  },
  computed: {
    active() {
      return this.$route.name;
    }
  },
  activated() {
    // console.log(this.$route.name)
    // this.active = this.$route.name;
  }
};
</script>
<style lang='scss' >
#moblie_bottom {
  .van-tabbar-item--active {
    background: none;
  }
  background: #4f3dad;
  height: vw(116);
  .van-icon {
    font-size: vw(45);
  }
  .van-tabbar-item__text {
    font-size: vw(16);
  }
}
</style>
