<template>
  <div id="p_submit_contract">
    <div class="p_submit_contract">
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
                  <img v-if="signature" :src="signature" alt />
                </i>

                <span>投行</span>
                <span>{{owner_signdate?owner_signdate:''}}</span>
              </p>
              <p>
                <i></i>

                <span>中间人</span>
                <span></span>
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
    <!-- <div class="usercheck2" v-if="!success">
      <h2>
        <img src="../../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>成功发送给中间人</section>
      <nav class="backbtn">
        <button @click="$goto('mhome')">进入首页</button>
      </nav>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      signature: "",
      content: "",
      str: ""
      // timestamp :'',
      // owner_signdate: ""
      // success: true
    };
  },

  created() {
    console.log(this.$route.query);
    console.log(this.$store.state.contract);
    this.content = this.$store.state.contract.article;
    this.signature = this.$store.state.contract.owner;

    // this.str = JSON.stringify(this.$store.state.contract);
    // console.log(this.content);
  },
  computed: {
    owner_signdate: function() {
      // console.log(123);
      let timestamp = new Date().getTime();
      this.$store.commit("owner_signdate", timestamp);
      return this.$global.stamptodate(timestamp);
    }
  },
  mounted() {
    // this.content = "";
  },
  methods: {
    contract_submit() {
      this.$loading();
      if (this.content && this.signature) {
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/bsl_web/projectSign/sendInvestorsData`,
          data: this.$qs.stringify({
            projectId: this.$route.query.projectId,
            signId: this.$route.query.signId,
            signStatus: 2,
            signAgreement: JSON.stringify(this.$store.state.contract)
          })
        }).then(res => {
          this.$toast.clear();
          console.log(res);
          if (res.data.resultCode == 10000) {
            this.$dialog
              .alert({
                title: "提交成功",
                message: "返回我的项目"
              })
              .then(() => {
                // on close
                this.$routerto("mysign");
              });
          } else {
            this.$dialog
              .alert({
                title: "提交失败",
                message: "返回"
              })
              .then(() => {
                // on close
                // this.$routerto("mysign");
              });
          }
        });
      } else {
        this.$dialog
          .confirm({
            title: "请返回完成签名"
            // message: "弹窗内容"
          })
          .then(() => {
            // on confirm
          });
      }
      // console.log(JSON.stringify(this.$store.state.contract));
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
      border: 1px solid #b5b5b5;
      // background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.4rem 0.4rem;
      width: 100%;
      height: 13rem;
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
      font-size: 0.38rem;
      button {
        width: 100%;
        margin-top: 1rem;
        background: #00adef;
        color: white;
        height: 1rem;
      }
    }
  }
}
</style>