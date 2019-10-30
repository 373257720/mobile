<template>
  <div id="register">
    <h2>
      <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
    </h2>

    <div class="main">
      <p>{{remind}}</p>
      <div class="username">
        <van-field v-model="username" placeholder="电子邮箱" clearable />
      </div>
      <div class="password">
        <van-field v-model="password" placeholder="请输入密码" clearable />
      </div>
      <div class="repeatpassword">
        <van-field v-model="password2" placeholder="请输入密码" clearable />
      </div>
      <div class="registerbtn">
        <button @click="register()">注册新账号</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      remind: ""
    };
  },
  methods: {
    register() {
      this.remind = "";
      if (this.username && this.password) {
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/bsl_web/user/register.do`,
          data: this.$qs.stringify({
            bslEmail: this.username,
            bslPwd: this.password
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          var rescode = res.data.resultCode;
          console.log(res);
          if (rescode == 10000) {
            console.log("注册成功");
            this.$goto('usercheck');
          } else if (rescode == 10011) {
            this.remind = "登录账号不能为空";
          } else if (rescode == 10012) {
            this.remind = "邮箱地址无效请重新输入";
          } else if ((rescode = 10014)) {
            this.remind = "该邮箱已注册，请登录";
          }
        });
      } else {
        this.remind = "账号和密码不能为空，请输入 ";
      }
    }
  }
};
</script>
<style lang='scss'>
#register {
  .username,
  .password,
  .repeatpassword {
    .van-field__body {
      height: 0.7rem;
      // border: 0.01rem solid #ababab;
      background: #f6f6f6;
      padding: 0.2rem;
      border-radius: 0.05rem;
          border: 0.02rem solid #ABABAB;
      box-sizing: border-box;
    }
    .van-field__control {
      font-size: 0.12rem;
      line-height: 0.7rem;
    }
    .van-field__clear {
      // height: 0.1rem;
      font-size: 0.3rem;
    }
    .van-field {
      padding: 0;
    }
  }
}
</style>
<style lang='scss' scoped>
#register {
  height: 100%;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h2 {
    padding: 2rem 0 2rem 0;
    text-align: center;
    img {
      width: 4.28rem;
      height: 1.5rem;
    }
  }
  .main {
    flex: 1;
    text-align: center;
    // display: flex;
    // flex-direction: column;
    p {
      font-size: 0.12rem;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #f36c69;
    }
    > div {
      margin-bottom: 0.5rem;
    }
    button {
      color: white;
      width: 100%;
      height: 0.7rem;
      border-radius: 0.05rem;
    }
    .registerbtn button {
      background: #ff7c2c;
    }
  }
}
</style>

