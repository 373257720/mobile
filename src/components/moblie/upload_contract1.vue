<template>
  <div id="upload_contract1">
    <div class="upload_contract1">
      <div class="top"></div>
      <div class="middle" v-html="article"></div>
      <div class="button">
        <p v-if="owner">
          <i>
            <img :src="owner" alt />
          </i>
          <span>投行</span>
          <span>{{owner_signdate?owner_signdate:''}}</span>
        </p>
        <p v-if="agent">
          <i>
            <img :src="agent" alt />
          </i>
          <span>投资中间人</span>
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
        // signid: "",
        // projectId: ""
      };
    },
    created() {
      console.log();
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/projectSign/getSignAgreement.do?visitToken=${this.$route.query.visitToken}`
      }).then(res => {
        console.log(res.data);
        let obj = JSON.parse(res.data.data.signAgreement);
        this.owner = obj.owner;
        this.agent = obj.agent;
        this.article = obj.article;
        this.owner_signdate = this.stamptodate(obj.owner_signdate);
        this.agent_signdate = this.stamptodate(obj.agent_signdate);
        this.$toast.clear();
        // if (res.data.resultCode == 10000) {
        //   // this.signproject4();
        // } else {
        //   this.$dialog
        //     .alert({
        //       title: "上传失败,请稍后再试"
        //       // message: "下一步发送邮件到投资者"
        //     })
        //     .then(() => {});
        // }
      });

    },
    computed: {
      // contract_content: function(){
      // },
    },
    mounted() {
      // 接受父页面发来的信息
      // this.bang();
      ///此时通过$on进行监听中间桥接函数bridge对目的方法childAction进行触发
      // window.addEventListener("message", this.handleMessageFromParent);
    },
    methods: {
      stamptodate(stamp) {
        var date = new Date(stamp);
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        return Y + M + D;
      }
      // handleMessageFromParent(event) {
      //   // 子接收父参数
      //   // console.log(1111);
      //   console.log(event);
      //   // var p = new Promise((resolve, reject) => {
      //   var data = event.data;
      //   switch (data.cmd) {
      //     case "toson":
      //       let ee = data.params;
      //       this.owner = ee.owner;
      //       this.agent = ee.agent;
      //       this.article = ee.article;
      //       this.projectId=ee.projectId;
      //       this.signid=ee.signId;
      //       this.owner_signdate = this.$global.stamptodate(ee.owner_signdate);
      //       this.agent_signdate = this.$global.stamptodate(ee.agent_signdate);
      //       // this.handleMessageToParent();
      //       // resolve("success");
      //
      //       });
      //       break;
      //   }
      //   // });
      //   // return p;
      // },
      // handleMessageToParent() {
      //   // 子向父传参
      //   window.parent.postMessage(
      //     {
      //       cmd: "returnFormJson",
      //       params: { isok: true }
      //     },
      //     "*"
      //   );
      // }
    }
  };
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  #upload_contract1 {
    height: 100%;
    .upload_contract1 {
      height: 100%;
      // background: #f2f2f2;
      // border: 1px solid #b5b5b5;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      // padding: 0.4rem 0.5rem;
      padding: 1rem 1rem 0;
      width: 100%;
      // height: 13rem;
      overflow-y: auto;
      word-wrap: break-word;
      color: rgb(169, 169, 169);
      .middle {
        padding: 0.3rem 0.3rem 0;
      }
      div.button {
        margin-top: 1.2rem;
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
            margin-bottom: 0.2rem;
            img {
              width: 3rem;
              height: 1rem;
            }
          }
          span {
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
</style>
