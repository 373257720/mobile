<template>
  <div id="forgotpassword">
    <div class="forgotpassword">
      <commonnav>
        {{ $t("common.forgetpassword") }}
        <!-- <template v-slot:arrowLeft>
          <van-icon name="arrow-left" @click="$global.previous()" />
        </template> -->
      </commonnav>
      <main class="main">
        <form ref="form" @submit.prevent="submit_click">
          <!-- <div class="mui-input-row input-row">
            <p class="label">{{$t('common.Email')}}</p>
            <input name="userName" type="text" v-model="validateForm.username" />
          </div>-->
          <div class="mui-input-row input-row">
            <p class="label">{{ $t("common.NewPassword") }}</p>
            <section>
              <input
                name="Password"
                :type="isshowpassword"
                autocomplete="off"
                v-model.trim="validateForm.password"
              />
              <i
                @click="passwordshow(isshowpassword, 'isshowpassword')"
                class="iconfont icon-yanjing_huaban1"
              ></i>
            </section>
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{ $t("common.ConfirmNewPassword") }}</p>
            <section>
              <input
                name="confirmpassword"
                :type="isconfirmpassword"
                autocomplete="off"
                v-model.trim="validateForm.comfirmpassword"
              />
              <i
                @click="passwordshow(isconfirmpassword, 'isconfirmpassword')"
                class="iconfont icon-yanjing_huaban1"
              ></i>
            </section>
          </div>
          <p class="error">{{ errorsMsg }}</p>

          <footer>
            <button
              :disabled="isdisabled"
              :class="isdisabled ? 'passive' : 'active'"
              class="button is-primary"
              type="submit"
            >
              {{ $t("common.Submit") }}
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
      isshowpassword: "password",
      isconfirmpassword: "password",
      validateForm: {
        username: "",
        password: "",
        comfirmpassword: "",
      },
      ishowGoback: false,
      verificationCodeToken: "",
      errorsMsg: "",
    };
  },

  computed: {
    isdisabled() {
      if (this.validateForm.password && this.validateForm.comfirmpassword) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.verificationCodeToken = this.$route.query.token || "";

    // this.username = this.$route.query.email ? this.$route.query.email : "";
    // console.log(this.$route.query.email);
  },

  methods: {
    passwordshow(is, name) {
      // console.log(is, name);
      if (is == "password") {
        this[name] = "text";
      } else if (is == "text") {
        this[name] = "password";
      }
    },
    submit_click() {
      // console.log(123);

      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        // console.log(errorMsg);
        return false;
      }
      console.log(this.verificationCodeToken, this.validateForm.password);
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/forgetPwd.do`,
          {
            newPwd: this.validateForm.password,
            verificationCodeToken: this.verificationCodeToken,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          var rescode = res.data.resultCode;
          if (rescode == 10000) {
            this.$router.replace({
              //核心语句
              name: "login", //跳转的路径
            });
            // this.successto = "login";
            // this.$router.replace()
            // this.content = this.$t("common.NextLogin");
            // this.title = this.$t("common.registrationSuccess");
          } else {
            // this.content = res.data.resultDesc;
          }
          // this.title = res.data.resultDesc;
          this.errorsMsg = res.data.resultDesc;
          this.remindervisible = true;
        });
      // this.$routerto("mhome");
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      validator.add(self.validateForm.password, [
        [
          "isNotEmpty",
          this.$t("common.PassWord") + this.$t("VerifyMsg.isnotempty"),
        ],
        [
          "password",
          this.$t("common.PassWord") + this.$t("VerifyMsg.FormatError"),
        ],
      ]);
      validator.add(self.validateForm.comfirmpassword, [
        [
          "isNotEmpty",
          this.$t("common.ConfirmPassword") + this.$t("VerifyMsg.isnotempty"),
        ],
        [
          "password",
          this.$t("common.Password") + this.$t("VerifyMsg.inconsistent"),
        ],
        // [`confirmpasswrod|${self.validateForm.password}`, "密码不一样"]
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
      section {
        position: relative;
        input {
          padding-right: vw(42);
        }
        .icon-yanjing_huaban1 {
          position: absolute;
          right: 0;
          font-size: vw(34);
        }
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

