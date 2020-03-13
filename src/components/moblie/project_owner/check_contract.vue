<template>
  <div id="p_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />
      {{$t('agent.CheckContract')}}
    </nav>
    <main>
      <article>
        <contractcomponent v-if="watch" :contract="contract"></contractcomponent>
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
      watch:false,
      contract: {
        article:'',
        owner_sign:'',
        owner_behalf:'',
        owner_name:'',
        owner_title:'',
        owner_signdate:'',
        agent_behalf:'',
        agent_sign:'',
        agent_name:'',
        agent_title:'',
        agent_signdate:'',
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
        console.log(str)
          for(let i in this.contract){
            if(str.hasOwnProperty(i)){
              this.contract[i]=str[i];
            }
          }
        this.watch=true;
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
  height:100%;
  padding: 1.5rem 0 1.3rem 0;
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
    padding: 0.6rem 0.5rem;
    height: 100%;
    width: 100%;
    background: #ffffff;
    article{
      height: 100%;
      display: flex;
      flex-direction: column;
    justify-content: space-between;
      width: 100%;
        >div{
          //  height: 85%;
        }
      }
  }
}
</style>
