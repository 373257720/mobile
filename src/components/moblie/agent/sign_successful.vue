<template>
  <div id="a_sign_successful">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
        <header>投资者资料</header>
        <commoninvestors :investor_infor="investor_infor"></commoninvestors>
      </div>
      <article>
        <header>项目详情</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
          <aside>
            <p>(合约同步到IPFS需要时间，如不能打开请稍后再试)</p>
            <button @click="check_contract">查看合约</button>
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      title: "",
      dad_text: "成功签约项目",
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
        },
        investorsMobile: {
          name: "投资者电话:",
          response: ""
        },
        investorsEmailSend: {
          name: "投资者邮箱:",
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
          response: ""
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
        this.investor_infor
      )
      .then(res => {
        console.log(res);
        this.title = res.title;
        this.$toast.clear();
      });
  },
  methods: {
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
          newWindow.location.href = res.data.data.pdfPath;
        }
      });
    }
  }
};
</script>
<style lang="scss">
#a_sign_successful {
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
#a_sign_successful {
  width: 100%;

  main {
    margin-top: 1.6rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
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
        align-content: center;
        flex-wrap: wrap;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;
      }
      header {
        height: 0.8rem;
        font-size: 0.32rem;
        text-align: center;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
      ul {
        padding: 0.1rem 0.5rem;
        li {
          > div {
            margin-bottom: 0.1rem;
            display: flex;
            align-items: baseline;
            font-size: 0.38rem;
          }
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .draft {
            margin-bottom: 0.25rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
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
      margin: 0 0 1.3rem 0;
      header {
        height: 0.8rem;
        font-size: 0.32rem;
        text-align: center;
        // font-weight: 600;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        // border-bottom: 0.01rem dashed #b5b5b5;
      }
      div.nav_lists {
        display: flex;
        border-top: 0;
        border-bottom: 0.2rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2.5rem;
          font-size: 0.38rem;
          display: flex;
          align-items: center;

          section.box {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            text-align: center;
            height: 2rem;
            //  padding: 0.1rem;
            border-right: 0.08rem solid #f2f2f2;
            flex-direction: column;
            justify-content: space-between;
            span.rowb {
              font-size: 0.6rem;
              color: #0f6ebe;
            }
          }
        }
        p:nth-last-child(1) {
          section.box {
            border-right: 0;
          }
        }
      }
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4rem;
          }
          .draft {
            margin-bottom: 0.25rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
          .draft1 {
            padding: 0.2rem 0.4rem;
            box-sizing: border-box;
          }
        }
        li.uploadblock {
          img {
            width: 0.6rem;
            vertical-align: middle;
            height: 0.6rem;
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.38rem;
        text-align: center;
        aside {
          height: 1.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
          }
          button {
            height: 1rem;
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
