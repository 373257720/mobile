<template>
  <div id="p_sign_request">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
      <h2>{{title}}</h2>
      <div class="middlerean_info">
          <van-divider>中间人资料</van-divider>
      </div>
      <commoninvestors v-if="$route.query.signStatus==6" :investor_infor="investor_infor"></commoninvestors>
      </div>
      <article>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <footer>
           <aside v-if="$route.query.signStatus==6">
            <button @click="review(8)">确认投资人</button>
            <button @click="review(7)">拒绝</button>
          </aside>
          <aside v-else-if="$route.query.signStatus==1">
            <button @click="$routerto('owner_set_contract',$route.query)">感兴趣</button>
            <button @click="agreement(3)">拒绝</button>
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
      projectId:'',
      signId:'',
      signStatus:"",
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
        },
        projectDetail:{
          name: "项目详情:",
          response: ""
        },
      }
    };
  },
  beforeRouteLeave(to,from,next){
      console.log(to,from)
        if(to.name=='a_submit_contract'){
          // console.log(123)
           next({path: '/mysign'});
        }else{
          next()
        }
  },
  created() {
    this.projectId=this.$route.query.projectId?
    this.$route.query.projectId:'';
    this.signId=this.$route.query.signId?this.$route.query.signId:-1;
    this.signStatus=this.$route.query.signStatus?this.$route.query.signStatus:'';
    if(this.signStatus==6){
      this.dad_text="待审核项目"
    }else if(this.signStatus==1){
      this.dad_text="待处理项目"
    }
    this.$loading();
    this.$global.goods_deatails(`${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${this.projectId}&signStatus=${this.signStatus}&signId=${this.signId}`,'get',{},this.details_lists,this.nav_lists,this.investor_infor).then(res=>{
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
    review(num){
      this.$loading();
       this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/projectSign/reviewInvestorsData`,{signId:this.signId,signStatus:num}).then(res=>{
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            let query1=Object.assign({},this.$route.query,{signStatus:num})
            this.$router.push({query:query1})
                    if(num==8){
                      this.$dialog
                        .alert({
                          title: res.data.resultDesc,
                          message:"已发送合作意向，等待中间人发送邀请链接给投资者",
                        })
                        .then(() => {
                          this.$routerto("mysign");
                        });
                    }
                   else if(num==7){
                        this.$dialog
                          .alert({
                            title: res.data.resultDesc,
                            // message:"已发送合作意向，等待中间人发送邀请链接给投资者",
                          })
                          .then(() => {
                            this.$routerto("mysign");
                          });
                      }

              }else{
                  this.$dialog
                  .alert({
                    title: res.data.resultDesc
                  })
                  .then(() => {
                  });
              }
       })
// a
    },

    agreement(num) {
      this.$dialog
        .confirm({
          title: "拒绝签约"
        })
        .then(() => {
          this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/projectSign/reviewInterestedRequest`,{
                projectId: this.projectId,
                signId: this.signId,
                signStatus: num
              })
            .then(res => {
              if (res.data.resultCode == 10000) {
                let query1=Object.assign({},this.$route.query,{signStatus:3})
                // let query1=object.assign()
                console.log(query1)
                this.$router.push({query1})
                this.$dialog
                  .alert({
                    title:res.data.resultDesc
                  })
                  .then(() => {
                    this.$routerto("mysign");
                  });
              } else {
                this.$dialog
                  .alert({
                    title: res.data.resultDesc
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
  .middlerean_info{
     .van-divider{
    background:#F2F2F2;
    border-color: #D2D2D2;
    padding: 0 2rem;
    margin:0;
    color: #858585;
    font-size: 0.42rem;
  }
  }

}

</style>
<style lang="scss" scoped>
#p_sign_request {
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
        flex-wrap:  wrap;
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
