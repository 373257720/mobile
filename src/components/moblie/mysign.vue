<template>
  <div id="mysign">
    <nav>
      <header>我的项目</header>
      <!-- <van-overlay z-index='-666' :show="visible" @click="visible= false"/> -->
      <main>
        <div class="sort_box" @click="fliter">
          项目筛选
          <van-icon name="arrow-down" />
        </div>
        <van-checkbox-group ref="check" v-model="result">
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
      </main>
    </nav>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
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
                <span>申请项目:</span>
                <span>{{item.projectName}}</span>
              </p>
              <p>
                <span>申请中间人:</span>
                <span>{{item.userIdentityType==1?item.userName:item.userCompany}}</span>
              </p>

              <p v-if="usertype==1 && item.signStatus>=6">
                <span>投资者名称:</span>
                <span>{{item.investorsName}}</span>
              </p>
              <p v-if="item.signStatus"  >
                <span >签约时间:</span>
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
    </van-pull-refresh>
    <mbottom></mbottom>
  </div>
</template>
<script>
// console.log(timeout)
export default {
  name: "mysign",
  data() {
    return {
      // visible: false,
      // text: "全部",
      loading: false,
      result: [],
      finished: false,
      refreshing: false,
      loadText: "加载中…",
      pageNum: 1,
      loadNumUp: 20,
      usertype: "",
      upGoodsInfo: [],
      // 1投行（项目方），3投资者，4投资中间人
      // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4    已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8   待确认项目->9  签约成功项目->10 拒绝签约项目->11
      piclists: [
        {
          value: 1,
          text: "待处理项目",
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
        },
        {
          value: 5,
          text: "已上链待推荐",
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 6,
          text: "待审核项目",
          pic: "../../../static/pic/waitreview.png"
        },
        {
          value: 8,
          text: "待发送邀请",
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 9,
          text: "待确认项目",
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 10,
          text: "签约成功项目",
          pic: "../../../static/pic/success.png"
        },
        {
          value: 3,
          text: "投行已拒绝",
          pic: "../../../static/pic/false.png"
        },
        {
          value: 7,
          text: "投行已拒绝",
          pic: "../../../static/pic/false.png"
        },
        {
          value: 11,
          text: "投资者已拒绝",
          pic: "../../../static/pic/false.png"
        }
      ],
      checklist_height: ""
      // classname: {
      //   // "0":
      // }
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (to.name == "p_submit_contract" || to.name == "a_submit_contract") {
      next(false);
    }else if (to.name =="a_recommand_i") {
      next(false);
    }else if (to.name =="a_project_intro" &&  to.query.signStatus==="0") {
      next(false);
    }else if (to.name =="uploadtoblock" &&  to.query.signStatus==="5") {
      next(false);
    }else if (to.name =="a_wait_sendemail" &&  to.query.signStatus==="9") {
      next(false);
    }else if (to.name =="i_wait_confirm" &&  to.query.signStatus==="11") {
      next(false);
    }else if (to.name =="i_perfect_infor") {
      next(false);
    } else if(to.name=='p_sign_request'){
      if( to.query.signStatus==6 || to.query.signStatus==1){
        next()
      }else{
        next(false);
      }
    }
    else {
      next();
    }
  },
  created() {
    this.usertype = this.$store.state.currentUsertype;
    if (this.$route.query.projectId) {
      let arr = JSON.parse(this.$route.query.array);
      if (arr.length > 0) {
        this.result = [...arr];
      }
    } else {
      if (this.$store.state.genre.length > 0) {
        this.result = [...this.$store.state.genre];
      } else {
        // 1投行（项目方），3投资者，4投资中间人
        // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4
        // 已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8
        // 待确认项目->9  签约成功项目->10 拒绝签约项目->11
        if (this.usertype == 1) {
          this.result = [1, 2, 4, 5, 6, 8, 9, 10, 11, 3, 7];
        } else if (this.usertype == 4) {
          this.result = [1, 2, 4, 5, 6, 8, 9, 10, 11, 3, 7];
        } else if (this.usertype == 3) {
          this.result = [9, 10, 11];
        }
      }
    }
  },
  computed: {
    list: function() {
      // 待处理项目->1 待签约项目->2 投行拒绝和中间人签约 ->3 已签约待上链->4    已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8   待确认项目->9  签约成功项目->10 投资人拒绝签约项目->11
      if (this.usertype == 1 || this.usertype == 4) {
        return [
          {
            value: 1,
            text: "待处理项目",
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
            text: "已上链待推荐",
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 6,
            text: "待审核项目",
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 8,
            text: "待中间人发送邀请给投资者",
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 9,
            text: "待确认项项目",
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 10,
            text: "签约成功项目",
            pic: "../../../static/pic/success.png"
          },
          {
            value: 3,
            text: "已拒绝项目",
            pic: "../../../static/pic/false.png"
          }
        ];
      } else if (this.usertype == 3) {
        return [
          {
            value: 9,
            text: "待确认项目",
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 10,
            text: "已连接的项目",
            pic: "../../../static/pic/success.png"
          },
          {
            value: 11,
            text: "拒绝签约项目",
            pic: "../../../static/pic/false.png"
          }
        ];
      }
    }
  },
  mounted() {
    this.checklist_height = this.$refs.check.$el.children[0].clientHeight;
  },
  methods: {
    onRefresh() {
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.upGoodsInfo = [];
      this.pageNum = 1;
      this.onLoad();
    },
    mysignto(item) {
      let signStatus = item.signStatus;
      let obj = {
        projectId: item.projectId,
        signStatus: item.signStatus,
        signId: item.signId
      };
      // 1投行（项目方），3投资者，4投资中间人
      // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4    已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8   待确认项目->9  签约成功项目->10 拒绝签约项目->11
      if (this.usertype == 1) {
        if (signStatus == 1) {
          this.$routerto("p_sign_request", obj);
        } else if (signStatus == 2) {
          this.$routerto("p_wait_agent_input", obj);
        } else if (signStatus == 4) {
          this.$routerto("p_wait_agent_input", obj);
        } else if (signStatus == 5) {
          this.$routerto("p_wait_investor", obj);
          // this.$routerto("p_wait_agent_input", obj);
        } else if (signStatus == 6) {
          this.$routerto("p_sign_request", obj);
        } else if (signStatus == 8) {
          this.$routerto("p_wait_investor", obj);
        } else if (signStatus == 9) {
          this.$routerto("p_wait_investor", obj);
        } else if (signStatus == 10) {
          this.$routerto("p_sign_successful", obj);
        } else if (signStatus == 3 || signStatus == 7 || signStatus == 11) {
          this.$routerto("p_sign_failed", obj);
        }
      } else if (this.usertype == 4) {
        if (signStatus == 1) {
          this.$routerto("a_wait_review", obj);
        } else if (signStatus == 2) {
          this.$routerto("a_wait_signed", obj);
        } else if (signStatus == 4) {
          this.$routerto("uploadtoblock", obj);
        } else if (signStatus == 5) {
          this.$routerto("a_project_intro", obj);
        } else if (signStatus == 6) {
          this.$routerto("a_wait_review", obj);
        } else if (signStatus == 8) {
          this.$routerto("a_wait_sendemail", obj);
        } else if (signStatus == 9) {
          this.$routerto("a_wait_investor_comfirm", obj);
        } else if (signStatus == 10) {
          this.$routerto("a_sign_successful", obj);
        } else if (signStatus == 3 || signStatus == 7 || signStatus == 11) {
          this.$routerto("a_sign_failed", obj);
        }
      } else if (this.usertype == 3) {
        console.log(signStatus);
        if (signStatus == 9) {
          this.$routerto("i_wait_confirm", obj);
        } else if (signStatus == 10) {
          this.$routerto("i_conected_project", obj);
        } else if (signStatus == 11) {
          this.$routerto("i_sign_failed", obj);
        }
      }
    },
    confirm_lists() {
      function unique(arr) {
        if (!Array.isArray(arr)) {
          console.log('type error!')
          return;
        }
        arr = arr.sort()
        var arrry= [arr[0]];
        for (var i = 1; i < arr.length; i++) {
          if (arr[i] !== arr[i-1]) {
            arrry.push(arr[i]);
          }
        }
        return arrry;
      }
      this.result=unique(this.result)
      // this.result = [...new Set(this.result)];
      if (this.usertype == 1 || this.usertype == 4) {
        if (this.result.indexOf(3) >= 0) {
          if (this.result.indexOf(7) <= 0) {
            this.result.push(7);
          }
          if (this.result.indexOf(11) <= 0) {
            this.result.push(11);
          }
        } else if (this.result.indexOf(3) < 0) {
          if (this.result.indexOf(7) >= 0) {
            this.result.splice(this.result.indexOf(7), 1);
          }
          if (this.result.indexOf(11) >= 0) {
            this.result.splice(this.result.indexOf(11), 1);
          }
        }
      }
      this.$store.commit("genre_array", this.result);
      // this.visible = false;
      console.log(this.$store.state)
      this.finished = false;
      this.loading = true;
      this.upGoodsInfo = [];
      this.pageNum = 1;
      this.fliter();
      this.onLoad();
    },
    fliter() {
      console.log(this.$refs.check.$el.style.height);
      // this.visible = !this.visible;
      // let aaa=this.$refs.check.$el.children[0].clientHeight;
      // console.log(this.$refs.check.$el.style.height);
      if (
        this.$refs.check.$el.style.height == 0 ||
        this.$refs.check.$el.style.height == 0 + "px"
      ) {
        this.$refs.check.$el.style.height = this.checklist_height + "px";
      } else {
        this.$refs.check.$el.style.height = 0;
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //  checkAll() {
    //   this.$refs.checkboxGroup.toggleAll(true);
    // },
    // toggleAll() {
    //   this.$refs.checkboxGroup.toggleAll();
    // },
    onLoad() {
      if (this.refreshing) {
        this.upGoodsInfo = [];
        this.refreshing = false;
      }
      this.$axios({
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
          if (res.data.resultCode == 10000) {
            let re = [...res.data.data.lists];
            for (let i = 0; i < re.length; i++) {
              re[i].signTime4Submit = re[i].signTime4Submit
                ? this.$global.timestampToTime(re[i].signTime4Submit)
                : "";
              re[i].signTime = re[i].signTime
                ? this.$global.timestampToTime(re[i].signTime)
                : "";
            }
            if (re.length > 0) {
              re.forEach(item => {
                this.piclists.forEach(each => {
                  if (item.signStatus == each.value) {
                    item.signStatustext = each.text;
                    item.pic = each.pic;
                  }
                });
              });
              this.upGoodsInfo = this.upGoodsInfo.concat(re);
              this.loading = false;
            }
            if (
              this.upGoodsInfo.length >= res.data.data.pageTotal ||
              this.upGoodsInfo.length == 0
            ) {
              this.finished = true;
            }
            this.pageNum++;
          } else {
            this.loading = false;
            this.finished = true;
          }
          console.log(this.upGoodsInfo);
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
  .van-checkbox-group {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    -webkit-transition: height 0.3s;
    -moz-transition: height 0.3s;
    -o-transition: height 0.3s;
    transition: height 0.3s;
    .van-hairline--top-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
  .van-pull-refresh {
    margin: 2.8rem 0 1.3rem 0;
  }

  .van-list {
    // padding: 2.8rem 0 2rem 0;
  }
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
    font-size: 0.3rem;
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
      font-size: 0.4rem;
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
    color: #333;
    text-align: center;
    top: 0;
    background: white;
    header {
      line-height: 1.6rem;
      font-size: 0.46rem;
      height: 1.6rem;
      // font-size: 0.4rem;
      border-bottom: 0.1rem solid #d2d2d2;
    }
    main {
      position: relative;
    }
    .sort_box {
      height: 1.2rem;
      border-bottom: 1px solid #d2d2d2;
      line-height: 1.2rem;
      font-size: 0.4rem;
      color: #00adef;
      // i{
      //    border: 0.05rem solid black;
      // }
    }

    // }
    .confirm {
      text-align: center;
      // padding: 0.2rem 0.3rem;
      font-size: 0.4rem;
      height: 1rem;
      background: #00aef1;
      color: white;
      line-height: 1rem;
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
    // padding: 2.8rem 0 0 0;
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
      div {
        /*width: 9rem;*/
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
        p:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
      aside {
        flex: 1;
        display: flex;
        font-size: 0.34rem;
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

