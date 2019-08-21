<template>
  <div id="mine">
    <header>
      <img src="../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
      <span>41545456</span>
    </header>
    <nav></nav>
    <main>
      <ul>
        <li>
          <p>
            <img src="../../assets/6d991a52e05250a2570d768f8cc1e3e.png" alt />
            <span>个人审核</span>
          </p>
          <van-icon name="arrow" />
        </li>
        <li>
          <p>
            <img src="../../assets/4d28cc99e537444f8869e17c77906f4.png" alt />
            <span>切换语言</span>
          </p>
          <van-icon name="arrow" />
        </li>
        <li>
          <p>
            <img src="../../assets/10fe37a805f657460d990771d6454f1.png" alt />
            <span @click="gg">退出登录</span>
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
  methods: {
    gg() {
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

}
.van-dialog {
  font-size: 0.3rem;
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
