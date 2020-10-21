<template>
  <div id="usercheck">
    <div class="usercheck" v-show="flag">
      <commonnav>{{$t("common.Verify")}}</commonnav>
      <main class="main">
        <!-- <mu-form ref="form" :model="validateForm" class="mu-demo-form">
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
        <mu-form-item>
          <van-button @click="submit">{{$t('common.Register')}}</van-button>
        </mu-form-item>
        </mu-form>-->
        <form ref="form" @submit.prevent="submit_click">
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.Genus')}}</p>
            <p class="select" @click="GenusSwitch=!GenusSwitch">{{validateFormLable}}</p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.Identity')}}</p>
            <p class="select" @click="IdentitySwitch=!IdentitySwitch">{{IdentityLable}}</p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label">{{$t('common.Nationality')}}</p>
            <p class="select" @click="NationalitySwitch=!NationalitySwitch">{{NationalityLable}}</p>
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
          <!-- <p v-show="errors.has('userName')" class="error">{{ errors.first('userName') }}</p>
          <p v-show="errors.has('Password')" class="error">{{ errors.first('Password') }}</p>-->
          <!-- <p
          v-show="errors.has('confirmpassword')"
          class="error"
          >{{ errors.first('confirmpassword') }}</p>-->
          <!-- <button @click="submit">SUBMIT</button> -->
          <button
            :disabled="isdisabled"
            :class="isdisabled?'passive':'active'"
            class="button is-primary"
            type="submit"
          >Submit</button>
        </form>
      </main>
    </div>
    <!-- <transition v-on:after-leave="afterLeave"> -->
    <div class="usercheck genus" v-show="GenusSwitch">
      <div id="Nav">
        <nav class="Nav">
          <header>
            <van-icon name="arrow-left" @click="GenusSwitch=!GenusSwitch" />
            <span>{{$t('common.Nationality')}}</span>
          </header>
          <van-search
            v-model="searchkey"
            :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
            shape="round"
            left-icon
          >
            <div slot="right-icon" @click="getcountrylist">
              <van-icon name="search" />
            </div>
          </van-search>
        </nav>
      </div>
      <v-scroll :on-refresh="onRefresh" :loaded="loaded" :on-infinite="onInfinite">
        <ul class="timestamp">
          <li
            id="itemGenus"
            @click="pickcountry(item)"
            v-for="item in countrylist  "
            :key="item.remark"
          >
            <div class="item item-1">{{ item.lable}}</div>
          </li>
          <!-- <p v-if="loaded">加载完成</p> -->
        </ul>
      </v-scroll>
    </div>
    <div class="usercheck Identity" v-show="IdentitySwitch">
      <div id="Nav">
        <nav class="Nav">
          <header>
            <van-icon name="arrow-left" @click="IdentitySwitch=!IdentitySwitch" />
            <span>{{$t('common.Nationality')}}</span>
          </header>
        </nav>
      </div>
      <mu-paper class="demo-loadmore-wrap">
        <mu-container ref="container" class="demo-loadmore-content">
          <div class="timestamp">
            <div
              @click="pickIdentity(item)"
              id="itemGenus"
              v-for="item in optionId"
              :key="item.value"
            >
              <div class="item item-1">{{item.text}}</div>
            </div>
          </div>
        </mu-container>
      </mu-paper>
    </div>
    <div class="usercheck Nationality" v-show="NationalitySwitch">
      <div id="Nav">
        <nav class="Nav">
          <header>
            <van-icon name="arrow-left" @click="NationalitySwitch=!NationalitySwitch" />
            <span>{{$t('common.Nationality')}}</span>
          </header>
        </nav>
      </div>
      <mu-paper class="demo-loadmore-wrap">
        <mu-container ref="container" class="demo-loadmore-content">
          <div class="timestamp">
            <div
              @click="pickNationality(item)"
              id="itemGenus"
              v-for="item in optionType"
              :key="item.value"
            >
              <div class="item item-1">{{item.text}}</div>
            </div>
          </div>
        </mu-container>
      </mu-paper>
    </div>

    <!-- </transition> -->
  </div>
</template>
<script>
import Scroll from "./loadmore";
export default {
  data() {
    return {
      validateForm: {
        Genus: "",
        Identity: "",
        Nationality: ""
      },
      validateFormLable: "",
      IdentityLable: "",
      NationalityLable: "",
      loaded: false,
      // loading: false,
      NationalitySwitch: false,
      IdentitySwitch: false,
      GenusSwitch: false,
      // refreshing: false,
      searchkey: "",
      errorsMsg: "",
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
      argeeRules2: [
        {
          validate: val => {
            // console.log(val);
            return val.length > 0;
          },
          trigger: "input",
          message: "Must upload"
        }
      ]
    };
  },
  components: {
    "v-scroll": Scroll
  },
  computed: {
    flag() {
      if (this.GenusSwitch || this.IdentitySwitch || this.NationalitySwitch) {
        return false;
      } else {
        return true;
      }
    },
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
  },
  mounted() {
    // this.onRefresh();
  },
  methods: {
    onRefresh(done) {
      //   3. 在刷新方法内部进行自己的逻辑处理 此处调用了后台接口
      // this.onRefreshPort(done);
      this.getcountrylist();
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    /**
     * 上拉加载接口
     */
    onInfinitePort(done) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: this.searchkey
          }
        )
        .then(res => {
          if (res.data.data.length > 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.countrylist.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                lable:
                  this.$i18n.locale === "zh_CN"
                    ? res.data.data[i].countryZhname
                    : res.data.data[i].countryEnname,
                value: i,
                remark: res.data.data[i].countryCode
              });
            }
            // done();
          }
        });
      // this.getcountrylist();
    },
    pickNationality(item) {
      this.validateForm.Nationality = item.value;
      this.NationalityLable = item.text;
      this.NationalitySwitch = false;
    },
    pickIdentity(item) {
      // console.log(item);
      this.validateForm.Identity = item.value;
      this.IdentityLable = item.text;
      this.IdentitySwitch = false;
    },
    pickcountry(item) {
      // console.log(item);
      this.validateForm.Genus = item.value;
      this.validateFormLable = item.lable;
      this.GenusSwitch = false;
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
    getcountrylist(val) {
      this.countrylist = [];
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: this.searchkey
          }
        )
        .then(res => {
          if (res.data.data.length > 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.countrylist.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                lable:
                  this.$i18n.locale === "zh_CN"
                    ? res.data.data[i].countryZhname
                    : res.data.data[i].countryEnname,
                value: i,
                remark: res.data.data[i].countryCode
              });
            }
            this.loaded = true;
          }
        });
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
    padding: 0 vw(94);
    color: #4f3dad;
    padding-top: vw(212);
    font-size: vw(30);
    p.label {
      margin-bottom: vw(62);
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
        height: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
      p.select {
        width: 100%;
        height: vw(48);
        font-size: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
      p.helpText {
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
        color: #8277b9;
        margin-top: vw(50);
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