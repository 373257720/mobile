<template>
  <div id="a_project_intro">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
      </div>
      <article>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
          <aside>
            <button v-if="$route.query.signStatus>=5"  @click="recommamd">推荐投资者</button>
            <button v-if="$route.query.signStatus==='0'" @click="confirm_alert">感兴趣</button>
            <!-- <button @click="$global.previous()">再考虑一下</button> -->
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
      dad_text: "项目简介",
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
      },
      details:{},
    };
  },
  beforeRouteLeave(to,from,next){
      console.log(to,from)
        if(to.name=='uploadtoblock'){
           next({path: '/mysign'});
        }else{
          next()
        }
  },
  created() {
    this.details = this.$route.query;
    if(this.$route.query.signStatus>=5){
      this.dad_text="推荐投资者"
    }else{
      this.dad_text="项目简介"
    }
    this.$loading();
    this.$global
      .goods_deatails(
        `${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${
          this.details.projectId
        }&signStatus=${this.details.signStatus}&signId=${
          this.details.signId ? this.details.signId : -1
        }`,
        "get",
        {},
        this.details_lists,
        this.nav_lists,
        {},
        {}
      )
      .then(res => {
        this.$toast.clear();
        this.details.signUserId1=res.signUserId1;
        this.title = res.title;

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
  methods: {
    recommamd(){
      console.log(this.details)
      this.$routerto("a_recommand_i",this.details)
    },
    confirm_alert() {
      let that=this;
       this.$loading();
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/interested`,{projectId:this.$route.query.projectId}).then(res=>{
         this.$toast.clear();
        if(res.data.resultCode==10000){
            this.$dialog
              .alert({
                title: "您已提交签约申请",
                message: "申请获处理后，请于待签约项目中签署确认条款。"
              })
              .then(() => {
                  this.$routerto("mysign")
              })
        }else{
           this.$dialog
              .alert({
                title: res.data.resultDesc,
                // message: "弹窗内容"
              })
              .then(() => {
              })
        }

      })


    }
  }
};
</script>
<style lang="scss">
#a_project_intro {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
//   .van-dialog {
//   font-size: 0.3rem;
// }
// .van-dialog__message {
//   font-size: 0.3rem;
// }
// .van-button {
//   font-size: 0.3rem;
// }
}

</style>
<style lang="scss" scoped>
#a_project_intro {
  width: 100%;
  height: 100%;
  main {
    padding: 1.6rem 0 1.3rem 0;
    background: #ffffff;
    div.investors_infor {
       h2 {
        min-height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        word-break: break-all;
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content:center;
        justify-content:center;
        -moz-box-pack:center;
        -webkit--moz-box-pack:center;
        box-pack:center;
        align-items:center;
-webkit-align-items:center;
box-align:center;
-moz-box-align:center;
-webkit-box-align:center;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;
      }

    }
    article {
      footer {
        padding: 0 0.5rem 0 0.5rem;
        aside {
          height: 2.5rem;
          display:-webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          font-size: 0.42rem;
          -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -moz-box-orient:vertical;
    -moz-box-direction:normal;
    flex-direction:column;
    -webkit-flex-direction:column;
    -webkit-justify-content:space-between;
justify-content:space-between;
-moz-box-pack:space-between;
-webkit--moz-box-pack:space-between;
box-pack:space-between;
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
