<template>
  <div id="register">
    <h2>
      <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
    </h2>

    <div class="main">
      <p>{{remind}}</p>
      <div class="username" v-if="$route.query.email">
        <van-field v-model="username" placeholder="电子邮箱" disabled/>
      </div>
      <div class="username" v-if="!$route.query.email">
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
  created(){
    this.username=this.$route.query.email
    // console.log(this.$route.query.email);
    
  },
  methods: {
    register() {
      this.remind = "";
      if (this.username && this.password) {
         this.$loading();
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
           this.$toast.clear();
          if (rescode == 10000) {
            console.log("注册成功");
            this.$goto('usercheck');
          } else if (rescode == 10011) {
            this.remind = "登录账号不能为空";
          } else if (rescode == 10012) {
            this.remind = "密码不能为空";
          } else if ((rescode = 10013)) {
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
  .van-field__body {
    //  width: 100%;
    height: 1rem;
    border: 0.02rem solid #DDDDDD;
    border-radius: 0.05rem;
    background: #f6f6f6;
    padding: 0.34rem;
    box-sizing: border-box;
  }
  .van-field__control {
    font-size: 0.36rem;
      // line-height: 0.7rem;

  }
   .van-field__clear {
    // height: 0.1rem;
    font-size: 0.36rem;
  }
  .username,
  .password,
  .repeatpassword
   {
    .van-field {
      padding: 0;
      width: 9.8rem;
    }
  }
}
</style>
<style lang='scss' scoped>
#register {
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
      font-size: 0.34rem;
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
    .registerbtn button {
      background: #00adef;
       font-size: 0.3rem;
    }
    .registerbtn button {
      background: #ff7c2c;
        // font-size: 0.1rem;
         font-size: 0.3rem;
    }
  }
}
</style>

