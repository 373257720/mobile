<template>
  <div id="p_user_contact">
    <nav>
      <header>
        <!-- <van-icon name="arrow-left" @click="$global.previous()" />联络人 -->
        <commonnav :msg="dad_text"></commonnav>
      </header>
      <main>
        <van-search
          v-model="searchkey"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          left-icon
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">
            <van-icon name="search" />
          </div>
        </van-search>
      </main>
    </nav>
    <ul>
      <li v-for="item in arr" :key="item.username" @click="$routerto('p_user_contact2',{investorsId:item.investorsId,idname:item.userName})">
        <img src="../../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
        <!-- <h2></h2> -->
        <p>
          <span>{{item.userName}}</span>
          <span>{{item.bslEmail}}</span>
          <!-- <van-icon name="arrow" /> -->
        </p>
      </li>
    </ul>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_user_contact",
  data() {
    return {
      dad_text: "联络人",
      arr: [
        // {
        //   keyword:'bslEmail',
        //   response:'',
        // },{
        //    keyword:'userName',
        //   response:'',
        // }

      ],
      searchkey: "",
      value1: 0
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/user/getRelationUser?searchKey=${this.searchkey}`
    }).then(res => {
      console.log(res);
      this.arr=[...res.data.data]
      // for (var i in res.data.data) {
      //   for (var j = 0; j < this.arr.length; j++) {
      //     if (this.arr[j].keyword == i) {
      //       this.arr[j].response = res.data.data[i];
      //     }
      //   }
      // }
      
    });
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
    // padding: 0.2rem 0.2rem;
    // background: #1F2652;
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
  .van-icon-search {
    background: #ffc303;
    border-radius: 50%;
    width: 0.6rem;
    height: 0.6rem;
    color: #282407;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.4rem;
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
      line-height: 1.6rem;
      height: 1.6rem;
      font-size: 0.4rem;
      // border-bottom: 0.1rem solid #d2d2d2;
    }
  }
  ul {
    padding: 3rem 0 1.5rem 0;
    background: white;
    li {
      // line-height: 0.6rem;
      position: relative;
      word-break: break-all;
      margin: 0.36rem 0.5rem 0;
      padding: 0rem 0 0.36rem 0;
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
        height: 1.45rem;
        width: 1.45rem;
      }
    }
  }
}
</style>