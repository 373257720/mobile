<template>
  <div id="mine">
    <header>
      <img src="../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
      <span>41545456</span>
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
          <van-dialog
            v-model="show"
            title="标题"
            show-cancel-button
            show-confirm-button
            :confirm="change_language()"
          >
            <van-radio-group v-model="radio">
              <van-cell-group>
                <van-cell title="ENGLISH" clickable @click="radio = '1'">
                  <van-radio slot="right-icon" name="1" />
                </van-cell>
                <van-cell title="中文" clickable @click="radio = '2'">
                  <van-radio slot="right-icon" name="2" />
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
      radio: "1"
    };
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
    change_language() {
      console.log(123);

      //      this.$axios({
      //   method: "post",
      //   url: `${this.$baseurl}/bsl_web/user/login.do`,
      //   data: this.$qs.stringify({
      //     bslEmail: this.username,
      //     bslPwd: this.password
      //   }),
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }
      // }).then(res => {
      //   var rescode = res.data.resultCode;
      // });
      // this.$dialog.confirm({
      //   title: "标题",
      //   message: "弹窗内容",
      //   // beforeClose
      //   showCancelButton: false,
      //   showConfirmButton: false
      // });
    },
    switch_language() {
      this.show = true;
    },
    loginout() {
      // console.log(this.$dialog);
      this.$dialog
        .confirm({
          title: "您选择退出当前登录账号，",
          message: "是否继续？"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
#mine {
  .van-dialog {
    font-size: 0.3rem;
  }
  section .van-dialog {
    .van-dialog__header {
      padding-top: 0.5rem;
    }
    .van-dialog__content {
      li {
        padding: 0 0.5rem;
      }
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
    height: 3rem;
    // z-index: 5;
    //  position: fixed;
    // text-align: center;
    line-height: 3rem;
    padding: 0 0.5rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      vertical-align: middle;
      margin-right: 0.3rem;
    }
  }
  nav {
    height: 0.2rem;
    background: #f2f2f2;
  }
  main {
    //  z-index: 0;
    ul {
      padding: 0 0.5rem;
      li {
        font-size: 0.2rem;
        line-height: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.01rem dashed #b5b5b5;
        p {
          display: flex;
          width: 2rem;
          justify-content: space-between;
          align-items: center;
        }
        img {
          height: 0.5rem;
        }
      }
    }
  }
}
</style>
