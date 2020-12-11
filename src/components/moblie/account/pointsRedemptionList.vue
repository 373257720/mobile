<template>
  <div id="redemption">
    <commonnav>
      Points redemption
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
      >
        <ul>
          <li v-for="(element,idx) in redemptionInfo" :key="idx">{{idx}}</li>
        </ul>
      </v-scroll>
    </main>
  </div>
</template>
<script>
import Scroll from "@/components/moblie/loadmore";
export default {
  name: "vip",
  data() {
    return {
      redemptionInfo: [],
      loaded: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  components: {
    "v-scroll": Scroll
  },
  created() {
    this.getlist();
  },
  methods: {
    onRefresh(done) {
      this.loaded = false;
      this.getlist(done);
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    /**
     * 上拉加载接口
     */
    onInfinitePort(done) {
      this.getlist(done);
    },
    getlist(done) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/member/getBslExchangeIntegralList`,
          {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          }
        )
        .then(res => {
          this.redemptionInfo = res.data.data.lists;
          this.loaded = true;
          if (done) done();
        })
        .catch(err => {
          this.loaded = true;
        });
    }
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
