<template>
  <!-- <div> -->
		<!-- <keep-alive> -->
			  <router-view :contract='contract' v-on:todad="fromkids" ></router-view>
		<!-- </keep-alive> -->
  
  <!-- </div> -->
</template>

<script>
  export default {
    provide(){
      return {
        //将当前的app.vue的实例分享出去
        'app':this
      }
    },
      data(){
        return{
          contract: {
            // signId:'',
            article:'',
            owner_sign:'',
            owner_behalf:'',
            owner_name:'',
            owner_title:'',
            owner_signdate:'',
            // agent_name:'',
            // agent_title:'',
            // agent_signdate:null,
          },
        }
      },
 created() {

 },
    methods:{
      fromkids(){
        // this.cont1ract=object.assign(this.contract,a)
      //   console.log(123)
      // this.$router.replace({
      //       name: "mysign",
      //     })
        // this.contract.content=a;
        // console.log(this.contract.content)
        // if(a){
        //   this.MachineInfo=Object.assign(this.MachineInfo,a)
        // }
        // if(b){
        //   this.activeName=b;
        // }
        // console.log(this.MachineInfo);

      },
    }
  }
</script>

<style>

</style>
