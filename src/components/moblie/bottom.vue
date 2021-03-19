<template>
  <van-tabbar
    v-model="activeTag"
    id="moblie_bottom"
    inactive-color="#fff"
    active-color="#00F0AB"
  >
    <van-tabbar-item name="mhome" replace to="/mhome">
      <van-icon
        class="iconfont"
        class-prefix="icon"
        slot="icon"
        name="home"
      ></van-icon>
      <span>{{ $t("common.Home") }}</span>
    </van-tabbar-item>
    <van-tabbar-item name="mysign" replace to="/mysign">
      <van-icon
        class="iconfont"
        class-prefix="icon"
        slot="icon"
        name="project"
      ></van-icon>
      <span>{{ $t("common.MyProjectS") }}</span>
    </van-tabbar-item>
    <van-tabbar-item
      v-if="this.$store.state.currentUsertype == 4"
      name="a_recommandHistory"
      replace
      to="/a_recommandHistory"
    >
      <van-icon
        class="iconfont"
        class-prefix="icon"
        slot="icon"
        name="contact"
      ></van-icon>
      <span>{{ $t("project.Recommand") }}</span>
    </van-tabbar-item>
    <van-tabbar-item
      v-if="this.$store.state.currentUsertype == 1"
      name="contactList"
      replace
      to="/contactRoot/contactList"
    >
      <van-icon
        class="iconfont"
        class-prefix="icon"
        slot="icon"
        name="contact"
      ></van-icon>
      <span>{{ $t("common.Contacts") }}</span>
    </van-tabbar-item>
    <!-- <van-tabbar-item
      name="p_user_contact"
      icon="friends-o"
      color="#fff"
      replace
      to="/contact"
      v-if="this.$store.state.currentUsertype==1"
    >{{$t('common.Contacts')}}</van-tabbar-item> -->
    <van-tabbar-item name="mine" replace to="/mine">
      <van-icon
        class="iconfont"
        class-prefix="icon"
        slot="icon"
        :dot="$store.state.UnreadMessage > 0"
        name="account"
      ></van-icon>
      <span>{{ $t("common.ME") }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: "moblie_bottom",
  data() {
    return {
      // activeTag: "mhome"
    };
  },

  // created() {
  //   this.activeTag = this.$route.name;
  // },
  // watch: {
  //   $route: function(to, from) {
  //     console.log(to);

  //     this.activeTag = to.name;
  //   }
  // },
  computed: {
    isdot() {
      if (this.$store.state.UnreadMessage > 0) {
        return true;
      } else {
        return false;
      }
    },
    activeTag: {
      get() {
        // console.log(this.$route.name);
        return this.$route.name;
      },
      set(value) {
        // console.log(value);
        // return value;
      },
    },
  },
  activated() {
    // console.log(this.$route.name)
    // this.active = this.$route.name;
  },
};
</script>
<style lang='scss' >
#moblie_bottom {
  .van-tabbar-item--active {
    background: none;
  }
  background: #4f3dad;
  height: 50px;
  .van-icon {
    font-size: vw(45);
  }
  .van-tabbar-item__text {
    font-size: vw(16);
  }
}
</style>
