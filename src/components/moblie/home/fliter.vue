<template>
  <div id="fliter">
    <commonnav>
      {{ $t("common.Fliter") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$routerto('mhome')" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
      <div class="fliter-tag">
        <ul class="totalResults">
          <li v-for="(item, idx) in $store.getters.totalResults" :key="idx">
            <p>
              {{ item["label" + $global.language()] }}
              <span @click="delectTag(item, idx)"></span>
            </p>
          </li>
        </ul>
        <article>
          <div>
            <p class="label">{{ $t("common.Industry") }}</p>
            <div class="item" @click="goto('Industry')">
              <p>
                <span>{{ electedindustryList }}</span>
              </p>
              <van-icon name="arrow" />
            </div>
          </div>
          <div>
            <p class="label">{{ $t("common.region") }}</p>
            <div class="item" @click="goto('Region')">
              <p>
                <span>{{ electedregionList }}</span>
              </p>
              <van-icon name="arrow" />
            </div>
          </div>
          <div>
            <p class="label">{{ $t("common.Tag") }}</p>
            <div class="item" @click="goto('Tag')">
              <p>
                <span>{{ electedtaglist }}</span>
              </p>
              <van-icon name="arrow" />
            </div>
          </div>
        </article>
      </div>
      <footer>
        <van-button @click="$routerto('AllResult')">{{
          $t("common.Search")
        }}</van-button>
      </footer>
    </main>
    <transition
      v-on:after-enter="afterEnterFun"
      v-on:after-leave="afterLeave"
      name="slide-fade"
    >
      <keep-alive>
        <div
          class="secondLayer"
          @fromKids="pick"
          :result="result"
          :List="List"
          :afterEnter.sync="afterEnter"
          :GoToname="GoToname"
          :is="currentView"
        ></div>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import mutilPick from "@/components/moblie/home/mutilPick";
export default {
  name: "fliter",
  components: {
    "mutil-Pick": mutilPick,
  },
  data() {
    return {
      GoToname: "",
      currentView: "",
      afterEnter: false,
      List: {
        industryList: [],
        regionList: [],
        taglist: [],
      },
      result: {
        industryList: [],
        regionList: [],
        taglist: [],
      },
    };
  },
  computed: {
    electedindustryList() {
      let arr = this.$store.state.electedList.industryList.map((item) => {
        return item["label" + this.$global.language()];
      });
      return arr.length ? arr.join(",") : "";
      // return arr
    },
    electedregionList() {
      let arr = this.$store.state.electedList.regionList.map((item) => {
        return item["label" + this.$global.language()];
      });
      return arr.length ? arr.join(",") : "";
    },
    electedtaglist() {
      let arr = this.$store.state.electedList.taglist.map((item) => {
        return item["label" + this.$global.language()];
      });
      return arr.length ? arr.join(",") : "";
    },
  },
  created() {
    for (let key in this.$store.state.electedList) {
      if (key == "industryList") {
        this.result.industryList = this.$store.state.electedList[key].map(
          (element) => {
            return element.value;
          }
        );
      } else if (key == "regionList") {
        this.result.regionList = this.$store.state.electedList[key].map(
          (element) => {
            return element.value;
          }
        );
      } else if (key == "taglist") {
        this.result.taglist = this.$store.state.electedList[key].map(
          (element) => {
            return element.value;
          }
        );
      }
    }
  },
  mounted() {
    // if (document.querySelector("#mutil-Pick")) {
    //   document
    //     .querySelector("#mutil-Pick")
    //     .addEventListener("animationend", function() {
    //       console.log(23);
    //     });
    // }
    // dsfdsfdsfdsfds
  },
  methods: {
    afterEnterFun(el) {
      this.afterEnter = true;
    },
    afterLeave(el) {
      this.afterEnter = false;
    },
    pick(data) {
      if (this.GoToname == "Industry") {
        let a = this.List.industryList.filter((item) => {
          for (let i = 0; i < data.industryList.length; i++) {
            if (item.value === data.industryList[i]) {
              return item;
            }
          }
        });
        this.$store.commit("electedList", { arr: a, name: "industryList" });
      } else if (this.GoToname == "Region") {
        let a = this.List.regionList.filter((item) => {
          for (let i = 0; i < data.regionList.length; i++) {
            if (item.value === data.regionList[i]) {
              return item;
            }
          }
        });
        this.$store.commit("electedList", { arr: a, name: "regionList" });
      } else if (this.GoToname == "Tag") {
        let a = this.List.taglist.filter((item) => {
          for (let i = 0; i < data.taglist.length; i++) {
            if (item.value === data.taglist[i]) {
              return item;
            }
          }
        });
        this.$store.commit("electedList", { arr: a, name: "taglist" });
      }
      this.currentView = "";
    },
    goto(name) {
      this.GoToname = name;
      this.currentView = "mutil-Pick";
    },
    delectTag(item, idx) {
      if (item.key === "industry") {
        for (let i = 0; i < this.result.industryList.length; i++) {
          if (this.result.industryList[i] === item.value) {
            this.$store.commit("delect", {
              index: i,
              name: "industryList",
            });
            this.result.industryList.splice(i, 1);
          }
        }
      } else if (item.key === "region") {
        for (let i = 0; i < this.result.regionList.length; i++) {
          if (this.result.regionList[i] === item.value) {
            this.$store.commit("delect", {
              index: i,
              name: "regionList",
            });
            this.result.regionList.splice(i, 1);
          }
        }
      } else if (item.key === "tag") {
        for (let i = 0; i < this.result.taglist.length; i++) {
          if (this.result.taglist[i] === item.value) {
            this.$store.commit("delect", {
              index: i,
              name: "taglist",
            });
            this.result.taglist.splice(i, 1);
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#fliter {
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.4s ease;
    // position: fixed;
  }

  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(100%);
    // opacity: 0;
  }
  .secondLayer {
    position: fixed;
    z-index: 201;
    top: 0;
    height: 100%;
    width: 100%;
    background: #fff;
  }
  main {
    // padding-top: vw(212);
    width: 100%;
    padding: vw(140) vw(60) vw(116) vw(60);
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
    article {
      p.label {
        font-size: vw(40);
        font-weight: bold;
        color: #4f3dad;
        opacity: 1;
        margin-bottom: vw(56);
      }
      div.item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: vw(142);
        color: #4f3dad;
        p {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        span {
          font-size: vw(30);
        }
        i {
          font-size: vw(40);
        }
      }
    }
    footer {
      display: flex;
      justify-content: center;
      button {
        width: vw(528);
        height: vw(114);
        border: none;
        background: #00f0ab;
        border-radius: vw(40);
        font-size: vw(40);
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>

