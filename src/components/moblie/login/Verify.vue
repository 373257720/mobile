<template>
  <div id="Verify">
    <div class="usercheck">
      <commonnav>
        {{ $t("common.Verify") }}
        <template v-slot:arrowLeft>
          <van-icon name="arrow-left" @click="$global.previous()" />
        </template>
      </commonnav>
      <main class="main">
        <form ref="form" @submit.prevent="submit_click">
          <div class="mui-input-row input-row">
            <p class="label need">{{ $t("common.Genus") }}</p>
            <p class="select" @click="goto('genus')">
              <span>{{ validateForm.genus && validateForm.genus.text }}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label need">{{ $t("common.Identity") }}</p>
            <p class="select" @click="goto('identity')">
              <span>{{
                validateForm.identity && validateForm.identity.text
              }}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div class="mui-input-row input-row">
            <p class="label need">{{ $t("common.Nationality") }}</p>
            <p class="select" @click="goto('nationality')">
              <span>{{
                validateForm.nation && validateForm.nation.lable
              }}</span>
              <van-icon name="arrow" />
            </p>
          </div>
          <div
            v-if="validateForm.identity.value === 2"
            class="mui-input-row input-row"
          >
            <p class="label need">{{ $t("common.CompanyName") }} (English)</p>
            <input
              name="confirmpassword"
              autocomplete="off"
              v-model="formdata.userCompanyEn"
            />
          </div>
          <div
            v-if="validateForm.identity.value === 2"
            class="mui-input-row input-row"
          >
            <p class="label">{{ $t("common.CompanyName") }}(Chinese)</p>
            <input
              name="confirmpassword"
              autocomplete="off"
              v-model="formdata.userCompanyCh"
            />
          </div>
          <div
            v-if="validateForm.identity.value === 2"
            class="mui-input-row input-row"
          >
            <p class="label need">{{ $t("common.CompanyAddress") }}(English)</p>
            <input
              name="confirmpassword"
              autocomplete="off"
              v-model="formdata.userAddressEn"
            />
          </div>
          <div
            v-if="validateForm.identity.value === 2"
            class="mui-input-row input-row"
          >
            <p class="label">{{ $t("common.CompanyAddress") }}(Chinese)</p>
            <input
              name="confirmpassword"
              autocomplete="off"
              v-model="formdata.userAddressCh"
            />
          </div>
          <div
            v-if="validateForm.identity.value === 1"
            class="mui-input-row input-row"
          >
            <p class="label need">{{ $t("common.PersonalName") }}</p>
            <input
              name="confirmpassword"
              autocomplete="off"
              v-model="formdata.userName"
            />
          </div>
          <div
            v-if="
              validateForm.identity.value === 1 &&
              validateForm.nation &&
              validateForm.nation.remark === 'CHN'
            "
            class="mui-input-row input-row"
          >
            <p class="label need">{{ $t("common.IdentificationNumber") }}</p>
            <input
              name="confirmpassword"
              autocomplete="off"
              v-model="formdata.userIdentity"
            />
          </div>
          <div
            v-if="
              validateForm.identity.value === 1 &&
              validateForm.nation &&
              validateForm.nation.remark !== 'CHN'
            "
            class="mui-input-row input-row"
          >
            <p class="label need">{{ $t("common.passport") }}</p>
            <input
              name="confirmpassword"
              autocomplete="off"
              v-model="formdata.userIdentity"
            />
          </div>
          <div
            class="mui-input-row input-row"
            v-if="
              validateForm.identity.value === 1 &&
              validateForm.nation &&
              validateForm.nation.remark !== 'CHN'
            "
          >
            <p class="label">{{ $t("common.passport") }}</p>
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
            v-if="
              validateForm.identity.value === 1 &&
              validateForm.nation &&
              validateForm.nation.remark === 'CHN'
            "
          >
            <p class="label">{{ $t("common.IDCardFrontandBack ") }}</p>
            <van-uploader
              class="uploaderFirst"
              upload-icon="plus"
              name="idFront"
              v-model="fileList_front"
              :after-read="afterRead"
              max-count="1"
            />
            <van-uploader
              upload-icon="plus"
              name="idBack"
              v-model="fileList_back"
              :after-read="afterRead"
              max-count="1"
            />
          </div>
          <div
            class="mui-input-row input-row"
            v-if="validateForm.identity.value === 2"
          >
            <p class="label">{{ $t("common.Certificate") }}</p>
            <van-uploader
              upload-icon="plus"
              name="userCompanyPic"
              v-model="fileList_company"
              :after-read="afterRead"
              max-count="1"
            />
          </div>
          <!-- <p class="error">{{errorsMsg}}</p> -->
          <footer>
            <button class="button is-primary" type="submit">
              {{ $t("common.Submit") }}
            </button>
          </footer>
        </form>
      </main>
    </div>
    <transition name="slide-fade">
      <keep-alive>
        <div
          class="secondLayer"
          @fromKids="pick"
          :usercheck="validateForm"
          :is="currentView"
        ></div>
      </keep-alive>
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
import layer from "@/components/moblie/common/layer";
export default {
  data() {
    return {
      loaded: false,
      remindervisible: false,
      errormsg: "",
      validateForm: {
        genus: {
          text: "",
          value: null,
        },
        identity: { text: "", value: null },
        nation: {},
      },
      formdata: {
        emailData: "",
        userCountry: "",
        userIdentityType: null, // person or company
        userCountryEn: "",
        userCountryCh: "",
        userIdentity: "",
        userName: "",
        identityType: "", // user id card type
        identityPicOne: "",
        identityPicTwo: "",
        userCompanyCh: "",
        userCompanyEn: "",
        userAddressCh: "",
        userAddressEn: "",
        userCompanyPic: "",
        userType: null, //user type
        // X_Token: this.$store.state.X_Token
        // identity: ""
      },
      // isshow: true,
      currentView: "",
      transitionName: "",
      errorsMsg: "",
      fileList_company: [],
      fileList_front: [],
      fileList_back: [],
    };
  },
  components: {
    "v-scroll": Scroll,
    genus: genus,
    nationality: nationality,
    identity: identity,
    layer: layer,
  },
  watch: {
    isshow: function (a, b) {
      if (a) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
      // console.log(this.transitionName);
    },
  },
  computed: {
    isdisabled() {
      if (this.validateForm.Genus && this.validateForm.Identity) {
        return false;
      } else {
        return true;
      }
    },
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
        // console.log(this.validateForm.nation);
        if (this.validateForm.nation.remark === "CHN") {
          this.formdata.identityType = 1; //身份证
        } else {
          this.formdata.identityType = 2; //护照
        }
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
      this.loaded = true;
      this.$store.commit("isloading", true);
      let userIdentityType;
      let userIdentityType_name;
      // if (this.form.userIdentityType == 1) {
      //   userIdentityType = this.$t("common.individual");
      //   userIdentityType_name = this.form.userName;
      // } else if (this.form.userIdentityType == 2) {
      //   userIdentityType = this.$t("common.company");
      //   userIdentityType_name = this.form.userCompanyEn;
      // }
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
                                    <a href="${process.env.backStageUrl}" class="button testurlzz" style="text-decoration:none;">
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
      this.formdata.emailData = letter;
      this.formdata.userCountryCh = this.validateForm.nation.chinese;

      this.formdata.userCountryEn = this.validateForm.nation.eng;

      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/submitAuth`,
          this.formdata
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            this.$dialog
              .alert({
                title: res.data.resultDesc,
                // message: "点"
              })
              .then(() => {
                this.$router.replace({
                  //核心语句
                  path: "/login", //跳转的路径
                });
              });
            // this.success = !this.success;
          } else {
            this.$dialog
              .alert({
                title: res.data.resultDesc,
              })
              .then(() => {});
          }
        });

      // this.errormsg = "成功";
      // this.remindervisible = true;
      // this.$routerto("signContractStep2");
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      validator.add(self.formdata.userType, [
        [
          "isNotEmpty",
          self.$t("common.Genus") + this.$t("VerifyMsg.isnotempty"),
        ],
      ]);
      validator.add(self.formdata.userIdentityType, [
        [
          "isNotEmpty",
          this.$t("common.Identity") + this.$t("VerifyMsg.isnotempty"),
        ],
      ]);
      validator.add(self.formdata.userCountry, [
        [
          "isNotEmpty",
          this.$t("common.Nationality") + this.$t("VerifyMsg.isnotempty"),
        ],
      ]);
      if (self.validateForm.identity.value === 1) {
        validator.add(self.formdata.userName, [
          [
            "isNotEmpty",
            this.$t("common.PersonalName") + this.$t("VerifyMsg.isnotempty"),
          ],
        ]);
        if (
          self.validateForm.nation &&
          self.validateForm.nation.remark === "CHN"
        ) {
          validator.add(self.formdata.userIdentity, [
            [
              "isNotEmpty",
              this.$t("common.IdentificationNumber") +
                +this.$t("VerifyMsg.isnotempty"),
            ],
          ]);
        } else if (
          self.validateForm.nation &&
          self.validateForm.nation.remark !== "CHN"
        ) {
          validator.add(self.formdata.userIdentity, [
            [
              "isNotEmpty",
              this.$t("common.passport") + this.$t("VerifyMsg.isnotempty"),
            ],
          ]);
        }
      } else if (self.validateForm.identity.value === 2) {
        validator.add(self.formdata.userCompanyEn, [
          [
            "isNotEmpty",
            this.$t("common.CompanyName") + this.$t("VerifyMsg.isnotempty"),
          ],
        ]);
        validator.add(self.formdata.userAddressEn, [
          [
            "isNotEmpty",
            this.$t("common.CompanyAddress") + this.$t("VerifyMsg.isnotempty"),
          ],
        ]);
      }
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },

    async afterRead(file, index) {
      file.status = "uploading";
      file.message = "上传中...";
      let uploadImg = await this.upLoaderImg(file.file);
      if (uploadImg && uploadImg.data.resultCode == 10000) {
        file.status = "done";
        file.message = "haole";
        let imgurl = uploadImg.data.data.url;
        let urlBase = uploadImg.data.data.urlBase;
        if (index.name == "passport" || index.name == "idFront") {
          this.fileList_front = [];
          this.formdata.identityPicOne = imgurl;
          this.fileList_front.push({ url: urlBase + imgurl });
        } else if (index.name == "idBack") {
          this.fileList_back = [];
          this.formdata.identityPicTwo = imgurl;
          this.fileList_back.push({ url: urlBase + imgurl });
        } else if (index.name == "userCompanyPic") {
          this.fileList_company = [];
          this.formdata.userCompanyPic = imgurl;
          this.fileList_company.push({ url: urlBase + imgurl });
          // console.log(this.fileList_company);
        }
      } else {
        file.status = "failed";
        file.message = "failed";
      }
    },
    upLoaderImg(file) {
      if (file.type !== "image/jpeg") {
        this.$toast(this.$t("common.UploadJPG"));
        return false;
      }
      let formData = new FormData();
      formData.append("file", file);
      formData.append("X_Token", this.$store.state.X_Token);
      return new Promise((resolve, reject) => {
        this.$axios({
          method: "post",
          url: `${this.$axios.defaults.baseURL}/bsl_web/upload/pic`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            // "application/x-www-form-urlencoded"
          },
        }).then((res) => {
          if (res.data.resultCode == 10000) {
            resolve(res);
          } else {
            reject(false);
          }
        });
      });
    },
  },
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
  .yo-scroll {
    .loadmore {
      top: 50px;
    }
  }
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
  // position: relative;
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