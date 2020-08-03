<template>
  <div id="a_project_intro">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
      </div>
      <article>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
          <aside>
            <button
              v-if="$route.query.signStatus>=5"
              @click="recommamd"
            >{{$t('agent.RecommendInvestors')}}</button>
            <button
              v-if="$route.query.signStatus==='0'"
              @click="confirm_alert"
            >{{$t('agent.Interested')}}</button>
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
      dad_text: this.$t("common.ProjectDescription"),
      nav_lists: {
        financingStage: {
          name: this.$t("agent.FinancingStage"),
          response: ""
        },
        committedCount: {
          name: this.$t("agent.NumberOfinvestorsHaveSubmitted"),
          response: ""
        },
        interestProjectCount: {
          name: this.$t("agent.Numberofprojectsinterested"),
          response: ""
        }
      },
      details_lists: {
        projectIndustry: {
          name: this.$t("common.Industry"),
          response: ""
        },
        projectArea: {
          name: this.$t("common.region"),
          response: ""
        },
        projectCompany: {
          name: this.$t("common.CompanyName"),
          response: ""
        },
        currencyType: {
          name: this.$t("common.Currency"),
          response: ""
        },
        collectMoney: {
          name: this.$t("common.FundingAmount"),
          collectMoneyMin: "",
          collectMoneyMax: ""
        },
        projectMobile: {
          name: this.$t("common.ContactNumber"),
          response: ""
        },
        projectEmail: {
          name: this.$t("common.Email"),
          response: ""
        },
        projectDescribe: {
          name: this.$t("common.ProjectDescription"),
          response: ""
        },
        projectDetail: {
          name: this.$t("common.ProjectDetails"),
          response: ""
        },
        potentialInvestorsTags: {
          name: this.$t("common.potentialInvestors"),
          response: ""
        }
      },
      details: {}
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (to.name == "uploadtoblock") {
      next({ path: "/mysign" });
    } else {
      next();
    }
  },
  created() {
    this.details = this.$route.query;
    if (this.$route.query.signStatus >= 5) {
      this.dad_text = this.$t("agent.RecommendInvestors");
    } else {
      this.dad_text = this.$t("common.ProjectDescription");
    }
    this.$loading();
    this.$global
      .goods_deatails(
        `${this.$baseurl}/bsl_web/project/getProjectDetails`,
        "get",
        {
          projectId: this.details.projectId,
          signStatus: this.details.signStatus,
          signId: this.details.signId ? this.details.signId : -1
        },
        this.details_lists,
        this.nav_lists,
        {},
        {}
      )
      .then(res => {
        this.$toast.clear();
        this.details.signUserId1 = res.signUserId1;
        this.title = res.title;
        if (res.projectLifeCycle == -1) {
          this.$dialog
            .alert({
              title: this.$t("common.TheItemNoLongerExists")
            })
            .then(() => {
              this.$router.go(-1);
            });
          return;
        }
      });
  },
  methods: {
    recommamd() {
      console.log(this.details);
      this.$routerto("a_recommand_i", this.details);
    },
    confirm_alert() {
      let that = this;
      this.$loading();
      this.$global
        .get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/interested`, {
          projectId: this.$route.query.projectId
        })
        .then(res => {
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            this.$dialog
              .alert({
                title: this.$t("agent.YouHaveSubmittedYourApplication"),
                message: this.$t("agent.AfterTheApplicationIsProcessed")
              })
              .then(() => {
                this.$routerto("mysign");
              });
          } else {
            this.$dialog
              .alert({
                title: res.data.resultDesc
                // message: "弹窗内容"
              })
              .then(() => {});
          }
        });
    }
  }
};
</script>
<style lang="scss">
#a_project_intro {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  //   .van-dialog {
  //   font-size: 0.3rem;
  // }
  // .van-dialog__message {
  //   font-size: 0.3rem;
  // }
  // .van-button {
  //   font-size: 0.3rem;
  // }
}
</style>
<style lang="scss" scoped>
#a_project_intro {
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
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -moz-box-pack: center;
        -webkit--moz-box-pack: center;
        box-pack: center;
        align-items: center;
        -webkit-align-items: center;
        box-align: center;
        -moz-box-align: center;
        -webkit-box-align: center;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;
      }
    }
    article {
      footer {
        padding: 0 0.5rem 0 0.5rem;
        aside {
          height: 2.5rem;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          font-size: 0.42rem;
          align-items: center;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -moz-box-orient: vertical;
          -moz-box-direction: normal;
          flex-direction: column;
          -webkit-flex-direction: column;
          -webkit-justify-content: space-between;
          justify-content: space-between;
          /*-moz-box-pack:space-between;*/
          -webkit--moz-box-pack: space-between;
          box-pack: space-between;
          button {
            height: 1rem;
            color: #ffffff;
            width: 8rem;
            border-radius: 5px;
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
