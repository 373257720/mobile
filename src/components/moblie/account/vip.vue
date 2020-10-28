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
      <p @click="$routerto('vip')">Peter parker</p>
      <p>Points: 8320</p>
      <!-- <p>Membership is valid until December 12, 2020</p> -->
      <van-button @click="$routerto('vipGrade')" class="renewal">VIP&nbsp;renewal</van-button>
    </main>
    <nav>
      <header>My achievements</header>
      <article>
        <div class="item item-1">
          <span>10</span>
          <p>
            Recommended number
            of intermediaries
          </p>
        </div>
        <div class="item item-2">
          <span>10</span>
          <p>
            Recommended number
            of investors
          </p>
        </div>
        <div class="item item-3">
          <span>10</span>
          <p>
            Number of successfully
            connected items
          </p>
        </div>
        <div class="item item-4">
          <span>10</span>
          <p>
            Amount of
            completed project
          </p>
        </div>
      </article>
      <p>Membership is valid until December 12, 2020</p>
      <p>Membership is valid until December 12, 2020</p>
      <footer>
        <button @click="$routerto('vipRules')">Specific check points rules</button>
        <button @click="$routerto('pointsHistory')">Points history</button>
      </footer>

      <!-- <footer>
        <ul>
          <li>
            <div></div>
            <p>More recommended items</p>
          </li>
          <li>
            <div></div>
            <p>More recommended items</p>
          </li>
          <li>
            <div></div>
            <p>More recommended items</p>
          </li>
        </ul>
      </footer>-->
    </nav>
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

<style lang="scss" scoped>
#vip {
  nav {
    // width: 332px;
    // margin-top: vw(36);
    padding: 0 vw(60);
    color: #4f3dad;
    header {
      height: vw(44);
      font-size: vw(40);
      font-weight: bold;
      line-height: vw(44);
      margin-bottom: vw(52);
    }
    article {
      // height: vw(400);
      // background: #00f0ab;
      margin-bottom: vw(52);
      display: grid;
      grid-row: 2;
      grid-column: 2;
      gap: vw(40) vw(60);
      // justify-items: center;
      grid-template-columns: repeat(2, auto);
      // grid-template-rows: repeat(auto);
      grid-auto-flow: row;
      .item {
        font-weight: bold;
        text-align: center;
        span {
          display: inline-block;
          width: vw(108);
          height: vw(108);
          font-size: vw(24);
          color: #fff;
          background: #4f3dad;
          border-radius: 50%;
          line-height: vw(108);
          margin-bottom: vw(16);
        }
        p {
          font-size: vw(20);
          line-height: vw(24);
        }
      }
    }
    > p {
      font-size: vw(24);
      font-weight: 400;
      line-height: vw(28);
      color: #4f3dad;
    }
    >p:nth-of-type(1){
      margin-bottom: vw(16);
    }
    footer{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    button {
      width: vw(338);
      height: vw(80);
      background: #00f0ab;
      opacity: 1;
      border-radius: vw(8);
      font-size: vw(24);
      // line-height: vw(80);
      color: #faf9f9;
      margin-top: vw(36);
    }
    .van-button--normal {
    }
  }
  .renewal {
    width: vw(168);
    margin-top: vw(14);
    height: vw(44);
    background: #00f0ab;
    border-radius: vw(8);
    border: none;
    .van-button__text {
      // width:vw(128);
      // height: vw(28);
      font-size: vw(24);
      line-height: vw(44);
      color: #faf9f9;
      opacity: 1;
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
