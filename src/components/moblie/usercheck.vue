<template>
  <div id="usercheck">
    <header>审核</header>
    <div class="nationality">
      <p>国籍</p>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </div>
    <div class="idcard_num">
      <p>身份证号码</p>
      <van-field v-model="idnum" placeholder="请输入密码" clearable/>
    </div>
    <div class="companyname">
      <p>公司名字</p>
      <van-field v-model="companyname" placeholder="公司名字" clearable/>
    </div>
    <div class="companyname2">
      <p>公司名字</p>
      <van-field v-model="companyname" placeholder="请输入密码" clearable />
    </div>
    <div class="id_front">
      <p>身份证正面</p>
      <van-uploader v-model="fileList_front" multiple :max-count="1" />
    </div>
    <div class="id_back">
      <p>身份证背面</p>
     <van-uploader v-model="fileList_back" multiple :max-count="1" />
    </div>
    <div class="companycheck">
      <p>公司证书</p>
     <van-uploader v-model="fileList_comcheck" multiple :max-count="1" />
    </div>
    <div class="commit">
      <button @click="$goto('login')">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "usercheck",
  data() {
    return {
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],

      // success: true,
      idnum: "",
      companyname: "",
      fileList_front: [],
      fileList_back: [],
      fileList_comcheck: [],
    };
  },
  computed: {
    success: function() {
      if (this.value != 0 && this.value != 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }

      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== "image/jpeg") {
          Toast("请上传 jpg 格式图片");
          reject();
        } else {
          resolve();
        }
      });
    }
  }
};
</script>
<style lang="scss">
#usercheck {
  .van-cell{
      font-size: 0.16rem;
      padding: 0 0.3125rem  0 0.46875rem;
      // line-height:  0.16rem;
      // padding: 0;
  }
  .van-dropdown-menu__title{
    font-size: 0.16rem;
    // text-align: left; 
  }
  .van-dropdown-menu {
    height: 0.7rem;
    border: 0.01rem solid #ABABAB;
    background: #f6f6f6;
  }
  .van-field__body {
    //  width: 100%;
    height: 0.7rem;
    border: 0.01rem solid #ababab;
    background: #f6f6f6;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  .van-field {
    padding: 0;
  }
  .van-uploader__preview{
      margin:0;

  }
  .van-uploader__preview-image{
    margin:0;
    width: 100%;

  }
  .van-uploader{
    width: 100%;
    height: 2.7rem; 
  }
  
  .van-uploader__upload{
    width: 100%;
    background: #F6F6F6;
    margin:0;
    border: 0;
    border: 0.01rem solid #ABABAB;
    box-sizing: border-box;
  }
}
</style>

<style lang="scss" scoped>
#usercheck {
  height: 100%;
  width: 80%;
  margin: 0 auto;
  > div {
    margin-bottom: 0.5rem;
    >p{
       margin-bottom: 0.1rem;
    }
  }
  header {
    text-align: center;
    font-size: 16px;
    padding: 0.8rem 0 0.8rem 0;
    box-sizing: border-box;
  }
  .commit button{
    width: 100%;
    color:white;
    height: 1rem;
    background: #00ADEF;
  }

}
</style>