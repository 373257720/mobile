<template>
  <div id="wait_agent_input">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
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
    name: "goods_details",
    data() {
      return {
        title: "",
        dad_text: "",
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
          this.investor_infor,
          {}
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
      //   cancel() {
      //   this.show2 = false;
      // },
      daship() {
        var newWindow = window.open();
        newWindow.location.href = "http://www.wearetechman.com:5001/webui";
        // tempwindow.location=hash_id;
      },
      // 点击事件
      share(val) {
        console.log(val);
        this.message = val;
        this.$copyText(this.message).then(
          e => {
            this.show = true;
          },
          function(e) {
            // alert("Can not copy");
            console.log(e);
          }
        );
      },
      check_contract() {
        this.$loading();
        var newWindow = window.open();
        this.$axios({
          method: "get",
          url: `${this.$baseurl}/bsl_web/projectSign/getPdf?signId=${this.$route.query.signId}`
        }).then(res => {
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
