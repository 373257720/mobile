<template>
  <div id="register">
    <commonnav>{{$t('common.Register')}}</commonnav>
    <main class="main">
      <form ref="form" @submit.prevent="validateBeforeSubmit">
        <div class="mui-input-row input-row">
          <p class="label">Email</p>
          <input
            v-validate="'required|name'"
            name="userName"
            type="text"
            v-model="validateForm.username"
          />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Password</p>
          <input
            v-validate="'required|name'"
            name="Password"
            type="text"
            v-model="validateForm.password"
          />
          <p
            class="helpText"
          >Minimum of 8 characters, have 1 upper case and 1 lower case letters, and at least 1 number.</p>
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Confirm password</p>
          <input
            v-validate="'required|name'"
            name="confirmpassword"
            type="text"
            v-model="validateForm.confirmpassword"
          />
        </div>
        <p v-show="errors.has('userName')" class="error">{{ errors.first('userName') }}</p>
        <p v-show="errors.has('Password')" class="error">{{ errors.first('Password') }}</p>
        <p
          v-show="errors.has('confirmpassword')"
          class="error"
        >{{ errors.first('confirmpassword') }}</p>
        <!-- <button @click="submit">SUBMIT</button> -->
        <button class="button is-primary" type="submit">Submit</button>
      </form>

      <DialogMsg
        :msg="content"
        :title.sync="title"
        :successto="successto"
        :remindervisible.sync="remindervisible"
      ></DialogMsg>
    </main>
  </div>
</template>
<script>
// import AsyncValidator from "async-validator";
// var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
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
      confirmpassword: [
        { validate: val => !!val, message: "Password must be filled in" },
        {
          validate: val => {
            return val === this.validateForm.password;
          },
          message: "Password"
        }
      ],
      validateForm: {
        username: "",
        password: "",
        confirmpassword: ""
      },
      remindervisible: false,
      content: "",
      title: "",
      successto: ""
    };
  },

  computed: {
    // Submitisactive(){
    //     return
    // },
  },
  created() {
    // this.username = this.$route.query.email ? this.$route.query.email : "";
    // console.log(this.$route.query.email);
  },
  methods: {
    validateBeforeSubmit() {
      // console.log(this.$validator.validateAll);    
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          alert("Form Submitted!");
          return;
        }
        console.log(result);

        // alert("Correct them errors!");
      });
    },
    onSubmit() {},
    submit() {
      //  this.$routerto("usercheck")
      // console.log(this.$validator);
      // console.log(this.$refs.form.validate());
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }

        alert("Form has been submitted!");

        // Resetting Values
        this.firstName = this.lastName = this.email = "";

        // Wait until the models are updated in the UI
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
      });

      // this.$refs.form.validate().then(result => {
      //   console.log("form valid: ", result);
      //   // this.$routerto("usercheck")
      //   if (result) {
      //     this.$global
      //       .post_encapsulation(
      //         `${this.$axios.defaults.baseURL}/bsl_web/user/register.do`,
      //         {
      //           bslEmail: this.validateForm.username,
      //           bslPwd: this.validateForm.password
      //         }
      //       )
      //       .then(res => {
      //         var rescode = res.data.resultCode;
      //         this.$toast.clear();
      //         if (rescode == 10000) {
      //           this.successto = "login";
      //           // this.content = this.$t("common.NextLogin");
      //           // this.title = this.$t("common.registrationSuccess");
      //         } else {
      //           // this.content = res.data.resultDesc;
      //         }
      //         // this.title = res.data.resultDesc;
      //         this.content = res.data.resultDesc;
      //         this.remindervisible = true;
      //       });
      //   }
      // });
    },
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
      validator
        .validate(this.form, { first: true })
        .then(() => {
          for (var i in this.errors) {
            this.errors[i] = "";
          }
          this.submit();

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
    }
  }
};
</script>



<style lang='scss'>
#register {
  // .mu-input-focus-line {
  //   display: none;
  // }

  // .mu-form-item-label {
  //   height: vw(30);
  //   font-size: vw(30);
  //   font-weight: bold;
  //   line-height: vw(30);
  //   color: #4f3dad;
  //   opacity: 1;
  //   margin-bottom: vw(64);
  // }
  // .mu-input__error {
  //   // .mu-text-field-input {
  //   //   color: #f44336;
  //   // }
  //   // .mu-input-line {
  //   //   background: #f44336;
  //   // }
  // }
  // .mu-input-line {
  //   background: #4f3dad;
  // }
  // .mu-text-field-input {
  //   color: #4f3dad;
  //   font-size: vw(32);
  // }
  // .mu-form-item__error .mu-form-item-help {
  //   bottom: vw(-4);
  // }
}
</style>
<style lang='scss' scoped>
#register {
  color: #4f3dad;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .label {
    height: vw(34);
    font-size: vw(30);
    font-weight: bold;
    line-height: vw(34);
    color: #4f3dad;
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
    padding: 0 vw(94);
    padding-top: vw(184);
    font-size: vw(30);
    p.label {
      margin-bottom: vw(62);
    }
    .mui-input-row {
      width: 100%;
      margin-bottom: vw(60);
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
    // button.active{

    // }
  }
  // @media all and (orientation: landscape) {
  //   main {
  //     padding-top: vw(227);
  //     div.btn {
  //       margin-top: vw(90);
  //     }
  //   }
  // }
}
</style>

