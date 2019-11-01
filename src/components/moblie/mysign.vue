<template>
  <div id="mysign">
    <nav>
      <header>
        <van-icon name="arrow-left" @click="$global.previous()" />我的簽約項目
      </header>
      <main>
        <div class="sort_box" @click="gg">
          筛选
          <!-- <i></i>   -->
          <!-- <van-icon name="arrow-down" /> -->
          <!-- <ul>
          <li v-for="(item) in result" :key="item">{{item}}</li>-->
          <!-- <li>水电费第三方</li>
            <li>斯蒂芬是否所发生的</li>
          <li>斯蒂芬是否所发生的</li>-->
          <!-- </ul> -->
        </div>
        <transition name="fade">
          <van-checkbox-group v-show="visible" v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="item"
                :title="`${item}`"
                @click="toggle(index)"
              >
                <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
              </van-cell>
              <div class="confirm" @click="confirm_lists">确定</div>
            </van-cell-group>
          </van-checkbox-group>
        </transition>
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
        <li v-for="item in upGoodsInfo" :key="item.projectId" @click="$routerto()">
          <p>
            <span>申请时间:</span>
            <span>{{item.signTime4Submit}}</span>
          </p>
          <p>
            <span>申请中间人:</span>
            <span>{{item.bslName}}</span>
          </p>
          <p>
            <span>申请项目:</span>
            <span>{{item.projectName}}</span>
          </p>
          <p>
            <span>签约时间:</span>
            <span>{{item.signTime}}</span>
          </p>
          <p>
            <span>签约状态:</span>
            <span>{{item.signStatus}}</span>
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
      visible: false,
      text: "全部",
      option1: [],
      loading: false,
      finished: false,
      loadText: "加载中…",
      pageNum: 0,
      loadNumUp: 5,
      upGoodsInfo: [],
      result: [],
      list: [
        "待审核项目",
        "待签约项目",
        "待确认项目",
        "成功签约项目",
        "拒绝签约项目"
      ]
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
    confirm_lists() {
      this.onLoad(1);

      this.visible = false;
    },
    gg() {
      this.visible = !this.visible;
      // if (this.visible != true) {
      console.log(document.querySelector(".van-checkbox-group").style.height);
      // }

      // document.querySelector('.bobobo').style.zIndex=-800;
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
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
            console.log(this.upGoodsInfo);
            
          } else {
            this.finished = true;
          }
        })
        .catch(err => {
          this.loadText = "加载失败";
          // console.log(a);
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
  .van-checkbox__icon {
    width: 0.4rem;
    height: 0.4rem;
  }
  .van-icon-success {
    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.3rem;
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
      border-bottom: 0.16rem solid #d2d2d2;
    }
    .sort_box {
      height: 1.3rem;
      border-bottom: 0.02rem solid #7c7c7c;
      line-height: 1.3rem;
      // i{
      //    border: 0.05rem solid black;
      // }
    }
    // .sort_box::after {
    //   content: "";
    //   display: inline-block;
    //   vertical-align: middle;
    //   margin-top: 2px;
    //   margin-left: 2px;
    //   width: 13px;
    //   height: 13px;
    //   background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzZBODZDMDc5M0Q5MTFFNjgwOEQ4QTZFRDY1MjY1MUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzZBODZDMDg5M0Q5MTFFNjgwOEQ4QTZFRDY1MjY1MUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOEZEMERBNjkzNDExMUU2ODA4RDhBNkVENjUyNjUxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNkE4NkMwNjkzRDkxMUU2ODA4RDhBNkVENjUyNjUxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PseaCuwAAACYSURBVHjaYjlz5sxSBgaGUCBmZSAN/Abi1UxAQoMMzQxQPVogA8KB+A0ZBrwGuRxkwB2oIb9I0AxSGwHSywQV2AfEBSQYkA/Vw8CEJDgdiKcRoXkqEM+AcZjQJPNgJuMA+6C2M+Ay4C8Qh0DDBR3cgcr9xWcACLwHYl8g/ogk9hEq9h5dMRMOp94A4kAgfgHFAVAxDAAQYAAW9CA9zO+COgAAAABJRU5ErkJggg==) no-repeat
    //     no-repeat;
    //   background-size: 13px auto;
    // }
    //     border: 1rem solid black;

    // }
    .confirm {
      text-align: center;
      padding: 0.2rem 0.3rem;
      font-size: 0.35rem;
      background: #00aef1;
      color: white;
      // line-height: 0.75rem;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
  .van-list ul {
    padding: 3rem 0 1rem 0;
    background: white;
    li {
      // line-height: 0.6rem;
      position: relative;
      word-break: break-all;
      margin: 0 0.54rem;
      padding: 0.3rem 0 0 0;
      border-bottom: 0.02rem dashed #b5b5b5;
      font-size: 0.36rem;
      p {
        // display: flex;
        // align-items: baseline;
        margin-bottom: 0.24rem;
        font-size: 0.34rem;
        span:nth-child(1) {
          font-weight: 600;
          line-height: 0.46rem;
          display: inline-block;
          width: 2.6rem;
          vertical-align: top;
        }
        span:nth-child(2) {
          // font-weight: 500;
          vertical-align: top;
          // font-size: 0.28rem;
          color: #575757;
          // display: inline-block;
          // width: 3rem;
        }
      }
      img {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 0.78rem;
        width: 0.78rem;
      }
    }
  }
}
</style>

