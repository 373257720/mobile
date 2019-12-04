<template>
  <div id="p_sign_failed">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />拒绝签约项目
    </nav>
    <main>
      <article>
        <header>{{title}}</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_sign_failed",
  data() {
    return {
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
    this.$loading();
     this.$global.goods_deatails(`${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${details.projectId}&signStatus=${details.signStatus}&signId=${details.signId?details.signId:-1}`,'get',{},this.details_lists,this.nav_lists,[]).then(res=>{
      console.log(res);
    this.title=res.title;
    this.$toast.clear();
  })
  },
  methods: {
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
#p_sign_failed {
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
#p_sign_failed {
  width: 100%;
  nav {
      width: 100%;
    text-align: center;
    line-height: 1.6rem;
    height: 1.6rem;
    position: fixed;
    top: 0;
    font-weight: 550;
    font-size: 0.5rem;
    background: white;
    border-bottom: 0.03125rem dashed #b5b5b5;
  }
  main {
    margin-top: 1.6rem;
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
        flex-wrap:  wrap;
        color: #0f6ebe; 
        font-weight: 600;
        line-height: 0.68rem;
      }
      div.nav_lists {
        display: flex;
        border-top: 0.2rem solid #f2f2f2;
        border-bottom: 0.2rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2rem;
          font-size: 0.3rem;
          display: flex;
          align-items: center;
          section.box {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            text-align: center;
            height: 1.5rem;
            //  padding: 0.1rem;
            border-right: 0.08rem solid #f2f2f2;
            flex-direction: column;
            justify-content: space-between;
            span.rowb {
              font-size: 0.38rem;
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
        padding: 0.5rem 0.5rem 2rem 0.5rem;
        li {
          display: flex;
          align-items: baseline;
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4rem;
            margin-bottom: 0.2rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.38rem;
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