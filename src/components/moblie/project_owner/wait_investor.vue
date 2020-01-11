<template>
  <div id="p_wait_investor">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />
      {{dad_text}}
    </nav>
    <main>
      <article>
        <header>{{title}}</header>
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
  name: "p_wait_investor",
  data() {
    return {
      hash_id: "",
      dad_text:'',
      title: "",
      nav_lists: {
        financingStage: {
          name: "融资阶段",
          response: ""
        },
        interestProjectCount: {
          name: "项目方<br>有兴趣数量",
          response: ""
        },
        committedCount: {
          name: "已提交</br>投资者数量",
          response: ""
        }
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
        signStatu: {
          name: "项目状态:",
          response: "暂无"
        },
        projectCompany: {
          name: "公司名称:",
          response: ""
        },
        publicCompany: {
          name: "是否上市公司:",
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
    if(this.$route.query.signStatus==5){
      this.dad_text='已上链待发送'
    }else if(this.$route.query.signStatus==6){
      this.dad_text='待投资者确认';
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
        []
      )
      .then(res => {
        console.log(res);
        this.hash_id = res.signAgreementKey;
        this.title = res.title;
        this.$toast.clear();
      });
    // console.log(pp);
  },

  methods: {
    // daship() {
    //   var newWindow = window.open();
    //   newWindow.location.href = "http://www.wearetechman.com:5001/webui";
    //   // tempwindow.location=hash_id;
    // },
    // 点击事件

    check_contract() {
      this.$loading();
      var newWindow = window.open();
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/projectSign/getPdf?signId=${this.$route.query.signId}`
      }).then(res => {
        this.$toast.clear();
        // console.log(res);
        if (res.data.resultCode == 10000) {
          newWindow.location.href = res.data.data.pdfPath;
        }
      });
    },
    gg() {
      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
#p_wait_investor {
  .van-checkbox__icon {
    //   line-height:0.625rem;
    font-size: 0.2rem;
  }
  .van-hairline--top-bottom::after {
    border: 0.01rem solid #8e8e8e;
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
#p_wait_investor {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    background: #ffffff;

    article {
      margin: 0 0 1rem 0;
      header {
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
      ul {
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4rem;
            // margin-bottom: 0.2rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
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
