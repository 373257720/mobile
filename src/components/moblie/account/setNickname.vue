<template>
  <div id="setNickname">
    <commonnav>
      {{$t('Account.EditInformation')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <form ref="form" @submit.prevent="submit_click">
        <div class="mui-input-row input-row nickname">
          <p class="label">Nickname</p>
          <input name="userName" type="text" v-model="validateForm.username" />
        </div>
        <div class="mui-input-row input-row select">
          <p>{{$t('Account.WhethertoshowMiddleman')}}</p>
          <van-switch active-color="#00F0AB" v-model="validateForm.checked" />
        </div>
        <div class="mui-input-row input-row select">
          <p>{{$t('Account.WhethertoshowMiddleman')}}</p>
          <van-switch active-color="#00F0AB" v-model="validateForm.checked" />
        </div>
        <div class="mui-input-row input-row select">
          <p>{{$t('Account.WhethertoshowMiddleman')}}</p>
          <van-switch active-color="#00F0AB" v-model="validateForm.checked" />
        </div>
        <footer>
          <van-button type="primary" native-type="submit" color="#00F0AB">Submit</van-button>
          <!-- <button class="button is-primary" type="submit">Submit</button> -->
        </footer>
      </form>
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
    submit_click() {}
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
    // height: vw(30);
    // font-size: vw(30);
    // font-weight: bold;
    // line-height: vw(30);
    // color: #4f3dad;
    // margin-bottom: vw(48);
  }
}
</style>
<style lang="scss" scoped>
#setNickname {
  main {
    color: #4f3dad;
    padding: 0 vw(94);
    padding-top: vw(222);
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
      width: 100%;
    }
    .mui-input-row {
      display: flex;
      flex-direction: column;

      p.label {
        margin-bottom: vw(62);
        height: vw(34);
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
      }
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
    }
    .select {
      // display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      // margin-bottom: vw(0);
      p {
        width: vw(462);
        font-size: vw(26);
        font-weight: bold;
        line-height: vw(30);
        color: #4f3dad;
        opacity: 1;
      }
    }
    footer {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
