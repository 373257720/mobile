<template>
  <div id="login">
    <h2>
      <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
    </h2>
    <div class="main">
      <p>{{remind}}</p>
      <div class="username" v-if="$route.query.email">
        <van-field v-model.trim="username" placeholder="电子邮箱" disabled />
      </div>
      <div class="username" v-if="!$route.query.email">
        <van-field v-model.trim="username" placeholder="电子邮箱" clearable />
      </div>
      <div class="password">
        <van-field v-model.trim="password" type="password" placeholder="请输入密码" clearable />
      </div>
      <div class="loginbtn">
        <button @click="login">登 录</button>
      </div>
      <div class="registerbtn">
        <button @click="$routerto('register')">注册新账号</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      remind: ""
    };
  },
  created() {
    console.log(this.$restore_obj);
    if(this.$route.query.email){
      this.username = this.$route.query.email;
    }
    
    // console.log(this.$route.query.email);
  },
  methods: {
    login() {
      this.remind = "";
      if (this.username && this.password) {
        this.$loading();
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/bsl_web/user/login.do`,
          data: this.$qs.stringify({
            bslEmail: this.username,
            bslPwd: this.password
          })
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded"
          // }
        }).then(res => {
          this.$toast.clear();
          var rescode = res.data.resultCode;
          if (rescode == 10000) {
            sessionStorage.clear();
            this.$store.dispatch("reset_actions", this.$restore_obj);
            this.$store.dispatch("usertype", res.data.data.userType);
            this.$store.dispatch("setUser", this.username);
            if (res.data.data.isAuth == 1) {
              this.$goto("mhome");
            } else if (res.data.data.isAuth == 0) {
              this.$goto("usercheck");
            }
          }
          this.remind=res.data.resultDesc;
        })
        .catch(err => {
        if (err) {
          // this.$toast.clear();
          // this.$loadingfail('网络故障');
        }
        });
      } else {
        this.remind = "账号和密码不能为空，请输入 ";
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
<style lang='scss'>
#login {
  .van-field__body {
    //  width: 100%;
    height: 1rem;
    border: 0.02rem solid #dddddd;
    border-radius: 0.05rem;
    background: #f6f6f6;
    padding: 0.34rem;
    box-sizing: border-box;
  }
  .van-field__control {
    font-size: 0.38rem;
    // line-height: 0.7rem;
  }
  .van-field__clear {
    // height: 0.1rem;
    font-size: 0.38rem;
  }
  .username,
  .password {
    .van-field {
      padding: 0;
      width: 9.8rem;
    }
  }
}
</style>
<style lang='scss' scoped>
#login {
  height: 100%;
  // width: 80%;
  // width: 9.90rem;
  // margin: 0 auto;
  display: flex;
  flex-direction: column;
  // justify-content: center;

  h2 {
    padding: 3.24rem 0 3.04rem 0;
    text-align: center;
    img {
      // width: 4.28rem;
      height: 1.54rem;
    }
  }
  .main {
    flex: 1;
    // width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 0.38rem;
      height: 0.84rem;
      line-height: 0.84rem;
      color: #f36c69;
    }
    > div {
      margin-bottom: 0.5rem;
    }
    button {
      color: white;
      // width: 100%;
      // font-size: 0.1rem;
      border-radius: 0.05rem;
      width: 9.8rem;
      height: 1rem;
    }
    .loginbtn button {
      background: #00adef;
      font-size: 0.38rem;
    }
    .registerbtn button {
      background: #ff7c2c;
      // font-size: 0.1rem;
      font-size: 0.38rem;
    }
  }
}
</style>
