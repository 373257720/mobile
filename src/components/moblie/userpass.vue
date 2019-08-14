<template>
  <div id="userpass">
    <header>个人审核</header>
    <main>
      <ul>
        <li>
          <p>国籍:</p>
          <div>香港</div>
        </li>
        <li>
          <p>身份证号:<p>
          <div>54564564564564</div>
        </li>
        <li>
          <p>公司名称:</p>
          <div>打算付费第三方第三方</div>
        </li>
        <li class="idcard_left">
          <p>身份证正面</p>
          <div class="pic"></div>
        </li>
        <li class="idcard_right">
          <p>身份证反面</p>
          <div class="pic"></div>
        </li>
        <li class="idcard idcard2" v-if="success">
          <p>passport</p>
          <div class="pic"></div>
        </li>
      </ul>
    </main>
    <mbottom></mbottom>
    <!-- <section>
      <p>公司证书</p>
      <div class="com_pic"></div>
    </section>-->
  </div>
</template>
<script>
export default {
  name: "userpass"
};
</script>
<style lang='scss' scoped>
#userpass {
  width: 100%;
  header {
    width: 100%;
    text-align: center;
    line-height: 1rem;
    height: 1rem;
    position: fixed;
    top: 0;
    background: white;
     border-bottom: 0.01rem dashed #D9D9D9;
  }
  main{
    padding: 1.2rem 0 0 0 ;
    ul{
         padding: 0 0.5rem ;
        li{
          margin-bottom:0.5rem;
          p{
            margin-bottom:0.1rem;
             font-size: 0.25rem;
          }
          div{
              background: #F6F6F6;
              height: 0.7rem;
              line-height: 0.7rem;
              font-size: 0.2rem;
              border: 0.01rem solid #D9D9D9;
              padding: 0 0.2rem;
          }
          .pic{
            height: 2.5rem;

          }
          

        }
    }
  }
}
</style>

