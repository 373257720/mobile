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
                <p><img v-if="contract.owner_sign" :src="contract.owner_sign"alt=""></p>
                <p>Signature</p>
              </li>
              <li>
                <p>{{contract.owner_name}}</p>
                <p>Name</p>
              </li>
              <li>
                <p>{{contract.owner_title}}</p>
                <p>Title</p>
              </li>
              <li>
                <p>{{owner_signdate}}</p>
                <p>Date</p>
              </li>
            </ul>
            <ul>
              <li>
                <nav>For and on behalf of:</nav>
                <h3>{{contract.agent_behalf}}</h3>
              </li>
              <li>
                <p><img v-if="contract.agent_sign"  :src="contract.agent_sign"alt=""></p>
                <p>Signature</p>
              </li>
              <li>
                <p>{{contract.agent_name}}</p>
                <p>Name</p>
              </li>
              <li>
                <p>{{contract.agent_title}}</p>
                <p>Title</p>
              </li>
              <li>
                <p>{{contract.agent_signdate}}</p>
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
          owner_signdate:null,
        //   agent_name:'',
        //   agent_title:'',
        //   agent_signdate:null,
        // }
      };
    },
    created() {

      // console.log(this.$store.state.contract)
      // if(this.$store.state.contract){
      //   for(let i in this.contract){
      //     if(this.$store.state.contract.hasOwnProperty(i)){
      //       if(i=='owner_signdate' || i==' agent_signdate'){
           this.owner_signdate= this.$global.stamptodate(this.contract.owner_signdate)
      //       }else{
      //         this.contract[i]=this.$store.state.contract[i]
      //       }
      //     }
      //
      //   }
      // }

      // this.content = this.$store.state.contract.article;
      // this.signature = this.$store.state.contract.owner;

      // this.str = JSON.stringify(this.$store.state.contract);
      // console.log(this.content);
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
          url: `${this.$baseurl}/bsl_web/projectSign/sendInvestorsData`,
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
            width: 3rem;
            li{
              p{
                height: 1rem;
                img {
                  width: 3rem;
                  height: 1rem;
                }
              }
              p:nth-child(1){
                line-height:1rem;
                border-bottom: 1px solid;
              }
            }
            li:nth-of-type(1){
              margin-bottom: 1rem;
              nav{
                line-height: initial;
                h3{
                  width: 3rem;
                  height: 1rem;
                }
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
