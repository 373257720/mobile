<template>
  <div id="mysign">
    <commonnav>
      {{ $t("project.project") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
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
              <div class="item item-4">
                <p v-if="i.userIdentityType == 1">{{ i.userName }}</p>
                <p
                  v-else-if="i.userIdentityType == 2 && $i18n.locale == 'zh_CN'"
                >
                  {{ i.userCompanyCh }}
                </p>
                <p
                  v-else-if="i.userIdentityType == 2 && $i18n.locale == 'en_US'"
                >
                  {{ i.userCompanyEn }}
                </p>
              </div>
              <div class="item item-5">
                <p class="icon iconRight iconfont icon-3"></p>
              </div>
              <div class="item item-6">
                <p>{{ $t($global.investorsType[i.userIdentityType]) }}</p>
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
        console.log(arry);
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
      }
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
    toggleAll() {
      // console.log(this.num)
      if (this.num == 1) {
        this.$refs.check.toggleAll(true);
        this.num = 2;
      } else if (this.num == 2) {
        this.$refs.check.toggleAll(false);
        this.num = 1;
      }
    },

    confirm_lists() {
      function unique(arr) {
        if (!Array.isArray(arr)) {
          console.log("type error!");
          return;
        }
        arr = arr.sort();
        var arrry = [arr[0]];
        for (var i = 1; i < arr.length; i++) {
          if (arr[i] !== arr[i - 1]) {
            arrry.push(arr[i]);
          }
        }
        return arrry;
      }
      this.result = unique(this.result);
      // this.result = [...new Set(this.result)];
      if (this.usertype == 1 || this.usertype == 4) {
        if (this.result.indexOf(3) >= 0) {
          if (this.result.indexOf(7) <= 0) {
            this.result.push(7);
          }
          if (this.result.indexOf(11) <= 0) {
            this.result.push(11);
          }
        } else if (this.result.indexOf(3) < 0) {
          if (this.result.indexOf(7) >= 0) {
            this.result.splice(this.result.indexOf(7), 1);
          }
          if (this.result.indexOf(11) >= 0) {
            this.result.splice(this.result.indexOf(11), 1);
          }
        }
      }
      this.$store.commit("genre_array", this.result);
      console.log(this.$store.state);
      this.finished = false;
      this.loading = true;
      this.upGoodsInfo = [];
      this.pageNum = 1;
      this.fliter();
      this.onLoad();
    },
    fliter() {
      this.checklist_height = this.$refs.check.$el.children[0].clientHeight;
      if (
        this.$refs.check.$el.style.height == 0 ||
        this.$refs.check.$el.style.height == 0 + "px"
      ) {
        this.$refs.check.$el.style.height = this.checklist_height + "px";
      } else {
        this.$refs.check.$el.style.height = 0;
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onLoad() {
      if (this.refreshing) {
        this.upGoodsInfo = [];
        this.refreshing = false;
      }
      // this.$axios({
      //   method: "post",
      //   url: `${this.$axios.defaults.baseURL}/bsl_web/projectSign/project`,
      //   data: this.$qs.stringify(
      //     {
      //       projectId: this.$route.query.projectId,
      //       signStatusList: this.result,
      //       pageIndex: this.pageNum,
      //       pageSize: this.loadNumUp,
      //       X_Token:this.$store.state.X_Token
      //     },
      //     { arrayFormat: "brackets" }
      //   ),
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // })
      // console.log(result);

      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/project`,
          {
            projectId: this.$route.query.projectId,
            signStatusList: this.result,
            pageIndex: this.pageNum,
            pageSize: this.loadNumUp,
            // X_Token:this.$store.state.X_Token
          }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            let re = [...res.data.data.lists];
            for (let i = 0; i < re.length; i++) {
              re[i].signTime4Submit = re[i].signTime4Submit
                ? this.$global.timestampToTime(re[i].signTime4Submit)
                : "";
              re[i].signTime = re[i].signTime
                ? this.$global.timestampToTime(re[i].signTime)
                : "";
            }
            if (re.length > 0) {
              re.forEach((item) => {
                this.piclists.forEach((each) => {
                  if (item.signStatus == each.value) {
                    item.signStatustext = each.text;
                    item.pic = each.pic;
                  }
                });
              });
              this.upGoodsInfo = this.upGoodsInfo.concat(re);
              this.loading = false;
            }
            if (
              this.upGoodsInfo.length >= res.data.data.pageTotal ||
              this.upGoodsInfo.length == 0
            ) {
              this.finished = true;
            }
            this.pageNum++;
          } else {
            this.loading = false;
            this.finished = true;
          }
          console.log(this.upGoodsInfo);
        })
        .catch((err) => {
          // this.loadText = "加载失败";
        });
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