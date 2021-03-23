<template>
  <div id="login1st">
    <commonnav>
      NDA clause
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main class="main">
      <form ref="form">
        <div class="mui-input-row input-row">
          <p class="label">NDA Terms</p>
          <iframe
            class="contractBox"
            src="static/html/contract.html"
            scrolling="yes"
            id="mainIframe"
            ref="mainIframe"
            name="mainIframe"
            @load="load"
          >
            <!-- <p>Your browser does not support iframes.</p> -->
          </iframe>
          <!-- <div
              class="middle wangedtior"
              v-html="NDAcontract.editorContent"
            ></div>
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
        <div class="mui-input-row input-row">
          <p class="label">For and on behalf of</p>
          <input
            name="userName"
            type="text"
            v-model="NDAcontract.middlemanbehalf"
          />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Name</p>
          <input
            name="Password"
            type="text"
            v-model="NDAcontract.middlemanname"
          />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Title</p>
          <input
            name="Password"
            type="text"
            v-model="NDAcontract.middlemantitle"
          />
        </div>

        <p class="error">{{ errorsMsg }}</p>
        <footer>
          <button
            :disabled="isdisabled"
            :class="isdisabled ? 'passive' : 'active'"
            class="button is-primary"
            @click.prevent="submit_click"
          >
            Sign
          </button>
        </footer>
      </form>
    </main>
  </div>
</template>
<script>
export default {
  name: "register",
  inject: ["NDAcontract", "goto"],
  data() {
    return {
      submitDisabled: false,
      cache: [],
      editor: null,
      editorContent: "",
      errorsMsg: "",
    };
  },
  computed: {
    isdisabled() {
      if (
        this.NDAcontract.middlemanbehalf &&
        this.NDAcontract.middlemanname &&
        this.NDAcontract.middlemantitle 
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    // this.getSignNdaContent();
    // console.log(this.NDAcontract);
    // this.username = this.$route.query.email ? this.$route.query.email : "";
    // console.log(this.$route.query.email);
  },
  mounted() {
    window.addEventListener("message", this.handleMessage); // 监听iframe的事件
    this.iframeVue = this.$refs.mainIframe.contentWindow;
  },
  methods: {
    getSignNdaContent() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectNda/getIncompleteSignNdaContent`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
          }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            let obj = JSON.parse(res.data.data);
            this.NDAcontract = Object.assign(this.NDAcontract, obj);
            console.log(this.NDAcontract);
            this.postTOiframe();
          }
          //   if(res.data.)
        });
    },
    load(event) {
      this.getSignNdaContent();
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
    submit_click() {
      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        // console.log(errorMsg);
        return false;
      }
      // console.log(this.iframeVue.document.documentElement.innerHTML);
        this.goto("NDAsignature");
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },
  },
};
</script>



<style lang='scss'>
#login1st {
}
</style>
<style lang='scss' scoped>
#login1st {
  min-height: 100vh;
  width: 100vw;
  // background: #2f36ac;
  display: flex;
  flex-direction: column;
  align-items: center;
  .label {
  }
  .error {
    height: vw(24);
    font-size: vw(24);
    // font-weight: 400;
    color: #0ce5b2;
    margin-bottom: vw(18);
    // line-height: vw(24);
  }
  main {
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 100%;
    padding: vw(184) vw(94) vw(116);
    // padding-top: vw(184);
    font-size: vw(30);
    color: #4f3dad;
    p.label {
      margin-bottom: vw(62);
      height: vw(34);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
    }
    .mui-input-row {
      width: 100%;
      margin-bottom: vw(60);
      // div {
      //   height: vw(404);
      //   overflow: auto;
      //   padding: vw(30) vw(24);
      //   border: vw(2) solid #4f3dad;
      // }
      span {
        display: inline-block;
      }
      input {
        width: 100%;
        font-size: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
      p.helpText {
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
        color: #8277b9;
        margin-top: vw(50);
      }
    }
    .contractBox {
      overflow-y: auto;
      height: vw(900);
      width: 100%;
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
      justify-content: space-around;
      button {
        color: #ffffff;
        // background: #4f3dad;
        border-radius: vw(16);
        width: vw(226);
        font-weight: bold;
        line-height: vw(72);
        height: vw(72);
        font-size: vw(24);
        // background: #00f0ab;
      }
      button.passive {
        background: #828282;
      }
      button.active {
        background: #00f0ab;
      }
    }

    // button.active{

    // }
  }
  // @media all and (orientation: landscape) {
  //   main {
  //     padding-top: vw(227);
  //     div.btn {
  //       margin-top: vw(90);
  //       // padding-bottom: vw(90);
  //     }
  //   }
  // }
}
</style>
