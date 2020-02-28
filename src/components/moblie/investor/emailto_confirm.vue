<template>
  <div id="i_emailto_confirm">
    <nav>待确认项目</nav>
    <!-- <commonnav :msg="dad_text"></commonnav> -->
    <main>
      <div class="investors_infor">
        <h2>{{projectName}}</h2>
          <commoninvestors :investor_infor="investor_infor"></commoninvestors>
      </div>
      <article>
        <!-- <header>项目详情</header> -->
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
          <aside>
            <button @click="agree">完善资料</button>
            <button @click="refuse">拒绝</button>
          </aside>
        </footer>
      </article>
    </main>
    <!-- <mbottom></mbottom> -->
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      // dad_text:'待确认项目',
      investorsEmailSend: "",
      projectName: "",
      investor_infor: {
        investorsType: {
          name: "投资者类型:",
          response: ""
        },
        investorsCompany: {
          name: "投资者公司:",
          response: ""
        },
        investorsName: {
          name: "投资者姓名:",
          response: ""
        },
        investorsArea: {
          name: "投资者地区:",
          response: ""
        }
      },
      nav_lists: {
        financingStage: {
          name: "融资阶段",
          response: ""
        },
        committedCount: {
          name: "已提交</br>投资者数量",
          response: ""
        },
        interestProjectCount: {
          name: "项目方<br>有兴趣数量",
          response: ""
        },

      },
      details_lists: {
        projectIndustry: {
          name: "行业:",
          response: ""
        },
        projectArea: {
          name: "地区:",
          response: ""
        },
        // signStatu: {
        //   name: "项目状态:",
        //   response: "暂无"
        // },
        projectCompany: {
          name: "公司名称:",
          response: ""
        },
        currencyType: {
          name: "币种:",
          response: ""
        },
        collectMoney: {
          name: "集资额:",
          collectMoneyMin:'',
          collectMoneyMax: "",
        },
        projectMobile: {
          name: "联系电话:",
          response: ""
        },
        projectEmail: {
          name: "电邮:",
          response: ""
        },
        projectDescribe: {
          name: "项目简介:",
          response: ""
        }
      }
    };
  },
  created() {
    // console.log(this.$route.query);
    let details = this.$route.query;
    this.$loading();
    this.$global
      .goods_deatails(
        `${
          this.$baseurl
        }/bsl_web/project/getProjectDetails.do?projectLan=${details.projectLan}&signId=${
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
        this.investorsEmailSend=res.investorsEmailSend;
        console.log(res);
        this.projectName = res.title;
        this.$toast.clear();
      });
  },
  mounted() {},
  methods: {
    agree() {
        this.$dialog
          .confirm({
            title: "下一步注册新账号",
            message: "如已有账号，请直接登陆"
          })
          .then(() => {
            // on confirm
            this.$routerto("login", { email: this.investorsEmailSend });
          })
          .catch(() => {
            // on cancel
          });

    },

    refuse() {
      this.$dialog
        .confirm({
          title: "是否拒绝"
          // message: "弹窗内容"
        })
        .then(() => {
          this.$axios({
            method: "get",
            url: `${this.$baseurl}/bsl_web/projectSign/rejectProject.do?signId=${this.$route.query.signId}&investorsEmailSend=${this.investorsEmailSend}`
          }).then(res => {
            if (res.data.resultCode == 10000) {
              this.$dialog
                .alert({
                  title: "拒绝成功"
                })
                .then(() => {
                  this.$routerto("login");
                });
            }else{
              this.$dialog
                .alert({
                  title: res.data.resultDesc
                })
                .then(() => {
                  this.$routerto("login");
                });
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
#i_emailto_confirm {
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
#i_emailto_confirm {
  width: 100%;
  height: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    /*position: fixed;*/
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
     /*padding: 1.5rem 0 0 0;*/
    background: #ffffff;
    div.investors_infor {
      h2 {
        min-height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        word-break: break-all;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;
      }

    }
    article {
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        aside {
          height: 2.5rem;
          font-size: 0.42rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          button {
            height: 1rem;
            line-height: 1rem;
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
