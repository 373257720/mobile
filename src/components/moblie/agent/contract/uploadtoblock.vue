<template>
  <div id="a_uploadtoblock">
    <!-- <div class="a_uploadtoblock"> -->
    <!-- <nav class="a_uploadtoblock">
        <van-icon name="arrow-left" @click="$global.previous()" />{{$t('ContractWrods.ConfirmAndUploadToBlockchain')}}
      </nav> -->
	  <commonnav :msg="$t('ContractWrods.ConfirmAndUploadToBlockchain')"></commonnav>
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

  export default {
    name: "goods_details",
    // props:['contract','signStatu'],
    data() {
      return {
          isShowLoading:false,
          loadingCount:0,
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
      // console.log(to,from)
        if(to.name=='a_submit_contract'){
           next({path: '/mysign'});
        }else{
          next()
        }
  },
    created() {
      let self = this;
      this.$axios.interceptors.request.use(
        (config) =>{
          self.addLoading();
          return config;
        },
        function(error) {
          self.Loading = false;
          self.LoadingCount = 0;
          return Promise.reject(error);
        }
      );
      this.$axios.interceptors.response.use(
        res => {
          self.isCloseLoading();
          if (res.data) {
            return res;
          }
        },
        error => {
          self.Loading = false;
          self.LoadingCount = 0;
          return Promise.reject(error);
        }
      );
      this.projectId = this.$route.query.projectId;
      this.signStatu=this.$route.query.signStatus;
      this.signId=this.$route.query.signId?this.$route.query.signId:-1;
        this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getVisitToken`,
        {
        signId:this.signId,
        signStatus:this.signStatu,
          // X_Token:this.$store.state.X_Token,
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
      addLoading() {
        this.isShowLoading = true;
        this.loadingCount++;
        if(this.loadingCount==1){
          this.$loading();
        }
      },
    isCloseLoading() {
      this.loadingCount--
        if (this.loadingCount == 0) {
          this.isShowLoading = false
          this.$toast.clear();
        }
      },
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
        // this.$loading();
        this.$global.get_encapsulation( `${this.$baseurl}/bsl_web/projectSign/getSignAgreement`,{
          signId:this.signId,
        })
        .then(res => {
          // this.$toast.clear();
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
        console.log(this.contract.article)
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
          projectId:this.projectId,
          signUserId1:this.signUserId1,
            htmlData:`<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="user-scalable=yes">
  <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
  <style>
    html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img,input{ margin:0; padding:0; }
    fieldset, img,input,button { border:0 none; padding:0;margin:0;outline-style:none; }   /*去掉input等聚焦时的蓝色边框*/
    ul,li,ol{ list-style:none; }
    #contract_component {
      width: 595px;
      /*height: 100%;*/
      margin: 0 auto;
      padding: 50px 0;
      box-sizing: border-box;
      /*595×842*/
    }
    .ql-align-center{
      text-align: center;
    }
    .ql-container{
      height: initial;
    }
    #contract_component .contract_component {
      /*border: 1px solid #b5b5b5;*/
      box-sizing: border-box;
      font-size: 12px;
      line-height: 20px;
      padding:30px;
      width: 100%;
      /*height: 100%;*/
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
  <div class="contract_component ql-container ql-snow">
    <div class="middle ql-editor"></div>
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
  a.innerHTML=\`<h2 class="ql-align-center">它的变化让我大吃一惊。</h2><p><br></p><p>家乡的变化真大呀！所有的汽车都可以在堵车的时候飞起来，而且车顶上都有太阳能蓄电池，这样汽车就会有无限的电供人们使用。这些汽车的功能还有很多呢，它们还可以在水上当船开，还可以在水下当潜水艇……</p><p><br></p><p>终于走到了学校，一进学校门口，发现校园里没有一个老师。我还在奇怪为什么学校里没有老师呢，结果往教室里走去，发现原来现在都是机器人在给孩子们上课了。每个孩子的桌上都有一台学习机，他们可以在学习机上完成作业，不作文https://Www.ZuoWEn8.Com/再用手写字，也可以用学习机和机器人老师进行交流。哇！这真是太神奇了。看着他们都用学习机上课，我想我要给学校投资，让越来越多的高科技产品进入学校，让他们能越来越方便学习。</p><p><br></p><p>我走进教室，再仔细一看，发现孩子们的桌上都有一个同款水杯，我问他们这个水杯有什么特别的吗？他们抢着回答：这个水杯很厉害的，只要你把开水倒进去，不到一分钟，它就能自动把水温调到人们适宜的温度，而且它这里还有一个按钮，可以调节味道呢。听着他们的回答，我不禁感慨道，连水杯都这么高级了，家乡的科技真是越来越发达了。</p><p><br></p><h2 class="ql-align-center">家乡的变化可真大啊，作为家乡的一员，看到故乡的发展如此之快，我怎么能不骄傲，怎么能不惊叹呢？</h2>\`
  a.innerHTML=\`${this.contract.article}\`;
<\/script>
</body>
</html>`,
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
    // nav {
    //   position: relative;

    // }
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
