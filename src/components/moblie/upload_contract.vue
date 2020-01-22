<template>
  <div id="upload_contract">
    <div class="upload_contract">
      <div class="top"></div>
      <div class="middle" v-html="article"></div>
      <div class="button">
        <ul>
          <li>
            <nav>For and on behalf of:</nav>
            <h3>{{contract.owner_behalf}}</h3>
          </li>
          <li>
            <p><span>
              <img v-if="contract.owner_sign" :src="contract.owner_sign"alt="">
            </span></p>
            <p>Signature</p>
          </li>
          <li>
            <p><span>{{contract.owner_name}}</span></p>
            <p>Name</p>
          </li>
          <li>
            <p><span>{{contract.owner_title}}</span></p>
            <p>Title</p>
          </li>
          <li>
            <p><span>{{contract.owner_signdate}}</span></p>
            <p>Date</p>
          </li>
        </ul>
        <ul>
          <li>
            <nav>For and on behalf of:</nav>
            <h3>{{contract.agent_behalf}}</h3>
          </li>
          <li>
            <p><span><img v-if="contract.agent_sign"  :src="contract.agent_sign"alt=""></span></p>
            <p>Signature</p>
          </li>
          <li>
            <p><span>{{contract.agent_name}}</span></p>
            <p>Name</p>
          </li>
          <li>
            <p><span>{{contract.agent_title}}</span></p>
            <p>Title</p>
          </li>
          <li>
            <p><span>{{contract.agent_signdate}}</span></p>
            <p>Date</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "upload",
  data() {
    return {
      contract: {
        article:'',
        owner_sign:'',
        owner_behalf:'',
        owner_name:'',
        owner_title:'',
        owner_signdate:'',
        agent_sign:'',
        agent_behalf:'',
        agent_name:'',
        agent_title:'',
        agent_signdate:'',
      },
    };
  },

  created() {
    // console.log();
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/projectSign/getSignAgreement.do?visitToken=${this.$route.query.visitToken}`
    }).then(res => {
      if(res.data.resultCode==10000){
        let str = JSON.parse(res.data.data.signAgreement);
        for(let i in this.contract){
          if(str.hasOwnProperty(i)){
            this.contract[i]=str[i];
            if(i=='owner_signdate'){
              this.contract.owner_signdate=str.owner_signdate?this.$global.stamptodate(str.owner_signdate):"";}
              else if(i=='owner_signdate'){
              this.contract.agent_signdate=str.agent_signdate?this.$global.stamptodate(str.agent_signdate):'';
            }
          }
        }
      }
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
#upload_contract {
  height: 100%;
  .upload_contract {
    height: 100%;
    box-sizing: border-box;
    font-size: 0.4rem;
    line-height: 0.6rem;
    padding: 1rem 1rem 0;
    width: 100%;
    overflow-y: auto;
    word-wrap: break-word;
    color: rgb(169, 169, 169);
    .middle {
      padding: 0.3rem 0.3rem 0;
    }
    div.button {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      ul{
        width: 4rem;
        li{
          p{
            height: 1rem;
            img {
              width: 4rem;
              height: 1rem;
            }
          }
          p:nth-child(1){
            position: relative;
            span{
              position: absolute;
              word-break: break-all;
              bottom: 0;
            }
            /*line-height:1rem;*/
            line-height: initial;
            border-bottom: 1px solid;
          }
        }
        li:nth-of-type(1){
          margin-bottom: 1rem;

          h3{
            height: 3rem;
            line-height: initial;
          }
        }
      }
    }
  }
}
</style>
