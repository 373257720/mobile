<template>
  <div id="contract_component">
    <div class="contract_component">
      <van-field
        class="middle"
        v-model="contract.article"
        autosize
        disabled
        type="textarea"
      />
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
            <p><span>{{owner_signdate}}</span></p>
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
            <p><span>{{agent_signdate}}</span></p>
            <p>Date</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "contract_component",
    props:['contract'],
    data() {
      return {
        // contract:{
        //   article:'',
        //   owner_sign:'',
        //   owner_name:'',
        //   owner_title:'',
        owner_signdate:'',
        agent_signdate:'',
        //   agent_name:'',
        //   agent_title:'',
        //   agent_signdate:null,
        // }
      };
    },
    created() {
      this.owner_signdate=this.contract.owner_signdate? this.$global.stamptodate(this.contract.owner_signdate):"";
      this.agent_signdate=this.contract.agent_signdate?this.$global.stamptodate(this.contract.agent_signdate):'';
    },

    computed: {
    },
    mounted() {
      // this.content = "";
    },
    methods: {
      contract_submit() {
        this.$loading();
        // if (this.content && this.signature) {
        this.$axios({
          method: "post",
          url: `${this.$baseurl3}/bsl_web/projectSign/sendInvestorsData`,
          data: this.$qs.stringify({
            projectId: this.$route.query.projectId,
            signId: this.$route.query.signId,
            signStatus: 2,
            signAgreement: JSON.stringify(this.$store.state.contract)
          })
        }).then(res => {
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            this.$dialog
              .alert({
                title: "提交成功",
                message: "返回我的项目"
              })
              .then(() => {
                this.$routerto("mysign");
              });
          } else if(res.data.resultCode==10051) {
            this.$dialog
              .alert({
                title: "提醒",
                message: "您的注册审核不通过，请前往我的-个人审核里修改"
              })
              .then(() => {
                // on close
                // this.$routerto("mysign");
              });
          }
        });
        // } else {
        //   this.$dialog
        //     .confirm({
        //       title: "请返回完成签名"
        //       // message: "弹窗内容"
        //     })
        //     .then(() => {
        //       // on confirm
        //     });
        // }
        // console.log(JSON.stringify(this.$store.state.contract));
      }
    }
  };
</script>
<style lang="scss">
  #contract_component{
    .contract_component {
      border: 1px solid #b5b5b5;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.4rem 0.4rem;
      width: 100%;
      height: 13rem;
      overflow-y: auto;
      word-wrap: break-word;
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
</style>
