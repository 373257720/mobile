<template>
  <div id="moblie_bottom">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="records">签约</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "moblie_bottom",
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style lang='scss' >
  #moblie_bottom{
 
      height:1.2rem;
      .van-hairline--top-bottom{
           background: #EEEEEE;
         height:1.2rem;
         .van-tabbar-item__text{
           font-size: 0.1rem;
         }
      }
  }
</style>
