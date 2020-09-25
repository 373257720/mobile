<template>
  <div id="login">
    <div class="logo">
      <img src="../../../static/pic/image1.png" alt />
      <button class="switchLan" color="#0ce5b2" @click="switchLan(lan)">{{lantext}}</button>
    </div>
    <div class="main">
      <div class="registerbtn common">
        <van-button @click="$routerto('register')">{{$t('common.Register')}}</van-button>
      </div>
      <p class="login" @click="$routerto('login1st')">{{$t('common.LogIn')}}</p>
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


    // if (this.$route.query.email) {
    //   this.username = this.$route.query.email ? this.$route.query.email : "";
    // }
    this.lan = this.$i18n.locale;
    this.switchLan();
  },
  mounted(){
    // console.log(document.documentElement);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  div.logo {
    width: vw(436);
    height: vw(202);
    margin-top: vw(384);
    margin-bottom: vw(514);
    .switchLan {
      // height: 2.85vh;
      position: absolute;
      width: vw(76);
      box-sizing: border-box;
      color: #2f36ac;
      top: vw(53);
      background: #0ce5b2;
      right: vw(40);
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
      font-size: vw(40);
      // height: 0.84rem;
      // line-height: 0.32em;
      color: #4f3dad;
      margin-bottom: vw(234);
      margin-top: vw(98);

      font-weight: bold;
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
    .registerbtn {
      button {
        // background: #0ce5b2;
        // margin-bottom: 2.4vh;
      }
    }
    p.login {
      // color: #fff;
      border: none;
    }
  }
}
</style>
