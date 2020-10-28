<template>
  <div id="AccountMessage">
    <commonnav>
      Points History
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <div>
        <p>points</p>
        <h3>8320</h3>
      </div>
      <article>
        <p>Recent points history</p>
        <ul>
          <li>
            <p>22/07/2020</p>
            <div>
              <span>You earned 60 points</span>
              <span>+60</span>
            </div>
          </li>
            <li>
            <p>22/07/2020</p>
            <div>
              <span>You earned 60 points</span>
              <span>+60</span>
            </div>
          </li>
            <li>
            <p>22/07/2020</p>
            <div>
              <span>You earned 60 points</span>
              <span>+60</span>
            </div>
          </li>
            <li>
            <p>22/07/2020</p>
            <div>
              <span>You earned 60 points</span>
              <span>+60</span>
            </div>
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>
<script>
import loadmore from "../loadmore";
export default {
  name: "AccountMessage",
  data() {
    return { num: 10, refreshing: false, loading: false, text: "List" };
  },
  created() {},
  // components: {
  //   loadmore
  // },
  methods: {
    // handleleterClick() {},
    refresh() {
      //   console.log(123);
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.text = this.text === "List" ? "Menu" : "List";
        this.num = 10;
      }, 2000);
    },
    load() {
      console.log(123);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
        console.log(this.num);
      }, 2000);
    }
  }
};
</script>
<style lang="scss">
#AccountMessage {
}
</style>
<style lang="scss" scoped>
#AccountMessage {
  // padding-top: vw(96);
  main {
    padding: vw(140) 0 vw(116);
    > div {
      display: flex;
      font-weight: bold;
      flex-direction: column;
      align-items: center;
      font-size: vw(40);
      margin-bottom: vw(130);
      color: #4f3dad;
      h3 {
        font-size: vw(60);
        font-weight: bold;
        margin-top: vw(24);
        color: #4f3dad;
      }
    }
    article {
      color: #4f3dad;
      > p {
        font-size: vw(40);
        font-weight: bold;
        opacity: 1;
        padding-left: vw(36);
        margin-bottom: vw(44);
      }
      li {
        padding: 0 vw(46);

        border-bottom: vw(2) solid #4f3dad;
        p {
          font-size: vw(20);
          text-align: end;
        }
        div {
          display: flex;
          justify-content: space-between;
          margin: vw(56) 0 vw(46);
          align-items: center;
          span:nth-of-type(1) {
            font-size: vw(26);
            font-weight: bold;
            line-height: 30px;
          }
          span:nth-of-type(2) {
            font-size: vw(60);
            font-weight: bold;
            line-height: vw(68);
          }
        }
      }
    }
  }
}
</style>
