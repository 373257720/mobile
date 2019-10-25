<template>
  <div id="p_user_contact2">
    <nav>
      <header>
        <van-icon name="arrow-left" @click="$global.previous()" />联络人
      </header>
    </nav>
    <main></main>
    <ul>
      <li>
        <section>
          <p>
            <span>
              <img src="../../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
            </span>
            <span>大煞风景看路交口</span>
            <!-- <van-icon name="arrow" /> -->
          </p>
        </section>
      </li>
      <li>
        <section>
          <p v-for="(item) in details_lists" :key="item.name">
            <span>{{item.name}}</span>
            <span>{{item.response}}</span>
            <!-- <van-icon name="arrow" /> -->
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
      searchkey: "",
      details_lists: [
        {
          name: "投资者公司:",
          response: "234234"
        },
        {
          name: "投资者名称",
          response: "的发给"
        },
        {
          name: "投资者地区:",
          response: "地方删掉发sdfsdfdsdfsdfsdfsdf送到"
        },
        {
          name: "投资者电话:",
          response: "发给地方"
        },
        {
          name: "投资者兴趣:",
          response: "个"
        },
        {
          name: "投资者邮箱:",
          response: ""
        },
        {
          name: "公司地址:",
          response: ""
        },
        {
          name: "签约时间:",
          response: ""
        }
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
#p_user_contact2 {
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
#p_user_contact2 {
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
    padding: 2.3rem 0 1.5rem 0;
    background: white;
    li:nth-child(1){
      margin-bottom:0.5rem;
           img {

        height: 1.5rem;
        width: 1.5rem;
      }
         span:nth-child(2) {
          font-weight: 600;
          color: #4c4c4c;
          font-size: 0.3rem;
          line-height: 1.5rem;
        }
    }
    li {
      word-break: break-all;
      margin: 0 0.5rem 0;
      display: flex;
      font-size: 0.3rem;
 
      p {
        display: flex;
        // flex-direction: column;
        margin-left: 0.4rem;
        margin-bottom: 0.3rem;
        // align-items: baseline;
        span:nth-child(1) {
          font-weight: 550;
          width: 2.5rem;
          font-size: 0.3rem;
          line-height: 0.5rem;
          color: #4c4c4c;
          display: inline-block;
          //   width: 2rem;
        }
        span:nth-child(2) {
          flex:1;
          font-weight: 500;
          color: #787878;
          font-size: 0.2rem;
          // line-height: 0.5rem;
          display: inline-block;
          //   width: 3rem;
        }
      }
    }
  }
}
</style>