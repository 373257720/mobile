<template>
  <div id="i_sign_failed">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />拒绝签约项目
    </nav>
    <!-- <commonnav :msg="dad_text"></commonnav> -->
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
      show: false,
      // dad_text:'待确认项目',
      investorsEmailSend: "",
      title: "",
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
<<<<<<< HEAD
        // committedCount: {
        //   name: "已提交</br>投资者数量",
        //   response: ""
        // },
        // interestProjectCount: {
        //   name: "项目方<br>有兴趣数量",
        //   response: ""
        // }
=======
        committedCount: {
          name: "已提交</br>投资者数量",
          response: ""
        },
        interestProjectCount: {
          name: "项目方<br>有兴趣数量",
          response: ""
        }
>>>>>>> d655775c3eb162d21465407e6af55749abc46931
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
          collectMoneyMin: "",
          collectMoneyMax: ""
        },
        projectMobile: {
          name: "联系电话:",
          response: ""
        },
        projectEmail: {
          name: "电邮:",
          response: ""
        },
<<<<<<< HEAD
        signStatus: {
          name: "签约状态:",
          response: "",
        },
=======
>>>>>>> d655775c3eb162d21465407e6af55749abc46931
        projectDescribe: {
          name: "项目简介:",
          response: ""
        },
        projectDetail: {
          name: "项目详情:",
          response: ""
        },
<<<<<<< HEAD
        // signStatus: {
        //   name: "签约状态:",
        //   response: ""
        // }
=======
        signStatus: {
          name: "签约状态:",
          response: ""
        }
>>>>>>> d655775c3eb162d21465407e6af55749abc46931
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
        console.log(res);
        this.title = res.title;
        this.$toast.clear();
      });
  },
  mounted() {},
  methods: {
    agree() {
      let isyes = this.$store.state.currentUser;
      console.log(isyes);
      if (isyes) {
        this.$routerto("i_perfect_infor", this.$route.query);
      } else {
        this.$dialog
          .confirm({
            title: "请登录后操作"
            // message: "弹窗内容"
          })
          .then(() => {
            // on confirm
            this.$routerto("login", { email: this.investorsEmailSend });
          });
        // .catch(() => {
        //   // on cancel
        // });
      }
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
            console.log(res.data);
            if ((res.data.resultCode = 10000)) {
              this.$dialog
                .alert({
                  title: "拒绝成功"
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
#i_sign_failed {
<<<<<<< HEAD
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
=======
>>>>>>> d655775c3eb162d21465407e6af55749abc46931
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
.van-dialog {
  font-size: 0.3rem;
}
.van-dialog__message {
  font-size: 0.3rem;
}
.van-button {
  font-size: 0.3rem;
}
</style>
<style lang="scss" scoped>
#i_sign_failed {
  width: 100%;
  height:100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    color: #333;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    padding: 1.5rem 0 1.3rem 0;
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



    }
  }
}
</style>
