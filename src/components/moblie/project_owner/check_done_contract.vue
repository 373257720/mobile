<template>
  <div id="p_check_done_contract">
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
              <i>
                <img v-if="owner" :src="owner" alt />
              </i>

              <span>投行</span>
              <span>{{owner_signdate==null?owner_signdate:''}}</span>
            </p>
            <p>
              <i>
                <img v-if="agent" :src="agent" alt />
              </i>

              <span>中间人</span>
              <span>{{agent_signdate==null?agent_signdate:''}}</span>
            </p>
          </div>
        </div>
        <footer>
          <!-- @click="$routerto('a_sign_contract',$route.query)" -->
          <!-- <button @click="output">导出</button> -->
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
      owner: "",
      content: "",
      agent: "",
      isshow: null,
      owner_signdate: "",
      agent_signdate: "",
      details_lists: ["申请时间:", "申请中间人:", "申请项目:"]
    };
  },
  created() {
    this.$loading();
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/projectSign/getSignAgreement?signId=${this.$route.query.signId}`
      // data: this.$qs.stringify(this.form)
    })
      .then(res => {
        console.log(res);

        let str = JSON.parse(res.data.data.signAgreement);
        this.owner = str.owner;
        this.content = str.article;
        this.owner_signdate = this.$global.stamptodate(str.owner_signdate);
        console.log(this.owner_signdate);
        
        this.agent_signdate = this.$global.stamptodate(str.agent_signdate);
        this.agent = str.agent;
        this.$toast.clear();
      })
      .catch(err => {
        this.$loadingfail();
      });
  },
  mounted() {
    // this.content = "";
  },
  methods: {
    output() {
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/projectSign/pdfExport?signId=43`
        // data: this.$qs.stringify(this.form)
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          // this.$loadingfail();
        });
    },
    signname() {
      console.log(this.content);
    }
  }
};
</script>
<style lang="scss">
#p_check_done_contract {
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
#p_check_done_contract {
  width: 100%;
  // height:100%;
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
      // background: #f2f2f2;
      border: 1px solid #b5b5b5;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.4rem 0.4rem;
      width: 100%;
      height: 13rem;
      overflow-y: auto;
      word-wrap: break-word;
      color: rgb(169, 169, 169);
      .middle {
        margin: 0.2rem 0.4rem;
      }
      div.button {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          align-items: center;
          i {
            width: 3rem;
            height: 1rem;
            border-bottom: 1px solid rgb(169, 169, 169);
            img {
              width: 3rem;
              height: 1rem;
              // border-bottom:1px solid rgb(169, 169, 169);
            }
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
        height: 1rem;
        // font-size: 0.38rem;
      }
    }
  }
}
</style>