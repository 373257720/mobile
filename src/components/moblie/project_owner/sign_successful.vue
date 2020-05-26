<template>
  <div id="p_sign_successful">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
        <!-- <header>投资者资料</header> -->
          <commoninvestors :investor_infor="investor_infor"></commoninvestors>
      </div>
      <article>
        <!-- <header>项目详情</header> -->
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
          <aside>
            <p>({{$t('agent.ToIPFS')}})</p>
            <button @click="check_contract">{{$t('agent.CheckContract')}}</button>
          </aside>
        </footer>
      </article>
    </main>
<!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      title: "",
      dad_text: this.$t('agent.signedproject'),
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
    let details = this.$route.query;
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
        {}
      )
      .then(res => {
        console.log(res);
        this.title = res.title;
        this.$toast.clear();
      });
  },
  methods: {
    // 点击事件
    check_contract() {
      this.$loading();
      var newWindow = window.open();
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getPdf`,
        {signId:this.$route.query.signId})
        .then(res => {
        this.$toast.clear();
        console.log(res);
        if (res.data.resultCode == 10000) {
          newWindow.location.href = res.data.data.pdfPath;
        }else{
          this.$toast(res.data.resultDesc);

        }
      });
    }
  }
};
</script>
<style lang="scss">
#p_sign_successful {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
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

  .van-dialog {
    font-size: 0.3rem;
  }
  .van-cell {
    font-size: 0.3rem;
    background: #f2f2f2;
    // padding: 0;
    padding: 0.2rem 0.3rem;
    margin: 0 0 0.5rem;
    border: 1px solid #b5b5b5;
  }
}
</style>
<style lang="scss" scoped>
#p_sign_successful {
  width: 100%;
  height: 100%;
  main {
    padding: 1.6rem 0 1.3rem 0;
    background: #ffffff;
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
            line-height: 1rem;
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
