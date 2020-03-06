<template>
  <div id="i_conected_project">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />已连接项目
    </nav>
    <main>
      <article>
        <header>{{title}}</header>
        <!-- <commoninvestors :investor_infor="investor_infor"></commoninvestors> -->
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
          <aside>
            <button @click="$routerto('i_inverstor_infor',{investorsId:investorsId})">我的资料</button>
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "i_conected_project",
  data() {
    return {
      investorsId: "",
      title: "",
      // investor_infor: {
      //   investorsType: {
      //     name: "投资者类型:",
      //     response: ""
      //   },
      //   investorsCompany: {
      //     name: "投资者公司:",
      //     response: ""
      //   },
      //   investorsName: {
      //     name: "投资者姓名:",
      //     response: ""
      //   },
      //   investorsArea: {
      //     name: "投资者地区:",
      //     response: ""
      //   },
      //   investorsMobile: {
      //     name: "投资者电话:",
      //     response: ""
      //   },
      //   investorsEmailSend: {
      //     name: "投资者邮箱:",
      //     response: ""
      //   }
      // },
      nav_lists: {
        financingStage: {
          name: "融资阶段",
          response: ""
        },
        // committedCount: {
        //   name: "已提交</br>投资者数量",
        //   response: ""
        // },
        // interestProjectCount: {
        //   name: "项目方<br>有兴趣数量",
        //   response: ""
        // },

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
        },
        projectDetail:{
          name: "项目详情:",
          response: ""
        },
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
// .van-dialog {
//   font-size: 0.3rem;
// }
// .van-dialog__message {
//   font-size: 0.3rem;
// }
// .van-button {
//   font-size: 0.3rem;
// }
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
        /*padding: 0 0.5rem 0.5rem 0.5rem;*/
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
