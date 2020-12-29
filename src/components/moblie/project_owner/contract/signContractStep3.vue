<template>
  <div id="signContractStep2">
    <commonnav>
      {{$t('project.Contract')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>Step 3 please choose suitable commission sharing mechanism</h1>
      <div>
        <h3>Project proposal</h3>
        <header class="option">Percentage of total funds raised by intermediaries</header>
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
              @click="calculate($event,'sharingMechanism0','add')"
            ></span>
            <span
              @click="calculate($event,'sharingMechanism0','subtract')"
              class="iconfont icon-arrow_under"
            ></span>
          </p>
        </div>
        <header class="option">Percentage of commission income from project party</header>
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
              @click="calculate($event,'sharingMechanism1','add')"
              class="iconfont icon-arrow_on projectParty"
            ></span>
            <span
              @click="calculate($event,'sharingMechanism1','subtract')"
              class="iconfont icon-arrow_under projectParty"
            ></span>
            <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
            <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
          </p>
        </div>

        <!-- <footer>
          <button>Preview Contract</button>
        </footer>-->
        <ul>
          <li>
            <button @click="Sendtext">Send</button>
          </li>
          <!-- <li>
            <button @click="$routerto('bargin')">Suggest</button>
          </li>
          <li>
            <button>Reject</button>
          </li>-->
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
    MyNumberInput //注册
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
      resultCode: null
      //   setTime:null,
    };
  },
  created() {},
  computed: {},
  watch: {},

  methods: {
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
    Sendtext() {
      this.$store.commit("isloading", true);

      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/draftContractOrReject`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            signStatus: "2",
            sharingMechanism0: this.sharingMechanism0,
            sharingMechanism1: this.sharingMechanism1
          }
        )
        .then(res => {
          this.$store.commit("isloading", false);
          this.resultCode = res.data.resultCode;
          this.msg = res.data.resultDesc;
          this.remindervisible = true;
        });
    },
    comfirmFromDialog() {
      this.remindervisible = false;
      if (this.resultCode == 10000) {
        this.$routerto("projectSubStatus");
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
    }
  }
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
    > div {
      padding: vw(42) vw(58) vw(48);
      width: vw(630);

      // height: vw(955);
      background: #4f3dad;
      border-radius: vw(50);
      color: #ffffff;

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

