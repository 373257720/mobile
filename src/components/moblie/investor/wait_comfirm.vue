<template>
  <div id="i_wait_confirm">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />{{$t('investor.Itemstobeconfirmed')}}
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
            <button @click="agree">{{$t('investor.CompleteMaterial')}}</button>
            <button @click="refuse">{{$t('investor.Refuse')}}</button>
          </aside>
        </footer>
      </article>
    </main>
<!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
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
      investorsType:'',
       investorsCompany:'',
       investorsName:'',
      investor_infor: {
        investorsType: {
          name: this.$t('agent.InvestorType'),
          response: ""
        },
        investorsCompany: {
          name: this.$t('agent.InvestorCompany'),
          response: ""
        },
        investorsName: {
          name:this.$t('agent.InvestorName'),
          response: ""
        },
        investorsArea: {
          name: this.$t('agent.InvestorRegion'),
          response: ""
        },
      },
      nav_lists: {
        financingStage: {
          name: this.$t('agent.FinancingStage'),
          response: ""
        },
      },
      details_lists: {
        projectIndustry: {
          name:this.$t('common.Industry'),
          response: ""
        },
        projectArea: {
          name: this.$t('common.region'),
          response: ""
        },
        projectCompany: {
          name: this.$t('common.CompanyName'),
          response: ""
        },
        currencyType: {
          name:this.$t('common.Currency'),
          response: ""
        },
        collectMoney: {
          name: this.$t('common.FundingAmount'),
          collectMoneyMin:'',
          collectMoneyMax: "",
        },
        projectMobile: {
          name: this.$t('common.ContactNumber'),
          response: ""
        },
        projectEmail: {
          name: this.$t('common.Email'),
          response: ""
        },
        signStatus: {
          name: this.$t('common.ContractStatus'),
          response: "",
          classname:'red',
        },
        projectDescribe: {
          name: this.$t('common.ProjectDescription'),
          response: ""
        },
        projectDetail:{
          name: this.$t('common.ProjectDetails'),
          response: ""
        },
      },
    };
  },
  created() {
    console.log(this.$route.query);
    let details = this.$route.query;
    this.$loading();
    this.$global
      .goods_deatails(
        `${this.$baseurl}/bsl_web/project/getProjectDetails`,
        "get",
        {
          projectId:details.projectId,
          signStatus:details.signStatus,
          signId:details.signId ? details.signId : -1
        },
        this.details_lists,
        this.nav_lists,
        this.investor_infor,
        {}
      )
      .then(res => {
        console.log(res)
        this.investorsType=res.investorsType;
        this.investorsCompany=res.investorsCompany?res.investorsCompany:'-';
        this.investorsName=res.investorsName?res.investorsName:'-';
        this.investorsEmailSend=res.investorsEmailSend;
        this.signUserId3=res.signUserId3
        this.investorsId=res.investorsId;
        this.title = res.title;
        this.$toast.clear();
        if(res.projectLifeCycle==-1){
          this.$dialog
            .alert({
              title:this.$t('common.TheItemNoLongerExists'),
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
        this.$store.commit('inverstor_mutation',{
          investorsType:this.investorsType,
          investorsCompany:this.investorsCompany,
          investorsName:this.investorsName,
        })
        this.$routerto("i_perfect_infor", query);

    },
    refuse() {
      this.$dialog
        .confirm({
          title:this.$t('investor.WhetherToDecline')
          // message: "弹窗内容"
        })
        .then(() => {
          this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/rejectProject.do`,
            {signId:this.$route.query.signId,
              investorsEmailSend:this.investorsEmailSend})
            .then(res => {
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
          align-items: center;
          button {
            border-radius: 5px;
            width: 8rem;
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
