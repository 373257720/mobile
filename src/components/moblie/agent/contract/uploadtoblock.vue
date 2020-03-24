<template>
  <div id="a_uploadtoblock">
    <!-- <div class="a_uploadtoblock"> -->
      <nav class="a_uploadtoblock">
        <van-icon name="arrow-left" @click="$global.previous()" />{{$t('ContractWrods.ConfirmAndUploadToBlockchain')}}
      </nav>
      <main>
        <article v-if="watch">
          <div>
              <contractcomponent  :contract="contract"></contractcomponent>
          </div>
          <footer>
            <button class="blockchain" @click="contract_submit">{{$t('ContractWrods.ConfirmAndUploadToBlockchain')}}</button>
          </footer>

        </article>
      </main>
<!--      <mbottom></mbottom>-->
    <!-- </div> -->
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
          signUserId1:'',//项目方id
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
           next({path: '/mysign'});
        }else{
          next()
        }
  },
    created() {
      this.projectId = this.$route.query.projectId;
      this.signStatu=this.$route.query.signStatus;
      this.signId=this.$route.query.signId?this.$route.query.signId:-1;
        this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getVisitToken`,
        {
        signId:this.signId,
        signStatus:this.signStatu,
          X_Token:this.$store.state.X_Token,
        }).then(res=>{
          if(res.data.resultCode==10000){
            this.token=res.data.data.visitToken;
          }
        })
       this.get_contract();
       this.get_datails();
      // console.log(this.signStatu)
    },
    methods: {
      get_datails(){
          this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/project/getProjectDetails`,
            {projectLan:this.$i18n.locale,
              projectId:this.projectId,
              signStatus:this.signStatu,
              signId:this.signId,
              X_Token:this.$store.state.X_Token,
            })
            .then(res=>{
                if(res.data.resultCode==10000){
                  console.log(res.data.data);
                      this.projectId=res.data.data.projectId;
                      this.signUserId1=res.data.data.signUserId1;
                }
          })
      },
    get_contract(){
        this.$loading();
        this.$global.get_encapsulation( `${this.$baseurl}/bsl_web/projectSign/getSignAgreement`,{
          signId:this.signId, X_Token:this.$store.state.X_Token,
        })
        .then(res => {
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
        let agent_signdata=this.contract.agent_signdate?this.$global.stamptodate(this.contract.agent_signdate):'';
         let owner_signdata=this.contract.owner_signdate?this.$global.stamptodate(this.contract.owner_signdata):'';
        // let code=encodeURIComponent('#');
        // let upload_urlpath = `${this.$baseurl3}/${code}/upload_contract?visitToken=${this.token}`;
        this.$toast.loading({
          loadingType: "spinner",
          message: this.$t('ContractWrods.UploadTakesAboutOneMinute'),
          overlay:true,
          duration: 0
        });
        this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/ipfs/update`,{
          signId: `${this.signId}`,
          X_Token:this.$store.state.X_Token,
          projectId:this.projectId,
          signUserId1:this.signUserId1,
            htmlData:
              `<html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Document</title>
              <style>
                html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img,input{ margin:0; padding:0; }
                fieldset, img,input,button { border:0 none; padding:0;margin:0;outline-style:none; }   /*去掉input等聚焦时的蓝色边框*/
                ul,li,ol{ list-style:none; }
                #contract_component {
                  width: 595px;
                  height: 100%;
                  margin: 0 auto;
                  /*595×842*/
                }
                #contract_component .contract_component {
                  /*border: 1px solid #b5b5b5;*/
                  box-sizing: border-box;
                  font-size: 12px;
                  line-height: 20px;
                  padding:30px;
                  width: 100%;
                  height: 100%;
                  color: black;
                  word-wrap: break-word;
                }
                #contract_component .contract_component .middle{
                  min-height: 250px;
                  background: none;
                  border: 0;
                  width: 100%;
                  white-space: pre-wrap;
                  white-space: -moz-pre-wrap;
                  /*//Mozilla, since 1999 *!*!*/
                  /*white-space: -pre-wrap;*/
                  /*//  //!* Opera 4-6 *!*!*/
                  white-space: -o-pre-wrap;
                }
                #contract_component .contract_component div.button {
                  margin-top: 10px;
                  display: -moz-box;
                  display: -ms-flexbox;
                  display: -webkit-flex;
                  display: flex;
                  -webkit-justify-content:space-between;
                  justify-content:space-between;
                }
                #contract_component .contract_component ul {
                  width: 40%;
                }
                #contract_component .contract_component ul li p{
                  height: 30px;
                }

                #contract_component .contract_component ul li p.signature{
                  text-align: center;

                }
                #contract_component .contract_component ul li p.signature img{
                  width: auto;
                  height: auto;
                  max-width: 100%;
                  max-height: 100%;
                }
                #contract_component .contract_component ul li p:nth-child(1){
                  position: relative;
                  line-height: 14px;
                  border-bottom: 1px solid black;
                }
                #contract_component .contract_component ul li p:nth-child(2){
                  font-weight: 600;
                }
                #contract_component .contract_component ul li:nth-of-type(1){
                  margin-bottom: 30px;
                  height: 80px;
                  line-height: 14px;
                  /* min-height: 50px;
                  max-height: 100px; */
                }
                #contract_component .contract_component ul li:nth-of-type(1) nav{
                  font-weight: 600;

                }   #contract_component .contract_component ul li:nth-of-type(1) div{
                      /* min-height: 30px;*/
                      /*max-height: 100px;*/

                    }
                #contract_component .contract_component ul li p:nth-child(1) span{
                  position: absolute;
                  line-height: 14px;
                  word-break: break-all;
                  bottom: 0;
                }

              </style>
            </head>
            <body>
            <div id="contract_component">
              <div class="contract_component">
                <div class="middle"></div>
                <div class="button">
                  <ul>
                    <li>
                      <nav>For and on behalf of:</nav>
                      <div>${this.contract.owner_behalf}</div>
                    </li>
                    <li>
                      <div>
                        <p><img src="${this.contract.owner_sign}" alt=""></p>
                      </div>
                      <p>Signature</p>
                    </li>
                    <li>
                      <p><span>${this.contract.owner_name}</span></p>
                      <p>Name</p>
                    </li>
                    <li>
                      <p><span>${this.contract.owner_title}</span></p>
                      <p>Title</p>
                    </li>
                    <li>
                      <p><span>${owner_signdata}</span></p>
                      <p>Date</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <nav>For and on behalf of:</nav>
                      <div>${this.contract.agent_behalf}</div>
                    </li>
                    <li>
                      <div>
                        <p><img src="${this.contract.agent_sign}" alt=""></p>
                      </div>
                      <p>Signature</p>
                    </li>
                    <li>
                      <p><span>${this.contract.agent_name}</span></p>
                      <p>Name</p>
                    </li>
                    <li>
                      <p><span>${this.contract.agent_title}</span></p>
                      <p>Title</p>
                    </li>
                    <li>
                      <p><span>${agent_signdata}</span></p>
                      <p>Date</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <script>
              let a=  document.querySelector('#contract_component .middle');
              a.innerHTML=${this.contract.article};
            <\/script>
            </body>
            </html>`
        })
          .then(res => {
            // urlPath: `${upload_urlpath}`,
            this.$toast.clear();
            if (res.data.resultCode == 10000) {
            // let query1 = Object.assign({},this.$route.query,{signStatus: 5})
            this.$router.push({query:{signStatus:5}})
            this.$dialog
                .alert({
                  title: res.data.resultDesc,
                  message:this.$t('agent.RecommendInvestors'),
                })
                .then(() => {
                  this.$routerto("a_project_intro",  {
                    signId: this.signId,
                    projectId: this.projectId,
                    signStatus: 5
                  });
                });
            }else {
              this.$dialog
                .alert({
                  title: res.data.resultDesc,
                  message: this.$t('projectOwner.BackToMyProject'),
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
                title: this.$t('ContractWrods.UploadFailed'),
                message: this.$t('projectOwner.BackToMyProject'),
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
    height: 100%;
    width: 100%;
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
      height: 100%;
    padding: 1.5rem 0 0 0;

    nav.a_uploadtoblock {
      width: 100%;
      height: 100%;
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
      // margin-top: 1.5rem;
      // margin-bottom: 1.5rem;
      padding: 0.5rem;
      height: 100%;
      width: 100%;
      background: #ffffff;
      article{
      height: 100%;
      display:-webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
       flex-direction:column;
      -webkit-flex-direction:column;
      -webkit-justify-content:space-between;
      justify-content:space-between;

      width: 100%;
        >div{
           height: 85%;
        }
      footer {

        height: 10%;
        width: 100%;
        font-size: 0.42rem;
        display: flex;
        justify-content: center;
        button {
          width: 8rem;
          border-radius:5px;
          background: #00adef;
          line-height: 1rem;
          color: white;
          height: 1rem;
        }
        .blockchain {
          background: orange;
        }
      }

      }

    }
  }
</style>
