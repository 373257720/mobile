<template>
  <div id="a_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签署合约
    </nav>
    <main>
      <article>
        <div class="sub_title">
          <header>For and on behalf of:</header>
          <div >
            <input maxlength="50" v-model="contract.agent_behalf"  placeholder="请输入"></input>
          </div>
        </div>
        <div class="sub_title">
          <header>Name:</header>
          <div >
            <input maxlength="30" v-model="contract.agent_name"  placeholder="请输入"></input>
          </div>
        </div>
        <div class="sub_title">
          <header>Title:</header>
          <div>
            <input maxlength="30" v-model="contract.agent_title"  placeholder="请输入"></input>
          </div>
        </div>
        <contract_component :contract="contract"></contract_component>
        <footer>
          <button @click="confirm()">签署</button>


        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "a_check_contract",
  props:['contract'],
  data() {
    return {
      // contract: {
      //   article:'',
      //   owner_sign:'',
      //   owner_behalf:'',
      //   owner_name:'',
      //   owner_title:'',
      //   owner_signdate:null,
      //   agent_behalf:'',
      //   agent_name:'',
      //   agent_title:'',
      //   agent_signdate:null,
      // },
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
      confirm(){
          if(this.contract.agent_behalf==''){
            this.$toast('请输入代表权益')
            return
          }else if(this.contract.agent_name==''){
            this.$toast('请输入名称')
            return;
          }else if(this.contract.agent_title==''){
            this.$toast('请输入职称')
            return;
          }
          this.$routerto('a_sign_contract',this.$route.query)
      }
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
    /*background: #f2f2f2;*/
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
    .sub_title{
      margin-bottom:0.5rem;
      header{
        font-size: 0.38rem;
      }
      input{
        box-sizing: border-box;
        font-size: 0.38rem;
        line-height: 1rem;
        padding: 0.2rem;
        /*box-sizing: border-box !important;*/
        height: 1rem;
        width: 100%;
        /*height: 13rem;*/
        border: 1px solid rgb(169, 169, 169);
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
