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
    line-height: 1.6rem;
    height: 1.6rem;
    position: fixed;
    top: 0;
    font-weight: 500;
    font-size: 0.5rem;
    background: white;
    border-bottom: 1px dashed #b5b5b5;
  }
}
</style>
