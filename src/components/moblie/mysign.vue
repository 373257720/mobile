<template>
  <div id="mysign">
    <nav>
      <header>
        <van-icon name="arrow-left" @click="$global.previous()" />我的簽約項目
      </header>
      <main>
        <van-dropdown-menu>
          <van-dropdown-item @change="choose" v-model="value1" :title="text" :options="option1" />
        </van-dropdown-menu>
      </main>
    </nav>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad()"
      :loading-text="loadText"
      :offset="300"
    >
      <ul>
        <li v-for="item in upGoodsInfo" :key="item" @click="goto(item)">
          <p>
            <span>申请时间:</span>
            <span>{{item.createTime}}</span>
          </p>
          <p>
            <span>申请中间人:</span>
            <span>{{324}}</span>
          </p>
          <p>
            <span>申请项目:</span>
            <span>{{item.projectName}}</span>
          </p>
          <p>
            <span>签约时间:</span>
            <span>423423</span>
          </p>
          <p>
            <span>签约状态:</span>
            <span>423423</span>
          </p>
          <img src="../../assets/微信图片_201908191046412.png" alt />
        </li>
      </ul>
    </van-list>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "mysign",
  data() {
    return {
      value1: 0,
      text: "全部",
      option1: [],
      loading: false,
      finished: false,
      loadText: "加载中…",
      pageNum: 0,
      loadNumUp: 5,
      upGoodsInfo: []
    };
  },
  created() {
    // console.log(b.a);
    // console.log(b.b);
    // console.log(b.c);
    // b.add();
    let usertype = this.$store.state.currentUsertype;
    console.log(usertype);
    if (usertype == 1) {
      this.option1 = [
        { text: "待审核项目", value: 0 },
        { text: "等待签约项目", value: 1 },
        { text: "待确认项目", value: 2 },
        { text: "成功签约项目", value: 3 },
        { text: "拒绝签约项目", value: 4 }
      ];
    } else if (usertype == 4) {
      //agent
      this.option1 = [
        { text: "待审核项目", value: 0 },
        { text: "等待签约项目", value: 1 },
        { text: "待确认项目", value: 2 },
        { text: "成功签约项目", value: 3 },
        { text: "拒绝签约项目", value: 4 }
      ];
    } else if (usertype == 3) {
      this.option1 = [
        { text: "待确认的项目", value: 0 },
        { text: "已连接的项目", value: 1 },
        { text: "拒绝项目", value: 2 }
      ];
    }
  },
  methods: {
    choose(value) {
      //  console.log(this.option1);
      console.log(value, this.text);
      this.text = this.option1[value].text;
      this.pageNum = 0;
      this.upGoodsInfo = [];
      this.onLoad(this.option1[value].type);
    },
    onLoad(value) {
      if (!value) {
        value = 1;
      }
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/projectSign/project`,
        params: {
          signStatus: value,
          pageIndex: ++this.pageNum,
          pageSize: this.loadNumUp
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.status === 200) {
            let re = res.data.data.lists;
            if (re.length !== 0) {
              this.upGoodsInfo = this.upGoodsInfo.concat(re);
            } else if (re.length == 0) {
              this.loadText = "no datas";
              console.log(this.loadText);
            }
            this.loading = false;
            if (this.upGoodsInfo.length >= res.data.data.pageTotal) {
              this.loadText = "加载完成";
              this.finished = true;
            }
          }
          // else {
          //   this.finished = true;
          // }
        })
        .catch(err => {
          this.loadText = "加载失败";
          console.log(a);
        });
    }
  }
};
</script>

<style lang="scss">
#mysign {
  header {
    position: relative;
    .van-icon-arrow-left {
      // line-height: 1rem;
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-cell {
    padding: 0.1rem 0.3rem;
    .van-cell__title {
      text-align: center;
    }
  }
  .van-cell__value {
    display: none;
  }
  .van-dropdown-menu {
    height: 1rem;
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
    border-bottom: 0.03125rem solid #ebedf0;
  }
  .van-hairline--top-bottom {
    // z-index: -3;

    text-align: left;
    .van-ellipsis {
      font-size: 0.3rem;
    }
    .van-cell--clickable {
      font-size: 0.3rem;
    }
  }
}
</style>
<style lang="scss" scoped>
#mysign {
  width: 100%;
  nav {
    width: 100%;
    position: fixed;
    z-index: 5;
    text-align: center;
    top: 0;
    background: white;
    header {
      line-height: 1.5rem;
      font-size: 0.46rem;
      height: 1.5rem;
      // font-size: 0.4rem;
      border-bottom: 0.08rem solid #d2d2d2;
    }
  }
  ul {
    padding: 2.6rem 0 1.5rem 0;
    background: white;
    li {
      // line-height: 0.6rem;
      position: relative;
      word-break: break-all;
      margin: 0 0.5rem;
      padding: 0.2rem 0;
      border-bottom: 0.01rem dashed #b5b5b5;
      font-size: 0.3rem;
      p {
        display: flex;
        align-items: baseline;
        span:nth-child(1) {
          font-weight: 600;
          font-size: 0.28rem;
          line-height: 0.46rem;
          display: inline-block;
          width: 2rem;
        }
        span:nth-child(2) {
          font-weight: 500;
          font-size: 0.28rem;
          color: #575757;
          display: inline-block;
          width: 3rem;
        }
      }
      img {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 0.6rem;
        width: 0.6rem;
      }
    }
  }
}
</style>

