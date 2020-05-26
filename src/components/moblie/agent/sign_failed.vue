<template>
  <div id="a_sign_failed">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
        <commoninvestors v-if="$route.query.signStatus==7 || $route.query.signStatus==11" :investor_infor="investor_infor"></commoninvestors>
      </div>
      <article>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
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
      dad_text: this.$t('agent.RejectedItems'),
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
		},	potentialInvestorsTags:{
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
          signId:details.signId ? details.signId : -1
        },
        this.details_lists,
        this.nav_lists,
        this.investor_infor,
        {}
      )
      .then(res => {
        this.title = res.title;
        this.$toast.clear();
      });
  },
  methods: {
  }
};
</script>
<style lang="scss">
#a_sign_failed {
  nav {
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
</style>
<style lang="scss" scoped>
#a_sign_failed {
  width: 100%;
  height: 100%;
  main {
    padding: 1.6rem 0 1.3rem 0;
    background: #ffffff;
    div.investors_infor {
      h2 {
        min-height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        word-break: break-all;
        display: -webkit-flex;
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;

      }
    }
  }
}
</style>
