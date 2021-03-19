<template>
  <div id="redemption">
    <commonnav>
      Points redemption
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h3>{{ redemptionInfo["giftName" + $global.lan()] }}</h3>
      <article>
        <h4>Rules</h4>
        <div class="content">{{ redemptionInfo.exchangeDetails }}</div>
        <div class="points">
          <header>points redemption</header>
          <p>
            Now you have
            {{ bslMember.exchangeIntegral }} points, You can enter a number to
            exchange the number of prizes you want, each of which is
            {{ redemptionInfo.integralAmount }} points
          </p>
          <section>
            <input
              type="number"
              @input="
                ($event) =>
                  (exchangeNumber = $global.inputModel(
                    $event.currentTarget.value,
                    0,
                    false,
                    bslMember.exchangeIntegral
                  ))
              "
              v-model="exchangeNumber"
            />
            <span>items</span>
          </section>
        </div>
        <footer>
          expiry date:
          {{ $global.timestampToTime(redemptionInfo.exchangeEndTime) }}
        </footer>
        <van-button
          @click="submitUserBslPointsExchange"
          type="primary"
          color="#00F0AB"
          >Trade</van-button
        >
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {
      exchangeNumber: 0,
      redemptionInfo: {},
      bslMember: {},
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    submitUserBslPointsExchange() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/member/submitUserBslPointsExchange`,
          {
            exchangeIntegralId: this.$route.query.id,
            exchangeNumber: this.exchangeNumber,
            type: 1, // 0按积分计算1按数量计算，默认为积分
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode === 10000) {
              }
            });
        });
    },
    getlist() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/member/getBslExchangeIntegral`,
          { exchangeIntegralId: this.$route.query.id }
        )
        .then((res) => {
          this.$store.commit("isloading", false);

          if (res.data.resultCode === 10000) {
            this.redemptionInfo = res.data.data.bslExchangeIntegral;
            this.bslMember = res.data.data.bslMember;
            this.exchangeIntegral = this.bslMember.exchangeIntegral;
          }
          // this.bslMemberLog = res.data.data;
          // console.log(this.bslMemberLog);
          // this.lists = res.data.data.lists;

          // console.log(res);
        });
    },
    // handleleterClick() {},
  },
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
      margin-bottom: vw(70);
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
        font-size: vw(30);
        color: #4f3dad;
        overflow-y: auto;
        width: vw(590);
        height: vw(404);
        border: vw(2) solid #4f3dad;
        opacity: 1;
        margin-bottom: vw(50);
        padding: vw(30) vw(24);
      }
      .points {
        width: vw(636);
        padding: vw(42) vw(58) 0;
        height: vw(354);
        background: #4f3dad;
        opacity: 1;
        border-radius: vw(50);
        margin-bottom: vw(62);
        header {
          font-size: vw(40);
          font-weight: bold;
          margin-bottom: vw(52);
          // line-height: 46px;
          color: #ffffff;
        }
        p {
          font-size: vw(24);
          line-height: vw(28);
          color: #ffffff;
          opacity: 1;
          margin-bottom: vw(60);
        }
        section {
          display: flex;
          justify-content: flex-end;
          input {
            width: vw(98);
            height: vw(40);
            margin-right: vw(20);

            font-size: vw(20);
            text-align: center;
          }
          span {
            font-size: vw(26);
            font-weight: bold;
            color: #00e3a2;
          }
        }
      }
      footer {
        font-size: vw(30);
        font-family: Helvetica Neue;
        font-weight: bold;
        margin-bottom: vw(92);
        color: #4f3dad;
        opacity: 1;
      }
      .van-button--primary {
        width: vw(233);
        height: vw(72);
        background: #00f0ab;
        border-radius: vw(10);
        opacity: 1;
      }
    }
  }
}
</style>
