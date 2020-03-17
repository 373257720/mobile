<template>
  <div id="i_conected_project">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />{{$t('common.ConnectedItems')}}
    </nav>
    <main>
      <article>
        <header>{{title}}</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
          <aside>
            <button @click="$routerto('i_inverstor_infor',{investorsId:investorsId})">{{$t('investor.MyProfile')}}</button>
          </aside>
        </footer>
      </article>
    </main>
<!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
export default {
  name: "i_conected_project",
  data() {
    return {
      investorsId: "",
      title: "",
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
      nav_lists: {
        financingStage: {
          name: this.$t('agent.FinancingStage'),
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
    };
  },
  created() {
    let details = this.$route.query;
    this.$loading();
    this.$global
      .goods_deatails(
        `${
          this.$baseurl
        }/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${
          details.projectId
        }&signStatus=${details.signStatus}&signId=${
          details.signId ? details.signId : -1
        }`,
        "get",
        {},
        this.details_lists,
        this.nav_lists,
        {},
        {}
      )
      .then(res => {
        this.investorsId = res.investorsId;
        console.log(res);
        this.title = res.title;
        this.$toast.clear();
      });
  },
  methods: {}
};
</script>
<style lang="scss">
#i_conected_project {
  article{
    #nav_lists{
      .box{
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        /*display: none !important;*/
      }
    }
  }

  .van-checkbox__icon {
    //   line-height:0.625rem;
    font-size: 0.2rem;
  }
  .van-hairline--top-bottom::after {
  }
  .van-cell {
    padding: 0;
    .van-field__control {
      background: #f2f2f2;
      font-size: 0.3rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
    }
  }
  nav {
    position: relative;
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
#i_conected_project {
  width: 100%;
  height: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
     color:#333;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    padding: 1.5rem 0 1.3rem 0;
    background: #ffffff;
    article {
      header {
        min-height: 2rem;
        font-size: 0.46rem;
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
      footer {
        padding-bottom: 1rem;
        display: flex;
        justify-content: center;
        font-size: 0.42rem;
        button {
          width: 9.9rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>
