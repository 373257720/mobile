<template>
  <div id="usercheck">
    <commonnav :msg="dad_text"></commonnav>
    <main class="main">
      <form id="userCheck">
        <label class="label required" for="z">{{$t('common.Category')}}</label>
        <mu-select
          name="userType"
          @blur="blur"
          v-model="form.userType"
          full-width
        >
          <mu-option
            v-for="(item) in optionType"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></mu-option>
        </mu-select>
        <p class="error">
          <span></span>
        </p>
        <label class="label required">{{$t('common.Identity')}}</label>
        <mu-select v-model="form.userIdentityType" @change="identityChange" full-width>
          <mu-option
            v-for="(option) in optionId"
            :key="option.value"
            :label="option.text"
            :value="option.value"
          ></mu-option>
        </mu-select>
        <p class="error">
          <span></span>
        </p>
        <label class="label required">{{$t('common.Nationality')}}</label>
        <mu-select
          v-model="userCountry"
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
          >
            <span>{{$i18n.locale === 'zh_CN'?option.chinese: option.eng}}</span>
          </mu-option>
        </mu-select>
        <p class="error">
          <span></span>
        </p>

        <div v-show="form.userIdentityType == 2">
          <label class="label required" for="z">Company name</label>
          <mu-text-field v-model="form.userCompanyEn" id="username" name="username"></mu-text-field>
          <p class="error">
            <span>{{ errors.userCompanyEn}}</span>
          </p>
          <label class="label" for="z">公司名称</label>
          <mu-text-field v-model="form.userCompanyCh" id="username" name="username"></mu-text-field>
          <p class="error">
            <span>{{ errors.username}}</span>
          </p>
          <label class="label required" for="z">Company address</label>
          <mu-text-field v-model="form.userAddressEn" id="username" name="username"></mu-text-field>
          <p class="error">
            <span>{{ errors.username}}</span>
          </p>
          <label class="label" for="z">公司地址</label>
          <mu-text-field v-model="form.userAddressCh" id="username" name="username"></mu-text-field>
          <p class="error">
            <span>{{ errors.username}}</span>
          </p>
          <label class="label" for="z">{{$t('common.Certificate')}}</label>
          <van-uploader
            name="userCompanyPic"
            v-model="fileList_company"
            :after-read="afterRead"
            :before-read="asyncBeforeRead"
            multiple
            :max-count="1"
          />
          <p class="error">
            <span>{{ errors.username}}</span>
          </p>
        </div>
        <div v-show="form.userIdentityType == 1">
          <label class="label required">{{$t('common.PersonalName')}}</label>
          <mu-text-field v-model="form.userName" id="username" name="username"></mu-text-field>
          <p class="error">
            <span>{{ errors.username}}</span>
          </p>
          <label
            class="label required"
          >{{ form.userCountry === "CHN" ? $t('common.IdentificationNumber'):$t('common.passport') }}</label>
          <mu-text-field v-model="form.userIdentity" id="username" name="username"></mu-text-field>
          <p class="error">
            <span>{{ errors.username}}</span>
          </p>
          <label
            class="label"
            for="z"
          >{{ form.userCountry === "CHN" ? $t('common.IDCardFront') : $t('common.passport') }}</label>
          <van-uploader
            name="identityPicOne"
            :after-read="afterRead"
            :before-read="asyncBeforeRead"
            v-model="fileList_front"
            multiple
            :max-count="1"
            class="icon-add"
          />
          <p class="error">
            <span>{{ errors.username}}</span>
          </p>
          <div v-show="form.userCountry === 'CHN'">
            <label class="label">{{$t('common.IDCardBack')}}</label>
            <van-uploader
              name="identityPicTwo"
              v-model="fileList_back"
              :after-read="afterRead"
              :before-read="asyncBeforeRead"
              multiple
              :max-count="1"
            />
            <p class="error">
              <span>{{ errors.username}}</span>
            </p>
          </div>
        </div>
        <DialogMsg
          :msg="content"
          :title.sync="title"
          :successto="successto"
          :remindervisible.sync="remindervisible"
        ></DialogMsg>

        <!-- 
        <mu-dialog :title="$t('common.Reminder')" :open.sync="openSimple" width="80%">
          {{resultDesc}}
          <mu-button slot="actions" flat color="primary" @click="closeSimple(success)">Close</mu-button>
        </mu-dialog>-->
        <div class="btn">
          <!-- <p class="reminder">reminder</p> -->
          <mu-button color="#0ce5b2" @click="submit">{{$t('common.Submit')}}</mu-button>
        </div>
      </form>
    </main>

    <!-- <van-cell-group class="vanForm">
        <div class="usertype">
          <p>{{$t('common.Category')}}</p>
          <van-dropdown-menu>
            <van-dropdown-item
              @change="function(params) {
                  return signer_submit(params, 'userType');
                }
              "
              v-model="form.userType"
              :options="option1"
            ></van-dropdown-item>
          </van-dropdown-menu>
          <footer>{{ form_err.userType }}</footer>
        </div>
        <div class="identity">
          <p>{{$t('common.Identity')}}</p>
          <van-dropdown-menu>
            <van-dropdown-item
              v-if="form.userType == 1"
              disabled
              v-model="form.userIdentityType"
              :options="option2"
            />
            <van-dropdown-item v-else v-model="form.userIdentityType" :options="option2" />
          </van-dropdown-menu>
          <footer>{{ form_err.userIdentityType }}</footer>
        </div>
        <div class="nationality">
          <p>{{$t('common.Nationality')}}</p>
          <div class="nationality_position">
            <a-select
              showSearch
              :value="userCountry"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              :showArrow="false"
              :filterOption="false"
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              @change="handleChange"
              @search="search"
              :notFoundContent="coutry_fetching ? undefined :$t('common.NotFound')"
            >
              <a-spin v-if="coutry_fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="d in countrylist" :key="d.remark" :value="d.value + 1">
                <span style="margin-right: 0.1rem">{{d.eng}}</span>
                <span>{{d.chinese}}</span>
              </a-select-option>
            </a-select>
          </div>
          <footer>{{ form_err.userCountry }}</footer>
        </div>
        <div class="identy_check" v-show="form.userIdentityType == 2 ? false : true">
          <div class="idcard_num">
            <p>{{$t('common.PersonalName')}}</p>
            <van-field
              v-model="form.userName"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              clearable
            />
            <footer>{{ form_err.userName }}</footer>
          </div>
          <div class="idcard_num">
            <p>{{ form.userCountry === "CHN" ? $t('common.IdentificationNumber'):$t('common.passport') }}</p>
            <van-field
              v-model="form.userIdentity"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              clearable
            />
            <footer>{{ form_err.userIdentity }}</footer>
          </div>
          <div class="id_front">
            <p>{{ switchon == true ? $t('common.IDCardFront') : $t('common.passport') }}</p>
            <van-uploader
              :before-read="function(params){return asyncBeforeRead(params, 1)}"
              @delete="(params)=> {return deletepic(params, 1)}"
              v-model="fileList_front"
              multiple
              :max-count="1"
            />
            <footer>{{ form_err.userIdentity }}</footer>
          </div>
          <div class="id_back" v-show="switchon">
            <p>{{$t('common.IDCardBack')}}</p>
            <van-uploader
              @delete="(params)=> {return deletepic(params, 2)}"
              :before-read="function(params) {return asyncBeforeRead(params, 2)}"
              v-model="fileList_back"
              multiple
              :max-count="1"
            />
          </div>
        </div>
        <div class="gongsi" v-show="form.userIdentityType == 2 ? true : false">
          <div class="companyname2">
            <p>公司名称</p>
            <van-field v-model="form.userCompanyCh" placeholder="请输入公司名称" clearable />
          </div>
          <div class="companyname">
            <p>Company name</p>
            <van-field
              required
              v-model="form.userCompanyEn"
              placeholder="Please enter the company name"
              clearable
            />
          </div>
          <div class="company_address">
            <p>公司地址</p>
            <van-field v-model="form.userAddressCh" placeholder="请输入公司地址" clearable />
          </div>
          <div class="company_address_eng">
            <p>Company address</p>
            <van-field
              v-model="form.userAddressEn"
              required
              placeholder="Please enter the company address"
              clearable
            />
          </div>
          <div class="companycheck">
            <p>{{$t('common.Certificate')}}</p>
            <van-uploader
              :before-read="(params)=>{return asyncBeforeRead(params, 3)}"
              @delete="(params)=> {return deletepic(params, 3)}"
              v-model="fileList_company"
              multiple
              :max-count="1"
            />
          </div>
        </div>
      </van-cell-group>
      <div class="commit">
        <button @click="submit">{{$t('common.Submit')}}</button>
    </div>-->
  </div>
</template>
<script>
let timeout;
export default {
  name: "usercheck",
  data() {
    return {
      content: "",
      title: "",
      successto: "",
      // success: false,
      // resultDesc: "",
      // openSimple: false,
      remindervisible: false,
      dad_text: this.$t("common.Reveiw"),
      form: {
        username: "",
        password: "",
        password2: ""
      },
      errors: {
        username: "",
        password: "",
        password2: ""
      },

      coutry_fetching: false,
      // switchon: false,
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
      fileList_front: [],
      fileList_back: [],
      userCountry: undefined,
      fileList_company: [],
      form_err: {
        userCountry: "",
        userIdentityType: "",
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
        userType: ""
      },
      form: {
        emailData: "",
        userCountry: "",
        userIdentityType: 1,
        userCountryEn: "",
        userCountryCh: undefined,
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
      createTime: "", //注册时间
      email_pic: "",
      bslEmail: "",
      value: null //change region result in uploadpic change
    };
  },
  computed: {
    // inputListeners: function() {
    //   var vm = this;
    //   // `Object.assign` 将所有的对象合并为一个新对象
    //   return Object.assign(
    //     {},
    //     // 我们从父级添加所有的监听器
    //     this.$listeners,
    //     // 然后我们添加自定义监听器，
    //     // 或覆写一些监听器的行为
    //     {
    //       // 这里确保组件配合 `v-model` 的工作
    //       blur: function(event) {
    //         console.log(event);
    //         vm.$emit("input", event);
    //       }
    //     }
    //   );
    // }
  },
  created() {
    this.form.userType = 1;
    this.getcountrylist("");
    this.$loading();
    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_web/user/getUserDetail`
      )
      .then(res => {
        this.$toast.clear();
        if (res.data.resultCode == 10000) {
          this.createTime = res.data.data.createTime;
          this.email_pic = res.data.data.picUrl || "";
          this.bslEmail = res.data.data.bslEmail || "";
        }
      });
    // this.validator = validator(this.rules, this.form);
  },

  destroyed() {
    clearTimeout(timeout);
    timeout = null;
  },
  watch: {
    "form.userType": {
      handler: function(val, oldVal) {
        if (val == 1) {
          this.form.userIdentityType = 2;
        }
      },
      // 深度观察
      deep: true
    }
  },
  methods: {
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
      console.log(index.name);
      file.status = "uploading";
      file.message = "上传中...";
      let uploadImg = await this.upLoaderImg(file.file);
      if (uploadImg.resultCode == 10000) {
        file.status = "done";
        file.message = "haole";
        let imgurl = uploadImg.data.url;
        let urlBase = uploadImg.data.urlBase;
        if (index.name == "identityPicOne") {
          this.fileList_front = [];
          this.form.identityPicOne = imgurl;
          this.fileList_front.push({ url: urlBase + imgurl });
        } else if (index.name == "identityPicTwo") {
          this.fileList_back = [];
          this.form.fileList_back = imgurl;
          this.fileList_back.push({ url: urlBase + imgurl });
        } else if (index.name == "userCompanyPic") {
          this.fileList_company = [];
          this.form.userCompanyPic = imgurl;
          this.fileList_company.push({ url: urlBase + imgurl });
        }
      } else {
        file.status = "failed";
        file.message = "haole";
      }
    },

    upLoaderImg(file) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("X_Token", this.$store.state.X_Token);
      return new Promise((resolve, reject) => {
        // this.$axios({
        //   method: "post",
        //   url: `${this.$axios.defaults.baseURL}/bsl_web/upload/pic`,
        //   data: formData,
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //   }
        // });
        this.$axios
          .post(
            `${this.$axios.defaults.baseURL}/bsl_web/upload/pic`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
          .then(res => {
            if (res.data.resultCode == 10000) {
              resolve(res.data);
            } else {
              this.$toast(res.data.resultDesc);
              reject(res.data);
            }
          });
      });
    },
    // deletepic(file, index) {
    //   if (index == 1) {
    //     this.form.identityPicOne = "";
    //   } else if (index == 2) {
    //     this.form.identityPicTwo = "";
    //   } else if (index == 3) {
    //     this.form.userCompanyPic = "";
    //   }
    // },
    identityChange(val) {
      console.log(123);

      this.fileList_front = [];
      this.fileList_back = [];
      this.fileList_company = [];
      this.form.identityPicOne = "";
      this.form.identityPicTwo = "";
      this.form.userCompanyPic = "";
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
    blur(event) {
      // event.preventDefault();
      console.log(1);

      // this.$global
      //   .singerValitator(event, this.form, this.rules)
      //   .then(res => {
      //     this.errors[event.target.name] = "";
      //   })
      //   .catch(e => {
      //     this.errors[event.target.name] = e.errors[0].message;
      //   });
    },
    // resetField(attrs) {
    //   attrs = !attrs ? Object.keys(this.form_err) : ( Array.isArray(attrs) ? attrs : [attrs]);
    //   attrs.forEach(attr => {
    //     this.form_err[attr] = ''
    //   })
    // },
    // validate(callback, data) {
    //   this.validator.validate((errors, fields) => {
    //     this.resetField();
    //     if (errors) {
    //       console.log(fields)
    //       fields.forEach(item => {
    //         // console.log(item)
    //         this.form_err[item.field] = item.message
    //       })
    //     }
    //     callback && callback(errors, fields)
    //   }, data);
    // },
    submit() {
      if (this.form.userIdentityType == 1) {
        if (this.form.userCountry == "") {
          this.$toast(this.$t("common.PleaseNationality"));
          return;
        } else if (this.form.userName == "") {
          this.$toast(this.$t("common.PleasePersonalName"));
          return;
        } else if (this.form.userIdentity == "") {
          this.$toast(this.$t("common.PleasePerCertificateNumber"));
          return;
        }
      } else if (this.form.userIdentityType == 2) {
        if (this.form.userCountry == "") {
          this.$toast(this.$t("common.PleaseNationality"));
          return;
        } else if (this.form.userCompanyEn == "") {
          this.$toast("Please enter company name");
          return;
        } else if (this.form.userAddressEn == "") {
          this.$toast("Please enter company address");
          return;
        }
      }
      // this.openSimple = true;

      this.commit();
      // this.validate((errors, fields) => {
      //   console.log(errors, fields)
      // })
    },
    closeSimple(issuccess) {
      this.openSimple = false;
      if (issuccess) {
        this.$router.replace({
          path: "/login" //跳转的路径
        });
      }
    },
    commit() {
      console.log(this.form);
      let userIdentityType;
      let userIdentityType_name;
      if (this.form.userIdentityType == 1) {
        userIdentityType = this.$t("common.individual");
        userIdentityType_name = this.form.userName;
      } else if (this.form.userIdentityType == 2) {
        userIdentityType = this.$t("common.company");
        userIdentityType_name = this.form.userCompanyEn;
      }

      let signuptime = this.createTime
        ? this.$global.timestampToTime(this.createTime)
        : "";
      let letter = `<meta charset="utf-8" />
                    <div class="content-wrap"
                         style="margin: 0px auto; overflow: hidden; padding: 0px; width: 500px;border:1px solid #cccccc;">
                      <div tindex="1" style="margin: 0px auto; max-width: 500px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                               style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
                          <tbody>
                          <tr>
                            <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
                                <tbody>
                                <tr>
                                  <td
                                    style="width: 100%; max-width: 100%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 500px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style="direction: ltr; width: 500px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top;">
                                            <div style="display: inline-block; vertical-align: top; width: 100%;">
                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                     style="vertical-align: top;">
                                                <tr>
                                                  <td
                                                    style="font-size: 0px; word-break: break-word; width: 500px; text-align: center; padding: 30px 0; ">
                                                    <div>
                                                      <img height="auto" alt="" width="180" height="200"
                                                           src="${this.email_pic}"
                                                           style="box-sizing: border-box; border: 0px; display: inline-block; outline: none; text-decoration: none; height: auto; max-width: 100%; padding: 0px;" />
                                                    </div>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div tindex="2" style="margin: 0px auto; max-width: 500px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                               style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
                          <tbody>
                          <tr>
                            <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
                                <tbody>
                                <tr>
                                  <td
                                    style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr;vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 150px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px;  color: lightcoral;font-size: 14px; font-weight: normal;'>
                                                    <div>提示：</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                  <td
                                    style="width: 66.6667%; max-width: 66.6667%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 320px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px 0 20px 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align:left; line-height: 20px;  color: lightcoral; font-size: 14px; font-weight: normal;'>
                                                    <div>您已收到新用户的个人信息提交，请尽快审核。</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div tindex="3" style="margin: 0px auto; max-width: 500px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                               style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
                          <tbody>
                          <tr>
                            <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
                                <tbody>
                                <tr>
                                  <td
                                    style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 150px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                                    <div>【注册时间】</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                  <td
                                    style="width: 66.6667%; max-width: 66.6667%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 320px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: left; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                                    <div> ${signuptime}</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div tindex="4" style="margin: 0px auto; max-width: 500px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                               style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
                          <tbody>
                          <tr>
                            <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
                                <tbody>
                                <tr>
                                  <td
                                    style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 150px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px 0;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                                    <div>【个人/公司名称】</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                  <td
                                    style="width: 66.6667%; max-width: 66.6667%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 320px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: left; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                                    <div>${userIdentityType_name}</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div tindex="5" style="margin: 0px auto; max-width: 500px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                               style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
                          <tbody>
                          <tr>
                            <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
                                <tbody>
                                <tr>
                                  <td
                                    style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 150px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                                    <div>【类型】</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                  <td
                                    style="width: 66.6667%; max-width: 66.6667%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 320px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: left; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                                    <div>${userIdentityType}</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div tindex="6" style="margin: 0px auto; max-width: 500px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                               style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
                          <tbody>
                          <tr>
                            <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
                                <tbody>
                                <tr>
                                  <td
                                    style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 150px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                                    <div>【注册邮箱】</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                  <td
                                    style="width: 66.6667%; max-width: 66.6667%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                                    <div class="full" style="margin: 0px auto; max-width: 500px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                             style="width: 320px;">
                                        <tbody>
                                        <tr>
                                          <td
                                            style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                                   style="vertical-align: top;">
                                              <tr>
                                                <td align="left" style="font-size: 0px; padding: 20px;">
                                                  <div class="text"
                                                       style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align:left; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                                    <div> ${this.bslEmail}</div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div tindex="7" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
              <td
                style="width: 100%; max-width: 100%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 500px;">
                    <tbody>
                    <tr>
                      <td align="center" vertical-align="middle"
                          style='font-size: 0px; word-break: break-word; width: 500px; padding: 30px 0; background-image: url(""); background-size: 100px; background-position: 10% 50%; background-repeat: no-repeat;'>
                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                               style="border-collapse: separate; line-height: 1;">
                          <tr>
                            <td align="center" bgcolor="#409EFF" valign="middle"
                                style="line-height: 1; background-color: rgb(64, 158, 255); border-radius:5px; cursor:pointer">
                              <a href="${this.$baseurl2}/#/login" class="button" style="text-decoration:none;">
                                <p
                                  style='font-family: "Microsoft YaHei"; margin: 0px;padding: 14px 54px; color: rgb(255, 255, 255); line-height: 1; font-size: 14px; font-weight: normal; text-decoration: none; text-transform: none;'>
                                  <span>登录PC后台管理系统台查看</span>
                                </p>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>`;
      this.form.emailData = letter;
      this.$loading();
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/submitAuth`,
          this.form
        )
        .then(res => {
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            this.successto = "login";
          }
          this.remindervisible = true;
          this.content = res.data.resultDesc;
        })
        .catch(err => {
          this.$toast.clear();
        });
    }
  }
};
</script>
<style lang="scss">
.mu-popover {
  max-height: vw(300);
}
.mu-option.is-selected .mu-item {
  color: #0ce5b2;
}
.mu-select-action {
  .mu-select-icon {
    width: vw(50);
    height: vw(50);
    color: #a8ace9;
  }
}
.mu-select-content {
  min-height: 0;
}

.mu-input-focus-line {
  // background-color: #0ce5b2;
  display: none;
}
.mu-input-line {
  display: none;
}
.mu-item-content {
  //  height: 100%;
}
.mu-list-dense .mu-item-title {
  font-size: vw(30);
  // height: 100%;
  // line-height: 100%;
}
.mu-list-dense .mu-item {
  height: vw(60);

  //  padding: vw(10) 0;
}
#usercheck {
  .mu-input-content {
    // height: vw(36);
  }
  .mu-select-input {
    color: #a8ace9;
    // font-size: vw(36);
    height: 100%;
    // line-height: vw(36);
  }
  .mu-input {
    display: block;
    font-size: vw(36);
    line-height: vw(36);
    margin-top: 0;
    margin-top: vw(15);
    margin-bottom: vw(15);
    padding: 0;
    min-height: 0;
    width: 100%;
  }
  .mu-input-label {
    color: #fff;
    font-size: vw(30);
  }

  .mu-input-label::before {
    content: "*";
    color: #0ce5b2;
    margin-right: vw(8);
  }
  .mu-text-field-input {
    color: #a8ace9;
  }

  .van-field__body {
    //  width: 100%;
    height: 1rem;
    // border: 0.02rem solid #ababab;
    border-radius: 3px;
    background: #f6f6f6;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  .van-field__control {
    font-size: 0.38rem;
    // padding: 0 0.2rem;
    height: 0.5rem;
    height: 100%;
  }
  .van-field__clear {
    font-size: 0.38rem;
  }
  .van-field {
    padding: 0;
  }

  .van-uploader__preview {
    margin: 0;
    width: 100%;

    // overflow: hidden;
  }
  .van-uploader__preview-image {
    margin: 0;
    border: 1px solid #ababab;

    width: 100%;
    height: vw(260);
    // height: 5rem;
    img {
      //  border-radius: 0.02rem;
      // border-radius: 0.1rem;
      height: 100%;
      width: 100%;
    }
  }
  .van-uploader {
    width: 100%;
    height: vw(260);
    margin-top: 2vw;
    margin-bottom: 2vw;
    display: block;
  }
  .van-uploader__wrapper {
    width: 100%;
    height: 100%;
  }

  .van-uploader__upload {
    width: 100%;
    // background: #f6f6f6;
    background: none;
    border: 0;
    height: vw(260);
    border: 1px solid #a8ace9;
    // margin: 0;
    border-radius: 3px;
    // box-sizing: border-box;
    .van-uploader__upload-icon {
      font-size: vw(36);
    }
  }
}
</style>
<style lang="scss" scoped>
#usercheck {
  height: 100%;
  // width: 80%;
  margin: 0 auto;

  .label {
    color: #fff;
    font-size: vw(30);
    // &::before {
    //   content: "*";
    //   color: #0ce5b2;
    //   margin-right: vw(8);
    //   // line-height: 1;
    //   vertical-align: middle;
    // }
  }
  .required::before {
    content: "*";
    color: #0ce5b2;
    margin-right: vw(8);
    // line-height: 1;
    vertical-align: middle;
  }

  .error {
    // height: vw(24);

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
    padding: 0 vw(36);
    padding-top: vw(146);
    form {
      width: 100%;
    }
    div.btn {
      margin-top: vw(80);
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
      text-align: center;
      width: vw(569);
      height: vw(75);
      background: #0ce5b2;
      border-radius: vw(20);
      font-size: vw(30);
      font-weight: bold;
      color: #2f36ac;
      line-height: vw(75);
    }
  }

  .usercheck {
    font-size: 0.38rem;

    .vanForm {
      div.nationality_position {
        position: relative;
      }
      > div {
        /*margin-bottom: 0.6rem;*/
        padding: 0 0.8rem;
        > p {
          margin-bottom: 0.1rem;
          font-size: 0.38rem;
        }
        > p::before {
          content: "*";
          color: #f56c6c;
          margin-right: 0.1rem;
        }
        footer {
          height: 0.4rem;
          color: #ee0a24;
        }
      }
    }
    div.identy_check {
      > div {
        /*margin-bottom: 0.8rem;*/
        > p {
          margin-bottom: 0.1rem;
          font-size: 0.38rem;
        }
      }
      .idcard_num p::before {
        content: "*";
        color: #f56c6c;
        margin-right: 0.1rem;
      }
    }
    div.gongsi {
      > div {
        margin-bottom: 0.4rem;
        > p {
          margin-bottom: 0.1rem;
          font-size: 0.38rem;
        }
      }
      .companyname,
      .company_address_eng {
        > p::before {
          content: "*";
          color: #f56c6c;
          margin-right: 0.1rem;
        }
      }
    }
    header {
      text-align: center;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.44rem 0 0.36rem 0;
      box-sizing: border-box;
    }
    .commit {
      padding: 0 0.8rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
      button {
        width: 8rem;
        color: white;
        border-radius: 5px;
        margin: 0.6rem 0;
        height: 1rem;
        background: #00adef;
      }
    }
  }
}
</style>
