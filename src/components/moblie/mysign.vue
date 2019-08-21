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
          <span>234dfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdf</span>
        </p>
        <p>
          <span>申请中间人:</span>
          <span>23432</span>
        </p>
        <p>
          <span>申请项目:</span>
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
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 4 }
      ]
    };
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
  .van-dropdown-menu {
    height: 1rem;
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
      height: 1.5rem;
      font-size: 0.4rem;
      border-bottom: 0.1rem solid #d2d2d2;
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
      padding: 0.4rem 0;
      border-bottom: 0.01rem dashed #b5b5b5;
      font-size: 0.3rem;
      p {
        display: flex;
        align-items:baseline;
        span:nth-child(1) {
          font-weight: 600;
          font-size: 0.3rem;
          line-height: 0.6rem;
          display: inline-block;
          width: 2rem;
        }
        span:nth-child(2) {
          font-weight: 500;
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
        height: 0.8rem;
        width: 0.8rem;
      }
    }
  }
}
</style>

