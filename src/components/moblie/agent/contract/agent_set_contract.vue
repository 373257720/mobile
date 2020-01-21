<template>
  <div>
    <router-view v-if="watch" :signStatu="signStatu" :contract='contract' v-on:todad="fromkids" ></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        watch:false,
        signStatu:'',
        contract: {
          article:'',
          owner_sign:'',
          owner_behalf:'',
          owner_name:'',
          owner_title:'',
          owner_signdate:'',
          agent_sign:'',
          agent_behalf:'',
          agent_name:'',
          agent_title:'',
          agent_signdate:'',
        },
      }
    },
    created() {
      this.get_contract();
    },
    methods:{
      fromkids(){
        this.get_contract()
      },
      get_contract(){
        this.$loading();
        this.$axios({
          method: "get",
          url: `${this.$baseurl}/bsl_web/projectSign/getSignAgreement?signId=${this.$route.query.signId}`
        }).then(res => {
          this.$toast.clear();
          if(res.data.resultCode==10000){
            this.signStatu=res.data.data.signStatus;
            let str = JSON.parse(res.data.data.signAgreement);
            for(let i in this.contract){
              if(str.hasOwnProperty(i)){
                this.contract[i]=str[i];
              }
            }
            this.watch=true
          }
        });
      }
    }
  }
</script>

<style>

</style>
