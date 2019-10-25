<template>
  <div id="a_wait_signed">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()"/>等待签约
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非官方地方</p>
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
        <footer>
          <button @click="$goto('a_sign_contract')">签署</button>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "a_wait_signed",
  data() {
    return {
         details_lists: [
        {
          name: "行业:",
          response: ""
        },
        {
          name: "地区:",
          response: ""
        },
         {
          name: "公司名称:",
          response: ""
        },
        {
          name: "是否上市公司",
          response: ""
        },
        {
          name: "项目介绍:",
          response: ""
        },
        {
          name: "集资额:",
          response: ""
        },
        {
          name: "融资阶段:",
          response: ""
        },
        {
          name: "项目方有兴趣的数量:",
          response: ""
        },
            {
          name: "已提交的投资者数量:",
          response: ""
        },
        {
          name: "项目状态:",
          response: ""
        },
        {
          name: "投资者公司:",
          response: ""
        },
         {
          name: "投资者姓名:",
          response: ""
        },
          {
          name: "投资者地区:",
          response: ""
        },
      ]
      //   wait_input: []
    };
  },
  created(){
    // console.log(999);
    
  },
  mounted(){
    // this.renderResize();
      // var html = document.querySelector("html");
      // html.style.fontSize = 0;
    // console.log(html.stylt);
    
  },
  methods: {
    // renderResize() {
    //   // 判断横竖屏
    //   var html = document.querySelector("html");
    //   let width = document.documentElement.clientWidth;
    //   let height = document.documentElement.clientHeight;
    //   if (width > height) {
    //     this.degree = 0;
    //     html.style.fontSize = width / 16 + "px";
    //     // console.log(this.degree);
    //   } else if (width < height) {
    //     this.degree = 90;
    //     html.style.fontSize = height / 16 + "px";
    //   }
    //   // 做页面适配
    //   // 注意：renderResize方法执行时虚拟dom尚未渲染挂载，如果要操作vue实例，最好在this.$nextTick()里进行。
    // },
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
 #a_wait_signed {
  .van-hairline--top-bottom::after {
    border: 0.01rem solid #8e8e8e;
  }
  .van-cell {
    padding: 0;
    .van-field__control {
      background: #f2f2f2;
      font-size: 0.3rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
    }
  }
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
#a_wait_signed  {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    //  font-weight: 600;
    font-size: 0.38rem;
    background: white;
    border-bottom: 0.02rem dashed #b5b5b5;
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
        font-size: 0.38rem;
        color:#0f6ebe;
        text-align: center;
        font-weight: 600;
        line-height: 1.5rem;
        border-bottom: 0.1rem solid #f2f2f2;
      }
      ul {
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        li {
          margin-bottom: 0.2rem;
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
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        button {
          width: 6.5rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
        button {
          margin-bottom: 0.4rem;
        }
        aside {
          height: 1.5rem;
          // width: 6.5rem;
          display: flex;
          justify-content: space-between;
          button {
            width: 3rem;
          }
        }
      }
    }
  }
}
</style>