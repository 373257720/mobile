<template>
  <div id="register">
    <div class="main">
      <div class="box">
        <form>
          <label for="username">username</label>
  <br />
          <!-- <input
            type="text"
            id="username"
            name="username"
            @blur="blur($event)"
            v-model="form.username"
          />-->
          <mu-text-field
            v-model="form.username"
            id="username"
            name="username"
            @blur="blur($event)"
            placeholder="Please input......"
          ></mu-text-field>
          <br />
          <span style="color:red;">{{ errors.username}}</span>
          <br />
          <label for="password">password</label>
  <br />
          <!-- <input type="password" name="password" @blur="blur($event)" v-model="form.password" /> -->
          <mu-text-field
            v-model="form.password"
            id="password"
            name="password"
            @blur="blur($event)"
            placeholder="Please input......"
          ></mu-text-field>
            <br />
          <span style="color:red;">{{ errors.password}}</span>
          <br />
          <label for="password2">password2</label>
  <br />
          <mu-text-field
            v-model="form.password2"
            id="password2"
            name="password2"
            @blur="blur($event)"
            placeholder="Please input......"
          ></mu-text-field>
          <!-- <input type="password" name="password2" @blur="blur($event)" v-model="form.password2" /> -->
          <br />
          <span style="color:red;">{{ errors.password2}}</span>
          <br />
          <mu-button color="#0ce5b2" @click="_click1">提交</mu-button>
        </form>

        <!-- <span
          style="color:red;"
          v-if="errors.fields && errors.fields.username"
        >{{ errors.fields.username[0].message }}</span>-->

        <!-- <span
          style="color:red;"
          v-if="errors.fields && errors.fields.password"
        >{{ errors.fields.username1[0].message }}</span>-->
      </div>
      <!-- <mu-container>
        <header>
          <van-icon name="arrow-left" @click="$global.previous()" />
          <span>注册</span>
        </header>
        <mu-form ref="form" :model="form" class="mu-demo-form" label-position="top">
          <mu-form-item label="请输入邮箱" prop="username" :rules="usernameRules">
            <mu-text-field v-model="form.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="请输入密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="form.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="password2" label="再次确认密码" :rules="passwordRules2">
            <mu-text-field type="password" v-model="form.password2"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="#0ce5b2"  @click="submit">提交</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>-->
      <!-- <div class="tologin">
         <p class="tologin" @click="$routerto('login')">{{$t('common.AlreadyHaveAnAccount')}}</p>
      </div>-->
    </div>
  </div>
</template>
<script>
import AsyncValidator from "async-validator";
console.log(AsyncValidator);
var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
export default {
  name: "register",
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
      labelPosition: "top",
      form: {
        username: "",
        password: "",
        password2: ""
      },
      errors: {
        username: "",
        password: "",
        password2: ""
      },
      rules: {
        username: [
          {
            type: "string",
            required: true,
            message: "必须填写用户名"
          },
          {
            type: "email",
            message: "必须填写email"
          }
          // {
          //   validator(rule, value, callback, source, options) {
          //     var errors = [];
          //     console.log(123);

          //     // test if email address already exists in a database
          //     // and add a validation error to the errors array if it does
          //     return errors;
          //   }
          // }
          //  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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
  created() {
    // this.username = this.$route.query.email ? this.$route.query.email : "";
    // console.log(this.$route.query.email);
  },
  methods: {
    // callback(errors, fields){
    //   console.log(errors);

    // },
    blur(event) {
      var validator = new AsyncValidator({
        [event.target.name]: this.rules[event.target.name]
      });
      validator
        .validate(
          { [event.target.name]: this.form[event.target.name] },
          { first: true }
        )
        .then(() => {
          this.errors[event.target.name] = "";
          // validation passed or without error message
        })
        .catch(({ errors, fields }) => {
          // console.log(this.errors[event.target.name]);
          // console.log();
          this.errors[event.target.name] = errors[0].message;
          // console.log(callback);
          // return handleErrors(errors, fields);
        });
    },
    async _click1() {
      // this.errors = "";
      var validator = new AsyncValidator(this.rules);
      // this.errors = await new AsyncValidator(this.rules)
      //   .validate(this.form)
      //   .catch(e => e);
      // console.log(this.errors.fields);

      // if (this.errors) return;
      // this.errors = {};
      // validator
      //   .validate(this.form, (errors, fields) => {
      //     if (errors) {
      //       // validation failed, errors is an array of all errors
      //       // fields is an object keyed by field name with an array of
      //       // errors per field
      //        console.log(errors);
      //         this.errors=errors[0].message;
      //       // 校验未通过的情况，errors 和 fields 同上
      //       // return handleErrors(errors, fields);
      //     }
      //     // validation passed
      //     // 校验通过
      //   })

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
          // this.errors[errors[0].field] = errors[0].message;
          // this.errors = errors[0].message;
          // console.log(callback);

          // return handleErrors(errors, fields);
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
    submit() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.register();
        }
      });
    },
    register() {
      this.$loading();
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/register.do`,
          { bslEmail: this.form.username, bslPwd: this.form.password }
        )
        .then(res => {
          var rescode = res.data.resultCode;
          this.$toast.clear();
          if (rescode == 10000) {
            this.$dialog
              .alert({
                title: this.$t("common.registrationSuccess"),
                message: this.$t("common.NextLogin")
              })
              .then(() => {
                this.$routerto("login");
              });
          } else {
            this.remind = res.data.resultDesc;
          }
        });
    }
  }
};
</script>



<style lang='scss'>
#register {
  //  font-size: 0.32rem;
  .mu-demo-form {
    width: 100%;
    max-width: 460px;
  }
  .mu-form-item {
    color: #fff;
  }
  .mu-input-focus-line {
    background-color: #0ce5b2;
    display: none;
  }
  .mu-input-line {
    display: none;
  }
  .mu-text-field-input {
    color: #a8ace9;
  }
  .mu-input__error {
    color: #0ce5b2;
  }
  .mu-form-item__error {
    // color: inherit;
    .mu-form-item-help {
      color: #0ce5b2;
      font-size: 0.3rem;
    }
  }
  .mu-form-item-label {
    line-height: initial;
    font-size: 0.3rem;
  }
  .mu-input {
    font-size: 0.32rem;
  }
  .mu-form-item__has-label {
    min-height: 1.8rem;
  }
  .mu-form-item {
    padding-bottom: 0;
    // margin-bottom: 0;
  }

  .van-field__body {
    //  width: 100%;
    height: 1rem;
    border: 0.02rem solid #dddddd;
    border-radius: 3px;
    background: #f6f6f6;
    padding: 0.1rem 0.3rem;
    box-sizing: border-box;
  }
  .van-field__control {
    font-size: 0.42rem;
    // line-height: 0.7rem;
  }
  .van-field__clear {
    // height: 0.1rem;
    font-size: 0.38rem;
  }
  .username,
  .password,
  .repeatpassword {
    .van-field {
      padding: 0;
      width: 9.8rem;
    }
  }
}
</style>
<style lang='scss' scoped>
#register {
  min-height: 100vh;
  width: 100vw;
  // background: #2f36ac;
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    margin-bottom: vw(229);
    color: #fff;
    height: 6.85vh;
    line-height: 6.85vh;
    font-size: 0.3rem;
    text-align: center;
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0;
      top: 50%;
      transform: (translate(0, -50%));
    }
    span {
      align-self: center;
    }
  }
  .main {
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    div.form {
      // margin-bottom: 0.5rem;
    }

    button {
      color: #2f36ac;
      border-radius: 15px;
      width: 75.87vw;
      font-weight: 550;
      line-height: 5.62vh;
      height: 5.62vh;
      font-size: 0.3rem;
    }
    .registerbtn button {
      background: #ff7c2c;
      // font-size: 0.1rem;
      font-size: 0.42rem;
    }
  }
}
</style>

