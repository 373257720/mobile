<template>
  <div id="mysign">
    <nav>我的簽約項目</nav>
    <ul>
      <li v-for='item in arr' :key=item >
        <p>项目名称:的馮紹峰地方wsdfsdfdser水電費</p>
        <!-- <section>計劃時間:1980554456</section> -->
      </li>
    </ul>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "mysign",
  data(){
    return{
      arr:[1,2,3,5,9,8,10,90,40]
    }
  }
};
</script>
<style lang="scss" scoped>
#mysign {
  width: 100%;
  // height: 875;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1rem;
    height: 1rem;
    position: fixed;
    top:0;
    background: white;
    border-bottom:0.01rem dashed #B5B5B5;
  }
  ul{
    padding:1rem  0 0 0 ;
    background: white;
    li{
      text-align: center;
      word-break:break-all;
      margin:0.36rem 0.5rem 0.36rem 0.5rem;
      padding: 0 0.3rem;
      border:1PX solid  #B5B5B5;
      font-size: 0.3rem;
      line-height: 0.5rem;
    }
  }
}
</style>

