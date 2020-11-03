<template>
  <div id="recommandHistory">
    <commonnav>
      recommand
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
      <header>
        <div v-html="$t('agent.Whorecommendme')">
          Who
          <br />recommend
          <br />me
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
                <i class="icon iconRight iconfont icon-5day"></i>
                <span>Time</span>
              </th>
              <th>
                <i class="icon iconRight iconfont icon-project"></i>
                <span>Project</span>
              </th>
              <th>
                <i class="icon iconRight iconfont icon-account"></i>
                <span>
                  Recommended
                  middleman
                </span>
              </th>
            </tr>
            <tr @click="$routerto('projectDetail')" v-for="(item,idx) in content" :key="idx">
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
      loaded: false,
      refreshing: false,
      content: []
    };
  },
  computed: {},
  created() {
    this.load();
  },
  mounted() {
    // this.boxHeight = this.$refs.box.clientHeight;
    // this.articleHight = this.$refs.box.clientHeight * 2;
  },
  methods: {
    load(done) {
      this.content = [];
      setTimeout(() => {
        this.content = [
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
        ];
        this.loaded = true;
        if (done) done();
      }, 1000);
    },
    onRefresh(done) {
      this.loaded = false;
      this.load(done);
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    onInfinitePort(done) {
      // this.getcountrylist();
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: this.searchkey
          }
        )
        .then(res => {
          if (res.data.data instanceof Array) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.countrylist.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                lable:
                  this.$i18n.locale === "zh_CN"
                    ? res.data.data[i].countryZhname
                    : res.data.data[i].countryEnname,
                value: i,
                remark: res.data.data[i].countryCode
              });
            }
            done();
          }
        });
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
  height: 100%;
  main {
    //   background: #fff;
    height: 100%;
    .yo-scroll {
      top: vw(348);
      bottom: vw(114);
    }
    .top {
      top: vw(332);
    }
    padding: vw(140) 0 vw(116);
    position: relative;
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
        position: relative;
        td {
          padding: vw(60) 0;
          line-height: vw(30);
          font-size: vw(26);
        }
        .tr-first {
          // display: flex;
          th:nth-of-type(1) {
            width: vw(220);
          }
          th:nth-of-type(2) {
            width: vw(220);
          }
          th:nth-of-type(3) {
            // width: vw(260);
          }

          th:nth-of-type(3) {
            display: flex;
            align-items: center;
            // display: table-cell;
            // vertical-align: middle;
            i {
              // display: inline-block;
              // height: vw(36);
              // width: vw(36);

              // background: #4f3dad;
            }
          }
        }
      }
    }
  }
}
</style>

