<template>
  <div id="p_sign_request">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
      <h2>{{title}}</h2>
        <div class="middlerean_info">
          <van-divider>{{$t('projectOwner.IntermediaryInformation')}}</van-divider>
          <ul>
            <!--            v-for="(item,key) in middlemen"-->
            <li>
              <div>
                <p class="row1">{{middlemen.userIdentityType.name}}:</p>
                <p class="row2">{{middlemen.Type==1?$t('common.individual'):middlemen.Type==2?$t('common.company'):'-'}}</p>
              </div>
            </li>
            <li v-if="middlemen.Type==1">
              <div>
                <p class="row1">{{middlemen.userName.name}}:</p>
                <p class="row2">{{middlemen.userName.response}}</p>
              </div>
            </li>
            <li v-if="middlemen.Type==2 && $i18n.locale=='zh_CN'">
              <div>
                <p class="row1">{{middlemen.userCompanyCh.name}}:</p>
                <p class="row2">{{middlemen.userCompanyCh.response}}</p>
              </div>
            </li>
            <li v-if="middlemen.Type==2 && $i18n.locale=='en_US'">
              <div>
                <p class="row1">{{middlemen.userCompanyEn.name}}:</p>
                <p class="row2">{{middlemen.userCompanyEn.response}}</p>
              </div>
            </li>
          </ul>
        </div>
      <commoninvestors v-if="$route.query.signStatus==6" :investor_infor="investor_infor"></commoninvestors>
      </div>
      <article>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
           <aside v-if="$route.query.signStatus==6">
            <button @click="review(8)">{{$t('projectOwner.ConfirmInvestor')}}</button>
            <button @click="review(7)">{{$t('investor.Refuse')}}</button>
          </aside>
          <aside v-else-if="$route.query.signStatus==1">
            <button @click="$routerto('owner_set_contract',$route.query)">{{$t('projectOwner.Interested')}}</button>
            <button @click="agreement(3)">{{$t('investor.Refuse')}}</button>
          </aside>
        </footer>
      </article>
    </main>
<!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
export default {
  name: "p_sign_request",
  data() {
    return {
      show: false,
      projectId:'',
      signId:'',
      signStatus:"",
      title: "",
      dad_text: "",
      middlemen:{
        userIdentityType: {
          name: this.$t('projectOwner.MiddlemanType'),
          response: ""
        },
        userName: {
          name: this.$t('projectOwner.MiddlemanName'),
          response: ""
        },
        userCompanyCh:{
          name: this.$t('common.CompanyName'),
          response: ""
        },
        userCompanyEn: {
          name:  this.$t('common.CompanyName'),
          response: ""
        }
      },
      nav_lists: {
        financingStage: {
          name: this.$t('agent.FinancingStage'),
          response: ""
        },
        committedCount: {
          name: this.$t('agent.NumberOfinvestorsHaveSubmitted'),
          response: ""
        },
        interestProjectCount: {
          name: this.$t('agent.Numberofprojectsinterested'),
          response: ""
        },
      },
      details_lists: {
        projectIndustry: {
          name:this.$t('common.Industry'),
          response: ""
        },
        projectArea: {
          name: this.$t('common.region'),
          response: ""
        },
        projectCompany: {
          name: this.$t('common.CompanyName'),
          response: ""
        },
        currencyType: {
          name:this.$t('common.Currency'),
          response: ""
        },
        collectMoney: {
          name: this.$t('common.FundingAmount'),
          collectMoneyMin:'',
          collectMoneyMax: "",
        },
        projectMobile: {
          name: this.$t('common.ContactNumber'),
          response: ""
        },
        projectEmail: {
          name: this.$t('common.Email'),
          response: ""
        },
        signStatus: {
          name: this.$t('common.ContractStatus'),
          response: "",
          classname:'red',
        },
        projectDescribe: {
          name: this.$t('common.ProjectDescription'),
          response: ""
        },
        projectDetail:{
          name: this.$t('common.ProjectDetails'),
          response: ""
        },
      },
      investor_infor: {
        investorsType: {
          name: this.$t('agent.InvestorType'),
          response: ""
        },
        investorsCompany: {
          name: this.$t('agent.InvestorCompany'),
          response: ""
        },
        investorsName: {
          name:this.$t('agent.InvestorName'),
          response: ""
        },
        investorsArea: {
          name: this.$t('agent.InvestorRegion'),
          response: ""
        },
        // investorsMobile: {
        //   name: this.$t('agent.InvestorPhone'),
        //   response: ""
        // },
        // investorsEmail: {
        //   name: this.$t('agent.InvestorMailbox'),
        //   response: ""
        // }
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
    this.projectId=this.$route.query.projectId?
    this.$route.query.projectId:'';
    this.signId=this.$route.query.signId?this.$route.query.signId:-1;
    this.signStatus=this.$route.query.signStatus?this.$route.query.signStatus:'';
    if(this.signStatus==6){
      this.dad_text= this.$t('projectOwner.ReviewItems');
    }else if(this.signStatus==1){
      this.dad_text=this.$t('common.PendingItems');
    }
    this.$loading();
    this.$global
      .goods_deatails(
        `${this.$baseurl}/bsl_web/project/getProjectDetails`,
        "get",
        {
          projectId:this.projectId,
          signStatus:this.signStatus,
          signId:this.signId || -1
        },
        this.details_lists,
        this.nav_lists,
        this.investor_infor,
        this.middlemen
      ).then(res=>{
    this.title=res.title;
    this.$toast.clear();
    if(res.projectLifeCycle==-1){
      this.$dialog
        .alert({
          title: this.$t('projectOwner.ThisItemHasBeenDeleted')
        })
        .then(() => {
          this.$router.go(-1);
        });
    }
  })
  },
  methods: {
    review(num){
      if(num==7){

      }
      this.$dialog
        .confirm({
          title: this.$t('projectOwner.PleaseConfirmTheOperation')
          // message: "弹窗内容"
        })
        .then(() => {
          // on confirm
        this.$loading();
       this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/projectSign/reviewInvestorsData`,
         {signId:this.signId,
           signStatus:num,
         })
         .then(res=>{
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            let query1=Object.assign({},this.$route.query,{signStatus:num})
            this.$router.push({query:query1})
              let res_message="";
                if(num==8){
                      res_message=this.$t('projectOwner.CooperationIntentionHasBeenSent');
                }
                else if(num==7){
                      res_message=this.$t('projectOwner.BackToMyProject');
                  }
                  this.$dialog
                    .alert({
                      title: res.data.resultDesc,
                      message:res_message,
                    })
                    .then(() => {
                      this.$routerto("mysign");
                    });
              }else{
                  this.$dialog
                  .alert({
                    title: res.data.resultDesc
                  })
                  .then(() => {
                  });
              }
       })
        })
        .catch(() => {
          // on cancel
       });

// // a
    },

    agreement(num) {
      this.$dialog
        .confirm({
          title: this.$t('investor.WhetherToDecline')
        })
        .then(() => {
          this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/projectSign/reviewInterestedRequest`,{
                projectId: this.projectId,
                signId: this.signId,
                signStatus: num
              })
            .then(res => {
              if (res.data.resultCode == 10000) {
                let query1=Object.assign({},this.$route.query,{signStatus:3})
                // let query1=object.assign()
                console.log(query1)
                this.$router.push({query1})
                this.$dialog
                  .alert({
                    title:res.data.resultDesc
                  })
                  .then(() => {
                    this.$routerto("mysign");
                  });
              } else {
                this.$dialog
                  .alert({
                    title: res.data.resultDesc
                  })
                  .then(() => {});
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
#p_sign_request {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .middlerean_info{
     .van-divider{
    background:#F2F2F2;
    border-color: #D2D2D2;
    padding: 0 2rem;
    margin:0;
    color: #858585;
    font-size: 0.42rem;
  }
  }

}

</style>
<style lang="scss" scoped>
#p_sign_request {
  width: 100%;
  height: 100%;
  main {
    padding: 1.6rem 0 1.3rem 0;
    background: #ffffff;
    div.middlerean_info{
      ul{
        padding: 0.1rem 0.5rem;
        li{
          >div{
            margin-bottom: 0.1rem;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-align: baseline;
            -webkit-align-items: baseline;
            align-items: baseline;
            font-size: 0.42rem;
            .row1{
              color: #4c4c4c;
              font-weight: 600;
              width: 4.4rem;
            }
            .row2{
              -webkit-box-flex: 1;
              -webkit-flex: 1;
              flex: 1;
              display: -webkit-box;
              display: -webkit-flex;
              display: flex;
              -webkit-box-pack: center;
              -webkit-justify-content: center;
              justify-content: center;
              word-break: break-all;
              line-height: 0.48rem;
              color: #787878;
            }
          }
        }
      }
    }
    div.investors_infor {
      h2 {
       min-height: 2rem;
        font-size: 0.48rem;
        padding: 0.4rem;
        box-sizing: border-box;
        word-break: break-all;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap:  wrap;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;
      }
      ul {
        padding: 0.1rem 0.5rem;
        li {
          > div {
            margin-bottom: 0.1rem;
            display: flex;
            align-items: baseline;
            font-size: 0.42rem;

          }
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4.4rem;
          }
          .draft {
            margin-bottom: 0.25rem;
          }
          .row2 {
            flex: 1;
            /*width: 7rem;*/
            /*word-break: break-all;*/
            display: flex;
            justify-content: center;
            /*line-height: 0.48rem;*/
            color: #787878;
          }
          .draft1 {
            padding: 0.2rem 0.4rem;
            box-sizing: border-box;
          }
        }
      }
    }
    article {
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
           font-size: 0.42rem;
        aside {
          height: 2.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          /*align-items: center;*/
          button {
            height: 1rem;
            width: 8rem;
            border-radius:5px;
            color: #ffffff;
          }
          button:nth-of-type(1) {
            background: #00adef;
          }
          button:nth-of-type(2) {
            background: #ff7c2c;
          }
        }
      }
    }
  }
}
</style>
