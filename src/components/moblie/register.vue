<template>
  <div id="register">
    <commonnav :msg="dad_text"></commonnav>
    <main class="main">
      <form>
        <label class="label" for="username">{{$t('common.Email')}}</label>
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

        <p class="error">
          <span>{{ errors.username}}</span>
        </p>
        <label class="label" for="password">{{$t('common.PassWord')}}</label>
        <br />
        <!-- <input type="password" name="password" @blur="blur($event)" v-model="form.password" /> -->
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
        <!-- <input type="password" name="password2" @blur="blur($event)" v-model="form.password2" /> -->
        <p class="error">
          <span>{{ errors.password2}}</span>
        </p>
        <div class="btn">
          <!-- <p class="reminder">reminder</p> -->
          <mu-button color="#0ce5b2" @click="register">{{$t('common.Submit')}}</mu-button>
        </div>
      </form>

      <!-- <span
          style="color:red;"
          v-if="errors.fields && errors.fields.username"
      >{{ errors.fields.username[0].message }}</span>-->

      <!-- <span
          style="color:red;"
          v-if="errors.fields && errors.fields.password"
      >{{ errors.fields.username1[0].message }}</span>-->

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
    </main>
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
      dad_text: this.$t("common.Register"),
      visibility: false,
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
      this.$global
        .singerValitator(event, this.form, this.rules)
        .then(res => {
          this.errors[event.target.name] = "";
        })
        .catch(e => {
          this.errors[event.target.name] = e.errors[0].message;
        });
    },
    async register() {
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
    }
    // register() {
    //   this.$loading();
    //   this.$global
    //     .post_encapsulation(
    //       `${this.$axios.defaults.baseURL}/bsl_web/user/register.do`,
    //       { bslEmail: this.form.username, bslPwd: this.form.password }
    //     )
    //     .then(res => {
    //       var rescode = res.data.resultCode;
    //       this.$toast.clear();
    //       if (rescode == 10000) {
    //         this.$dialog
    //           .alert({
    //             title: this.$t("common.registrationSuccess"),
    //             message: this.$t("common.NextLogin")
    //           })
    //           .then(() => {
    //             this.$routerto("login");
    //           });
    //       } else {
    //         this.remind = res.data.resultDesc;
    //       }
    //     });
    // }
  }
};
</script>



<style lang='scss'>
 .mu-input-focus-line {
    // background-color: #0ce5b2;
    display: none;
  }
  .mu-input-line {
    display: none;
  }
#register {
 
  .mu-text-field-input {
    color: #a8ace9;
  }
  .mu-input__focus {
    color: #0ce5b2;
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
}
</style>
<style lang='scss' scoped>
#register {
  min-height: 100vh;
  width: 100vw;
  background: #2f36ac;
  display: flex;
  flex-direction: column;
  align-items: center;
  .label {
    color: #fff;
    font-size: vw(30);
  }
  .error {
    height: vw(24);
    font-size: vw(24);
    // font-weight: 400;
    color: #0ce5b2;
    margin-bottom: vw(18);
    // line-height: vw(24);
  }
  main {
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
      margin-top: vw(290);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
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
    @media all and (orientation: portrait) {
      body {
        // background-color: blue;
      }
    }

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
    .registerbtn button {
      background: #ff7c2c;
      // font-size: 0.1rem;
      font-size: 0.42rem;
    }
  }
  @media (min-width: 768px) {
    main {
      padding-top: vw(227);
    }
  }
}
</style>

