<template>
  <div id="a_sign_successful">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />成功签约
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非官方地方</p>
          </li>
          <!-- <li class="contract">
            <p class="row1">草拟合约:</p>
            <section class="row2">地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非官方地方</section>
          </li> -->
        </ul>
        <footer>
          <button @click="$goto('p_check_contract')">合同</button>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "a_sign_successful",
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
#a_sign_successful {
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
#a_sign_successful {
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