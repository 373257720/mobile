<template>
  <div id="a_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />{{$t("agent.SignTheContract")}}
    </nav>
    <main>
      <article>
        <div class="sub_title">
          <header>For and on behalf of:</header>
          <div >
            <van-field
              v-model="contract.agent_behalf"
              autosize
              maxlength="60"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              show-word-limit
            />
            <!-- <input maxlength="50" v-model="contract.agent_behalf"  placeholder="请输入"/> -->
          </div>
        </div>
        <div class="sub_title">
          <header>Name:</header>
          <div >
             <van-field
              v-model="contract.agent_name"
              autosize
              maxlength="30"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              show-word-limit
            />
            <!-- <input maxlength="30" v-model="contract.agent_name"  placeholder="请输入"/> -->
          </div>
        </div>
        <div class="sub_title">
          <header>Title:</header>
          <div>
               <van-field
              v-model="contract.agent_title"
              autosize
              maxlength="30"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              show-word-limit
            />
            <!-- <input maxlength="30" v-model="contract.agent_title"  placeholder="请输入"/> -->
          </div>
        </div>
        <div class="sub_title">
          <header>Contract:</header>
          <div class="dad_contract">
                  <contractcomponent :contract="contract"></contractcomponent>
          </div>
        </div>

        <footer>
          <button @click="confirm">{{$t("agent.Sign")}}</button>
        </footer>
      </article>
    </main>
<!--    <mbottom></mbottom>-->
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
    console.log(this.contract);

  },
  mounted() {
  },
  methods: {
      confirm(){
          if(this.contract.agent_behalf==''){
            this.$toast(this.$t('ContractWrods.PleaseEnterRepresentativeRights'))
            return
          }else if(this.contract.agent_name==''){
            this.$toast(this.$t('ContractWrods.PleaseEnterName'))
            return;
          }else if(this.contract.agent_title==''){
            this.$toast(this.$t('ContractWrods.PleaseEnterTheTitle'))
            return;
          }
          // this.$emit("update:contract")
          this.$routerto('a_sign_contract',this.$route.query)
      }
  }
};
</script>
<style lang="scss">
#a_check_contract {
  .van-field__control{
    box-sizing: border-box;
    font-size: 0.38rem;
    line-height: 1rem;
        background: #f6f6f6;
        // color: rgba(0, 0, 0, 0.65);
    padding:0.1rem 0.2rem;
    height: 1rem;
    width: 100%;
    border: 1px solid #a9a9a9;
  }
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-cell{
    padding: 0;
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
  height: 100%;

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
    /*margin-top: 1.5rem;*/
    /*margin-bottom: 1.5rem;*/
    padding: 1.5rem 0;
    background: #ffffff;
    article{
      padding: 0.5rem;
    }
    .sub_title{
      // margin-bottom:0.5rem;
      header{
        font-size: 0.42rem;
        font-weight: 600;
      }
      input{
        box-sizing: border-box;
        font-size: 0.38rem;
        line-height: 1rem;
        padding: 0.2rem;
        height: 1rem;
        width: 100%;
        /*height: 13rem;*/
        border: 1px solid rgb(169, 169, 169);
      }
    }
    div.dad_contract{
        height: 15rem;
    }
    footer {
      width: 100%;
      /*padding-bottom: 1rem;*/
      display: flex;
      justify-content: center;
      font-size: 0.42rem;
      button {
        margin-top: 1rem;
        line-height: 1rem;
        background: #00adef;
        color: white;
        height: 1rem;
        width: 8rem;
        border-radius:5px;
      }
    }
  }
}
</style>
