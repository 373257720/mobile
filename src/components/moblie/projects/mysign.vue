<template>
  <div id="mysign">
    <commonnav>
      {{ $t("project.project") }}
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
        </div>
        <div class="timestamp" v-if="$store.state.currentUsertype == 1">
          <ul>
            <li v-for="i in MyProjectList" :key="i.id">
              <h3 v-if="i.label">{{ i.label.projectName }}</h3>
              <section
                @click="$routerto('projectSubStatus', { projectId: i.id })"
                id="container"
              >
                <div class="item item-1">
                  <p class="icon iconRight iconfont icon-1"></p>
                  <!-- <i class="icon iconRight iconfont icon-message"></i> -->
                </div>
                <div class="item item-2">
                  <p v-if="i.label">{{ i.label.projectIndustry }}</p>
                </div>
                <div class="item item-3">
                  <p class="icon iconRight iconfont icon-2_1"></p>
                </div>
                <div class="item item-4">
                  <p v-if="i.label">{{ i.label.projectCompany }}</p>
                </div>
                <div class="item item-5">
                  <p class="icon iconRight iconfont icon-3"></p>
                </div>
                <div class="item item-6">
                  <p v-if="i.label">{{ i.label.projectDescribe }}</p>
                </div>
              </section>
              <div class="btn">
                <van-button @click="downPDF(i.id)">{{
                  $t("project.projectChain")
                }}</van-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="timestamp" v-if="$store.state.currentUsertype == 4">
          <ul>
            <li v-for="i in MyProjectList" :key="i.id">
              <h3 v-if="i.label">{{ i.label.projectName }}</h3>
              <section
                @click="$routerto('projectStatus', { projectId: i.id })"
                id="container"
              >
                <div class="item item-1">
                  <p class="icon iconRight iconfont icon-1"></p>
                </div>
                <div class="item item-2">
                  <p v-if="i.label">{{ i.label.projectIndustry }}</p>
                </div>
                <div class="item item-3">
                  <p class="icon iconRight iconfont icon-2_1"></p>
                </div>
                <div class="item item-4">
                  <p v-if="i.label">{{ i.label.projectCompany }}</p>
                </div>
                <div class="item item-5">
                  <p class="icon iconRight iconfont icon-3"></p>
                </div>
                <div class="item item-6">
                  <p v-if="i.label">{{ i.label.projectDescribe }}</p>
                </div>
              </section>
              <div class="btn">
                <van-button @click="downPDF(i.id)">{{
                  $t("project.projectChain")
                }}</van-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="timestamp" v-if="$store.state.currentUsertype == 3">
          <van-collapse v-model="activeNames">
            <van-collapse-item
              v-for="(value, key) in investorList"
              :key="key"
              :name="key"
            >
              <template #title>
                <div>{{ value.name }}</div>
              </template>
              <ul>
                <li v-for="i in value.arr" :key="i.id">
                  <h3 v-if="i.label">{{ i.label.projectName }}</h3>
                  <section
                    @click="
                      $routerto('I_projectdetails', {
                        projectId: i.projectId,
                        signId: i.signId,
                        middlemanId: i.middlemanId,
                        signStatus4: i.signStatus4,
                      })
                    "
                    id="container"
                  >
                    <div class="item item-1">
                      <p class="icon iconRight iconfont icon-1"></p>
                    </div>
                    <div class="item item-2">
                      <p v-if="i.label">
                        {{ $global.timestampToTime(i.label.signSubmitTime4) }}
                      </p>
                    </div>
                    <div class="item item-3">
                      <p class="icon iconRight iconfont icon-2_1"></p>
                    </div>
                    <div class="item item-4">
                      <p v-if="i.label">{{ i.label.projectCompany }}</p>
                    </div>
                    <div class="item item-5">
                      <p class="icon iconRight iconfont icon-3"></p>
                    </div>
                    <div class="item item-6">
                      <p v-if="i.label">
                        {{
                          $t($global.investorsType[i.label.userIdentityType])
                        }}
                      </p>
                    </div>
                  </section>
                  <!-- <div class="btn">
                    <van-button>{{ $t("project.projectChain") }}</van-button>
                  </div> -->
                </li>
              </ul>
              <ul v-if="!investorList[key].arr.length">
                <li>没有数据</li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
      </v-scroll>
      <!-- </transition> -->
    </main>
    <scroll-top></scroll-top>
  </div>
</template>
<script>
// console.log(timeout)
import Scroll from "@/components/moblie/loadmore";
import ScrollTop from "@/components/moblie/common/toTop";
export default {
  name: "mysign",
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
    console.log(this.$store.state.currentUsertype);
    this.usertype = this.$store.state.currentUsertype;
    if (this.$store.state.currentUsertype == 3) {
      this.getMyProjectStatusList();
    } else {
      this.getMyProjectList();
    }
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
    getMyProjectStatusList(done) {
      this.loaded = false;
      let self = this;
      this.MyProjectList = [];
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectStatusList`,
          { searchKey: this.searchkey }
        )
        .then((res) => {
          this.loaded = true;
          if (done) done();
          // this.investorList = {
          //   waitcomfirm: [],
          //   connected: [],
          //   refusal: [],
          // };
          if (res.data.resultCode == 10000) {
            this.investorList.waitcomfirm.arr = [];
            this.investorList.connected.arr = [];
            this.investorList.refusal.arr = [];
            let result = res.data.data.signList;
            result.forEach((item) => {
              let label = {
                signSubmitTime4: item.signSubmitTime4,
                projectName: item["projectName" + self.$global.lan()],
                projectCompany:
                  item.userIdentityType == 1
                    ? item.userName
                    : item["userCompany" + self.$global.language()],
                userIdentityType: item.userIdentityType,
              };
              this.$set(item, "label", label);
              //  53（中间人）等待你推荐的投资人确认（发送邮件给投资人，等待投资人确认）
              //  54（投资人）与你推荐的投资者签约成功项目（投资人注册登录，同意则签约成功）
              //  55 （投资人）  投资人拒绝
              if (item.signStatus4 == 53) {
                this.investorList.waitcomfirm.arr.push(item);
              } else if (item.signStatus4 == 54) {
                this.investorList.connected.arr.push(item);
              } else if (item.signStatus4 == 55) {
                this.investorList.refusal.arr.push(item);
              }
            });
            console.log(this.investorList.waitcomfirm);
          }
        });
    },
    downPDF(id) {
      console.log(id);
      this.$routerto('projectChain',{projectId:id})
      // console.log(document.getElementById("links"));
      // window.location.href =
      //   "http://47.90.62.114:8086/bsl_web/bsl_data_upload/pdf/202008/pdf_1596610060000153073.pdf";
      // document.getElementById("links").href =
      //   "http://47.90.62.114:8086/bsl_web/bsl_data_upload/pdf/202008/pdf_1596610060000153073.pdf";
    },

    // projectChainFun() {
    //   window.open(
    //     "http://47.90.62.114:8086/bsl_web/bsl_data_upload/pdf/202008/pdf_1596610060000153073.pdf"
    //   );
    // },
    search() {
      this.getMyProjectList();
    },
    getMyProjectList(done) {
      this.loaded = false;
      let self = this;
      this.MyProjectList = [];
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectList`,
          { searchKey: this.searchkey }
        )
        .then((res) => {
          this.loaded = true;
          if (done) done();
          this.MyProjectList = res.data.data.data;
          if (res.data.resultCode == 10000) {
            if (this.MyProjectList) {
              this.MyProjectList.forEach((item) => {
                let label = {
                  projectIndustry:
                    item.record["projectIndustry" + self.$global.lan()].indexOf(
                      "["
                    ) < 0
                      ? item.record["projectIndustry" + self.$global.lan()]
                      : eval(
                          "(" +
                            item.record[
                              "projectIndustry" + self.$global.lan()
                            ] +
                            ")"
                        ).join(","),
                  projectName: item.record["projectName" + self.$global.lan()],
                  projectCompany:
                    item.record["projectCompany" + self.$global.lan()],
                  projectDescribe:
                    item.record["projectDescribe" + self.$global.lan()],
                };
                this.$set(item, "label", label);
              });
            }
            console.log(this.MyProjectList);
          }
        });
    },
    initHeight() {
      let scrollTop = document.querySelector(".loadmore").scrollTop;

      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    onRefresh(done) {
      this.loaded = false;
      if (this.$store.state.currentUsertype == 3) {
        this.getMyProjectStatusList(done);
      } else {
        this.getMyProjectList(done);
      }
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
#mysign {
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
#mysign {
  height: 100%;
  //  overflow-y: auto;
  main {
    // height: 100%;
    // overflow-y: auto;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    top: 50px;
    .searchContainer {
      position: relative;
      background: #fff;
      z-index: 999;
      .van-search {
        width: vw(598);
        margin: 0 auto;

        padding: 0;
        margin-bottom: vw(48);
        .van-search__content {
          border: vw(2) solid #3ab5cc;
          background: #fff;
          .van-icon-search,
          .van-icon-clear {
            color: #3ab5cc;
          }
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

    .yo-scrollTop {
      // top: vw(332);
    }

    .mhome-article {
      .timestamp {
        ul {
          li {
            margin-bottom: vw(40);
            font-weight: bold;
            padding: 0 vw(70);
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
          }
          li:nth-last-of-type(1) {
            margin-bottom: vw(0);
          }
        }
      }
      #container {
        display: grid;
        color: #4f3dad;
        grid-row: 3;
        margin-bottom: vw(22);
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
      div.btn {
        display: flex;
        justify-content: flex-end;
        button {
          // width: vw(232);
          height: vw(72);
          background: #00f0ab;
          border-radius: vw(16);
          color: #fff;
          border: none;
        }
      }
    }
  }
}
</style>

