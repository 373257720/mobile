<template>
  <div id="forgotpassword">
    <div class="forgotpassword">
      <commonnav>
        {{ $t("common.forgetpassword") }}
        <template v-slot:arrowLeft>
          <van-icon name="arrow-left" @click="$global.previous()" />
        </template>
      </commonnav>
      <main class="main">
        <div>{{ $t("common.LinktoResetPassword") }}</div>
        <form ref="form" @submit.prevent="submit_click">
          <div class="mui-input-row input-row">
            <p class="label">{{ $t("common.Email") }}</p>
            <input
              name="userName"
              type="text"
              v-model.trim="validateForm.username"
            />
          </div>
          <p class="error">{{ errorsMsg }}</p>
          <footer>
            <button
              :disabled="isdisabled"
              :class="isdisabled ? 'passive' : 'active'"
              class="button is-primary"
              type="submit"
            >
              {{ $t("common.Send") }}
            </button>
          </footer>
        </form>
      </main>
    </div>
  </div>
</template>
<script>
// import { Validator } from "@/components/moblie/validation";
// import AsyncValidator from "async-validator";
// console.log(AsyncValidator);
// var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
export default {
  name: "register",
  data() {
    return {
      submitDisabled: false,
      cache: [],
      validateForm: {
        username: "",
      },
      errorsMsg: "",
    };
  },
  computed: {
    isdisabled() {
      if (this.validateForm.username) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    // console.log(this.$Dialog);
    // this.username = this.$route.query.email ? this.$route.query.email : "";
    // console.log(this.$route.query.email);
  },

  methods: {
    submit_click() {
      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        // console.log(errorMsg);
        return false;
      }
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/sendForgetPwdEmailCode.do`,
          {
            email: this.validateForm.username,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.$dialog
            .alert({
              title: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode === 10000) {
                this.$routerto("login");
              }
            });

          // console.log(res);
        });

      // this.$routerto("mhome");
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      validator.add(self.validateForm.username, [
        [
          "isNotEmpty",
          this.$t("common.Email") + this.$t("VerifyMsg.isnotempty"),
        ],
        [
          "emailFormat",
          this.$t("common.Email") + this.$t("VerifyMsg.FormatError"),
        ],
      ]);
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },
    // callback(errors, fields){
    //   console.log(errors);

    // },
    checkEmailformat(email) {
      if (/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(email)) {
        return true;
      } else {
        this.errorsMsg.username = "邮箱格式不对";
        return false;
      }
    },
    PasswordReg(pass) {
      // console.log(pass);
      if (/^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).*$/.test(pass)) {
        this.errorsMsg.username = "";
        return true;
      } else {
        this.errorsMsg.username =
          "Minimum of 8 characters, have 1 upper case and 1 lower case letters, and at least 1 number.";
        return false;
      }
    },
    validateBeforeSubmit() {
      // console.log(this.$validator);
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert("Form Submitted!");
          return;
        }
        console.log(result);
      });
    },
    blur(event) {
      var validator = new AsyncValidator({
        [event.target.name]: this.rules[event.target.name],
      });
      validator
        .validate(
          { [event.target.name]: this.form[event.target.name] },
          { first: true }
        )
        .then(() => {
          this.errors[event.target.name] = "";
        })
        .catch(({ errors, fields }) => {
          this.errors[event.target.name] = errors[0].message;
        });
    },
    async register() {
      // this.errors = "";
      var validator = new AsyncValidator(this.rules);
      this.$routerto("login2nd");
      // validator
      //   .validate(this.form, { first: true })
      //   .then(() => {
      //     for (var i in this.errors) {
      //       this.errors[i] = "";
      //     }
      //     // this.errors[errors[0].field] = ""
      //     // validation passed or without error message
      //   })
      //   .catch(({ errors, fields }) => {
      //     console.log(errors);
      //     this.errors[errors[0].field] = errors[0].message;
      //     // this.errors[errors[0].field] = errors[0].message;
      //     // this.errors = errors[0].message;
      //     // console.log(callback);

      //     // return handleErrors(errors, fields);
      //   });
      // .then(() => {
      //   // validation passed
      //   // 校验通过
      // })
      // .catch(({ errors, fields }) => {
      //    console.log(errors);
      //   // return handleErrors(errors, fields);
      // });
    },
    submit() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.register();
        }
      });
    },
  },
};
</script>



<style lang='scss'>
#forgotpassword {
}
</style>
<style lang='scss' scoped>
#forgotpassword {
  min-height: 100vh;
  width: 100vw;
  // background: #2f36ac;
  display: flex;
  flex-direction: column;
  align-items: center;
  .error {
    font-size: vw(30);
    height: vw(34);
    font-weight: bold;
    color: #0ce5b2;
    margin-bottom: vw(108);
    line-height: vw(34);
    // line-height: vw(24);
  }
  main {
    > div {
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #4f3dad;
      margin-bottom: vw(152);
      opacity: 1;
    }
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 100%;
    padding: 0 vw(94);
    padding-top: vw(184);
    font-size: vw(30);
    color: #4f3dad;

    .mui-input-row {
      width: 100%;
      margin-bottom: vw(60);
      p.label {
        margin-bottom: vw(62);
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
        font-size: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
    }
    footer {
      display: flex;
      justify-content: center;
      button {
        color: #ffffff;
        // background: #4f3dad;
        border-radius: vw(40);
        width: vw(528);
        font-weight: bold;
        line-height: vw(114);
        height: vw(114);
        font-size: vw(40);
      }
      button.passive {
        background: #828282;
      }
      button.active {
        background: #4f3dad;
      }
    }
  }
}
</style>

