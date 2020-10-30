<template>
  <div id="Verify">
    <div class="usercheck">
      <commonnav>
        {{$t("common.Verify")}}
        <template v-slot:arrowLeft>
          <van-icon name="arrow-left" @click="$global.previous()" />
        </template>
      </commonnav>
      <main class="main">
        <form ref="form" @submit.prevent="submit_click">
          <div class="mui-input-row input-row">
            <p class="label need">{{$t('common.Genus')}}</p>
            <p class="select" @click="goto('genus')">
              <span>{{validateForm.genus && validateForm.genus.text}}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label need">{{$t('common.Identity')}}</p>
            <p class="select" @click="goto('identity')">
              <span>{{validateForm.identity && validateForm.identity.text}}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label need">{{$t('common.Nationality')}}</p>
            <p class="select" @click="goto('nationality')">
              <span>{{validateForm.nation && validateForm.nation.lable}}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div v-if="validateForm.identity.value===2" class="mui-input-row input-row">
            <p class="label need">Company name(English)</p>
            <input name="confirmpassword" autocomplete="off" v-model="formdata.userCompanyEn" />
          </div>
          <div v-if="validateForm.identity.value===2" class="mui-input-row input-row">
            <p class="label">Company name(Chinese)</p>
            <input name="confirmpassword" autocomplete="off" v-model="formdata.userCompanyCh" />
          </div>
          <div v-if="validateForm.identity.value===2" class="mui-input-row input-row">
            <p class="label need">Company address(English)</p>
            <input name="confirmpassword" autocomplete="off" v-model="formdata.userAddressEn" />
          </div>
          <div v-if="validateForm.identity.value===2" class="mui-input-row input-row">
            <p class="label">Company address(Chinese)</p>
            <input name="confirmpassword" autocomplete="off" v-model="formdata.userAddressCh" />
          </div>
          <div v-if="validateForm.identity.value===1" class="mui-input-row input-row">
            <p class="label need">{{$t('common.PersonalName')}}</p>
            <input name="confirmpassword" autocomplete="off" v-model="formdata.userName" />
          </div>
          <div
            v-if="validateForm.identity.value===1 && validateForm.nation && validateForm.nation.remark==='CHN'"
            class="mui-input-row input-row"
          >
            <p class="label need">{{$t('common.IdentificationNumber')}}</p>
            <input name="confirmpassword" autocomplete="off" v-model="formdata.userIdentity" />
          </div>
          <div
            v-if="validateForm.identity.value===1 && validateForm.nation && validateForm.nation.remark!=='CHN'"
            class="mui-input-row input-row"
          >
            <p class="label need">{{$t('common.passport')}}</p>
            <input name="confirmpassword" autocomplete="off" v-model="formdata.userIdentity" />
          </div>
          <div
            class="mui-input-row input-row"
            v-if="validateForm.identity.value===1 && validateForm.nation && validateForm.nation.remark!=='CHN'"
          >
            <p class="label">{{$t('common.passport')}}</p>
            <van-uploader
              upload-icon="plus"
              name="passport"
              v-model="fileList_front"
              :after-read="afterRead"
              max-count="1"
            />
          </div>
          <div
            class="mui-input-row input-row"
            v-if="validateForm.identity.value===1 && validateForm.nation && validateForm.nation.remark==='CHN'"
          >
            <p class="label">{{$t('common.IdentificationNumber')}}</p>
            <van-uploader
              class="uploaderFirst"
              upload-icon="plus"
              name="passport"
              v-model="fileList_front"
              :after-read="afterRead"
              max-count="1"
            />
            <van-uploader
              upload-icon="plus"
              name="passport"
              v-model="fileList_back"
              :after-read="afterRead"
              max-count="1"
            />
          </div>
          <div class="mui-input-row input-row" v-if="validateForm.identity.value===2">
            <p class="label">{{$t('common.Certificate')}}</p>
            <van-uploader
              upload-icon="plus"
              name="passport"
              v-model="fileList_company"
              :after-read="afterRead"
              max-count="1"
            />
          </div>
          <!-- <p class="error">{{errorsMsg}}</p> -->
          <footer>
            <button class="button is-primary" type="submit">Submit</button>
          </footer>
        </form>
      </main>
    </div>
    <transition name="slide-fade">
      <div class="secondLayer" @fromKids="pick" :usercheck="validateForm" :is="currentView"></div>
    </transition>
    <DialogMsg
      @comfirmFromDialog="comfirmFromDialog"
      :remindervisible.sync="remindervisible"
      :showCancel="false"
      :msg="errormsg"
    ></DialogMsg>
  </div>
</template>
<script>
import Scroll from "../loadmore";
import genus from "@/components/moblie/common/genus";
import nationality from "@/components/moblie/common/nationality";
import identity from "@/components/moblie/common/identity";
export default {
  data() {
    return {
      remindervisible: false,
      errormsg: "",
      validateForm: {
        genus: {
          text: "",
          value: null
        },
        identity: { text: "", value: null },
        nation: {}
      },
      formdata: {
        emailData: "",
        userCountry: "",
        userIdentityType: null,
        userCountryEn: "",
        userCountryCh: "",
        userIdentity: "",
        userName: "",
        identityType: "",
        identityPicOne: "",
        identityPicTwo: "",
        userCompanyCh: "",
        userCompanyEn: "",
        userAddressCh: "",
        userAddressEn: "",
        userCompanyPic: "",
        userType: null
        // X_Token: this.$store.state.X_Token
        // identity: ""
      },
      // isshow: true,
      currentView: "",
      transitionName: "",
      errorsMsg: "",
      fileList_company: [],
      fileList_front: [],
      fileList_back: []
    };
  },
  components: {
    "v-scroll": Scroll,
    genus: genus,
    nationality: nationality,
    identity: identity
  },
  watch: {
    isshow: function(a, b) {
      if (a) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
      // console.log(this.transitionName);
    }
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
    // console.log(this.usercheck);
  },
  methods: {
    pick(data) {
      // console.log(data);
      if (data == "genus") {
        this.formdata.userType = this.validateForm.genus.value;
        if (
          this.validateForm.genus.value === 1 &&
          this.validateForm.identity.value === 1
        ) {
          this.formdata.userIdentityType = null;
          this.validateForm.identity.text = "";
        }
      } else if (data == "identity") {
        if (
          this.formdata.userIdentityType &&
          this.formdata.userIdentityType !== this.validateForm.identity.value
        ) {
          this.formdata.userCompanyCh = "";
          this.formdata.userCompanyEn = "";
          this.formdata.userAddressCh = "";
          this.formdata.userAddressEn = "";
          this.formdata.userName = "";
          this.formdata.userIdentity = "";
          this.fileList_front = [];
          this.fileList_company = [];
          this.fileList_back = [];
        }
        this.formdata.userIdentityType = this.validateForm.identity.value;
      } else if (data == "nation") {
        // if (this.formdata.userCountry && this.formdata.userCountry !== this.validateForm.nation.value) {
        //   this.fileList_front = [];
        //   this.fileList_company = [];
        //   this.fileList_back = [];
        // }
        this.formdata.userCountry = this.validateForm.nation.value;
      }

      this.currentView = "";
      // this.validateForm=Object.assign({},this.validateForm)
      // console.log(this.validateForm);
    },
    goto(name) {
      this.currentView = name;
    },
    comfirmFromDialog(data) {
      this.remindervisible = data;
    },
    submit_click() {
      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errormsg = errorMsg;
        this.remindervisible = true;
        return false;
      }
      this.errormsg = "成功";
      this.remindervisible = true;
      // this.$routerto("signContractStep2");
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      validator.add(self.formdata.userType, [
        ["isNotEmpty", self.$t("common.Genus") + self.$t("common.isno")]
      ]);
      validator.add(self.formdata.userIdentityType, [
        ["isNotEmpty", this.$t("common.Identity") + this.$t("common.isno")]
      ]);
      validator.add(self.formdata.userCountry, [
        ["isNotEmpty", this.$t("common.Nationality") + this.$t("common.isno")]
      ]);
      if (self.validateForm.identity.value === 1) {
        validator.add(self.formdata.userName, [
          [
            "isNotEmpty",
            this.$t("common.PersonalName") + this.$t("common.isno")
          ]
        ]);
        if (
          self.validateForm.nation &&
          self.validateForm.nation.remark === "CHN"
        ) {
          validator.add(self.formdata.userIdentity, [
            [
              "isNotEmpty",
              this.$t("common.IdentificationNumber") + this.$t("common.isno")
            ]
          ]);
        } else if (
          self.validateForm.nation &&
          self.validateForm.nation.remark !== "CHN"
        ) {
          validator.add(self.formdata.userIdentity, [
            ["isNotEmpty", this.$t("common.passport") + this.$t("common.isno")]
          ]);
        }
      } else if (self.validateForm.identity.value === 2) {
        validator.add(self.formdata.userCompanyEn, [
          ["isNotEmpty", "userCompanyEn" + this.$t("common.isno")]
        ]);
        validator.add(self.formdata.userAddressEn, [
          ["isNotEmpty", "userAddressEn" + this.$t("common.isno")]
        ]);
      }
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
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
      console.log(uploadImg);
      // if(uploadImg.status)
      file.status = "done";
      file.message = uploadImg.message;
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
      // console.log(file);
      // let formData = new FormData();
      // formData.append("file", file);
      // formData.append("X_Token", this.$store.state.X_Token);
      // console.log(formData);
      // // this.$loading();
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          file.status = "failed";
          file.message = "上传失败";
          resolve(file);
        }, 1000);
        // this.$axios({
        //   method: "post",
        //   url: `${this.$axios.defaults.baseURL}/bsl_web/upload/pic`,
        //   data: formData,
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //     // "application/x-www-form-urlencoded"
        //   }
        // }).then(res => {
        //   this.$toast.clear();
        //   if (res.data.resultCode == 10000) {
        //     let imgurl = res.data.data.url;
        //     let urlBase = res.data.data.urlBase;
        //     // console.log(urlBase + imgurl);
        //     if (index == 1) {
        //       this.fileList_front = [];
        //       this.form.identityPicOne = imgurl;
        //       this.fileList_front.push({ url: urlBase + imgurl });
        //     } else if (index == 2) {
        //       this.fileList_back = [];
        //       this.form.fileList_back = imgurl;
        //       this.fileList_company.push({ url: urlBase + imgurl });
        //     } else if (index == 3) {
        //       this.fileList_company = [];
        //       this.form.userCompanyPic = imgurl;
        //       this.fileList_company.push({ url: urlBase + imgurl });
        //     }
        //     // resolve(true);
        //   } else {
        //     // this.$toast(res.data.resultDesc);
        //     reject(123);
        //   }
        // });
      });
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
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s ease;
  // position: fixed;
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  // opacity: 0;
}

#Verify .usercheck {
  .van-icon-plus::before {
    // display: inline-block;
    // vertical-align: middle;
    width: vw(92);
    height: vw(92);
    line-height: vw(92);
    // font-size: vw(42);
    color: #fff;
    text-align: center;
    border-radius: 50%;
    background-color: #00f0ab;
  }
  .van-uploader {
    width: 100%;
    height: vw(200);
    border: vw(4) dashed #4f3dad;
  }

  .van-uploader__upload {
    background: #fff;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .van-uploader__wrapper {
    // height: vw(200);
    width: 100%;
    height: 100%;
  }
  .van-uploader__preview {
    margin: 0;
    width: 100%;
    height: 100%;
    .van-image__img {
    }
  }
  .van-uploader__preview-image {
    width: 100%;
    height: 100%;
  }
  .uploaderFirst {
    margin-bottom: vw(90);
  }
}
</style>
<style lang='scss' scoped>
#Verify {
  position: relative;
  .usercheck {
    width: 100vw;
    z-index: 11;
    main {
      display: flex;
      flex-direction: column;
      // align-items: center;
      width: 100%;
      padding: vw(212) vw(94) 0;
      color: #4f3dad;
      p.label {
        margin-bottom: vw(44);
        height: vw(34);
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
      }
      p.need {
        &::after {
          content: "*";
          color: #0ce5b2;
          padding-left: vw(8);
        }
      }
      .mui-input-row {
        width: 100%;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
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
      footer {
        display: flex;
        justify-content: center;
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
      }

      // button.active{

      // }
    }
  }
  .secondLayer {
    position: fixed;
    z-index: 201;
    top: 0;
    height: 100%;
    width: 100%;
    background: #fff;
  }
  p.error {
    height: vw(24);
    font-size: vw(24);
    // font-weight: 400;
    color: #0ce5b2;
    margin-bottom: vw(18);
    // line-height: vw(24);
  }
}
</style>