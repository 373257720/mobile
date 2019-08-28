<template>
  <div id="userpass">
    <header>
      <van-icon name="arrow-left" @click="$global.previous()" />个人审核
    </header>
    <main>
      <ul>
        <li>
          <p>类型:</p>
          <div>中间</div>
        </li>
        <li>
          <p>国籍:</p>
          <div>香港</div>
        </li>
        <li>
          <p>身份证号:</p>
          <p></p>
          <div>54564564564564</div>
        </li>
        <li>
          <p>公司名称:</p>
          <div>打算付费第三方第三方</div>
        </li>
        <li>
          <p>公司地址:</p>
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
        <li class="idcard_right">
          <p>公司营业执照</p>
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
  name: "userpass",
  data() {
    return {
      success: false
    };
  }
};
</script>
<style lang="scss">
#userpass {
  header {
    position: relative;
    .van-icon-arrow-left {
      // line-height: 1rem;
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
</style>
<style lang='scss' scoped>
#userpass {
  width: 100%;
  header {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    font-size: 0.46rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    background: white;
    border-bottom: 0.08rem solid #d9d9d9;
  }
  main {
    background: white;
    padding: 1.5rem 0 1rem 0;
    ul {
      padding: 0.5rem 0.5rem;
      li {
        margin-bottom: 0.5rem;
        p {
          margin-bottom: 0.1rem;
          font-size: 0.25rem;
        }
        div {
          background: #f6f6f6;
          height: 0.7rem;
          line-height: 0.7rem;
          font-size: 0.2rem;
          border: 0.01rem solid #d9d9d9;
          padding: 0 0.2rem;
        }
        div.pic {
          height: 3rem;
        }
      }
    }
  }
}
</style>

