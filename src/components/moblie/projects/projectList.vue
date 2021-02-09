<template>
  <div id="mysign">
    <commonnav>
      {{ $t("project.project") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <!-- <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template> -->
    </commonnav>
    <main>
      <nav>{{ $store.state.selectedItem.text }}</nav>
      <div v-if="$store.state.currentUsertype === 1" class="timestamp">
        <ul>
          <li v-for="i in arr" :key="i.text">
            <section id="container">
              <div class="item item-1">
                <p class="icon iconRight iconfont icon-5day"></p>
                <!-- <i class="icon iconRight iconfont icon-message"></i> -->
              </div>
              <div class="item item-2">
                <p v-if="i.signNdaStatus">
                  {{ $global.timestampToTime(i.ndaSubmitTime) }}
                </p>
                <p v-else>{{ $global.timestampToTime(i.signSubmitTime4) }}</p>
              </div>
              <div class="item item-3">
                <p class="icon iconRight iconfont icon-5day"></p>
              </div>
              <div
                v-if="
                  i.signStatus4 > 10 && i.signStatus4 < 50 && i.signNdaStatus
                "
                class="item item-4"
              >
                <p v-if="i.userIdentityType4 == 1">{{ i.userName4 }}</p>
                <p v-else-if="i.userIdentityType4 == 2">
                  {{ i["userCompany" + $global.language() + "4"] }}
                </p>
              </div>
              <div
                v-else-if="i.signStatus4 > 10 && i.signStatus4 < 50"
                class="item item-4"
              >
                <p v-if="i.userIdentityType4 == 1">{{ i.userName4 }}</p>
                <p v-else-if="i.userIdentityType4 == 2">
                  {{ i["userCompany" + $global.language() + "4"] }}
                </p>
              </div>
              <div
                v-if="
                  (i.signStatus4 < 10 || i.signStatus4 > 49) && i.signNdaStatus
                "
                class="item item-4"
              >
                <p v-if="i.userIdentityType == 1">{{ i.userName }}</p>
                <p v-else-if="i.userIdentityType == 2">
                  {{ i["userCompany" + $global.language()] }}
                </p>
              </div>
              <div
                v-else-if="i.signStatus4 < 10 || i.signStatus4 > 49"
                class="item item-4"
              >
                <p v-if="i.userIdentityType == 1">{{ i.userName }}</p>
                <p v-else-if="i.userIdentityType == 2">
                  {{ i["userCompany" + $global.language()] }}
                </p>
              </div>
              <div class="item item-5">
                <p class="icon iconRight iconfont icon-3"></p>
              </div>
              <div class="item item-6">
                <p
                  v-if="
                    i.signStatus4 > 10 && i.signStatus4 < 50 && i.signNdaStatus
                  "
                >
                  {{ $t($global.investorsType[i.userIdentityType4]) }}
                </p>
                <p v-else-if="i.signStatus4 > 10 && i.signStatus4 < 50">
                  {{ $t($global.investorsType[i.userIdentityType4]) }}
                </p>
                <p
                  v-if="
                    (i.signStatus4 < 10 || i.signStatus4 > 49) &&
                    i.signNdaStatus
                  "
                >
                  {{ $t($global.investorsType[i.userIdentityType]) }}
                </p>
                <p v-else-if="i.signStatus4 < 10 || i.signStatus4 > 49">
                  {{ $t($global.investorsType[i.userIdentityType]) }}
                </p>
                <!-- <p v-if="i.signNdaStatus">
                  {{ $t($global.investorsType[i.userIdentityType4]) }}
                </p> -->
              </div>
            </section>
            <div class="btn">
              <van-button @click="routerto(i)">{{
                $t("project.Detail")
              }}</van-button>
              <!-- <van-button @click="$routerto('projectChain')">{{$t('project.projectChain')}}</van-button> -->
            </div>
          </li>
        </ul>
      </div>
      <div v-if="$store.state.currentUsertype === 4" class="timestamp">
        <ul>
          <li v-for="i in arr" :key="i.text">
            <!-- <nav>CDC Biodiversité – Biodiversity Offsetting</nav> -->
            <section id="container">
              <div class="item item-1">
                <p class="icon iconRight iconfont icon-5day"></p>
                <!-- <i class="icon iconRight iconfont icon-message"></i> -->
              </div>
              <div class="item item-2">
                <p v-if="i.signNdaStatus">
                  {{ $global.timestampToTime(i.ndaSubmitTime) }}
                </p>
                <p v-else>{{ $global.timestampToTime(i.signSubmitTime4) }}</p>
              </div>
              <div class="item item-3">
                <p class="icon iconRight iconfont icon-5day"></p>
              </div>
              <div class="item item-4">
                <p v-if="$i18n.locale == 'zh_CN'">{{ i.projectName }}</p>
                <p v-else>{{ i.projectNameEn }}</p>
              </div>
              <div class="item item-5">
                <p class="icon iconRight iconfont icon-3"></p>
              </div>
              <div class="item item-6">
                <p>{{ $store.state.selectedItem.text }}</p>
                <!-- <p v-if="i.signNdaStatus">
                  {{ $global.ndastage[i.signNdaStatus] }}
                </p>
                <p v-else>{{ $global.middleman_obj[i.signStatus4] }}</p> -->
              </div>
            </section>
            <div class="btn">
              <van-button
                @click="
                  $routerto('projectRootAgentProjectDetail', {
                    projectId: i.projectId,
                    signStatus4: i.signStatus4,
                    signId: i.signId,
                    middlemanId: i.middlemanId,
                    parentMiddlemanId: i.parentMiddlemanId,
                    signUserId4: i.signUserId4,
                  })
                "
                >{{ $t("project.Detail") }}</van-button
              >
              <!-- <van-button @click="$routerto('projectChain')">{{$t('project.projectChain')}}</van-button> -->
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>
<script>
// console.log(timeout)
import Scroll from "../loadmore";
export default {
  name: "mysign",
  components: {
    "v-scroll": Scroll,
  },
  // props: {
  //   selectedItem: {
  //     type: Object
  //   }
  // },

  data() {
    return {
      loaded: false,
      result: [],
      finished: false,
      refreshing: false,
      loadText: "Loading…",
      pageNum: 1,
      loadNumUp: 20,
      usertype: "",
      upGoodsInfo: [],
      // 1投行（项目方），3投资者，4投资中间人
      // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4    已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8   待确认项目->9  签约成功项目->10 拒绝签约项目->11
      piclists: [
        {
          value: 1,
          text: this.$t("common.PendingItems"),
          pic: "../../../static/pic/waitreview.png",
        },
        {
          value: 2,
          text: this.$t("common.ToBeSignedProject"),
          pic: "../../../static/pic/waitsign.png",
        },
        {
          value: 4,
          text: this.$t("common.SignedForChain"),
          pic: "../../../static/pic/waitinvestor.png",
        },
        {
          value: 5,
          text: this.$t("common.ChainedForRecommendation"),
          pic: "../../../static/pic/waitinvestor.png",
        },
        {
          value: 6,
          text: this.$t("common.PendingReview"),
          pic: "../../../static/pic/waitreview.png",
        },
        {
          value: 8,
          text: this.$t("common.ReviewedPending"),
          pic: "../../../static/pic/waitinvestor.png",
        },
        {
          value: 9,
          text: this.$t("investor.Itemstobeconfirmed"),
          pic: "../../../static/pic/waitinvestor.png",
        },
        {
          value: 10,
          text: this.$t("common.SignedContract"),
          pic: "../../../static/pic/success.png",
        },
        {
          value: 3,
          text: this.$t("common.InvestmentBankHasRejected"),
          pic: "../../../static/pic/false.png",
        },
        {
          value: 7,
          text: this.$t("common.InvestmentBankHasRejected"),
          pic: "../../../static/pic/false.png",
        },
        {
          value: 11,
          text: this.$t("common.InvestorHasRejected"),
          pic: "../../../static/pic/false.png",
        },
      ],
      checklist_height: "",
      // classname: {
      //   // "0":
      // }
      num: 10,
      refreshing: false,
      loading: false,
      text: "List",
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (to.name == "p_submit_contract" || to.name == "a_submit_contract") {
      next(false);
    } else if (to.name == "a_recommand_i") {
      next(false);
    } else if (to.name == "a_project_intro" && to.query.signStatus === "0") {
      next(false);
    } else if (to.name == "uploadtoblock" && to.query.signStatus === "5") {
      next(false);
    } else if (to.name == "a_wait_sendemail" && to.query.signStatus === "9") {
      next(false);
    } else if (to.name == "i_wait_confirm" && to.query.signStatus === "11") {
      next(false);
    } else if (to.name == "i_perfect_infor") {
      next(false);
    } else if (to.name == "p_sign_request") {
      if (to.query.signStatus == 6 || to.query.signStatus == 1) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  beforeDestroy() {
    //  this.$store.commit("selectedItemMutations", {});
  },
  created() {
    console.log(this.$store.state);
    // this.usertype = this.$store.state.currentUsertype;
    // if (this.$route.query.projectId) {
    //   let arr = JSON.parse(this.$route.query.array);
    //   if (arr.length > 0) {
    //     this.result = [...arr];
    //   }
    // } else {
    //   if (this.$store.state.genre.length > 0) {
    //     this.result = [...this.$store.state.genre];
    //   } else {
    //     // 1投行（项目方），3投资者，4投资中间人
    //     // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4
    //     // 已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8
    //     // 待确认项目->9  签约成功项目->10 拒绝签约项目->11
    //     if (this.usertype == 1 || this.usertype == 4) {
    //       this.result = [1, 2, 4, 5, 6, 8, 9, 10, 11, 3, 7];
    //     } else if (this.usertype == 3) {
    //       this.result = [9, 10, 11];
    //     }
    //   }
    // }
  },
  activated() {
    // if (this.$route.query.projectId) {
    //   let arr = JSON.parse(this.$route.query.array);
    //   if (arr.length > 0) {
    //     this.result = [...arr];
    //   }
    // } else {
    //   if (this.$store.state.genre.length > 0) {
    //     this.result = [...this.$store.state.genre];
    //   } else {
    //     // 1投行（项目方），3投资者，4投资中间人
    //     // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4
    //     // 已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8
    //     // 待确认项目->9  签约成功项目->10 拒绝签约项目->11
    //     if (this.usertype == 1 || this.usertype == 4) {
    //       this.result = [1, 2, 4, 5, 6, 8, 9, 10, 11, 3, 7];
    //     } else if (this.usertype == 3) {
    //       this.result = [9, 10, 11];
    //     }
    //   }
    // }
  },
  computed: {
    arr() {
      let arry = this.$store.state.selectedItem.arr;
      if (this.$store.state.selectedItem.nda) {
        for (let i = 0; i < arry.length; i++) {
          for (let j = 0; j < arry.length - 1 - i; j++) {
            if (arry[j].ndaSubmitTime < arry[j + 1].ndaSubmitTime) {
              let temp = arry[j];
              arry[j] = arry[j + 1];
              arry[j + 1] = temp;
            }
          }
        }
      } else {
        for (let i = 0; i < arry.length; i++) {
          for (let j = 0; j < arry.length - 1 - i; j++) {
            if (arry[j].signSubmitTime4 < arry[j + 1].signSubmitTime4) {
              let temp = arry[j];
              arry[j] = arry[j + 1];
              arry[j + 1] = temp;
            }
          }
        }
        // console.log(arry);
        arry.forEach((item) => {
          if (item.signStatus4 == 50) {
            console.log(item);
          }
        });
      }
      console.log(arry);
      return arry;
    },
    already_check: function () {
      if (this.$store.state.currentUsertype || this.usertype) {
        return this.$t("common.NoMore");
      } else {
        return this.$t("common.WaitForReview");
      }
    },

    list: function () {
      // 待处理项目->1 待签约项目->2 投行拒绝和中间人签约 ->3 已签约待上链->4
      // 已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8
      // 待确认项目->9  签约成功项目->10 投资人拒绝签约项目->11
      if (this.usertype == 1 || this.usertype == 4) {
        return [
          {
            value: 1,
            text: this.$t("common.PendingItems"),
            pic: "../../../static/pic/waitreview.png",
          },
          {
            value: 2,
            text: this.$t("common.ToBeSignedProject"),
            pic: "../../../static/pic/waitsign.png",
          },
          {
            value: 4,
            text: this.$t("common.SignedForChain"),
            pic: "../../../static/pic/waitsign.png",
          },
          {
            value: 5,
            text: this.$t("common.ChainedForRecommendation"),
            pic: "../../../static/pic/waitinvestor.png",
          },
          {
            value: 6,
            text: this.$t("common.PendingReview"),
            pic: "../../../static/pic/waitreview.png",
          },
          {
            value: 8,
            text: this.$t("common.ReviewedPending"),
            pic: "../../../static/pic/waitreview.png",
          },
          {
            value: 9,
            text: this.$t("common.ToBeConfirmedByInvestors"),
            pic: "../../../static/pic/waitinvestor.png",
          },
          {
            value: 10,
            text: this.$t("common.SignedContract"),
            pic: "../../../static/pic/success.png",
          },
          {
            value: 3,
            text: this.$t("common.RejectedProject"),
            pic: "../../../static/pic/false.png",
          },
        ];
      } else if (this.usertype == 3) {
        return [
          {
            value: 9,
            text: this.$t("common.ToBeConfirmedByInvestors"),
            pic: "../../../static/pic/waitinvestor.png",
          },
          {
            value: 10,
            text: this.$t("common.SignedContract"),
            pic: "../../../static/pic/success.png",
          },
          {
            value: 11,
            text: this.$t("common.RejectedProject"),
            pic: "../../../static/pic/false.png",
          },
        ];
      }
    },
  },
  mounted() {
    this.initial();
    // this.checklist_height = this.$refs.check.$el.children[0].clientHeight;
    this.$nextTick(() => {
      window.addEventListener("resize", this.initial, false);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.initial, false);
  },

  methods: {
    routerto(i) {
      // console.log(item);
      this.$routerto("p_projectdetail", {
        projectId: i.projectId,
        signStatus4: i.signStatus4,
        signId: i.signId,
        recommendUserId: i.recommendUserId ? i.recommendUserId : "",
        recommendedUserId: i.recommendedUserId ? i.recommendedUserId : "",
        middlemanId: i.middlemanId,
        signUserId4: i.signUserId4 ? i.signUserId4 : "",
        parentMiddlemanId: i.parentMiddlemanId,
        signNdaStatus: i.signNdaStatus ? i.signNdaStatus : "",
      });
    },
    onRefresh(done) {
      this.loaded = false;
      this.getcountrylist(done);
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
    initial() {
      // this.$refs.check.$el.style.height = 0;
      // console.log(123);
      // if (window.orientation == 90 || window.orientation == -90) {
      //   document.querySelector(".choose_lists").style.maxHeight = 4 + "rem";
      // } else {
      //   document.querySelector(".choose_lists").style.maxHeight = "initial";
      // }
    },
  },
};
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
#mysign {
  main {
    padding: 0 vw(70);
    padding-top: vw(140);
    // position: relative;
    > nav {
      padding-top: vw(48);
      padding-bottom: vw(106);
      font-size: vw(38);
      font-weight: bold;
      line-height: vw(44);
      text-align: center;
      color: #3ab5cc;
      opacity: 1;
    }
  }
  .yo-scroll {
    top: vw(338);
  }

  .timestamp {
    // padding: 0 vw(70);
    ul {
      li {
        margin-bottom: vw(50);
        font-weight: bold;
        // padding: 0 vw(70);
        nav {
          // width: 600px;
          // height: vw(34);
          font-size: vw(30);
          line-height: vw(34);
          color: #4f3dad;
          margin-bottom: vw(22);
          // opacity: 1;
        }
      }
    }
  }

  #container {
    display: grid;
    color: #4f3dad;
    grid-row: 3;
    margin-bottom: vw(22);
    grid-gap: vw(28) vw(30);
    grid-template-columns: vw(50) auto;
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
  }
  div.btn {
    display: flex;
    justify-content: flex-end;
    button {
      width: vw(232);
      height: vw(72);
      background: #00f0ab;
      border-radius: vw(16);
      color: #fff;
      border: none;
    }
  }
}
</style>