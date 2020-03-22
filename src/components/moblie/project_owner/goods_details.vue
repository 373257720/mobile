<template>
  <div id="p_goods_details">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <article>
        <header>{{title}}</header>
         <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <!-- <footer>
        </footer> -->
      </article>
    </main>
<!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
export default {
  name: "p_goods_details",
  data() {
    return {
      title: "",
      dad_text: this.$t('common.ProjectDetails'),
      nav_lists: {
        financingStage: {
          name: this.$t('agent.FinancingStage'),
          response: ""
        },
        committedCount: {
          name: this.$t('agent.NumberOfinvestorsHaveSubmitted'),
          response: ""
        },
        interestProjectCount: {
          name: this.$t('agent.Numberofprojectsinterested'),
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
      financingStage: {
        '0': this.$t('projectOwner.SeedRound'),
        '1': this.$t('projectOwner.AngelWheel'),
        '2': this.$t('projectOwner.ARound'),
        '3': this.$t('projectOwner.BRound'),
        '4': this.$t('projectOwner.CRound'),
        '5': "PRE-IPO",
        '6': "IPO",
      },
    };
  },
  created() {
    let details = this.$route.query;
    // projectId=1576493020&signStatus=0&signId=0
    this.$loading();
    if(details.signStatus && details.signId){
      this.$global
        .goods_deatails(
          `${this.$baseurl}/bsl_web/project/getProjectDetails`,
          "get",
          {
            projectId:details.projectId,
            signStatus:details.signStatus,
            signId:details || -1
          },
          this.details_lists,
          this.nav_lists,
          {},
          {}
        )
        .then(res => {
          console.log(res);
          console.log(this.nav_lists)
          this.title = res.title;
          this.$toast.clear();
        });
    }else{
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/connected/getConnectedDetails`,
      {
        projectId:details.projectId,
      }
     ).then(
        res=>{
          let res_obj=res.data.data[0];
          this.title=res_obj.projectName;
          for (let i in res_obj) {
            if (this.details_lists.hasOwnProperty(i)) {
              if (i == "projectStatus") {
                this.details_lists[i].response =this.project_status[res_obj[i]] ;
              }
              else {
                this.details_lists[i].response = res_obj[i];
              }
            }
            if (this.nav_lists.hasOwnProperty(i)) {
              if (i == "financingStage") {
                this.nav_lists[i].response =this.financingStage[res_obj[i]] ;
              }
              else {
                this.nav_lists[i].response = res_obj[i];
              }
            }
            if(this.details_lists.collectMoney.hasOwnProperty(i)){
                if (i == "collectMoneyMax"){
                this.details_lists.collectMoney[i]=res_obj[i].toLocaleString();
              }else if (i == "collectMoneyMin"){
                this.details_lists.collectMoney[i]=res_obj[i].toLocaleString();
              }
            }
          }
            this.$toast.clear();
        }
      )
    }


  }
};
</script>
<style lang="scss">
#p_goods_details {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      // line-height: 1rem;
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
#p_goods_details {
  width: 100%;
  height: 100%;
  main {
    padding: 1.6rem 0 1.3rem 0;
    background: #ffffff;
    article {
      header {
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
  }
}
</style>

