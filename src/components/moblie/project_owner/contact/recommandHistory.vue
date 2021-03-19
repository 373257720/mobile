<template>
  <div id="recommandHistory">
    <commonnav>
      recommand
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
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
            >
              中间人推荐<br />中间人
            </div>
            <div
              @click="pick(2)"
              :class="[isActive == 2 ? 'active' : 'positive']"
            >
              中间人推荐<br />投资人
            </div>
          </div>
        </header>
        <article>
          <van-collapse v-model="activeNames">
            <van-collapse-item
              v-for="(value, key) in signList"
              :key="key"
              :name="key"
            >
              <template #title>
                <div>{{ value[0]["projectName"] }}</div>
              </template>
              <ul>
                <li v-for="(i, idx) in value" :key="idx">
                  <section
                    class="container"
                    :class="{ isDenied: failedArr.includes(i.signStatus4) }"
                  >
                    <div class="item item-1">
                      <p class="icon iconRight iconfont icon-day"></p>
                    </div>
                    <div class="item item-2">
                      <p v-if="i.signTime4">
                        {{ $global.timestampToTime(i.signTime4) }}
                      </p>
                    </div>
                    <div v-if="isActive == 1" class="item item-3">
                      <p class="icon iconRight iconfont icon-bitbroicon6"></p>
                    </div>
                    <div v-if="isActive == 1" class="item item-4">
                      <p>
                        {{
                          $global.sharingMechanismType[i.sharingMechanismType]
                        }}
                      </p>
                    </div>
                    <div v-if="isActive == 1" class="item item-3">
                      <p class="icon iconRight iconfont icon-bitbroicon6"></p>
                    </div>
                    <div v-if="isActive == 1" class="item item-4">
                      <p v-if="i.sharingMechanism || i.sharingMechanism === 0">
                        {{ i.sharingMechanism }} <span>%</span>
                      </p>
                    </div>
                    <div class="item item-5">
                      <p class="icon iconRight iconfont icon-account"></p>
                    </div>
                    <div class="item item-6">
                      <p v-if="i.userName">
                        {{ i.userName }}
                      </p>
                    </div>
                    <div v-if="isActive == 1" class="item item-7">
                      <p class="icon iconRight iconfont icon-account"></p>
                    </div>
                    <div v-if="isActive == 1" class="item item-8">
                      <p>
                        {{ i.userName4 }}
                      </p>
                    </div>
                    <div v-if="isActive == 2" class="item item-7">
                      <p class="icon iconRight iconfont icon-account"></p>
                    </div>
                    <div v-if="isActive == 2" class="item item-8">
                      <p>
                        {{ i.userName3 }}
                      </p>
                    </div>
                  </section>
                </li>
              </ul>
              <ul v-if="!value.length">
                <li>没有数据</li>
              </ul>
            </van-collapse-item>
          </van-collapse>
          <!-- <ul>
            <li v-for="(value, key) in signList" :key="key">
              <div v-for="(item, idx) in value" :key="idx">
                <p>{{ item.signTime4 }}</p>
                <p>{{ item.projectName }}</p>
                <p>{{ item.sharingMechanism }}</p>
                <p>{{ item.userName }}</p>
                <p>{{ item.userName4 }}</p>
              </div>
            </li>
          </ul> -->
        </article>
      </v-scroll>
    </main>
  </div>
</template>
<script>
import Scroll from "../../loadmore";
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
      signList: {},
      source: null,
      failedArr: [14, 17, 20, 22, 32, 37, 39, 55],
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
    cancelAxios() {
      this.source.cancel("interrupt");
    },
    pick(num) {
      this.isActive = num;
      this.cancelAxios();
      this.load();
    },
    load(done) {
      this.loaded = false;
      this.signList = {};
      let self = this,
        RequestUrl;
      this.source = this.$axios.CancelToken.source();
      if (self.isActive == 1) {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectRecommendation/iBackGetMiddlemanABRHistory`;
      } else if (self.isActive == 2) {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectRecommendation/iBackGetMiddlemanInvestorRHistory`;
      }
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
                    signStatus4: item.signStatus4,
                    userName:
                      item.userIdentityType == 1
                        ? item.userName
                        : item["userCompany" + self.$global.language()],
                    userName4:
                      item.userIdentityType4 == 1
                        ? item.userName4
                        : item["userCompany" + self.$global.language() + "4"],
                    userName3:
                      item.userIdentityType3 == 1
                        ? item.userName3
                        : item["userCompany" + self.$global.language() + "3"],
                  };
                });
              }
            }
            for (let key in signList) {
              signList[key] = this.$global.quickSort(
                signList[key],
                "signTime4",
                "descending"
              );
            }
            this.signList = signList;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onRefresh(done) {
      this.Refreshing = true;
      this.cancelAxios();
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
#recommandHistory {
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
#recommandHistory {
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
      .container {
        display: grid;
        color: #4f3dad;
        grid-row: 3;
        padding: vw(54);
        // margin-bottom: vw(100);
        grid-gap: vw(28) vw(30);
        grid-template-columns: vw(30) auto;
        grid-template-rows: repeat(auto);
        grid-column: 2;
        grid-auto-flow: row;
        font-size: vw(24);
        word-wrap: break-word;
        word-break: break-all;
        font-weight: bold;
        align-items: start;
        line-height: vw(28);
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
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
        }
      }
      .isDenied {
        color: #757575;
      }
    }
  }
}
</style>

