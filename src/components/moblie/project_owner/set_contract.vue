<template>
  <div id="p_set_contract">
    <nav>
      <van-icon name="arrow-left" />签署合约
    </nav>
    <main>
      <article>
        <!-- <header>签署合约：</header> -->
        <div>
          <!-- <van-cell-group>
            <van-field
              v-model="content"
              rows="10"
              clearable
              autosize
              type="textarea"
              placeholder="请输入留言"
            />
          </van-cell-group>-->
          <textarea v-model="content" style="width:100%; height: 12rem" placeholder="请输入"></textarea>
        </div>
        <footer>
          <button @click="signature">签署</button>
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
      content: "",
      details_lists: ["申请时间:", "申请中间人:", "申请项目:"]
    };
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {
    signature() {
      // console.log(this.content);
      var content = this.content
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;");
        this.$store.commit('contract_set',content)
        this.$routerto('p_sign_contract',this.$route.query)
    
    }
    // gg() {
    //   // console.log(this.$dialog);

    //   this.$dialog
    //     .confirm({
    //       title: "标题",
    //       message: "弹窗内容"
    //     })
    //     .then(() => {
    //       // on confirm
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    // }
  }
};
</script>
<style lang="scss">
#p_set_contract {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-hairline--top-bottom::after {
    border: 0.02rem solid #8e8e8e;
  }
  .van-field {
    background: #f2f2f2;
  }
}
// .van-dialog {
//   font-size: 0.3rem;
// }
// .van-hairline--top-bottom::after{
//      border: 0.02rem solid #8e8e8e;
// }
// van-cell van-cell--small van-field
// .van-dialog__message {
//   font-size: 0.3rem;
// }
// .van-button {
//   font-size: 0.3rem;
// }
</style>
<style lang="scss" scoped>
#p_set_contract {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    z-index: 5;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    padding: 0.5rem;
    background: #ffffff;
    // div {
    //   width: 100%;
    //   background: #f2f2f2;
    //   height: 8rem;
    //   // font-size: 0.3rem;
    //   // line-height: 0.4rem;
    //   // border-radius: 0.05rem;
    //   // border: 0.01rem solid #8e8e8e;
    // }
    textarea {
      background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.3rem 0.4rem;
      color: rgb(169, 169, 169);
    }
    footer {
      width: 100%;
      button {
        width: 100%;
        margin-top: 1rem;
        background: #00adef;
        color: white;
        height: 0.8rem;
      }
    }
  }
}
</style>