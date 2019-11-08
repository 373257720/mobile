<template>
  <div id="a_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签署合约
    </nav>
    <main v-if="isshow==2">
      <article>
        <div v-html="content"></div>
        <footer>
          <button @click="gg">导出</button>
        </footer>
      </article>
    </main>
    <main v-if="isshow===1">
      <article>
        <div class="contract">
          <div class="top"></div>
          <div class="middle" v-html="content"></div>
          <div class="button">
            <p>
              <img :src='signature' alt />
              <span>投行</span>
              <span>2019.11.11</span>
            </p>
            <p>
              <img src alt />
              <span>中间人</span>
              <span>2019.11.11</span>
            </p>
          </div>
        </div>
        <footer>
          <button @click="$routerto('a_sign_contract',$route.query)">签署</button>
        </footer>
      </article>
    </main>

    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      signature: "",
      content: "",
      isshow: null,
      details_lists: ["申请时间:", "申请中间人:", "申请项目:"]
    };
  },
  created() {
    console.log(this.$route);
    // console.log(this.$store.state.contract);
    let str = this.$store.state.contract;
    let a = str.split("!!!!!");
    // console.log(a);
    this.content = a[0];
    this.signature = a[1];
    console.log(this.content);

    if (this.$route.query.from == "a_wait_signed") {
      this.isshow = 1;
    }
    //  else if (this.$route.name== "a_sign_contract") {
    //   this.isshow = 3;
    // }
    // this.$axios({
    //   method: "post",
    //   url: `${this.$baseurl}/bsl_web/projectSign/signProject4`,
    //   data: this.$qs.stringify(this.form)
    // }).then(res => {
    //   if (res.data.resultCode == 10000);
    //   {
    //     // this.$goto("mhome");
    //   }
    // });
  },
  mounted() {
    // this.content = "";
  },
  methods: {
    signname() {
      console.log(this.content);
    }
  }
};
</script>
<style lang="scss">
#a_check_contract {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-hairline--top-bottom::after {
    border: 0.02rem solid #8e8e8e;
  }
  .van-field {
    background: #f2f2f2;
  }
}
</style>
<style lang="scss" scoped>