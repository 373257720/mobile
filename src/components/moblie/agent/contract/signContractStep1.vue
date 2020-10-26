<template>
  <div id="signContract">
    <commonnav>
      Contract
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>Step 1 Please add complete contract details</h1>
      <form ref="form" @submit.prevent="submit_click">
        <div class="mui-input-row input-row">
          <p class="label">Finder Company Name</p>
          <input name="userName" type="text" v-model="validateForm.username" />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Finder Address</p>

          <input name="Password" type="text" v-model="validateForm.password" />
        </div>
        <p class="error">{{errorsMsg}}</p>
        <button
          :disabled="isdisabled"
          :class="isdisabled?'passive':'active'"
          class="button is-primary"
          type="submit"
        >Submit</button>
      </form>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      validateForm: {
        username: "",
        password: ""
      },
      errorsMsg: ""
    };
  },
  created() {},
  computed: {
    isdisabled() {
      if (this.validateForm.username && this.validateForm.password) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    submit_click() {
      // console.log(123);

      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        // console.log(errorMsg);
        return false;
      }
      this.$routerto('signContractStep2')
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      validator.add(self.validateForm.username, [
        ["isNotEmpty", this.$t("common.isno")],
        ["minLength|6", "不允许以空白字符命名"]
      ]);
      validator.add(self.validateForm.password, [
        ["isNotEmpty", "用户名不可为空"]
      ]);
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
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
<style lang="scss" scoped>
#signContract {
  main {
    width: 100%;
    padding: vw(140) vw(92) vw(116);
    color: #4f3dad;
    h1 {
      padding-top: vw(65);
      margin-bottom: vw(80);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #4f3dad;
    }

    .mui-input-row {
      margin-bottom: vw(60);
      font-size: vw(26);
      p.label {
        margin-bottom: vw(62);
        height: vw(32);
        line-height: vw(32);
        font-size: vw(26);
        font-weight: bold;
      }
      input {
        display: inline-block;
        width: 100%;
        font-size: vw(30);
        line-height: vw(34);
        height: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
    }
    p.error {
      height: vw(24);
      font-size: vw(24);
      // font-weight: 400;
      color: #0ce5b2;
      margin-bottom: vw(18);
      // line-height: vw(24);
    }
    button {
      color: #ffffff;
      // background: #4f3dad;
      border-radius: vw(16);
      width: vw(566);
      font-weight: bold;
      line-height: vw(72);
      height: vw(72);
      font-size: vw(24);
    }
    button.passive {
      background: #828282;
    }
    button.active {
      background: #00f0ab;
    }
    // footer {
    //   margin-top: vw(70);
    //   font-weight: bold;
    //   display: flex;
    //   justify-content: center;
    //   button {
    //     width: vw(528);
    //     height: vw(114);
    //     background: #00f0ab;
    //     border-radius: vw(40);
    //     font-size: vw(40);
    //     line-height: vw(114);
    //     color: #ffffff;
    //   }
    // }
  }
}
</style>

