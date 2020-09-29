<template>
  <div id="usercheck">
    <commonnav>{{$t("common.Verify")}}</commonnav>
    <main class="main">
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item prop="Genus" :rules="Genus">
          <template slot="label">{{$t('common.Genus')}}</template>
          <mu-select name="Genus" v-model="validateForm.Genus" full-width>
            <mu-option
              v-for="(item) in optionType"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item :label="$t('common.Identity')" prop="Identity" :rules="Identity">
          <mu-select
            name="Identity"
            @change="identityChange"
            v-model="validateForm.Identity"
            full-width
          >
            <mu-option
              v-for="(option) in optionId"
              :key="option.value"
              :label="option.text"
              :value="option.value"
              :disabled="validateForm.Genus===1 && option.value===1"
            ></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item :label="$t('common.Nationality')" prop="Nationality" :rules="Nationality">
          <mu-select
            popover-class="usercheckPop"
            v-model="validateForm.Nationality"
            :no-data-text="!coutry_fetching?$t('common.NotFound'):''"
            max-height="10%"
            filterable
            @change="NationalityChange"
            full-width
          >
            <div v-if="coutry_fetching" style="padding: 0 16px;">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="30px"
                height="30px"
                viewBox="0 0 50 50"
                style="enable-background:new 0 0 50 50"
                xml:space="preserve"
              >
                <path
                  fill="#0ce5b2"
                  d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                  transform="rotate(275.098 25 25)"
                >
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
            <mu-option
              v-for="(option) in countrylist"
              :key="option.remark"
              :label="$i18n.locale === 'zh_CN'? option.chinese: option.eng"
              :value="option.value"
            ></mu-option>
          </mu-select>
        </mu-form-item>
        <mu-form-item
          v-if="validateForm.Identity === 2"
          label="Company name(English)"
          prop="PersonalName"
          :rules="PersonalName"
        >
          <mu-text-field v-model="validateForm.userCompanyEn"></mu-text-field>
        </mu-form-item>
        <mu-form-item
          v-if="validateForm.Identity === 2"
          label="Company name(Chinese)"
          prop="PersonalName"
          :rules="PersonalName"
        >
          <mu-text-field v-model="validateForm.userCompanyCh"></mu-text-field>
        </mu-form-item>
        <mu-form-item
          v-if="validateForm.Identity === 2"
          label="Company address(English)"
          prop="PersonalName"
          :rules="PersonalName"
        >
          <mu-text-field v-model="validateForm.userCompanyCh"></mu-text-field>
        </mu-form-item>
        <mu-form-item
          v-if="validateForm.Identity === 2"
          label="Company address(Chinese)"
          prop="PersonalName"
          :rules="PersonalName"
        >
          <mu-text-field v-model="validateForm.userCompanyCh"></mu-text-field>
        </mu-form-item>
        <mu-form-item
          v-if="validateForm.Identity === 1"
          :label="$t('common.PersonalName')"
          prop="PersonalName"
          :rules="PersonalName"
        >
          <mu-text-field v-model="validateForm.PersonalName"></mu-text-field>
        </mu-form-item>
        <mu-form-item
          v-if="validateForm.Identity === 1"
          :label="$t('common.IdentificationNumber')"
          prop="PersonalName"
          :rules="PersonalName"
        >
          <mu-text-field v-model="validateForm.PersonalName"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('common.passport')" prop="passport" :rules="passport">
          <van-uploader
            upload-icon="plus"
            name="passport"
            v-model="validateForm.passport"
            :after-read="afterRead"
            max-count="1"
          />
               <van-uploader
            upload-icon="plus"
            name="passport"
            v-model="validateForm.passport"
            :after-read="afterRead"
            max-count="1"
          />
        </mu-form-item>
        <!-- <mu-form-item  prop="passport" :rules="passport">
          <van-uploader
            upload-icon="plus"
            name="passport"
            v-model="validateForm.passport"
            :after-read="afterRead"
            max-count="1"
          />
        </mu-form-item> -->
        <mu-form-item>
          <van-button @click="submit">{{$t('common.Register')}}</van-button>
        </mu-form-item>
      </mu-form>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList_company: [],
      countrylist: [],
      optionType: [
        { text: this.$t("common.ProjectParty"), value: 1 },
        { text: this.$t("common.Middleman"), value: 4 },
        { text: this.$t("common.Investor"), value: 3 }
      ],
      optionId: [
        { text: this.$t("common.individual"), value: 1 },
        { text: this.$t("common.company"), value: 2 }
      ],
      dad_text: this.$t("common.Reveiw"),
      usernameRules: [
        { validate: val => !!val, message: "Username must be filled in" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "Password must be filled in" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "Password length must be greater than 3 and less than 10"
        }
      ],
      argeeRules: [
        { validate: val => !!val, message: "Must agree with user agreement" }
      ],
      argeeRules2: [
        {
          validate: val => {
            // console.log(val);
            return val.length > 0;
          },
          trigger: "input",
          message: "Must upload"
        }
      ],
      validateForm: {
        username: "",
        password: "",
        isAgree: false,
        userCompanyPic: []
      }
    };
  },
  created() {
    this.getcountrylist("");
  },
  methods: {
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
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";

      setTimeout(() => {
        file.status = "done";
        // console.log(this.$refs.form);
        // for(let i =0;i<this.$refs.form.items.length;i++){
        //   if(this.$refs.form.items[i].prop==="userCompanyPic"){
        //       this.$refs.form.items[i].validate()
        //   }
        // }
      }, 1000);
    },
    asyncBeforeRead(file, index) {
      // console.log(file, index);
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast(this.$t("common.UploadJPG"));
        return false;
      }
      return true;
    },
    getcountrylist(val) {
      this.countrylist = [];
      this.coutry_fetching = true;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: val
          }
        )
        .then(res => {
          if (res.data.data.length > 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.countrylist.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                value: i,
                remark: res.data.data[i].countryCode
              });
            }
          }
          this.coutry_fetching = false;
          // console.log(this.countrylist);
        });
    },
    // async afterRead(file, index) {
    //   console.log(index.name);
    //   file.status = "uploading";
    //   file.message = "上传中...";
    //   let uploadImg = await this.upLoaderImg(file.file);
    //   if (uploadImg.resultCode == 10000) {
    //     file.status = "done";
    //     file.message = "haole";
    //     let imgurl = uploadImg.data.url;
    //     let urlBase = uploadImg.data.urlBase;
    //     if (index.name == "identityPicOne") {
    //       this.fileList_front = [];
    //       this.form.identityPicOne = imgurl;
    //       this.fileList_front.push({ url: urlBase + imgurl });
    //     } else if (index.name == "identityPicTwo") {
    //       this.fileList_back = [];
    //       this.form.fileList_back = imgurl;
    //       this.fileList_back.push({ url: urlBase + imgurl });
    //     } else if (index.name == "userCompanyPic") {
    //       this.fileList_company = [];
    //       this.form.userCompanyPic = imgurl;
    //       this.fileList_company.push({ url: urlBase + imgurl });
    //     }
    //   } else {
    //     file.status = "failed";
    //     file.message = "haole";
    //   }
    // },
    submit() {
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: "",
        isAgree: false
      };
    }
  }
};
</script>
<style lang='scss'>
.usercheckPop {
  max-height: vw(300);
}
.mu-option.is-selected .mu-item {
  color: #4f3dad;
}
.mu-item span {
  //  font-size: vw(32);
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
  .mu-input-focus-line {
    display: none;
  }

  .mu-form-item-label {
    height: vw(30);
    font-size: vw(30);
    font-weight: bold;
    line-height: vw(30);
    color: #4f3dad;
    opacity: 1;
    margin-bottom: vw(48);
    // &::after {
    //   content: "*";
    //   margin-left: vw(10);
    //   color: #00f0ab;
    // }
  }
  .mu-input__error {
  }
  .mu-input__focus {
    color: #4f3dad;
  }
  .mu-select-input {
    color: #4f3dad;
    font-size: vw(32);
  }
  .mu-input-line {
    background: #4f3dad;
    height: 2px;
  }
  .mu-text-field-input {
    color: #4f3dad;
    font-size: vw(32);
  }

  .mu-form-item__error .mu-form-item-help {
    bottom: vw(-4);
  }
}
</style>
<style lang='scss' scoped>
#usercheck {
  color: #4f3dad;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .label {
    color: #fff;
    font-size: vw(30);
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
    align-items: center;
    width: 100%;
    padding: 0 vw(94);
    padding-top: vw(184);

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
    @media (min-width: 480px) {
      div.btn {
        margin-top: vw(100);
        // padding-bottom: vw(90);
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