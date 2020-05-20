<template>
  <div id="mysign">
    <nav>
      <header>{{$t('common.MyProjectS')}}</header>
      <!-- <van-overlay z-index='-666' :show="visible" @click="visible= false"/> -->
      <main >
        <div class="sort_box" @click="fliter" v-if="usertype">
          {{$t('common.ProjectScreening')}}
          <van-icon name="arrow-down" />
        </div>
        <van-checkbox-group ref="check" v-model="result">
          <van-cell-group>
            <div class="all_select" :class="num==2?'isactive':'isorigin'" @click="toggleAll">
              {{$t('common.SelectAll')}}
            </div>
            <div class="choose_lists">
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="item.text"
                :title="`${item.text}`"
                @click="toggle(index)"
              >
                <van-checkbox :name="item.value" ref="checkboxes" slot="right-icon" />
              </van-cell>
            </div>
            <div class="confirm" @click="confirm_lists">{{$t('common.Determine')}}</div>

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
          :finished-text="already_check"
          :error-text="$t('common.RequestFailed')"
          :offset="300"
        >
          <ul>
            <li v-for="item in upGoodsInfo" :key="item.signId" @click="mysignto(item)">
              <div>
                <p>
                  <span>{{$t('common.ApplicationTime')}}:</span>
                  <span>{{item.signTime4Submit}}</span>
                </p>
                <p>
                  <span>{{$t('common.ApplicationProject')}}:</span>
                  <span>{{item.projectName || '-'}}</span>
                </p>
                <p>
                  <span>{{$t('common.ApplicationMiddleman')}}:</span>
                  <span>{{item.userIdentityType==1?item.userName:
                    item.userCompany}}</span>
                </p>

                <p v-if="usertype==1 && item.signStatus>5">
                  <span>{{$t('common.InvestorName')}}:</span>
                  <span>{{item.investorsName}}</span>
                </p>
                <p v-if="item.signStatus"  >
                  <span >{{$t('common.SigningTime')}}:</span>
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
      loadText: "Loading…",
      pageNum: 1,
      loadNumUp: 20,
      usertype: "",
      upGoodsInfo: [],
      // 1投行（项目方），3投资者，4投资中间人
      // 待处理项目->1 待签约项目->2 投行拒绝和投资人签约 ->3 已签约待上链->4    已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8   待确认项目->9  签约成功项目->10 拒绝签约项目->11
      piclists: [
        {
          value: 1,
          text: this.$t('common.PendingItems'),
          pic: "../../../static/pic/waitreview.png"
        },
        {
          value: 2,
          text: this.$t('common.ToBeSignedProject'),
          pic: "../../../static/pic/waitsign.png"
        },
        // {
        //   value: 4,
        //   text:this.$t('common.SignedForChain'),
        //   pic: "../../../static/pic/waitinvestor.png"
        // },
        {
          value: 5,
          text: this.$t('common.ChainedForRecommendation'),
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 6,
          text: this.$t('common.PendingReview'),
          pic: "../../../static/pic/waitreview.png"
        },
        {
          value: 8,
          text: this.$t('common.ReviewedPending'),
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 9,
          text: this.$t('investor.Itemstobeconfirmed'),
          pic: "../../../static/pic/waitinvestor.png"
        },
        {
          value: 10,
          text:this.$t('common.SignedContract'),
          pic: "../../../static/pic/success.png"
        },
        {
          value: 3,
          text:this.$t('common.InvestmentBankHasRejected'),
          pic: "../../../static/pic/false.png"
        },
        {
          value: 7,
          text:this.$t('common.InvestmentBankHasRejected'),
          pic: "../../../static/pic/false.png"
        },
        {
          value: 11,
          text:this.$t('common.InvestorHasRejected'),
          pic: "../../../static/pic/false.png"
        }
      ],
      checklist_height: "",
      // classname: {
      //   // "0":
      // }
      num:2,
    };
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to, from);
    if (to.name == "p_submit_contract" || to.name == "a_submit_contract") {
      next(false);
    }else if (to.name =="a_recommand_i") {
      next(false);
    }else if (to.name =="a_project_intro" &&  to.query.signStatus==="0") {
      next(false);
    }
	// else if (to.name =="uploadtoblock" &&  to.query.signStatus==="5") {
 //      next(false);
 //    }
	else if (to.name =="a_wait_sendemail" &&  to.query.signStatus==="9") {
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
    // console.log(this.num)
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
        if (this.usertype == 1 || this.usertype == 4) {
          this.result = [1, 2, 4, 5, 6, 8, 9, 10, 11, 3, 7];
        } else if (this.usertype == 3) {
          this.result = [9, 10, 11];
        }
      }
    }
  },
  computed: {
    already_check:function(){
      if(this.$store.state.currentUsertype || this.usertype){
            return this.$t('common.NoMore')
      }else{
            return this.$t('common.WaitForReview')
      }
    },

    list: function() {
      // 待处理项目->1 待签约项目->2 投行拒绝和中间人签约 ->3 已签约待上链->4
      // 已上链待推荐->5  待审核项目->6  已审核拒绝->7  已审核待发送8
      // 待确认项目->9  签约成功项目->10 投资人拒绝签约项目->11
      if (this.usertype == 1 || this.usertype == 4) {
        return [
          {
            value: 1,
            text:  this.$t('common.PendingItems'),
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 2,
            text: this.$t('common.ToBeSignedProject'),
            pic: "../../../static/pic/waitsign.png"
          },
          // {
          //   value: 4,
          //   text: this.$t('common.SignedForChain'),
          //   pic: "../../../static/pic/waitsign.png"
          // },
          {
            value: 5,
            text: this.$t('common.ChainedForRecommendation'),
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 6,
            text: this.$t('common.PendingReview'),
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 8,
            text:  this.$t('common.ReviewedPending'),
            pic: "../../../static/pic/waitreview.png"
          },
          {
            value: 9,
            text:this.$t('common.ToBeConfirmedByInvestors'),
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 10,
            text: this.$t('common.SignedContract'),
            pic: "../../../static/pic/success.png"
          },
          {
            value: 3,
            text: this.$t('common.RejectedProject'),
            pic: "../../../static/pic/false.png"
          }
        ];
      } else if (this.usertype == 3) {
        return [
          {
            value: 9,
            text: this.$t('common.ToBeConfirmedByInvestors'),
            pic: "../../../static/pic/waitinvestor.png"
          },
          {
            value: 10,
            text:this.$t('common.SignedContract'),
            pic: "../../../static/pic/success.png"
          },
          {
            value: 11,
            text:this.$t('common.RejectedProject'),
            pic: "../../../static/pic/false.png"
          }
        ];
      }
    }
  },
  mounted() {
    this.initial();
    // this.checklist_height = this.$refs.check.$el.children[0].clientHeight;
    this.$nextTick(() => {
      window.addEventListener("resize",this.initial, false);
    });
  },
  destroyed() {
    window.removeEventListener("resize",this.initial, false);
  },

  methods: {
    initial(){
      this.$refs.check.$el.style.height = 0;
      // console.log(123)
      if (window.orientation == 90 || window.orientation == -90) {
        document.querySelector('.choose_lists').style.maxHeight=4+'rem';
      }else{
        document.querySelector('.choose_lists').style.maxHeight='initial';
      }
    },
     toggleAll() {
       // console.log(this.num)
       if(this.num==1){
         this.$refs.check.toggleAll(true);
         this.num=2;
       }else if(this.num==2){
         this.$refs.check.toggleAll(false);
         this.num=1;
       }
    },
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
      console.log(this.$store.state)
      this.finished = false;
      this.loading = true;
      this.upGoodsInfo = [];
      this.pageNum = 1;
      this.fliter();
      this.onLoad();
    },
    fliter() {
      this.checklist_height = this.$refs.check.$el.children[0].clientHeight;
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
            pageSize: this.loadNumUp,
            X_Token:this.$store.state.X_Token
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
          // console.log(this.upGoodsInfo);
        })
        .catch(err => {
          // this.loadText = "加载失败";
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
      /*height:100px;*/
      bottom: 0;
      width: 100%;
    }
    /*.choose_lists{*/
    /*  max-height: 6rem;*/
    /*  overflow-y: scroll;*/
    /*}*/
    .choose_lists{
      /*max-height: 4rem;*/
      overflow: hidden;
      overflow-y: auto;
    }
    .choose_lists::-webkit-scrollbar-track-piece {
      background-color: rgba(0, 0, 0, 0);
      border-left: 1px solid rgba(0, 0, 0, 0);
    }
    .choose_lists::-webkit-scrollbar {
      width: 3px;
      height: 13px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
    .choose_lists::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.5);
      background-clip: padding-box;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      min-height: 28px;
    }
    .choose_lists::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
  }

  .van-pull-refresh {
    padding: 2.8rem 0 1.3rem 0;
    /*height: 100%;*/


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

      box-sizing: border-box;
      height: 1rem;

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
	  font-weight: bold;
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
    .all_select{
      text-align: center;
      font-size: 0.4rem;
      height: 1rem;
      /*background: #00adef;*/
      /*color: white;*/
      /*border-bottom: 1px solid #ebedf0;*/
      line-height: 1rem;

    }
    // }
    .isorigin{
      color: black;
    }
    .isactive{
      color: #00adef;
    }
    .confirm {
      text-align: center;
      // padding: 0.2rem 0.3rem;
      font-size: 0.4rem;
      height: 1rem;
      /*box-sizing: border-box;*/
      background: #00aef1;
      color: white;
      line-height: 1rem;

      /*p{*/
      /*  flex: 1;*/
      /*}*/
      /*p:nth-child(1){*/
      /*    background:black;*/
      /*}*/
      /*p:nth-child(1):active{*/
      /*    background: #1989fa;;*/
      /*}*/
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
    /*border-top: 1px solid #d2d2d2;*/
    li {
      // line-height: 0.6rem;
      /*position: relative;*/
      display: flex;
			letter-spacing: 0.0125rem;
      /*word-break: break-all;*/
      margin: 0 0.54rem;
      padding: 0.3rem 0;
      border-bottom: 0.02rem dashed #b5b5b5;
      font-size: 0.36rem;
      div {
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        p {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.12rem;
          font-size: 0.38rem;
          span:nth-child(1) {
            font-weight: 800;
            font-size: 0.42rem;
            /*line-height: 0.46rem;*/
            /*display: inline-block;*/
            /*width: 2.6rem;*/
            /*vertical-align: top;*/
          }
          span:nth-child(2) {
            /*vertical-align: top;*/
            /*display: inline-block;*/
            /*flex: 1;*/
            font-size: 0.4rem;
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
        text-align: center;
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

