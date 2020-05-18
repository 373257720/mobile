<template>
    <nav class="common_nav">
      <van-icon name="arrow-left" @click="$global.previous()" />{{msg}}
    </nav>
</template>
<script >
export default {
name:'common_nav',
    props:{
        msg:String,
    }
}
</script>
<style lang="scss">
 nav.common_nav {
      width: 100%;
	   position: relative;
      height: 100%;
      text-align: center;
      line-height: 1.5rem;
      height: 1.5rem;
      position: fixed;
      top: 0;
      z-index: 5;
      font-size: 0.46rem;
      background: white;
      border-bottom: 0.1rem solid #b5b5b5;
	  .van-icon-arrow-left {
	    position: absolute;
	    left: 0.6rem;
	    top: 50%;
	    transform: (translate(0, -50%));
	  }
    }
</style>
