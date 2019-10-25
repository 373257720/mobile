<template>
  <div id="p_investor_infor">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />投资者资料
    </nav>
    <main>
      <article>
        <ul>
          <li i v-for="(item) in details_lists" :key="item">
            <aside>1</aside>
            <article class="main_right">
              <section v-for="(item) in details_lists" :key="item">
                <span class="row1">{{item.name}}</span>
                <span class="row2">{{item.response}}</span>
              </section>
            </article>
            <footer class="checkall"> 
              <img src="../../../assets/932de214a934dcc83b834aab8d58a34.png" alt />
            </footer>
          </li>
        </ul>
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
      details_lists: [
        {
          name: "签约成功时间:",
          response: "2019-15-26"
        },
        {
          name: "投资者公司:",
          response: "发地方水电是否水电费水电费诗圣杜甫费发"
        },
        {
          name: "投资者名称:",
          response: "斯蒂芬发地方"
        },
        {
          name: "投资者电话",
          response: "13178523855"
        },
        {
          name: "投资者兴趣:",
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
#p_investor_infor {
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
#p_investor_infor {
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
    ul {
      padding: 0 0.2rem 1.2rem 0.2rem;
      li {
        padding: 0.3rem 0;
        font-size: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.02rem dashed #b3b3b3;
        aside {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          color: #02a7e7;
          text-align: center;
          line-height: 0.6rem;
          font-size: 0.16rem;
          border: 0.03rem solid #02a7e7;
        }
        .main_right {
          section {
            display: flex;
            margin-bottom: 0.1rem;
            line-height: 0.5rem;
            .row1 {
              color: #4c4c4c;
              display: inline-block;
              font-weight: 600;
              width: 2.1rem;
            }
            .row2 {
              display: inline-block;
              width: 3rem;
              word-wrap: break-word;
            }
          }
        }
        .checkall {
          img {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
    }
  }
}
</style>