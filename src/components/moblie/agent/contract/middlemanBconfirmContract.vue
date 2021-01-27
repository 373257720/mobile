<template>
  <div id="middlemanBconfirmContract">
    <commonnav>
      {{ $t("project.Contract") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <!-- <h1>
        {{ $t("project.Step2Pleasechooseasuitablecontracttemple") }}
      </h1> -->
      <div class="box">
        <h3>{{ $t("project.Projectproposal") }}</h3>
        <div class="Projectproposal">
          <van-radio-group v-model="sharingMechanismType1">
            <van-radio :name="0" checked-color="#00f0ab">{{
              $t("Bargin.Percentagebyintermediaries")
            }}</van-radio>
            <div class="count">
              <MyNumberInput
                :point="2"
                :max="100"
                name="projectParty"
                placeholder
                v-model.number="sharingMechanism01"
              ></MyNumberInput>
              <span class="persent">%</span>
              <p>
                <span
                  class="iconfont icon-arrow_on"
                  @click="calculate($event, 'sharingMechanism01', 'add')"
                ></span>
                <span
                  class="iconfont icon-arrow_under"
                  @click="calculate($event, 'sharingMechanism01', 'subtract')"
                ></span>
                <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
              <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
              </p>
            </div>
            <van-radio :name="1" checked-color="#00f0ab">{{
              $t("Bargin.Percentageprojectparty")
            }}</van-radio>
            <div class="count">
              <MyNumberInput
                :point="2"
                :max="100"
                name="projectParty"
                placeholder
                v-model.number="sharingMechanism11"
              ></MyNumberInput>
              <span class="persent">%</span>
              <p>
                <!-- <span class="iconfont icon-arrow_on projectParty"></span>
              <span class="iconfont icon-arrow_under projectParty"></span>-->
                <span
                  class="iconfont icon-arrow_on"
                  @click="calculate($event, 'sharingMechanism11', 'add')"
                ></span>
                <span
                  class="iconfont icon-arrow_under"
                  @click="calculate($event, 'sharingMechanism11', 'subtract')"
                ></span>
                <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
              <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
              </p>
            </div>
          </van-radio-group>
        </div>
        <ul>
          <li>
            <van-button
              :disabled="isdisabled"
              @click="acceptOrRejectCommission(0)"
              class="renewal"
              >{{ $t("Bargin.Accept") }}</van-button
            >
          </li>
          <li>
            <van-button @click="acceptOrRejectCommission(1)" class="renewal">{{
              $t("Bargin.Suggest")
            }}</van-button>
          </li>
          <li>
            <van-button
              :disabled="isdisabled"
              @click="acceptOrRejectCommission(2)"
              class="renewal"
              >{{ $t("Bargin.Reject") }}</van-button
            >
          </li>
        </ul>
      </div>
    </main>
    <DialogMsg
      :remindervisible.sync="remindervisibleBefore"
      @comfirmFromDialog="comfirmFromDialog"
      :showCancel="true"
      :msg="msg"
    ></DialogMsg>
    <!-- <DialogMsg
      :remindervisible.sync="remindervisibleAfter"
      @comfirmFromDialog="comfirmFromDialog1"
      :showCancel="false"
      :msg="resultDesc"
    ></DialogMsg> -->
  </div>
</template>
<script>
// let setTime=null;
import MyNumberInput from "@/components/moblie/common/input";
export default {
  name: "mhome",
  beforeRouteLeave(to, from, next) {
    if (to.name === "projectStatus" || to.name === "projectSubStatus") {
      to.meta.keepAlive = false;
      next();
    } else {
      next();
    }
  },
  components: {
    MyNumberInput, //注册
  },
  data() {
    return {
      msg: ``,
      sharingMechanismType1: 0,
      recommendationCount1: 0,
      recommendationTimes1: 0,
      remindervisibleBefore: false,
      // remindervisibleAfter: false,
      // resultDesc: "",
      // resultCode: null,
      isactive: false,
      sharingMechanism01: 0,
      sharingMechanism11: 0,
      OringinsharingMechanism01: 0,
      OringinsharingMechanism11: 0,
      alterType: null,
    };
  },
  created() {
    this.middlemanGetCommissionMechanism();
  },
  computed: {
    isdisabled() {
      if (this.sharingMechanismType1 === 0) {
        // console.log(this.sharingMechanism0);
        if (this.OringinsharingMechanism01 != this.sharingMechanism01) {
          return true;
        } else {
          return false;
        }
      } else if (this.sharingMechanismType1 === 1) {
        if (this.OringinsharingMechanism11 != this.sharingMechanism11) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {},
  methods: {
    // comfirmFromDialog1(data) {
    //   this.remindervisibleAfter = false;
    //   if (this.resultCode === 10000) {
    //     // if (this.alterType === 0 || this.alterType === 1) {
    //     this.$routerto("mysign");
    //     // }
    //   }
    // },
    comfirmFromDialog(data) {
      this.remindervisibleBefore = false;
      this.$store.commit("isloading", true);
      let obj, RequestUrl;
      RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSignThree/middlemanBAcceptOrRejectCommission`;
      obj = {
        optType: this.alterType,
        middlemanId: this.$route.query.middlemanId,
        sharingMechanism0: this.sharingMechanism01,
        sharingMechanism1: this.sharingMechanism11,
        sharingMechanismType: this.sharingMechanismType1,
        signId: this.$route.query.signId,
        recommendationCount: this.recommendationCount1,
        recommendationTimes: this.recommendationTimes1,
      };
      console.log(obj);
        this.$global.post_encapsulation(RequestUrl, obj).then((res) => {
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
    acceptOrRejectCommission(num) {
      if (num === 0) {
        this.msg = "accept";
      } else if (num == 1) {
        this.msg = "suggest";
      } else if (num == 2) {
        this.msg = "refuse";
      }
      // console.log(this.msg);

      this.remindervisibleBefore = true;
      this.alterType = num;
      //   console.log(this.alterType);
    },
    middlemanGetCommissionMechanism() {
      this.$store.commit("isloading", true);
      let RequestUrl;
      RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSignThree/middlemanBGetCommissionMechanism`;
      this.$global
        .post_encapsulation(RequestUrl, {
          signId: this.$route.query.signId,
          middlemanId: this.$route.query.middlemanId,
        })
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode === 10000) {
            this.sharingMechanismType1 = res.data.data.sharingMechanismType1;
            this.recommendationCount1 = res.data.data.recommendationCount1 || 0;
            this.recommendationTimes1 =
              res.data.data.recommendationTimes1 || 0;
            this.sharingMechanism01 = res.data.data.sharingMechanism01;
            this.OringinsharingMechanism01 = res.data.data.sharingMechanism01;
            this.sharingMechanism11 = res.data.data.sharingMechanism11;
            this.OringinsharingMechanism11 = res.data.data.sharingMechanism1;
          }
        });
    },
    formatNum(f, digit) {
      var m = Math.pow(10, digit);
      return parseInt(f * m, 10) / m;
    },
    calculate(e, name, type) {
      e.target.style.color = "#fff";
      let setTime = null;
      setTime = setTimeout(() => {
        e.target.style.color = "#00e3a2";
        clearTimeout(setTime);
      }, 30);
      if (type == "add") {
        if (parseFloat((this[name] + 1).toFixed(2)) <= 100) {
          this[name] = parseFloat((this[name] + 1).toFixed(2));
        }
      } else if (type == "subtract") {
        if (parseFloat((this[name] - 1).toFixed(2)) >= 0) {
          this[name] = parseFloat((this[name] - 1).toFixed(2));
        }
      }
    },
  },
};
</script>
<style lang="scss">
#middlemanBconfirmContract {
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
}
</style>
<style lang="scss" scoped>
#middlemanBconfirmContract {
  main {
    width: 100%;
    padding: vw(140) vw(60) vw(116);
    color: #4f3dad;
    h1 {
      padding-top: vw(46);
      margin-bottom: vw(80);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #4f3dad;
    }
    div.box {
      padding: vw(42) vw(58) vw(48);
      width: vw(630);

      // height: vw(955);
      background: #4f3dad;
      border-radius: vw(50);
      color: #ffffff;
      .Projectproposal {
        margin-bottom: vw(50);
      }
      .subtitle {
        font-size: vw(20);
        color: #fff;
        line-height: vw(26);
      }
      h3 {
        font-size: vw(26);
        font-weight: bold;
        color: #ffffff;
        margin-bottom: vw(60);
      }
      footer {
        // padding-top: vw(250);
        display: flex;
        justify-content: flex-end;
        margin-top: vw(76);
        margin-bottom: vw(76);
        button {
          // width: vw(262);
          height: vw(56);
          background: #00f0ab;

          opacity: 1;
          border-radius: vw(16);
          font-size: vw(24);
          // font-weight: bold;
          line-height: vw(56);
          color: #ffffff;
        }
      }
      ul {
        display: flex;
        justify-content: space-between;
        margin-top: vw(50);
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
      div.count {
        margin-bottom: vw(76);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: vw(26);
        margin-top: vw(32);
        color: #00e3a2;
        font-weight: bold;
        .unit {
          display: inline-block;
          width: vw(80);
          margin: 0 vw(20);
        }
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
        span.persent {
          margin: 0 vw(8);
        }
        .isactive {
          color: #fff;
        }
        p {
          display: flex;
          flex-direction: column;
          .iconfont {
            font-size: vw(27);
            line-height: vw(27);
          }
          .icon-arrow_on {
            // margin-bottom: vw(8);
          }
        }
      }
    }
  }
}
</style>

