<template>
  <div id="vip">
    <commonnav>personal Review</commonnav>
  
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
  padding-top: vw(96);
  nav {
    // width: 332px;
    margin-top: vw(36);
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
      height: vw(400);
      background: #00f0ab;
      margin-bottom: vw(74);
    }
    p {
      // width: 298px;
      height: vw(28);
      font-size: vw(24);
      margin-bottom: vw(16);
      line-height: vw(28);
    }
    footer {
      margin-top: vw(200);
      ul {
        display: flex;
        justify-content: space-evenly;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          div {
            width: vw(88);
            height: vw(88);
            background: #00f0ab;
          }
          p {
            // width: vw(132);
            height: vw(18);
            font-size: vw(18);
            line-height: vw(18);
            color: #4f3dad;
          }
        }
      }
    }
  }
  main {
    margin-top: vw(28);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #4f3dad;
    .renewal {
      width: vw(168);
      margin-top: vw(14);
      height: vw(44);
      background: #00f0ab;
      border-radius: vw(8);
      .van-button__text {
        // width:vw(128);
        height: vw(28);
        font-size: vw(24);
        line-height: vw(28);
        color: #faf9f9;
        opacity: 1;
      }
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
