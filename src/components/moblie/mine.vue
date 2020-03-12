<template>
  <div id="mine">
    <header>
      <img src="../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
      <div>
        <p>{{user_infor.name}}</p>
        <p>{{user_infor.account}}</p>
      </div>
    </header>
    <nav></nav>
    <main>
      <ul>
        <li @click="$goto('userpass')">
          <p>
            <img src="../../assets/6d991a52e05250a2570d768f8cc1e3e.png" alt />
            <span>个人审核</span>
          </p>
          <van-icon name="arrow"/>

        </li>
        <li @click="switch_language">
          <p>
            <img src="../../assets/4d28cc99e537444f8869e17c77906f4.png" alt />
            <span>切换语言</span>
          </p>
          <van-icon name="arrow" />
        </li>
        <section>
          <van-dialog v-model="show" title="此功能暂没开通" show-cancel-button :beforeClose="changelanguage">
            <van-radio-group v-model="radio">
              <van-cell-group>
              <van-cell title="ENGLISH" clickable @click="radio = 'en_US'">
                <van-radio slot="right-icon" name="en_US" />
              </van-cell>
              <van-cell title="中文" clickable @click="radio = 'zh_CN'">
                <van-radio slot="right-icon" name="zh_CN" />
              </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-dialog>
        </section>
        <li @click="correct_password_function">
          <p>
            <img src="../../assets/change_password.png" alt />
            <span>修改密码</span>
          </p>
          <van-icon name="arrow" />
        </li>
        <li @click="loginout">
          <p>
            <img src="../../assets/10fe37a805f657460d990771d6454f1.png" alt />
            <span>退出登录</span>
          </p>
          <van-icon name="arrow" />
        </li>
        <van-dialog v-model="logout" class="logout" :show-confirm-button="false">
          <footer>
            <p>你选择退出当前登录账户,是否继续</p>
            <aside>
              <button @click="loginout(1)">确定</button>
              <button @click="loginout(2)">取消</button>
            </aside>
          </footer>
        </van-dialog>

        <van-dialog v-model="correct_password" class="correct_password" show-cancel-button :beforeClose="correct_password_fun">
          <footer>
            <h4>修改密码</h4>
            <h5>{{reminder}}</h5>
            <div class="password">
              <van-field v-model.trim="password1" clearable placeholder="新密码" type="password" />
            </div>
            <div class="password2">
              <van-field v-model.trim="password2" clearable placeholder="确认密码" type="password"  />
            </div>
            <!-- <aside>
              <button @click="confirm_passowrd(1)">确定</button>
              <button @click="confirm_passowrd(2)">取消</button>
            </aside> -->
          </footer>
        </van-dialog>


      </ul>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "mime",
  data() {
    return {
      show: false,
      correct_password:false,
      password1:'',
      password2:'',
      reminder:'',
      logout: false,
      radio: "en_US",
      user_infor:{},
    };
  },
  created() {
    this.$loading();
    this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/user/getAuthDetails`).then(res=>{
      this.$toast.clear();
      if(res.data.resultCode==10000){
            // this.user_infor=res.data.data;
              this.user_infor={};
            if(res.data.data.userType==1){
              this.user_infor.name=res.data.data.userName;
            }else if(res.data.data.userType==2){
              this.user_infor.name=res.data.data.userCompanyCh;
            }
          this.user_infor.account=res.data.data.bslEmail;
      }
    })
  },
  methods: {
    correct_password_function(){
      this.correct_password = true;
    },
    confirm_passowrd(num){
      this.reminder='';
        if(num==2){
          this.correct_password = false;
          this.password1='';
          this.password2='';
        }else if(num==1){
            if(this.password1 && this.password2 ){
              if(this.password1 ===this.password2){
                this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/user/updatePwd`,{newPwd:this.password1}).then(
                  res=> {
                    this.reminder=res.data.resultDesc;
                    if(res.data.resultCode==10000){
                      setTimeout( () =>{
                        this.password1='';
                        this.password2='';
                        this.correct_password=false;
                      },1000)
                    }
                  }
                )}
                else {
                this.reminder="两次密码输入不一致"
              }
              }else{
              this.reminder='请填写新密码';
            }
        }

    },
    // beforeClose(action, done) {
    //   if (action === "confirm") {
    //     setTimeout(done, 1000);
    //   } else {
    //     done();
    //   }
    // },
    // onChange(event) {
    //   console.log(event);

    //   // this.setData({
    //   // radio: event.detail
    //   // });
    // },
    correct_password_fun(action,done){
        if (action === "confirm") {
          if(this.password1 && this.password2 ){
              if(this.password1 ===this.password2){
                this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/user/updatePwd`,{newPwd:this.password1}).then(
                  res=> {
                    this.reminder=res.data.resultDesc;
                    if(res.data.resultCode==10000){
                         setTimeout(()=>{
                          this.password1='';
                          this.password2='';
                          this.reminder='';
                           done();
                         }, 1000);
                    }else{
                      done(false);
                    }
                  }
                )}
                else {
                this.reminder="两次密码输入不一致"
                   done(false);
                }
              }else{
              this.reminder='请填写新密码';
                done(false);
            }
      } else if (action === "cancel") {
        this.password1='';
        this.password2='';
        this.reminder='';
        done(); //关闭
      }
    },
    changelanguage(action, done) {
      // console.log(this.radio);
      if (action === "confirm") {
        done();
        // this.$axios({
        //   method: "post",
        //   url: `${this.$baseurl}/bsl_web/base/language.do?lan=${this.radio}`
        // }).then(res => {
        //   // console.log(res);
        //   done();
        // });

      } else if (action === "cancel") {
        done(); //关闭
      }
    },
    switch_language() {
      this.show = true;
    },
    loginout(num) {
      // console.log(this.$dialog);
      this.logout = !this.logout;
      if (num == 1) {
        this.$global
          .changepage(`${this.$baseurl}/bsl_web/user/logOut`, "get")
          .then(res => {
            console.log(res);
            if (res.data.resultCode == 10000) {
               this.$store.dispatch("reset_actions",this.$restore_obj)
              // window.addEventListener("onunload", () => {
              //   console.log("onunload！！！！！");
              //   localStorage.clear();
               sessionStorage.clear()
              // });
              this.$goto("login");
            }
          });
      } else if (num == 2) {
        this.logout = false;
      }
    }
  }
};
</script>
<style lang="scss">
#mine {
  .van-overlay{
  // background-color:black;
  // opacity: 0.7;
}
  .van-dialog {
    font-size: 0.4rem;
  }
  section .van-dialog {
    .van-dialog__header{
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
        line-height:0.48rem;
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

// .van-dialog__message {
//   font-size: 0.3rem;
// }
// .van-button {
//   font-size: 0.48rem;
// }
</style>
<style lang="scss" scoped>
#mine {
  background: white;
  header {
    height: 3.12rem;
    font-size: 0.4rem;
    line-height: 0.6rem;
    padding: 0 0.62rem;
    display: flex;
    align-items: center;
    /*justify-content: center;*/
    img {
      width: 1.5rem;
      height: 1.5rem;
      /*vertical-align: middle;*/
      /*margin-right: 0.44rem;*/
    }
    >div{
      margin-left: 0.5rem;
      p:nth-of-type(1){
        /*margin-bottom: 0.5rem;*/
      }
      /*display: flex;*/
      /*flex-direction: column;*/
    }
  }
  nav {
    height: 0.38rem;
    background: #f2f2f2;
  }
  main {
    //  z-index: 0;
    ul {
      padding: 0 0.5rem 3rem 0.5rem;

      li {
        font-size: 0.38rem;
        // line-height: 1.5rem;
        padding: 0 0.3rem;
        height: 2.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed #b5b5b5;
        p {
          display: flex;
          // width: 2rem;
          justify-content: space-between;
          align-items: center;
        }
        img {
          height: 0.58rem;
          width: 0.58rem;
          margin-right: 0.55rem;
        }
      }
      footer {
        padding: 1rem 1rem 0 1rem;
        font-size: 0.38rem;
        p {
          text-align: center;
           font-size: 0.48rem;
          margin-bottom: 1rem;
        }
        aside {
          height: 2.5rem;
          display: flex;
          font-size: 0.38rem;
          flex-direction: column;
          justify-content: space-between;
          button {
            height: 1rem;
            line-height: 1rem;
            color: #ffffff;
          }
          button:nth-of-type(1) {
            background: #00adef;
            // margin-bottom: 0.5rem;
          }
          button:nth-of-type(2) {
            background: #ff7c2c;
          }
        }
      }
     .logout{
       footer{
         padding: 1rem;
       }
     }
      .correct_password{
        // footer{
        //    padding: 1rem;
        // }
        h4{
          text-align: center;
          font-size: 0.48rem;
          // margin-bottom: 0.5rem;
        }
        h5{
          text-align: center;
          font-size: 0.4rem;
          height: 1rem;
          line-height: 1rem;
          color:#ee0a24;
        }
        .password{
          margin-bottom: 0.5rem;
        }
        .password2{
          margin-bottom: 0.5rem;
        }
        .van-field {
          //  width: 100%;
          height: 1rem;
          border: 1px solid #dddddd;
          border-radius: 0.05rem;
          padding: 0;
          background: #f6f6f6;
          padding:0 0.34rem;
          box-sizing: border-box;
          line-height: 1rem;
        }
        .van-field__control {
          font-size: 0.38rem;
          // line-height: 0.7rem;
        }
        .van-field__label{
          width: 2rem;
        }
        aside {
          height: 2.6rem;
          display: flex;
          font-size: 0.38rem;
          flex-direction: column;
          justify-content: space-between;
          button {
            height: 1rem;
            line-height: 1rem;
            color: #ffffff;
          }
          button:nth-of-type(1) {
            background: #00adef;
          }
          button:nth-of-type(2) {
            background: #ff7c2c;
          }
        }

      }
    }
  }
}
</style>
