<template>
  <div id="p_wait_investor">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />待投资者确认
    </nav>
    <main>
      <article>
        <header>{{title}}</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <!-- <commondetails></commondetails> -->
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2" v-if="item.keyword!='projectDescribe'">{{item.response}}</p>
            <p class="row2" v-if="item.keyword=='projectDescribe'" v-html="item.response"></p>
          </li>
          <li class="uploadblock">
            <p class="row1">HASH序列号:</p>
            <p class="row2" v-if="hash_id">
              {{hash_id}}
              <i @click="share(hash_id)">
                <img src="../../../../static/pic/0ae32d519e5102a03ca5028b0b9e244.png" alt />
              </i>
            </p>
          </li>
        </ul>
        <van-dialog v-model="show" title="复制成功">
          <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />{{hash_id}}
          <div>
            <p>你可以把刚刚复制HASH序列号黏贴到网站里搜索,即可看到合约pdf</p>
            <p class="hash" @click="daship">http://www.wearetechman.com:5001/webui</p>
          </div>
        </van-dialog>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_wait_investor",
  data() {
    return {
      show: false,
      hash_id: "",
      title: "",
      details_lists: [],
      nav_lists: []
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
          details.projectId
        }&signStatus=${details.signStatus}&signId=${
          details.signId ? details.signId : -1
        }`,
        "get"
      )
      .then(res => {
        console.log(res);
        // if (res.signAgreementKey) {
        //   this.hash_id = res.data.data.signAgreementKey;
        // }
        this.hash_id = res.signAgreementKey;
        this.nav_lists = [...res.nav_lists];
        this.details_lists = [...res.details_lists];
        this.title = res.title;
        this.$toast.clear();
      });
    // console.log(pp);
  },

  methods: {
    daship() {
      var newWindow = window.open();
      newWindow.location.href = "http://www.wearetechman.com:5001/webui";
      // tempwindow.location=hash_id;
    },
    // 点击事件
    share(val) {
      console.log(val);
      this.message = val;
      this.$copyText(this.message).then(
        e => {
          this.show = true;
        },
        function(e) {
          // alert("Can not copy");
          console.log(e);
        }
      );
    },
    gg() {
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
#p_wait_investor {
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
      margin-top:0.2rem;  
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
#p_wait_investor {
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
            // margin-bottom: 0.2rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }

        li.uploadblock {
          img {
            width: 0.6rem;
            vertical-align: middle;
            height: 0.6rem;
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.38rem;
        button {
          width: 9.9rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>