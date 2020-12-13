<template>
  <div id="mysign">
    <commonnav>
      {{$t('project.project')}}
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
     

      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
      >
       <div class="searchContainer" :class="{'isFixed':isFixed}">
        <van-search
          :class="{'is_fixed' : isFixed}"
          v-model="searchkey"
          :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
          shape="round"
          left-icon
        >
          <div slot="right-icon">
            <van-icon name="search" />
          </div>
        </van-search>
      </div>
        <div class="timestamp">
          <ul>
            <li @click="$routerto('projectStatus')" v-for="i in countrylist" :key="i.remark">
              <nav>CDC Biodiversité – Biodiversity Offsetting</nav>
              <section id="container">
                <div class="item item-1">
                  <p class="icon iconRight iconfont icon-1"></p>
                  <!-- <i class="icon iconRight iconfont icon-message"></i> -->
                </div>
                <div class="item item-2">
                  <p>Biodiversity offsets</p>
                </div>
                <div class="item item-3">
                  <p class="icon iconRight iconfont icon-2_1"></p>
                </div>
                <div class="item item-4">
                  <p>#tag</p>
                </div>
                <div class="item item-5">
                  <p class="icon iconRight iconfont icon-3"></p>
                </div>
                <div class="item item-6">
                  <p>This is the first NCFF operation that supports a Biodiversity Offseting scheme.</p>
                </div>
              </section>
              <div class="btn">
                <van-button>{{$t('projectOwner.Interested')}}</van-button>
              </div>
            </li>
          </ul>
        </div>
      </v-scroll>
      <!-- </transition> -->
    </main>
       <scroll-top />
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
       ScrollTop
  },
  data() {
    return {
      searchkey: "",
      result: [],
      isFixed: false,
      offsetTop: 0,
      loaded: false,
      refreshing: false,
      loadText: "Loading…",
      pageNum: 1,
      loadNumUp: 20,
      countrylist: [],
      usertype: "",
      // 1投行（项目方），3投资者，4投资中间人
      // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4    已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8   待确认项目->9  签约成功项目->10 拒绝签约项目->11
      piclists: [
        {
          value: 1,
          text: this.$t("common.PendingItems"),
          pic: "../../../static/pic/waitreview.png"
        },
        {
          value: 2,
          text: this.$t("common.ToBeSignedProject"),
          pic: "../../../static/pic/waitsign.png"
        },
        {
          value: 4,
          text: this.$t("common.SignedForChain"),
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 5,
          text: this.$t("common.ChainedForRecommendation"),
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 6,
          text: this.$t("common.PendingReview"),
          pic: "../../../static/pic/waitreview.png"
        },
        {
          value: 8,
          text: this.$t("common.ReviewedPending"),
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 9,
          text: this.$t("investor.Itemstobeconfirmed"),
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 10,
          text: this.$t("common.SignedContract"),
          pic: "../../../static/pic/success.png"
        },
        {
          value: 3,
          text: this.$t("common.InvestmentBankHasRejected"),
          pic: "../../../static/pic/false.png"
        },
        {
          value: 7,
          text: this.$t("common.InvestmentBankHasRejected"),
          pic: "../../../static/pic/false.png"
        },
        {
          value: 11,
          text: this.$t("common.InvestorHasRejected"),
          pic: "../../../static/pic/false.png"
        }
      ],
      checklist_height: "",
      // classname: {
      //   // "0":
      // }
      num: 10,
      refreshing: false,
      loading: false,
      text: "List"
    };
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to, from);
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
  created() {
    console.log(this.num);
    this.usertype = this.$store.state.currentUsertype;
    if (this.$route.query.projectId) {
      let arr = JSON.parse(this.$route.query.array);
      if (arr.length > 0) {
        this.result = [...arr];
      }
    } else {
      if (this.$store.state.genre.length > 0) {
        this.result = [...this.$store.state.genre];
      } else {
        // 1投行（项目方），3投资者，4投资中间人
        // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4
        // 已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8
        // 待确认项目->9  签约成功项目->10 拒绝签约项目->11
        if (this.usertype == 1 || this.usertype == 4) {
          this.result = [1, 2, 4, 5, 6, 8, 9, 10, 11, 3, 7];
        } else if (this.usertype == 3) {
          this.result = [9, 10, 11];
        }
      }
    }
    this.getcountrylist();
  },
  activated() {
    if (this.$route.query.projectId) {
      let arr = JSON.parse(this.$route.query.array);
      if (arr.length > 0) {
        this.result = [...arr];
      }
    } else {
      if (this.$store.state.genre.length > 0) {
        this.result = [...this.$store.state.genre];
      } else {
        // 1投行（项目方），3投资者，4投资中间人
        // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4
        // 已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8
        // 待确认项目->9  签约成功项目->10 拒绝签约项目->11
        if (this.usertype == 1 || this.usertype == 4) {
          this.result = [1, 2, 4, 5, 6, 8, 9, 10, 11, 3, 7];
        } else if (this.usertype == 3) {
          this.result = [9, 10, 11];
        }
      }
    }
  },
  computed: {
    already_check: function() {
      if (this.$store.state.currentUsertype || this.usertype) {
        return this.$t("common.NoMore");
      } else {
        return this.$t("common.WaitForReview");
      }
    },

    list: function() {
      // 待处理项目->1 待签约项目->2 投行拒绝和中间人签约 ->3 已签约待上链->4
      // 已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8
      // 待确认项目->9  签约成功项目->10 投资人拒绝签约项目->11
      if (this.usertype == 1 || this.usertype == 4) {
        return [
          {
            value: 1,
            text: this.$t("common.PendingItems"),
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 2,
            text: this.$t("common.ToBeSignedProject"),
            pic: "../../../static/pic/waitsign.png"
          },
          {
            value: 4,
            text: this.$t("common.SignedForChain"),
            pic: "../../../static/pic/waitsign.png"
          },
          {
            value: 5,
            text: this.$t("common.ChainedForRecommendation"),
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 6,
            text: this.$t("common.PendingReview"),
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 8,
            text: this.$t("common.ReviewedPending"),
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 9,
            text: this.$t("common.ToBeConfirmedByInvestors"),
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 10,
            text: this.$t("common.SignedContract"),
            pic: "../../../static/pic/success.png"
          },
          {
            value: 3,
            text: this.$t("common.RejectedProject"),
            pic: "../../../static/pic/false.png"
          }
        ];
      } else if (this.usertype == 3) {
        return [
          {
            value: 9,
            text: this.$t("common.ToBeConfirmedByInvestors"),
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 10,
            text: this.$t("common.SignedContract"),
            pic: "../../../static/pic/success.png"
          },
          {
            value: 11,
            text: this.$t("common.RejectedProject"),
            pic: "../../../static/pic/false.png"
          }
        ];
      }
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.initHeight, true);
    // this.$nextTick(() => {
    //   this.offsetTop = document.querySelector(".van-search__content").offsetTop;
    // });
  },
  destroyed() {
    // window.removeEventListener("scroll", this.initHeight, true);
  },

  methods: {
    initHeight() {
      let scrollTop = document.querySelector(".yo-scroll").scrollTop;
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    getcountrylist(done) {
      this.countrylist = [];
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: this.searchkey
          }
        )
        .then(res => {
          if (res.data.data.length > 0) {
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
            this.loaded = true;
            if (done) done();
          }
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
    mysignto(item) {
      let signStatus = item.signStatus;
      let obj = {
        projectId: item.projectId,
        signStatus: item.signStatus,
        signId: item.signId
      };
      // 1投行（项目方），3投资者，4投资中间人
      // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4    已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8   待确认项目->9  签约成功项目->10 拒绝签约项目->11
      if (this.usertype == 1) {
        if (signStatus == 1) {
          this.$routerto("p_sign_request", obj);
        } else if (signStatus == 2) {
          this.$routerto("p_wait_agent_input", obj);
        } else if (signStatus == 4) {
          this.$routerto("p_wait_agent_input", obj);
        } else if (signStatus == 5) {
          this.$routerto("p_wait_investor", obj);
          // this.$routerto("p_wait_agent_input", obj);
        } else if (signStatus == 6) {
          this.$routerto("p_sign_request", obj);
        } else if (signStatus == 8) {
          this.$routerto("p_wait_investor", obj);
        } else if (signStatus == 9) {
          this.$routerto("p_wait_investor", obj);
        } else if (signStatus == 10) {
          this.$routerto("p_sign_successful", obj);
        } else if (signStatus == 3 || signStatus == 7 || signStatus == 11) {
          this.$routerto("p_sign_failed", obj);
        }
      } else if (this.usertype == 4) {
        if (signStatus == 1) {
          this.$routerto("a_wait_review", obj);
        } else if (signStatus == 2) {
          this.$routerto("a_wait_signed", obj);
        } else if (signStatus == 4) {
          this.$routerto("uploadtoblock", obj);
        } else if (signStatus == 5) {
          this.$routerto("a_project_intro", obj);
        } else if (signStatus == 6) {
          this.$routerto("a_wait_review", obj);
        } else if (signStatus == 8) {
          this.$routerto("a_wait_sendemail", obj);
        } else if (signStatus == 9) {
          this.$routerto("a_wait_investor_comfirm", obj);
        } else if (signStatus == 10) {
          this.$routerto("a_sign_successful", obj);
        } else if (signStatus == 3 || signStatus == 7 || signStatus == 11) {
          this.$routerto("a_sign_failed", obj);
        }
      } else if (this.usertype == 3) {
        console.log(signStatus);
        if (signStatus == 9) {
          this.$routerto("i_wait_confirm", obj);
        } else if (signStatus == 10) {
          this.$routerto("i_conected_project", obj);
        } else if (signStatus == 11) {
          this.$routerto("i_sign_failed", obj);
        }
      }
    }
  }
};
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
#mysign {
  main {
    padding-top: 50px;
    // position: relative;
    // height: 100%;
    .van-search {
      width: vw(598);
      margin: 0 auto;
      padding: 0;
      margin-bottom: vw(48);
    }
    .van-search__content {
      border: vw(2) solid #3ab5cc;
      background: #fff;
      .van-icon-search,
      .van-icon-clear {
        color: #3ab5cc;
      }
    }
    .yo-scroll {
      top: 50px;
      transition: all 1s ease;
      bottom: 50px;
      -webkit-overflow-scrolling: touch;
    }
    .yo-scrollTop {
      top: vw(332);
    }

    .mhome-article {
      .timestamp {
        ul {
          li {
            margin-bottom: vw(40);
            font-weight: bold;
            padding: 0 vw(70);
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
            li:nth-last-of-type(1){
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
        grid-template-columns: auto auto;
        grid-template-rows: repeat(auto);
        grid-column: 2;
        grid-auto-flow: row;
        font-size: vw(24);
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
  }
}
</style>

