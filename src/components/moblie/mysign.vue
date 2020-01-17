<template>
  <div id="mysign">
    <nav>
      <header>
        <van-icon name="arrow-left" @click="$global.previous()" />我的項目
      </header>
      <main>
        <div class="sort_box" @click="gg">项目筛选<van-icon name="arrow-down" />
        </div>
        <transition name="fade">
          <van-checkbox-group v-show="visible" v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="index"
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
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      :offset="300"
    >
      <ul>
        <li v-for="item in upGoodsInfo" :key="item.signId" @click="mysignto(item)">
          <div>
            <p>
              <span>申请时间:</span>
              <span>{{item.signTime4Submit}}</span>
            </p>
            <p>
              <span>申请中间人:</span>
              <span>{{item.userIdentityType==1?item.userName:item.userCompany}}</span>
            </p>
            <p>
              <span>申请项目:</span>
              <span>{{item.projectName}}</span>
            </p>
            <p>
              <span>签约时间:</span>
              <span>{{item.signTime}}</span>
            </p>
          </div>
          <aside>
            <img :src="item.pic" alt />
            <span>{{item.signStatustext}}</span>
          </aside>

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
      result: [],
      finished: false,
      loadText: "加载中…",
      pageNum: 1,
      loadNumUp: 20,
      usertype: "",
      upGoodsInfo: [],
      piclists: [
        {
          value: 1,
          text: "待审核项目",
          pic: "../../../static/pic/waitreview.png"
        },
        {
          value: 2,
          text: "待签约项目",
          pic: "../../../static/pic/waitsign.png"
        },
        {
          value: 4,
          text: "已签约待上链",
          pic: "../../../static/pic/waitinvestor.png"
        },{
          value: 6,
          text: "待确认项目",
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 5,
          text: "已上链待发送",
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 8,
          text: "成功签约项目",
          pic: "../../../static/pic/success.png"
        },
        {
          value: 3,
          text: "投行已拒绝",
          pic: "../../../static/pic/false.png"
        },
        {
          value: 7,
          text: "投资者已拒绝",
          pic: "../../../static/pic/false.png"
        }
      ],
      classname: {
        // "0":
      }
    };
  },

  created() {
    this.usertype = this.$store.state.currentUsertype;
    if (this.$route.query.projectId) {
      let a=  JSON.parse(this.$route.query.array);
      if (a.length > 0) {
        this.result = [...a];
        // if (this.result.indexOf(4)!=-1) {
        //   this.result.splice(this.result.indexOf(4), 1);
        // }
      }
    } else {
      if (this.$store.state.genre.length > 0) {
        this.result = [...this.$store.state.genre];
      } else {
        // 1投行（项目方），3投资者，4投资中间人
        if (this.usertype == 1) {
          // 投行（项目方） ：待审核项目->1 待签约项目->2  已签约待上链->4    已上链待发送->5  待确认项目->6  签约成功项目->8  拒绝签约项目->3，7
          this.result = [1, 2, 4, 5, 6, 3, 7,8];
        } else if (this.usertype == 4) {
          // 待审核项目->1 待签约项目->2  已签约待上链->4    已上链待发送->5  待确认项目->6  签约成功项目->8  拒绝签约项目->3，7
          this.result = [1, 2, 4, 5, 6, 3, 7,8];
        } else if (this.usertype == 3) {
          this.result = [8, 6, 7];
        }
      }
    }
  },
  computed: {
    list: function() {
      console.log(this.usertype);
      if (this.usertype == 1 ||this.usertype == 4) {
        return [
          {
            value: 1,
            text: "待审核项目",
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 2,
            text: "待签约项目",
            pic: "../../../static/pic/waitsign.png"
          },
          {
            value: 4,
            text: "已签约待上链",
            pic: "../../../static/pic/waitsign.png"
          },
          {
            value: 5,
            text: "已上链待发送",
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 6,
            text: "待确认项项目",
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 8,
            text: "签约成功项目",
            pic: "../../../static/pic/success.png"
          },
          {
            value: 3,
            text: "已拒绝项目",
            pic: "../../../static/pic/false.png"
          }
        ];
      }
       else if (this.usertype == 3) {
        return [
          {
            value: 6,
            text: "待确认项目",
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 8,
            text: "已连接的项目",
            pic: "../../../static/pic/success.png"
          },
          {
            value: 7,
            text: "拒绝签约项目",
            pic: "../../../static/pic/false.png"
          }
        ];
      }
    }
  },
  mounted() {},
  methods: {
    mysignto(item) {
      //待审核
      // console.log(item);
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
          this.$routerto("p_wait_agent_input", obj);
        } else if (signStatus == 5) {
          this.$routerto("p_wait_investor", obj);
        }
        else if (signStatus == 6) {
          this.$routerto("p_wait_investor", obj);
        } else if (signStatus == 8) {
          this.$routerto("p_sign_successful", obj);
        } else if (signStatus == 3 || signStatus == 7) {
          this.$routerto("p_sign_failed", obj);
        }
      } else if (this.usertype == 4) {
        // console.log(signStatus);
        if (signStatus == 1) {
          this.$routerto("a_wait_review", obj);
        } else if (signStatus == 2) {
          this.$routerto("a_wait_signed", obj);
        } else if (signStatus == 4) {
          this.$routerto("a_submit_contract", obj);
        } else if (signStatus == 5) {
          this.$routerto("a_wait_sendemail", obj);
        }  else if (signStatus == 6) {
          this.$routerto("a_wait_investor_comfirm", obj);
        }else if (signStatus == 8) {
          this.$routerto("a_sign_successful", obj);
        } else if (signStatus == 3 || signStatus == 7) {
          this.$routerto("a_sign_failed", obj);
        }
      } else if (this.usertype == 3) {
        console.log(signStatus);
        if (signStatus == 6) {
          this.$routerto("i_wait_confirm", obj);
        } else if (signStatus == 8) {
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
      if (this.usertype == 1 || this.usertype == 4) {
        if (this.result.indexOf(3) >= 0) {
          if (this.result.indexOf(7) <= 0) {
            this.result.push(7);
          }
        } else if (this.result.indexOf(3) < 0) {
          if (this.result.indexOf(7) >= 0) {
            this.result.splice(this.result.indexOf(7), 1);
          }
        }
      }
      console.log(this.result);
      // this.$store.commit("genre_array", []);
      this.$store.commit("genre_array", this.result);
      this.upGoodsInfo = [];
      this.pageNum = 1;
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
      let a = this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/project`,
        data: this.$qs.stringify(
          {
            projectId: this.$route.query.projectId,
            signStatusList: this.result,
            pageIndex: this.pageNum,
            pageSize: this.loadNumUp
          },
          { arrayFormat: "brackets" }
        ),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.status === 200) {
            let re = [...res.data.data.lists];
            for (let i = 0; i < re.length; i++) {
              re[i].signTime4Submit = this.$global.timestampToTime(
                re[i].signTime4Submit
              );
              re[i].signTime = this.$global.timestampToTime(re[i].signTime);
            }
            if (re.length > 0) {
              this.upGoodsInfo = this.upGoodsInfo.concat(re);
              this.loading = false;
              this.finished = true;
            }
            if (
              this.upGoodsInfo.length >= res.data.data.pageTotal ||
              this.upGoodsInfo.length == 0
            ) {
              // this.loadText = "加载完成";
              this.loading = false;
              // document.querySelector(
              //   "#mysign .van-loading__spinner--circular"
              // ).style.display = "none";
              this.finished = true;
            }
            this.pageNum++;
          } else {
            this.loading = false;
            this.finished = true;
          }
          this.upGoodsInfo.forEach(item => {
            this.piclists.forEach(ite => {
              // console.log(item.signStatus, ite.value);
              if (item.signStatus == ite.value) {
                item.signStatustext = ite.text;
                item.pic = ite.pic;
                // console.log(item.signStatustext, item.pic);
              }
            });
          });
          // console.log(this.upGoodsInfo);
        })
        .catch(err => {
          // this.loadText = "加载失败";
          //  let fff = document.querySelector(
          //         "#mysign .van-loading__spinner--circular"
          //       );
          //       console.log(fff);
          //       let a = (document.querySelector(
          //         "#mysign .van-loading__text"
          //       ).style = "margin-left:0");

          //       fff.parentNode.removeChild(fff);
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
    padding: 2.8rem 0 1.3rem 0;
    background: white;
    li {
      // line-height: 0.6rem;
      /*position: relative;*/
      display: flex;
      /*word-break: break-all;*/
      margin: 0 0.54rem;
      padding: 0.3rem 0;
      border-bottom: 0.02rem dashed #b5b5b5;
      font-size: 0.36rem;
      div{
        width: 9rem;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: space-evenly;*/
        p {
          display: flex;
          margin-bottom: 0.2rem;
          font-size: 0.34rem;
          span:nth-child(1) {
            font-weight: 900;
            line-height: 0.46rem;
            display: inline-block;
            width: 2.3rem;
            vertical-align: top;
          }
          span:nth-child(2) {
            vertical-align: top;
            display: inline-block;
            width: 6.3rem;
            color: #575757;
          }
          //
        }
        p:nth-last-child(1){
          margin-bottom: 0;
        }
      }
      aside{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      img {
        height: 0.78rem;
        width: 0.78rem;
      }
    }
  }
}
</style>

