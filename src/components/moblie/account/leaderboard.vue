<template>
  <div id="vip">
    <commonnav>
      LEADERBOARD
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h3>TOP 10</h3>
      <aside>this week</aside>
      <table>
        <tr v-for="item in lists" :key="item.bslName">
          <td>
            <span>{{ item.topId }}</span>
          </td>
          <td>
            <span>{{
              item.rankingDisplayName === 1 ? item.userName : item.bslName
            }}</span>
          </td>
          <td>
            <span>{{ item.sumIntegral }}points</span>
          </td>
        </tr>
      </table>
      <div class="vip-leaderboard">
        <van-button
          @click="$routerto('pointsRedemptionList')"
          type="primary"
          size="mini"
          color="#00F0AB"
          >Apply for points redemption</van-button
        >
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {
      lists: [],
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
          `${this.$axios.defaults.baseURL}/bsl_web/member/getUserRanking`,
          {
            pageIndex: 1,
            pageSize: 10,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);

          this.lists = res.data.data.lists;

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
#vip {
  main {
    padding: 0 vw(50);
    padding-top: vw(140);
    h3 {
      text-align: center;
      font-size: vw(40);
      color: #00f0ab;
      font-weight: bold;
      line-height: vw(44);
    }
    aside {
      display: flex;
      justify-content: flex-end;
      font-size: vw(30);
      font-weight: bold;
      color: #00f0ab;
      margin-bottom: vw(30);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      //   border-spacing: 0 vw(70);
      border: 0;
      tr {
        td {
          vertical-align: top;
          text-align: center;
          font-size: vw(36);
          line-height: vw(42);
          padding-bottom: vw(70);
          //   padding-right: vw(60);
          color: #4f3dad;
          line-height: vw(42);
          font-weight: bold;
          opacity: 1;
        }
        td:nth-of-type(1) {
          width: vw(40);
          text-align: center;
        }
        td:nth-of-type(2) {
          width: vw(188);
        }
        td:nth-of-type(3) {
          //   padding-right: 0;
          width: vw(208);
        }
        &:last-child {
        }
      }
    }
    .vip-leaderboard {
      display: flex;
      justify-content: center;
      button {
        width: vw(338);
        height: vw(80);
        background: #00f0ab;
        border-radius: vw(8);
      }
    }
  }
}
</style>
