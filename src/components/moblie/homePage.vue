<template>
  <div id="homePage">
    <header class="logo">
      <img src="../../../static/pic/newlogo.png" alt />
      <a href="javascript:void(0);" @click="switchLan(lan)">
        <div class="iconfont icon-language switchLan"></div>
      </a>
    </header>

    <div class="main">
      <div class="registerbtn common">
        <van-button
          @click="()=>{
          $routerto('register')
          }"
        >{{$t('common.Register')}}</van-button>
      </div>
      <p class="login" @click="$routerto('login')">{{$t('common.LogIn')}}</p>
    </div>
  </div>
</template>
<script>
// import { i18n } from "../../language";
// import Vue from "vue";
// import VeeValidate, { Validator } from "vee-validate";
export default {
  name: "homePage",
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
    this.lan = this.$i18n.locale;
    this.switchLan();
  },
  mounted() {},
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
            // this.$toast(res.data.resultDesc);
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
#homePage {
  display: flex;
  flex-direction: column;
  align-items: center;
  header.logo {
    padding: vw(384) 0 vw(414);
    .switchLan {
      position: absolute;
      font-size: vw(50);
      box-sizing: border-box;
      color: #2f36ac;
      top: vw(53);
      right: vw(40);
      text-align: center;
      font-weight: 550;
      cursor: pointer;
    }
    img {
      width: vw(436);
      height: vw(202);
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    > p {
      font-size: vw(40);
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
      height: vw(114);
      font-size: vw(40);
    }
  }
}
</style>
