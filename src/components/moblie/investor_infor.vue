<template>
  <div id="investor_infor">
    <nav>
      <van-icon name="arrow-left" />投资者资料
    </nav>
    <main>
      <article>
        <!-- <header>投资者</header> -->
        <ul>
          <li i v-for="(item) in details_lists" :key="item">
            <aside>1</aside>
            <article class="main_right">
              <section>
                <span class="row1">投资者公司：</span>
                <span class="row2">54564564563423423434454545456</span>
              </section>
              <section>
                <span class="row1">投资者名称：</span>
                <span class="row2">54564564566</span>
              </section>
              <section>
                <span class="row1">投资者电话：</span>
                <span class="row2">545645645646</span>
              </section>
              <section>
                <span class="row1">感兴趣行业：</span>
                <span class="row2">54564564566</span>
              </section>
            </article>
            <footer class="checkall">
              <img src="../../assets/932de214a934dcc83b834aab8d58a34.png" alt />
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
      details_lists: ["申请时间:", "申请中间人:", "申请项目:"]
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
#investor_infor {
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
#investor_infor {
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
    ul {
      padding: 0.5rem 0.5rem 1.2rem 0.5rem;
      li {
        margin-bottom: 0.4rem;
        font-size: 0.3rem;
        justify-content: space-between;
        display: flex;
        align-items: center;
        border-bottom: 0.01rem dashed #b3b3b3;
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
            margin-bottom: 0.2rem;
            .row1 {
              color: #4c4c4c;
              display: inline-block;
              font-weight: 600;
              width: 2rem;
            }
            .row2 {
              display: inline-block;
              width: 2.5rem;
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