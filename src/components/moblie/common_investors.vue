<template>
  <div id="common_investors">
    <ul>
      <li i v-for="(item,key) in investor_infor" :key="item.name">
        <div v-if="key!='investorsCompany' || (key='investorsCompany' && item.response!='')">
          <p class="row1">{{item.name}}</p>
          <p class="row2">{{item.response}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "common_investors",
  props: ["investor_infor"],
  data() {
    return {};
  },
  created() {
    console.log(this.investor_infor);
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
#common_investors {
  ul {
    padding: 0.1rem 0.5rem;
    li {
      > div {
        margin-bottom: 0.1rem;
        display: flex;
        align-items: baseline;
        font-size: 0.38rem;
      }
      .row1 {
        color: #4c4c4c;
        font-weight: 600;
        width: 3rem;
      }
      .draft {
        margin-bottom: 0.25rem;
      }
      .row2 {
        width: 7rem;
        word-break: break-all;
        line-height: 0.48rem;
        color: #787878;
      }
      .draft1 {
        padding: 0.2rem 0.4rem;
        box-sizing: border-box;
      }
    }
  }
}
</style>
