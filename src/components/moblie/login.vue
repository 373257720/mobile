<template>
  <div id="login">
    <div class="logo">
      <img src="../../../static/pic/logo.png" alt />
      <button class="switchLan" color="#0ce5b2" @click="switchLan(lan)">{{lantext}}</button>
    </div>
    <div class="main">
      <p>请输入推荐码</p>
      <!-- <van-form> -->
      <!--      <div class="username common" v-if="$route.query.email">-->
      <!--        <van-field v-model.trim="username" placeholder="电子邮箱" disabled />-->
      <!--      </div>-->
      <!--      v-if="!$route.query.email"-->
      <!-- <van-form>
        <div class="username common">
          <van-field v-model.trim="username" :placeholder="$t('common.Email')" clearable />
        </div>
        <div class="password common">
          <van-field
            v-model.trim="password"
            type="password"
            :placeholder="$t('common.PassWord')"
            clearable
          />
        </div>
        <div class="loginbtn common">
          <button @click="login">{{$t('common.LogIn')}}</button>
        </div>
      </van-form>-->
      <div class="registerbtn common">
        <!-- <button @click="$routerto('register',{email:username})">{{$t('common.Register')}}</button> -->
        <mu-button color="#0ce5b2" @click="$routerto('register')">{{$t('common.Register')}}</mu-button>
      </div>
      <p class="login">{{$t('common.LogIn')}}</p>
      <!-- <div class="tologin">
        <p class="tologin" @click="$routerto('forgotpassword')">{{$t('common.forgetpassword')}}</p>
      </div>-->
    </div>
  </div>
</template>
<script>
// import { i18n } from "../../language";

export default {
  name: "login",
  // inject: ["reload"],
  data() {
    return {
      username: "",
      password: "",
      remind: "",
      lan: ""
    };
  },
  computed: {
    lantext: function() {
      if (this.lan == "en_US") {
        return "En";
      } else if (this.lan == "zh_CN") {
        return "中文";
      }
    }
  },
  created() {
    if (this.$route.query.email) {
      this.username = this.$route.query.email ? this.$route.query.email : "";
    }
    this.lan = this.$i18n.locale;
    this.switchLan();
  },
  // beforeRouteLeave(to, from, next) {
  //   // console.log(to, from)
  //   if (to.name == 'i_emailto_confirm') {
  //     next(false);
  //   } else {
  //     next()
  //   }
  // },
  methods: {
    switchLan(lan) {
      let language = this.lan;
      if (lan == "en_US") {
        language = "zh_CN";
      } else if (lan == "zh_CN") {
        language = "en_US";
      }
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/language.do`,
          {
            lan: language
          }
        )
        .then(res => {
          if (res.data.resultCode === 10000) {
            this.lan = language;
            localStorage.setItem("language", language);
            this.$Local(language);
            this.$i18n.locale = language;
            this.$store.dispatch("X_Token_actions", res.data.data.X_Token);
          } else {
            this.$toast(res.data.resultDesc);
          }
        });
    },
    login() {
      this.remind = "";
      if (this.username && this.password) {
        this.$loading();
        this.$global
          .post_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_web/user/login.do`,
            {
              bslEmail: this.username,
              bslPwd: this.password
            }
          )
          .then(res => {
            this.$toast.clear();
            var rescode = res.data.resultCode;
            if (rescode == 10000) {
              window.sessionStorage.clear();
              // window.sessionStorage.setItem('Xoken',res.data.data.X_Token)
              this.$store.dispatch("reset_actions", this.$restore_obj);
              this.$store.dispatch("X_Token_actions", res.data.data.X_Token);
              this.$store.dispatch("usertype", res.data.data.userType);
              this.$store.dispatch("setUser", this.username);
              // this.reload();
              if (res.data.data.isAuth == 1) {
                this.$routerto("mhome");
              } else if (res.data.data.isAuth == 0) {
                this.$routerto("usercheck");
              }
            }
            this.remind = res.data.resultDesc;
          })
          .catch(err => {});
      } else {
        this.remind = this.$t("common.AccountAndPasswordCannotBeEmpty");
      }
    }
  }
};
// 10011	登录账号不能为空
// 10012	密码不能为空
// 10013	账号不存在
// 10014	账号或密码不正确
// 10000	登录成功
</script>

<style lang='scss' scoped>
#login {
  height: 100vh;
  width: 100vw;
  background: #2f36ac;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  div.logo {
    width: 57.33vw;
    height: 14.92vh;
    margin-top: 24.96vh;
    // box-sizing: border-box;
    margin-bottom: 33.96vh;
    .switchLan {
      height: 2.85vh;
      position: absolute;
      // padding:  3.34vh 0;
      width: vw(76);
      box-sizing: border-box;
      color: #2f36ac;
      top: 2.35vh;
      background: #0ce5b2;
      right: 6.27vw;
      // font-size: vw(30);
      line-height: 2.85vh;
      text-align: center;
      border-radius: 15px;
      font-weight: 550;
      cursor: pointer;
      .mu-ripple-wrapper {
      }
    }

    img {
      // width: 57.33vw;
      width: 100%;
      height: auto;

      // height: 14.92vh;
      /*max-height: 100%;*/
      /*max-width: 100%;*/
    }
  }

  @media screen and (min-width: 1024px) {
    h2 {
      /* height: 50%; */
    }
  }

  .main {
    /*flex: 1;*/
    /* // width: 100%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    > p {
      font-size: 2.4vh;
      // height: 0.84rem;
      // line-height: 0.32em;
      color: #0ce5b2;
      border-bottom: 1px solid #0ce5b2;
      margin-bottom: 3.3vh;
    }
    button {
      color: #2f36ac;
      border-radius: 15px;
      width: 75.87vw;
      font-weight: 550;
      line-height: 5.62vh;
      height: 5.62vh;
      font-size: 2.4vh;
    }
    .registerbtn {
      button {
        background: #0ce5b2;
        margin-bottom: 2.4vh;
      }
    }
    p.login {
      color: #fff;
      border: none;
    }
  }
}
</style>
