<template>
  <div id="usercheck">
    <div class="usercheck">
      <header>审核</header>
      <div class="usertype">
        <p>类型</p>
        <van-dropdown-menu>
          <van-dropdown-item v-model="form.userType" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div class="identity">
        <p>身份</p>
        <van-dropdown-menu>
          <van-dropdown-item v-model="form.identity" :options="option2" />
        </van-dropdown-menu>
      </div>
      <div class="nationality">
        <p>国籍</p>
        <van-dropdown-menu>
          <van-dropdown-item v-model="countryname" @change="nation" :options="countrylist" />
        </van-dropdown-menu>
      </div>
      <div class="idcard_num">
        <p>身份证号码</p>
        <van-field v-model="form.userIdentity" placeholder="请输入密码" clearable />
      </div>
      <div class="id_front">
        <p>{{switchon==true?'身份证正面':'护照'}}</p>
        <van-uploader
          :before-read="function(params){return asyncBeforeRead(params,1)}"
          v-model="fileList_front"
          multiple
          :max-count="1"
        />
      </div>
      <div class="id_back" v-show="switchon">
        <p>身份证背面</p>
        <van-uploader
          :before-read="function(params){return asyncBeforeRead(params,2)}"
          v-model="fileList_back"
          multiple
          :max-count="1"
        />
      </div>
      <div v-show="form.identity==4?true:false" class="gongsi">
        <div class="companyname2">
          <p>公司名字</p>
          <van-field v-model="form.userCompanyCh" placeholder="请输入密码" clearable />
        </div>
        <div class="companyname">
          <p>company name</p>
          <van-field v-model="form.userCompanyEn" placeholder="公司名字" clearable />
        </div>
        <div class="company_address">
          <p>公司地址</p>
          <van-field v-model="form.userAddressCh" placeholder="公司地址" clearable />
        </div>
        <div class="company_address_eng">
          <p>company address</p>
          <van-field v-model="form.userAddressEn" placeholder="公司地址" clearable />
        </div>
        <div class="companycheck">
          <p>公司证书</p>
          <van-uploader
            :before-read="function(params){return asyncBeforeRead(params,3)}"
            v-model="fileList_company"
            multiple
            :max-count="1"
          />
        </div>
      </div>

      <div class="commit">
        <button @click="commit">提交</button>
      </div>
    </div>
    <!-- <div class="usercheck2" >
      <h2>
        <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>你的资料已提交</section>
      <nav class="backbtn">
        <button>进入首页</button>
      </nav>
    </div> -->
  </div>
</template>
<script>
import { resolve } from "url";
export default {
  name: "usercheck",
  data() {
    return {
      success: true,
      switchon: true,
      countrylist: [],
      option1: [
        { text: "项目方", value: 1 },
        { text: "中间人", value: 4 },
        { text: "投资者", value: 3 }
      ],
      option2: [{ text: "个人", value: 1 }, { text: "公司", value: 4 }],
      countryname: "",
      fileList_front: [],
      fileList_back: [],
      fileList_company: [],
      form: {
        userCountry: "",
        userCountryEn: "",
        userCountryCh: "",
        userIdentity: "",
        identityType: "",
        identityPicOne: [],
        identityPicTwo: [],
        userCompanyCh: "",
        userCompanyEn: "",
        userAddressCh: "",
        userAddressEn: "",
        userCompanyPic: [],
        userType: "",
        identity: ""
      }
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/base/countryList.do`
    })
      .then(res => {
        this.countrylist = res.data.data;
        for (let i = 0; i < this.countrylist.length; i++) {
          this.countrylist[i].value = i;
          this.countrylist[i].text = this.countrylist[i].countryTcname;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    // success: function() {
    //   if (this.value != 0 && this.value != 1) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  },
  methods: {
    // 返回布尔值
    // beforeRead(file) {
    //   if (file.type !== "image/jpeg") {
    //     Toast("请上传 jpg 格式图片");
    //     return false;
    //   }

    //   return true;
    // },
    nation(value) {
      console.log(value);
      if (value == 1) {
        this.switchon = true;
        this.form.identityType = 1;
      } else {
        this.switchon = false;
        this.form.identityType = 2;
      }
      // if (value > 2) {
      //   this.switchon = false;
      //   this.form.identityType = 2;
      //   // console.log(this.switch);
      // } else if (value >= 0 && value <= 2) {
      //   this.switchon = true;
      //   this.form.identityType = 1;
      // }
      this.form.userCountry = this.countrylist[value].countryCode;
      console.log(this.form.userCountry);

      this.form.userCountryEn = this.countrylist[value].countryEnname;
      this.form.userCountryCh = this.countrylist[value].countryZhname;
      // console.log(this.switchon);
    },
    // 返回 Promise
    asyncBeforeRead(file, index) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      let formData = new FormData();
      formData.append("file", file);
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/upload/pic.do`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        var imgurl = res.data.data.url;
        if (index == 1) {
          this.form.identityPicOne = imgurl;
        } else if (index == 2) {
          this.form.identityPicTwo = imgurl;
        } else if (index == 3) {
          this.form.userCompanyPic = imgurl;
        }
      });
      return true;
    },
    commit() {
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/user/submitAuth`,
        data: this.form,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.resultCode == 10000) {
            this.success1 = !this.success1;
            // var aa = setInterval(() => {
            //   --this.timeout;
            // }, 1000);
            // setTimeout(() => {
            //   clearInterval(aa);
            //   this.$goto("login");
            // }, 4000);
          }
        })
        .catch(err => {
          console.log(err);
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
    width: 100%;
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
    // border: 0.02rem solid #ababab;
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
    top: 50%;
    right: 0.5rem;
    transform: rotate(0);
    border-color: currentColor transparent transparent transparent;
  }
  .van-hairline--top-bottom::after {
    border: 0;
  }
  .van-dropdown-menu__title--down::after {
    border: 0.1rem solid;
    top: 50%;
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
    div.gongsi {
      > div {
        margin-bottom: 0.4rem;
        > p {
          margin-bottom: 0.1rem;
          font-size: 0.28rem;
        }
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
      margin-bottom: 0.6rem;
      height: 0.8rem;
      background: #00adef;
    }
  }
}
</style>