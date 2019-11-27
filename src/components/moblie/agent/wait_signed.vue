<template>
  <div id="a_wait_signed">
    <!-- <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约请求
    </nav> -->
     <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
        <header>投资者资料</header>
        <ul>
          <li i v-for="(item) in investor_infor" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">{{item.response}}</p>
          </li>
        </ul>
      </div>
      <article>
        <header>项目详情</header>
            <div class="nav_lists">
          <p v-for="(item) in nav_lists" :key="item.name">
            <section class="box">
               <span class="1row" v-html="item.name"></span>
              <span class="rowb" >{{item.response}}</span>
            </section>
          
          </p>
        </div>
        <ul>
          <li  v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
                <p class="row2" v-if="item.keyword=='projectDescribe'" v-html="item.response"></p>
            <p class="row2" v-if="item.keyword!='projectDescribe'" >{{item.response}}</p>
          </li>
        </ul>
        <footer>
          <aside>
            <button @click="$routerto('a_check_contract',$route.query)">查看合约</button>
            <!-- <button @click="gg">拒绝签约</button> -->
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
      title:'',
      show: false,
      dad_text:'待签约项目',
         nav_lists: [
         {
          keyword: "financingStage",
          name: "融资阶段",
          response: ""
        },
        {
          keyword: "interestProjectCount",
          name: "项目方<br>有兴趣数量",
          response: ""
        },
        {
          keyword:'committedCount',
          name: "已提交</br>投资者数量",
          response: ""
        }
      ],
   investor_infor: [
        {
          keyword:'investorsType',
          name: "投资者类型:",
          response: ""
        },
        {
          keyword:'investorsCompany',
          name: "投资者公司:",
          response: ""
        },
        {
          keyword:'investorsName',
          name: "投资者姓名:",
          response: ""
        },
        {
          keyword:'investorsArea',
          name: "投资者地区:",
          response: ""
        }
      ],
      details_lists: [
           {
          keyword: "projectIndustry",
          name: "行业:",
          response: ""
        },
        {
          keyword: "projectArea",
          name: "地区:",
          response: ""
        },
        {
          keyword: "signStatus",
          name: "项目状态:",
          response: ""
        },
        { keyword: "projectCompany", name: "公司名称:", response: "" },
        { keyword: "publicCompany", name: "是否上市公司:", response: "" },
        { keyword: "collectMoney", name: "集资额:", response: "" },
        { keyword: "projectMobile", name: "联系电话:", response: "" },
        { keyword: "projectEmail", name: "电邮:", response: "" },
        { keyword: "projectDescribe", name: "项目详情:", response: "" }
       
      ]
    };
  },
    created(){
   
      
  let details = this.$route.query;
    //  console.log(details);
     this.$loading();
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${details.projectId}&signStatus=${details.signStatus}&signId=${details.signId?details.signId:-1}`
    }).then(res => {
      this.$toast.clear();
       this.title=res.data.data.projectName;
      this.$store.dispatch('contract_agentsign',JSON.parse(res.data.data.signAgreement) );
      // console.log(this.$store.state);
      
      for (var i in res.data.data) {
        // this.investorsId=res.data.data.investorsId; 
        for (var j = 0; j < this.details_lists.length; j++) {
          if (this.details_lists[j].keyword ==i){
              if (this.details_lists[j].keyword == "signStatus") {
              this.details_lists[j].response = this.$global.pic_obj[
                res.data.data[i]
              ];
            }    else if (this.details_lists[j].keyword == "publicCompany" ) {
                this.details_lists[j].response = res.data.data[i]==false?'否':'是'
                
              }else {
              this.details_lists[j].response = res.data.data[i];
            }
          }
          
        }
        for (var w = 0; w < this.nav_lists.length; w++) {
          if (this.nav_lists[w].keyword == i) {
               if (this.nav_lists[w].keyword == "financingStage") {
              this.nav_lists[w].response = this.$global.financingStage[
                res.data.data[i]
              ];
            } else {
              this.nav_lists[w].response = res.data.data[i];
            }
          }
        }
             for (var k = 0; k < this.investor_infor.length; k++) {
          if(this.investor_infor[k].keyword==i){
            if(this.investor_infor[k].keyword =='investorsType'){
                 this.investor_infor[k].response= this.$global.investorsType[res.data.data[i]] ;
                 
            }
            else{
              this.investor_infor[k].response = res.data.data[i];
            }
          }
          
        }
      }
    //  this.$route.query.from='a_wait_signed';
     this.$route.query.investorsId=res.data.data.investorsId
    //  console.log(this.$route.query);
     
    });
  },
  methods: {
    gg() {
      // console.log(this.$dialog);

      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
#a_wait_signed {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
.van-dialog {
  font-size: 0.3rem;
}
.van-dialog__message {
  font-size: 0.3rem;
}
.van-button {
  font-size: 0.3rem;
}
</style>
<style lang="scss" scoped>
#a_wait_signed {
  width: 100%;
  // nav {
  //   width: 100%;
  //   text-align: center;
  //   line-height: 1.5rem;
  //   height: 1.5rem;

  //   position: fixed;
  //   top: 0;
  //   font-size: 0.38rem;
  //   background: white;
  //   border-bottom: 0.02rem dashed #b5b5b5;
  // }
  main {
    margin-top: 1.6rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    div.investors_infor {
      h2 {
         height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        // font-size: 0.5rem;
        color: #0f6ebe;
        // text-align: center;
        font-weight: 600;
        line-height: 0.7rem;
      }
      header {
        height: 0.8rem;
        font-size: 0.38rem;
        text-align: center;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        // border-bottom: 0.01rem dashed #b5b5b5;
      }
      ul {
        padding: 0.1rem 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.28rem;
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
      margin: 0 0 1.3rem 0;
      header {
        height: 0.8rem;
        font-size: 0.38rem;
        text-align: center;
        // font-weight: 600;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        // border-bottom: 0.01rem dashed #b5b5b5;
      }
       div.nav_lists {
        display: flex;
        border-top: 0;
        border-bottom: 0.2rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2.5rem;  
          font-size: 0.3rem;
          display: flex;
          align-items:center;
         
          section.box{
            box-sizing: border-box;
              width: 100%;
              display: flex;
              text-align: center;
             height: 2rem;
            //  padding: 0.1rem;
            border-right: 0.08rem solid #f2f2f2;
            flex-direction: column;
            justify-content:space-between;
            span.rowb{
                 font-size: 0.6rem;
                  color: #0f6ebe;

            }
          }
            
        }
        p:nth-last-child(1){
            section.box{
              border-right: 0;
            }
            
          }
           
      
      }
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4rem;
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
        .contract {
          display: block;
          .row2 {
            width: 8rem;
            height: 6rem;
            border: 0.01rem solid #b3b3b3;
            // box-sizing: border-box;
            padding: 0;
            background: #f2f2f2;
            .draft1_middle {
              padding: 0.3rem;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              overflow-y: auto;
            }
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.38rem;
        aside {
          height: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          button {
            height:1rem;
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