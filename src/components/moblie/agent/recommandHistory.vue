<template>
  <div id="recommandHistory">
    <commonnav>Recommend</commonnav>
    <main>
      <header>
        <div v-html="$t('agent.Whorecommendme')">
          <!-- Who
          <br />recommend
          <br />me-->
        </div>
        <div>
          My
          <br />recommended
          <br />middleman
        </div>
        <div>
          My
          <br />recommended
          <br />investors
        </div>
      </header>
      <v-scroll
        class="recommandHistory"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
      >
        <article>
          <table class="title">
            <tr class="tr-first">
              <th>
                <i></i>
                <span>Time</span>
              </th>
              <th>
                <i></i>
                <span>Project</span>
              </th>
              <th>
                <i></i>
                <span>
                  Recommended
                  middleman
                </span>
              </th>
            </tr>
            <tr v-for="(item,idx) in content" :key="idx">
              <td valign="top">{{item.time}}</td>
              <td valign="top">{{item.content}}</td>
              <td valign="top">{{item.name}}</td>
            </tr>
          </table>
        </article>
      </v-scroll>
    </main>
  </div>
</template>
<script>
import Scroll from "../loadmore";
export default {
  name: "mhome",
  components: {
    "v-scroll": Scroll
  },
  data() {
    return {
      isshowTag: false,
      loaded: false,
      content: [
        {
          time: "2020-06-07",
          content: "CDC Biodiversité – Biodiversity Offsetting(success)",
          name: "Jason Chan"
        },
        {
          time: "2020-06-07",
          content: "CDC Biodiversité – Biodiversity Offsetting(success)",
          name: "Jason Chan"
        },
        {
          time: "2020-06-07",
          content: "CDC Biodiversité – Biodiversity Offsetting(success)",
          name: "Jason Chan"
        },
        {
          time: "2020-06-07",
          content: "CDC Biodiversité – Biodiversity Offsetting(success)",
          name: "Jason Chan"
        },
        {
          time: "2020-06-07",
          content: "CDC Biodiversité – Biodiversity Offsetting(success)",
          name: "Jason Chan"
        },
        {
          time: "2020-06-07",
          content: "CDC Biodiversité – Biodiversity Offsetting(success)",
          name: "Jason Chan"
        }
      ]
    };
  },
  computed: {
    rotate1() {
      if (this.articleHight > this.boxHeight * 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {},
  mounted() {
    // this.boxHeight = this.$refs.box.clientHeight;
    // this.articleHight = this.$refs.box.clientHeight * 2;
  },
  methods: {
        fetchData() {
        // this.axios.get('/api/testData').then((response) => {
        //   this.listdata = response.data.data.list;
        //   // 获取总页数
        //   this.pageEnd = response.data.data.totalPage;
        //   // 还原
        //   this.pageStart = 0;
        // })
      },
    onRefresh(done) {
      this.fetchData();
      done(); // call don
    },
    onInfinite(done) {
      this.pageStart++;
      // 加载条
      let more = this.$el.querySelector(".load-more");
      // 判断是否显示加载条
      if (this.pageStart > this.pageEnd) {
        //走完数据调用方法
        this.scrollData.noFlag = true;
      } else {
        let _this = this;
        // this.axios.get("/api/testData").then(response => {
        //   _this.listdata = _this.listdata.concat(response.data.data.list);
        //   // 获取总页数
        //   _this.pageEnd = response.data.data.totalPage;
        // });
      }
      // 隐藏加载条
      more.style.display = "none";
      done();
    },

    dropdown() {
      if (this.articleHight > this.$refs.box.clientHeight * 2) {
        this.articleHight = this.$refs.box.clientHeight * 2;
      } else {
        this.articleHight = this.$refs.article.clientHeight;
      }
    },
    toggle() {
      // console.log(index);
      // this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss">
#recommandHistory {
  .van-checkbox-group {
    // height: vw(700);
    overflow: hidden;
    transition: all 2s ease-out;
    // height: vw(300);
    // overflow-y: auto;
    .van-checkbox__icon .van-icon {
      width: vw(62);
      height: vw(62);
      line-height: vw(62);
      font-size: vw(40);
      border-color: #00f0ab;
    }
    .van-cell__title {
      color: #4f3dad;
      font-size: vw(30);
    }
    .van-cell {
      padding: 0;
      padding-bottom: vw(60);
      // padding-left: 0;
      // padding-right: 0;
    }
    .van-cell::after {
      border-bottom: none;
    }
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border-width: 0;
    }
  }
}
</style>
<style lang="scss"  scoped>
#recommandHistory {
  main {
    //   background: #fff;
    .yo-scroll {
      top: vw(300);
    }
    .top {
      top: vw(332);
    }
    padding: vw(200) 0 vw(116);
    header {
      padding: 0 vw(30);
      display: flex;
      //   margin-bottom: vw(76);
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        border: vw(2) solid #3ab5cc;
        width: vw(216);
        height: vw(132);
        // background: #3ab5cc;
        color: #3ab5cc;
        border-radius: vw(30);
        text-align: center;
        font-size: vw(26);
        font-weight: bold;
        line-height: vw(30);
        // color: #ffffff;
        opacity: 1;
      }
    }
    article {
      table {
        font-size: vw(26);
        line-height: vw(34);
        text-align: center;
        color: #4f3dad;
        font-weight: bold;
        td {
          padding: vw(60) 0;
          line-height: vw(30);
          font-size: vw(26);
        }
        .tr-first {
          th:nth-of-type(1) {
            width: vw(216);
          }
          th:nth-of-type(2) {
            // width: vw(216);
            width: vw(220);
          }
          th:nth-of-type(3) {
            width: vw(260);
          }
          th {
            // display: flex;
            i {
              display: inline-block;
              height: vw(36);
              width: vw(36);
              background: #4f3dad;
            }
          }
        }
      }
    }
  }
}
</style>

