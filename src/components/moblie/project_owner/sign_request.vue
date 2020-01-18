<template>
  <div id="p_sign_request">
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


            <button @click="routerto">感兴趣</button>
            <button @click="agreement(3)">拒绝签约</button>
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
      show: false,
      projectId: null,
      signId: null,
      title: "",
      dad_text: "待审核项目",
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
    this.projectId=this.$route.query.projectId;
    this.signId=this.$route.query.signId;
    let details = this.$route.query;
    this.$loading();
    this.$global.goods_deatails(`${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${details.projectId}&signStatus=${details.signStatus}&signId=${details.signId?details.signId:-1}`,'get',{},this.details_lists,this.nav_lists,this.investor_infor).then(res=>{
    // console.log(res);
    this.title=res.title;
    this.$toast.clear();
    if(res.projectLifeCycle==-1){
      this.$dialog
        .alert({
          title: "该项目已删除",
        })
        .then(() => {
          this.$routerto("mysign");
        });
    }
  })
  },
  methods: {
    routerto(){
      // this.$store.commit('contract_sign', {
      //   owner: '',
      //   article: '',
      //   agent: '',
      //   owner_signdate: null,
      //   agent_signdate: null,
      // })
      this.$routerto('owner_set_contract',this.$route.query)
    },
    agreement(num) {
      this.$dialog
        .confirm({
          title: "拒绝签约"
        })
        .then(() => {
          this.$global
            .changepage(
              `${this.$baseurl}/bsl_web/projectSign/sendInvestorsData`,
              "post",
              this.$qs.stringify({
                projectId: this.projectId,
                signId: this.signId,
                signStatus: 3
              })
            )
            .then(res => {
              // console.log(res);
              if (res.data.resultCode == 10000) {
                this.$dialog
                  .alert({
                    title: "拒绝成功"
                  })
                  .then(() => {
                    this.$routerto("mysign");
                  });
              } else if (res.data.resultCode == 10012) {
                this.$dialog
                  .alert({
                    title: "你已拒绝"
                  })
                  .then(() => {});
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
#p_sign_request {
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
#p_sign_request {
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
        flex-wrap:  wrap;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;
      }

      header {
        height: 0.8rem;
        font-size: 0.38rem;
        text-align: center;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        // border-bottom: 0.01rem dashed #b5b5b5;
      }

      ul {
        padding: 0.1rem 0.5rem;
        display: flex;
        flex-direction: column;
        li {
          >div{
          display: flex;
          align-items: baseline;
          font-size: 0.38rem;
          line-height: 0.56rem;
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
        font-size: 0.38rem;
        text-align: center;
        // font-weight: 600;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        // border-bottom: 0.01rem dashed #b5b5b5;
      }
      .nav_lists {
        border-top: 0;
      }
      div.nav_lists {
        display: flex;
        // border-top: 0.2rem solid #f2f2f2;
        border-bottom: 0.2rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2.5rem;
          font-size: 0.3rem;
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
        .contract {
          display: block;
          .row2 {
            width: 8rem;
            height: 6rem;
            border: 0.01rem solid #b3b3b3;
            // box-sizing: border-box;
            padding: 0;
            background: #f2f2f2;
            .draft1_middle {
              padding: 0.3rem;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              overflow-y: auto;
            }
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.38rem;
        aside {
          height: 2.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          button {
            height: 1rem;
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
