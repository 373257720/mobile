<template>
  <div id="a_submit_contract">
    <div class="a_submit_contract">
      <nav class="a_submit_contract">
        <van-icon name="arrow-left" @click="goback" />签署合约
      </nav>
      <main>
        <article>
          <contract_component :contract="contract"></contract_component>
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
  </div>
</template>

<script>
export default {
  name: "goods_details",
  props:['contract','signStatu'],
  data() {
    return {
      iswatch:'',//2summit 4upload
      token:'',
    };
  },
// beforeRouteEnter(to,from,next){
//       next((vm)=>{ //参数vm就是当前组件的实例。
//         console.log(to,from,vm.$route.query)
//         if(from.name!="a_sign_contract" && vm.iswatch==2){
//           next({name: 'agent_set_contract',query:vm.$route.query}); 
//         }
//       })
//   },
  // beforeRouteLeave(to,from,next){
  //     console.log(to,from,this.iswatch)
  //       if(to.name=='a_sign_contract' && this.iswatch==4){
  //         console.log(123)
  //          next({path: '/mysign'});
  //       }else{
  //         // next()
  //       }
  // },
  created() {
    console.log(this.signStatu)
   this.iswatch=this.signStatu;
    this.signId=this.$route.query.signId;
    if(this.iswatch==4){
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getVisitToken?signId=${this.$route.query.signId}&signStatus=${this.signStatu}`).then(res=>{
        if(res.data.resultCode==10000){
          this.token=res.data.data.visitToken;
        }
      })
    }else if(this.iswatch==2){

    }

  },

  mounted() {
  },
  computed: {

  },
  methods: {
    goback(){
      // if(this.iswatch==4){
      //   this.$routerto('mysign');
      // }else if(this.iswatch==2){
          this.$global.previous();
      // }
    },
    // 签约
    signproject4() {
      for(let i in this.contract){
        if(this.contract[i]==''){
          this.$dialog
            .confirm({
              title: "请返回完成信息填写"
              // message: "弹窗内容"
            })
            .then(() => {
              this.$routerto('agent_set_contract',this.$route.query)
            });
          return;
        }
      }
      this.signId = this.$route.query.signId;
      this.$loading();
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/signProject4`,
        data: this.$qs.stringify({
          signId: this.signId,
          projectId:this.$route.query.projectId,
          signAgreement: JSON.stringify(this.contract),
        })
      }).then(res => {
        this.$toast.clear();
        if (res.data.resultCode == 10000) {
          this.$emit('todad')
          this.iswatch = 4;
          this.signId = res.data.data.signId;
          this.token = res.data.data.visitToken;
          this.$dialog
            .alert({
              title: res.data.resultDesc,
              message: "下一步确认及上载到区块链"
            })
            .then(() => {
            });
        } else {
          this.$dialog
            .alert({
              title: res.data.resultDesc,
            })
            .then(() => {
              this.$routerto('mysign');
            });
        }
      });
    },
    // 上链
    contract_submit() {
      this.projectId = this.$route.query.projectId;
      let urlpath = `${this.$baseurl}/#/upload_contract?visitToken=${this.token}`;
      this.$toast.loading({
        loadingType: "spinner",
        message: "正在上传,大概需要1分钟,请耐心等候",
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
          if (res.data.resultCode == 10000 ||res.data.resultCode == 10050) {
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
          }else {
            this.$dialog
              .alert({
                title: res.data.resultDesc,
                message: "返回列表页"
              })
              .then(() => {
                this.$routerto('mysign');
              });
          }
        })
        .catch(err => {
          this.$toast.clear();
          this.$dialog
            .alert({
              title: "上传失败",
              message: "返回"
            })
            .then(() => {
              this.$routerto('mysign');
            });
        });
    },

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
.van-cell{
  padding: 0;
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
