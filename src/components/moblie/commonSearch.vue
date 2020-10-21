<template>
  <van-search
    v-model="searchkey"
    :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
    @input="update"
    shape="round"
    left-icon
  >
    <div slot="right-icon">
      <van-icon name="search" />
    </div>
  </van-search>
</template>
<script>
export default {
  name: "mhome",
  props: {
    searchkey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  created() {},

  methods: {
    update() {
        this.$emit('update:searchkey',searchkey)
    }
  }
};
</script>
<style lang="scss">
.van-search {
  width: vw(598);
  margin: 0 auto;
  padding: 0;
}
.van-search__content {
  border: vw(2) solid #3ab5cc;
  background: #fff;
  .van-icon-search,
  .van-icon-clear {
    color: #3ab5cc;
  }
}
</style>