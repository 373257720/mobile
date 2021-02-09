<template>
  <div id="a_recommand_i">
    <commonnav>
      {{ title }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <van-checkbox-group
        :style="{ height: articleHight + 'px' }"
        checked-color="#00F0AB"
        v-model="result"
      >
        <van-cell-group ref="article">
          <van-cell
            clickable
            @click="toggle(idx)"
            ref="box"
            v-for="(item, idx) in recommendList"
            :key="idx"
          >
            <template #title>
              <h3>{{ item.recommendName.value }}</h3>
              <ul>
                <li>
                  <aside class="iconfont icon-bitbroicon_setting"></aside>
                  <article>
                    {{ $t($global.investorsType[item.recommendType.value]) }}
                  </article>
                </li>
                <li>
                  <aside class="iconfont icon-email"></aside>
                  <article>{{ item.recommendEmail.value }}</article>
                </li>
                <li>
                  <aside class="iconfont icon-star"></aside>
                  <article>
                    {{ $t("agent.Re") }}: 5 {{ $t("agent.times") }}
                  </article>
                </li>
                <li>
                  <aside class="iconfont icon-day"></aside>
                  <article>
                    {{ $t("agent.Rc") }}: 5 {{ $t("agent.days") }}
                  </article>
                </li>
              </ul>
            </template>
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <footer>
        <!-- <p class="drop">
          <van-icon
            @click="dropdown"
            :class="{ rotate1: rotate1 }"
            name="arrow-down"
          />
        </p> -->
        <div class>
          <span>{{ add }}</span>
          <span @click="$routerto('recommandMiddleman', $route.query)">+</span>
        </div>

        <div class="comfirm">
          <van-button @click="submit_click">Submit</van-button>
        </div>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  inject: ["recommendList", "restore"],
  // beforeRouteEnter(to, from, next) {
  //   if (from.name == "recent_recommand") {
  //     next((vm) => {
  //       vm.restore();
  //     });
  //   } else {
  //     next();
  //   }
  // },
  data() {
    return {
      articleHight: null,
      result: [],
      searchkey: "",
      boxHeight: null,
      towho: "",
    };
  },
  computed: {
    title() {
      if (this.$route.query.towho == 1) {
        return this.$t("agent.RM");
      } else if (this.$route.query.towho == 2) {
        return this.$t("agent.RecommendInvestors");
      }
    },
    add() {
      if (this.$route.query.towho == 1) {
        return this.$t("agent.RNM");
      } else if (this.$route.query.towho == 2) {
        return this.$t("agent.RecommendNewInvestors");
      }
    },
    rotate1() {
      if (this.articleHight > this.boxHeight * 2) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    // console.log(123);
    this.middlemanGetSuccessHistory(this.$route.query.towho);
  },

  mounted() {
    // this.boxHeight = this.$refs.box.clientHeight;
    // this.articleHight = this.$refs.box.clientHeight * 2;
  },
  methods: {
    middlemanGetSuccessHistory(num) {
      let a = 0;
      if (num == 1) {
        a = 0;
      } else if (num == 2) {
        a = 1;
      }
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectRecommendation/middlemanGetSuccessHistory`,
          {
            selectType : a,
          }
        )
        .then((res) => {});
    },
    submit_click() {
      let recommendListStr = [];
      recommendListStr = this.result.map((item) => {
        let recommendArea =
          (item.recommendArea.countryZhname || "") +
          "," +
          (item.recommendArea.countryEnname || "");
        if (item.recommendType.value == 1) {
          return {
            recommendType: item.recommendType.value,
            recommendEmail: item.recommendEmail.value,
            recommendName: item.recommendName.value,
            recommendArea: recommendArea,
          };
        } else if (item.recommendType.value == 2) {
          return {
            recommendType: item.recommendType.value,
            recommendEmail: item.recommendEmail.value,
            recommendCompany: item.recommendName.value,
            recommendArea: recommendArea,
          };
        }
      });
      // console.log(recommendListStr);
      if (recommendListStr.length) {
        // to 1 middle 2 investor
        if (this.$route.query.towho == 1) {
          this.recommendMiddleman(recommendListStr);
        } else if (this.$route.query.towho == 2) {
          this.recommendInvestor(recommendListStr);
        }
      } else {
        this.$toast("请选择至少一个");
      }
    },
    recommendInvestor(recommendListStr) {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/recommendInvestor`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            recommendListStr: recommendListStr,
          }
        )
        .then((res) => {
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode == 10000) {
                this.$routerto("mysign");
              }
            });
        });
    },

    recommendMiddleman(recommendListStr) {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/recommendMiddleman`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            recommendListStr: recommendListStr,
          }
        )
        .then((res) => {
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode == 10000) {
                this.$routerto("mysign");
              }
            });
        });
    },
    dropdown() {
      if (this.articleHight > this.$refs.box.clientHeight * 2) {
        this.articleHight = this.$refs.box.clientHeight * 2;
      } else {
        this.articleHight = this.$refs.article.clientHeight;
      }
    },
    toggle(index) {
      // console.log(index);
      this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    },
  },
};
</script>
<style lang="scss">
#a_recommand_i {
  .van-checkbox-group {
    // height: vw(700);
    overflow: hidden;
    transition: all 2s ease-out;
    // height: vw(300);
    // overflow-y: auto;
    .van-checkbox__icon .van-icon {
      width: vw(62);
      height: vw(62);
      line-height: vw(62);
      font-size: vw(40);
      border-color: #00f0ab;
    }
    .van-cell__title {
      color: #4f3dad;
      font-size: vw(30);
    }
    .van-cell {
      padding: 0;
      padding-bottom: vw(60);
      // padding-left: 0;
      // padding-right: 0;
    }
    .van-cell::after {
      border-bottom: none;
    }
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border-width: 0;
    }
  }
}
</style>
<style lang="scss"  scoped>
#a_recommand_i {
  main {
    // padding-top: vw(212);
    width: 100%;
    padding: vw(200) vw(60) vw(116) vw(92);
    p.drop {
      text-align: center;
      .van-icon-arrow-down {
        transform-origin: center center;
        transform: rotate(0deg); //返回原点
        transition: transform 1s ease-out;
      }
      .van-icon::before {
        font-size: vw(30);

        font-weight: bold;
      }
      .rotate1 {
        transform-origin: center center;
        transform: rotate(180deg);
        transition: transform 2s ease-out;
      }
    }
    h3 {
      font-size: vw(30);
      font-weight: bold;
      color: #4f3dad;
      margin-bottom: vw(22);
      opacity: 1;
    }
    li {
      display: flex;
      margin-bottom: vw(30);
      align-items: center;
      aside.iconfont {
        font-size: vw(30);
        line-height: vw(30);
        font-weight: bold;
        border-radius: 50%;
        margin-right: vw(28);
      }
      article {
        font-size: vw(24);
        font-weight: bold;
        line-height: vw(28);
        color: #4f3dad;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

    footer {
      // margin-top: vw(70);
      font-weight: bold;
      span {
        // width: 468px;
        font-size: vw(36);
        font-weight: bold;
        line-height: vw(42);
        color: #4f3dad;
      }
      span:nth-of-type(2) {
        display: inline-block;
        background: #00f0ab;
        width: vw(64);
        height: vw(64);
        border-radius: 50%;
        line-height: vw(64);
        text-align: center;
        color: #fff;
      }
      p.drop {
        display: flex;
        justify-content: center;
      }
      .comfirm {
        display: flex;
        margin-top: vw(144);
        justify-content: flex-end;
        button {
          height: vw(72);
          background: #00f0ab;
          border-radius: vw(16);
          font-size: vw(24);
          font-weight: bold;
          line-height: vw(72);
          color: #ffffff;
          span {
            // width: 468px;
            font-size: vw(24);
            font-weight: bold;
            line-height: vw(72);
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>

