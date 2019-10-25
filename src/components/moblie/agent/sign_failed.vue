<template>
  <div id="a_sign_failed">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />拒签项目
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <ul>
          <li i v-for="(item) in details_lists" :key="item">
            <p class="row1">{{item.name}}</p>
            <p class="row2">dfgsfd sdf  sdf dsf sdff 第三方地方地方所发生的是的是否发送斯蒂芬 </p>
          </li>
        </ul>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "a_sign_failed",
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
          name: "融资阶段",
          response: ""
        },
        {
          name: "項目方有興趣的數量:",
          response: ""
        },
        {
          name: "已提交的投資者數量:",
          response: ""
        },
        {
          name: "项目状态:",
          response: ""
        },
        {
          name: "项目简介:",
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
         {
          name: "拒绝时间:",
          response: ""
        },
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
#a_sign_failed {
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
#a_sign_failed {
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