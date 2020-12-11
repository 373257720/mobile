<template>
  <div id="mine">
    <commonnav>
      {{$t('Account.Account')}}
      <template v-slot:arrowLeft>
        <span class="iconfont icon-account iconLeft" @click="$routerto('setNickname')"></span>
      </template>
      <template v-slot:arrowRight>
        <span class="iconfont icon-account iconRight" @click="$routerto('AccountMessage')"></span>
      </template>
    </commonnav>
    <main>
      <div class="iconfont icon-account"></div>
      <p @click="$routerto('vip')">Peter parker</p>
      <p>Peter parker</p>
    </main>
    <footer>
      <ul>
        <li @click="$routerto('vip')">
          <div class="iconfont icon-account"></div>
          <div>Membership</div>
        </li>
        <li @click="$routerto('personalReview')">
          <div class="iconfont icon-account"></div>
          <div>{{$t('Account.PersonalReview')}}</div>
        </li>
        <li>
          <div class="iconfont icon-account"></div>
          <div>{{$t('Account.Language')}}</div>
        </li>
        <li @click="$routerto('forgotpassword')">
          <div class="iconfont icon-account"></div>
          <div>{{$t('Account.Password')}}</div>
        </li>
        <li @click="()=>remindervisible=true">
          <div class="iconfont icon-account"></div>
          <div>{{$t('Account.Logout')}}</div>
        </li>
      </ul>
    </footer>
    <DialogMsg
      :msg="content"
      :title.sync="title"
      :successto="successto"
      @comfirmFromDialog="loginout"
      :showCancel="true"
      :remindervisible.sync="remindervisible"
    ></DialogMsg>
  </div>
</template>
<script>
export default {
  name: "mime",
  data() {
    return {
      show: false,
      content: this.$t("common.YouChooseToLogOut"),
      title: "",
      successto: "",
      remindervisible: false,
      correct_password: false,
      password1: "",
      password2: "",
      reminder: "",
      logout: false,
      radio: "",
      user_infor: {}
    };
  },
  created() {
    // this.radio= window.localStorage.getItem("language");
    // this.$loading();
    // this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_web/user/getAuthDetails`).then(res=>{
    //   this.$toast.clear();
    //   if(res.data.resultCode==10000){
    //        this.user_infor={};
    //         if(res.data.data.userType==1){
    //           this.user_infor.name=res.data.data.userName;
    //         }else if(res.data.data.userType==2){
    //           this.user_infor.name=this.$i18n.locale=='zh_CN'?res.data.data.userCompanyCh:
    //             res.data.data.userCompanyEn;
    //         }
    //       this.user_infor.account=res.data.data.bslEmail;
    //   }
    // })
  },
  methods: {
    correct_password_function() {
      this.correct_password = true;
    },
    correct_password_fun(action, done) {
      if (action === "confirm") {
        if (this.password1 && this.password2) {
          if (this.password1 === this.password2) {
            this.$global
              .post_encapsulation(
                `${this.$axios.defaults.baseURL}/bsl_web/user/updatePwd`,
                { newPwd: this.password1 }
              )
              .then(res => {
                this.reminder = res.data.resultDesc;
                if (res.data.resultCode == 10000) {
                  setTimeout(() => {
                    this.password1 = "";
                    this.password2 = "";
                    this.reminder = "";
                    done();
                  }, 1000);
                } else {
                  done(false);
                }
              });
          } else {
            this.reminder = this.$t(
              "common.PasswordsEnteredTwiceAreInconsistent"
            );
            done(false);
          }
        } else {
          this.reminder = this.$t("common.PleaseFillInTheNewPassword");
          done(false);
        }
      } else if (action === "cancel") {
        this.password1 = "";
        this.password2 = "";
        this.reminder = "";
        done(); //关闭
      }
    },
    changelanguage(action, done) {
      if (action === "confirm") {
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_web/base/language.do`,
            { lan: this.radio }
          )
          .then(res => {
            if (res.data.resultCode == 10000) {
              window.localStorage.setItem("language", this.radio);
              this.$Local(this.radio);
              this.$i18n.locale = this.radio;
              this.$store.dispatch(
                "X_Token_actions",
                JSON.parse(res.data.data).X_Token
              );
            }
            this.$toast(res.data.resultDesc);
            done();
          });
      } else if (action === "cancel") {
        done(); //关闭
      }
    },
    switch_language() {
      this.show = true;
    },
    loginout() {
      this.remindervisible = false;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/logOut`
        )
        .then(res => {
          console.log(res);
          if (res.data.resultCode == 10000) {
            this.$store.dispatch("reset_actions", this.$restore_obj);
            sessionStorage.clear();
            this.$routerto("homePage");
          }
        });
    }
  }
};
</script>
<style lang="scss">
/*van-fade-enter-active*/
/*van-fade-enter-to*/
#mine {
  .van-overlay {
    // opacity: 0.5;
    background-color: rgba(0, 0, 0, 0.7);
    /*background-color: black;*/
  }

  .van-fade-leave-active {
    /*webkit-animation:none;*/
    animation: none;
  }
  .van-fade-enter-active {
    /*webkit-animation:none;*/
    animation: none;
  }
  /*.van-dialog {*/
  /*  font-size: 0.4rem;*/
  /*  transition-property: transform,-webkit-transform;*/
  /*}*/

  section .van-dialog {
    .van-dialog__header {
      padding-top: 0;
      margin: 0.4rem 0;
      // height: 1.2rem;
      font-size: 0.48rem;
      line-height: 1.2rem;
    }
    .van-dialog__content {
      li {
        padding: 0 0.5rem;
      }
      .van-icon {
        width: 0.48rem;
        height: 0.48rem;
      }
      .van-radio__icon {
        line-height: 0.48rem;
        font-size: 0.36rem;
      }
    }
    .van-button--large {
      // height: 1.2rem;
      line-height: 1.2rem;
    }
    .van-cell {
      font-size: 0.48rem;
    }
  }
}
</style>
<style lang="scss" scoped>
#mine {
  // padding-top: vw(46);
  // padding-bottom: vw(116);
  header {
    height: vw(56);
    box-sizing: initial;
    font-size: vw(40);
    color: #4f3dad;
    text-align: center;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 vw(30);
    .iconfont {
      font-size: vw(28);
    }
  }
  main {
    margin-top: vw(140);
    margin-bottom: vw(84);
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      height: vw(236);
      width: vw(236);
      font-weight: 100;
      color: #fff;
      font-size: vw(136);
      text-align: center;
      line-height: vw(236);
      background: #00f0ab;
      border-radius: 50%;
    }
    p:nth-of-type(1) {
      color: #4f3dad;
      font-size: vw(40);
      margin-top: vw(18);
      height: vw(44);
      line-height: vw(44);
      font-weight: bold;
    }
    p:nth-of-type(2) {
      color: #4f3dad;
      font-size: vw(24);
      margin-top: vw(16);
      height: vw(28);
      line-height: vw(28);
    }
  }
  footer {
    // margin-top: vw(150);
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        width: vw(586);
        height: vw(112);
        background: #4f3dad;
        border-radius: vw(16);
        margin-bottom: vw(60);
        display: flex;
        color: #fff;
        align-items: center;
        div:nth-of-type(1) {
          font-size: vw(36);
          margin: 0 vw(22);
        }
        div:nth-of-type(2) {
          font-size: vw(30);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
