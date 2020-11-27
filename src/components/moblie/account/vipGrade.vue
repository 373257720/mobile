<template>
  <div id="vip">
    <commonnav>
      Vip
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <div class="item-1">
        <p>{{memberDetails.exchangeIntegral}}</p>
        <p>Points</p>
      </div>
      <div class="iconfont icon-account"></div>
      <div class="item-2">
        <p>{{memberDetails.days}}</p>
        <p>Days</p>
      </div>
    </main>
    <div class="vip-leaderboard">
      <van-button
        @click="$routerto('leaderboard')"
        type="primary"
        size="mini"
        color="#00F0AB"
      >leaderboard</van-button>
    </div>
    <div class="vipGrade">
      <header>Current</header>
      <p>Today's growth value: {{memberDetails.todayIntegral}}</p>
      <nav>
        <div class="percent">
          <p :style="{width:CurrentbarWidth}"></p>
        </div>
        <ul>
          <li>Glod</li>
          <li>
            still need {{memberDetails.differIntegral}} points
            to level up
          </li>
          <li>Platinum</li>
        </ul>
      </nav>
      <header>My gold exclusive rights</header>
      <article>
        <div class="item item-1">
          <span></span>
          <p>{{memberDetails.rights && memberDetails.rights.memberRecommendCount}}recommended items</p>
        </div>
        <div class="item item-2">
          <span></span>
          <p>{{memberDetails.rights && memberDetails.rights.recommendInvestorTime}}referral limits</p>
        </div>
        <div class="item item-3">
          <span></span>
          <p>{{memberDetails.rights && memberDetails.rights.recommendMiddlemanTime}}Priority recommendation time</p>
        </div>
      </article>
      <header>Platinnum exclusive rights</header>
      <article>
        <div class="item item-1">
          <span></span>
          <p>{{memberDetails.nextRights && memberDetails.nextRights.memberRecommendCount}}recommended items</p>
        </div>
        <div class="item item-2">
          <span></span>
          <p>{{memberDetails.nextRights && memberDetails.nextRights.recommendInvestorTime}}referral limits</p>
        </div>
        <div class="item item-3">
          <span></span>
          <p>{{memberDetails.nextRights && memberDetails.nextRights.recommendMiddlemanTime}}Priority recommendation time</p>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {
      CurrentbarWidth: 0,
      memberDetails: {
        createTime: null,
        days: null,
        differIntegral: null,
        exchangeIntegral: null,
        memberId: "",
        memberIntegral: null,
        memberLevel: null,
        membershipValidity: null,
        nextRights: {
          memberRecommendCount: null,
          recommendInvestorTime: null,
          recommendMiddlemanTime: null
        },
        percentageNumber: null,
        rights: {
          memberRecommendCount: null,
          recommendInvestorTime: null,
          recommendMiddlemanTime: null
        },

        todayIntegral: null
      }
    };
  },
  created() {
    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_web/member/getMemberDetails`
      )
      .then(res => {
        this.memberDetails = Object.assign(
          this.memberDetails,
          res.data.data.memberDetails
        );
        // this.memberDetails = res.data.data.memberDetails;
        this.CurrentbarWidth =
          Math.round(this.memberDetails.percentageNumber) + "%";
        // console.log(res);
      });
  },
  mounted() {
    //  console.log();
    // let progressbarWidth=document.querySelector('.percent').clientWidth;
    // let timer = setTimeout(() => {
    // clearTimeout(timer);
    // }, 1000);
  },
  methods: {
    // handleleterClick() {},
  }
};
</script>
<style lang="scss">
.van-progress {
}
</style>
<style lang="scss" scoped>
#vip {
  .vipGrade {
    // width: 332px;
    // margin-top: vw(36);
    padding: 0 vw(54);
    color: #4f3dad;
    nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        width: vw(570);
        height: vw(42);
        position: relative;
        overflow: hidden;
        border: vw(6) solid #4f3dad;
        border-radius: vw(22);
        margin-bottom: vw(34);
        p {
          transition: all 0.5s ease-out;
          position: absolute;
          left: 0;
          top: 0;
          background: #00f0ab;
          height: 100%;
          border-radius: vw(22);
        }
      }
      ul {
        display: flex;
        width: vw(570);
        margin-bottom: vw(68);
        justify-content: space-between;
        li {
          font-size: vw(24);
          font-weight: bold;
          line-height: vw(28);
          color: #4f3dad;
          opacity: 1;
        }
        li:nth-of-type(2) {
          width: vw(248);
        }
      }
    }
    header {
      height: vw(44);
      font-size: vw(40);
      font-weight: bold;
      line-height: vw(44);
      margin-bottom: vw(34);
    }
    > p {
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      margin-bottom: vw(44);
    }
    article {
      // height: vw(400);
      // background: #00f0ab;
      margin-bottom: vw(52);
      display: grid;
      grid-row: 1;
      grid-column: 3;
      //   gap: vw(40) vw(60);
      // justify-items: center;
      grid-template-columns: repeat(3, 33.3%);
      // grid-template-rows: repeat(auto);
      grid-auto-flow: row;
      .item {
        text-align: center;
        //  display: flex;
        //  flex-direction: column;
        //  align-items: center;
        //  justify-items: center;
        span {
          display: inline-block;
          width: vw(88);
          height: vw(88);
          font-size: vw(24);
          // line-height: vw(88);

          color: #fff;
          background: #4f3dad;
          border-radius: 50%;
          margin-bottom: vw(16);
        }
        p {
          font-size: vw(16);
          line-height: vw(18);
        }
      }
    }
  }
  main {
    padding-top: vw(140);
    display: flex;

    // justify-content: space-evenly;
    align-items: center;
    color: #4f3dad;
    .item-1,
    .item-2 {
      flex: 1;
    }

    .icon-account {
      height: vw(162);
      width: vw(162);
      color: #fff;
      font-size: vw(95);
      text-align: center;
      line-height: vw(162);
      background: #00f0ab;
      border-radius: 50%;
    }
    div {
      text-align: center;
      // position: relative;

      p:nth-of-type(1) {
        font-size: vw(66);
        font-weight: bold;
        line-height: vw(68);
      }
      p:nth-of-type(2) {
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
      }
    }
  }
  .vip-leaderboard {
    display: flex;
    margin-left: vw(70);
    margin-bottom: vw(36);
    text-align: center;
    button {
      border-radius: vw(8);
      width: vw(154);
      .van-button__text {
        font-size: vw(20);

        line-height: vw(22);
        color: #faf9f9;
      }
    }
  }
}
</style>
