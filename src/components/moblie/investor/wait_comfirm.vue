<template>
  <div id="i_wait_confirm">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />等待中间人输入
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">{{item.response}}</p>
          </li>
          <!-- <li i v-for="(item,idx) in i_wait_confirm" :key="item">
            <p class="row1">{{item}}</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="value[idx]" placeholder="请输入用户名" />
              </van-cell-group>
            </p>
          </li> -->
          <!-- <li>
            <p class="row1">感兴趣行业：</p>
            <p class="row2">
              <van-checkbox-group v-model="result">
                <van-checkbox v-for="(item) in list" :key="item" :name="item">复选框 {{ item }}</van-checkbox>
              </van-checkbox-group>
            </p>
          </li> -->
        </ul>
        <footer>
          <!-- <button>签署</button> -->
          <aside>
            <button>完善资料</button>
            <button @click="gg">拒绝</button>
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "i_wait_confirm",
  data() {
    return {
      // value: ["", "", ""],
      // list: ["a", "b", "c"],
      // result: ["a", "b"],
       details_lists: [
        {
          name: "行业:",
          response: "2019-15-26"
        },
        {
          name: "地区:",
          response: "发地方水电是否水电费水电费诗圣杜甫费发"
        },
        {
          name: "公司名称:",
          response: "斯蒂芬发地方"
        },
        {
          name: "是否是上市公司",
          response: "13178523855"
        },
        {
          name: "集资额:",
          response: "金融"
        },
          {
          name: "联络电话:",
          response: "斯蒂芬发地方"
        },
        {
          name: "电邮",
          response: "13178523855"
        },
        {
          name: "融资阶段",
          response: "金融"
        },
          {
          name: "项目方有兴趣的数量:",
          response: "斯蒂芬发地方"
        },
        {
          name: "已提交的投资者数量",
          response: "13178523855"
        },
        {
          name: "项目状态",
          response: "金融"
        },
         {
          name: "项目介绍",
          response: "金融"
        },
   
      ],
  
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
#i_wait_confirm {
  .van-checkbox__icon {
    //   line-height:0.625rem;
    font-size: 0.2rem;
  }
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
#i_wait_confirm {
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
      margin: 0 0 1rem 0;
      header {
        height: 1.5rem;
        font-size: 0.32rem;
        text-align: center;
        font-weight: 600;
        line-height: 1.5rem;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
      ul {
        padding: 0.5rem 0.5rem 2rem 0.5rem;
        li {
          margin-bottom: 0.4rem;
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
            margin-bottom: 0.2rem;
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