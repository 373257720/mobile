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
            <button @click="$routerto('p_check_contract',$route.query)">查看合约</button>
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
        dad_text: "",
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
          projectMobile: {
            name: "投资者电话:",
            response: ""
          },
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
      if(this.$route.query.signStatus==4){
        this.dad_text='中间人已签约待上链'
      }else if(this.$route.query.signStatus==2){
        this.dad_text='等待中间人签约'
      }else if(this.$route.query.signStatus==5){
        this.dad_text='已上链待推荐'
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
<<<<<<< HEAD
          this.$toast.clear();
          this.title = res.title;
          if(res.projectLifeCycle==-1){
            this.$dialog
              .alert({
                title: "该项目已删除",
              })
              .then(() => {
                this.$router.go(-1)
              });
          }
=======
          console.log(res);
          this.title = res.title;
          this.$toast.clear();
>>>>>>> d655775c3eb162d21465407e6af55749abc46931
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
