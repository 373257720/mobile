<template>
  <div id="mhome">
    <div id="Nav">
      <nav class="Nav">
        <header>
          <!-- <van-icon name="arrow-left" /> -->
          <span>{{$t('common.Home')}}</span>
        </header>
        <van-search
          v-if="!isshowTag"
          v-model="searchkey"
          :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
          shape="round"
          left-icon
        >
          <div slot="right-icon">
            <van-icon name="search" />
          </div>
        </van-search>
      </nav>
    </div>
    <main :class="{'topReduce':isshowTag}">
      <div v-if="!isshowTag" class="mhome-tag">
        <ul>
          <li>
            <aside>Industry</aside>
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
            <aside>Industry</aside>
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
            <aside>Industry</aside>
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
        <p></p>
      </div>
      <!-- </transition> -->
      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
        :class="{'top':isshowTag}"
      >
        <div class="timestamp">
          <div
            id="container"
            @click="$routerto('projectStatus')"
            v-for="i in taglist"
            :key="i.name"
          >
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
              <van-button>{{$t('project.Projectchain')}}</van-button>
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
        <!-- <p v-if="loaded">加载完成</p> -->
      </v-scroll>
    </main>

    <!-- <header>
      <div>
        <img src="../../assets/f6055ec522305641848f75fcafc1e8e.jpg" alt />
      </div>
      <van-search
        v-model="searchkey"
        :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
        show-action
        shape="round"
        left-icon
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">
          <van-icon name="search" />
        </div>
      </van-search>
      <van-dropdown-menu>
        <van-dropdown-item :title="industry_title" v-model="industry_value" ref="item">
          <van-tree-select
            :items="items"
            :active-id="activeIds"
            :main-active-index="mainActiveIndex"
            @click-nav="onClickNav"
            @click-item="onClickItem"
          />
        </van-dropdown-item>
        <van-dropdown-item class="region_class" :title="region_title" ref="region">
          <van-search
            v-model="text"
            @input="search_region"
            :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
          />
          <a-spin v-if="countrylist_fetching" size="small" />
          <ul v-if="!countrylist_fetching && countrylist.length>0">
            <li
              v-for="d in countrylist"
              :class="d.classname"
              :key="d.remark"
              :value="d.value"
              @click="select_country(d.remark,d.eng,d.chinese,d.value)"
            >
              <span>{{d.eng}}</span>
              <span>{{d.chinese}}</span>
            </li>
          </ul>
          <ul style="max-height:200px" v-else-if="!countrylist_fetching &&  countrylist.length<1">
            <li>{{$t('common.NoMore')}}</li>
          </ul>
        </van-dropdown-item>
      </van-dropdown-menu>
    </header>
    <div id="main">
      <div class="main">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            :loading-text="loadText"
            :finished-text="$t('common.NoMore')"
            :error-text="$t('common.RequestFailed')"
            :offset="300"
          >
            <div v-for="(goods,idx) in  upGoodsInfo" :key="idx" class="goodlists">
              <article @click="routerto(goods)">
                <nav>{{goods.projectName}}</nav>
                <section>
                  <span>{{$t('common.Industry')}}:</span>
                  <span>{{goods.projectIndustry}}</span>
                </section>
                <section>
                  <span>{{$t('common.region')}}:</span>
                  <span>{{goods.projectArea}}</span>
                </section>
                <section>
                  <span>{{$t('common.ProjectDescription')}}:</span>
                  <span
                    v-html="goods.projectDescribe.length>90? goods.projectDescribe.substr(0, [90])+'...':goods.projectDescribe"
                  ></span>
                </section>
                <div class="tag" v-if="usertype==1">
                  <ul>
                    <li v-for="(item,key) in  tags" :key="item.text">
                      <div
                        v-if="goods.signUserList[key].length>0 && goods.signUserList[key][0].signCount"
                      >
                        <span class="spot"></span>
                        <span>{{item.text}}</span>
                        <span>({{goods.signUserList[key][0].signCount}})</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </article>
              <footer>
                <button
                  v-if="usertype==1"
                  :class="[goods.signUserList['signUserList10'][0].signCount>0?'isactive':'']"
                  @click="router('p_investor_lists',{arr: JSON.stringify(goods.signUserList['signUserList10'][0].investorsIdList) })"
                >{{$t('common.InformationOfContractedInvestors')}} ({{goods.signUserList['signUserList10'][0].signCount?goods.signUserList['signUserList10'][0].signCount:0}})</button>
                <button
                  class="isactive"
                  v-else-if="usertype==3"
                  @click="$routerto('i_conected_project',{projectId:goods.projectId,signStatus:goods.signUserResp[0].signStatus,signId:goods.signUserResp[0].signId})"
                >{{$t('common.ConnectedItems')}}</button>
                <button
                  class="isactive"
                  v-else-if="usertype==4"
                  @click="routerto(goods)"
                >{{$t('common.ItemsOfInterest')}}</button>
              </footer>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>-->
  </div>
</template>
<script>
// let timeout;
import Scroll from "./loadmore";
// import { log } from "util";
export default {
  name: "mhome",
  components: {
    "v-scroll": Scroll
  },
  data() {
    return {
      isshowTag: false,
      text: "",
      loaded: false,
      refreshing: false,
      countrylist_fetching: false,
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
        }
      ],
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
      countrylist: [
        {
          chinese: "全部地区",
          eng: "All",
          value: 0,
          remark: "",
          classname: ""
        }
      ]
    };
  },
  created() {
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

  methods: {
    onRefresh(done) {
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
    },
    tagClick(item) {
      console.log(item);
      item.isactive = !item.isactive;
      this.isshowTag = true;
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
  .slide-fade-enter-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>

<style lang="scss" scoped>
#mhome {
  display: flex;
  height: 100%;
  flex-direction: column;
  #Nav {
    width: 100%;
    font-weight: bold;
    position: fixed;
    top: 0;
    z-index: 200;
    background: #fff;
    line-height: vw(140);
    text-align: center;
    color: #4f3dad;
    font-size: vw(40);
    .van-search {
      width: vw(598);
      margin: 0 auto;
      padding: 0;
    }
    .van-search__content {
      border: vw(2) solid #3ab5cc;
      background: #fff;
      .van-icon-search,
      .van-icon-clear {
        color: #3ab5cc;
      }
    }
    nav.Nav {
      line-height: vw(140);
      header {
        height: vw(140);
        position: relative;
        .van-icon-arrow-left {
          position: absolute;
          left: vw(36);
          top: 50%;
          transform: (translate(0, -50%));
        }
      }
    }
  }
  main {
    padding-top: vw(212);
    .yo-scroll {
      top: vw(550);
    }
    .top {
      top: vw(332);
    }
    .mhome-tag {
      padding-top: vw(62);

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
      p {
        width: vw(124);
        height: vw(54);
        border: vw(2) solid #4f3dad;
        border-radius: vw(52);
      }
    }
    .mhome-article {
      #container {
        padding: 0 vw(70);
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
  }
  .topReduce {
    padding-top: vw(140);
  }
}
</style>
