<template>
  <div id="a_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签署合约
    </nav>
    <main>
      <article>
        <div class="contract">
          <div class="top"></div>
          <div class="middle" v-html="content"></div>
          <div class="button">
            <p v-if="signature">
              <i>
                <img :src="signature" alt />
              </i>
              <span>投行</span>
              <span>{{owner_signdate?owner_signdate:''}}</span>
            </p>
            <p>
              <i></i>
              <span>中间人</span>
              <span></span>
            </p>
          </div>
        </div>
        <footer>
          <button @click="$routerto('a_sign_contract',$route.query)">签署</button>
          <!-- <button @click="signname"></button> -->
        </footer>
      </article>
    </main>

    <mbottom></mbottom>
  </div>
</template>
<script>
import { dirname } from 'path';
export default {
  name: "goods_details",
  data() {
    return {
      signature: "",
      content: "",
      // owner_signdate:'',
    };
  },
  created() {
    console.log(this.$route);
    let str = this.$store.state.contract;
    console.log(str);
    this.content = str.article;
    this.signature = str.owner;
  },
  computed: {
     owner_signdate: function() {
      if (this.$store.state.contract.owner_signdate) {
       let timestamp = this.$store.state.contract.owner_signdate;          return     this.$global.stamptodate(timestamp);
      }   
    },
  },
  mounted() {
    
    // this.content = "";
  },
  methods: {

  }
};
</script>
<style lang="scss">
#a_check_contract {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-hairline--top-bottom::after {
    border: 0.02rem solid #8e8e8e;
  }
  .van-field {
    background: #f2f2f2;
  }
}
</style>
<style lang="scss" scoped>
#a_check_contract {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    z-index: 5;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: #ffffff;
    .contract {
      // background: #f2f2f2;
      border: 1px solid #b5b5b5;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.4rem 0.4rem;
      width: 100%;
      height: 13rem;
      overflow-y: auto;
      word-wrap: break-word;
      color: rgb(169, 169, 169);
      div.button {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          align-items: center;
          i {
            width: 3rem;
            height: 1rem;
            border-bottom: 1px solid rgb(169, 169, 169);
            img {
              width: 3rem;
              height: 1rem;
            }
          }
        }
      }
    }
    footer {
      width: 100%;
      font-size: 0.38rem;
      button {
        width: 100%;
        margin-top: 1rem;
        background: #00adef;
        color: white;
        height: 1rem;
      }
    }
  }
}
</style>
