<template>
  <div id="p-contactList">
    <commonnav>
      {{ $t("common.Contacts") }}
      <!-- <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template> -->
    </commonnav>
    <main>
      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
      >
        <div slot="navv" class="searchContainer" :class="{ isFixed: isFixed }">
          <van-search
            :class="{ is_fixed: isFixed }"
            v-model="searchkey"
            :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
            shape="round"
            left-icon
          >
            <div slot="right-icon">
              <van-icon name="search" @click="search" />
            </div>
          </van-search>
          <van-button
            class="RecommandHistory"
            @click="$routerto('recommandHistory')"
            >推荐历史</van-button
          >
        </div>
        <div class="timestamp">
          <ul>
            <li
              @click="$routerto('i_inverstor_infor',{investorsId:i.investorsId})"
              v-for="i in MyProjectList"
              :key="i.id"
            >
              <div class="item">
                <p class="iconfont icon-account ScreenPicture"></p>
                <div class="item-right">
                  <div class="item-right-top">
                    <p v-if="i.userIdentityType == 1">{{ i.userName }}</p>
                    <p v-if="i.userIdentityType == 2">
                      {{ i["userCompany" + $global.language()] }}
                    </p>
                  </div>
                  <div class="item-right-bottom">
                    <aside class="iconfont icon-bitbroicon5"></aside>
                    <p>{{ i.bslEmail }}</p>
                  </div>
                </div>
                <!-- <section
                  id="container"
                >
                  <div class="item item-1">
                    <p class="icon iconRight iconfont icon-bitbroicon2"></p>
                  </div>
                  <div class="item item-2">
                    <p v-if="i.userIdentityType == 1">{{ i.userName }}</p>
                    <p v-if="i.userIdentityType == 2">
                      {{ i["userCompany" + $global.language()] }}
                    </p>
                  </div>
                  <div class="item item-3">
                    <p class="icon iconRight iconfont icon-bitbroicon5"></p>
                  </div>
                  <div class="item item-4">
                    <p>{{ i.bslEmail }}</p>
                  </div>
                </section> -->
              </div>
              <!-- <h3 v-if="i.label">{{ i.label.projectName }}</h3> -->
            </li>
          </ul>
        </div>
      </v-scroll>
    </main>
    <scroll-top></scroll-top>
  </div>
</template>
<script>
// console.log(timeout)
import Scroll from "@/components/moblie/loadmore";
import ScrollTop from "@/components/moblie/common/toTop";
export default {
  name: "p-contactList",
  components: {
    "v-scroll": Scroll,
    ScrollTop,
  },
  data() {
    return {
      activeNames: ["waitcomfirm"],
      searchkey: "",
      result: [],
      isFixed: false,
      offsetTop: 0,
      loaded: false,
      loadText: "Loading…",
      pageNum: 1,
      usertype: "",
      MyProjectList: [],
      investorList: {
        waitcomfirm: {
          name: "等待投资人确认",
          arr: [],
        },
        connected: {
          name: "已连接项目",
          arr: [],
        },
        refusal: {
          name: "已拒绝项目",
          arr: [],
        },
      },
      // 1投行（项目方），3投资者，4投资中间人
      text: "List",
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (
      to.name == "Interested" ||
      to.name == "ibankSignContractStep3" ||
      to.name == "agentsignContractStep2" ||
      to.name == "p_bargin" ||
      to.name == "A_bargin" ||
      to.name == "sign_contract" ||
      to.name == "a_recommand_i"
    ) {
      next(false);
    } else {
      next();
    }
  },
  created() {
    // console.log(this.$store.state.currentUsertype);
    this.usertype = this.$store.state.currentUsertype;
    this.getMyProjectList();
    // if (this.$store.state.currentUsertype == 3) {
    //   this.getMyProjectStatusList();
    // } else {
    //   this.getMyProjectList();
    // }
  },
  activated() {},
  computed: {},
  mounted() {
    // window.addEventListener("scroll", this.initHeight, true);
    // this.$nextTick(() => {
    //   this.offsetTop = document.querySelector(".searchContainer").clientHeight;
    //   console.log(this.offsetTop);
    // });
  },
  destroyed() {
    // window.removeEventListener("scroll", this.initHeight, true);
  },
  methods: {
    search() {
      this.getMyProjectList();
    },
    getMyProjectList(done) {
      this.loaded = false;
      let self = this;
      this.MyProjectList = [];
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectRecommendation/iBackGetContactPerson`,
          { searchKeywords: this.searchkey }
        )
        .then((res) => {
          this.loaded = true;
          if (done) done();
          this.MyProjectList = res.data.data.data;
          if (res.data.resultCode == 10000) {
            // console.log(res);
            let result = res.data.data;
            this.MyProjectList = result;
            // if (this.MyProjectList) {
            //   this.MyProjectList.forEach((item) => {
            //     let label = {
            //       projectIndustry:
            //         item.record["projectIndustry" + self.$global.lan()].indexOf(
            //           "["
            //         ) < 0
            //           ? item.record["projectIndustry" + self.$global.lan()]
            //           : eval(
            //               "(" +
            //                 item.record[
            //                   "projectIndustry" + self.$global.lan()
            //                 ] +
            //                 ")"
            //             ).join(","),
            //       projectName: item.record["projectName" + self.$global.lan()],
            //       projectCompany:
            //         item.record["projectCompany" + self.$global.lan()],
            //       projectDescribe:
            //         item.record["projectDescribe" + self.$global.lan()],
            //     };
            //     this.$set(item, "label", label);
            //   });
            // }
            // console.log(this.MyProjectList);
          }
        });
    },
    initHeight() {
      let scrollTop = document.querySelector(".loadmore").scrollTop;

      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    onRefresh(done) {
      this.loaded = false;
      this.getMyProjectList(done);
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    onInfinitePort(done) {
      this.getMyProjectList(done);
    },
  },
};
</script>

<style lang="scss">
#p-contactList {
  .yo-scroll .inner {
    position: relative;
    top: vw(-100);
    z-index: 8;
  }
  .van-cell::after {
    border-bottom: none;
  }
  .van-collapse-item__content {
    padding: 0;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }
}
</style>
<style lang="scss" scoped>
#p-contactList {
  height: 100%;
  //  overflow-y: auto;
  main {
    // height: 100%;
    // overflow-y: auto;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    top: 55px;
    .searchContainer {
      display: flex;
      //   z-index: 50;
      justify-content: space-between;
      align-items: center;
      padding: 0 vw(50);
      background: #fff;
      //   margin-bottom: vw(48);
      .RecommandHistory {
        //   width: vw(53);
        //   height: vw(53);
        //   width: vw(158);
        z-index: 666;
        height: vw(72);
        background: #00f0ab;
        opacity: 1;
        border-radius: vw(16);
        color: #fff;
      }
      .van-search {
        width: vw(420);
        background: #fff;
        padding: 0;
        z-index: 666;
        margin-left: 0;
        margin-right: vw(20);
      }
      .van-search__content {
        border: vw(2) solid #3ab5cc;
        background: #fff;
        .van-icon-search,
        .van-icon-clear {
          color: #3ab5cc;
        }
      }
    }
    .yo-scroll {
      // overflow: initial;
      top: 0px;
      transition: all 1s ease;
      // bottom: 50px;
      // overflow: none;
      -webkit-overflow-scrolling: touch;
    }
    .mhome-article {
      .timestamp {
        ul {
          li {
            // margin-bottom: vw(40);

            font-weight: bold;
            padding: vw(46) vw(70);
            border-bottom: vw(2) solid #4f3dad;
            h3 {
              // width: 600px;
              // height: vw(34);
              font-size: vw(30);
              line-height: vw(34);
              font-weight: bold;
              color: #4f3dad;
              margin-bottom: vw(22);
              // opacity: 1;
            }
            .item {
              display: flex;
              p.ScreenPicture {
                font-size: vw(80);
                align-self: center;
                font-weight: 100;
                margin-right: vw(50);
              }
              .item-right-top {
                margin-bottom: vw(20);
              }
              .item-right-bottom {
                display: flex;
                aside {
                  width: vw(34);
                  height: vw(34);
                  background: #fff;
                  margin-right: vw(30);
                }
              }
            }
          }
          li:nth-last-of-type(1) {
            margin-bottom: vw(0);
          }
        }
      }
    }
  }
}
</style>

