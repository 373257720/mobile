<template>
  <div>
    <router-view  ></router-view>
  </div>
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
          // contract:{
          //   content:'',
          //   own:'',
          //   own_signtime:''
          // },
        }
      },
    methods:{
      fromchildren(a){
        console.log(a)
        // console.log(this.contract.content)
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
