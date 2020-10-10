<template>
  <div id="login1st">
    <commonnav>{{$t("common.LogIn")}}</commonnav>
    <main class="main">
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item :label="$t('common.Email')" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('common.PassWord')" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password"></mu-text-field>
        </mu-form-item>
        <p class="errorMsg">
          The email or password you entered is
          incorrect.
        </p>
        <p class="forget">
          <span>
             forget password
          </span>
       </p>
        <mu-form-item>
          <mu-button color="primary" @click="submit">{{$t('common.Register')}}</mu-button>
          <!-- <van-button @click="submit">{{$t('common.Register')}}</van-button> -->
        </mu-form-item>
      </mu-form>
    </main>
  </div>
</template>
<script>
// import AsyncValidator from "async-validator";
// console.log(AsyncValidator);
var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
export default {
  name: "register",
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "Username must be filled in" },
        {
          validate: val => val.length >= 3,
          message: "Username length greater than 3"
        }
      ],
      passwordRules: [
        { validate: val => !!val, message: "Password must be filled in" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "Password length must be greater than 3 and less than 10"
        }
      ],
      validateForm: {
        username: "",
        password: ""
      },
      errors: {
        username: "",
        password: ""
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
      this.$refs.form.validate().then(result => {
        if (result) {
          this.register();
        }
      });
    }
  }
};
</script>



<style lang='scss'>
#login1st {
  .mu-input-focus-line {
    display: none;
  }

  .mu-form-item-label {
    // height: vw(30);
    font-size: vw(30);
    font-weight: bold;
    line-height: vw(30);
    color: #4f3dad;
    // margin-bottom: vw(64);
  }
  .mu-input__error {
    // .mu-text-field-input {
    //   color: #f44336;
    // }
    // .mu-input-line {
    //   background: #f44336;
    // }
  }
  .mu-form-item__error .mu-form-item-help {
    color: #0ce5b2;
  }
  .mu-form-item-content {
    min-height: vw(34);
    margin-top: vw(62);
  }
  .mu-input-line {
    background: #4f3dad;
  }
  .mu-text-field-input {
    color: #4f3dad;
    font-size: vw(32);
    height: vw(32);
  }
  .mu-form-item__error .mu-form-item-help {
    bottom: vw(-4);
  }
}
</style>
<style lang='scss' scoped>
#login1st {
  min-height: 100vh;
  width: 100vw;
  // background: #2f36ac;
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
    font-weight: 400;
    color: #0ce5b2;
    margin-bottom: vw(18);
    line-height: vw(34);
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 vw(94);
    padding-top: vw(212);
    .errorMsg {
      // width: vw(536);

      font-size: vw(30);

      font-weight: bold;
      line-height: vw(34);
      color: #00e3a2;
    }
    .forget {
      font-size: vw(30);
      text-align: center;
      font-weight: bold;
      line-height: vw(34);

      span{
      border-bottom:2px solid #00e3a2;
      }
      color: #00e3a2;
    }
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
    @media (min-width: 480px) {
      div.btn {
        margin-top: vw(100);
        // padding-bottom: vw(90);
      }
    }
    button {
      color: #ffffff;
      background: #4f3dad;
      border-radius: vw(40);
      width: vw(528);
      font-weight: bold;
      line-height: vw(114);
      height: vw(114);
      font-size: vw(40);
    }
  }
  @media all and (orientation: landscape) {
    main {
      padding-top: vw(227);
      div.btn {
        margin-top: vw(90);
        // padding-bottom: vw(90);
      }
    }
  }
}
</style>
