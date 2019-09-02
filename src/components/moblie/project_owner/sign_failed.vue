<template>
  <div id="sign_failed">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />拒签项目
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <ul>
          <li i v-for="(item) in details_lists" :key="item">
            <p class="row1">{{item}}</p>
            <p class="row2">{{item}}</p>
          </li>
          <li class="contract">
            <p class="row1">草拟合约:</p>
            <section class="row2 draft1">
              <article
                class="draft1_middle"
              >地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非sd 第三方地方第三方斯蒂芬发快递发送到地方到发送到辅导费是的发是的发送到时代复分发斯蒂芬斯蒂芬谁到发送到发送斯蒂芬发斯蒂芬斯蒂芬斯蒂芬是否，发送到，发， 发，是的，发是的发送到，发，斯蒂芬，斯蒂芬，斯蒂芬，斯蒂芬，是的，发送到，发送到，发送到，发送到，f官方地方地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非sd 第三方地方第三方斯蒂芬发快递发送到地方到发送到辅导费是的发是的发送到时代复分发斯蒂芬斯蒂芬谁到发送到发送斯蒂芬发斯蒂芬斯蒂芬斯蒂芬是否，发送到，发， 发，是的，发是的发送到，发，斯蒂芬，斯蒂芬，斯蒂芬，斯蒂芬，是的，发送到，发送到，发送到，发送到，f官方地方地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非sd 第三方地方第三方斯蒂芬发快递发送到地方到发送到辅导费是的发是的发送到时代复分发斯蒂芬斯蒂芬谁到发送到发送斯蒂芬发斯蒂芬斯蒂芬斯蒂芬是否，发送到，发， 发，是的，发是的发送到，发，斯蒂芬，斯蒂芬，斯蒂芬，斯蒂芬，是的，发送到，发送到，发送到，发送到，f官方地方</article>
            </section>
          </li>
        </ul>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "sign_failed",
  data() {
    return {
      details_lists: [
        "公司名称:",
        "是否上市公司:",
        "项目详情:",
        "集资额：",
        "联系电话：",
        "电邮：",
        "拒绝时间"
      ]
    };
  },
  methods: {
    gg() {
      // console.log(this.$dialog);

      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容"
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
#sign_failed {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
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
#sign_failed {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      margin: 0 0 1.3rem 0;
      header {
        height: 1.5rem;
        font-size: 0.32rem;
        text-align: center;
        font-weight: 600;
        line-height: 1.5rem;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
        .contract {
          display: block;

          .row1 {
            margin-bottom: 0.1rem;
          }
          .row2 {
            width: 6.5rem;
            height: 6rem;
            border: 0.01rem solid #b3b3b3;
            // box-sizing: border-box;
            padding: 0;
            background: #f2f2f2;
            .draft1_middle {
              padding: 0.3rem;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              overflow-y: auto;
            }
          }
        }
      }
    }
  }
}
</style>