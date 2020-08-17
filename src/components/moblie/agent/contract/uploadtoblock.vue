<template>
  <div id="a_uploadtoblock">
    <!-- <div class="a_uploadtoblock"> -->
    <nav class="a_uploadtoblock">
      <van-icon name="arrow-left" @click="$global.previous()" />
      {{$t('ContractWrods.ConfirmAndUploadToBlockchain')}}
    </nav>
    <main>
      <article v-if="watch">
        <div>
          <contractcomponent :htmlData.sync="htmlData" :contract="contract"></contractcomponent>
        </div>
        <footer>
        {{$t('ContractWrods.NextConfirmAndUploadToBlockchain')}}...
        </footer>
      </article>
    </main>

  </div>
</template>
<script>
</script>
<script>
export default {
  name: "goods_details",
  // props:['contract','signStatu'],
  data() {
    return {
      watch: false,
      token: "",
      signStatu: "",
      signId: "",
      signUserId1: "", //项目方id
      projectId: "",
      htmlData: "",
      contract: {
        article: "",
        owner_sign: "",
        owner_behalf: "",
        owner_name: "",
        owner_title: "",
        owner_signdate: "",
        agent_sign: "",
        agent_behalf: "",
        agent_name: "",
        agent_title: "",
        agent_signdate: ""
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (to.name == "a_submit_contract") {
      next({ path: "/mysign" });
    } else {
      next();
    }
  },
  created() {
    this.projectId = this.$route.query.projectId;
    this.signStatu = this.$route.query.signStatus;
    this.signId = this.$route.query.signId ? this.$route.query.signId : -1;
    this.$global
      .get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_web/projectSign/getVisitToken`, {
        signId: this.signId,
        signStatus: this.signStatu,
        X_Token: this.$store.state.X_Token
      })
      .then(res => {
        if (res.data.resultCode == 10000) {
          this.token = res.data.data.visitToken;
        }
      });
    this.get_contract();
    this.get_datails();
    // console.log(this.signStatu)
  },
  methods: {
    get_datails() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/project/getProjectDetails`,
          {
            projectLan: this.$i18n.locale,
            projectId: this.projectId,
            signStatus: this.signStatu,
            signId: this.signId
          }
        )
        .then(res => {
          if (res.data.resultCode == 10000) {
            console.log(res.data.data);
            this.projectId = res.data.data.projectId;
            this.signUserId1 = res.data.data.signUserId1;
          }
        });
    },
    get_contract() {
      this.$loading();
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/getSignAgreement`,
          {
            signId: this.signId
          }
        )
        .then(res => {
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            this.signStatu = res.data.data.signStatus;
            let str = JSON.parse(res.data.data.signAgreement);
            for (let i in this.contract) {
              if (str.hasOwnProperty(i)) {
                this.contract[i] = str[i];
              }
            }
            this.watch = true;
          }
        });
    },
    // 上链
    contract_submit() {

      // console.log(this.contract.agent_signdatethis.contract.owner_signdate);
      // let agent_signdate = this.contract.agent_signdate
      //   ? this.$global.stamptodate(this.contract.agent_signdate)
      //   : "";
      // let owner_signdate = this.contract.owner_signdate
      //   ? this.$global.stamptodate(this.contract.owner_signdate)
      //   : "";
      return new Promise((resolve, reject) => {
        let htmldata = document.createElement("html");
        htmldata.setAttribute("lang","en")
        let body1 = document.createElement("body");
        let node = document.createElement("head");
        var metautf8= document.createElement("meta");
        metautf8.setAttribute("charset", "UTF-8");
        var oMeta = document.createElement("meta"),
          cssURL = "https://cdn.quilljs.com/1.0.0/quill.snow.css",
          linkTag = document.createElement("link"),
          style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = `html,
      body,
      ul,
      li,
      ol,
      dl,
      dd,
      dt,
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      form,
      fieldset,
      legend,
      img,
      input {
        margin: 0;
        padding: 0;
      }
      fieldset,
      img,
      input,
      button {
        border: 0 none;
        padding: 0;
        margin: 0;
        outline-style: none;
      } /*去掉input等聚焦时的蓝色边框*/
      ul,
      li,
      ol {
        list-style: none;
      }
      #contract_component {
        width: 680px;
        /*height: 100%;*/
        margin: 0 auto;
        padding: 50px 0;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        /*595×842*/
      }
      .ql-align-center {
        text-align: center;
      }
      .ql-container {
        height: initial;
      }
      .ql-editor {
        padding: 0;
        height: initial;
      }
      #contract_component .contract_component {
        /* border: 1px solid #b5b5b5; */
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 20px;
        padding: 30px 34px;
        width: 100%;
        /*height: 100%;*/
        color: black;
        word-wrap: break-word;
      }
      #contract_component .contract_component .middle {
        min-height: 250px;
        background: none;
        border: 0;
        width: 100%;
        white-space: normal;
      }
      #contract_component .contract_component div.button {
        margin-top: 10px;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      }
      #contract_component .contract_component ul {
        width: 40%;
      }
      #contract_component .contract_component ul li p {
        height: 30px;
      }

      #contract_component .contract_component ul li p.signature {
        text-align: center;
      }
      #contract_component .contract_component ul li p.signature img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
      #contract_component .contract_component ul li p:nth-child(1) {
        position: relative;
        line-height: 14px;
        border-bottom: 1px solid black;
      }
      #contract_component .contract_component ul li p:nth-child(2) {
        font-weight: 600;
      }
      #contract_component .contract_component ul li:nth-of-type(1) {
        margin-bottom: 30px;
        height: 80px;
        line-height: 14px;
        /* min-height: 50px;
    max-height: 100px; */
      }
      #contract_component .contract_component ul li:nth-of-type(1) nav {
        font-weight: 600;
      }
      #contract_component .contract_component ul li:nth-of-type(1) div {
        /* min-height: 30px;*/
        /*max-height: 100px;*/
      }
      #contract_component .contract_component ul li p:nth-child(1) span {
        position: absolute;
        line-height: 14px;
        word-break: break-all;
        bottom: 0;
      }`;
         linkTag.id = "dynamic-style";
        linkTag.href = cssURL;
        linkTag.setAttribute("rel", "stylesheet");
        linkTag.setAttribute("media", "all");
        linkTag.setAttribute("type", "text/css");
        oMeta.content = "user-scalable=yes";
        oMeta.name = "viewport";
        var newNode2 = this.htmlData.cloneNode(true);
        node.appendChild(metautf8);
        node.appendChild(oMeta);
        node.appendChild(linkTag);
        node.appendChild(style);
        body1.appendChild(newNode2);
        htmldata.appendChild(node);
        htmldata.appendChild(body1);
        resolve(htmldata);
      }).then(res => {
        let htmlstr = this.$global.nodeToString(res);
        this.$toast.loading({
          loadingType: "spinner",
          message: this.$t("ContractWrods.UploadTakesAboutOneMinute"),
          overlay: true,
          duration: 0
        });
        this.$global
          .post_encapsulation(`${this.$axios.defaults.baseURL}/bsl_web/ipfs/update`, {
            signId: `${this.signId}`,
            projectId: this.projectId,
            signUserId1: this.signUserId1,
            htmlData: htmlstr
          })
          .then(res => {
            // urlPath: `${upload_urlpath}`,
            this.$toast.clear();
            if (res.data.resultCode == 10000) {
              // let query1 = Object.assign({},this.$route.query,{signStatus: 5})
              this.$router.push({ query: { signStatus: 5 } });
              this.$dialog
                .alert({
                  title: res.data.resultDesc,
                  message: this.$t("agent.RecommendInvestors")
                })
                .then(() => {
                  this.$routerto("a_project_intro", {
                    signId: this.signId,
                    projectId: this.projectId,
                    signStatus: 5
                  });
                });
            } else {
              this.$dialog
                .alert({
                  title: res.data.resultDesc,
                  message: this.$t("projectOwner.BackToMyProject")
                })
                .then(() => {
                  this.$routerto("mysign");
                });
            }
          });
      });
    }
  }
};
</script>
<style lang="scss">
#a_uploadtoblock {
  height: 100%;
  width: 100%;
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
</style>
<style lang="scss" scoped>
#a_uploadtoblock {
  width: 100%;
  height: 100%;
  padding: 1.5rem 0 0 0;

  nav.a_uploadtoblock {
    width: 100%;
    height: 100%;
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
    // margin-top: 1.5rem;
    // margin-bottom: 1.5rem;
    padding: 0.5rem;
    height: 100%;
    width: 100%;
    background: #ffffff;
    article {
      height: 100%;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      -webkit-flex-direction: column;
      -webkit-justify-content: space-between;
      justify-content: space-between;

      width: 100%;
      > div {
        height: 85%;
      }
      footer {
        height: 10%;
        width: 100%;
        font-size: 0.42rem;
        display: flex;
        justify-content: center;
        button {
          width: 8rem;
          border-radius: 5px;
          background:#afafaf;
          line-height: 1rem;
          color: white;
          height: 1rem;
        }
        .blockchain {
          // background: orange;
        }
      }
    }
  }
}
</style>
