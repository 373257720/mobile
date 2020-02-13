<template>
  <div id="a_uploadtoblock">
    <div class="a_uploadtoblock">
      <nav class="a_uploadtoblock">
        <van-icon name="arrow-left" @click="$global.previous()" />确认及上载到区块链
      </nav>
      <main>
        <article v-if="watch">
          <contractcomponent  :contract="contract"></contractcomponent>
          <footer>
            <button class="blockchain" @click="contract_submit">确认及上载到区块链</button>
          </footer>
           
        </article>
      </main>
      <mbottom></mbottom>
    </div>
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
          watch:false,
        token:'',
        signStatu:'',
        signId:'',
        projectId:'',
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
      beforeRouteLeave(to,from,next){
      console.log(to,from)
        if(to.name=='a_submit_contract'){
          // console.log(123)
           next({path: '/mysign'});
        }else{
          next()
        }
  },
    created() {
      this.signStatu=this.$route.query.signStatus;
      this.signId=this.$route.query.signId;
        this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getVisitToken?signId=${this.signId}&signStatus=${this.signStatu}`).then(res=>{
          if(res.data.resultCode==10000){
            this.token=res.data.data.visitToken;
          }
        })
       this.get_contract();
      // console.log(this.signStatu)
      

    },
    methods: {
    get_contract(){
        this.$loading();
        this.$axios({
          method: "get",
          url: `${this.$baseurl}/bsl_web/projectSign/getSignAgreement?signId=${this.signId}`
        }).then(res => {
          this.$toast.clear();
          if(res.data.resultCode==10000){
            this.signStatu=res.data.data.signStatus;
            let str = JSON.parse(res.data.data.signAgreement);
            for(let i in this.contract){
              if(str.hasOwnProperty(i)){
                this.contract[i]=str[i];
              }
            }
            this.watch=true
          }
        });
      },
      // 上链
      contract_submit() {
        this.projectId = this.$route.query.projectId;
        let code=encodeURIComponent('#')
        let urlpath = `${this.$baseurl3}/${code}/upload_contract?visitToken=${this.token}`;
        this.$toast.loading({
          loadingType: "spinner",
          message: "上传大概需要1分钟,请耐心等候",
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
   
    }
  };
</script>
<style lang="scss">
  #a_uploadtoblock {
    nav {
      position: relative;
      .van-icon-arrow-left {
        position: absolute;
        left: 0.6rem;
        top: 50%;
        transform: (translate(0, -50%));
      }
    }
//  .van-dialog {
//     font-size: 0.42rem;
//   }
//   .van-dialog__message {
//     font-size: 0.42rem;
//   }
//   .van-button {
//     font-size: 0.3rem;
//   }
  }
 
</style>
<style lang="scss" scoped>
  #a_uploadtoblock {
    width: 100%;
    nav.a_uploadtoblock {
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
      // .contract {
      //   border: 1px solid #b5b5b5;
      //   // background: #f2f2f2;
      //   box-sizing: border-box;
      //   font-size: 0.4rem;
      //   line-height: 0.6rem;
      //   padding: 0.4rem 0.5rem;
      //   width: 100%;
      //   height: 13rem;
      //   overflow-y: auto;
      //   word-wrap: break-word;
      //   color: rgb(169, 169, 169);
      //   div.button {
      //     margin-top: 2rem;
      //     display: flex;
      //     justify-content: space-between;
      //     p {
      //       display: flex;
      //       flex-direction: column;
      //       align-items: center;
      //       i {
      //         width: 3rem;
      //         height: 1rem;
      //         border-bottom: 1px solid rgb(169, 169, 169);
      //         img {
      //           width: 3rem;
      //           height: 1rem;
      //         }
      //       }
      //     }
      //   }
      // }
      footer {
        width: 100%;
        font-size: 0.42rem;
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
