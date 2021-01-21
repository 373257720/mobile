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
        <div class="logo">
          <img @click="$routerto('fliter')" src="../../../assets/fliter.png" alt />
          <span>{{$store.getters.totalResults && $store.getters.totalResults.length}}</span>
        </div>
        <ul class="totalResults">
          <li v-for="(item) in $store.getters.totalResults" :key="item.name">
            <p>
              {{item.label}}
              <!-- <span @click="delectTag(item,idx)"></span> -->
            </p>
          </li>
        </ul>
      </div>
      <div class="timestamp">
        <ul v-if="Projectlist.length">
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
        <div class="nodata" v-else>{{$t('common.Nodata')}}</div>
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
        this.$store.state.electedList[key].forEach(item => {
          this["selectedIndustrylist" + this.$global.lan()].push(item.value);
        });
      } else if ((key = "regionList")) {
        this.$store.state.electedList[key].forEach(item => {
          this.selectedCountrylist.push(item.value);
        });
      } else if ((key = "taglist")) {
        this.$store.state.electedList[key].forEach(item => {
          this["selectedtagsNamelist" + this.$global.lan()].push(item.value);
        });
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
          this.Projectlist.forEach(item => {
            let label = {
              projectName:item.record['projectName'+this.$global.lan()],
              projectIndustry: eval(
                "(" + item.record["projectIndustry" + this.$global.lan()] + ")"
              ).join(","),
              projectTags: eval(
                "(" + item.record["projectTags" + this.$global.lan()] + ")"
              ).join(","),
              projectDescribe:
                item.record["projectDescribe" + this.$global.lan()]
            };
            this.$set(item, "label", label);
          });
          // console.log(this.Projectlist);
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
  main {
    height: 100%;
    position: relative;
    overflow-y: auto;
    padding-bottom: 50px;
    .mhome-signTag {
      // padding: vw(62) 0;
      display: flex;
      margin-bottom: vw(60);
      // flex-wrap: wrap;
      // align-items: center;
      padding: 0 vw(70);
      padding-top: vw(24);
      .logo {
        margin-right: vw(30);
        width: vw(53);
        height: vw(53);
        position: relative;
        img {
          width: vw(53);
          height: vw(53);
          position: absolute;
          top: 0;
          left: 0;
        }
        span {
          position: absolute;
          top: 0;
          right: 0;
          background: #00f0ab;
          width: vw(34);
          height: vw(34);
          border-radius: 50%;
          line-height: vw(34);
          transform: translate(50%, -50%);
          font-size: vw(20);
          text-align: center;
          color: #fff;
        }
      }
      .totalResults {
        flex: 1;
        display: flex;
        // flex-wrap: wrap;
        flex-flow: row wrap;

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
      z-index: 180;
      ul {
        li {
          margin-bottom: vw(40);
          font-weight: bold;
          padding: 0 vw(70);
          h3 {
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
      .nodata {
        text-align: center;
        color: #4f3dad;
        font-size: vw(30);
      }
    }
  }
}
</style>
