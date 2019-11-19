<template>
  <div id="i_sign_failed">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />拒绝项目
    </nav>
     <!-- <commonnav :msg="dad_text"></commonnav> -->
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
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">{{item.response}}</p>
          </li>
        </ul>
      
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
      // show: false,
      // dad_text:'待确认项目',
      title:'',
         nav_lists: [
        {
          name: "融资阶段",
          response: "12"
        },
        {
          name: "项目方<br>有兴趣数量",
          response: "16"
        },
        {
          name: "已提交</br>投资者数量",
          response: "118"
        }
      ],
      investor_infor: [
        {
          name: "投资者类型:",
          response: "放水电费水电费"
        },
        {
          name: "投资者公司:",
          response: "发地方水电是否水电费水电费诗圣杜甫费发"
        },
        {
          name: "投资者姓名:",
          response: "发地方水电"
        },
        {
          name: "投资者地区:",
          response: "斯蒂芬发地方发地方水电发地方水电"
        }
      ],
      details_lists: [
        {
          name: "行业:",
          response: "2019-15-26"
        },
        {
          name: "地区:",
          response: "发地方水电是否水电费水电费诗圣杜甫费发"
        },
        {
          name: "公司名称:",
          response: "斯蒂芬发地方"
        },
        {
          name: "是否是上市公司:",
          response: "13178523855"
        },
        {
          name: "集资额:",
          response: "金融"
        },
        {
          name: "联络电话:",
          response: "斯蒂芬发地方"
        },
        {
          name: "电邮:",
          response: "13178523855"
        },
        {
          name: "融资阶段:",
          response: "金融"
        },
        {
          name: "项目状态:",
          response: "金融"
        },
      ]
    };
  },
    created(){
    console.log(this.$route.query);
    let que=this.$route.query;
        this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${que.projectId}&signStatus=${que.signStatus}&signId=${que.signId?que.signId:-1}`
      }).then(res => {
        this.projectName=res.data.data.projectName;
          for (var i in res.data.data) {
             this.$route.query.investorsId=res.data.data.investorsId;
        for (var j = 0; j < this.details_lists.length; j++) {
          if (this.details_lists[j].keyword == i) {
            this.details_lists[j].response = res.data.data[i];
          }
        }
        for (var w = 0; w < this.nav_lists.length; w++) {
          if (this.nav_lists[w].keyword == i) {
            this.nav_lists[w].response = res.data.data[i];
          }
        }
          for (var k = 0; k < this.investor_infor.length; k++) {
          if (this.investor_infor[k].keyword == i) {
            this.investor_infor[k].response = res.data.data[i];
          }
        }
      }
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
#i_sign_failed {
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
#i_sign_failed {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    div.investors_infor {
      h2 {
        padding: 0.2rem 0.3rem;
        font-size: 0.38rem;
        color: #0f6ebe;
        line-height: 0.5rem;
      }
      header {
        height: 0.8rem;
        font-size: 0.32rem;
        text-align: center;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        border-bottom: 0.01rem dashed #b5b5b5;
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
        font-size: 0.32rem;
        text-align: center;
        // font-weight: 600;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
       div.nav_lists {
        display: flex;
        // border-top: 0.2rem solid #f2f2f2;
        border-bottom: 0.2rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2rem;  
          font-size: 0.3rem;
          display: flex;
          align-items:center;
         
          section.box{
            box-sizing: border-box;
              width: 100%;
              display: flex;
              text-align: center;
             height: 1.5rem;
            //  padding: 0.1rem;
            border-right: 0.08rem solid #f2f2f2;
            flex-direction: column;
            justify-content:space-between;
            span.rowb{
                 font-size: 0.38rem;
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
          font-size: 0.3rem;
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

      }
          footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        aside {
          height: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          button {
            height: 0.8rem;
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