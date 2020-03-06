<template>
  <div id="i_wait_confirm">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />待确认项目
    </nav>
    <!-- <commonnav :msg="dad_text"></commonnav> -->
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
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
    <mbottom></mbottom>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "goods_details",
  data() {
    return {
      show: false,
      // dad_text:'待确认项目',
      investorsEmailSend: "",
      title: "",
      signUserId3:'',
      investorsId:'',
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
        },  projectDetail:{
          name: "项目详情:",
          response: ""
        },
      }
    };
  },
  created() {
    console.log(this.$route.query);
    let details = this.$route.query;
    this.$loading();
    this.$global
      .goods_deatails(
        `${
          this.$baseurl
        }/bsl_web/project/getProjectDetails.do?projectLan=zh_CN&signId=${
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
        this.signUserId3=res.signUserId3
        this.investorsId=res.investorsId;
        this.title = res.title;
        this.$toast.clear();
        if(res.projectLifeCycle==-1){
          this.$dialog
            .alert({
              title: "项目已不存在,请确认是否刪除",
            })
            .then(() => {
              this.$router.go(-1);
            })
          return
        }
      });
  },
  mounted() {},
  methods: {
    agree() {
        let query=Object.assign({investorsId:this.investorsId,signUserId3:this.signUserId3},this.$route.query)
        this.$routerto("i_perfect_infor", query);

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
              let query1 = Object.assign({},this.$route.query,{signStatus: 11})
            this.$router.push({query:query1})
              this.$dialog
                .confirm({
                  title: res.data.resultDesc
                })
                .then(() => {
                  this.$routerto('mysign');
                });
            }else{
               this.$dialog
                .confirm({
                  title: res.data.resultDesc
                })
                .then(() => {
                  // this.$routerto('mysign');
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
#i_wait_confirm {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
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
}

</style>
<style lang="scss" scoped>
#i_wait_confirm {
  width: 100%;
  height:100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    z-index: 999;
    top: 0;
    font-size: 0.46rem;
    color:#333333;
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
        aside {
          height: 2.5rem;
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
