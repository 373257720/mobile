<template>
  <div id="a_wait_review">
    <nav>
      <van-icon name="arrow-left" />等待审核
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <!-- <ul>
          <li i v-for="(item) in wait_input" :key="item">
            <p class="row1">{{item}}</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="value" placeholder="请输入用户名" />
              </van-cell-group>
            </p>
          </li>
          <li>
            <p class="row1">感兴趣行业：</p>
            <p class="row2">
              <van-checkbox-group v-model="result">
                <van-checkbox v-for="(item) in list" :key="item" :name="item">复选框 {{ item }}</van-checkbox>
              </van-checkbox-group>
            </p>
          </li>
        </ul> -->
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
  name: "wait_input",
  data() {
    return {
      list: ["a", "b", "c"],
      result: ["a", "b"],
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
        
      ],
      wait_input: ["投资者公司：", "投资者姓名:", "投资者电话："]
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
#a_wait_review {
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
  .van-checkbox__icon {
    //   line-height:0.625rem;
    font-size: 0.2rem;
  }
  .van-checkbox__icon .van-icon {
    //   height: 0.5rem;
    // width: 0.3rem;
    // height: 0.3rem;
    // font-size:0.05rem;
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
#a_wait_review {
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
        height: 1.7rem;
        font-size: 0.32rem;
        text-align: center;
        font-weight: 600;
        line-height: 1.7rem;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.4rem;
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
          .row2 {
            width: 6.5rem;
            height: 10rem;
            background: #f2f2f2;
          }
        }
      }
      footer {
        padding: 0.5rem;
        button {
          width: 6.5rem;
          height: 1rem;
          background: #00adef;
          color: white;
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