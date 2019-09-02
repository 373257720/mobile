<template>
  <div id="usercheck">
    <div class="usercheck">
      <header>审核</header>
      <div class="usertype">
        <p>类型</p>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div class="nationality">
        <p>国籍</p>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div class="idcard_num">
        <p>身份证号码</p>
        <van-field v-model="idnum" placeholder="请输入密码" clearable />
      </div>
      <div class="id_front">
        <p>身份证正面</p>
        <van-uploader v-model="fileList_front" multiple :max-count="1" />
      </div>
      <div class="id_back">
        <p>身份证背面</p>
        <van-uploader v-model="fileList_back" multiple :max-count="1" />
      </div>
      <div class="companyname2">
        <p>公司名字</p>
        <van-field v-model="companyname" placeholder="请输入密码" clearable />
      </div>
      <div class="companyname">
        <p>company name</p>
        <van-field v-model="companyname" placeholder="公司名字" clearable />
      </div>
      <div class="company_address">
        <p>公司地址</p>
        <van-field v-model="companyname" placeholder="公司地址" clearable />
      </div>
      <div class="company_address_eng">
        <p>company address</p>
        <van-field v-model="companyname" placeholder="公司地址" clearable />
      </div>
      <!-- <div class="id_back">
        <p>护照</p>
        <van-uploader v-model="fileList_back" multiple :max-count="1" />
      </div>-->
      <div class="companycheck">
        <p>公司证书</p>
        <van-uploader v-model="fileList_comcheck" multiple :max-count="1" />
      </div>
      <div class="commit">
        <button @click="$goto('login')">提交</button>
      </div>
    </div>
    <!-- <div class="usercheck2">
      <h2>
        <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>你的资料已提交</section>
      <nav class="backbtn">
        <button>进入首页</button>
      </nav>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "usercheck",
  data() {
    return {
      value1: 0,
      success: true,
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
      fileList_comcheck: []
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
  // background: white;
  .van-cell {
    font-size: 0.16rem;
    padding: 0 1.05rem;
    // line-height:  0.16rem;
    // padding: 0;
  }
  .van-dropdown-menu__title {
    font-size: 0.16rem;

    // text-align: left;
  }
  .van-dropdown-menu__item {
    // display:inline;
    justify-content: left;
    width: 100%;
    flex: none;
  }
  .van-dropdown-menu {
    height: 0.7rem;
    border-radius: 0.05rem;
    border: 0.01rem solid #ababab;
    background: #f6f6f6;
  }
  .van-field__body {
    //  width: 100%;
    height: 0.75rem;
    border: 0.01rem solid #ababab;
    border-radius: 0.05rem;
    background: #f6f6f6;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  .van-field__control {
    // padding: 0 0.2rem;
    // height: 0.5rem;
  }
  .van-field__clear {
    font-size: 0.3rem;
  }
  .van-field {
    padding: 0;
  }
  .van-uploader__preview {
    margin: 0;

    // overflow: hidden;
  }
  .van-uploader__preview-image {
    margin: 0;
    width: 100%;
    //  border: 0.01rem solid #ababab;
    //  overflow: hidden;

    img {
      //  border-radius: 0.02rem;
      border-radius: 0.1rem;
    }
  }
  .van-uploader {
    width: 100%;
    height: 2.7rem;
  }
  .van-uploader__upload {
    width: 100%;
    background: #f6f6f6;
    margin: 0;
    border: 0;
    border: 0.01rem solid #ababab;
    border-radius: 0.05rem;
    box-sizing: border-box;
    .van-uploader__upload-icon {
      font-size: 0.5rem;
    }
  }
  .van-dropdown-menu__title::after {
    border: 0.1rem solid;
    // top:50%;
    // top: 0.06375rem;
    right: -4.125rem;
    transform: rotate(0);
    // // left:50%;
    border-color: currentColor transparent transparent transparent;
    // transform: translateY(-50%);
  }
  .van-hairline--top-bottom::after {
    border: 0;
    //  border-radius: 0.05rem;
  }
  .van-dropdown-menu__title--down::after {
    // top: 0.06375rem;
    border: 0.1rem solid;
    // top:50%;
    // top: 0.06375rem;
    top: 0;
    transform: rotate(-180deg);
    // // left:50%;
    border-color: currentColor transparent transparent transparent;
  }
}
</style>

<style lang="scss" scoped>
#usercheck {
  height: 100%;
  // width: 80%;
  margin: 0 auto;
  .usercheck2 {
    h2 {
      padding: 2rem 0 2rem 0;
      text-align: center;
      img {
        width: 4.28rem;
        height: 1.57rem;
      }
    }
    section {
      text-align: center;
      font-size: 0.4rem;
      margin-bottom: 1.1rem;
    }
    .backbtn {
      text-align: center;
      // width: 100px;
      button {
        background: #00adef;
        width: 6rem;
        height: 0.8rem;
        color: white;
      }
    }
  }
  .usercheck {
    font-size: 0.35rem;
    > div {
      margin-bottom: 0.4rem;
      padding: 0 0.8rem;
      > p {
        margin-bottom: 0.1rem;
        font-size: 0.28rem;
      }
    }
    header {
      text-align: center;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.45rem 0 0.33rem 0;
      box-sizing: border-box;
    }
    .commit button {
      width: 100%;
      color: white;
      border-radius: 0.05rem;
      margin-bottom:0.6rem;
      height: 0.8rem;
      background: #00adef;
    }
  }
}
</style>