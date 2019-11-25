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
                  <img v-if="signature" :src="signature" alt />
                </i>

                <span>投行</span>
                <span>{{owner_signdate?owner_signdate:''}}</span>
              </p>
              <p>
                <i>
                  <img v-if="agent" :src="agent" alt />
                </i>

                <span>中间人</span>
                <span>{{agent_signdate?agent_signdate:''}}</span>
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
    <!-- <div class="iframe" v-show="iframeState"></div> -->
    <iframe
      v-show="iframeState"
      id="show-iframe"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      ref="iframe"
      style="background-color:transparent; position:absolute; width: 100%; height: 100%; top: 0;left:0;"
      :src="`${$baseurl3}/#/upload_contract`"
    ></iframe>
    <!--  -->
    <!-- z-index: -1; -->
  </div>
</template>
<script>
</script>
<script>
// import { async } from "q";
// import { resolve } from "url";
// import
export default {
  name: "goods_details",
  data() {
    return {
      signId: "",
      iframeState: false,
      signature: "",
      content: "",
      agent: "",
      str: {},
      childData: "",
      // success: true
    };
  },
  created() {
    console.log(this.$route.query);
    // console.log(this.$store.state.contract);
    this.content = this.$store.state.contract.article;
    this.signature = this.$store.state.contract.owner;
    this.agent = this.$store.state.contract.agent;
    // this.str = JSON.stringify(this.$store.state.contract);
    // console.log(this.content);
  },

  mounted: function() {
    window.addEventListener("message", this.handleMessage);
  },
  computed: {
    owner_signdate: function() {
      if (this.$store.state.contract.owner_signdate) {
        let timestamp = this.$store.state.contract.owner_signdate;
        return this.$global.stamptodate(timestamp);
      }
    },
    agent_signdate: function() {
      let timestamp = new Date().getTime();
      this.$store.commit("agent_signdate", timestamp);
      console.log(this.$store.state);
      return this.$global.stamptodate(timestamp);
    }
  },
  methods: {
    // iframe传值
    handleMessage(event) {
      var data = event.data;
      switch (data.cmd) {
        case "returnFormJson":
          // 处理业务逻辑
          this.childData = data;
          console.log(this.childData);

          break;
      }
    },
    contract_submit() {
    
      this.str = this.$store.state.contract;
      this.str.signId = this.$route.query.signId;
      this.str.projectId=this.$route.query.projectId;
      console.log(this.str);
      let p = new Promise((resolve, reject) => {
        this.iframeState = true;
        resolve("success");
      });
      p.then(result => {
        // console.log(result); //success
        if (result == "success") {
          let iframeWin = this.$refs.iframe.contentWindow;
          return iframeWin;
        }
      }).then(iframeWin => {
        console.log(this.str);
        iframeWin.postMessage(
          {
            cmd: "toson",
            params: this.str
          },
          "*"
        );
        // resolve(this.childData)
        // this.handleMessage();
      });
    } 
 
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
    margin: 0 0.5rem;
    box-sizing: border-box;
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