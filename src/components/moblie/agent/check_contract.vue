<template>
  <div id="a_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签署合约
    </nav>
    <!-- <main v-if="isshow==2">
      <article>
        <div v-html="content"></div>
        <footer>
          <button @click="gg">导出</button>
        </footer>
      </article>
    </main> -->
    <main>
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
    //  let str =this.$store.state.contract;
    let str =JSON.parse(this.$store.state.contract.body) ;
    // let a = str.split("!!!!!");
    console.log(str);
    
    // console.log(a);
    this.content = str.body;
    this.signature = str.owner;
    // console.log(this.content);

    // if (this.$route.query.from == "a_wait_signed") {
    //   this.isshow = 1;
    // }
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
      // console.log(this.content);
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
#a_check_contract {
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
    background: #ffffff;
    .contract {
      background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.4rem 0.4rem;
      width: 100%;
      height: 12rem;
      overflow-y: auto;
      word-wrap: break-word;
      color: rgb(169, 169, 169);
        div.button{
          margin-top:2rem;
          display: flex;
          justify-content: space-between;
          p{
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
              width: 3rem;
              height: 1rem;
              border-bottom:1px solid rgb(169, 169, 169);
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
