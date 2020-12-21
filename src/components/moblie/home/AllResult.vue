<template>
  <div id="allresult">
    <commonnav>
      ALL result
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main class="yo-scroll">
      <div class="mhome-signTag">
        <ul class="totalResults">
          <li>
            <!-- <p class="numbers" @click="$routerto('fliter')">
            <i></i>-->
            <p
              @click="$routerto('fliter')"
            >{{$store.getters.totalResults && $store.getters.totalResults.length}}</p>
            <!-- </p> -->
          </li>
          <li v-for="(item) in $store.getters.totalResults" :key="item.name">
            <p>
              {{item.label}}
              <!-- <span @click="delectTag(item,idx)"></span> -->
            </p>
          </li>
        </ul>
      </div>
      <div class="timestamp">
        <ul>
          <li @click="$routerto('projectStatus')" v-for="i in Projectlist" :key="i.remark">
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
  name: "allresult",
  components: {
    "v-scroll": Scroll,
    ScrollTop
  },
  data() {
    return {
      text: "",
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
      upGoodsInfo: [],
      industry_value: "", //行业value
      region_name: "",
      region_nametitle: "",
      region_title: this.$t("common.AllAreas"),
      selectedCountrylist: [],
      Projectlist: [],
      selectedIndustrylist: [],
      selectedIndustrylistEn: [],
      selectedtagsNamelist: [],
      selectedtagsNamelistEn: []
    };
  },
  computed: {},
  created() {
    for (let key in this.$store.state.electedList) {
      if (key == "industryList") {
        if (this.$i18n.locale == "zh_CN") {
          this.$store.state.electedList[key].forEach(item => {
            this.selectedIndustrylist.push(item.value);
          });
        } else {
          this.$store.state.electedList[key].forEach(item => {
            this.selectedIndustrylistEn.push(item.value);
          });
        }
      } else if ((key = "regionList")) {
        this.$store.state.electedList[key].forEach(item => {
          this.selectedCountrylist.push(item.value);
        });
      } else if ((key = "taglist")) {
        if (this.$i18n.locale == "zh_CN") {
          this.$store.state.electedList[key].forEach(item => {
            this.selectedtagsNamelist.push(item.value);
          });
        } else {
          this.$store.state.electedList[key].forEach(item => {
            this.selectedtagsNamelistEn.push(item.value);
          });
        }
      }
    }
    this.getAllProjectlist();
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight, true);
    this.scrollHeight = document.querySelector(".mhome-signTag").offsetTop;
  },
  activated() {},
  destroyed() {
    window.removeEventListener("scroll", this.initHeight, true);
  },
  methods: {
    getAllProjectlist() {
      this.$store.commit("isloading", true);
      this.Projectlist = [];
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
          }
        )
        .then(res => {
          this.$store.commit("isloading", false);
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    initHeight() {
      let scrollTop = document.querySelector(".yo-scroll").scrollTop;
      this.isFixed = scrollTop > this.scrollHeight ? true : false;
    },
    tagClick(item, type) {
      console.log(item);
      item.isactive = !item.isactive;
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
    }
  }
};
</script>



<style lang="scss">
#allresult {
  .van-button--normal {
    font-size: vw(26);
  }
}
</style>

<style lang="scss" scoped>
#allresult {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 50px 0 0 0;
  .yo-scroll {
    top: 0;
  }
  main {
    // padding-bottom: 50px;
    height: 100%;
    position: relative;
    overflow-y: auto;
    padding-bottom: 50px;
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
      padding: 0 vw(70);
      padding-top: vw(24);

      .totalResults {
        display: flex;
        // flex-wrap: wrap;
        flex-flow: row wrap;
        margin-bottom: vw(60);
        // padding-top: vw(10);
        li {
          color: #3ab5cc;
          height: vw(53);
          border: vw(2) solid #3ab5cc;
          border-radius: vw(52);
          padding: 0 vw(26);
          margin-right: vw(20);
          margin-bottom: vw(10);
          p {
            font-size: vw(26);
            line-height: vw(53);
            span {
              // transform: rotate(90deg);
              display: inline-block;
              position: relative;
              width: vw(18);
              height: vw(18);
              &:before,
              &:after {
                position: absolute;
                content: " ";
                background-color: #3ab5cc;
                left: vw(8);
                width: vw(2);
                height: vw(18);
              }
              &:before {
                transform: rotate(45deg);
              }
              &:after {
                transform: rotate(-45deg);
              }
            }
            // &::after {
            //   content: "+";
            //   margin-left: vw(10);
            // }
          }
        }
      }
      p.numbers {
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

  .topReduce {
    padding-top: vw(140);
  }
}
</style>
