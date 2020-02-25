<template>
  <div id="a_wait_investor_comfirm">
    <!-- <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约请求
    </nav>-->
    <commonnav :msg="dad_text"></commonnav>
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
      details: {},
      dad_text: "待投资者确认项目",
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
  beforeRouteLeave(to,from,next){
      console.log(to,from)
        if(to.name=='a_wait_sendemail'){
           next({path: '/mysign'});
        }else{
          next()
        }
  },
  created() {
    this.details = this.$route.query;
    this.$loading();
    this.$global
      .goods_deatails(
        `${
          this.$baseurl
        }/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${
          this.details.projectId
        }&signStatus=${this.details.signStatus}&signId=${
          this.details.signId ? this.details.signId : -1
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
        // this.investor_infor=[...res.investor_infor]
        // this.nav_lists = [...res.nav_lists];
        // this.details_lists = [...res.details_lists];
        this.title = res.title;
        this.$toast.clear();
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
#a_wait_investor_comfirm {
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

  // .van-dialog {
  //   font-size: 0.3rem;
  // }
  // .van-cell {
  //   font-size: 0.3rem;
  //   background: #f2f2f2;
  //   // padding: 0;
  //   padding: 0.2rem 0.3rem;
  //   margin: 0 0 0.5rem;
  //   border: 1px solid #b5b5b5;
  // }
}
</style>
<style lang="scss" scoped>
#a_wait_investor_comfirm {
  width: 100%;
  height: 100%;
  main {
    padding: 1.6rem 0 1.3rem 0;
    background: #ffffff;
    div.investors_infor {
      h2 {
        min-height: 0.68rem;
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

    }
    article {
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
            font-size: 0.42rem;
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
