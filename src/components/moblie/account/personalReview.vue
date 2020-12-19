<template>
  <div id="vip">
    <commonnav>
      personal Review
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <ul>
        <li class="mui-input-row input-row">
          <aside>{{$t('common.Genus')}}:</aside>
          <p>
            <span>{{formdata.userType}}</span>
          </p>
        </li>
        <li class="mui-input-row input-row">
          <aside>{{$t('common.Identity')}}:</aside>
          <p>
            <span>{{optionId[formdata.userIdentityType] }}</span>
          </p>
        </li>
        <li class="mui-input-row input-row">
          <aside>{{$t('common.Nationality')}}:</aside>
          <p>
            <span>{{formdata.userCountryEn}}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType==2 && this.$i18n.locale=='en_US'"
          class="mui-input-row input-row"
        >
          <aside>{{$t('common.CompanyName')}}:</aside>
          <p>
            <span>{{formdata.userCompanyEn}}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType==2 && this.$i18n.locale=='zh_CN'"
          class="mui-input-row input-row"
        >
          <aside>{{$t('common.CompanyName')}}:</aside>
          <p>
            <span>{{formdata.userCompanyCh}}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType==2 && this.$i18n.locale=='en_US'"
          class="mui-input-row input-row"
        >
          <aside>{{$t('common.CompanyAddress')}}:</aside>
          <p>
            <span>{{formdata.userAddressCh}}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType==2 && this.$i18n.locale=='zh_CN'"
          class="mui-input-row input-row"
        >
          <aside>{{$t('common.CompanyAddress')}}:</aside>
          <p>
            <span>{{formdata.userAddressEn}}</span>
          </p>
        </li>
        <li v-if="formdata.userIdentityType==1" class="mui-input-row input-row">
          <aside>{{$t('common.PersonalName')}}:</aside>
          <p>
            <span>{{formdata.userName}}</span>
          </p>
        </li>
        <li
          v-if="formdata.userIdentityType==1 && formdata.userCountryEn=='China'"
          class="mui-input-row input-row"
        >
          <aside>{{$t('common.IdentificationNumber')}}:</aside>
          <p>
            <span>{{formdata.userIdentity}}</span>
          </p>
        </li>
        <li v-else-if="formdata.userIdentityType==1" class="mui-input-row input-row">
          <aside>{{$t('common.passport')}}:</aside>
          <p>
            <span>{{formdata.userIdentity}}</span>
          </p>
        </li>
        <li v-if="formdata.userIdentityType==1 && formdata.userCountryEn=='China'" class="pic">
          <aside>{{$t('common.IdentificationNumber')}}:</aside>
          <img :src="formdata.identityPicOne" alt />
        </li>
        <li v-else-if="formdata.userIdentityType==1" class="pic">
          <aside>{{$t('common.passport')}}:</aside>
          <img :src="formdata.identityPicTwo" alt />
        </li>
        <li v-if="formdata.userIdentityType==2" class="pic">
          <aside>{{$t('common.Certificate')}}:</aside>
          <img :src="formdata.userCompanyPic" alt />
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {
      optionType: [
        { text: this.$t("common.ProjectParty"), value: 1 },
        { text: this.$t("common.Middleman"), value: 4 },
        { text: this.$t("common.Investor"), value: 3 }
      ],
      optionId: {
        1: this.$t("common.individual"),
        2: this.$t("common.company")
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
        userType: null
        // X_Token: this.$store.state.X_Token
        // identity: ""
      }
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
        .then(res => {
          this.$store.commit("isloading", false);
          for (let key in res.data.data) {
            for (let k in this.formdata) {
              if (key == k) {
                if (key == "userType") {
                  this.optionType.forEach(element => {
                    if (res.data.data[key] === element.value) {
                      this.formdata[k] = element.text;
                    }
                  });
                } else if (
                  key == "userCompanyPic" ||
                  key == "identityPicOne" ||
                  key == "identityPicTwo"
                ) {
                  this.formdata[k] =
                    this.$axios.defaults.baseURL + res.data.data[key];
                  console.log(this.formdata[k]);
                } else if (key == "userCountryEn") {
                  this.formdata[k] =
                    this.$i18n.locale == "zh_CH"
                      ? res.data.data["userCountry"]
                      : res.data.data["userCountryEn"];
                } else {
                  this.formdata[k] = res.data.data[key];
                }
              }
            }
          }
        });
    }
    // handleleterClick() {},
  }
};
</script>

<style lang="scss" scoped>
#vip {
  main {
    padding: vw(140) vw(60) vw(116);
    ul {
      li {
        font-size: vw(30);
        font-family: Helvetica Neue;
        font-weight: bold;
        line-height: vw(34);
        color: #4f3dad;
        opacity: 1;
        margin-bottom: vw(40);
        display: flex;
        flex-wrap: wrap;
        aside {
          margin-right: vw(10);
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
          border: vw(4) dashed #4f3dad;
          opacity: 1;
        }
        img:nth-of-type(2) {
          margin-top: vw(66);
        }
      }
    }
  }
}
</style>
