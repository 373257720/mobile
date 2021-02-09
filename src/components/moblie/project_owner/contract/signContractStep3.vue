<template>
  <div id="signContractStep2">
    <commonnav>
      {{ $t("project.Contract") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>
        {{ $t("project.Step3pleasechoosesuitablecommissionsharingmechanism") }}
      </h1>
      <div v-if="$route.query.signStatus4 == 16" class="bargin-upper">
        <h3>{{ $t("project.Projectproposal") }}</h3>
        <div >
          <p class="title" v-if="sharingMechanismType === 0">
            {{ $t("Bargin.Percentagebyintermediaries") }}
          </p>
          <p class="title" v-if="sharingMechanismType === 1">
            {{ $t("Bargin.Percentageprojectparty") }}
          </p>
          <div class="count">
            <MyNumberInput
              :point="2"
              :max="100"
              name="projectParty"
              placeholder
              v-model.number="sharingMechanismTotal"
            ></MyNumberInput>
            <span>%</span>
            <p>
              <span
                class="iconfont icon-arrow_on"
                @click="calculate($event, 'sharingMechanismTotal', 'add')"
              ></span>
              <span
                class="iconfont icon-arrow_under"
                @click="calculate($event, 'sharingMechanismTotal', 'subtract')"
              ></span>
            </p>
          </div>
          <ul>
            <li>
              <button @click="Sendtext">{{ $t("common.Send") }}</button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="bargin-upper">
        <h3>{{ $t("project.Projectproposal") }}</h3>
        <van-radio-group v-model="sharingMechanismType">
          <van-radio :name="0" checked-color="#00f0ab">{{
            $t("Bargin.Percentagebyintermediaries")
          }}</van-radio>
          <div class="count">
            <MyNumberInput
              :point="2"
              :max="100"
              name="projectParty"
              placeholder
              v-model.number="sharingMechanism0"
            ></MyNumberInput>
            <span>%</span>
            <p>
              <span
                class="iconfont icon-arrow_on"
                @click="calculate($event, 'sharingMechanism0', 'add')"
              ></span>
              <span
                @click="calculate($event, 'sharingMechanism0', 'subtract')"
                class="iconfont icon-arrow_under"
              ></span>
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
              v-model.number="sharingMechanism1"
            ></MyNumberInput>
            <span>%</span>
            <p>
              <span
                @click="calculate($event, 'sharingMechanism1', 'add')"
                class="iconfont icon-arrow_on projectParty"
              ></span>
              <span
                @click="calculate($event, 'sharingMechanism1', 'subtract')"
                class="iconfont icon-arrow_under projectParty"
              ></span>
            </p>
          </div>
        </van-radio-group>
        <ul>
          <li>
            <button @click="Sendtext">{{ $t("common.Send") }}</button>
          </li>
        </ul>
      </div>
    </main>
    <DialogMsg
      :remindervisible.sync="remindervisible"
      @comfirmFromDialog="comfirmFromDialog"
      :showCancel="false"
      :msg="msg"
    ></DialogMsg>
    <!-- <DialogMsg :remindervisible.sync="remindervisible" :showCancel="true" :msg="msg"></DialogMsg> -->
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
  beforeRouteLeave(to, from, next) {
    if (to.name === "projectSubStatus") {
      to.meta.keepAlive = false;
      next();
    } else {
      next();
    }
  },
  data() {
    return {
      msg: `Are you sure to accept this commission sharing mechanism from the project side?
Once confirmed, it cannot be undone or changed
And sign the contract with the project party`,
      radio: "",
      title: "",
      remindervisible: false,
      isactive: false,
      sharingMechanism0: 0,
      sharingMechanism1: 0,
      timeout: null,
      resultCode: null,
      sharingMechanismType: null,
      sharingMechanismTotal: 0,
      originsharingMechanismTotal: 0,
      obj: {
        sharingMechanism01: null,
        sharingMechanism11: null,
        sharingMechanismType4: 1,
      },
      //   setTime:null,
    };
  },
  created() {
    this.iBackGetSharingMechanismType();
  },
  computed: {},
  watch: {},

  methods: {
    iBackGetSharingMechanismType() {
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/iBackGetSharingMechanismType`,
          {
            middlemanId: this.$route.query.middlemanId,
          }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.sharingMechanismType = res.data.data.sharingMechanismType;
            this.sharingMechanismTotal = res.data.data.sharingMechanismTotal;
            this.originsharingMechanismTotal =
              res.data.data.sharingMechanismTotal;
          }
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
        // if (name == "sharingMechanismTotal") {
        //   if (
        //     parseFloat((this[name] + 1).toFixed(2)) <=
        //     this.originsharingMechanismTotal
        //   ) {
        //     this[name] = parseFloat((this[name] + 1).toFixed(2));
        //   }
        //   return;
        // }
        if (parseFloat((this[name] + 1).toFixed(2)) <= 100) {
          this[name] = parseFloat((this[name] + 1).toFixed(2));
        }
      } else if (type == "subtract") {
        if (parseFloat((this[name] - 1).toFixed(2)) >= 0) {
          this[name] = parseFloat((this[name] - 1).toFixed(2));
        }
      }
    },
    Sendtext() {
      this.$store.commit("isloading", true);
      let RequestUrl = "";
      if (this.$route.query.signStatus4 == 16) {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/draftContractOrReject`;
        this.$global
          .post_encapsulation(RequestUrl, {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            sharingMechanismType: this.sharingMechanismType,
            sharingMechanism0: this.sharingMechanismTotal,
            sharingMechanism1: this.sharingMechanismTotal,
          })
          .then((res) => {
            this.$store.commit("isloading", false);
            this.resultCode = res.data.resultCode;
            this.msg = res.data.resultDesc;
            this.remindervisible = true;
          });
      } else {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSign/draftContractOrReject`;
        this.$global
          .post_encapsulation(RequestUrl, {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            sharingMechanismType: this.sharingMechanismType,
            sharingMechanism0: this.sharingMechanism0,
            sharingMechanism1: this.sharingMechanism1,
            signStatus: "2",
          })
          .then((res) => {
            this.$store.commit("isloading", false);
            this.resultCode = res.data.resultCode;
            this.msg = res.data.resultDesc;
            this.remindervisible = true;
          });
      }
    },
    comfirmFromDialog() {
      this.remindervisible = false;
      if (this.resultCode == 10000) {
        this.$routerto("mysign");
      }
    },
    dosome() {
      this.remindervisible = false;
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
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
    div.bargin-upper {
      padding: vw(42) vw(58) vw(48);
      width: vw(630);
      // height: vw(955);
      background: #4f3dad;
      border-radius: vw(50);
      color: #ffffff;
      p.title {
        font-size: vw(26);
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
        margin-bottom: vw(76);
        button {
          width: vw(262);
          height: vw(56);
          background: #00f0ab;

          opacity: 1;
          border-radius: vw(16);
          font-size: vw(24);
          //   font-weight: bold;
          line-height: vw(56);
          color: #ffffff;
        }
      }
      ul {
        margin-top: vw(40);
        display: flex;
        justify-content: center;
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
      header.option {
        font-size: vw(20);
        font-family: Helvetica Neue;
        font-weight: 400;
        line-height: vw(22);
        color: #ffffff;
        opacity: 1;
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

