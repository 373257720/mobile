<template>
  <div id="mhome">
    <header>
      <div>
        <img src="../../assets/a815bb7a0d3bbf55b916045900e4d9f.png" alt />
      </div>
      <van-search
        v-model="searchkey"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-dropdown-menu>
        <van-dropdown-item title="筛选" ref="item">
          <van-tree-select
            :items="items"
            :main-active-index="mainActiveIndex"
            :active-id="activeId"
            @click-nav="onClickNav"
            @click-item="onClickItem"
          />
        </van-dropdown-item>
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </header>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad(searchkey)"
        :loading-text="loadText"
        :offset="300"
      >
        <div v-for="goods in  upGoodsInfo" :key="goods.id" class="goodlists">
          <article @click="$goto('goods_details')">
            <nav>45623sdfd fsdfsdfsd sdf dsf fsd sd56</nav>
            <section>
              <span>行业：</span>
              <span>4564456</span>
            </section>
            <section>
              <span>地区：</span>
              <span>4564456</span>
            </section>
            <section>
              <span>简介：</span>
              <span>45643453 dfg dfg dfg dgdfgdfg gdfgdfggdfgdfgdfg 456</span>
            </section>
          </article>
          <footer>
            <button v-if="$store.state.currentUsertype==0">{{goods.signStatus}}</button>
            <button
              v-else-if="$store.state.currentUsertype==1"
              @click="$goto('investor_infor')"
            >{{goods.signStatus==1?'签约者资料':'未签约'}}</button>
            <button v-else-if="$store.state.currentUsertype==2">{{goods.signStatus}}</button>
          </footer>
        </div>
      </van-list>
    </div>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      items: [
        {
          // 导航名称
          text: "所有城市",
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: "温州",
              // id，作为匹配选中状态的标识
              id: 1
              // 禁用选项
              // disabled: true
            },
            {
              text: "杭州",
              id: 2
            }
          ]
        },
        {
          // 导航名称
          text: "所有城",
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: "温",
              // id，作为匹配选中状态的标识
              id: 1
              // 禁用选项
              // disabled: true
            },
            {
              text: "杭",
              id: 2
            }
          ]
        }
      ],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1,
      searchkey: "",
      loading: false,
      finished: false,
      loadText: "加载中…",
      pageNum: 0,
      loadNumUp: 5,
      upGoodsInfo: [],
      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ]
      // loadingUp: true,
      // finishedUp: false
    };
  },
  methods: {
    onSearch() {
      console.log(this.searchkey);
    },
    onClickNav(index) {
      this.mainActiveIndex = index;
    },
    onClickItem(data) {
      this.activeId = data.id;
    },
    onLoad(searchkey) {
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/project/getAllProject`,
        params: {
          searchKey: this.searchkey,
          pageSize: this.loadNum,
          pageIndex: ++this.pageNum
        }
      })
        .then(res => {
          if (res.status === 200) {
            let re = res.data.data.lists;
            if (re.length !== 0) {
              this.upGoodsInfo = this.upGoodsInfo.concat(re);
            }
            this.loading = false;
            if (this.upGoodsInfo.length >= res.data.data.pageTotal) {
              this.loadText = "加载完成";
              this.finished = true;
            }
          } else {
            this.finished = false;
          }
        })
        .catch(err => {
          // console.log(err);
          this.loadText = "加载失败";
          document.querySelector(
            "#mhome .van-loading__circular"
          ).style.display = "none";

          let a = (document.querySelector("#mhome .van-loading__text").style =
            "margin-left:0");
          console.log(a);
        });
    }
  }
};
</script>
<style lang="scss">
#mhome {
  header {
    .van-search {
      padding: 0.2rem 0.2rem;
      // color:blue;
      // .van-search__content {
      // }
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
    .van-field__left-icon .van-icon,
    .van-field__right-icon .van-icon {
      font-size: 0.3rem;
    }
    .van-field__clear {
      // height: 0.1rem;
      font-size: 0.3rem;
    }
    .van-cell--clickable {
      padding: 0.1rem 0.3rem;
    }
    .van-dropdown-menu {
      height: 0.8rem;
      .van-dropdown-menu__title {
        font-size: 0.3rem;
      }
      .van-dropdown-item--down {
        .van-tree-select {
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
#mhome {
  display: flex;
  flex-direction: column;
  > header {
    // height: 3.8rem;
    width: 100%;
    z-index: 5;
    position: fixed;
    top: 0;
    background: white;
    h3 {
      text-align: center;
      font-size: 0.4rem;
      margin: 0.3rem 0;
    }
    > div {
      width: 100%;
      img {
        width: auto;
        height: auto;
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .main {
    margin-top: 3.3rem;
    margin-bottom: 1.2rem;
    box-sizing: border-box;
    .goodlists {
      margin: 0.18rem 0.1rem;
      background: white;
      display: flex;
      flex-direction: column;
      // align-items:center;
      height: 4.1rem;
      border: 0.01rem solid #626262;
      article {
        padding: 0.27rem 0 0 0.43rem;
        border-bottom: 0.01rem solid #626262;
        nav {
          width: 6.3rem;
          font-size: 0.46rem;
          color: #0e6fbe;
          line-height: 0.46rem;
          margin-bottom: 0.3rem;
          box-sizing: border-box;
        }
        section {
          font-size: 0.28rem;
          margin-bottom: 0.1rem;
          // line-height: 0.42rem;
          color: #747474;
          display: flex;
          span:nth-of-type(1) {
            display: inline-block;
            // line-height: 0.2rem;
            width: 1rem;
          }
          span:nth-of-type(2) {
            display: inline-block;
            width: 5.3rem;
            word-break: break-all;
            // flex: 1;
            line-height: 0.32rem;
          }
        }
      }
      footer {
        flex: 1;
        // height: 1.34rem;
        position: relative;
        button {
          width: 3.4rem;
          position: absolute;
          right: 0.25rem;
          height: 0.6rem;
          background: #00adef;
          color: white;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  #moblie_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>


