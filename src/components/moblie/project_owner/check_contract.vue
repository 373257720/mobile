<template>
  <div id="p_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />查看合约
    </nav>
    <main>
      <article>
        <div class="contract">
          <div class="top"></div>
          <div class="middle" v-html="content"></div>
          <div class="button">
            <p>
              <img :src="owner" alt />
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
        <!-- <footer>
          <button @click="$routerto('a_sign_contract',$route.query)">签署</button>
        </footer>-->
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
      owner: "",
      content: "",
      isshow: null,
      details_lists: ["申请时间:", "申请中间人:", "申请项目:"]
    };
  },
  created() {
    this.$loading();

    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/projectSign/getSignAgreement?signId=${this.$route.query.signId}`
    }).then(res => {
      console.log(res.data.data.signAgreement);
      let str = JSON.parse(res.data.data.signAgreement);
      this.owner = str.owner;
      this.content = str.article;
      this.$toast.clear();
    });
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
#p_check_contract {
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
#p_check_contract {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    z-index: 5;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    padding: 0.5rem;
    // height:100%;
    background: #ffffff;
    .contract {
      // background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      border: 1px solid rgb(169, 169, 169);
      padding: 0.4rem 0.4rem;
      width: 100%;
      height: 15rem;
      overflow-y: auto;
      word-wrap: break-word;
      color: rgb(169, 169, 169);
      div.button {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 3rem;
            height: 1rem;
            border-bottom: 1px solid rgb(169, 169, 169);
          }
        }
      }
    }
    footer {
      width: 100%;
      button {
        width: 100%;
        margin-top: 1rem;
        background: #00adef;
        color: white;
        height: 0.8rem;
      }
    }
  }
}
</style>