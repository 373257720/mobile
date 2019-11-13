<template>
  <div id="p_submit_contract">
    <div class="p_submit_contract" v-if="success">
      <nav class="p_submit_contract">
        <van-icon name="arrow-left" @click="$global.previous()" />签署合约
      </nav>
      <main>
        <article>
          <div class="contract">
            <div class="top"></div>
            <div class="middle" v-html="content"></div>
            <div class="button">
              <p>
                <i>
                  <img :src="signature" alt />
                </i>

                <span>投行</span>
                <span>2019.11.11</span>
              </p>
              <p>
                <i></i>

                <span>中间人</span>
                <span>2019.11.11</span>
              </p>
            </div>
          </div>
          <footer>
            <button @click="contract_submit">提交</button>
          </footer>
        </article>
      </main>
      <mbottom></mbottom>
    </div>
    <div class="usercheck2" v-if="!success">
      <h2>
        <img src="../../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>成功发送给中间人</section>
      <nav class="backbtn">
        <button @click="$goto('mhome')">进入首页</button>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      signature: "",
      content: "",
      str: "",
      success: true
    };
  },
  created() {
    console.log(this.$route.query);
    console.log(this.$store.state.contract);

    // let a = this.str.split("!!!!!");
    this.content = this.$store.state.contract.body;
    this.signature = this.$store.state.contract.owner;
    this.str = JSON.stringify(this.$store.state.contract);
    // console.log(this.content);
  },
  computed: {
    // contract_content: function(){
    // },
  },
  mounted() {
    // this.content = "";
  },
  methods: {
    contract_submit() {
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/sendInvestorsData`,
        data: this.$qs.stringify({
          projectId: this.$route.query.projectId,
          investorsId: this.$route.query.investorsId,
          signStatus: 2,
          signAgreement: this.str
        })
      }).then(res => {
        console.log(res);
        if (res.data.resultCode == 10000) {
          this.success = false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
#p_submit_contract {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
.van-dialog {
  font-size: 0.3rem;
}
.van-dialog__message {
  font-size: 0.3rem;
}
.van-button {
  font-size: 0.3rem;
}
</style>
<style lang="scss" scoped>
#p_submit_contract {
  width: 100%;
  .usercheck2 {
    padding: 3.24rem 0 3.04rem 0;
    text-align: center;
    img {
      // width: 4.28rem;
      height: 1.54rem;
    }
    section {
      text-align: center;
      font-size: 0.64rem;
      font-weight: 600;
      margin: 3.3rem 0 1.1rem 0;
    }
    .backbtn {
      text-align: center;
      // width: 100px;
      button {
        background: #00adef;
        width: 8rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.4rem;
        color: white;
      }
    }
  }
  nav.p_submit_contract {
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
        height: 0.8rem;
      }
    }
  }
}
</style>