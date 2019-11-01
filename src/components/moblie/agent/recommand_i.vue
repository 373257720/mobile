<template>
  <div id="a_recommand_i">
    <!-- <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />完善资料        
    </nav> -->
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="item.response" placeholder="请输入用户名" />
              </van-cell-group>
            </p>
          </li>
        </ul>
        <footer>
          <aside>
            <button @click="$goto('mhome')"> 提交</button>
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "a_recommand_i",
  data() {
    return {
      // value: ["", "", ""],
      dad_text:'完善资料',
      // list: ["a", "b", "c",],
      // result: ["a", "b"],
      details_lists: [
        {
          name: "投资者类型:",
          response: ""
        },
        {
          name: "投资者公司:",
          response: ""
        },
        {
          name: "投资姓名:",
          response: ""
        },
        {
          name: "地区",
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
#a_recommand_i {
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
    // position: relative;
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
#a_recommand_i {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    z-index: 5;
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
        font-size: 0.38rem;
        color: #0f6ebe;
        text-align: center;
        font-weight: 600;
        line-height: 1.5rem;
        border-bottom:0.1rem solid #b5b5b5;
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
      }
    }
  }
}
</style>