<template>
  <div id="i_conected_project">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />已连接项目
    </nav>
    <main>
      <article>
        <header>{{title}}</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2" v-if="item.keyword=='projectDescribe'" v-html="item.response"></p>
            <p class="row2" v-if="item.keyword!='projectDescribe'">{{item.response}}</p>
          </li>
        </ul>
        <footer>
          <aside>
            <button @click="$routerto('i_inverstor_infor',{investorsId:investorsId})">投资者资料</button>
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
  name: "i_conected_project",
  data() {
    return {
      investorsId: "",
      title: "",
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
      url: `${
        this.$baseurl
      }/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${
        details.projectId
      }&signStatus=${details.signStatus}&signId=${
        details.signId ? details.signId : -1
      }`
    }).then(res => {
      this.investorsId = res.data.data.investorsId;
      this.title = res.data.data.projectName;
      for (var i in res.data.data) {
        for (var j = 0; j < this.details_lists.length; j++) {
          if (this.details_lists[j].keyword == i) {
            if (this.details_lists[j].keyword == "signStatus") {
              this.details_lists[j].response = this.$global.pic_obj[
                res.data.data[i]
              ];
            } else if (this.details_lists[j].keyword == "publicCompany") {
              this.details_lists[j].response =
                res.data.data[i] == false ? "否" : "是";
            } else {
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
      }
      console.log(this.details_lists);
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
#i_conected_project {
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
#i_conected_project {
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

    article {
      margin: 0 0 1rem 0;
      header {
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
      ul {
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.38rem;
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
        .contract {
          display: block;
          section {
            width: 6.5rem;
            height: 8rem;
            border: 0.01rem solid #b3b3b3;
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
        button {
          width: 9.9rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>