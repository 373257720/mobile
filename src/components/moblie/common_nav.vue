<template>
  <div class="common_nav">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />{{msg}}
    </nav>
  </div>
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
.common_nav {
  nav {
 width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-size: 0.38rem;
    background: white;
    border-bottom: 0.02rem dashed #b5b5b5;
  }
}
</style>