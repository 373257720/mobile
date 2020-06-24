<template>
  <div class="owner_contract">
    <div class="iii" v-if="watch">
      <commonnav :msg="$t('agent.SignTheContract')"></commonnav>
      <van-tabs v-model="activeName" @change="ok">
        <van-tab title="tab 1" name="a"></van-tab>
        <van-tab title="tab 2" name="b"></van-tab>
      </van-tabs>
    </div>
    <router-view></router-view>
    <!-- <div> -->
    <!-- <router-view></router-view> -->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "a",
      watch: true
    };
  },
  computed: {},
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用

  //   next(vm => {
  //     if (to.name == "p_sign_contract") {
  //           console.log(1);
  //       vm.watch = false;
  //     } else if (to.name == "p_submit_contract") {
  //       vm.watch = false;
  //     } else {
  //       vm.watch = true;
  //     }
  //   });

  // //   // 不！能！获取组件实例 `this`
  // //   // 因为当钩子执行前，组件实例还没被创建
  // },
  created() {
    // console.log(this.$route.name);
    // if (this.$route.name == "p_sign_contract") {
    //   this.watch = false;
    // } else if (this.$route.name == "p_submit_contract") {
    //   this.watch = false;
    // } else {
    //   this.watch = true;
    // }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // console.log(val);
        if (val.name == "p_sign_contract") {
          this.watch = false;
        } else if (val.name == "p_submit_contract") {
          this.watch = false;
        } else {
          this.watch = true;
        }
      },
      // 深度观察监听
      immediate: true
    }
  },
  methods: {
    ok(name, title) {
      //   console.log(name,title);
      if (name == "a") {
        this.$routerto("owner_set_contract");
      } else {
        this.$routerto("contract_items");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.owner_contract {
  width: 100%;
  height: 100%;
}
.iii {
  padding-top: 1.6rem;
}
</style>
