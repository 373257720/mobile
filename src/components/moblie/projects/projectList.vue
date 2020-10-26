<template>
  <div id="mysign">
    <div id="common_nav">
      <nav class="common_nav">
        <span>project</span>
         
      </nav>
    </div>
    <mu-paper class="demo-loadmore-wrap">
      <mu-container ref="container" class="demo-loadmore-content">
        <mu-load-more
          @refresh="refresh"
          loading-text="loading"
          :refreshing="refreshing"
          :loading="loading"
          @load="load"
        >
          <mu-list>
            <div class="timestamp">
              <div id="container"  v-for="i in num" :key="i">
                <div class="item item-1">CDC Biodiversité – Biodiversity Offsetting</div>
                <div class="item item-2">
                  <p></p>
                </div>
                <div class="item item-3">
                  <p>Biodiversity offsets</p>
                </div>
                <div class="item item-4">
                  <p></p>
                </div>
                <div class="item item-5">
                  <p>#tag</p>
                </div>
                <div class="item item-6">
                  <p></p>
                </div>
                <div class="item item-7">
                  <p>This is the first NCFF operation that supports a Biodiversity Offseting scheme.</p>
                </div>
                <div class="item item-8">
                  <van-button @click="$routerto('projectDetail')">Details</van-button>
                </div>
              </div>

              <!-- <mu-list-item :ripple="false" button>
                <mu-list-item-content>
                  <mu-list-item-title>Invitation to register has been sent</mu-list-item-title>
                  <mu-list-item-sub-title>
                    Your invitation link has been sent, and the investor you recommended has received the email
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>-->
            </div>
          </mu-list>
        </mu-load-more>
      </mu-container>
    </mu-paper>
    <!-- <nav>
      <header>{{$t('common.MyProjectS')}}</header>
      <van-overlay z-index='-666' :show="visible" @click="visible= false"/>
      <main>
        <div class="sort_box" @click="fliter" v-if="usertype">
          {{$t('common.ProjectScreening')}}
          <van-icon name="arrow-down" />
        </div>
        <van-checkbox-group ref="check" v-model="result">
          <van-cell-group>
            <div
              class="all_select"
              :class="num==2?'isactive':'isorigin'"
              @click="toggleAll"
            >{{$t('common.SelectAll')}}</div>
            <div class="choose_lists">
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="item.text"
                :title="`${item.text}`"
                @click="toggle(index)"
              >
                <van-checkbox :name="item.value" ref="checkboxes" slot="right-icon" />
              </van-cell>
            </div>
            <div class="confirm" @click="confirm_lists">{{$t('common.Determine')}}</div>
          </van-cell-group>
        </van-checkbox-group>
      </main>
    </nav>-->
    <!-- <div id="common_nav">
      <p></p>
      <nav class="common_nav">
        <span>{{$t('common.MyProjectS')}}</span>
      </nav>
    </div>-->
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :loading-text="loadText"
        :finished-text="already_check"
        :error-text="$t('common.RequestFailed')"
        :offset="300"
      >
        <ul>
          <li v-for="item in upGoodsInfo" :key="item.signId" @click="mysignto(item)">
            <div>
              <p>
                <span>{{$t('common.ApplicationTime')}}:</span>
                <span>{{item.signTime4Submit}}</span>
              </p>
              <p>
                <span>{{$t('common.ApplicationProject')}}:</span>
                <span>{{item.projectName || '-'}}</span>
              </p>
              <p>
                <span>{{$t('common.ApplicationMiddleman')}}:</span>
                <span>
                  {{item.userIdentityType==1?item.userName:
                  item.userCompany}}
                </span>
              </p>

              <p v-if="usertype==1 && item.signStatus>5">
                <span>{{$t('common.InvestorName')}}:</span>
                <span>{{item.investorsName}}</span>
              </p>
              <p v-if="item.signStatus">
                <span>{{$t('common.SigningTime')}}:</span>
                <span>{{item.signTime}}</span>
              </p>
            </div>
            <aside>
              <img :src="item.pic" alt />
              <span>{{item.signStatustext}}</span>
            </aside>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>-->
  </div>
</template>
<script>
// console.log(timeout)
export default {
  name: "mysign",
  data() {
    return {
      // visible: false,
      // text: "全部",
      loading: false,
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
    refresh() {
      //   console.log(123);
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.text = this.text === "List" ? "Menu" : "List";
        this.num = 10;
      }, 2000);
    },
    load() {
      console.log(123);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
        console.log(this.num);
      }, 2000);
    },
    initial() {
      this.$refs.check.$el.style.height = 0;
      console.log(123);
      if (window.orientation == 90 || window.orientation == -90) {
        document.querySelector(".choose_lists").style.maxHeight = 4 + "rem";
      } else {
        document.querySelector(".choose_lists").style.maxHeight = "initial";
      }
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
    onRefresh() {
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.upGoodsInfo = [];
      this.pageNum = 1;
      this.onLoad();
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
            pageSize: this.loadNumUp
            // X_Token:this.$store.state.X_Token
          }
        )
        .then(res => {
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
              re.forEach(item => {
                this.piclists.forEach(each => {
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
        .catch(err => {
          // this.loadText = "加载失败";
        });
    }
  }
};
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
#mysign {
  // padding-top: vw(46);
  padding-bottom: vw(116);
  #common_nav {
    width: 100%;
    font-weight: bold;
    position: fixed;
    top: 0;
    z-index: 200;
    background: #fff;
    // padding-top: vw(46);
    height: vw(140);
    line-height: vw(140);
    text-align: center;
    color: #4f3dad;
    font-size: vw(40);
    nav.common_nav {
      // margin-top: vw(46);
      line-height: vw(140);
      height: vw(140);
    }
    // p {
    //   height: vw(46);
    //   width: 100%;
    // }
  }
  .mu-list {
    padding: 0;
  }
  .container {
    padding: 0 vw(70);
    padding-top: vw(226);
  }
  #container {
    display: grid;
    color: #4f3dad;
    grid-row: 4;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(auto);
    grid-column: 2;
    grid-auto-flow: row;
    .item {
      // text-align: center;
      // align-self: center;
    }
    .item-1 {
      grid-area: 1 / 1 / 2 / 3;
      font-size: vw(30);
      line-height: vw(34);
      // height: vw(34);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      margin-bottom: vw(22);
    }
    .item-8 {
      grid-area: 5/ 1 / 6 / 3;
      font-size: vw(30);
      line-height: vw(34);
      // height: vw(34);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      margin-bottom: vw(22);
      justify-self: flex-end;
      .van-button {
        width: vw(232);
        height: vw(72);
        background: #00f0ab;
        border-radius: vw(16);
        color: #fff;
      }
    }
    .item-2,
    .item-4,
    .item-6 p {
      width: vw(30);
      height: vw(30);
      margin-right: vw(33);
      background: #4f3dad;
      align-self: flex-start;
      justify-self: center;
    }
    .item-3,
    .item-5,
    .item-7 p {
      // width: 542px;
      margin-bottom: vw(22);
      // height: vw(74);
      font-size: vw(24);
      align-self: flex-start;
      font-weight: bold;
      line-height: vw(30);
    }
  }
}
</style>