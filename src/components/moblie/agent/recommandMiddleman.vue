<template>
  <div id="a_recommand_i">
    <commonnav>
      {{ title }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h3>{{ add }}</h3>
      <div
        :style="{ height: articleHight + 'px' }"
        class="article"
        ref="article"
      >
        <div class="box" ref="box" v-for="(item, idx) in list" :key="idx">
          <p class="title">
            <span class="serial">{{ idx + 1 }}</span>
            <van-button v-if="list.length > 1" @click="delectItem(idx)">
              <van-icon name="close" />
            </van-button>
          </p>
          <!-- <div class="mui-input-row input-row">
            <p class="label">{{ item.recommendEmail.label }}</p>
            <dropdown
              :item-click="dropDownClick"
              :isNeedSearch="true"
              :itemlist="itemlist"
            ></dropdown>
          </div> -->
          <div class="mui-input-row input-row">
            <p class="label">{{ item.recommendType.label }}</p>
            <!-- <input name="userName" type="text" v-model="validateForm.username" /> -->
            <a-select
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode;
                }
              "
              :value="item.recommendType.value"
              placeholder="Select"
              size="large"
              @change="
                (value, option) => {
                  handleChange(value, option, item);
                }
              "
            >
              <span slot="suffixIcon" class="iconfont icon-bitbroicon12"></span>
              <a-select-option
                v-for="item in genusList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{ item.recommendEmail.label }}</p>
            <input
              name="Password"
              type="text"
              v-model="item.recommendEmail.value"
            />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{ item.recommendName.label }}</p>
            <input
              name="Password"
              type="text"
              v-model="item.recommendName.value"
            />
          </div>
          <div class="mui-input-row input-row Region">
            <p class="label">{{ item.recommendArea.label }}</p>
            <a-select
              show-search
              placeholder="Select"
              size="large"
              :value="item.recommendArea.value"
              :filterOption="false"
              @change="
                (value, option) => {
                  handleRegionChange(value, option, item);
                }
              "
              @search="handleSearch"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode;
                }
              "
              :not-found-content="
                regionList.length ? undefined : $t('common.Nodata')
              "
            >
              <span slot="suffixIcon" class="iconfont icon-bitbroicon12"></span>
              <a-select-option
                v-for="item in regionList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </div>
        </div>
      </div>
      <footer>
        <p class="drop">
          <van-icon @click="additem" name="plus" />
        </p>
        <p class="error">{{ errorsMsg }}</p>
        <div class="comfirm">
          <van-button @click="submit_click">comfirm</van-button>
        </div>
      </footer>
    </main>
  </div>
</template>
<script>
import { Icon } from "ant-design-vue";
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
import Dropdown from "@/components/moblie/common/dropdown";
export default {
  name: "mhome",
  props: {
    recommendList: Array,
  },
  components: {
    IconFont,
    Dropdown,
  },
  data() {
    return {
      one: 0,
      articleHight: null,
      itemlist: {
        cur: {
          val: "",
          name: "所有产品",
        },
        data: [
          {
            val: "",
            name: "所有产品",
          },
          {
            val: 1,
            name: "梦幻西游",
          },
          {
            val: 2,
            name: "梦幻无双",
          },
          {
            val: 3,
            name: "大话西游",
          },
        ],
      },
      list: [
        {
          recommendType: { label: "Middleman genus", value: null },
          recommendEmail: { label: "Middleman email", value: "" },
          recommendName: { label: "Middleman name", value: "" },
          recommendArea: { label: "Region", value: "" },
          surplusLockCount: {
            label: "surplusLockCount",
            value: 0,
          },
          surpluslockDay: {
            label: "surpluslockDay",
            value: 0,
          },
        },
      ],
      genusList: [
        {
          value: 1,
          label: this.$t("common.individual"),
        },
        {
          value: 2,
          label: this.$t("common.company"),
        },
      ],
      regionList: [],
      searchkey: "",
      Searchtimer: null,
      isdisabled: false,
      errorsMsg: "",
      boxHeight: null,
      isSearch: true,
      validateForm: {
        username: "",
        password: "",
      },
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
      if (this.articleHight > this.boxHeight * 1) {
        return true;
      } else {
        return false;
      }
    },
  },

  created() {
    // console.log(this.recommendList);
    this.getCountryList();
  },
  mounted() {
    // console.log(this.$refs.box);
    // this.boxHeight = this.$refs.box[0].clientHeight * 1;
    // this.articleHight = this.$refs.box[0].clientHeight * 1;
  },
  methods: {
    dropDownClick(e) {
      console.log(e.name, e.val);
    },
    getCountryList(searchKey) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: searchKey,
          }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            if (res.data.data.length) {
              this.regionList = res.data.data.map((self, idx) => {
                return {
                  label: self["country" + this.$global.countryLan() + "name"],
                  countryZhname: self.countryZhname,
                  countryEnname: self.countryEnname,
                  value: self.countryCode,
                  // key: "region",
                };
              });
            } else {
              this.regionList = [];
            }
          }
          // this.loaded = true;
          // if (done) done();
        });
    },
    handleChange(value, option, item) {
      item.recommendType.value = value;
      // this.one = value;
      // console.log(value); // { key: "lucy", label: "Lucy (101)" }
    },
    handleSearch(value) {
      if (this.Searchtimer) {
        clearTimeout(this.Searchtimer);
      }
      this.Searchtimer = setTimeout(() => {
        this.getCountryList(value);
      }, 400);
    },
    handleRegionChange(value, option, item) {
      item.recommendArea.value = value;
      this.regionList.forEach((self) => {
        if (self.value == value) {
          item.recommendArea = Object.assign(item.recommendArea, {
            countryZhname: self.countryZhname,
            countryEnname: self.countryEnname,
          });
          // this.$set(item.recommendArea, "countryZhname", self.countryZhname);
          // this.$set(
          //   item.recommendArea,
          //   "countryEnname",
          //   self.countryEnname
          // );
        }
      });

      console.log(item);
    },
    submit_click() {
      console.log(this.list);
      this.errorsMsg = "";
      let errorMsg = this.validateFunc("submit");
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        return false;
      }
      let singelObj = {
        recommendType: null,
        recommendEmail: "",
        // recommendName: "",
        recommendArea: "",
        surplusLockCount: 0,
        surpluslockDay: 0,
        signId: this.$route.query.signId,
        middlemanId: this.$route.query.middlemanId,
      };
      let sw = this.recommendList.every((item) => {
        return (
          item.recommendEmail.value !=
          this.list[this.list.length - 1].recommendEmail.value
        );
      });
      if (sw) {
        for (var key in this.list[this.list.length - 1]) {
          for (var i in singelObj) {
            if (key == i) {
              singelObj[i] = this.list[this.list.length - 1][key].value;
            }
          }
        }
        if (singelObj.recommendType == 1) {
          singelObj.recommendName = this.list[this.list.length - 1][
            "recommendName"
          ].value;
        } else if (singelObj.recommendType == 2) {
          singelObj.recommendCompany = this.list[this.list.length - 1][
            "recommendName"
          ].value;
        }
        console.log(this.list);
        if (this.$route.query.towho == 1) {
          this.recommendMiddlemanCheck(singelObj).then((res) => {
            if (res.data.resultCode === 10000) {
              this.recommendList.push(...this.list);
              console.log(this.recommendList);
              this.$replaceto("a_recommand_i", this.$route.query);
            } else {
              this.$dialog
                .alert({
                  message: res.data.resultDesc,
                })
                .then(() => {});
            }
          });
        } else if (this.$route.query.towho == 2) {
          this.recommendInvestorCheck(singelObj).then((res) => {
            if (res.data.resultCode === 10000) {
              this.recommendList.push(...this.list);
              this.$replaceto("a_recommand_i", this.$route.query);
            } else {
              this.$dialog
                .alert({
                  message: res.data.resultDesc,
                })
                .then(() => {});
            }
          });
        }
      } else {
        this.$toast("不能添加重复的邮箱");
      }
    },
    validateFunc(word) {
      let self = this;
      let validator = new this.$Validator();
      let Singeobj = this.list[this.list.length - 1];
      for (let key in Singeobj) {
        if (key == "recommendEmail") {
          validator.add(Singeobj[key].value, [
            [
              "isNotEmpty",
              Singeobj[key].label + this.$t("VerifyMsg.isnotempty"),
            ],
            [
              "emailFormat",
              Singeobj[key].label + this.$t("VerifyMsg.FormatError"),
            ],
          ]);
        } else {
          validator.add(Singeobj[key].value, [
            [
              "isNotEmpty",
              Singeobj[key].label + this.$t("VerifyMsg.isnotempty"),
            ],
          ]);
        }
      }
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },
    additem() {
      this.errorsMsg = "";
      let errorMsg = this.validateFunc("add");
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        return false;
      }
      let singelObj = {
        recommendType: null,
        recommendEmail: "",
        // recommendName: "",
        recommendArea: "",
        signId: this.$route.query.signId,
        middlemanId: this.$route.query.middlemanId,
      };
      console.log(this.list[this.list.length - 1]);

      let sw = this.recommendList.every((item) => {
        return (
          item.recommendEmail.value !=
          this.list[this.list.length - 1].recommendEmail.value
        );
      });
      if (sw) {
        for (var key in this.list[this.list.length - 1]) {
          for (var i in singelObj) {
            if (key == i) {
              singelObj[i] = this.list[this.list.length - 1][key].value;
            }
          }
        }
        if (singelObj.recommendType == 1) {
          singelObj.recommendName = this.list[this.list.length - 1][
            "recommendName"
          ].value;
        } else if (singelObj.recommendType == 2) {
          singelObj.recommendCompany = this.list[this.list.length - 1][
            "recommendName"
          ].value;
        }
        // this.articleHight += this.boxHeight;
        if (this.$route.query.towho == 1) {
          this.recommendMiddlemanCheck(singelObj).then((res) => {
            if (res.data.resultCode === 10000) {
              this.list.push({
                recommendType: { label: "Middleman genus", value: null },
                recommendEmail: { label: "Middleman email", value: "" },
                recommendName: { label: "Middleman name", value: "" },
                recommendArea: { label: "Region", value: "" },
              });
            } else {
              this.$dialog
                .alert({
                  message: res.data.resultDesc,
                })
                .then(() => {});
            }
          });
        } else if (this.$route.query.towho == 2) {
          this.recommendInvestorCheck(singelObj).then((res) => {
            if (res.data.resultCode === 10000) {
              this.list.push({
                recommendType: { label: "Middleman genus", value: null },
                recommendEmail: { label: "Middleman email", value: "" },
                recommendName: { label: "Middleman name", value: "" },
                recommendArea: { label: "Region", value: "" },
              });
            } else {
              this.$dialog
                .alert({
                  message: res.data.resultDesc,
                })
                .then(() => {});
            }
          });
        }
      } else {
        this.$toast("不能添加重复的邮箱");
      }
    },
    recommendMiddlemanCheck(obj) {
      return new Promise((resolve, reject) => {
        this.$global
          .post_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/recommendMiddlemanCheck`,
            obj
          )
          .then((res) => {
            resolve(res);
          });
      });
    },
    recommendInvestorCheck(obj) {
      return new Promise((resolve, reject) => {
        this.$global
          .post_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/recommendInvestorCheck`,
            obj
          )
          .then((res) => {
            resolve(res);
          });
      });
    },
    delectItem(idx) {
      if (this.list.length > 1) {
        this.list.splice(idx, 1);
        console.log(this.list);
      }
    },
  },
};
</script>
<style lang="scss">
#a_recommand_i {
  .ant-select-dropdown-menu {
    max-height: vw(300);
  }
  .ant-select {
    width: 100%;

    .ant-select-selection__rendered {
      margin-left: 0;
    }
    .ant-select-selection {
      // height: vw(34);
      border: none;
      border-radius: 0;
      box-shadow: none;
      border-bottom: vw(2) solid #4f3dad;
      line-height: 1.5;
    }
    .iconfont {
      font-size: vw(16);
      color: #4f3dad;
    }
  }
}
</style>
<style lang="scss"  scoped>
#a_recommand_i {
  main {
    // width: 100%;
    padding: vw(200) vw(90) vw(116);
    h3 {
      font-size: vw(40);
      font-weight: bold;
      color: #4f3dad;
      margin-bottom: vw(52);
      opacity: 1;
    }
    .article {
      overflow: hidden;
      transition: all 1s ease-out;
      div.box {
        p.title {
          display: flex;
          justify-content: center;
          position: relative;
          align-items: center;
          margin-bottom: vw(30);
          span.serial {
            display: inline-block;
            width: vw(62);
            height: vw(62);
            background: #00f0ab;
            border-radius: 50%;
            font-size: vw(34);
            text-align: center;
            line-height: vw(62);
            color: #fff;
          }
        }
        .van-button--normal {
          position: absolute;
          right: 0;
          // top: 50%;
          line-height: vw(62);
          font-size: vw(40);
          color: #4f3dad;
          font-weight: 550;
          .van-button__text {
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .mui-input-row {
      font-size: initial;

      width: 100%;
      margin-bottom: vw(60);
      p.label {
        color: #4f3dad;
        margin-bottom: vw(30);
        height: vw(34);
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
      }
      span {
        display: inline-block;
      }
      input {
        width: 100%;
        height: vw(60);
        line-height: vw(60);
        font-size: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
    }
    // .Region{
    //      margin-bottom: vw(0);
    // }

    li {
      display: flex;
      margin-bottom: vw(30);
      aside {
        width: vw(29);
        height: vw(29);
        background: #4f3dad;
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
      p.error {
        font-size: vw(32);
        color: #00f0ab;
      }
      p.drop {
        text-align: center;
        .van-icon-arrow-down {
          transform-origin: center center;
          transform: rotate(0deg); //返回原点
          transition: transform 1s ease-out;
        }
        .van-icon-plus {
          background: #00f0ab;
          width: vw(62);
          height: vw(62);
          border-radius: 50%;
          font-size: vw(30);
          color: #fff;
          line-height: vw(62);
        }
        .van-icon::before {
          // font-size: vw(30);

          font-weight: bold;
        }
        .rotate1 {
          // transform-origin: center center;
          // transform: rotate(180deg);
          // transition: transform 2s ease-out;
        }
      }
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

