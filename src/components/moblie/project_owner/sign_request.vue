<template>
  <div id="p_sign_request">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
      <h2>{{title}}</h2>
      <div class="middlerean_info">
          <van-divider>中间人资料</van-divider>
          <ul>
            <li  v-for="(item,key) in middlemen">
              <div v-if="key=='userName'">
                <p class="row1">{{item.name}}</p>
                <p class="row2">{{item.response}}</p>
              </div>
              <div v-if="key=='userIdentityType'">
                <p class="row1">{{item.name}}</p>
                <p class="row2">{{item.response==1?'个人':item.response==2?"公司":'-'}}</p>
              </div>
              <div v-else-if="( middlemen['userIdentityType'].response==2 && (key=='userCompanyCh' || key=='userCompanyEn'))">
                <p class="row1">{{item.name}}</p>
                <p class="row2">{{item.response}}</p>
              </div>
            </li>
          </ul>
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
      middlemen:{
        userIdentityType: {
          name: "中间人类型:",
          response: ""
        },
        userName: {
          name: "中间人名称:",
          response: ""
        },
        userCompanyCh:{
          name: "公司名称:",
          response: ""
        },
        userCompanyEn: {
          name: "Company Name:",
          response: ""
        }
      },

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
    this.$global.goods_deatails(`${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${this.projectId}&signStatus=${this.signStatus}&signId=${this.signId}`,'get',{},this.details_lists,this.nav_lists,this.investor_infor,this.middlemen).then(res=>{
    this.title=res.title;
    this.$toast.clear();
    if(res.projectLifeCycle==-1){
      this.$dialog
        .alert({
          title: "该项目已删除",
        })
        .then(() => {
<<<<<<< HEAD
          this.$router.go(-1);
=======
          this.$routerto("mysign");
>>>>>>> d655775c3eb162d21465407e6af55749abc46931
        });
    }
  })
  },
  methods: {
    review(num){
      if(num==7){

      }
      this.$dialog
        .confirm({
          title: "请确认操作",
          // message: "弹窗内容"
        })
        .then(() => {
          // on confirm
        this.$loading();
       this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/projectSign/reviewInvestorsData`,{signId:this.signId,signStatus:num}).then(res=>{
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            let query1=Object.assign({},this.$route.query,{signStatus:num})
            this.$router.push({query:query1})
              let res_message="";
                if(num==8){
                      res_message="已发送合作意向，等待中间人发送邀请链接给投资者";
                }
                else if(num==7){
                      res_message="返回我的项目";
                  }
                  this.$dialog
                    .alert({
                      title: res.data.resultDesc,
                      message:res_message,
                    })
                    .then(() => {
                      this.$routerto("mysign");
                    });
              }else{
                  this.$dialog
                  .alert({
                    title: res.data.resultDesc
                  })
                  .then(() => {
                  });
              }
       })
        })
        .catch(() => {
          // on cancel
       });

// // a
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
      ul {
        padding: 0.1rem 0.5rem;
        li {
          > div {
            margin-bottom: 0.1rem;
            display: flex;
            align-items: baseline;
            font-size: 0.42rem;
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
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
           font-size: 0.42rem;
        aside {
          height: 2.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
<<<<<<< HEAD
          /*align-items: center;*/
          button {
            height: 1rem;
            /*width: 80%;*/
            border-radius: 2px;
=======
          button {
            height: 1rem;
>>>>>>> d655775c3eb162d21465407e6af55749abc46931
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
