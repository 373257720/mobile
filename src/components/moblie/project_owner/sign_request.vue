<template>
  <div id="p_sign_request">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约请求
    </nav>
    <main>
      <div class="investors_infor">
        <header>投资者资料</header>
        <ul>
          <li i v-for="(item) in investor_infor" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非官方地方</p>
          </li>
        </ul>
      </div>

      <article>
        <header>放水电费鼎飞丹砂</header>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">{{item.response}}</p>
          </li>
          <!-- <li class="contract">
            <p class="row1 draft">草拟合约:</p>
            <section class="row2 draft1">
              <article
                class="draft1_middle"
              >地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非sd 第三方地方第三方斯蒂芬发快递发送到地方到发送到辅导费是的发是的发送到时代复分发斯蒂芬斯蒂芬谁到发送到发送斯蒂芬发斯蒂芬斯蒂芬斯蒂芬是否，发送到，发， 发，是的，发是的发送到，发，斯蒂芬，斯蒂芬，斯蒂芬，斯蒂芬，是的，发送到，发送到，发送到，发送到，f官方地方地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非sd 第三方地方第三方斯蒂芬发快递发送到地方到发送到辅导费是的发是的发送到时代复分发斯蒂芬斯蒂芬谁到发送到发送斯蒂芬发斯蒂芬斯蒂芬斯蒂芬是否，发送到，发， 发，是的，发是的发送到，发，斯蒂芬，斯蒂芬，斯蒂芬，斯蒂芬，是的，发送到，发送到，发送到，发送到，f官方地方地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非sd 第三方地方第三方斯蒂芬发快递发送到地方到发送到辅导费是的发是的发送到时代复分发斯蒂芬斯蒂芬谁到发送到发送斯蒂芬发斯蒂芬斯蒂芬斯蒂芬是否，发送到，发， 发，是的，发是的发送到，发，斯蒂芬，斯蒂芬，斯蒂芬，斯蒂芬，是的，发送到，发送到，发送到，发送到，f官方地方</article>
            </section>
          </li> -->
        </ul>
        <footer>
          <!-- <button @click="$goto('cavans')">签署</button> -->
          <aside>
            <button @click="gg">拒绝签约</button>
            <button >感兴趣</button>
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      show: false,
      investor_infor: [
        {
          name: "投资者公司:",
          response: "发地方水电是否水电费水电费诗圣杜甫费发"
        },
        {
          name: "投资者姓名:",
          response: "发地方水电"
        },
        {
          name: "投资者地区:",
          response: "斯蒂芬发地方发地方水电发地方水电"
        }
      ],
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
#p_sign_request {
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
#p_sign_request {
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
    border-bottom: 0.08rem solid #b5b5b5;
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
    div.investors_infor {
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
          margin-bottom: 0.4rem;
          display: flex;
          align-items: baseline;
          font-size: 0.28rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .draft {
            margin-bottom: 0.25rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
          .draft1 {
            padding: 0.2rem 0.4rem;
            box-sizing: border-box;
          }
        }
      }
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
          margin-bottom: 0.4rem;
          display: flex;
          align-items: baseline;
          font-size: 0.28rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .draft {
            margin-bottom: 0.25rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
          .draft1 {
            padding: 0.2rem 0.4rem;
            box-sizing: border-box;
          }
        }
        .contract {
          display: block;
          .row2 {
            width: 8rem;
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