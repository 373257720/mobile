<template>
  <div id="p_goods_details">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <!-- <aside>
        <img src="../../assets/26566ffb301dac8c24d21969b538612.png" alt />
      </aside>-->
      <article>
        <header>{{title}}</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <ul>
          <li v-for="(item) in details_lists" :key="item.keyword">
            <p class="row1">{{item.name}}</p>
            <p class="row2" v-if="item.keyword!='projectDescribe'">{{item.response}}</p>
            <p class="row2" v-if="item.keyword=='projectDescribe'" v-html="item.response"></p>
          </li>
          <!-- <li class="uploadblock">
            <p class="row1">HASH序列号:</p>
            <p class="row2" v-if="hash_id">
              {{hash_id}}
              <i @click="share(hash_id)">
                <img src="../../../../static/pic/0ae32d519e5102a03ca5028b0b9e244.png" alt />
              </i>
            </p>
          </li> -->
        </ul>
    
        <footer>
          <!-- <button @click="$goto('p_investor_lists')">投资者资料</button> -->
        </footer>
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
      show: false,
      hash_id: "",
      title: "",
      dad_text: "项目详情",
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
        // {
        //   keyword: "signStatus",
        //   name: "项目状态:",
        //   response: ""
        // },
        {
          keyword: "signStatu",
          name: "项目状态:",
          response: "暂无"
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
    this.$loading();
    this.$global
      .goods_deatails(
        `${
          this.$baseurl
        }/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${
          details.projectId
        }&signStatus=${details.signStatus}&signId=${
          details.signId ? details.signId : -1
        }`,
        "get"
      )
      .then(res => {
        // console.log(res);
        this.nav_lists = [...res.nav_lists];
        console.log(this.nav_lists);

        this.details_lists = [...res.details_lists];
        this.title = res.title;
        this.$toast.clear();
      });
    // this.$loading();
    // let details = this.$route.query;
    console.log(details);

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
      this.hash_id = res.data.data.signAgreementKey;
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
      this.$toast.clear();
    });
  },
  methods: {
 
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
    .van-dialog__header{
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
      margin-top:0.2rem;  
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
        height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.7rem;
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

