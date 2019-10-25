<template>
  <div id="p_user_contact">
    <nav>
      <header>
        <van-icon name="arrow-left" @click="$global.previous()" />联络人
      </header>
      <main >
        <van-search
          v-model="searchkey"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          left-icon
          @search="onSearch"
        >
        <!-- <van-search placeholder="Placeholder" v-model="value"   left-icon  right-icon="search"/> -->
          <!-- <van-icon slot="action" name="search"  @click="onSearch" /> -->
          <div slot="action" @click="onSearch">
            <van-icon name="search" size=18 />
          </div>
        </van-search>
      </main>
    </nav>
    <ul>
      <li v-for="item in arr" :key="item">
        <img src="../../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
        <!-- <h2></h2> -->
        <p>
          <span>联系人名字</span>
          <span>到发广告的非fg的发给的发给官锅</span>
          <!-- <van-icon name="arrow" /> -->
        </p>
        <!-- <p>
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
        </p>-->
      </li>
      <!-- <li>
          <p>
            <img src="../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
            <span>到发广告的非官23423423423方的鬼地方更多个电饭锅</span>
          </p>
         
      </li>-->
    </ul>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_user_contact",
  data() {
    return {
      arr: [1, 2, 3, 5, 9, 8, 10, 90, 40],
      searchkey: "",
      value1: 0
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
#p_user_contact {
  .van-search {
    padding: 0.2rem 0.2rem;
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
#p_user_contact {
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
      margin: 0.2rem 0.5rem 0;
      padding: 0rem 0 0.2rem 0;
      display: flex;
      align-items: center;
      // border-bottom: 0.01rem solid #b5b5b5;
      font-size: 0.3rem;
      h2 {
        font-size: 0.32rem;
        font-weight: 600;
        line-height: 0.5rem;
        // margin-bottom: 0.5rem;
        padding-left: 0.2rem;
      }
      p {
        display: flex;
        flex-direction: column;
        margin-left: 0.3rem;
        line-height: 0.5rem;
        // align-items: baseline;
        span:nth-child(1) {
          font-weight: 550;
          font-size: 0.3rem;

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
        // transform: translate(-15%,-25%);
        height: 1rem;
        width: 1rem;
      }
    }
  }
}
</style>