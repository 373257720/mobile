<template>
  <div id="signContractStep2">
    <commonnav>
      {{$t('project.Contract')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>Step 2 please choose suitable commission sharing mechanism</h1>
      <div class="box">
        <h3>Project proposal</h3>
        <van-radio-group v-model="sharingMechanismType">
          <van-radio
            :name="0"
            checked-color="#00f0ab"
          >Percentage of total funds raised by intermediaries</van-radio>
          <div class="count">
            <MyNumberInput
              :point="2"
              :max="100"
              name="projectParty"
              placeholder
              v-model.number="sharingMechanism0"
            ></MyNumberInput>
            <span class="persent">%</span>
            <p>
              <span
                class="iconfont icon-arrow_on"
                @click="calculate($event,'sharingMechanism0','add')"
              ></span>
              <span
                class="iconfont icon-arrow_under"
                @click="calculate($event,'sharingMechanism0','subtract')"
              ></span>
              <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
              <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
            </p>
          </div>
          <van-radio
            :name="1"
            checked-color="#00f0ab"
          >Percentage of commission income from project party</van-radio>
          <div class="count">
            <MyNumberInput
              :point="2"
              :max="100"
              name="projectParty"
              placeholder
              v-model.number="sharingMechanism1"
            ></MyNumberInput>
            <span class="persent">%</span>
            <p>
              <!-- <span class="iconfont icon-arrow_on projectParty"></span>
              <span class="iconfont icon-arrow_under projectParty"></span>-->
              <span
                class="iconfont icon-arrow_on"
                @click="calculate($event,'sharingMechanism1','add')"
              ></span>
              <span
                class="iconfont icon-arrow_under"
                @click="calculate($event,'sharingMechanism1','subtract')"
              ></span>
              <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
              <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
            </p>
          </div>
        </van-radio-group>
        <h3>Recommend locking date</h3>
        <p class="subtitle">Recommendation time</p>
        <div class="count">
          <MyNumberInput
            :point="0"
            name="projectParty"
            placeholder
            v-model.number="memberRecommendCount"
          ></MyNumberInput>
          <span class="unit">times</span>
          <p>
            <span
              class="iconfont icon-arrow_on"
              @click="calculate($event,'memberRecommendCount','add')"
            ></span>
            <span
              class="iconfont icon-arrow_under"
              @click="calculate($event,'memberRecommendCount','subtract')"
            ></span>
            <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
            <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
          </p>
        </div>
        <p class="subtitle">Recommended countdown</p>
        <div class="count">
          <MyNumberInput
            :point="0"
            name="projectParty"
            placeholder
            v-model.number="recommendMiddlemanTime"
          ></MyNumberInput>
          <span class="unit">month</span>
          <p>
            <span
              class="iconfont icon-arrow_on"
              @click="calculate($event,'recommendMiddlemanTime','add')"
            ></span>
            <span
              class="iconfont icon-arrow_under"
              @click="calculate($event,'recommendMiddlemanTime','subtract')"
            ></span>
            <!-- <span :class="{'isactive':isactive}" class="iconfont icon-arrow_on projectParty"></span>
            <span class="iconfont icon-arrow_under projectParty"></span>-->
            <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
            <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
          </p>
        </div>
        <footer>
          <van-button
            @click="$routerto('a_previewContract',
              $route.query
          )"
            class="renewal"
          >Preview Contract</van-button>
        </footer>
        <ul>
          <li>
            <van-button
              :disabled="isdisabled"
              @click="acceptOrRejectCommission(0)"
              class="renewal"
            >Accept</van-button>
            <!-- <button @click="acceptOrRejectCommission(0)">Accept</button> -->
          </li>
          <li>
            <!-- <button @click="acceptOrRejectCommission(1)">Suggest</button> -->
            <van-button @click="acceptOrRejectCommission(1)" class="renewal">Suggest</van-button>
          </li>
          <li>
            <!-- <button @click="acceptOrRejectCommission(2)">Reject</button> -->
            <van-button
              :disabled="isdisabled"
              @click="acceptOrRejectCommission(2)"
              class="renewal"
            >Reject</van-button>
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
    <DialogMsg
      :remindervisible.sync="remindervisibleAfter"
      @comfirmFromDialog="comfirmFromDialog1"
      :showCancel="false"
      :msg="resultDesc"
    ></DialogMsg>
  </div>
</template>
<script>
// let setTime=null;
import MyNumberInput from "@/components/moblie/common/input";
export default {
  name: "mhome",
  beforeRouteLeave(to, from, next){
    if(to.name === 'projectStatus' || to.name === 'projectSubStatus') {
      to.meta.keepAlive = false;
       next();
    }else{
       next()
    };
  },
  components: {
    MyNumberInput //注册
  },
  data() {
    return {
      msg: ``,
      sharingMechanismType: 0,
      memberRecommendCount: 0,
      recommendMiddlemanTime: 0,
      remindervisibleBefore: false,
      remindervisibleAfter: false,
      resultDesc: "",
      resultCode: null,
      isactive: false,
      sharingMechanism0: 0,
      sharingMechanism1: 0,
      OringinsharingMechanism0: 0,
      OringinsharingMechanism1: 0,
      alterType: null
    };
  },
  created() {
    this.middlemanGetCommissionMechanism();
  },
  computed: {
    isdisabled() {
      if (this.sharingMechanismType === 0) {
        // console.log(this.sharingMechanism0);
        if (this.OringinsharingMechanism0 != this.sharingMechanism0) {
          return true;
        } else {
          return false;
        }
      } else if (this.sharingMechanismType === 1) {
        if (this.OringinsharingMechanism1 != this.sharingMechanism1) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  watch: {},
  methods: {
    comfirmFromDialog1(data) {
      this.remindervisibleAfter = false;
      if (this.resultCode === 10000) {
        // if (this.alterType === 0 || this.alterType === 1) {
        this.$routerto("projectStatus");
        // }
      }
    },
    comfirmFromDialog(data) {
      this.remindervisibleBefore = false;
      this.$store.commit("isloading", true);
      let obj = {
        optType: this.alterType,
        middlemanId: this.$route.query.middlemanId,
        sharingMechanism0: this.sharingMechanism0,
        sharingMechanism1: this.sharingMechanism1,
        sharingMechanismType: this.sharingMechanismType,
        signId: this.$route.query.signId
      };
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/acceptOrRejectCommission`,
          obj
        )
        .then(res => {
          this.$store.commit("isloading", false);
          this.resultDesc = res.data.resultDesc;
          this.resultCode = res.data.resultCode;
          this.remindervisibleAfter = true;
        });
      // setTimeout(() => {
      //   // this.title = "Sign NDA";
      //   // this.msg = "Please sign the NDA to get more information";
      //   // this.confirmButtonText = "Yes";
      //   // this.cancelButtonText = "No";\
      //   this.$routerto("ndaClause");
      //   // this.remindervisibleBefore2 = true;
      // }, 300);
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
    },
    middlemanGetCommissionMechanism() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/middlemanGetCommissionMechanism`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId
          }
        )
        .then(res => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode === 10000) {
            this.radio = res.data.data.sharingMechanismType;
            this.memberRecommendCount = res.data.data.memberRecommendCount || 0;
            this.recommendMiddlemanTime =
              res.data.data.recommendMiddlemanTime || 0;
            this.sharingMechanism0 = res.data.data.sharingMechanism0;
            this.OringinsharingMechanism0 = res.data.data.sharingMechanism0;
            this.sharingMechanism1 = res.data.data.sharingMechanism1;
            this.OringinsharingMechanism1 = res.data.data.sharingMechanism1;
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
    }
  }
};
</script>
<style lang="scss">
#signContractStep2 {
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
#signContractStep2 {
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
      div.count:nth-of-type(2) {
        margin-bottom: vw(76);
      }
      div.count {
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

