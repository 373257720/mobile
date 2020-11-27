<template>
  <div id="redemption">
    <commonnav>
      Points redemption
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h3>100 points = 10 HKD</h3>
      <article>
        <h4>Rules</h4>
        <div class="content"></div>
        <div class="points">
          <header>points redemption</header>
          <p>
            Now you have 8320 points, please enter
            points you would like to trade.
          </p>
          <p>
            <input type="number" />
            <span>Points</span>
          </p>
        </div>
        <footer>expiry date: 31-12-2025</footer>
        <van-button
          @click="$routerto('pointsRedemption')"
          type="primary"
          size="mini"
          color="#00F0AB"
        >Submit</van-button>
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {
      
    };
  },
  created() {
      this.getlist();
  },
  methods: {
     getlist() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/member/getBslExchangeIntegralList`
        )
        .then(res => {
          this.$store.commit("isloading", false);
        res.data.data.lists
          console.log(res);
          
          // this.bslMemberLog = res.data.data;
          // console.log(this.bslMemberLog);
          // this.lists = res.data.data.lists;

          // console.log(res);
        });
    },
    // handleleterClick() {},
  }
};
</script>
<style lang="scss">
.van-progress {
}
</style>
<style lang="scss" scoped>
#redemption {
  main {
    // padding: 0 vw(108);
    padding-top: vw(140);
    h3 {
      text-align: center;
      font-size: vw(40);
      color: #00f0ab;
      font-weight: bold;
      line-height: vw(44);
    }

    article {
      display: flex;

      flex-direction: column;
      align-items: center;
      h4 {
        font-size: vw(30);
        font-weight: bold;
        padding-left: vw(14);
        width: vw(590);
        color: #4f3dad;
        margin-bottom: vw(26);
      }
      div.content {
        width: vw(590);
        height: vw(404);
        border: vw(2) solid #4f3dad;
        opacity: 1;
        margin-bottom: vw(50);
      }
      .points {
        width: vw(636);
        padding: vw(42) vw(58) 0;
        height: vw(354);
        background: #4f3dad;
        opacity: 1;
        border-radius: vw(75);
        header {
          font-size: vw(40);
          font-weight: bold;
          // line-height: 46px;
          color: #ffffff;
          opacity: 1;
        }
        p {
          font-size: vw(24);
          line-height: vw(28);
          color: #ffffff;
          opacity: 1;
        }
       
      }
       footer {
          font-size: vw(30);
          font-family: Helvetica Neue;
          font-weight: bold;

          color: #4f3dad;
          opacity: 1;
        }
    }
  }
}
</style>
