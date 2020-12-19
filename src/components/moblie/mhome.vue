<template>
  <div id="mhome">
    <commonnav>
      {{$t('common.Home')}}
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main class="main">
      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
      >
        <div class="searchContainer">
          <van-search
            v-model="searchkey"
            :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
            shape="round"
            left-icon
          >
            <div slot="right-icon">
              <van-icon name="search" />
            </div>
          </van-search>
          <div>
            <p @click="$routerto('fliter')" style="width:20px;height:20px;background:#555"></p>
          </div>
        </div>
        <div class="mhome-tag">
          <ul>
            <li>
              <aside>{{$t('common.Industry')}}</aside>
              <div>
                <p
                  :class="{'isactive':item.isactive}"
                  @click="saveIndustryOfHits(item)"
                  v-for="item in Industrylist"
                  :key="item.value"
                >{{item.label}}</p>
              </div>
            </li>
            <li>
              <aside>{{$t('common.region')}}</aside>
              <div>
                <p
                  :class="{'isactive':item.isactive}"
                  @click="saveCountryOfHits(item)"
                  v-for="item in countrylist"
                  :key="item.remark"
                >{{item.label}}</p>
              </div>
            </li>
            <li>
              <aside>Tag</aside>
              <div>
                <p
                  :class="{'isactive':item.isactive}"
                  @click="saveProjectTagsOfHits(item)"
                  v-for="item in ProjectTags"
                  :key="item.value"
                >{{item.label}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="timestamp">
          <ul>
            <li v-for="i in Projectlist" :key="i.id">
              <h3 v-if="i.label">{{i.label.projectName}}</h3>
              <section id="container">
                <div class="item item-1">
                  <p class="icon iconRight iconfont icon-1"></p>
                </div>
                <div class="item item-2">
                  <p v-if="i.label">{{i.label.projectIndustry}}</p>
                </div>
                <div class="item item-3">
                  <p class="icon iconRight iconfont icon-2_1"></p>
                </div>
                <div class="item item-4">
                  <p v-if="i.label">{{i.label.projectTags}}</p>
                </div>
                <div class="item item-5">
                  <p class="icon iconRight iconfont icon-3"></p>
                </div>
                <div class="item item-6">
                  <p v-if="i.label">{{i.label.projectDescribe}}</p>
                </div>
              </section>
              <div class="btn">
                <van-button
                  v-if="$store.state.currentUsertype==4"
                  @click="$routerto('Interested',{projectId:i.id})"
                >{{$t('projectOwner.Interested')}}</van-button>
                <van-button
                  v-if="$store.state.currentUsertype==1"
                  @click="$routerto('Interested',{projectId:i.id})"
                >
                  <div class="investorProfile">
                    <nav>investor profile</nav>
                    <p style="display:flex;">
                      <span class="ellipse ellipse-left"></span>
                      <span class="investors">{{1>99?99+'+':5}}</span>
                      <span class="ellipse ellipse-right"></span>
                    </p>
                  </div>
                </van-button>
              </div>
            </li>
          </ul>
        </div>
      </v-scroll>
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
      industry_value: "", //行业value
      region_name: "",
      region_nametitle: "",
      region_title: this.$t("common.AllAreas"),
      countrylist: [],
      Projectlist: [],
      selectedCountrylist: [],
      selectedIndustrylist: [],
      selectedIndustrylistEn: [],
      Industrylist: [],
      ProjectTags: []
    };
  },
  created() {
    this.getCountryList();
    this.getAllProjectTags();
    this.getIndustryList();
    this.getAllProjectlist();
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight, true);
    this.scrollHeight = document.querySelector(
      ".van-search__content"
    ).offsetTop;
    // console.log(this.scrollHeight);
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
    getAllProjectTags() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/getAllProjectTags`
        )
        .then(res => {
          let lan = res.data.data.lan || this.$i18n.locale;
          this.ProjectTags = res.data.data.projectTagsList.map(item => {
            return {
              label: lan === "zh_CN" ? item.tagsName : item.tagsNameEn,
              value: item.id,
              isactive: false
            };
          });
          // console.log(this.Industrylist);
        });
    },
    getCountryList() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/getCountryList`
        )
        .then(res => {
          if (res.data.data.allCountryList.length > 0) {
            res.data.data.allCountryList.forEach((self, idx) => {
              this.countrylist.push({
                chinese: self.countryZhname,
                eng: self.countryEnname,
                label:
                  this.$i18n.locale === "zh_CN"
                    ? self.countryZhname
                    : self.countryEnname,
                value: idx,
                isactive: false,
                remark: self.countryCode
              });
            });
          }
        });
    },
    saveProjectTagsOfHits(item) {
      item.isactive = !item.isactive;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/saveProjectTagsOfHits`,
          { projectTagsId: item.id }
        )
        .then(res => {});
    },
    saveCountryOfHits(item) {
      item.isactive = !item.isactive;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/saveCountryOfHits`,
          { countryCode: item.remark }
        )
        .then(res => {});
    },
    saveIndustryOfHits(item) {
      // item.isactive = true;
      if (!item.isactive) {
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_web/index/saveCountryOfHits`,
            { industryId: item.industryId }
          )
          .then(res => {
            if (this.$i18n.locale === "zh_CN") {
              this.selectedIndustrylist.push(item.label);
            } else {
              this.selectedIndustrylistEn.push(item.label);
            }
            item.isactive = true;
            this.getAllProjectlist();
          });
      } else {
        item.isactive = false;
        if (this.$i18n.locale === "zh_CN") {
          this.selectedIndustrylist.forEach((self, idx) => {
            if (self == item.label) {
              this.selectedIndustrylist.splice(idx, 1);
            }
          });
        } else {
          this.selectedIndustrylistEn.forEach((self, idx) => {
            if (self == item.label) {
              this.selectedIndustrylistEn.splice(idx, 1);
            }
          });
        }
        this.getAllProjectlist();
        // this.selectedCountrylist.forEach((self, idx) => {
        //   if (self == item.label) {
        //     if (this.$i18n.locale === "zh_CN") {
        //       console.log(idx);
        //       this.selectedIndustrylist.splice(idx, 1);
        //     } else {

        //       this.selectedIndustrylistEn.splice(idx, 1);
        //     }
        //   }
        // });
        // console.log(this.selectedIndustrylistEn);
      }
    },
    getIndustryList() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/getIndustryList`
        )
        .then(res => {
          let lan = this.$i18n.locale;
          this.Industrylist = res.data.data.allIndustryList.map(item => {
            return {
              label:
                lan === "zh_CN" ? item.industryNameCh : item.industryNameEn,
              value: item.industryId,
              isactive: false
            };
          });
          console.log(this.Industrylist);
        });
    },
    initHeight() {
      // console.log(document.querySelector(".main"));

      let scrollTop = document.querySelector(".yo-scroll").scrollTop;
      // console.log(scrollTop);
      // window.pageYOffset ||
      // document.documentElement.scrollTop ||
      // document.body.scrollTop;
      // console.log(scrollTop);

      this.isFixed = scrollTop > this.scrollHeight ? true : false;
    },
    getAllProjectlist(done) {
      this.loaded = false;
      this.Projectlist = [];
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/project/getAllProject`,
          {
            bslAreaCode: [],
            projectIndustry: this.selectedIndustrylist,
            projectIndustryEn: this.selectedIndustrylistEn,
            tagsName: [],
            tagsNameEn: [],
            searchKey: this.searchkey
          }
        )
        .then(res => {
          this.loaded = true;
          if (done) done();
          if (res.data.resultCode === 10000) {
            this.Projectlist = res.data.data.data;
            if (this.$i18n.locale === "zh_CN") {
              this.Projectlist.forEach(item => {
                let label = {
                  projectIndustry: eval(
                    "(" + item.record.projectIndustry + ")"
                  ).join(","),
                  projectTags: eval("(" + item.record.projectTags + ")").join(
                    ","
                  ),
                  projectDescribe: item.record.projectDescribe
                };

                this.$set(item, "label", label);
              });
            } else {
              this.Projectlist.record.forEach(item => {
                let label = {
                  projectIndustry: eval(
                    "(" + item.record.projectIndustryEn + ")"
                  ).join(","),
                  projectName: item.record.projectNameEn,
                  projectTags: eval("(" + item.record.projectTagsEn + ")").join(
                    ","
                  ),
                  projectDescribe: item.record.projectDescribeEn
                };
                this.$set(item, "label", label);
              });
            }
          }
        })
        .catch(err => {
          this.loaded = true;
        });
    },
    onRefresh(done) {
      // console.log(done);

      // this.getAllProjectlist(done);
      this.getAllProjectlist(done);
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
                label:
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
    tagClick(item, type) {
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
      // top: 0;
    }
    .searchContainer {
      z-index: 1;
      display: flex;
      margin-left: vw(40);
      align-items: center;
      background: #fff;
      margin-bottom: vw(48);
      .van-search {
        width: vw(598);
        background: #fff;
        padding: 0;
        z-index: 666;
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
      position: absolute;
      top: 50px;
      bottom: 50px;
      -webkit-overflow-scrolling: touch;
    }
    .yo-scroll.Fixed {
      // top: 0;
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
            white-space: nowrap;
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
            h3 {
              // width: 600px;
              // height: vw(34);
              font-size: vw(30);
              line-height: vw(34);
              font-weight: bold;
              color: #4f3dad;
              margin-bottom: vw(22);
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
      }
      div.btn {
        display: flex;
        justify-content: flex-end;
        button {
          min-width: vw(232);
          height: vw(72);
          background: #00f0ab;
          border-radius: vw(16);
          color: #fff;
          border: none;
          .investorProfile {
            display: flex;
            align-items: center;
            nav {
              margin-right: vw(10);
            }
            span.ellipse {
              display: inline-block;
              height: vw(28);
              width: vw(14);
              background: #4f3dad;
            }
            span.ellipse-left {
              border-radius: vw(14) 0 0 vw(14);
            }
            span.ellipse-right {
              // border-radius: 0 45% 45% 0;
              border-radius: 0 vw(14) vw(14) 0;
            }
            span.investors {
              display: inline-block;
              // width: vw(28);
              height: vw(28);
              background: #4f3dad;
              line-height: vw(28);

              // padding: 0 vw(10);

              // opacity: 1;
            }
          }
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
