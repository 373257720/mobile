<template>
  <div id="p_wait_agent_input">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />待中间人签约
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">{{item.response}}</p>
          </li>
          <!-- <li class="contract">
            <p class="row1">草拟合约:</p>
            <section>
              <article class="draft1_middle">
                <div class="content">
                  <p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p>
                  <p></p>
                  <p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p>
                  <p></p>
                  <p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p>
                  <p></p>
                  <p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p>
                  <p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p>
                  <p></p>
                  <p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p>
                  <p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p>
                  <p></p>
                  <p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p>
                  <p></p>
                  <p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p>
                  <p></p>
                  <p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p>
                  <p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p>
                  <p></p>
                  <p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p>
                  <p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p>
                  <p></p>
                  <p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p>
                </div>

                <div class="signature">
                  <span>投行</span>
                  <span>
          <!-- 中间人-->

          <!-- </span>
                </div>
              </article>
            </section>
          </li>-->
        </ul>
        <footer>
          <aside>
            <button @click="$routerto('p_check_contract')">查看合约</button>
            <!-- <button @click="gg">合约</button> -->
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_wait_agent_input",
  data() {
    return {
      value: ["", "", ""],
      list: ["a", "b", "c"],
      result: ["a", "b"],
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
          name: "项目状态",
          response: "金融"
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
          name: "项目介绍",
          response: "金融"
        },
        // {
        //   name: "投资者公司",
        //   response: "谁到时对方"
        // },
        // {
        //   name: "投资者姓名",
        //   response: "金融"
        // },
        // {
        //   name: "投资者地区",
        //   response: "金融"
        // }
      ],
      nav_lists: [
        {
          name: "融资阶段",
          response: "12"
        },
        {
          name: "项目方<br>有兴趣数量",
          response: "16"
        },
        {
          name: "已提交</br>投资者数量",
          response: "118"
        }
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
#p_wait_agent_input {
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
#p_wait_agent_input {
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

    article {
      margin: 0 0 1rem 0;
      header {
        height: 1.5rem;
        font-size: 0.38rem;
        color: #0f6ebe;
        text-align: center;
        font-weight: 600;
        line-height: 1.5rem;
      }
      ul {
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4rem;
            margin-bottom: 0.2rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
        // .contract {
        //   display: block;
        //   section {
        //     width: 6.5rem;
        //     height: 8rem;
        //     border: 0.01rem solid #b3b3b3;
        //     padding: 0;
        //     background: #f2f2f2;
        //     .draft1_middle {
        //       padding: 0.3rem;
        //       box-sizing: border-box;
        //       width: 100%;
        //       height: 100%;
        //       overflow-y: auto;
        //       .signature {
        //         margin: 0.5rem 0;
        //         display: flex;
        //         width: 100%;
        //         justify-content: space-between;
        //         span {
        //           display: inline-block;
        //           width: 2.5rem;
        //           height: 1rem;
        //           text-align: center;
        //           border-bottom: 0.02rem solid #b3b3b3;
        //           img {
        //             width: auto;
        //             height: auto;
        //             max-width: 100%;
        //             max-height: 100%;
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
      
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