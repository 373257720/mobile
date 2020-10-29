<template>
  <div id="usercheck">
    <div class="usercheck">
      <commonnav>{{$t("common.Verify")}}</commonnav>
      <main class="main">
        <form ref="form" @submit.prevent="submit_click">
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.Genus')}}</p>
            <p class="select" @click="goto('genus')">
              <span>{{usercheck.genus.text}}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.Identity')}}</p>
            <p class="select" @click="$routerto('identity')">
              <span>{{usercheck.identity.text}}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.Nationality')}}</p>
            <p class="select" @click="$routerto('nationality')">
              <span>{{usercheck.nation.lable}}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label">Company name(English)</p>
            <input name="confirmpassword" autocomplete="off" v-model="validateForm.confirmpassword" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">Company name(Chinese)</p>
            <input name="confirmpassword" autocomplete="off" v-model="validateForm.confirmpassword" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">Company address(English)</p>
            <input name="confirmpassword" autocomplete="off" v-model="validateForm.confirmpassword" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">Company address(Chinese)</p>
            <input name="confirmpassword" autocomplete="off" v-model="validateForm.confirmpassword" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.PersonalName')}}</p>
            <input name="confirmpassword" autocomplete="off" v-model="validateForm.confirmpassword" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.IdentificationNumber')}}</p>
            <input name="confirmpassword" autocomplete="off" v-model="validateForm.confirmpassword" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.passport')}}</p>
            <input name="confirmpassword" autocomplete="off" v-model="validateForm.confirmpassword" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.passport')}}</p>
            <van-uploader
              upload-icon="plus"
              name="passport"
              v-model="validateForm.passport"
              :after-read="afterRead"
              max-count="1"
            />
          </div>
          <p class="error">{{errorsMsg}}</p>
          <button
            :disabled="isdisabled"
            :class="isdisabled?'passive':'active'"
            class="button is-primary"
            type="submit"
          >Submit</button>
        </form>
      </main>
    </div>
  </div>
</template>
<script>
import Scroll from "../loadmore";
export default {
  props: ["usercheck"],
  data() {
    return {
      validateForm: {
        Genus: "",
        Identity: "",
        Nationality: "",
        confirmpassword: ""
      },
      // validateFormLable: "",
      // IdentityLable: "",
      // NationalityLable: "",
      errorsMsg: "",
      fileList_company: []
    };
  },
  components: {
    "v-scroll": Scroll
  },
  computed: {
    isdisabled() {
      if (this.validateForm.Genus && this.validateForm.Identity) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    // this.getcountrylist("");
    console.log(this.usercheck);
  },
  methods: {
    goto(name) {
      this.$emit("fromto", name);
    },
    identityChange(val) {
      // console.log(123);
      this.fileList_front = [];
      this.fileList_back = [];
      this.fileList_company = [];
      this.form.identityPicOne = "";
      this.form.identityPicTwo = "";
      this.form.userCompanyPic = "";
    },
    NationalityChange(val) {
      this.fileList_front = [];
      this.fileList_back = [];
      this.fileList_company = [];
      this.form.identityPicOne = "";
      this.form.identityPicTwo = "";
      this.form.userCompanyPic = "";
      if (this.countrylist[val].remark === "CHN") {
        this.form.identityType = 1; //身份证
      } else {
        this.form.identityType = 2; //护照
      }
      this.form.userCountry = this.countrylist[val].remark;
      this.form.userCountryEn = this.countrylist[val].eng;
      this.form.userCountryCh = this.countrylist[val].chinese;
      // console.log(this.form.userCountry);
    },
    asyncBeforeRead(file, index) {
      // console.log(file, index);
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast(this.$t("common.UploadJPG"));
        return false;
      }
      return true;
    },

    async afterRead(file, index) {
      // console.log(index.name);
      file.status = "uploading";
      file.message = "上传中...";
      let uploadImg = await this.upLoaderImg(file.file);
      // if (uploadImg.resultCode == 10000) {
      //   file.status = "done";
      //   file.message = "haole";
      //   let imgurl = uploadImg.data.url;
      //   let urlBase = uploadImg.data.urlBase;
      //   if (index.name == "identityPicOne") {
      //     this.fileList_front = [];
      //     this.form.identityPicOne = imgurl;
      //     this.fileList_front.push({ url: urlBase + imgurl });
      //   } else if (index.name == "identityPicTwo") {
      //     this.fileList_back = [];
      //     this.form.fileList_back = imgurl;
      //     this.fileList_back.push({ url: urlBase + imgurl });
      //   } else if (index.name == "userCompanyPic") {
      //     this.fileList_company = [];
      //     this.form.userCompanyPic = imgurl;
      //     this.fileList_company.push({ url: urlBase + imgurl });
      //   }
      // } else {
      //   file.status = "failed";
      //   file.message = "haole";
      // }
    },
    upLoaderImg(file) {
      // if (file.type !== "image/jpeg") {
      //   this.$toast(this.$t("common.UploadJPG"));
      //   return false;
      // }
      console.log(file);

      let formData = new FormData();
      formData.append("file", file);
      formData.append("X_Token", this.$store.state.X_Token);
      console.log(formData);
      // this.$loading();

      // return new Promise((resolve, reject) => {
      //   this.$axios({
      //     method: "post",
      //     url: `${this.$axios.defaults.baseURL}/bsl_web/upload/pic`,
      //     data: formData,
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //       // "application/x-www-form-urlencoded"
      //     }
      //   }).then(res => {
      //     console.log(res);

      //     this.$toast.clear();
      //     if (res.data.resultCode == 10000) {
      //       let imgurl = res.data.data.url;
      //       let urlBase = res.data.data.urlBase;
      //       // console.log(urlBase + imgurl);
      //       if (index == 1) {
      //         this.fileList_front = [];
      //         this.form.identityPicOne = imgurl;
      //         this.fileList_front.push({ url: urlBase + imgurl });
      //       } else if (index == 2) {
      //         this.fileList_back = [];
      //         this.form.fileList_back = imgurl;
      //         this.fileList_company.push({ url: urlBase + imgurl });
      //       } else if (index == 3) {
      //         this.fileList_company = [];
      //         this.form.userCompanyPic = imgurl;
      //         this.fileList_company.push({ url: urlBase + imgurl });
      //       }
      //       // resolve(true);
      //     } else {
      //       this.$toast(res.data.resultDesc);
      //       reject(res.data.resultDesc);
      //     }
      //   });
      // });
    } // submit() {
    //   this.$refs.form.validate().then(result => {
    //     console.log("form valid: ", result);
    //   });
    // },
    // clear() {
    //   this.$refs.form.clear();
    //   this.validateForm = {
    //     username: "",
    //     password: "",
    //     isAgree: false
    //   };
    // }
  }
};
</script>
<style lang='scss'>
.usercheckPop {
  max-height: vw(300);
}
.mu-infinite-scroll-text {
  margin: 0;
}
#usercheck {
  .van-icon-plus::before {
    // display: inline-block;
    // vertical-align: middle;
    width: vw(92);
    height: vw(92);
    line-height: vw(92);
    font-size: vw(42);
    color: #fff;
    text-align: center;
    border-radius: 50%;
    background-color: #00f0ab;
  }
  .van-uploader {
    width: 100%;
  }

  .van-uploader__upload {
    background: #fff;
    width: 100%;
    height: vw(200);
    border: 2px dashed #4f3dad;
    margin: 0;
  }
  .van-uploader__preview {
    margin: 0;
    height: vw(200);
  }
  .van-uploader__preview-image {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang='scss' scoped>
#usercheck {
  color: #4f3dad;
  z-index: 100;
  background: #fff;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .usercheck {
    width: 100vw;
    z-index: 11;
    #Nav {
      width: 100%;
      font-weight: bold;
      position: fixed;
      top: 0;
      z-index: 200;
      background: #fff;
      line-height: vw(140);
      text-align: center;
      color: #4f3dad;
      font-size: vw(40);
      .van-search {
        width: vw(598);
        margin: 0 auto;
        padding: 0;
      }
      .van-search__content {
        border: vw(2) solid #3ab5cc;
        background: #fff;
        .van-icon-search,
        .van-icon-clear {
          color: #3ab5cc;
        }
      }
    }
  }
  .genus {
    padding-top: vw(290);
  }
  .Identity,
  .Nationality {
    padding-top: vw(245);
  }

  .genus,
  .Identity,
  .Nationality {
    nav.Nav {
      line-height: vw(140);
      header {
        height: vw(140);
        position: relative;
        .van-icon-arrow-left {
          position: absolute;
          left: vw(36);
          top: 50%;
          transform: (translate(0, -50%));
        }
      }
    }
    .container {
      padding: 0;
      #itemGenus {
        padding: 0 vw(40);
        height: vw(112);
        display: flex;
        align-items: center;
        border-bottom: vw(2) solid #4f3dad;
        .item-1 {
          font-size: vw(30);
          font-weight: bold;
          line-height: vw(34);
          color: #4f3dad;
        }
      }
    }
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateX(vw(80));
  }
  /*
      v-enter-active: 入场动画的时间段
      v-leave-active：离场动画的时间段
    */
  .v-enter-active,
  .v-leave-active {
    transition: all 1s;
  }
  .error {
    height: vw(24);
    font-size: vw(24);
    // font-weight: 400;
    color: #0ce5b2;
    margin-bottom: vw(18);
    // line-height: vw(24);
  }
  main {
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 100%;
    padding: vw(212) vw(94) 0;
    color: #4f3dad;
    font-size: vw(30);
    p.label {
      margin-bottom: vw(44);
      height: vw(34);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
    }
    .mui-input-row {
      width: 100%;
      margin-bottom: vw(60);
      span {
        display: inline-block;
      }
      input {
        width: 100%;
        font-size: vw(34);
        height: vw(52);
        line-height: vw(52);
        border-bottom: vw(2) solid #4f3dad;
      }
      p.select {
        width: 100%;
        height: vw(52);
        font-size: vw(34);
        line-height: vw(52);
        border-bottom: vw(2) solid #4f3dad;
        display: flex;
        span {
          display: inline-block;
          flex: 1;
        }
        .van-icon-arrow {
          justify-self: flex-end;
          font-size: vw(40);
          line-height: vw(52);
        }
      }
      // p.helpText {
      //   font-size: vw(30);
      //   font-weight: bold;
      //   line-height: vw(34);
      //   color: #8277b9;
      //   margin-top: vw(50);
      // }
    }
    div.btn {
      margin-top: vw(290);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .reminder {
        color: #0ce5b2;
        width: vw(569);
        display: flex;
        justify-content: center;
        // height: vw(75);
      }
    }
    button {
      color: #ffffff;
      background: #4f3dad;
      border-radius: vw(40);
      width: vw(528);
      font-weight: bold;
      line-height: vw(114);
      height: vw(114);
      font-size: vw(40);
    }
    button.passive {
      background: #828282;
    }
    button.active {
      background: #4f3dad;
    }
    // button.active{

    // }
  }
  @media all and (orientation: landscape) {
    main {
      padding-top: vw(227);
      div.btn {
        margin-top: vw(90);
      }
    }
  }
}
</style>