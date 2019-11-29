<template>
  <div id="common_details">
    <main>
      <!-- <div class="common_details">
        <h2>{{title}}</h2>
        <header>投资者资料</header>
        <ul>
          <li i v-for="(item) in investor_infor" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">{{item.response}}</p>
          </li>
        </ul>
      </div>-->
      <article>
        <!-- <header>项目详情</header>
            <div class="nav_lists">
          <p v-for="(item) in nav_lists" :key="item.name">
            <section class="box">
               <span class="1row" v-html="item.name"></span>
              <span class="rowb" >{{item.response}}</span>
            </section>   
          </p>
        </div>-->
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2" v-if="item.keyword=='projectDescribe'" v-html="item.response"></p>
            <p class="row2" v-if="item.keyword!='projectDescribe'">{{item.response}}</p>
          </li>
        </ul>
        <!-- <footer>
          <aside>
            <p>(合约同步到IPFS需要时间，如不能打开请稍后再试)</p>
            <button @click="check_contract">查看合约</button>
          </aside>
        </footer> -->
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  props: ["toson"],
  data() {
    return {
      show: false,
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
        { keyword: "projectDescribe", name: "项目简介:", response: "" }
      ]
    };
  },
  created() {
    // console.log(this.$route.query.signId);
    this.$loading();
    for (let i = 0; i < this.toson.length; i++) {
      for (let j = 0; j < this.details_lists.length; j++) {
        if (this.details_lists[j].keyword == this.toson[i].keyword) {
          this.details_lists[j].response = this.toson[i].response;

        }
      }
    }
    this.$toast.clear();
    // console.log(this.details_lists); 
  },
  methods: {
    //   cancel() {
    //   this.show2 = false;
    // },
    daship() {
      var newWindow = window.open();
      newWindow.location.href = "http://www.wearetechman.com:5001/webui";
      // tempwindow.location=hash_id;
    },
    // 点击事件
    share(val) {
      console.log(val);
      this.message = val;
      this.$copyText(this.message).then(
        e => {
          this.show = true;
        },
        function(e) {
          // alert("Can not copy");
          console.log(e);
        }
      );
    },
  
  }
};
</script>
<style lang="scss">
#common_details {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      // position: absolute;
      // left: 0.6rem;
      // top: 50%;
      // transform: (translate(0, -50%));
    }
  }

  .van-dialog {
    font-size: 0.38rem;
  }
  .van-cell {
    // font-size: 0.3rem;
    // background: #f2f2f2;
    // // padding: 0;
    // padding: 0.2rem 0.3rem;
    // margin: 0 0 0.5rem;
    // border: 1px solid #b5b5b5;
  }
}
</style>
<style lang="scss" scoped>
#common_details {
  width: 100%;

  main {
    background: #ffffff;

    article {
      // margin: 0 0 1.3rem 0;
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
      }
     
    }
  }
}
</style>