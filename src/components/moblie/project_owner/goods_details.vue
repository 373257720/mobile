<template>
  <div id="p_goods_details">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <article>
        <header>{{title}}</header>
         <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <!-- <footer>
          <button @click="$goto('p_investor_lists')">投资者资料</button>
        </footer> -->
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_goods_details",
  data() {
    return {
      title: "",
      dad_text: "项目详情",
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
          name: "已接受<br>投资者数量",
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
        // projectStatus: {
        //   name: "项目状态:",
        //   response: ""
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
        }
      },
      // ：0初步接洽；1在物色投資者；2已完成部份融；3完成融資
      project_status:{
        '0':'初步接洽',
        '1':'在物色投資者',
        '2':'已完成部份融资',
        '3':'完成融資'
      },
      financingStage: {
        '0': '种子轮',
        '1': "天使轮",
        '2': "A轮",
        '3': "B轮",
        '4': "C轮",
        '5': "PRE-IPO",
        '6': "IPO",
      },
    };
  },
  created() {
    let details = this.$route.query;
    // projectId=1576493020&signStatus=0&signId=0
    // this.$loading();
    if(details.signStatus && details.signId){
      this.$global.goods_deatails(`${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${details.projectId
      }&signStatus=${details.signStatus}&signId=${
            details.signId ? details.signId : -1
          }`,
          "get",
          {},
          this.details_lists,
          this.nav_lists,
          []
        )
        .then(res => {
          console.log(res);
          console.log(this.nav_lists)
          this.title = res.title;
          this.$toast.clear();
        });
    }else{
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/connected/getConnectedDetails?projectId=${details.projectId}`).then(
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

  main {
    // margin-top: 1.5rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      margin: 1.6rem 0 1.3rem 0;
      header {
        min-height: 2rem;
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
      ul {
        padding: 0.5rem 0.54rem 0 0.54rem;
        li {
          margin-bottom: 0.4rem;
          display: flex;
          align-items: baseline;
          font-size: 0.34rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
        li.uploadblock {
          img {
            width: 0.6rem;
            vertical-align: middle;
            height: 0.6rem;
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        button {
          width: 9.88rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>

