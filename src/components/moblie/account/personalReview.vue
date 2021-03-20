<template>
  <div id="vip">
    <commonnav>
      {{ $t("Account.PersonalReview") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main v-if="optStatus === 0">
      <h2>{{ $t("common.YourInformationHasBeenSubmitted") }}</h2>
    </main>
    <main v-if="optStatus == 1 || optStatus == 2">
      <ul>
        <li class="mui-input-row input-row">
          <aside>{{ $t("common.Genus") }}:</aside>
          <p>
            <span>{{ formdata.userType }}</span>
          </p>
        </li>
        <li class="mui-input-row input-row">
          <aside>{{ $t("common.Identity") }}:</aside>
          <p>
            <span>{{ optionId[formdata.userIdentityType] }}</span>
          </p>
        </li>
        <li class="mui-input-row input-row">
          <aside>{{ $t("common.Nationality") }}:</aside>
          <p>
            <span v-if="$i18n.locale == 'zh_CN'">{{
              formdata.userCountryCh
            }}</span>
            <span v-else>{{ formdata.userCountryEn }}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType == 2 && this.$i18n.locale == 'en_US'"
          class="mui-input-row input-row"
        >
          <aside>{{ $t("common.CompanyName") }}:</aside>
          <p>
            <span>{{ formdata.userCompanyEn }}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType == 2 && this.$i18n.locale == 'zh_CN'"
          class="mui-input-row input-row"
        >
          <aside>{{ $t("common.CompanyName") }}:</aside>
          <p>
            <span>{{ formdata.userCompanyCh }}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType == 2 && this.$i18n.locale == 'en_US'"
          class="mui-input-row input-row"
        >
          <aside>{{ $t("common.CompanyAddress") }}:</aside>
          <p>
            <span>{{ formdata.userAddressEn }}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType == 2 && this.$i18n.locale == 'zh_CN'"
          class="mui-input-row input-row"
        >
          <aside>{{ $t("common.CompanyAddress") }}:</aside>
          <p>
            <span>{{ formdata.userAddressCh }}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType == 1"
          class="mui-input-row input-row"
        >
          <aside>{{ $t("common.PersonalName") }}:</aside>
          <p>
            <span>{{ formdata.userName }}</span>
          </p>
        </li>
        <li
          v-if="
            formdata.userIdentityType == 1 && formdata.userCountryEn == 'China'
          "
          class="mui-input-row input-row"
        >
          <aside>{{ $t("common.IdentificationNumber") }}:</aside>
          <p>
            <span>{{ formdata.userIdentity }}</span>
          </p>
        </li>
        <li
          v-else-if="formdata.userIdentityType == 1"
          class="mui-input-row input-row"
        >
          <aside>{{ $t("common.passport") }}:</aside>
          <p>
            <span>{{ formdata.userIdentity }}</span>
          </p>
        </li>
        <li
          v-if="
            formdata.userIdentityType == 1 &&
            formdata.userCountryEn == 'China' &&
            formdata.identityPicOne
          "
          class="pic"
        >
          <aside>{{ $t("common.IdentificationNumber") }}:</aside>
          <!-- <van-uploader v-model="fileList" :deletable="false" /> -->
          <img :src="$axios.defaults.baseURL + formdata.identityPicOne" alt />
          <img :src="$axios.defaults.baseURL + formdata.identityPicTwo" alt />
        </li>
        <li
          v-else-if="formdata.userIdentityType == 1 && formdata.identityPicOne"
          class="pic"
        >
          <aside>{{ $t("common.passport") }}:</aside>
          <img :src="$axios.defaults.baseURL + formdata.identityPicOne" alt />
        </li>
        <li
          v-if="formdata.userIdentityType == 2 && formdata.userCompanyPic"
          class="pic"
        >
          <aside>{{ $t("common.Certificate") }}:</aside>
          <img :src="$axios.defaults.baseURL + formdata.userCompanyPic" alt />
        </li>
      </ul>
      <h2 v-if="optStatus == 2">
        <h3>{{ $t("common.YourReviewFailed") }}</h3>
        <p v-for="(item, idx) in formdata.optRemark" :key="item">
          {{ idx + 1 }}.{{ item }}
        </p>
      </h2>
      <footer v-if="optStatus == 2">
        <van-button @click="$routerto('verify',{again:1})">{{
          $t("common.ApplyAgain")
        }}</van-button>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {
      optStatus: null, //verify 0 pending 1 success 2 failed
      optionType: [
        { text: this.$t("common.ProjectParty"), value: 1 },
        { text: this.$t("common.Middleman"), value: 4 },
        { text: this.$t("common.Investor"), value: 3 },
      ],
      optionId: {
        1: this.$t("common.individual"),
        2: this.$t("common.company"),
      },
      // optionId: [
      //   { text: this.$t("common.individual"), value: 1 },
      //   { text: this.$t("common.company"), value: 2 }
      // ],
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
        userType: null,
        optRemark: "",
        // X_Token: this.$store.state.X_Token
        // identity: ""
      },
    };
  },
  created() {
    // console.log();

    this.getAuthDetails();
  },
  methods: {
    getAuthDetails() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/getAuthDetails`
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode === 10000) {
            this.optStatus = res.data.data.optStatus;
            // this.optStatus = 2;
            for (let key in res.data.data) {
              for (let k in this.formdata) {
                if (key == k) {
                  if (key == "userType") {
                    this.optionType.forEach((element) => {
                      if (res.data.data[key] === element.value) {
                        this.formdata[k] = element.text;
                      }
                    });
                  } else if (
                    key == "userCompanyPic" ||
                    key == "identityPicOne" ||
                    key == "identityPicTwo"
                  ) {
                    this.formdata[k] = res.data.data[key];
                    // console.log(this.formdata[k]);
                  } else if (key == "optRemark") {
                    if (this.$global.isJSON(res.data.data[key])) {
                      let a = JSON.parse(res.data.data[key]);
                      if (this.$i18n.locale == "zh_CN") {
                        this.formdata[k] = a.chinese;
                      } else {
                        this.formdata[k] = a.eng;
                      }
                    } else {
                      this.formdata[k] = res.data.data[key].split(",");
                    }
                  } else {
                    this.formdata[k] = res.data.data[key];
                  }
                }
              }
            }
          }

          console.log(this.formdata);
        });
    },
    // handleleterClick() {},
  },
};
</script>

<style lang="scss" scoped>
#vip {
  main {
    padding: vw(140) vw(60) vw(116);
    h2 {
      padding-top: vw(150);
      margin-bottom: vw(20);
      color: #4f3dad;
      font-size: vw(50);
      h3 {
        font-weight: bold;
        font-size: vw(50);
        color: #4f3dad;
        text-align: center;
      }
      p {
        font-weight: bold;
        font-size: vw(30);
        color: #4f3dad;
      }
    }
    ul {
      li {
        font-size: vw(30);
        font-family: Helvetica Neue;
        font-weight: bold;
        color: #4f3dad;
        opacity: 1;
        margin-bottom: vw(40);
        display: flex;
        flex-wrap: wrap;
        aside {
          margin-right: vw(10);
          // line-height: vw(34);
        }
      }
      li.pic {
        display: flex;
        flex-direction: column;
        margin-bottom: vw(40);
        aside {
          margin-bottom: vw(40);
        }
        img {
          width: 100%;
          height: vw(288);
          border: vw(2) dashed #4f3dad;
          opacity: 1;
        }
        img:nth-of-type(2) {
          margin-top: vw(66);
        }
      }
    }
    footer {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: vw(20);
        color: #00f0ab;

        text-decoration: underline;
        margin-bottom: vw(32);
      }
      button {
        min-width: vw(186);
        height: vw(72);
        background: #00f0ab;
        border-radius: vw(16);
        font-size: vw(26);
        line-height: vw(72);
        color: #ffffff;
      }
      button:nth-of-type(1) {
        margin-bottom: vw(30);
      }
    }
  }
}
</style>
