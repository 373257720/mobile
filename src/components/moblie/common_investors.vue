<template>
  <div id="common_investors">
    <van-divider>{{$t('projectOwner.InvestorInformation')}}</van-divider>
    <ul>
      <li >
        <div >
          <p class="row1">{{investor_infor.investorsType.name}}:</p>
          <p class="row2">{{investor_infor.investorsType.response}}</p>
        </div>
      </li>
      <li>
        <div v-if="investor_infor.Type==1">
          <p class="row1">{{investor_infor.investorsName.name}}:</p>
          <p class="row2">{{investor_infor.investorsName.response}}</p>
        </div>
      </li>
      <li v-if="investor_infor.Type==2">
        <div>
          <p class="row1">{{investor_infor.investorsCompany.name}}:</p>
          <p class="row2">{{investor_infor.investorsCompany.response}}</p>
        </div>
      </li>
      <li  >
        <div >
          <p class="row1">{{investor_infor.investorsArea.name}}:</p>
          <p class="row2">{{investor_infor.investorsArea.response}}</p>
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
#common_investors{
  .van-divider{
    background:#F2F2F2;
    border-color: #D2D2D2;
    padding: 0 2rem;
    margin:0;
    color: #858585;
    font-size: 0.42rem;
  }
}
</style>
<style lang="scss" scoped>
#common_investors {
  ul {
    padding: 0.1rem 0.5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
    li {
      > div {
        // margin-bottom: 0.1rem;
        display: flex;
        align-items: baseline;
        font-size: 0.42rem;
      }
      .row1 {
        color: #4c4c4c;
        font-weight: 600;
        width: 4.4rem;

      }
      .draft {
        margin-bottom: 0.25rem;
      }
      .row2 {
        flex: 1;
       display: flex;
        justify-content: center;
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
