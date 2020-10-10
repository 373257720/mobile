<template>
  <div id="setNickname">
    <commonnav>{{$t('Account.EditInformation')}}</commonnav>
    <main>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item
          :label="$t('Account.Nickname')"
          class="nickname"
          prop="PersonalName"
          :rules="nicknameRules"
        >
          <mu-text-field v-model="validateForm.nickname"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="PersonalName" class="switch" :rules="usernameRules">
          <div>{{$t('Account.WhethertoshowInvestors')}}</div>
          <van-switch active-color="#00F0AB" v-model="validateForm.checked" />
        </mu-form-item>
        <mu-form-item prop="PersonalName" class="switch" :rules="usernameRules">
          <div>{{$t('Account.WhethertoshowMiddleman')}}</div>
          <van-switch active-color="#00F0AB" v-model="validateForm.checked" />
        </mu-form-item>
        <mu-form-item>
          <van-button @click="submit">{{$t('Account.Comfirm')}}</van-button>
        </mu-form-item>
      </mu-form>
    </main>
  </div>
</template>
<script>
export default {
  name: "setNickname",
  data() {
    return {
      validateForm: {
        nickname: "",
        checked: true
      },
      nicknameRules: [
        { validate: val => !!val, message: "Username must be filled in" }
      ]
    };
  },
  created() {},
  methods: {
    // handleleterClick() {},
  }
};
</script>
<style lang='scss'>
#setNickname {
  .mu-input-focus-line {
    display: none;
  }
  .van-switch {
    width: vw(69);
    height: vw(41);
  }
  .van-switch__node {
    width: vw(37);
    height: vw(39);
  }
  .van-switch--on .van-switch__node {
    transform: translateX(vw(33));
  }
  .van-switch--on {
    border: 1px solid transparent;
  }
  .switch {
    .mu-form-item-content {
      display: flex;
      flex-wrap: initial;
      > div:nth-of-type(1) {
        width: vw(462);
        height: vw(60);
        font-size: vw(26);
        font-weight: bold;
        line-height: vw(30);
        color: #4f3dad;
      }
    }
  }
  .van-button--normal {
    width: vw(238);
    height: vw(72);
    background: #00f0ab;
    color: #fff;
    border-radius: vw(16);
  }
  .nickname {
    height: vw(30);
    font-size: vw(30);
    font-weight: bold;
    line-height: vw(30);
    color: #4f3dad;
    margin-bottom: vw(48);
  }
  .mu-input__error {
  }
  .mu-input__focus {
    color: #4f3dad;
  }

  .mu-input-line {
    background: #4f3dad;
    height: 2px;
  }
  .mu-text-field-input {
    color: #4f3dad;
    font-size: vw(32);
  }
  .mu-form-item__error .mu-form-item-help {
    bottom: vw(-4);
  }
}
</style>
<style lang="scss" scoped>
#setNickname {
  padding-top: vw(96);
  main {
    margin-top: vw(76);
    color: #4f3dad;
    padding: 0 vw(94);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
