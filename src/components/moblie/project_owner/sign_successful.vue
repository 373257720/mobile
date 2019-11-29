<template>
  <div id="p_sign_successful">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约成功
    </nav>
    <main>
      <article>
        <header>{{title}}</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists" v-if="details_lists.length>0"></commondetails>
        <footer>
          <aside>
            <p>(合约同步到IPFS需要时间，如不能打开请稍后再试)</p>
            <button @click="check_contract">查看合约</button>
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_sign_successful",
  data() {
    return {
      title: "",
      nav_lists: [],
      details_lists: []
    };
  },
  created() {
    this.details = this.$route.query;
    this.$loading();
    this.$global
      .goods_deatails(
        `${
          this.$baseurl
        }/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${
          this.details.projectId
        }&signStatus=${this.details.signStatus}&signId=${
          this.details.signId ? this.details.signId : -1
        }`,
        "get"
      )
      .then(res => {
        console.log(res);
        // this.hash_id = res.signAgreementKey;
        this.nav_lists = [...res.nav_lists];
        this.details_lists = [...res.details_lists];
        this.title = res.title;
        this.$toast.clear();
      });
  },
  methods: {
    check_contract() {
      this.$loading();
      var newWindow = window.open();
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/projectSign/getPdf?signId=${this.$route.query.signId}`
      }).then(res => {
        this.$toast.clear();
        console.log(res);
        if (res.data.resultCode == 10000) {
          // window.open();
          newWindow.location.href = res.data.data.pdfPath;
        }
      });
    },
  }
};
</script>
<style lang="scss">
#p_sign_successful {
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
  .van-dialog__header {
    font-size: 0.5rem;
  }
  .van-dialog__content {
    margin: 0.5rem 0;
    display: flex;
    justify-content: center;
    div {
      width: 6rem;
      // height: 2rem;
      text-align: center;
      word-wrap: break-word;
    }
    .hash {
      margin-top: 0.2rem;
      color: #0f6ebe;
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
#p_sign_successful {
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
        height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.7rem;
      }
      ul {
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.38rem;
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
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.38rem;
        text-align: center;
        aside {
          height: 1.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
          }
          button {
            height: 1rem;
            color: #ffffff;
          }
          button:nth-of-type(1) {
            background: #00adef;
          }
        }
      }
    }
  }
}
</style>