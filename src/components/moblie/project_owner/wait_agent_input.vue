<template>
  <div id="wait_agent_input">
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
            <li v-else-if="middlemen.Type==2 && $i18n.locale=='en_US'">
              <div>
                <p class="row1">{{middlemen.userCompanyEn.name}}:</p>
                <p class="row2">{{middlemen.userCompanyEn.response}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- <commoninvestors :investor_infor="investor_infor"></commoninvestors> -->
      </div>
      <article>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
          <aside>
            <button @click="$routerto('p_check_contract',$route.query)">{{$t('agent.CheckContract')}}</button>
          </aside>
        </footer>
      </article>
    </main>
<!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
  export default {
    name: "p_wait_agent_input",
    data() {
      return {
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
            name:this.$t('common.CompanyName'),
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
		  potentialInvestorsTags:{
		  	name: this.$t('common.potentialInvestors'),
		  	response: ""
		  }	
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
          investorsMobile: {
            name: this.$t('agent.InvestorPhone'),
            response: ""
          },
          investorsEmail: {
            name: this.$t('agent.InvestorMailbox'),
            response: ""
          }
        },
      };
    },
    created() {
      console.log(this.$i18n.locale)
      let details = this.$route.query;
      if(this.$route.query.signStatus==4){
        this.dad_text= this.$t('common.SignedForChain');
      }else if(this.$route.query.signStatus==2){
        this.dad_text= this.$t('common.ToBeSigned');
      }else if(this.$route.query.signStatus==5){
        this.dad_text=this.$t('common.ChainedForRecommendation');
      }
      this.$loading();
      this.$global
        .goods_deatails(
          `${this.$baseurl}/bsl_web/project/getProjectDetails`,
          "get",
          {
            projectId:details.projectId,
            signStatus:details.signStatus,
            signId:details.signId || -1
          },
          this.details_lists,
          this.nav_lists,
          this.investor_infor,
          this.middlemen
        )
        .then(res => {
          this.$toast.clear();
          this.title = res.title;
          if(res.projectLifeCycle==-1){
            this.$dialog
              .alert({
                title: this.$t('projectOwner.ThisItemHasBeenDeleted'),
              })
              .then(() => {
                this.$router.go(-1)
              });
          }

        });
    },
    methods: {
      // 点击事件
      check_contract() {
        this.$loading();
        var newWindow = window.open();
        this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getPdf`,
          {
            signId:this.$route.query.signId,
          })
          .then(res => {
          this.$toast.clear();
          console.log(res);
          if (res.data.resultCode == 10000) {
            // window.open();
            newWindow.location.href = res.data.data.pdfPath;
          }
        });
      }
    }
  };
</script>
<style lang="scss">
  #wait_agent_input {
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
    .van-dialog__header {
      font-size: 0.5rem;
    }
    .van-dialog__content {
      margin: 0.5rem 0;
      display: flex;
      justify-content: center;
      div {
        width: 6rem;
        // height: 2rem;
        text-align: center;
        word-wrap: break-word;
      }
      .hash {
        margin-top: 0.2rem;
        color: #0f6ebe;
      }
    }

  }
</style>
<style lang="scss" scoped>
  #wait_agent_input {
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
          flex-wrap: wrap;
          color: #0f6ebe;
          font-weight: 600;
          line-height: 0.68rem;
        }
      }
      article {
        footer {
          padding: 0 0.5rem 0.5rem 0.5rem;
           font-size: 0.42rem;
          text-align: center;
          aside {
            height: 1.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            p {
            }
            button {
              height: 1rem;
              width: 8rem;
              border-radius:5px;
              color: #ffffff;
            }
            button:nth-of-type(1) {
              background: #00adef;
            }
          }
        }
      }
    }
  }
</style>
