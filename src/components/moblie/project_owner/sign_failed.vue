<template>
  <div id="p_sign_failed">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />等待中间人输入
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <ul>
          <li v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">{{item.response}}</p>
          </li>
        </ul>
        <footer>
          <aside>
            <button @click="$routerto('p_check_contract')">查看合约</button>
            <!-- <button @click="gg">合约</button> -->
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_sign_failed",
  data() {
    return {
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
          keyword: "committedCount",
          name: "已提交</br>投资者数量",
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
  created() {
    let details = this.$route.query;
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${details.projectId}&signStatus=${details.signStatus}&signId=${details.signId}`
    }).then(res => {
      for (var i in res.data.data) {
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
      }
      console.log(this.details_lists);
    });
  },
  methods: {
    gg() {
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
#p_sign_failed {
  .van-checkbox__icon {
    //   line-height:0.625rem;
    font-size: 0.2rem;
  }
  .van-hairline--top-bottom::after {
    border: 0.01rem solid #8e8e8e;
  }
  .van-cell {
    padding: 0;
    .van-field__control {
      background: #f2f2f2;
      font-size: 0.3rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
    }
  }
  nav {
    position: relative;
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
#p_sign_failed {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-size: 0.38rem;
    background: white;
    border-bottom: 0.02rem dashed #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    background: #ffffff;

    article {
      margin: 0 0 1rem 0;
      header {
        height: 1.5rem;
        font-size: 0.38rem;
        color: #0f6ebe;
        text-align: center;
        font-weight: 600;
        line-height: 1.5rem;
        //  border-bottom: 0.1rem solid #f2f2f2;
      }
      div.nav_lists {
        display: flex;
        border-top: 0.2rem solid #f2f2f2;
        border-bottom: 0.2rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2rem;
          font-size: 0.3rem;
          display: flex;
          align-items: center;
          section.box {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            text-align: center;
            height: 1.5rem;
            //  padding: 0.1rem;
            border-right: 0.08rem solid #f2f2f2;
            flex-direction: column;
            justify-content: space-between;
            span.rowb {
              font-size: 0.38rem;
              color: #0f6ebe;
            }
          }
        }
        p:nth-last-child(1) {
          section.box {
            border-right: 0;
          }
        }
      }
      ul {
        padding: 0.5rem 0.5rem 2rem 0.5rem;
        li {
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4rem;
            margin-bottom: 0.2rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
        // .contract {
        //   display: block;
        //   section {
        //     width: 6.5rem;
        //     height: 9rem;
        //     border: 0.01rem solid #b3b3b3;
        //     padding: 0;
        //     background: #f2f2f2;
        //     .draft1_middle {
        //       padding: 0.3rem;
        //       box-sizing: border-box;
        //       width: 100%;
        //       line-height: 0.5rem;
        //       height: 100%;
        //       overflow-y: auto;
        //           color: #787878;
        //     }
        //   }
        // }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        button {
          width:9.9rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>