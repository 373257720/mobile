<template>
  <div id="usercheck">
    <div class="usercheck">
      <header>{{$t('common.Reveiw')}}</header>
      <van-cell-group class="vanForm">
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
            >
            </van-dropdown-item>
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
            <van-dropdown-item
              v-else
              v-model="form.userIdentityType"
              :options="option2"
            />
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
              <!-- :filterOption="filterOption" -->
              <a-spin
                v-if="coutry_fetching"
                slot="notFoundContent"
                size="small"
              />
              <a-select-option
                v-for="d in countrylist"
                :key="d.remark"
                :value="d.value + 1"
                >
                <span style="margin-right: 0.1rem">{{d.eng}}</span><span>{{d.chinese}}</span>
               </a-select-option>
<!--              {{$i18n.locale=='zh_CN'?d.chinese:d.eng}}-->
            </a-select>
          </div>
          <!-- <van-dropdown-menu>
              <van-dropdown-item v-model="form.userCountry" @change="nation" :options="countrylist" />
            </van-dropdown-menu> -->
          <footer>{{ form_err.userCountry }}</footer>
        </div>
        <div
          class="identy_check"
          v-show="form.userIdentityType == 2 ? false : true"
        >
          <div class="idcard_num">
            <p>{{$t('common.PersonalName')}}</p>
            <van-field v-model="form.userName"   :placeholder="$t('ContractWrods.pleaseEnter')" clearable />
            <footer>{{ form_err.userName }}</footer>
          </div>
          <!-- this.form.userCountry=this.countrylist[value].remark; -->
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
            <p>{{ switchon == true ?  $t('common.IDCardFront') : $t('common.passport')  }}</p>
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
            <van-field
              v-model="form.userCompanyCh"
              placeholder="请输入公司名称"
              clearable
            />
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
            <van-field
              v-model="form.userAddressCh"
              placeholder="请输入公司地址"
              clearable
            />
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
        <!--        </vantForm>-->
      </van-cell-group>
      <div class="commit">
        <button @click="submit">{{$t('common.Submit')}}</button>
      </div>
    </div>

  </div>
</template>
<script>
let timeout;
export default {
  name: "usercheck",
  components: {
    // VantForm
  },
  data() {
    return {
      coutry_fetching: false,
      switchon: false,
      countrylist: [],
      option1: [
        { text: this.$t('common.ProjectParty'), value: 1 },
        { text: this.$t('common.Middleman'),  value: 4 },
        { text: this.$t('common.Investor'), value: 3 }
      ],
      option2: [
        { text: this.$t('common.individual'), value: 1 },
        { text:this.$t('common.company'), value: 2 }
      ],
      fileList_front: [],
      fileList_back: [],
      userCountry:undefined,
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
        userType: null,
        X_Token:this.$store.state.X_Token
        // identity: ""
      },
      createTime: "", //注册时间
      email_pic: "",
      bslEmail: "",
      value:null, //change region result in uploadpic change
    };
  },
  created() {
    this.form.userType = 1;
    this.ulHtml("");
    this.$loading();
    this.$global
      .get_encapsulation(`${this.$baseurl}/bsl_web/user/getUserDetail`)
      .then(res => {
        this.$toast.clear();
        if (res.data.resultCode == 10000) {
          this.createTime = res.data.data.createTime;
          this.email_pic = res.data.data.picUrl ? res.data.data.picUrl : "";
          this.bslEmail = res.data.data.bslEmail ? res.data.data.bslEmail : "";
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
          // console.log(this)
          this.form.userIdentityType = 2;
        }
      },
      // 深度观察
      deep: true
    }
  },
  methods: {
    deletepic(file,index){
      if (index == 1) {
        this.form.identityPicOne = '';
      } else if (index == 2) {
        this.form.identityPicTwo = '';
      } else if (index == 3) {
        this.form.userCompanyPic = '';
      }
    },
    signer_submit(params, userType) {
      this.fileList_front=[];
      this.fileList_back=[];
      this.fileList_company= [];
      this.form.identityPicOne = '';
      this.form.identityPicTwo = '';
      this.form.userCompanyPic = '';
    },
    search(val) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(this.ulHtml(val), 300);
    },
    handleChange(value) {
      if(this.value!==value){
        this.fileList_front=[];
        this.fileList_back=[];
        this.fileList_company= [];
        this.form.identityPicOne = '';
        this.form.identityPicTwo = '';
        this.form.userCompanyPic = '';
        this.value=value;
      }
      if (this.countrylist[value - 1].remark === "CHN") {
        this.switchon = true;
        this.form.identityType = 1; //身份证
      } else {
        this.switchon = false;
        this.form.identityType = 2; //护照
      }
      this.userCountry=this.$i18n.locale=='zh_CN'?this.countrylist[value - 1].chinese:this.countrylist[value - 1].eng;
      this.form.userCountry = this.countrylist[value - 1].remark;
      this.form.userCountryEn = this.countrylist[value - 1].eng;
      this.form.userCountryCh = this.countrylist[value - 1].chinese;
      this.coutry_fetching = false;
      // console.log(this.form)
    },
    ulHtml(val) {
      this.countrylist = [];
      let arr = [];
      this.coutry_fetching = true;
        this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/base/countryList.do`,
          {
            searchKey:val,
          })
        .then(res => {
          if (res.data.data.length > 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              arr.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                value: i,
                remark: res.data.data[i].countryCode
              });
            }
            this.countrylist = arr;
          }
          this.coutry_fetching = false;
        });
      // console.log(this.countrylist)
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
          this.$toast( this.$t('common.PleaseNationality'));
          return;
        } else if (this.form.userName == "") {
          this.$toast( this.$t('common.PleasePersonalName'));
          return;
        } else if (this.form.userIdentity == "") {
          this.$toast( this.$t('common.PleasePerCertificateNumber'));
          return;
        }
        // else if (this.form.userCountry == "CHN") {
        //   if (this.fileList_front.length == 0) {
        //     this.$toast("请上传身份证正面");
        //     return;
        //   } else if (this.fileList_back.length == 0) {
        //     this.$toast("请上传身份证反面");
        //     return;
        //   }
        // } else if (this.form.userCountry != "CHN") {
        //   if (this.fileList_front.length == 0) {
        //     this.$toast("请上传护照");
        //     return;
        //   }
        // }
      } else if (this.form.userIdentityType == 2) {
        if (this.form.userCountry == "") {
          this.$toast( this.$t('common.PleaseNationality'));
          return;
        } else if (this.form.userCompanyEn == "") {
          this.$toast("Please enter company name");
          return;
        } else if (this.form.userAddressEn == "") {
          this.$toast("Please enter company address");
          return;
        }
        // else if (this.fileList_company.length == 0) {
        //   this.$toast("请上传公司证书");
        //   return;
        // }
      }
      this.commit();
      // this.validate((errors, fields) => {
      //   console.log(errors, fields)
      // })
    },
    // nation(value) {
    //   console.log(value);
    //   if (value == 2) {
    //     this.switchon = true;
    //     this.form.identityType = 1; //身份证
    //   } else {
    //     this.switchon = false;
    //     this.form.identityType = 2; //护照
    //   }
    //   this.form.userCountryEn = this.countrylist[value].countryEnname;
    //   this.form.userCountryCh = this.countrylist[value].countryZhname;
    // },
    // 返回 Promise

    asyncBeforeRead(file, index) {
      if (file.type !== "image/jpeg") {
        this.$toast(this.$t('common.UploadJPG'));
        return false;
      }
      let formData = new FormData();
      formData.append("file", file);
      this.$loading();
      return new Promise((resolve, reject) => {
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/bsl_web/upload/pic.do`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then(res => {
            this.$toast.clear();
            if (res.data.resultCode == 10000) {
              var imgurl = res.data.data.url;
              console.log(imgurl);
              if (index == 1) {
                this.form.identityPicOne = imgurl;
              } else if (index == 2) {
                this.form.identityPicTwo = imgurl;
              } else if (index == 3) {
                this.form.userCompanyPic = imgurl;
              }
              resolve(true);
            } else {
              this.$toast(res.data.resultDesc);
              reject(res.data.resultDesc);
            }
          })
          .catch(err => {
            this.$toast("系统异常");
            reject(err);
          });
      });
      // return true;
      // this.$axios({
      //   method: "post",
      //   url: `${this.$baseurl}/bsl_web/upload/pic.do`,
      //   data: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   }
      // }).then(res => {
      //   if(res.data.resultCode==10000){
      //     var imgurl = res.data.data.url;
      //     console.log(imgurl);
      //     if (index == 1) {
      //       this.form.identityPicOne = imgurl;
      //     } else if (index == 2) {
      //       this.form.identityPicTwo = imgurl;
      //     } else if (index == 3) {
      //       this.form.userCompanyPic = imgurl;
      //     }
      //
      //   }else{
      //     this.$toast(res.data.resultDesc);
      //   }
      //   // console.log(this.form.userCompanyPic);
      // });
      // return true;
    },
    commit() {
      console.log(this.form);
      let userIdentityType;
      let userIdentityType_name;
      if (this.form.userIdentityType == 1) {
        userIdentityType = this.$t('common.individual');
        userIdentityType_name = this.form.userName;
      } else if (this.form.userIdentityType == 2) {
        userIdentityType =  this.$t('common.company');
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
      this.form.emailData =letter;
      this.$loading();
        this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/user/submitAuth`,this.form
        )
        .then(res => {
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            this.$dialog
              .alert({
                title: res.data.resultDesc
                // message: "点"
              })
              .then(() => {
                this.$router.replace({
                  //核心语句
                  path: "/login" //跳转的路径
                });
              });
            // this.success = !this.success;
          } else {
            this.$dialog
              .alert({
                title: res.data.resultDesc
              })
              .then(() => {});
          }
        })
        .catch(err => {
          this.$toast.clear();
        });
    }
  }
};
</script>
<style lang="scss">
#usercheck {
  .ant-select-dropdown-menu {
    max-height: 4rem;
  }
  .ant-select {

    width: 100%;
    border: 1px solid #ababab;
    border-radius: 3px;
    font-size: 0.38rem;
    color: #323233;
    .ant-select-selection__placeholder,
    .ant-select-search__field__placeholder {
      color: #969799;
    }

    .ant-select-selection {
      padding: 0 0.2rem;
      //  border: 1px solid #ababab;
      background: #f6f6f6;
      box-shadow: none;
    }
    .ant-select-selection--single {
      height: 100%;
    }
    .ant-select-selection__rendered {
      margin: 0;
    }
    .ant-select-selection {
      border: 0;

    }
  }
  // background: white;
  .van-cell {
    font-size: 0.38rem;
    padding: 0 1.05rem;
    line-height: 1rem;
    // padding: 0;
  }
  .van-dropdown-menu__title {
    font-size: 0.38rem;
    width: 100%;
    // text-align: left;
  }
  .van-cell__value--alone {
    .van-field__body {
      border: 1px solid #ababab;
    }

  }
  .van-dropdown-menu__item {
    // display:inline;
    justify-content: left;
    width: 100%;
    flex: none;
  }
  .van-dropdown-menu {
    height: 1rem;
    border-radius: 0.05rem;
    border: 1px solid #ababab;
    background: #f6f6f6;
  }

  .van-dropdown-menu {
    height: 1rem;
    border-radius: 3px;
    border: 1px solid #ababab;
    background: #f6f6f6;
  }
  .isactive {
    border-color: #ee0a24;
  }
  .issort {
    border-color: #ababab;
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
    height: 5rem;
    img {
      //  border-radius: 0.02rem;
      // border-radius: 0.1rem;
      height: 100%;
      width: 100%;
    }
  }
  .van-uploader {
    width: 100%;
    height: 5rem;

    display: block;
    margin-bottom: 0;
  }
 .van-uploader__wrapper{
     width: 100%;
     height: 100%;
   }

  .van-uploader__upload {
    width: 100%;
    background: #f6f6f6;
    border: 0;
    height: 5rem;
    border: 1px solid #ababab;
    margin: 0;

    border-radius: 3px;
    // box-sizing: border-box;
    .van-uploader__upload-icon {
      font-size: 0.5rem;
    }
  }
  // .van-uploader__input{
  //   height: 3.3rem;
  // }
  .van-dropdown-menu__title::after {
    right: 0.5rem;
  }
  .van-hairline--top-bottom::after {
    border: 0;
  }
  .van-dropdown-menu__title--down::after {
    right: 0.5rem;
  }
}
</style>

<style lang="scss" scoped>
#usercheck {
  height: 100%;
  // width: 80%;
  margin: 0 auto;

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
      .company_address_eng, {
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
