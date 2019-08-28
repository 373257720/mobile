<template>
  <div id="mysign">
    <nav>
      <header>
        <van-icon name="arrow-left" @click="$global.previous()" />我的簽約項目
      </header>
      <main>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </main>
    </nav>
    <ul>
      <li v-for="item in arr" :key="item">
        <p>
          <span>申请时间:</span>
          <span>到发广告的非</span>
        </p>
        <p>
          <span>申请中间人:</span>
          <span>23432</span>
        </p>
        <p>
          <span>申请项目:</span>
          <span>423423</span>
        </p>
        <p>
          <span>签约时间:</span>
          <span>423423</span>
        </p>
        <p>
          <span>签约状态:</span>
          <span>423423</span>
        </p>
        <img src="../../assets/微信图片_201908191046412.png" alt />
      </li>
    </ul>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "mysign",
  data() {
    return {
      arr: [1, 2, 3, 5, 9, 8, 10, 90, 40],
      value1: 0,
      option1: []
    };
  },
  created() {
    //  console.log();
    let usertype = this.$store.state.currentUsertype;
    console.log(usertype);

    if (usertype == 1) {
      this.option1 = [
        { text: "签约请求", value: 0 },
        { text: "签约成功", value: 1 },
        { text: "拒绝签约", value: 2 }
      ];
    } else if (usertype == 0) {
      this.option1 = [
        { text: "已连接项目", value: 0 },
        { text: "等待确认", value: 1 }
      ];
    } else if (usertype == 2) {
      this.option1 = [
        { text: "已连接项目", value: 0 },
        { text: "等待确认", value: 1 }
      ];
    }
    console.log(this.option1);
  }
};
</script>

<style lang="scss">
#mysign {
  header {
    position: relative;
    .van-icon-arrow-left {
      // line-height: 1rem;
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-cell {
    padding: 0.1rem 0.3rem;
    .van-cell__title {
      text-align: center;
    }
  }
  .van-cell__value {
    display: none;
  }
  .van-dropdown-menu {
    height: 1rem;
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
    border-bottom: 0.03125rem solid #ebedf0;
  }
  .van-hairline--top-bottom {
    // z-index: -3;

    text-align: left;
    .van-ellipsis {
      font-size: 0.3rem;
    }
    .van-cell--clickable {
      font-size: 0.3rem;
    }
  }
}
</style>
<style lang="scss" scoped>
#mysign {
  width: 100%;
  nav {
    width: 100%;
    position: fixed;
    z-index: 5;
    text-align: center;
    top: 0;
    background: white;
    header {
      line-height: 1.5rem;
      font-size: 0.46rem;
      height: 1.5rem;
      // font-size: 0.4rem;
      border-bottom: 0.08rem solid #d2d2d2;
    }
  }
  ul {
    padding: 2.6rem 0 1.5rem 0;
    background: white;
    li {
      // line-height: 0.6rem;
      position: relative;
      word-break: break-all;
      margin: 0 0.5rem;
      padding: 0.2rem 0;
      border-bottom: 0.01rem dashed #b5b5b5;
      font-size: 0.3rem;
      p {
        display: flex;
        align-items: baseline;
        span:nth-child(1) {
          font-weight: 600;
          font-size: 0.28rem;
          line-height: 0.46rem;
          display: inline-block;
          width: 2rem;
        }
        span:nth-child(2) {
          font-weight: 500;
          font-size: 0.28rem;
          color: #575757;
          display: inline-block;
          width: 3rem;
        }
      }
      img {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 0.6rem;
        width: 0.6rem;
      }
    }
  }
}
</style>

