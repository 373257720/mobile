<template>
  <div id="login1st">
    <commonnav>
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" />
      </template>
      NDa clause
    </commonnav>
    <main class="main">
      <form ref="form">
        <div class="mui-input-row input-row">
          <p class="label">For and on behalf of</p>
          <input name="userName" type="text" v-model="validateForm.username" />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Name</p>
          <input name="Password" type="text" v-model="validateForm.password" />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Position</p>
          <input name="Password" type="text" v-model="validateForm.password" />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">NDA Terms</p>
          <div>Employee shall not use for Employee’s personal benefit, or disclose, communicate or divulge to, or use for the direct or indirect benefit of any person, firm, association or company other than Company, any “Confidential Information,” which term shall mean any information regarding the business methods, business policies, policies, procedures, techniques, research or development projects or results, historical or projected financial information, budgets, trade secrets, or other knowledge or processes of, or developed by, Company or any other confidential information relating to or dealing with the business operations of Company, made known to Employee or learned or acquired by Employee while in the employ of Company, but Confidential Information shall not include information otherwise lawfully known generally by or readily accessible to the general public. The foregoing provisions of this subsection shall apply during and after the period when the Employee is an employee of the Company and shall be in addition to (and not a limitation of) any legally applicable protections of Company interest in confidential information, trade secrets, and the like.</div>
          <!-- <input name="Password" type="text" v-model="validateForm.password" /> -->
        </div>
        <p class="error">{{errorsMsg}}</p>
        <footer>
          <button
            :disabled="isdisabled"
            :class="isdisabled?'passive':'active'"
            class="button is-primary"
           @click.prevent="submit_click"
          >Sign</button>
          <button
            :disabled="isdisabled"
            :class="isdisabled?'passive':'active'"
            class="button is-primary"
             @click.prevent="submit_click"
          >Download</button>
        </footer>
      </form>
    </main>
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
      // usernameRules: [
      //   { validate: val => !!val, message: "Username must be filled in" },
      //   {
      //     validate: val => val.length >= 3,
      //     message: "Username length greater than 3"
      //   }
      // ],
      // passwordRules: [
      //   { validate: val => !!val, message: "Password must be filled in" },
      //   {
      //     validate: val => val.length >= 3 && val.length <= 10,
      //     message: "Password length must be greater than 3 and less than 10"
      //   }
      // ],
      validateForm: {
        username: "",
        password: ""
      },
      errorsMsg: "",
      // errorsMsg: {
      //   username: "",
      //   password: ""
      // },
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
  computed: {
    isdisabled() {
      if (this.validateForm.username && this.validateForm.password) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    // this.username = this.$route.query.email ? this.$route.query.email : "";
    // console.log(this.$route.query.email);
  },

  methods: {
    submit_click() {
      console.log(123);

      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        // console.log(errorMsg);
        return false;
      }
      this.$routerto('a_sign_contract')
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
      this.$validator.validateAll().then(result => {
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
  // .mu-input-focus-line {
  //   display: none;
  // }

  // .mu-form-item-label {
  //   // height: vw(30);
  //   font-size: vw(30);
  //   font-weight: bold;
  //   line-height: vw(30);
  //   color: #4f3dad;
  //   // margin-bottom: vw(64);
  // }
  // .mu-input__error {
  //   // .mu-text-field-input {
  //   //   color: #f44336;
  //   // }
  //   // .mu-input-line {
  //   //   background: #f44336;
  //   // }
  // }
  // .mu-form-item__error .mu-form-item-help {
  //   color: #0ce5b2;
  // }
  // .mu-form-item-content {
  //   min-height: vw(34);
  //   margin-top: vw(62);
  // }
  // .mu-input-line {
  //   background: #4f3dad;
  // }
  // .mu-text-field-input {
  //   color: #4f3dad;
  //   font-size: vw(32);
  //   height: vw(32);
  // }
  // .mu-form-item__error .mu-form-item-help {
  //   bottom: vw(-4);
  // }
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
    // align-items: center;
    width: 100%;
    padding: vw(184) vw(94) vw(116);
    // padding-top: vw(184);
    font-size: vw(30);
    color: #4f3dad;
    p.label {
      margin-bottom: vw(62);
      height: vw(34);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
    }
    .mui-input-row {
      width: 100%;
      margin-bottom: vw(60);
      div {
        height: vw(404);
        overflow: auto;
        padding: vw(30) vw(24);
        border: vw(2) solid #4f3dad;
      }
      span {
        display: inline-block;
      }
      input {
        width: 100%;
        font-size: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
      p.helpText {
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
        color: #8277b9;
        margin-top: vw(50);
      }
    }
    // div.btn {
    //   margin-top: vw(290);
    //   width: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    //   .reminder {
    //     color: #0ce5b2;
    //     width: vw(569);
    //     display: flex;
    //     justify-content: center;
    //     // height: vw(75);
    //   }
    // }
    footer {
      display: flex;
     justify-content: space-around;
      button {
        color: #ffffff;
        // background: #4f3dad;
        border-radius: vw(16);
        width: vw(226);
        font-weight: bold;
        line-height: vw(72);
        height: vw(72);
        font-size: vw(24);
        // background: #00f0ab;
      }
      button.passive {
        background: #828282;
      }
      button.active {
        background:  #00f0ab;
      }
    }

    // button.active{

    // }
  }
  // @media all and (orientation: landscape) {
  //   main {
  //     padding-top: vw(227);
  //     div.btn {
  //       margin-top: vw(90);
  //       // padding-bottom: vw(90);
  //     }
  //   }
  // }
}
</style>
