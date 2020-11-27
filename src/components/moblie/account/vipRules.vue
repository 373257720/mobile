<template>
  <div id="vipRules">
    <commonnav>
      Vip
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <header>Points rules</header>
      <article>
        <ul>
          <li v-for="item in result" :key="item.integralType">
            <p>{{str[item.integralType]}}</p>
            <p>{{item.integral}}points</p>
          </li>
          <!-- <li>
            <p>Recommend an investor successfully</p>
            <p>10 points</p>
          </li>-->
        </ul>
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "vipRules",
  data() {
    return {
      str: {
        "0": "Recommend an intermediary to succeed",
        "1": "Recommend an investor successfully"
      },
      result: []
    };
  },
  created() {
    this.getMemberInfo();
  },
  methods: {
    getMemberInfo() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/member/getBslCustomIntegralList`
        )
        .then(res => {
          // console.log(res);
          this.result = res.data.data.lists;
          console.log(this.result);
        });
    }
    // handleleterClick() {},
  }
};
</script>

<style lang="scss" scoped>
#vipRules {
  padding-top: vw(96);
  main {
    margin-top: vw(76);
    color: #4f3dad;
    padding: 0 vw(60);
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
      //  width: 228px;
      height: vw(44);
      font-size: vw(40);
      font-weight: bold;
      line-height: vw(44);
      margin-bottom: vw(128);
    }
    article {
      ul {
        li {
          display: flex;
          margin-bottom: vw(80);
          p {
            font-size: vw(24);
          }
          p:nth-of-type(1) {
            width: vw(480);
          }
          p:nth-of-type(2) {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
