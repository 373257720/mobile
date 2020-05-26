<template>
  <van-tabbar v-model="active" id="moblie_bottom">
    <van-tabbar-item name="mhome" icon="home-o" @click="$routerto('mhome')">{{$t('common.Home')}}</van-tabbar-item>
    <van-tabbar-item name="mysign" icon="records" @click="$routerto('mysign')">{{$t('common.MyProjectS')}}</van-tabbar-item>
    <van-tabbar-item name="connected_projects"   icon="certificate" @click="$routerto('connected_projects')"
    v-if="this.$store.state.currentUsertype==1 || this.$store.state.currentUsertype==4"
    >{{$t('common.ConnectedItems')}}</van-tabbar-item>
    <van-tabbar-item
      name="p_user_contact"
      icon="friends-o"
      v-if="this.$store.state.currentUsertype==1"
      @click="$routerto('p_user_contact')"
    >{{$t('common.Contacts')}}</van-tabbar-item>
    <van-tabbar-item name="mine" icon="contact" @click="$routerto('mine')">{{$t('common.ME')}}</van-tabbar-item>

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
  created(){
	  this.active = this.$route.name;
  },
  activated() {
	// console.log(this.$route.name)
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
