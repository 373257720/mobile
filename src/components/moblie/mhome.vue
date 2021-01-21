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
        <div slot="navv" class="box">
          <div class="searchContainer">
            <van-search
              v-model="searchkey"
              :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
              shape="round"
              left-icon
            >
              <div slot="right-icon">
                <van-icon name="search" @click="search" />
              </div>
            </van-search>
            <div class="fliter">
              <img @click="$routerto('fliter')" src="../../assets/fliter.png" alt />
              <!-- <p @click="$routerto('fliter')" ></p> -->
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
                <aside>{{$t('common.Tag')}}</aside>
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
                <van-button v-if="$store.state.currentUsertype==1">
                  <div class="investorProfile">
                    <nav>investor profile</nav>
                    <p style="display:flex;">
                      <span class="ellipse ellipse-left"></span>
                      <span class="investors">{{0}}</span>
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
    <scroll-top></scroll-top>
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
      text: "",
      loaded: false,
      usertype: "",
      Refreshing: false,
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
      searchkey: "",
      pageNum: 1,
      loadNumUp: 20,
      countrylist: [],
      Projectlist: [],
      Industrylist: [],
      ProjectTags: [],
      source: null,
      selectedCountrylist: [],
      selectedIndustrylist: [],
      selectedIndustrylistEn: [],
      selectedtagsNamelist: [],
      selectedtagsNamelistEn: []
    };
  },
  created() {
    this.getCountryList();
    this.getAllProjectTags();
    this.getIndustryList();
    this.getAllProjectlist();
  },
  mounted() {
    // window.addEventListener("scroll", this.initHeight, true);
    // this.scrollHeight = document.querySelector(
    //   ".van-search__content"
    // ).offsetTop;
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
  beforeDestroy() {
    // window.removeEventListener("scroll", this.initHeight, true);
  },
  methods: {
    cancelAxios() {
      this.source.cancel("interrupt");
    },
    getAllProjectTags() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/getAllProjectTags`
        )
        .then(res => {
          let lan = this.$i18n.locale;
          this.ProjectTags = res.data.data.projectTagsList.map(item => {
            return {
              label: item['tagsName'+ this.$global.lan()],
              value: item.id,
              isactive: false
            };
          });
        });
    },
    getCountryList() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/getCountryList`
        )
        .then(res => {
          if (res.data.resultCode === 10000) {
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
          }
        });
    },
    saveProjectTagsOfHits(item) {
      if (!this.Refreshing) {
        if (item.isactive) {
          item.isactive = false;
          this['selectedtagsNamelist' + this.$global.lan()].forEach(
            (self, idx) => {
              if (self == item.label) {
                this['selectedtagsNamelist' + this.$global.lan()].splice(idx, 1);
              }
            }
          );
          this.cancelAxios();
          this.getAllProjectlist();
        } else {
          this.$global
            .get_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_web/index/saveProjectTagsOfHits`,
              { projectTagsId: item.id }
            )
            .then(res => {
              this['selectedtagsNamelist' + this.$global.lan()].push(item.label);
              item.isactive = true;
              this.cancelAxios();
              this.getAllProjectlist();
            });
        }
      }
      // item.isactive = !item.isactive;
    },
    saveCountryOfHits(item) {
      if (!this.Refreshing) {
        if (item.isactive) {
          item.isactive = false;
          this.selectedCountrylist.forEach((self, idx) => {
            if (self == item.remark) {
              this.selectedCountrylist.splice(idx, 1);
            }
          });
          this.cancelAxios();
          this.getAllProjectlist();
        } else {
          this.$global
            .get_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_web/index/saveCountryOfHits`,
              { countryCode: item.remark }
            )
            .then(res => {
              if (res.data.resultCode === 10000) {
                this.selectedCountrylist.push(item.remark);
              }
              item.isactive = true;
              this.cancelAxios();
              this.getAllProjectlist();
            });
        }
      }
      // item.isactive = !item.isactive;
    },
    saveIndustryOfHits(item) {
      // item.isactive = true;
      if (!this.Refreshing) {
        if (!item.isactive) {
          this.$global
            .get_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_web/index/saveIndustryOfHits`,
              { industryId: item.industryId }
            )
            .then(res => {
              this['selectedIndustrylist' + this.$global.lan()].push(item.label);
              item.isactive = true;
              this.cancelAxios();
              this.getAllProjectlist();
            });
        } else {
          item.isactive = false;
          this['selectedIndustrylist' + this.$global.lan()].forEach(
            (self, idx) => {
              if (self == item.label) {
                this['selectedIndustrylist' + this.$global.lan()].splice(idx, 1);
              }
            }
          );
          this.cancelAxios();
          this.getAllProjectlist();
        }
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
          // console.log(this.Industrylist);
        });
    },
    initHeight() {
      let scrollTop = document.querySelector(".yo-scroll").scrollTop;
      // this.isFixed = scrollTop > this.scrollHeight ? true : false;
    },
    getAllProjectlist(done) {
      let self = this;
      this.loaded = false;
      this.Projectlist = [];
      this.source = this.$axios.CancelToken.source();
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/project/getAllProject`,
          {
            bslAreaCode: this.selectedCountrylist,
            projectIndustry: this.selectedIndustrylist,
            projectIndustryEn: this.selectedIndustrylistEn,
            tagsName: this.selectedtagsNamelist,
            tagsNameEn: this.selectedtagsNamelistEn,
            searchKey: this.searchkey
          },
          {
            cancelToken: this.source.token
          }
        )
        .then(res => {
          this.loaded = true;
          if (done) {
            done();
            this.Refreshing = false;
          }
          this.Projectlist = res.data.data.data;
          this.Projectlist.forEach(item => {
            let label = {
              projectIndustry:
                item.record["projectIndustry" + self.$global.lan()].indexOf(
                  "["
                ) < 0
                  ? item.record["projectIndustry" + self.$global.lan()]
                  : eval(
                      "(" +
                        item.record["projectIndustry" + self.$global.lan()] +
                        ")"
                    ).join(","),
              projectName: item.record["projectName" + self.$global.lan()],
              projectTags:
                item.record["projectTags" + self.$global.lan()].indexOf("[") < 0
                  ? item.record["projectTags" + self.$global.lan()]
                  : eval(
                      "(" +
                        item.record["projectTags" + self.$global.lan()] +
                        ")"
                    ).join(","),
              projectDescribe:
                item.record["projectDescribe" + self.$global.lan()]
            };
            this.$set(item, "label", label);
          });
          // console.log(this.Projectlist[0].label.fun());
        });
    },
    onRefresh(done) {
      this.Refreshing = true;
      this.cancelAxios();
      this.getAllProjectlist(done);
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    search() {
      this.getAllProjectlist();
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
    }
  }
};
</script>



<style lang="scss">
#mhome {
  .van-button--normal {
    font-size: vw(26);
  }
  .yo-scroll .inner {
    position: relative;
    z-index: 8;
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
    // overflow-y: auto;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    top: 50px;

    .box {
      position: relative;
      z-index: 100;

      .searchContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        margin-bottom: vw(48);
        .fliter {
          img {
            width: vw(53);
            height: vw(53);
          }
        }
        .van-search {
          width: vw(598);
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

      .mhome-tag {
        background: #fff;
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
    }

    .yo-scroll {
      z-index: 1;
      // position: relative;
      // height: 100%;
      // overflow: initial;
      background: #fff;
      top: 0;
      transition: all 1s ease;
      -webkit-overflow-scrolling: touch;
    }
    .yo-scroll.Fixed {
      // top: 0;
    }
    .yo-scrollTop {
      // top: 50px;
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

  .topReduce {
    padding-top: vw(140);
  }
}
</style>
