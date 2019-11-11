<template>
  <div id="mysign">
    <nav>
      <header>
        <van-icon name="arrow-left" @click="$global.previous()" />我的簽約項目
      </header>
      <main>
        <div class="sort_box" @click="gg">
          项目筛选
          <van-icon name="arrow-down" />
        </div>
        <transition name="fade">
          <van-checkbox-group v-show="visible" v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="item.text"
                :title="`${item.text}`"
                @click="toggle(index)"
              >
                <van-checkbox :name="item.value" ref="checkboxes" slot="right-icon" />
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
        <li v-for="item in upGoodsInfo" :key="item.signId" @click="mysignto(item)">
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
            <span>{{item.signStatustext}}</span>
          </p>
          <img :src="item.pic" alt />
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
      loading: false,
      finished: false,
      loadText: "加载中…",
      pageNum: 0,
      loadNumUp: 5,
      usertype: "",
      upGoodsInfo: []
    };
  },
  computed: {
    result: function() {
      if (this.usertype == 1 || this.usertype == 4) {
        return [1, 2, 4, 6, 3, 7];
      } else if (this.usertype == 3) {
        return [5, 6, 7];
      }
    },
    list: function() {
      // console.log(usertype);
      if (this.usertype == 1 || this.usertype == 4) {
        return [
          {
            value: 1,
            text: "待审核项目",
            pic: "../../../static/pic/201908191046413.png"
          },
          {
            value: 2,
            text: "待签约项目",
            pic: "../../../static/pic/201908191046412.png"
          },
          {
            value: 4,
            text: "待确认项目",
            pic: "../../../static/pic/20190819104641.png"
          },
          {
            value: 6,
            text: "成功签约项目",
            pic: "../../../static/pic/201908191046411.png"
          },
          {
            value: 3,
            text: "拒绝签约项目",
            pic: "../../../static/pic/201908191046414.png"
          }
        ];
      } else if (this.usertype == 3) {
        return [
          {
            value: 5,
            text: "待确认项目",
            pic: "../../../static/pic/20190819104641.png"
          },
          {
            value: 6,
            text: "已连接的项目",
            pic: "../../../static/pic/201908191046411.png"
          },
          {
            value: 7,
            text: "拒绝签约项目",
            pic: "../../../static/pic/201908191046414.png"
          }
        ];
      }
    }
  },
  created() {
    this.usertype = this.$store.state.currentUsertype;
  },
  mounted() {},
  methods: {
    mysignto(item) {
      //待审核
      console.log(item);
      let signStatus = item.signStatus;
      let obj = {
        projectId: item.projectId,
        signStatus: item.signStatus,
        signId: item.signId
      };
      if (this.usertype == 1) {
        if (signStatus == 1) {
          this.$routerto("p_sign_request", obj);
        } else if (signStatus == 2) {
          this.$routerto("p_wait_agent_input", obj);
        } else if (signStatus == 4) {
          this.$routerto("p_wait_investor", obj);
        } else if (signStatus == 6) {
          this.$routerto("p_sign_successful", obj);
        } else if (signStatus == 3 || signStatus == 7) {
          this.$routerto("p_sign_failed", obj);
        }
      } else if (this.usertype == 4) {
        console.log(signStatus);

        if (signStatus == 1) {
          this.$routerto("a_wait_review", obj);
        } else if (signStatus == 2) {
          this.$routerto("a_wait_signed", obj);
        } else if (signStatus == 4) {
          this.$routerto("a_wait_investor_comfirm", obj);
        } else if (signStatus == 6) {
          this.$routerto("a_sign_successful", obj);
        } else if (signStatus == 3 || signStatus == 7) {
          this.$routerto("a_sign_failed", obj);
        }
      }else if (this.usertype == 3) {
        console.log(signStatus);

          if (signStatus == 5) {
            this.$routerto("i_wait_confirm", obj);
          } else if (signStatus == 6) {
            this.$routerto("i_conected_project", obj);
          } else if (signStatus == 7) {
            this.$routerto("i_sign_failed", obj);
          } 
      }

      //待签约
      //待确认项目
      //成功签约
      //拒绝
    },
    confirm_lists() {
      if (this.result.indexOf(3) >= 0) {
        if (this.result.indexOf(7) <= 0) {
          this.result.push(7);
          console.log(111111);
        }
      } else if (this.result.indexOf(3) < 0) {
        if (this.result.indexOf(7) >= 0) {
          console.log(222222);
          this.result.splice(this.result.indexOf(7), 1);
        }
      }

      this.upGoodsInfo = [];
      this.onLoad();
      this.visible = false;
    },
    gg() {
      this.visible = !this.visible;
      // if (this.visible != true) {
      // console.log(document.querySelector(".van-checkbox-group").style.height);
      // }
      // document.querySelector('.bobobo').style.zIndex=-800;
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
      // console.log(this.result);
    },
    //  checkAll() {
    //   this.$refs.checkboxGroup.toggleAll(true);
    // },
    // toggleAll() {
    //   this.$refs.checkboxGroup.toggleAll();
    // },
    onLoad() {
      console.log(this.result);

      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/projectSign/project`,
        // data: this.$qs.stringify(this.form),
        params: {
          signStatusList: this.result,
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
            this.upGoodsInfo.forEach(item => {
              // console.log(this.$global);

              item.signTime = this.$global.timestampToTime(item.signTime);
              item.signTime4Submit = this.$global.timestampToTime(
                item.signTime4Submit
              );
              //  this.upGoodsInfo
              this.list.forEach(ite => {
                if (item.signStatus == ite.value) {
                  item.signStatustext = ite.text;
                  item.pic = ite.pic;
                }
              });
            });
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
    padding: 0.2rem 0.3rem;
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
  .van-icon-arrow-down {
    //  width: 0.2rem;
    //     height: 0.2rem;
    font-size: 0.1rem;
  }
  .van-icon-success {
    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.1rem;
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
      line-height: 1.6rem;
      font-size: 0.46rem;
      height: 1.6rem;
      // font-size: 0.4rem;
      border-bottom: 0.16rem solid #d2d2d2;
    }
    .sort_box {
      height: 1rem;
      border-bottom: 1px solid #7c7c7c;
      line-height: 1rem;
      font-size: 0.38rem;
      color: #00adef;
      // i{
      //    border: 0.05rem solid black;
      // }
    }

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
    padding: 3rem 0 1.3rem 0;
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

