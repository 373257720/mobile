<template>
  <div id="a_submit_contract">
    <div class="a_submit_contract" v-show="!iframeState">
      <nav class="a_submit_contract">
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
                  <img  v-if="owner" :src="owner" alt />
                </i>

                <span>投行</span>
                <span>{{owner_signdate}}</span>
              </p>
              <p>
                <i>
                  <img  v-if="agent" :src="agent" alt />
                </i>
                <span>中间人</span>
                <span>{{agent_signdate}}</span>
              </p>
            </div>
          </div>
          <footer v-show="iswatch==2">
            <button @click="signproject4">提交</button>
          </footer>
          <footer v-show="iswatch==4">
            <button class="blockchain" @click="contract_submit">确认及上载到区块链</button>
          </footer>
        </article>
      </main>
      <mbottom></mbottom>
    </div>
    <!-- <div class="iframe" v-show="iframeState"></div> -->
    <!-- <iframe
      v-show="iframeState"
      id="show-iframe"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      ref="iframe"
      style="background-color:transparent; position:absolute; width: 100%; height: 100%; top: 0;left:0;"
      :src="src"
    ></iframe>-->
    <!-- z-index: -1; -->
  </div>
</template>
<script>
</script>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      iswatch:'',
      // src: `${this.$baseurl3}/#/upload_contract?`,
      signId: "",
      iframeState: false,
      owner: "",
      content: "",
      agent: "",
      str: {},
      token: "",
      childData: "",
      projectId: "",
      agent_signdate:'',
      // success: true
      owner_signdate:'',
    };
  },
  created() {
    this.iswatch=this.$route.query.signStatus;
    this.signId=this.$route.query.signId;
    if(this.iswatch==4){
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getVisitToken?signId=${this.$route.query.signId}&signStatus=${this.$route.query.signStatus}`).then(res=>{
        // console.log(res)
        if(res.data.resultCode==10000){
          this.token=res.data.data.visitToken;
        }
      })
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/projectSign/getSignAgreement?signId=${this.$route.query.signId}`,
      }).then(res=>{
        let str = JSON.parse(res.data.data.signAgreement);
        this.owner = str.owner;
        this.content = str.article;
        this.agent=str.agent;
        this.agent_signdate =str.agent_signdate>0? this.$global.stamptodate(str.agent_signdate):'';
        this.owner_signdate =str.owner_signdate>0? this.$global.stamptodate(str.owner_signdate):'';
      })
    }else if(this.iswatch==2){
      this.content = this.$store.state.contract.article;
      this.owner = this.$store.state.contract.owner;
      this.agent = this.$store.state.contract.agent;
      this.owner_signdate=this.$global.stamptodate(this.$store.state.contract.owner_signdate);
      this.agent_signdate=this.$global.stamptodate(this.$store.state.contract.agent_signdate);
    }

  },

  mounted() {
    // window.addEventListener("message", this.handleMessage);
  },
  computed: {

  },
  methods: {
    // 上链
    // 192.168.1.37:8080/bsl_web/projectSign/getVisitToken?signId=235&signStatus=4
    // get_visittoken(){
    // this.$global.get_encapsulation(`${this.$baseurl3}/bsl_web/projectSign/getVisitToken?signId=${this.query.$route.signId}&signStatus=${this.query.$route.signStatus}`).then(res=>{
    //   console.log(res)
    // })
    //   // 192.168.1.37:8080/bsl_web/projectSign/getVisitToken?signId=235&signStatus=4
    // },
    contract_submit() {
      this.projectId = this.$route.query.projectId;
      let urlpath = `${this.$baseurl}/#/upload_contract?visitToken=${this.token}`;
      this.$toast.loading({
        loadingType: "spinner",
        message: "上传大概需要1分钟,请耐心等候",
        duration: 0
      });
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/ipfs/update?`,
        params: {
          signId: `${this.signId}`,
          urlPath: `${urlpath}`
        }
      })
        .then(res => {
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            this.$dialog
              .alert({
                title: res.data.resultDesc,
                message: "下一步发送邮件到投资者"
              })
              .then(() => {
                this.$routerto("a_wait_sendemail",  {
                  signId: this.signId,
                  projectId: this.projectId,
                  signStatus: 5
                });
              });
          } else {
            this.$dialog
              .alert({
                title: res.data.resultDesc,
                message: "返回"
              })
              .then(() => {});
          }
        })
        .catch(err => {
          this.$toast.clear();
          this.$dialog
            .alert({
              title: "上传失败",
              message: "返回"
            })
            .then(() => {});
        });
    },
    // 签约
    signproject4() {
      this.signId = this.$route.query.signId;
      this.$loading();
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/signProject4`,
        data: this.$qs.stringify({
          signId: this.signId,
          projectId:this.$route.query.projectId,
          signAgreement: JSON.stringify(this.$store.state.contract)
        })
      }).then(res => {
        console.log(res);
        this.$toast.clear();
        if (res.data.resultCode == 10000) {
          this.iswatch = 5;
          this.signId = res.data.data.signId;
          this.token = res.data.data.visitToken;
          this.$dialog
            .alert({
              title: res.data.resultDesc,
              message: "下一步确认及上载到区块链"
            })
            .then(() => {
              // this.$routerto("a_wait_sendemail", {
              //   signId: this.signId,
              //   projectId: this.projectId,
              //   signStatus: 4
              // });
            });
        } else {
          this.$dialog
            .alert({
              title: res.data.resultDesc,
              // message: "返回"
            })
            .then(() => {});
        }
      });
    }
    // iframe传值
    // handleMessage(event) {
    //   var data = event.data;
    //   switch (data.cmd) {
    //     case "returnFormJson":
    //       // 处理业务逻辑
    //       this.childData = data;
    //       console.log(this.childData);

    //       break;
    //   }
    // },
    // let p = new Promise((resolve, reject) => {
    //   this.iframeState = true;
    //   resolve("success");
    // });
    // p.then(result => {
    //   // console.log(result); //success
    //   if (result == "success") {
    //     let iframeWin = this.$refs.iframe.contentWindow;
    //     return iframeWin;
    //   }
    // }).then(iframeWin => {
    //   console.log(this.str);
    //   iframeWin.postMessage(
    //     {
    //       cmd: "toson",
    //       params: this.str
    //     },
    //     "*"
    //   );
    // });
  }
};
</script>
<style lang="scss">
#a_submit_contract {
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
#a_submit_contract {
  width: 100%;
  nav.a_submit_contract {
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
  div.middle {
    /*margin: 0 0.5rem;*/
    box-sizing: border-box;
  }
  main {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: #ffffff;
    .contract {
      border: 1px solid #b5b5b5;
      // background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.4rem 0.5rem;
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
      .blockchain {
        background: orange;
      }
    }
  }
}
</style>
