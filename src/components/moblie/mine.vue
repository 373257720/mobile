<template>
  <div id="mine">
    <commonnav>
      {{ $t("Account.Account") }}
      <!-- <template v-slot:arrowLeft>
        <span class="iconfont icon-account iconLeft" @click="$routerto('setNickname')"></span>
      </template>-->
      <template v-slot:arrowRight>
        <p class="iconRight">
          <span
            class="iconfont icon-bitbroicon_setting"
            @click="$routerto('setNickname')"
          ></span>
          <span
            class="iconfont icon-message"
            :class="{ redPoint: $store.state.UnreadMessage > 0 }"
            @click="$routerto('AccountMessage')"
          ></span>
        </p>
      </template>
    </commonnav>
    <main>
      <div class="iconfont icon-account"></div>
      <p v-if="$store.state.currentUsertype == 4" @click="$routerto('vip')">
        {{ user_infor.username }}
      </p>
      <p v-else>{{ user_infor.username }}</p>
      <p>{{ user_infor.account }}</p>
    </main>
    <footer>
      <ul>
        <li v-if="$store.state.currentUsertype == 4" @click="$routerto('vip')">
          <div class="iconfont icon-account"></div>
          <div>{{ $t("Account.Membership") }}</div>
        </li>
        <li @click="$routerto('personalReview')">
          <div class="iconfont icon-account"></div>
          <div>{{ $t("Account.PersonalReview") }}</div>
        </li>
        <li @click="switch_language">
          <div class="iconfont icon-language"></div>
          <div>{{ $t("Account.Language") }}</div>
        </li>
        <li @click="$routerto('changePassword')">
          <div class="iconfont icon-password"></div>
          <div>{{ $t("common.changePassword") }}</div>
        </li>
        <li @click="() => (remindervisible = true)">
          <div class="iconfont icon-quit"></div>
          <div>{{ $t("Account.Logout") }}</div>
        </li>
      </ul>
      <!-- 2-5 -->
    </footer>
    <DialogMsg
      msg=""
      :title.sync="content"
      @comfirmFromDialog="loginout"
      :showCancel="true"
      :remindervisible.sync="remindervisible"
    ></DialogMsg>
    <van-dialog
      v-model="show"
      :title="$t('common.SwitchLanguage')"
      show-cancel-button
      :beforeClose="changelanguage"
    >
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            :title="$t('common.English')"
            clickable
            @click="radio = 'en_US'"
          >
            <van-radio slot="right-icon" name="en_US" />
          </van-cell>
          <van-cell
            :title="$t('common.Chinese')"
            clickable
            @click="radio = 'zh_CN'"
          >
            <van-radio slot="right-icon" name="zh_CN" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: "mine",
  data() {
    return {
      show: false,
      email: "",
      content: this.$t("common.YouChooseToLogOut"),
      title: "",
      remindervisible: false,
      reminder: "",
      logout: false,
      radio: "",
      user_infor: {
        account: "",
        username: "",
      },
    };
  },
  created() {
    this.getAuthDetails();
    this.radio = this.$i18n.locale;
  },
  methods: {
    getAuthDetails() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/getAuthDetails`
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            if (res.data.data.userIdentityType == 1) {
              this.user_infor.username = res.data.data.userName;
            } else if (res.data.data.userIdentityType == 2) {
              this.user_infor.username =
                this.$i18n.locale == "zh_CN"
                  ? res.data.data.userCompanyCh
                  : res.data.data.userCompanyEn;
            }
            this.$store.dispatch("setUser", this.user_infor.username);
            this.user_infor.account = res.data.data.bslEmail;
          }
        });
    },
    changelanguage(action, done) {
      if (action === "confirm") {
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_web/base/language.do`,
            { lan: this.radio }
          )
          .then((res) => {
            if (res.data.resultCode == 10000) {
              window.localStorage.setItem("language", this.radio);
              this.$Local(this.radio);
              this.$i18n.locale = this.radio;
              this.$store.dispatch("X_Token_actions", res.data.data.X_Token);
              this.getAuthDetails();
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
        .then((res) => {
          console.log(res);
          if (res.data.resultCode == 10000) {
            this.$emit("cancelCountUserMessageUnread");
            this.$store.dispatch("reset_actions", this.$restore_obj);
            sessionStorage.clear();

            // location.replace = process.env.WEB_API;
            // this.$routerto("homePage");
            location.href = process.env.WEB_API;
          }
        });
    },
  },
};
</script>
<style lang="scss">
/*van-fade-enter-active*/
/*van-fade-enter-to*/
#mine {
  #common_nav header .iconRight {
    display: flex;
    align-items: center;
  }
  .van-radio__icon--checked .van-icon {
    color: #00f0ab;
    background-color: #fff;
  }
  .van-radio__icon .van-icon {
    border: 1px solid #fff;
  }
  .van-cell-group {
    background-color: #00f0ab;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0 0;
  }
  .van-cell::after {
    border-bottom: 0;
  }
  // .van-hairline--top-bottom::after {
  //   border-width: 2px 0;
  // }
  // .van-hairline-unset--top-bottom::after {
  //   border-width: 0 0;
  // }
  // .van-cell::after {
  //   border-bottom: 2px solid #fff;
  // }
  .icon-bitbroicon_setting {
    font-size: 20px;
    margin-right: 10px;
  }
  .icon-message {
    font-size: 20px;
    position: relative;
  }
  .redPoint::after {
    position: absolute;
    top: 11px;
    right: -4px;
    content: "";
    border: 1px solid #fff;
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }
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
  overflow-y: auto;

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
    // .iconfont {
    //   font-size: vw(28);
    // }
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
