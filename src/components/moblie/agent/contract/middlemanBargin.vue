<template>
  <div id="a_bargin">
    <commonnav>
      {{ $t("project.project") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <div >
        <div class="bargin-upper">
          <h3>中间人a{{ $t("Bargin.Suggest") }}</h3>
          <div v-if="obj.sharingMechanismType4 === 0">
            <p>{{ $t("Bargin.Percentagebyintermediaries") }}</p>
            <div class="count">
              <input disabled type="number" v-model="obj.sharingMechanism01" />
              <span>%</span>
            </div>
          </div>
          <div v-if="obj.sharingMechanismType4 === 1">
            <p>{{ $t("Bargin.Percentageprojectparty") }}</p>
            <div class="count">
              <input disabled type="number" v-model="obj.sharingMechanism11" />
              <span>%</span>
            </div>
          </div>
          <div class="Recommendlocking">
            <h3>Recommend locking date</h3>
            <p class="subtitle">Recommendation time</p>
            <div class="count">
              <MyNumberInput
                :point="0"
                name="projectParty"
                placeholder
                v-model.number="obj.recommendationTimes1"
              ></MyNumberInput>
              <span class="unit">times</span>
            </div>
            <p class="subtitle">Recommended countdown</p>
            <div class="count">
              <MyNumberInput
                :point="0"
                name="projectParty"
                placeholder
                v-model.number="obj.recommendationCount1"
              ></MyNumberInput>
              <span class="unit">month</span>
            </div>
          </div>
        </div>
        <div class="bargin-lower">
          <h3>中间人b（{{ middlemanNameA }}）{{ $t("Bargin.SuggestBack") }}</h3>
          <div v-if="obj.sharingMechanismType4 === 0">
            <p>{{ $t("Bargin.Percentagebyintermediaries") }}</p>
            <div class="count">
              <MyNumberInput
                :point="2"
                :max="100"
                name="projectParty"
                :isdisabled="!(obj.sharingResult == 1)"
                placeholder
                v-model.number="obj.sharingMechanism04"
              ></MyNumberInput>
              <span>%</span>
              <p v-if="obj.sharingResult == 1">
                <span
                  class="iconfont icon-arrow_on"
                  @click="calculate($event, 'sharingMechanism04', 'add')"
                ></span>
                <span
                  class="iconfont icon-arrow_under"
                  @click="calculate($event, 'sharingMechanism04', 'subtract')"
                ></span>
              </p>
            </div>
          </div>
          <div v-if="obj.sharingMechanismType4 === 1">
            <p>{{ $t("Bargin.Percentageprojectparty") }}</p>
            <div class="count">
              <MyNumberInput
                :point="2"
                :max="100"
                name="projectParty"
                :isdisabled="!(obj.sharingResult == 1)"
                placeholder
                v-model.number="obj.sharingMechanism14"
              ></MyNumberInput>
              <span>%</span>
              <p v-if="obj.sharingResult == 1">
                <span
                  class="iconfont icon-arrow_on"
                  @click="calculate($event, 'sharingMechanism14', 'add')"
                ></span>
                <span
                  class="iconfont icon-arrow_under"
                  @click="calculate($event, 'sharingMechanism14', 'subtract')"
                ></span>
              </p>
            </div>
          </div>
          <div class="Recommendlocking">
            <h3>Recommend locking date</h3>
            <p class="subtitle">Recommendation time</p>
            <div class="count">
              <MyNumberInput
                :point="0"
                name="projectParty"
                placeholder
                v-model.number="obj.recommendationTimes4"
              ></MyNumberInput>
              <span class="unit">times</span>
              <p>
                <span
                  class="iconfont icon-arrow_on"
                  @click="calculate($event, 'memberRecommendCount', 'add')"
                ></span>
                <span
                  class="iconfont icon-arrow_under"
                  @click="calculate($event, 'memberRecommendCount', 'subtract')"
                ></span>
              </p>
            </div>
            <p class="subtitle">Recommended countdown</p>
            <div class="count">
              <MyNumberInput
                :point="0"
                name="projectParty"
                placeholder
                v-model.number="obj.recommendationCount4"
              ></MyNumberInput>
              <span class="unit">month</span>
              <p>
                <span
                  class="iconfont icon-arrow_on"
                  @click="calculate($event, 'recommendMiddlemanTime', 'add')"
                ></span>
                <span
                  class="iconfont icon-arrow_under"
                  @click="
                    calculate($event, 'recommendMiddlemanTime', 'subtract')
                  "
                ></span>
              </p>
            </div>
          </div>
          <ul v-if="obj.sharingResult == 9 || obj.sharingResult == 1">
            <li>
              <van-button
                :disabled="isdisabled"
                @click="pick(0)"
                class="renewal"
                >{{ $t("Bargin.Accept") }}</van-button
              >
            </li>
            <li>
              <van-button @click="pick(1)" class="renewal">{{
                $t("Bargin.Suggest")
              }}</van-button>
            </li>
            <li>
              <van-button
                :disabled="isdisabled"
                @click="pick(2)"
                class="renewal"
                >{{ $t("Bargin.Reject") }}</van-button
              >
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
// let setTime=null;
import MyNumberInput from "@/components/moblie/common/input";
export default {
  name: "mhome",
  components: {
    MyNumberInput, //注册
  },
  data() {
    return {
      radio: "",
      isactive: false,
      obj: {
        sharingMechanism01: 0,
        sharingMechanism04: 0,
        sharingMechanism11: 0,
        sharingMechanism14: 0,
        sharingMechanismType1: 0,
        sharingMechanismType4: 0,
        recommendationCount1: 0,
        recommendationCount4: 0,
        recommendationTimes1: 0,
        recommendationTimes4: 0,
        sharingResult: 0,
        sharingType: 0,
      },
      middlemanNameB: "",
      middlemanNameA: "",
      OriginsharingMechanism01: 0,
      OriginsharingMechanism11: 0,
      timeout: null,
      //   setTime:null,
    };
  },
  created() {
    this.iBackGetCommissionMechanism();
  },
  computed: {
    isdisabled() {
      if (this.obj.sharingMechanismType4 === 0) {
        if (this.OriginsharingMechanism01 != this.obj.sharingMechanism01) {
          return true;
        } else {
          return false;
        }
      } else if (this.obj.sharingMechanismType4 === 1) {
        if (this.OriginsharingMechanism11 != this.obj.sharingMechanism11) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {},

  methods: {
    pick(num) {
      let remindMsg;
      if (num === 0) {
        remindMsg = "accept";
      } else if (num === 1) {
        remindMsg = "suggest";
      } else if (num === 2) {
        remindMsg = "此操作无法撤销,";
      }
      // console.log(this.msg);
      // this.remindervisibleBefore = true;
      // this.alterType = num;
      this.$dialog
        .confirm({
          // title: "标题",
          message: remindMsg,
        })
        .then(() => {
          // on confirm
          this.acceptOrRejectCommission(num);
        })
        .catch(() => {
          // on cancel
        });
    },
    acceptOrRejectCommission(num) {
      let sharingMechanism0;
      let sharingMechanism1;

      if (this.obj.sharingMechanismType4 === 0) {
        sharingMechanism0 = this.obj.sharingMechanism04;
        sharingMechanism1 = "";
        //  this.obj.sharingMechanism01;
      } else if (this.obj.sharingMechanismType4 === 1) {
        sharingMechanism0 = "";
        // this.obj.sharingMechanism11;
        sharingMechanism1 = this.obj.sharingMechanism14;
      }
      console.log(this.obj);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignThree/middlemanBAcceptOrRejectCommission`,
          {
            optType: num,
            sharingMechanismType: this.obj.sharingMechanismType4,
            sharingMechanism0: sharingMechanism0,
            sharingMechanism1: sharingMechanism1,
            recommendationCount: this.obj.recommendationCount4,
            recommendationTimes: this.obj.recommendationTimes4,
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
          }
        )
        .then((res) => {
          this.$dialog
            .alert({
              // title: "标题",
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode == 10000) {
                this.$routerto("mysign");
              }
              // on close
            });
        });
    },
    calculate(e, name, type) {
      e.target.style.color = "#fff";
      let setTime = null;
      setTime = setTimeout(() => {
        e.target.style.color = "#00e3a2";
        clearTimeout(setTime);
      }, 30);
      if (type == "add") {
        if (parseFloat((this.obj[name] + 1).toFixed(2)) <= 100) {
          this.obj[name] = parseFloat((this.obj[name] + 1).toFixed(2));
        }
      } else if (type == "subtract") {
        if (parseFloat((this.obj[name] - 1).toFixed(2)) >= 0) {
          this.obj[name] = parseFloat((this.obj[name] - 1).toFixed(2));
        }
      }
    },
    iBackGetCommissionMechanism() {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignThree/middlemanBGetCommissionMechanism`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.resultCode == 10000) {
            this.obj = res.data.data;
            this.middlemanNameB = this.obj[
              "userCompany" + this.$global.language() + "1"
            ];
            if (this.obj.isDisplayUserName4) {
              if (this.obj.userIdentityType4 == 1) {
                this.middlemanNameA = this.obj.userName4;
              } else if (this.obj.userIdentityType4 == 2) {
                this.middlemanNameA = this.obj[
                  "userCompany" + this.$global.language() + "4"
                ];
              }
            } else {
              this.middlemanNameA = this.obj.bslName4;
            }
            this.OriginsharingMechanism04 = res.data.data.sharingMechanism04;
            this.OriginsharingMechanism14 = res.data.data.sharingMechanism14;
            console.log(this.obj);
          }
        });
    },
  },
};
</script>
<style lang="scss">
.van-radio__icon {
  height: vw(44);
  .van-icon {
    width: vw(44);
    height: vw(44);
    // background: #00f0ab;
  }
}

.van-radio__label {
  margin-left: vw(26);
  font-size: vw(20);
  color: #fff;
  line-height: vw(26);
}
</style>
<style lang="scss" scoped>
#a_bargin {
  main {
    width: 100%;
    padding: vw(280) vw(60) vw(116);
    color: #4f3dad;
    h1 {
      padding-top: vw(46);
      margin-bottom: vw(80);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #4f3dad;
    }
    .bargin-upper {
      padding: vw(42) vw(58) vw(94);
      border-radius: vw(50) vw(50) 0 0;
      background: #786cb4;

      p {
        font-size: vw(20);
        color: #fff;
        line-height: vw(26);
      }
    }
    .bargin-lower {
      padding: vw(28) vw(58) vw(74);
      border-radius: 0 0 vw(50) vw(50);
      background: #4f3dad;

      p {
        font-size: vw(20);
        color: #fff;
        line-height: vw(26);
      }
    }
    .bargin-upper,
    .bargin-lower {
      width: vw(630);
      color: #ffffff;
      h3 {
        font-size: vw(26);
        font-weight: bold;
        color: #ffffff;
        margin-bottom: vw(60);
      }
      ul {
        padding-top: vw(80);
        display: flex;
        justify-content: space-between;
        li {
          button {
            width: vw(150);
            height: vw(56);
            font-size: vw(24);
            background: #00f0ab;
            line-height: vw(56);
            color: #ffffff;
            border-radius: vw(16);
          }
        }
      }
      div.Recommendlocking {
        margin-top: vw(50);
        // span.unit {
        //   min-width: vw(100);
        // }
      }
      div.count {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: vw(26);
        margin-top: vw(32);
        color: #00e3a2;
        font-weight: bold;
        input {
          text-align: center;
          width: vw(100);
          font-size: vw(20);
          padding: vw(8);
          color: #4f3dad;
          height: vw(40);
          background: #ffffff;
          opacity: 1;
          border-radius: vw(5);
        }
        > span {
          margin: 0 vw(8);
        }

        .isactive {
          color: #fff;
        }
        p {
          display: flex;
          color: #00e3a2;
          flex-direction: column;
          .iconfont {
            font-size: vw(27);
            line-height: vw(27);
          }
          .icon-arrow_on {
            margin-bottom: vw(8);
          }
        }
      }
    }
  }
}
</style>

