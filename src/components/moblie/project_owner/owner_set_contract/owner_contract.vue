<template>
  <div class="owner_contract">
    <div>
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
      activeName: "a"
    };
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
  padding-top: 1.6rem;
}
</style>
