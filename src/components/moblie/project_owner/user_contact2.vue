<template>
  <div id="user_contact2">
    <nav>
      <header>
        <van-icon name="arrow-left" @click="$global.previous()" />联络人
      </header>
      <main></main>
    </nav>
    <ul>
      <li>
        <img src="../../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
        <section>
          <p>
            <span>联系人名字</span>
            <span>到发广告的非fg的发给的发给官锅</span>
            <!-- <van-icon name="arrow" /> -->
          </p>
          <p>
            <span>投资者公司</span>
            <span>到发广告的非fg的发给的发给官锅</span>
            <!-- <van-icon name="arrow" /> -->
          </p>
          <p>
            <span>投资者电话:</span>
            <span>23432</span>
          </p>
          <p>
            <span>投资者邮箱:</span>
            <span>423423</span>
          </p>
          <p>
            <span>投资者兴趣:</span>
            <span>423423</span>
          </p>
        </section>
      </li>
    </ul>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "user_contact",
  data() {
    return {
      arr: [1, 2, 3, 5, 9, 8, 10, 90, 40],
      searchkey: "",
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 4 }
      ]
    };
  },
  methods: {
    onSearch() {
      console.log(this.searchkey);
    }
  }
};
</script>
<style lang="scss">
#user_contact2 {
  .van-search {
    padding: 0.1rem 0.2rem;
  }
  .van-search__action {
    font-size: 0.3rem;
    line-height: 0.5rem;
  }
  .van-cell {
    font-size: 0.1rem;
    line-height: 0.5rem;
    padding: 0.1rem 0.25rem 0.1rem 0;
  }
  .van-cell--clickable {
    padding: 0.1rem 0.3rem;
  }
  .van-field__left-icon .van-icon,
  .van-field__right-icon .van-icon {
    font-size: 0.3rem;
  }
  .van-field__clear {
    // height: 0.1rem;
    font-size: 0.3rem;
  }
  .van-field__control {
    // height: 0.5rem;
    // font-size: 0.1rem;
  }
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
#user_contact2 {
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
    padding: 2.5rem 0 1.5rem 0;
    background: white;
    li {
      // line-height: 0.6rem;
      position: relative;
      word-break: break-all;
      margin: 0 0.5rem 0;
    //   padding: 0rem 0 0.2rem 0;
      display: flex;
      font-size: 0.3rem;
      p {
        display: flex;
        flex-direction: column;
        margin-left: 0.4rem;
        margin-bottom: 0.3rem;
        // align-items: baseline;
        span:nth-child(1) {
          font-weight: 550;
          font-size: 0.3rem;
          line-height: 0.5rem;
          color: #4c4c4c;
          display: inline-block;
          //   width: 2rem;
        }
        span:nth-child(2) {
          font-weight: 500;
          color: #787878;
          font-size: 0.2rem;
          display: inline-block;
          //   width: 3rem;
        }
      }
      img {
        // position: absolute;
        // top: 0;
        // left: 0;
        transform: translate(0,-25%);
        height: 1rem;
        width: 1rem;
      }
    }
  }
}
</style>