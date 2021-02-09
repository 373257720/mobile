<template>
  <div id="completeInfo">
    <commonnav>
      完善资料
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
        <div class="box" ref="box">
          <!-- <div class="mui-input-row input-row">
            <p class="label">投资者类型</p>
            <dropdown
              :item-click="dropDownClick"
              :itemlist="itemlist"
            ></dropdown>
          </div> -->
          <div class="mui-input-row input-row">
            <p class="label">投资者类型</p>
            <div
              class="item exeited"
              v-if="formData.recommendType.content == 1"
            >
              {{ $t("common.individual") }}
            </div>
            <div
              class="item exeited"
              v-if="formData.recommendType.content == 2"
            >
              {{ $t("common.company") }}
            </div>
          </div>
          <div class="mui-input-row input-row">
            <p class="label" v-if="formData.recommendType.content == 1">
              投资人姓名
            </p>
            <p class="label" v-if="formData.recommendType.content == 2">
              投资人公司
            </p>
            <div class="item exeited">
              {{ formData.recommendName.content }}
            </div>
          </div>
          <div class="mui-input-row input-row Region">
            <p class="label">投资人地区</p>
            <div class="item exeited">
              {{ formData.recommendArea.content }}
            </div>
          </div>

          <div class="mui-input-row input-row">
            <p class="label">投资人邮箱</p>
            <div class="item exeited">
              {{ formData.recommendEmail.content }}
            </div>
          </div>
          <div class="mui-input-row input-row">
            <p class="label">投资人电话</p>
            <input
              class="item"
              name="Password"
              type="text"
              v-model="formData.recommendMobile.content"
            />
          </div>
          <div
            v-if="formData.recommendType.content == 1"
            class="mui-input-row input-row"
          >
            <p class="label">投资人地址</p>
            <div class="item">
              <input
                class="item"
                name="Password"
                type="text"
                v-model="formData.recommendCompanyAddress.content"
              />
            </div>
          </div>
          <div
            v-if="formData.recommendType.content == 2"
            class="mui-input-row input-row"
          >
            <p class="label exeited">公司地址</p>
            <div class="item">
              {{ formData.recommendCompanyAddress.content }}
            </div>
          </div>

          <div class="mui-input-row input-row">
            <p class="label">感兴趣行业</p>
            <div class="checkbox">
              <van-checkbox-group
                checked-color="#00F0AB"
                v-model="formData.recommendIndustries.content"
              >
                <van-cell-group>
                  <van-cell
                    v-for="(item, index) in IndustryList"
                    clickable
                    :key="item.value"
                    :title="item.label"
                    @click="toggle(index)"
                  >
                    <template #right-icon>
                      <van-checkbox :name="item" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <footer>
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
  name: "completeInfo",
  // inject: ["recommendList"],
  components: {
    IconFont,
    Dropdown,
  },
  data() {
    return {
      one: 0,
      articleHight: null,
      IndustryList: [],
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
      formData: {
        recommendType: {
          label: "投资人类型",
          content: null,
        },
        recommendName: {
          label: "",
          content: "",
        },
        recommendArea: {
          label: "投资人地区",
          content: "",
        },
        recommendEmail: {
          label: "投资人邮箱",
          content: "",
        },
        recommendMobile: {
          label: "投资人电话",
          content: "",
        },
        recommendCompanyAddress: {
          label: "投资人地址",
          content: "",
        },
        recommendIndustries: {
          label: "感兴趣行业",
          content: [],
        },
      },
      form: {
        userIdentityType: null,
        userCompanyCh: "",
        userCompanyEn: "",
        userName: "",
        userCountryCh: "",
        userCountryEn: "",
        recommendMobile: "",
        bslEmail: "",
        userAddressCh: "",
        userAddressEn: "",
        recommendIndustries: [],
      },
      result: [],
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
    this.getAuthDetail();
    this.getIndustryList();
  },
  mounted() {
    // console.log(this.$refs.box);
    // this.boxHeight = this.$refs.box[0].clientHeight * 1;
    // this.articleHight = this.$refs.box[0].clientHeight * 1;
  },
  methods: {
    getAuthDetail() {
      let self = this;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/getAuthDetails`
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            console.log(res);
            let result = res.data.data;
            self.formData.recommendType.content = result.userIdentityType;
            self.formData.recommendName.label =
              result.userIdentityType == 2 ? "投资人公司" : "投资人姓名";
            self.formData.recommendName.content =
              result.userIdentityType == 2
                ? result["userAddress" + self.$global.language()]
                : result.userName;
            self.formData.recommendArea.content =
              result["userCountry" + self.$global.language()];
            self.formData.recommendEmail.content = result.bslEmail;
            self.formData.recommendCompanyAddress.content =
              result.userIdentityType == 2
                ? result["userAddress" + self.$global.language()]
                : "";
            console.log(this.form);
          }
        });
    },
    getIndustryList(done) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/getAllIndustry`
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            // this.List.industryList = [];
            this.IndustryList = [];
            res.data.data.forEach((item) => {
              let one = {
                label: item["industryName" + this.$global.language()],
                value: item["industryName" + this.$global.language()],
                labelCh: item.industryNameCh,
                labelEn: item.industryNameEn,
                key: "industry",
              };
              // this.List.industryList.push(one);
              this.IndustryList.push(one);
            });
          }
          this.loaded = true;
          if (done) done();
          // console.log(this.Industrylist);
        });
    },
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
    submit_click() {
      // console.log(this.formData);
      let errorMsg = this.validateFunc(this.formData);
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        return false;
      }
      this.investorsAgree(this.formData);
    },
    investorsAgree(data) {
      let arr = data.recommendIndustries.content.map((item) => {
        return {
          industryNameCh: item.labelCh,
          industryNameEn: item.labelEn,
        };
      });
      let obj = {
        signStatus: 54,
        signId: this.$route.query.signId,
        middlemanId: this.$route.query.middlemanId,
        recommendType: data.recommendType.content,
        recommendArea: data.recommendArea.content,
        recommendEmail: data.recommendEmail.content,
        recommendMobile: data.recommendMobile.content,
        recommendCompanyAddress: data.recommendCompanyAddress.content,
        recommendIndustries: arr,
      };
      if (data.recommendType.content == 1) {
        obj.recommendName = data.recommendName.content;
      } else if (data.recommendType.content == 2) {
        obj.recommendCompany = data.recommendName.content;
      }
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignThree/investorsAgree`,
          obj
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode == 10000) {
                this.$replaceto("mysign");
              }
            });
        });
    },
    validateFunc(data) {
      this.errorsMsg = "";
      let self = this;
      let validator = new this.$Validator();
      for (let key in data) {
        if (key == "recommendEmail") {
          validator.add(data[key].content, [
            ["isNotEmpty", data[key].label + this.$t("VerifyMsg.isnotempty")],
            ["emailFormat", data[key].label + this.$t("VerifyMsg.FormatError")],
          ]);
        } else if (key == "recommendIndustries") {
          validator.add(data[key].content, [
            ["isArray", data[key].label + this.$t("VerifyMsg.isnotempty")],
          ]);
        } else {
          validator.add(data[key].content, [
            ["isNotEmpty", data[key].label + this.$t("VerifyMsg.isnotempty")],
          ]);
        }
      }
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },

    toggle(index) {
      // console.log(index);
      this.$refs.checkboxes[index].toggle();
    },
  },
};
</script>
<style lang="scss">
#completeInfo {
  .ant-select-dropdown-menu {
    max-height: vw(300);
  }

  .ant-select {
    width: 100%;

    .ant-select-selection__rendered {
      margin-left: 0;
      height: vw(60);
      line-height: vw(60);
    }
    .ant-select-selection {
      // height: vw(34);

      border: none;
      border-radius: 0;
      height: vw(60);
      box-shadow: none;
      border-bottom: vw(2) solid #4f3dad;
      line-height: 1.5;
    }
    .iconfont {
      font-size: vw(16);
      color: #4f3dad;
    }
  }
  .checkbox {
    overflow-y: auto;
    height: vw(600);
    // border: vw(2) solid #4f3dad;;
    .van-checkbox-group {
      // overflow-y: auto;
      .van-checkbox__icon .van-icon {
        width: vw(44);
        height: vw(44);
        line-height: vw(44);
        border-color: #00f0ab;
      }
      .van-cell__title {
        color: #4f3dad;
        font-size: vw(30);
      }
      .van-cell {
        padding: vw(20) vw(20) vw(20) 0;
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
}
</style>
<style lang="scss"  scoped>
#completeInfo {
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
      .item {
        width: 100%;
        height: vw(60);
        line-height: vw(60);
        font-size: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
      .item.exeited {
        opacity: 0.5;
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

