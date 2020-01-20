<template>
  <div id="p_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />查看合约
    </nav>
    <main>
      <article>
        <contract_component :contract="contract"></contract_component>
      </article>
    </main>

    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      contract: {
        article:'',
        owner_sign:'',
        owner_behalf:'',
        owner_name:'',
        owner_title:'',
        owner_signdate:null,
        agent_behalf:'',
        agent_sign:'',
        agent_name:'',
        agent_title:'',
        agent_signdate:null,
      },
    };
  },
  created() {
    this.get_contract();
  },

  mounted() {
    // this.content = "";
  },
  methods: {

  get_contract(){
    this.$loading();
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/projectSign/getSignAgreement?signId=${this.$route.query.signId}`
    }).then(res => {
      this.$toast.clear();
      if(res.data.resultCode==10000){
        let str = JSON.parse(res.data.data.signAgreement);
          for(let i in this.contract){
            if(str.hasOwnProperty(i)){
              this.contract[i]=str[i];
            }
          }
      }
    });
  }
  }
};
</script>
<style lang="scss">
#p_check_contract {
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
  /*.van-field {*/
  /*  background: #f2f2f2;*/
  /*}*/
}
</style>
<style lang="scss" scoped>
#p_check_contract {
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
    padding: 0.5rem;
    // height:100%;
    background: #ffffff;
    .contract {
      // background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      border: 1px solid rgb(169, 169, 169);
      padding: 0.4rem 0.4rem;
      width: 100%;
      height: 15rem;
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
              // border-bottom: 1px solid rgb(169, 169, 169);
            }
          }
        }
      }
    }
    footer {
      width: 100%;
      button {
        width: 100%;
        margin-top: 1rem;
        background: #00adef;
        color: white;
        height: 0.8rem;
      }
    }
  }
}
</style>
