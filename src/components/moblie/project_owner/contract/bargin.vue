<template>
  <div id="p_bargin">
    <commonnav>
      Project
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <div class="bargin-upper">
        <h3>
          {{ $t("Bargin.Intermediary") }} （用戶名）{{ $t("Bargin.Suggest") }}
        </h3>
        <div v-if="obj.sharingMechanismType4 === 0">
          <p>{{ $t("Bargin.Percentagebyintermediaries") }}</p>
          <div class="count">
            <input disabled type="number" v-model="obj.sharingMechanism04" />
            <span>%</span>
          </div>
        </div>
        <div v-if="obj.sharingMechanismType4 === 1">
          <p>{{ $t("Bargin.Percentageprojectparty") }}</p>
          <div class="count">
            <input disabled type="number" v-model="obj.sharingMechanism14" />
            <span>%</span>
          </div>
        </div>
      </div>
      <div class="bargin-lower">
        <h3>
          {{ $t("Bargin.Projectparty") }} （用戶名）{{
            $t("Bargin.SuggestBack")
          }}
        </h3>
        <div v-if="obj.sharingMechanismType4 === 0">
          <!-- <p>Percentage of total funds raised by intermediaries</p> -->
          <p>{{ $t("Bargin.Percentagebyintermediaries") }}</p>
          <div class="count">
            <MyNumberInput
              :point="2"
              :max="100"
              name="projectParty"
              :isdisabled="obj.sharingResult == 2"
              placeholder
              v-model.number="obj.sharingMechanism01"
            ></MyNumberInput>
            <span>%</span>
            <p v-if="obj.sharingResult == 1">
              <span
                class="iconfont icon-arrow_on"
                @click="calculate($event, 'sharingMechanism01', 'add')"
              ></span>
              <span
                class="iconfont icon-arrow_under"
                @click="calculate($event, 'sharingMechanism01', 'subtract')"
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
              :isdisabled="obj.sharingResult == 2"
              placeholder
              v-model.number="obj.sharingMechanism11"
            ></MyNumberInput>
            <span>%</span>
            <p v-if="obj.sharingResult == 1">
              <span
                class="iconfont icon-arrow_on"
                @click="calculate($event, 'sharingMechanism11', 'add')"
              ></span>
              <span
                class="iconfont icon-arrow_under"
                @click="calculate($event, 'sharingMechanism11', 'subtract')"
              ></span>
            </p>
          </div>
        </div>
        <ul v-if="obj.sharingResult == 1">
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
        sharingResult: 0,
        sharingType: 0,
      },
      OriginsharingMiddle: 0,
      OriginsharingProject: 0,
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
        if (this.OriginsharingMiddle != this.obj.sharingMechanism04) {
          return true;
        } else {
          return false;
        }
      } else if (this.obj.sharingMechanismType4 === 1) {
        if (this.OriginsharingProject != this.obj.sharingMechanism11) {
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
      if (num === 0) {
        this.msg = "accept";
      } else if (num === 1) {
        this.msg = "suggest";
      } else if (num === 2) {
        this.msg = "refuse";
      }
      this.$dialog
        .confirm({
          // title: "标题",
          message: this.msg,
        })
        .then(() => {
          // on confirm
          this.acceptOrRejectCommission(num);
          // this.$routerto("a_previewContract", obj);
        })
        .catch(() => {
          // on cancel
        });
    },
    acceptOrRejectCommission(num) {
      let sharingMechanism0;
      let sharingMechanism1;
      if (this.obj.sharingMechanismType4 === 1) {
        // sharingMechanism0 = this.obj.sharingMechanism14;
        sharingMechanism1 = this.obj.sharingMechanism11;
      } else if (this.obj.sharingMechanismType4 === 0) {
        sharingMechanism0 = this.obj.sharingMechanism01;
        // sharingMechanism1 = this.obj.sharingMechanism04;
      }
      // console.log(sharingMechanism0, sharingMechanism1);
      // if (num === 0) {
      //   return {
      //     optType: num,
      //     sharingMechanismType: this.obj.sharingMechanismType4,
      //     sharingMechanism0: sharingMechanism0,
      //     sharingMechanism1: sharingMechanism1,
      //     signId: this.$route.query.signId,
      //     middlemanId: this.$route.query.middlemanId
      //   };
      // }

      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/iBackAgreeOrRejectCommission `,
          {
            optType: num,
            sharingMechanismType: this.obj.sharingMechanismType4,
            sharingMechanism0: sharingMechanism0,
            sharingMechanism1: sharingMechanism1,
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
                if (num === 0) {
                  this.$routerto("a_previewContract", this.$route.query);
                } else {
                  this.$routerto("mysign");
                }
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
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/iBackGetCommissionMechanism`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          // console.log(res);
          if (res.data.resultCode == 10000) {
            this.obj = res.data.data;
            if (res.data.data.sharingMechanismType4 === 0) {
              this.OriginsharingProject = res.data.data.sharingMechanism01;
              this.OriginsharingMiddle = res.data.data.sharingMechanism04;
            } else if (res.data.data.sharingMechanismType4 === 1) {
              this.OriginsharingProject = res.data.data.sharingMechanism11;
              this.OriginsharingMiddle = res.data.data.sharingMechanism14;
            }

            // console.log(this.obj.sharingResult);
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
#p_bargin {
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

