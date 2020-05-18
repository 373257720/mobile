<template>
      <router-view :contract='contract' v-on:todad="fromkids" ></router-view>
</template>
<script>
  export default {
    name:'agent_set_contract',
    data(){
      return{
        watch:false,
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
        // this.get_contract()
      },
      get_contract(){
        this.$loading();
        this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getSignAgreement`,{
          signId:this.$route.query.signId,X_Token:this.$store.state.X_Token,
        })
          .then(res => {
          this.$toast.clear();
          if(res.data.resultCode==10000){
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
