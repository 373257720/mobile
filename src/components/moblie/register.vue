<template>
  <div id="register">
    <h2>
      <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
    </h2>
    <div class="main">
      <p>{{remind}}</p>
      <van-form>
      <div class="username form">
        <van-field v-model="username" :placeholder="$t('common.Email')" clearable />
      </div>
      <div class="password form">
        <van-field type="password" v-model="password" :placeholder="$t('common.PassWord')" clearable />
      </div>
      <div class="repeatpassword form">
        <van-field type="password" v-model="password2" :placeholder="$t('common.ConfirmPassword')" clearable />
      </div>
      <div class="registerbtn form">
        <button @click="register()">{{$t('common.Register')}}</button>
      </div>
      </van-form>
       <div class="tologin">
         <p class="tologin" @click="$goto('login')">{{$t('common.AlreadyHaveAnAccount')}}</p>
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
  created() {
    this.username = this.$route.query.email?this.$route.query.email:'';
    // console.log(this.$route.query.email);
  },
  methods: {
    register() {
      this.remind = "";
      if (
        this.username &&
        this.password &&
        this.password2 &&
        this.password === this.password2
      ) {
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
            // console.log("注册成功");
            this.$dialog
              .alert({
                title: this.$t('common.registrationSuccess'),
                message: this.$t('common.NextLogin'),
              })
              .then(() => {
                this.$goto("login");
              });
          } else {
            this.remind = res.data.resultDesc;
          }
        });
      } else if (
        this.username &&
        this.password &&
        this.password2 &&
        this.password != this.password2
      ) {
        this.remind =this.$t('common.PasswordsEnteredTwiceAreInconsistent');
      } else {
        this.remind = this.$t('common.AccountAndPasswordCannotBeEmpty');
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
    border: 0.02rem solid #dddddd;
    border-radius: 0.05rem;
    background: #f6f6f6;
        padding:0.1rem 0.3rem;
    box-sizing: border-box;
  }
  .van-field__control {
    font-size: 0.42rem;
    // line-height: 0.7rem;
  }
  .van-field__clear {
    // height: 0.1rem;
    font-size: 0.38rem;
  }
  .username,
  .password,
  .repeatpassword {
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
  width: 100%;
  // width: 9.90rem;
  // margin: 0 auto;
  display: flex;
  flex-direction: column;
  // justify-content: center;

  h2 {
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      // width: 4.28rem;
      height: 1.54rem;
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    div.form {
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.34rem;
      height: 0.84rem;
      line-height: 0.84rem;
      color: #f36c69;
    }
    div.tologin{
       width: 9.8rem;
       display: flex;
       justify-content:flex-end;
       p{
        //  align-self:  flex-end;
          color:#00adef;
          text-decoration:underline;
          cursor: pointer;
       }
    }

    button {
      color: white;
      // width: 100%;
      // font-size: 0.1rem;
      border-radius: 0.05rem;
      width: 9.8rem;
      line-height: 1rem;
      height: 1rem;
    }
    .registerbtn button {
      background: #ff7c2c;
      // font-size: 0.1rem;
      font-size: 0.42rem;
    }
  }
}
</style>

