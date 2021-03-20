<template>
  <div id="a_recommandHistory">
    <commonnav> recommand </commonnav>
    <main>
      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
      >
        <header slot="navv">
          <!-- <div v-html="$t('agent.Whorecommendme')"></div> -->
          <div class="boxes">
            <div
              @click="pick(1)"
              :class="[isActive == 1 ? 'active' : 'positive']"
              v-html="$t('agent.Whorecommendme')"
            ></div>
            <div
              @click="pick(2)"
              :class="[isActive == 2 ? 'active' : 'positive']"
              v-html="$t('agent.MyrecommendedMiddleman')"
            ></div>
            <div
              @click="pick(3)"
              :class="[isActive == 3 ? 'active' : 'positive']"
              v-html="$t('agent.MyrecommendedInvestors')"
            ></div>
          </div>
        </header>
        <article>
          <ul v-if="isActive == 1">
            <li>
              <section class="container container-title">
                <div class="item">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-day"></span>
                    <span>Time</span>
                  </p>
                </div>
                <div class="item item-8">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-project"></span>
                    <span>Project</span>
                  </p>
                </div>
                <div class="item item-6">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-account"></span>
                    <span>谁推荐我</span>
                  </p>
                </div>
              </section>
            </li>
            <li v-for="(item, idx) in result.listResultM" :key="idx">
              <section
                class="container container-content"
                :class="[
                  [32, 37, 39].includes(item.signStatus4) === true
                    ? 'positive'
                    : '',
                ]"
              >
                <div class="item item-2">
                  <p>
                    {{ $global.stamptodate(item.signTime4) }}
                  </p>
                </div>
                <div class="item item-8">
                  <p>
                    {{ item.projectName }}
                  </p>
                </div>
                <div class="item item-6">
                  <p>
                    {{ item.userName }}
                  </p>
                </div>
              </section>
              <aside>
                <div v-if="item.agreementKey">
                  <p class="Recordonblockchain">
                    {{ $t("agent.Recordonblockchain") }}
                  </p>
                  <p class="Hash">
                    <span
                      >{{ $t("agent.Hash") }}:{{
                        item.agreementKey.slice(0, 5) +
                        "..." +
                        item.agreementKey.slice(-5)
                      }}</span
                    >
                  </p>
                  <!-- item.agreementKey.length > 20
                      ? item.agreementKey.slice(0, 20) + "..."
                      : item.agreementKey -->
                </div>
              </aside>
            </li>
          </ul>
          <ul v-if="isActive == 2">
            <li>
              <section class="container container-title">
                <div class="item">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-day"></span>
                    <span>Time</span>
                  </p>
                </div>
                <div class="item item-8">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-project"></span>
                    <span>Project</span>
                  </p>
                </div>
                <div class="item item-6">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-account"></span>
                    <span>我推荐的中间人</span>
                  </p>
                </div>
              </section>
            </li>
            <li v-for="(item, idx) in result.listResult" :key="idx">
              <section
                class="container container-content"
                :class="[
                  [14, 17, 20, 22].includes(item.signStatus4) === true
                    ? 'positive'
                    : '',
                ]"
              >
                <!-- <div class="item item-1">
                  <p class="icon iconRight iconfont icon-day"></p>
                </div> -->
                <div class="item item-2">
                  <p>
                    {{ $global.stamptodate(item.signTime4) }}
                  </p>
                </div>
                <!-- <div class="item item-7">
                  <p class="icon iconRight iconfont icon-account"></p>
                </div> -->
                <div class="item item-8">
                  <p>
                    {{ item.projectName }}
                  </p>
                </div>
                <!-- <div class="item item-5">
                  <p class="icon iconRight iconfont icon-account"></p>
                </div> -->
                <div class="item item-6">
                  <p>
                    {{ item.userName }}
                  </p>
                </div>
              </section>
              <aside>
                <div v-if="item.agreementKey">
                  <p class="Recordonblockchain">
                    {{ $t("agent.Recordonblockchain") }}
                  </p>
                  <p class="Hash">
                    <span
                      >{{ $t("agent.Hash") }}:{{
                        item.agreementKey.slice(0, 5) +
                        "..." +
                        item.agreementKey.slice(-5)
                      }}</span
                    >
                  </p>
                  <!-- {{
                    item.agreementKey.length > 20
                      ? item.agreementKey.slice(0, 20) + "..."
                      : item.agreementKey
                  }} -->
                </div>
              </aside>
            </li>
          </ul>
          <ul v-if="isActive == 3">
            <li>
              <section class="container container-title">
                <div class="item">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-day"></span>
                    <span>Time</span>
                  </p>
                </div>
                <div class="item item-8">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-project"></span>
                    <span>Project</span>
                  </p>
                </div>
                <div class="item item-6">
                  <p class="title">
                    <span class="icon iconRight iconfont icon-account"></span>
                    <span>我推荐的投资人</span>
                  </p>
                </div>
              </section>
            </li>
            <li v-for="(item, idx) in result.listResultI" :key="idx">
              <section
                class="container container-content"
                :class="[
                  item.signStatus4 === 25 ? 'active' : '',
                  [54].includes(item.signStatus4) === true ? 'positive' : '',
                ]"
              >
                <div class="item item-2">
                  <p>
                    {{ $global.stamptodate(item.signTime4) }}
                  </p>
                </div>
                <div class="item item-8">
                  <p>
                    {{ item.projectName }}
                  </p>
                </div>
                <div class="item item-6">
                  <p>
                    {{ item.userName }}
                  </p>
                </div>
              </section>
            </li>
          </ul>
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
    "v-scroll": Scroll,
  },
  data() {
    return {
      activeNames: [],
      isActive: 1,
      loaded: false,
      content: [],
      result: {},
    };
  },
  computed: {},
  created() {
    this.middlemanGetRecommendationHistory();
  },
  mounted() {
    // this.boxHeight = this.$refs.box.clientHeight;
    // this.articleHight = this.$refs.box.clientHeight * 2;
  },
  methods: {
    pick(num) {
      this.isActive = num;
      // this.load();
    },

    middlemanGetRecommendationHistory(done) {
      this.loaded = false;
      this.result = {};
      let self = this;
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectRecommendation/middlemanGetRecommendationHistory`
        )
        .then((res) => {
          self.loaded = true;
          if (done) {
            done();
          }
          if (res.data.resultCode == 10000) {
            console.log(res);
            let result = res.data.data;
            for (let key in result) {
              if (result[key].length) {
                result[key] = result[key].map((item) => {
                  if (key == "listResult") {
                    // 我推荐的中间人
                    if ([14, 17, 20, 22, 25].includes(item.signStatus4)) {
                      return {
                        signTime4: item.signTime4,
                        projectName: item["projectName" + self.$global.lan()],
                        userName:
                          item.userIdentityType4 == 1
                            ? item.userName4
                            : item[
                                "userCompany" + self.$global.language() + "4"
                              ],
                        signStatus4: item.signStatus4,
                        agreementKey: item.agreementKey || "",
                      };
                    }
                  } else if (key == "listResultI") {
                    //我推荐的投资人
                    if ([54, 55].includes(item.signStatus4)) {
                      return {
                        signTime4: item.signTime4,
                        projectName: item["projectName" + self.$global.lan()],
                        userName:
                          item.userIdentityType3 == 1
                            ? item.userName3
                            : item[
                                "userCompany" + self.$global.language() + "3"
                              ],
                        signStatus4: item.signStatus4,
                        // agreementKey:item.agreementKey || "",
                      };
                    }
                  } else if (key == "listResultM") {
                    //谁推荐我
                    // 17、32、37、39是拒绝；41是成功
                    // if ([17, 32, 37, 39, 41].includes(item.signStatus4)) {
                    return {
                      signTime4: item.signTime4,
                      projectName: item["projectName" + self.$global.lan()],
                      userName:
                        item.userIdentityType == 1
                          ? item.userName
                          : item["userCompany" + self.$global.language()],
                      signStatus4: item.signStatus4,
                      agreementKey: item.agreementKey || "",
                    };
                    // }
                  }
                });
              }
            }
            for (let key in result) {
              result[key] = this.$global.quickSort(
                result[key],
                "signTime4",
                "descending"
              );
            }
            this.result = result;
            console.log(this.result);
          }
        });
    },
    load(done) {
      this.loaded = false;
      this.signList = {};
      let self = this,
        RequestUrl;
      this.source = this.$axios.CancelToken.source();
      // if (self.isActive == 1) {
      //   RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectRecommendation/iBackGetMiddlemanABRHistory`;
      // } else if (self.isActive == 2) {
      //   RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectRecommendation/iBackGetMiddlemanInvestorRHistory`;
      // }

      this.$global
        .post_encapsulation(
          RequestUrl,
          {},
          {
            cancelToken: this.source.token,
          }
        )
        .then((res) => {
          self.loaded = true;
          if (done) {
            done();
          }
          if (res.data.resultCode == 10000) {
            let signList = res.data.data.signList;
            for (let key in signList) {
              if (signList[key].length) {
                signList[key] = signList[key].map((item) => {
                  return {
                    signTime4: item.signTime4,
                    sharingMechanismType: item.sharingMechanismType,
                    projectName: item["projectName" + self.$global.lan()],
                    sharingMechanism: item.sharingMechanism,
                    userName:
                      item.userIdentityType == 1
                        ? item.userName
                        : item["userCompany" + self.$global.language()],
                    userName4:
                      item.userIdentityType4 == 1
                        ? item.userName4
                        : item["userCompany" + self.$global.language() + "4"],
                  };
                });
              }
            }
            this.signList = signList;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onRefresh(done) {
      // this.Refreshing = true;
      this.middlemanGetRecommendationHistory(done);
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
            searchKey: this.searchkey,
          }
        )
        .then((res) => {
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
                remark: res.data.data[i].countryCode,
              });
            }
            done();
          }
        });
    },
  },
};
</script>
<style lang="scss">
#a_recommandHistory {
  .van-cell__title {
    color: #4f3dad;
  }
  .van-collapse-item__content {
    padding: 0;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }
  .van-cell__right-icon {
    color: #4f3dad;
  }
  .van-cell::after {
    border-bottom: vw(2) solid #4f3dad;
  }
  .van-collapse-item--border::after {
    border-top: vw(2) solid #4f3dad;
  }
  .yo-scroll .inner {
    position: relative;
    z-index: 8;
  }
}
</style>
<style lang="scss"  scoped>
#a_recommandHistory {
  // height: 100%;
  main {
    //   background: #fff;
    // height: 100%;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    top: 55px;
    .yo-scroll {
      top: vw(348);
      bottom: vw(114);
    }
    .top {
      top: vw(332);
    }
    // padding: vw(140) 0 vw(116);
    // position: relative;
    header {
      div.boxes {
        // padding: 0 vw(30);
        display: flex;
        justify-content: space-evenly;

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
        .active {
          background: #3ab5cc;
          color: #ffffff;
          z-index: 100;
        }
        .positive {
          color: #3ab5cc;
          background: #ffffff;
          z-index: 100;
        }
      }
    }
    article {
      padding-top: vw(92);
      // .container-content {

      // }
      li {
        margin-bottom: vw(80);
      }
      aside {
        margin-top: vw(20);
        padding: 0 vw(20);
        display: flex;
        justify-content: flex-end;
        div {
          // width: vw(300);
          height: vw(100);
          border: 2px solid #3ab5cc;
          border-radius: vw(20);
          padding: vw(10) vw(20);
          font-size: vw(12);
          line-height: vw(30);
          // word-wrap: break-word;
          // word-break: break-all;
          color: #3ab5cc;
          display: flex;
          flex-direction: column;
          justify-content: center;
          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 2;
          overflow: hidden;
          transform: rotate(-12deg);
          .Recordonblockchain {
            // margin-bottom: vw(10);
          }
        }
      }
      .container {
        position: relative;
        display: grid;
        color: #4f3dad;
        // grid-row: 3;
        padding: 0 vw(50);
        // margin-bottom: vw(100);
        // grid-gap: vw(28) vw(30);

        text-align: center;
        grid-template-columns: repeat(3, 33.33%);
        grid-template-rows: repeat(auto);
        grid-column: 1 / 3;
        grid-auto-flow: row;
        font-size: vw(24);
        word-wrap: break-word;
        word-break: break-all;
        font-weight: bold;
        align-items: start;

        line-height: vw(30);
        .item {
          height: 100%;
          p.title {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .item-1 {
          p.iconRight {
            font-size: vw(29);
          }
        }
        .item-3 {
          p.iconRight {
            font-size: vw(28);
          }
        }
        .item-5 {
          p.iconRight {
            font-size: vw(28);
            line-height: vw(28);
          }
        }
        .item-6 {
          height: 100%;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
          p.title {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .container-title {
        margin-bottom: vw(68);
      }
      .container.active {
        // color: #3ab5cc;
      }
      .container.positive {
        color: #757575;
      }
    }
  }
}
</style>

