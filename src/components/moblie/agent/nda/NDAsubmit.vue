<template>
  <div id="NDAsubmit">
    <commonnav>
      NDA clause
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="goto('NDAsignature')" />
      </template>
    </commonnav>
    <main class="main">
      <iframe
        class="contractBox"
        src="static/html/contract.html"
        scrolling="yes"
        id="mainIframe"
        ref="mainIframe"
        name="mainIframe"
        @load="load"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
      <div>
        <!-- <div class="middle wangedtior" v-html="NDAcontract.editorContent"></div>
        <div class="info">
          <ul>
            <li>
              <nav>For and on behalf of:</nav>
              <h3>{{ NDAcontract.projectPartybehalf }}</h3>
            </li>
            <li>
              <div>
                <p class="signature">
                  <img
                    v-if="NDAcontract.projectPartySignature"
                    :src="NDAcontract.projectPartySignature"
                    alt
                  />
                </p>
              </div>
              <p>Signature</p>
            </li>
            <li>
              <p>
                <span>{{ NDAcontract.projectPartyname }}</span>
              </p>
              <p>Name</p>
            </li>
            <li>
              <p>
                <span>{{ NDAcontract.projectPartytitle }}</span>
              </p>
              <p>Title</p>
            </li>
            <li>
              <p>
                <span>{{
                  $global.newdateTodate(NDAcontract.projectPartySigntime)
                }}</span>
              </p>
              <p>Date</p>
            </li>
          </ul>
          <ul>
            <li>
              <nav>For and on behalf of:</nav>
              <h3>{{ NDAcontract.middlemanbehalf }}</h3>
            </li>
            <li>
              <div>
                <p class="signature">
                  <img
                    v-if="NDAcontract.middlemanSignature"
                    :src="NDAcontract.middlemanSignature"
                    alt
                  />
                </p>
              </div>
              <p>Signature</p>
            </li>
            <li>
              <p>
                <span>{{ NDAcontract.middlemanname }}</span>
              </p>
              <p>Name</p>
            </li>
            <li>
              <p>
                <span>{{ NDAcontract.middlemantitle }}</span>
              </p>
              <p>Title</p>
            </li>
            <li>
              <p>
                <span>{{
                  $global.newdateTodate(NDAcontract.middlemanSigntime)
                }}</span>
              </p>
              <p>Date</p>
            </li>
          </ul>
        </div> -->
      </div>
      <footer>
        <button
          v-if="$store.state.currentUsertype == 1"
          class="button is-primary"
          @click.prevent="projectparty"
        >
          Submit
        </button>
        <button
          v-if="$store.state.currentUsertype == 4"
          class="button is-primary"
          @click.prevent="middleman"
        >
          Submit
        </button>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "NDAsubmit",
  inject: ["NDAcontract", "goto"],
  data() {
    return {
      url: "",
      iframeVue: {},
    };
  },
  computed: {},
  created() {
    console.log(this.NDAcontract);
  },
  mounted() {
    window.addEventListener("message", this.handleMessage); // 监听iframe的事件
    this.iframeVue = this.$refs.mainIframe.contentWindow;

    // const mapFrame = this.$refs["mainIframe"];
    // if (mapFrame.attachEvent) {
    //   // 兼容浏览器判断
    //   mapFrame.attachEvent("onload", function () {
    //     const iframeWin = mapFrame.contentWindow;
    //     iframeWin.postMessage("初始化值", "*");
    //     // data传递的参数   *写成子页面的域名或者是ip
    //   });
    // } else {
    //   mapFrame.onload = function () {
    //     const iframeWin = mapFrame.contentWindow;
    //     iframeWin.postMessage("初始化值", "*");
    //   };
    // }
  },
  methods: {
    load(event) {
      this.postTOiframe();
    },
    handleMessage(event) {
      // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data;
      switch (data.cmd) {
        case "returnFormJson":
          // 业务逻辑
          break;
        case "returnHeight":
          // 业务逻辑
          break;
      }
    },
    postTOiframe() {
      this.iframeVue.postMessage(
        {
          cmd: "getFormJson",
          params: this.NDAcontract,
        },
        "*"
      );
    },
    middleman() {
      this.$store.commit("isloading", true);
      let htmldata = this.iframeVue.document.documentElement;
      let htmlstr = this.$global.nodeToString(htmldata);
      htmlstr = this.$global.ClearBr(htmlstr);
      htmlstr = this.$global.rim(htmlstr);
      console.log(htmlstr);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectNda/middlemanSignNda`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            htmlData: htmlstr,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode === 10000) {
                this.$router.replace({ path: "/mysign" });
              }
            });
        });
    },
    Uptochain() {
      // debug :htmlToPDF is blank on the pdf,cause the plugin can not read the html
      //  at local in exchange of reading it by an url.
      let htmldata = this.iframeVue.document.documentElement;
      let htmlstr = this.$global.nodeToString(htmldata);
      htmlstr = this.$global.ClearBr(htmlstr);
      htmlstr = this.$global.rim(htmlstr);
      console.log(htmlstr);
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectNda/investmentBankSignNda`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            htmlData: htmlstr,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode == 10000) {
                this.$router.replace({ path: "/mysign" });
              }
              // on close
              // this.$routerto("mysign");
            });
        });
    },
    projectparty() {
      // 外部vue向iframe内部传数据
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectNda/investmentBankSubmitSignNda`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            htmlData: this.NDAcontract,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode == 10000) {
                this.$router.replace({ path: "/mysign" });
              }
              // on close
              // this.$routerto("mysign");
            });
        });
      //   const obj1 = window.frames["mainIframe"]; // 获得对应iframe的window对象
      //   alert(obj1.aaaaa);
    },
  },
};
</script>



<style lang='scss'>
</style>
<style lang='scss' scoped>
#NDAsubmit {
  height: 100vh;
  width: 100vw;
  // background: #2f36ac;
  display: flex;
  flex-direction: column;
  align-items: center;

  main {
    // align-items: center;
    color: #000;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: vw(184) vw(94) vw(116);
    font-size: vw(30);
    .contractBox {
      overflow-y: auto;
      flex: 1;
      //   padding: vw(30) vw(20);
      border: 2px solid #4f3dad;
      margin-bottom: 10%;
      div.info {
        font-size: 12px;
        line-height: 14px;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        ul {
          width: 40%;
          li {
            p {
              height: 1rem;
            }
            p.signature {
              text-align: center;
              height: 2rem;
              img {
                // width: 100%;
                // height: 100%;
                // height: 1rem;
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
              }
            }
            p:nth-child(1) {
              position: relative;
              span {
                position: absolute;
                line-height: 0.44rem;
                word-break: break-all;
                bottom: 0;
              }
              /*line-height:1rem;*/
              line-height: initial;
            }
            p:nth-child(2) {
              font-weight: 600;
              border-top: 1px solid black;
            }
          }
          li:nth-of-type(1) {
            margin-bottom: 0.6rem;
            nav {
              font-weight: 600;
            }
            h3 {
              height: 3rem;
              line-height: initial;
            }
          }
        }
      }
    }
    footer {
      display: flex;
      justify-content: center;
      button {
        color: #ffffff;
        border-radius: vw(16);
        width: vw(226);
        font-weight: bold;
        line-height: vw(72);
        height: vw(72);
        font-size: vw(24);
        background: #00f0ab;
        // background: #00f0ab;
      }
    }
  }
}
</style>
