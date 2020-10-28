<template>
  <div id="vip">
    <commonnav>
      Vip
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <div class="iconfont icon-account"></div>
    </main>
    <div class="vipGrade">
      <header>Current</header>
      <p>Today's growth value: 0</p>
      <nav>
        <div>
          <p></p>
        </div>
        <ul>
          <li>Glod</li>
          <li>
            still need 7600 points
            to level up
          </li>
          <li>Platinum</li>
        </ul>
      </nav>
      <header>My gold exclusive rights</header>
      <article>
        <div class="item item-1">
          <span></span>
          <p>
            Recommended number
            of intermediaries
          </p>
        </div>
        <div class="item item-2">
          <span></span>
          <p>
            Recommended number
            of investors
          </p>
        </div>
        <div class="item item-3">
          <span></span>
          <p>
            Number of successfully
            connected items
          </p>
        </div>
      </article>
      <header>Platinnum exclusive rights</header>
      <article>
        <div class="item item-1">
          <span></span>
          <p>
            Recommended number
            of intermediaries
          </p>
        </div>
        <div class="item item-2">
          <span></span>
          <p>
            Recommended number
            of investors
          </p>
        </div>
        <div class="item item-3">
          <span></span>
          <p>
            Number of successfully
            connected items
          </p>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {};
  },
  created() {},
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
  .vipGrade{
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
        overflow: hidden;
        border: vw(6) solid #4f3dad;
        border-radius: vw(22);
        margin-bottom: vw(34);
        p {
          background: #00f0ab;
          height: 100%;
          width: vw(100);
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
        span {
          display: inline-block;
          width: vw(88);
          height: vw(88);
          font-size: vw(24);
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
    margin-bottom: vw(36);
    padding-top: vw(140);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #4f3dad;

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
    p:nth-of-type(1) {
      font-size: vw(40);
      margin-top: vw(18);
      height: vw(44);
      line-height: vw(44);
      font-weight: bold;
    }
    p:nth-of-type(2),
    p:nth-of-type(3) {
      color: #4f3dad;
      font-size: vw(24);
      margin-top: vw(16);
      height: vw(28);
      line-height: vw(28);
    }
  }
}
</style>
