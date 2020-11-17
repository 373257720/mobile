<template>
  <div id="mhome">
    <commonnav>
      {{$t('common.Home')}}
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main class="main" :class="{'topReduce':isshowTag}">
      <!-- <transition name="Totop"> -->

      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
        :class="{'yo-scrollTop':isshowTag,'Fixed':isFixed}"
      >
        <div class="searchContainer" :class="{'isFixed':isFixed}">
          <van-search
            v-if="!isshowTag"
            v-model="searchkey"
            :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
            shape="round"
            left-icon
          >
            <div slot="right-icon">
              <van-icon name="search" @click="()=>{isshowTag=true}" />
            </div>
          </van-search>
        </div>

        <div v-if="!isshowTag" class="mhome-tag">
          <ul>
            <li>
              <aside>{{$t('common.Industry')}}</aside>
              <div>
                <p
                  :class="{'isactive':item.isactive}"
                  @click="tagClick(item)"
                  v-for="item in taglist"
                  :key="item.name"
                >{{item.name}}</p>
              </div>
            </li>
            <li>
              <aside>{{$t('common.region')}}</aside>
              <div>
                <p
                  :class="{'isactive':item.isactive}"
                  @click="tagClick(item)"
                  v-for="item in taglist"
                  :key="item.name"
                >{{item.name}}</p>
              </div>
            </li>
            <li>
              <aside>Tag</aside>
              <div>
                <p
                  :class="{'isactive':item.isactive}"
                  @click="tagClick(item)"
                  v-for="item in taglist"
                  :key="item.name"
                >{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- <transition name="slide-fade"> -->
        <div v-if="isshowTag" class="mhome-signTag">
          <p @click="$routerto('fliter')">
            <i></i>
            <span>10</span>
          </p>
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
// let timeout;
import Scroll from "@/components/moblie/loadmore";

import ScrollTop from "@/components/moblie/common/toTop";
// import { log } from "util";
export default {
  name: "mhome",
  components: {
    "v-scroll": Scroll,
    ScrollTop
  },
  data() {
    return {
      isshowTag: false,
      text: "",
      loaded: false,
      refreshing: false,
      items: [
        {
          text: this.$t("common.Industry"),
          children: []
        }
      ],
      taglist: [
        {
          name: "Biodiversity",
          isactive: false
        },
        {
          name: "Transport",
          isactive: false
        },
        {
          name: "Computer",
          isactive: false
        },
        {
          name: "InnovFin",
          isactive: false
        },
        {
          name: "Comdputer",
          isactive: false
        },
        {
          name: "InnodvFin",
          isactive: false
        }
      ],
      isFixed: false,
      scrollHeight: 0,
      industry_title: this.$t("common.Industry"),
      usertype: "",
      activenum: 0, //行业下标
      activeIds: "", //行业id
      tags: {
        signUserList1: {
          text: this.$t("common.Pending"),
          number: 0
        },
        signUserList2: {
          text: this.$t("common.ToBeSigned"),
          number: 0
        },
        signUserList4: {
          text: this.$t("common.SignedForChain"),
          number: 0
        },
        signUserList5: {
          text: this.$t("common.ChainedForRecommendation"),
          number: 0
        },
        signUserList6: {
          text: this.$t("common.PendingReview"),
          number: 0
        },
        signUserList8: {
          text: this.$t("common.ReviewedPending"),
          number: 0
        },
        signUserList9: {
          text: this.$t("common.ToBeConfirmedByInvestors"),
          number: 0
        },
        signUserList10: {
          text: this.$t("common.SignedContract"),
          number: 0
        },
        signUserList3711: {
          text: this.$t("common.Rejected"),
          number: 0
        }
      },
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      // activeId: 1,
      searchkey: "",
      loading: false,
      finished: false,
      loadText: "Loading…",
      pageNum: 1,
      loadNumUp: 20,
      upGoodsInfo: [],
      industry_value: "", //行业value
      region_name: "",
      region_nametitle: "",
      region_title: this.$t("common.AllAreas"),
      countrylist: []
    };
  },
  created() {
    this.getcountrylist();
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight, true);
    this.scrollHeight = document.querySelector(
      ".van-search__content"
    ).offsetTop;
    console.log(this.scrollHeight);
    // document.querySelector.van-search__content
  },
  activated() {
    // this.usertype = this.$store.state.currentUsertype;
    // let axiosList = [
    //   this.$axios.get(
    //     `${this.$axios.defaults.baseURL}/bsl_web/base/getAllIndustry?X_Token=${this.$store.state.X_Token}`
    //   ),
    //   this.$axios.get(
    //     `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do?X_Token=${this.$store.state.X_Token}`
    //   )
    // ];
    // this.$axios.all(axiosList).then(
    //   this.$axios.spread((res1, res2) => {
    //     if (res1) {
    //       // console.log(this.$i18n.locale)
    //       if (this.$i18n.locale == "zh_CN") {
    //         for (let i = 0; i < res1.data.data.length; i++) {
    //           this.items[0].children.push({
    //             text: res1.data.data[i].industryNameCh,
    //             id: res1.data.data[i].industryId,
    //             num: i + 1
    //           });
    //         }
    //       } else {
    //         for (let i = 0; i < res1.data.data.length; i++) {
    //           this.items[0].children.push({
    //             text: res1.data.data[i].industryNameEn,
    //             id: res1.data.data[i].industryId,
    //             num: i + 1
    //           });
    //         }
    //       }
    //     }
    //     if (res2) {
    //       for (let i = 0; i < res2.data.data.length; i++) {
    //         this.countrylist.push({
    //           chinese: res2.data.data[i].countryZhname,
    //           eng: res2.data.data[i].countryEnname,
    //           value: i + 1,
    //           remark: res2.data.data[i].countryCode,
    //           classname: ""
    //         });
    //       }
    //       // console.log(this.countrylist)
    //     }
    //   })
    // );
    // this.loading = true
    // this.onLoad();
  },
  destroyed() {
    window.removeEventListener("scroll", this.initHeight, true);
  },
  methods: {
    initHeight() {
      // console.log(document.querySelector(".main"));

      let scrollTop = document.querySelector(".yo-scroll").scrollTop;
      console.log(scrollTop);
      
      // window.pageYOffset ||
      // document.documentElement.scrollTop ||
      // document.body.scrollTop;
      // console.log(scrollTop);

      this.isFixed = scrollTop > this.scrollHeight ? true : false;
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
      //   3. 在刷新方法内部进行自己的逻辑处理 此处调用了后台接口
      // this.onRefreshPort(done);
      // this.$global
      //   .get_encapsulation(
      //     `${this.$axios.defaults.baseURL}/bsl_web/project/getAllProject`,
      //     {
      //       searchKey: this.searchkey,
      //       pageIndex: this.pageNum,
      //       pageSize: this.loadNumUp,
      //       bslAreaCode: this.region_name,
      //       industryId: this.activeIds
      //     }
      //   )
      //   .then(res => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       let re = res.data.data.lists;
      //       if (re.length > 0) {
      //         this.upGoodsInfo = this.upGoodsInfo.concat(re);
      //         this.loading = false;
      //       }
      //       if (
      //         this.upGoodsInfo.length >= res.data.data.pageTotal ||
      //         this.upGoodsInfo.length == 0
      //       ) {
      //         this.finished = true;
      //       }
      //       this.pageNum++;
      //     } else {
      //       this.loading = false;
      //       this.finished = true;
      //     }
      //     // console.log(this.upGoodsInfo);
      //   });
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    /**
     * 上拉加载接口
     */
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
    tagClick(item) {
      console.log(item);
      item.isactive = !item.isactive;
    },
    // onRefresh() {
    //   this.finished = false;
    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true;
    //   this.upGoodsInfo = [];
    //   this.pageNum = 1;
    //   this.onLoad();
    // },
    select_country(remark, eng, chinese, idx) {
      console.log(remark, eng, chinese);
      if (this.$i18n.locale == "zh_CN") {
        this.region_title = chinese;
      } else {
        this.region_title = eng;
      }
      this.region_name = remark;
      this.countrylist_fetching = false;
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
      this.countrylist.forEach(item => {
        item.classname = "";
      });
      (this.countrylist[idx].classname = "country_isactive"),
        this.$refs.region.toggle();
    },
    search_region(val) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(this.ulHtml(val), 300);
    },
    handleChange(value) {
      this.form.investorsArea = this.region[value.key].chinese;
      this.countrylist_fetching = false;
      // console.log(this.form)
    },
    ulHtml(val) {
      this.countrylist = [];
      let arr = [];
      arr.push({
        chinese: "全部地区",
        eng: "All",
        value: 0,
        remark: "",
        classname: ""
      });
      this.countrylist_fetching = true;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: val
          }
        )
        .then(res => {
          if (res.data.data.length > 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              arr.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                value: i + 1,
                remark: res.data.data[i].countryCode,
                classname: ""
              });
            }
            this.countrylist = arr;
          }
          this.countrylist_fetching = false;
          console.log(this.countrylist);
        });
    },
    router(name, obj) {
      if (obj.arr && obj.arr.length > 0) {
        this.$routerto(name, obj);
      }
    },
    uniq(array) {
      var temp = []; //一个新的临时数组
      for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
          temp.push(array[i]);
        }
      }
      return temp;
    },
    routerto(item) {
      console.log(item);

      // this.$store.state.currentUsertype;
      if (this.$store.state.currentUsertype == 1) {
        let hash = [];
        for (var i = 0; i < item.signUserResp.length; i++) {
          if (hash.indexOf(item.signUserResp[i].signStatus) < 0) {
            hash.push(item.signUserResp[i].signStatus);
          }
        }
        if (hash.includes(3) || hash.includes(7) || hash.includes(11)) {
          hash = this.uniq(hash.concat(3, 7, 11));
        }
        if (item.signUserResp.length > 0) {
          this.$routerto("mysign", {
            projectId: item.projectId,
            array: JSON.stringify(hash)
          });
        } else if (item.signUserResp.length < 1) {
          let obj = {
            projectId: item.projectId,
            signStatus: item.signUserResp[0].signStatus,
            signId: item.signUserResp[0].signId
          };
          this.$routerto("p_goods_details", obj);
        }
      } else if (this.$store.state.currentUsertype == 3) {
        let obj = {
          projectId: item.projectId,
          signStatus: item.signUserResp[0].signStatus,
          signId: item.signUserResp[0].signId
        };
        this.$routerto("i_conected_project", obj);
        // this.$routerto("a_project_intro", { projectId: item.projectId });
      } else if (this.$store.state.currentUsertype == 4) {
        if (item.isSign == 1) {
          let obj = {
            projectId: item.projectId,
            signStatus: item.signUserResp[0].signStatus,
            signId: item.signUserResp[0].signId
          };
          if (item.signUserResp[0].signStatus < 5) {
            if (item.signUserResp[0].signStatus == 1) {
              this.$routerto("a_wait_review", obj);
            } else if (item.signUserResp[0].signStatus == 2) {
              this.$routerto("a_wait_signed", obj);
            } else if (item.signUserResp[0].signStatus == 3) {
              this.$routerto("a_sign_failed", obj);
            } else if (item.signUserResp[0].signStatus == 4) {
              this.$routerto("uploadtoblock", obj);
            }
          } else if (item.signUserResp[0].signStatus >= 5) {
            this.$routerto("a_project_intro", obj);
          }
        } else if (item.isSign == 0) {
          this.$routerto("a_project_intro", {
            projectId: item.projectId,
            isSign: "0",
            // signId: item.signUserResp[0].signId,
            signStatus: "0"
          });
        }
      }
    },

    onSearch() {
      // console.log(this.searchkey);
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
    },
    onClickNav(index) {
      this.mainActiveIndex = index;
    },
    onClickItem(data) {
      // console.log(data)
      if (this.activenum == data.num) {
        this.activenum = 0;
        this.activeIds = "";
        this.industry_title = this.$t("common.Industry");
      } else {
        this.activenum = data.num;
        this.activeIds = data.id;
        this.industry_title = this.items[0].children[this.activenum - 1].text;
      }
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
    },
    onLoad() {
      // this.loading = true;
      if (this.refreshing) {
        this.upGoodsInfo = [];
        this.refreshing = false;
      }
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/project/getAllProject`,
          {
            searchKey: this.searchkey,
            pageIndex: this.pageNum,
            pageSize: this.loadNumUp,
            bslAreaCode: this.region_name,
            industryId: this.activeIds
          }
        )
        .then(res => {
          if (res.status === 200) {
            let re = res.data.data.lists;
            if (re.length > 0) {
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
          // console.log(this.upGoodsInfo);
        })
        .catch(err => {
          // this.loadText = "加载失败";
          // document.querySelector(
          //   "#mhome .van-loading__circular"
          // ).style.display = "none";
          // let a = (document.querySelector("#mhome .van-loading__text").style =
          //   "margin-left:0");
          // console.log(a);
        });
    }
  }
};
</script>



<style lang="scss">
#mhome {
  .van-button--normal {
    font-size: vw(26);
  }
}
</style>

<style lang="scss" scoped>
#mhome {
  display: flex;
  height: 100%;
  flex-direction: column;

  main {
    // padding-bottom: 50px;
    height: 100%;
    position: relative;
    //  z-index: 200;
    // overflow: auto;
    .isFixed {
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 0;
    }
    .van-search {
      width: vw(598);
      background: #fff;
      margin: 0 auto;
      padding: 0;
      // padding: vw(10);
      z-index: 666;
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
    .searchContainer {
      z-index: 1;
      background: #fff;
    }
    .yo-scroll {
      position: absolute;
      top: 50px;
      bottom: 50px;
      -webkit-overflow-scrolling: touch;
    }
    .yo-scroll.Fixed {
      top: 0;
    }
    .yo-scrollTop {
      // top: 50px;
    }
    .mhome-tag {
      // padding-top: vw(62);
      li {
        display: flex;
        padding-left: vw(40);

        align-items: center;
        aside {
          width: vw(118);
          height: vw(34);
          font-size: vw(30);
          font-weight: bold;
          line-height: vw(34);
          color: #4f3dad;
          margin-right: vw(29);
        }
        div {
          display: flex;
          overflow-x: auto;
          flex: 1;
          margin-right: vw(20);
          color: #3ab5cc;
          p {
            height: vw(54);
            margin-right: vw(20);
            line-height: vw(54);
            border: vw(2) solid #3ab5cc;
            border-radius: vw(52);
            font-size: vw(26);
            font-weight: bold;
            padding: 0 vw(26);
          }
          p.isactive {
            background: #3ab5cc;
            color: #fff;
          }
        }
        div::-webkit-scrollbar {
          display: none;
        }
      }
      li:nth-of-type(2) {
        margin: vw(40) 0;
      }
    }
    .mhome-signTag {
      // padding: vw(62) 0;
      padding-left: vw(70);
      padding-top: vw(24);
      p {
        width: vw(124);
        display: flex;
        align-items: center;
        height: vw(54);
        justify-content: space-evenly;
        border: vw(2) solid #4f3dad;
        border-radius: vw(52);
        i {
          display: inline-block;
          width: vw(38);
          height: vw(38);
          background: #4f3dad;
          // margin-left: vw(26);
          // margin-right: vw(10);
        }
        span {
          // display: inline-block;
          width: vw(32);
          height: vw(32);
          align-self: center;
          font-weight: bold;
          text-align: center;
          // justify-self: center;
          background: #00f0ab;
          border-radius: 50%;
          color: #fff;
          font-size: vw(10);
        }
      }
    }
    .mhome-article {
      .timestamp {
        margin-top: vw(50);
        z-index: 180;
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

        // .item {
        //   // text-align: center;
        //   // align-self: center;
        // }
        // .item-1 {
        //   grid-area: 1 / 1 / 2 / 3;
        //   font-size: vw(30);
        //   line-height: vw(34);
        //   // height: vw(34);
        //   grid-row-gap: vw(20);
        //   font-size: vw(30);
        //   font-weight: bold;
        //   line-height: vw(34);
        //   // margin-bottom: vw(22);
        // }
        // .item-8 {
        //   grid-area: 5/ 1 / 6 / 3;
        //   font-size: vw(30);
        //   line-height: vw(34);
        //   // height: vw(34);
        //   font-size: vw(30);
        //   font-weight: bold;
        //   line-height: vw(34);
        //   // margin-bottom: vw(22);
        //   justify-self: flex-end;
        //   .van-button {
        //     width: vw(232);
        //     height: vw(72);
        //     background: #00f0ab;
        //     border-radius: vw(16);
        //     color: #fff;
        //   }
        // }
        // .item-2,
        // .item-4,
        // .item-6 .iconfont {
        //   // width: vw(30);
        //   // height: vw(30);
        //   font-size: vw(29);
        //   // margin-right: vw(33);
        //   // background: #4f3dad;
        //   align-self: flex-start;
        //   justify-self: center;
        // }
        // .item-3,
        // .item-5,
        // .item-7 p {
        //   // width: 542px;
        //   margin-bottom: vw(22);
        //   // height: vw(74);
        //   font-size: vw(24);
        //   align-self: flex-start;
        //   font-weight: bold;
        //   line-height: vw(30);
        // }
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
  #common_nav {
    // z-index: 200;
  }
  .topReduce {
    padding-top: vw(140);
  }
}
</style>
