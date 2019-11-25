<template>
  <div id="upload_contract">
    <div class="upload_contract">
      <div class="top"></div>
      <div class="middle" v-html="article"></div>
      <div class="button">
        <p>
          <i>
            <img v-if="owner" :src="owner" alt />
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
  </div>
</template>
<script>
export default {
  name: "upload",
  data() {
    return {
      //   iframeData:{}
      owner: "",
      agent: "",
      article: "",
      owner_signdate: "",
      agent_signdate: "",
      signid:'',
      projectId:'',
    };
  },

  created() {},
  computed: {
    // contract_content: function(){
    // },
  },
  mounted() {
    // 接受父页面发来的信息
    // this.bang();
    ///此时通过$on进行监听中间桥接函数bridge对目的方法childAction进行触发
    window.addEventListener("message", this.handleMessageFromParent);
  },
  methods: {
    bang() {},
    handleMessageFromParent(event) {
      // 子接收父参数
      // console.log(1111);
      console.log(event);
      // var p = new Promise((resolve, reject) => {
      var data = event.data;
      switch (data.cmd) {
        case "toson":
          let ee = data.params;
          this.owner = ee.owner;
          this.agent = ee.agent;
          this.article = ee.article;
          this.projectId=ee.projectId;
          this.signid=ee.signId;
          this.owner_signdate = this.$global.stamptodate(ee.owner_signdate);
          this.agent_signdate = this.$global.stamptodate(ee.agent_signdate);
          // this.handleMessageToParent();
          // resolve("success");
          this.$loading();
          this.$axios({
            method: "post",
            url: `${this.$baseurl}/bsl_web/base/htmlToPdf`,
            data: this.$qs.stringify({
              urlPath: `${this.$baseurl3}/#/upload_contract`,
              //  urlPath: `http://192.168.159.1:8080/#/upload_contract`,
              signId: this.signid
            })
          }).then(res => {
            console.log(res);
            // this.iframeState = false;
            this.$toast.clear();
            if (res.data.resultCode == 10000) {
              this.signproject4();
            } else {
              this.$dialog
                .alert({
                  title: "上传失败,请稍后再试"
                  // message: "下一步发送邮件到投资者"
                })
                .then(() => {});
            }
          });
          break;
      }
      // });
      // return p;
    },
       // 签约
    signproject4() {
      console.log(123123);
      
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/signProject4`,
        data: this.$qs.stringify({
          signId: this.signid,
          signAgreement:JSON.stringify(this.$store.state.contract)
        })
      }).then(res => {
        console.log(res);
        this.$toast.clear();
        if (res.data.resultCode == 10000) {
          this.signId = res.data.data.signId;
          this.$dialog
            .alert({
              title: "签约成功",
              message: "下一步发送邮件到投资者"
            })
            .then(() => {
              this.$routerto("a_wait_sendemail", {
                signId: this.signId,
                projectId: this.projectId,
                signStatus: 4
              });
            });
        } else {
          this.$dialog
            .alert({
              title: "签约失败",
              message: "返回"
            })
            .then(() => {});
        }
      });
    },
    handleMessageToParent() {
      // 子向父传参
      window.parent.postMessage(
        {
          cmd: "returnFormJson",
          params: { isok: true }
        },
        "*"
      );
    }
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
#upload_contract {
  .upload_contract {
    // background: #f2f2f2;
    // border: 1px solid #b5b5b5;
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
}
</style>