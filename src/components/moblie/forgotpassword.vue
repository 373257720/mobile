<template>
  <div id="forgotpassword">
    <!-- <div class="forgotpassword">
      <commonnav :msg="dad_text"></commonnav>
      <main>
        <form>
          <label class="label" for="username">{{$t('common.Email')}}</label>
          <br />
          <mu-text-field
            v-model="form.email"
            id="email"
            name="email"
            @blur="blur($event)"
            placeholder="Please input......"
          ></mu-text-field>
          <p class="error">
            <span>{{ errors.email}}</span>
          </p>
          <label class="label" for="username">{{$t('common.Code')}}</label>
          <br />
          <mu-text-field
            v-model="form.username"
            id="Code"
            name="Code"
            class="Code"
            @blur="blur($event)"
            placeholder
          ></mu-text-field>
          <mu-button
            color="#0ce5b2"
            class="codeBtn"
            :disabled="!isactive"
            @click="sendcode"
          >{{code}}</mu-button>
          <p class="error">
            <span>{{ errors.code}}</span>
          </p>
          <label class="label" for="password">{{$t('common.PassWord')}}</label>
          <br />
          <mu-text-field
            v-model="form.password"
            id="password"
            type="password"
            name="password"
            @blur="blur($event)"
            placeholder="Please input......"
          ></mu-text-field>
          <p class="error">
            <span>{{ errors.password}}</span>
          </p>
          <label class="label" for="password2">{{$t('common.PassWord')}}</label>
          <br />
          <mu-text-field
            v-model="form.password2"
            id="password2"
            name="password2"
            type="password"
            @blur="blur($event)"
            placeholder="Please input......"
          ></mu-text-field>
          <p class="error">
            <span>{{ errors.password2}}</span>
          </p>
          <div class="btn">
            <mu-button color="#0ce5b2" @click="submit">{{$t('common.Submit')}}</mu-button>
          </div>
        </form>
      </main>
    </div>-->
    <div class="success">
      <main>
        <img src="../../assets/success.png" alt />
        <p>您的密码已修改成功</p>
        <div class="btn">
          <mu-button color="#0ce5b2" @click="submit">{{$t('common.Submit')}}</mu-button>
        </div>
      </main>
    </div>

    <!-- <img src="../../assets/success.png" alt />
          <div class="btn">
          <mu-button color="#0ce5b2" @click="submit">{{$t('common.Submit')}}</mu-button>
    </div>-->
    <!-- <ul>
          <li class="investorsCompany">
            <p class="row1">{{$t('common.Email')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="email" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('common.Code')}}:</p>
            <p class="row2">
              <van-field
                v-model="form.verificationCode"
                center
                :placeholder="$t('ContractWrods.pleaseEnter')"
              >
                <template #button>
                  <van-button v-if="!isactive" :disabled="true" size="small" type="primary">{{code}}</van-button>
                  <van-button
                    v-else-if="isactive"
                    @click="sendcode"
                    class="isactive"
                    size="small"
                    type="primary"
                  >{{code}}</van-button>
                </template>
              </van-field>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('common.NewPassword')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field
                  type="password"
                  v-model="form.newPwd"
                  :placeholder="$t('ContractWrods.pleaseEnter')"
                />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('common.ConfirmPassword')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field
                  type="password"
                  v-model="comfirmpassword"
                  :placeholder="$t('ContractWrods.pleaseEnter')"
                />
              </van-cell-group>
            </p>
          </li>
    </ul>-->
    <!-- <footer>
          <button @click="submit">{{$t('ContractWrods.submit')}}</button>
    </footer>-->
    <!-- </main> -->
  </div>
</template>
<script>
import AsyncValidator from "async-validator";
// let timeout;
var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
export default {
  name: "forgotpassword",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value !== "") {
          value = value.trim();
          if (!reg.test(value)) {
            callback(new Error("密码格式不对"));
          }
          // this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      code: this.$t("common.Sendcode"),
      dad_text: this.$t("common.forgetpassword"),
      email: "",
      comfirmpassword: "",
      // form: {
      //   verificationCodeToken: "",
      //   verificationCode: "",
      //   newPwd: ""
      // },
      form: {
        email: "",
        password: "",
        code: "",
        password2: ""
      },
      errors: {
        email: "",
        password: "",
        code: "",
        password2: ""
      },
      rules: {
        email: [
          {
            type: "string",
            required: true,
            message: "必须填写用户名"
          },
          {
            type: "email",
            message: "必须填写email"
          }
        ],
        code: [
          {
            type: "string",
            message: "code"
          }
        ],
        password: [
          {
            validator: validatePass
          }
        ],
        password2: [
          {
            validator: validatePass2
          }
        ]
      }
    };
  },
  computed: {
    isactive: function() {
      let regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      return regemail.test(this.form.email) ? true : false;
    }
  },
  methods: {
    blur(event) {
      // var validator = new AsyncValidator({
      //   [event.target.name]: this.rules[event.target.name]
      // });
      // validator
      //   .validate(
      //     { [event.target.name]: this.form[event.target.name] },
      //     { first: true }
      //   )
      //   .then(() => {
      //     this.errors[event.target.name] = "";
      //   })
      //   .catch(({ errors, fields }) => {
      //     this.errors[event.target.name] = errors[0].message;
      //   });
    },
    async submit() {
      // this.errors = "";
      var validator = new AsyncValidator(this.rules);
      // console.log(validator);

      validator
        .validate(this.form, { first: true })
        .then(() => {
          for (var i in this.errors) {
            this.errors[i] = "";
          }
          // this.errors[errors[0].field] = ""
          // validation passed or without error message
        })
        .catch(({ errors, fields }) => {
          console.log(errors);
          this.errors[errors[0].field] = errors[0].message;
        });
      // .then(() => {
      //   // validation passed
      //   // 校验通过
      // })
      // .catch(({ errors, fields }) => {
      //    console.log(errors);
      //   // return handleErrors(errors, fields);
      // });
    },
    sendcode() {
      const self = this;
      this.$loading();
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/sendEmail.do`,
          { memberEmail: self.email }
        )
        .then(res => {
          if (res.data.resultCode == 10000) {
            let obj = JSON.parse(res.data.data);
            this.form.verificationCodeToken = obj.verificationCodeToken;
          }
          console.log(this.form);
          this.$toast(res.data.resultDesc);
          // let regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          // if (regemail.test(self.email)) {
          //   this.isactive = true;
          // }
          // self.watch = false;
        });
    },
    remind(meg) {
      this.$dialog
        .alert({
          title: meg
          // message: "弹窗内容"
        })
        .then(() => {});
    },
    // submit() {
    // if (this.form.verificationCodeToken == "") {
    //   this.$toast({ message: this.$t("common.pleasegetcode") });
    //   return false;
    // }
    // if (this.form.verificationCode == "") {
    //   this.$toast({ message: this.$t("common.pleasecode") });
    //   return false;
    // } else if (this.form.newPwd == "") {
    //   this.$toast({ message: this.$t("common.PleaseFillInTheNewPassword") });
    //   return false;
    // } else if (this.comfirmpassword == "") {
    //   this.$toast({ message: this.$t("common.ConfirmPassword") });
    //   return false;
    // } else if (this.comfirmpassword !== this.form.newPwd) {
    //   this.$toast({
    //     message: this.$t("common.PasswordsEnteredTwiceAreInconsistent")
    //   });
    //   return false;
    // }
    // this.commit();
    // },
    commit() {
      console.log(this.form);
      this.$dialog
        .confirm({
          title: this.$t("agent.Confirm")
        })
        .then(() => {
          this.$loading();
          this.$global
            .post_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_web/user/forgetPwd.do`,
              this.form
            )
            .then(res => {
              this.$toast.clear();
              // this.form.verificationCodeToken="";
              if (res.data.resultCode == 10000) {
                this.$dialog
                  .alert({
                    title: res.data.resultDesc
                  })
                  .then(() => {
                    this.$routerto("login");
                  });
              } else {
                this.$toast(res.data.resultDesc);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
#forgotpassword {
  .mu-raised-button {
    width: vw(200);
    height: vw(78);
    line-height: vw(78);
    color: #2f36ac;
    font-weight: bold;
    font-size: vw(30);
    // box-sizing: border-box;
    min-width: 0;
    border-radius: vw(20);
    .mu-button-wrapper {
      padding: 0;
    }
  }

  .mu-input-focus-line {
    // background-color: #0ce5b2;
    display: none;
  }
  .mu-text-field-input {
    color: #a8ace9;
  }
  .mu-input {
    width: 100%;
    margin-bottom: 0;
    margin: vw(18) 0 vw(16) 0;
    // height:vw(32);
    min-height: 0;
    padding: 0;
  }
  .mu-text-field-input {
    height: vw(32);
    font-size: vw(32);
  }
  .mu-input-line {
    display: none;
  }
  // .van-cell {
  //   font-size: 0.38rem;
  //   padding: 0 1rem;
  //   height: 100%;
  // }
  // .van-button--primary {
  //   color: #fff;
  //   background-color: #afafaf;
  //   border: #00adef;
  // }

  // .van-field__body {
  //   /*border: 1px solid #ababab;*/
  // }
  // .van-field__button {
  //   button {
  //     height: 1rem;
  //     width: 4rem;
  //     color: white;
  //     border-radius: 2px;
  //     cursor: pointer;
  //   }
  //   .isactive {
  //     background: #00adef;
  //   }
  // }
  // .van-field__control {
  //   padding: 0.1rem 0.3rem;
  //   height: 1rem;
  //   background: #f6f6f6;
  //   border: 1px solid #ababab;
  //   border-radius: 3px;
  //   line-height: 1rem;
  // }
  // // .van-icon-arrow-left {
  // //   position: absolute;
  // //   left: 0.6rem;
  // //   top: 50%;
  // //   -webkit-transform: translate(0, -50%);
  // //   transform: translate(0, -50%);
  // // }
  // .van-field__clear {
  //   font-size: 0.32rem;
  // }
  // .van-field {
  //   padding: 0;
  // }
}
</style>
<style lang="scss" scoped>
#forgotpassword {
  width: 100%;
  height: 100%;
  .Code {
    width: vw(179);
  }
  .success {
    main {
      padding-top: 30.21vh;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      img {
        width: vw(204);
        height: vw(204);
        margin-bottom: 4.05vh;
      }
      p {
        font-size: vw(30);
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 4.05vh;
      }
      button {
        width: vw(569);
        height: vw(75);
      }
    }
  }
  .forgotpassword {
    main {
      img {
        width: vw(204);
        height: vw(204);
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0 vw(36);
      padding-top: vw(327);
      form {
        width: 100%;
      }
      div.btn {
        margin-top: vw(208);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        button {
          text-align: center;
          width: vw(569);
          height: vw(75);
          background: #0ce5b2;
          border-radius: vw(20);
          font-size: vw(30);
          font-weight: bold;
          color: #2f36ac;
          line-height: vw(75);
        }
        .reminder {
          color: #0ce5b2;
          width: vw(569);
          display: flex;
          justify-content: center;
          // height: vw(75);
        }
      }
      @media (min-width: 768px) {
        div.btn {
          margin-top: vw(200);
          // padding-bottom: vw(90);
        }
      }
    }
  }
  .label {
    color: #fff;
    font-size: vw(30);
  }
  .error {
    height: vw(24);
    font-size: vw(24);
    font-weight: 400;
    color: #0ce5b2;
    line-height: vw(34);
  }
}
</style>
