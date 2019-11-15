<template>
  <div id="mine">
    <header>
      <img src="../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
      <span>{{$store.state.currentUser}}</span>
    </header>
    <nav></nav>
    <main>
      <ul>
        <li @click="$goto('userpass')">
          <p>
            <img src="../../assets/6d991a52e05250a2570d768f8cc1e3e.png" alt />
            <span>个人审核</span>
          </p>
          <van-icon name="arrow" />
        </li>
        <li @click="switch_language">
          <p>
            <img src="../../assets/4d28cc99e537444f8869e17c77906f4.png" alt />
            <span>切换语言</span>
          </p>
          <van-icon name="arrow" />
        </li>
        <section>
          <van-dialog v-model="show" title="标题" show-cancel-button :beforeClose="changelanguage">
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
        <li @click="loginout">
          <p>
            <img src="../../assets/10fe37a805f657460d990771d6454f1.png" alt />
            <span>退出登录</span>
          </p>
          <van-icon name="arrow" />
        </li>
        <van-dialog v-model="show2" :show-confirm-button="false">
          <footer>
            <p>你选择退出当前登录账户,是否继续</p>
            <aside>
              <button @click="loginout(1)">确定</button>
              <button @click="loginout(2)">取消</button>
            </aside>
          </footer>

          <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
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
      show2: false,
      radio: "en_US"
    };
  },
  created() {
    // console.log(this.$store.state.currentUser);
  },
  methods: {
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
    changelanguage(action, done) {
      // console.log(this.radio);
      if (action === "confirm") {
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/bsl_web/base/language.do?lan=${this.radio}`
        }).then(res => {
          // console.log(res);
          done();
        });
      } else if (action === "cancel") {
        done(); //关闭
      }
    },
    switch_language() {
      this.show = true;
    },
    loginout(num) {
      // console.log(this.$dialog);
      this.show2 = !this.show2;
      if (num == 1) {
        this.$global
          .changepage(`${this.$baseurl}/bsl_web/user/logOut`, "get")
          .then(res => {
            console.log(res);
            if (res.data.resultCode == 10000) {
              this.$goto("login");
            }
          });
      }else if(num==2){
           this.show2 = false;
      }
    }
  }
};
</script>
<style lang="scss">
#mine {
  .van-dialog {
    font-size: 0.4rem;
  }
  section .van-dialog {
    .van-dialog__header {
      padding-top: 0rem;
      height: 1.2rem;
      line-height: 1.2rem;
    }
    .van-dialog__content {
      li {
        padding: 0 0.5rem;
      }
      .van-icon {
        width: 0.4rem;
        height: 0.4rem;
      }
      .van-radio__icon {
        font-size: 0.3rem;
      }
    }
    .van-button--large {
      height: 1.2rem;
      line-height: 1.2rem;
    }
    .van-cell {
      font-size: 0.3rem;
    }
  }
}

.van-dialog__message {
  font-size: 0.3rem;
}
.van-button {
  font-size: 0.3rem;
}
</style>
<style lang="scss" scoped>
#mine {
  background: white;
  header {
    height: 3.12rem;
    // z-index: 5;
    font-size: 0.4rem;
    //  position: fixed;
    // text-align: center;
    line-height: 3rem;
    padding: 0 0.62rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      vertical-align: middle;
      margin-right: 0.44rem;
    }
  }
  nav {
    height: 0.38rem;
    background: #f2f2f2;
  }
  main {
    //  z-index: 0;
    ul {
      padding: 0 0.5rem;
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
        padding: 0 0.6rem 0.5rem 0.6rem;
         font-size: 0.38rem;
        p {
          text-align: center;
          height: 1.5rem;
          // font-size: 0.4rem;
          margin-top: 1rem;
        }
        aside {
          height: 2.5rem;
          display: flex;
          // font-size: 0.38rem;
          flex-direction: column;
          justify-content: space-between;
          button {
            height: 1rem;
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
