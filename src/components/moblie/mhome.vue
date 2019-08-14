<template>
  <div id="mhome">
    <header>
      <div>
        <img src="../../assets/a815bb7a0d3bbf55b916045900e4d9f.png" alt />
      </div>
      <!-- <h3>所有项目</h3> -->
      <van-search placeholder="请输入搜索关键词" v-model="searchkey" />
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
        <div v-for="goods in  upGoodsInfo" :key="goods.id">
          <article>
            <nav>
              项目名称:
              <span>456443242342342342342342356</span>
            </nav>
            <section>
              计划时间:
              <span>4564456</span>
            </section>
            <button>签约</button>
          </article>
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
              id: 1,
              // 禁用选项
              disabled: true
            },
            {
              text: "杭州",
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
      pageNum: 1,
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
      }).then(res => {
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
      });
    }
  }
};
</script>
<style lang="scss">
#mhome {
  header {
    .van-search {
      padding: 0 0.5rem;
    }
    .van-cell {
      font-size: 0.3rem;
    }
  }
}
</style>

<style lang="scss" scoped>
#mhome {
  display: flex;
  flex-direction: column;
  > header {
    height: 3.8rem;
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
      // height: 2rem;
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
    margin-top: 3.8rem;
    margin-bottom: 1.2rem;
    box-sizing: border-box;
  }
  //  .main{
  //     flex: 1;
  //     margin: 4rem 0 1.3rem 0;
  //     overflow-y: scroll;
  //     li {
  //       display: flex;
  //       padding: 0.2rem 0.5rem;
  //       box-sizing: border-box;
  //       word-break: break-all;
  //       aside {
  //         width: 2.2rem;
  //         height: 2.2rem;
  //         background: red;
  //       }
  //       article {
  //         flex: 1;
  //         padding: 0 0.1rem;
  //         display: flex;
  //         flex-direction: column;
  //         justify-content: space-between;
  //         nav {
  //           height: 0.9rem;
  //         }
  //         button {
  //           background: #00adef;
  //           width: 100%;
  //           color: white;

  //           align-self: center;
  //         }
  //       }
  //     }
  //     // padding-top: 150px;
  //     // width: 100%;
  //     // height: 2000px;
  //   }
  #moblie_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>


