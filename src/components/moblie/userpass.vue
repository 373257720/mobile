<template>
  <div id="userpass">
    <header>
      <van-icon name="arrow-left" @click="$global.previous()" />
      <commonnav :msg="dad_text"></commonnav>
    </header>
    <main class="userpass2" v-if="optStatus===0">
      <h2>
        <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>{{$t('common.YourInformationHasBeenSubmitted')}}</section>
      <nav class="backbtn"></nav>
    </main>
    <main v-if="optStatus==1 || optStatus==2">
    <h2 v-if="optStatus==2">{{$t('common.YourReviewFailed')}}</h2>
      <ul>
        <li>
          <p>{{$t('common.Category')}}:</p>
          <div>{{form.userType}}</div>
        </li>
        <li>
          <p>{{$t('common.Identity')}}:</p>
          <div>{{form.userIdentityType==1?'个人':'公司'}}</div>
        </li>
        <li>
          <p>{{$t('common.Nationality')}}:</p>
          <div>{{form.userCountryCh}}</div>
        </li>
        <li v-if="form.userIdentityType==1">
          <p>{{$t('common.PersonalName')}}:</p>
          <div>{{form.userName}}</div>
        </li>
        <li v-if="form.userIdentityType==1">
          <p v-if="switchon">{{$t('common.IdentificationNumber')}}:</p>
          <p v-if="!switchon">{{$t('common.passport')}}:</p>
          <div>{{form.userIdentity}}</div>
        </li>
        <li v-if="form.userIdentityType==2">
          <p>公司名称:</p>
          <div>{{form.userCompanyCh}}</div>
        </li>
        <li v-if="form.userIdentityType==2">
          <p>Company name:</p>
          <div>{{form.userCompanyEn}}</div>
        </li>
        <li v-if="form.userIdentityType==2">
          <p>公司地址:</p>
          <div>{{form.userAddressCh}}</div>
        </li>
        <li v-if="form.userIdentityType==2">
          <p>Company address:</p>
          <div>{{form.userAddressEn}}</div>
        </li>
        <li class="idcard_left" v-if="form.userIdentityType==1 && form.identityPicOne">
          <p>{{ switchon == true ?  $t('common.IDCardFront') : $t('common.passport')  }}</p>
          <div class="pic">
            <img :src="$baseurl+form.identityPicOne" alt />
          </div>
        </li>
        <li class="idcard_right" v-if="switchon && form.userIdentityType==1 && form.identityPicTwo">
          <p>{{$t('common.IDCardBack')}}</p>
          <div class="pic">
            <img :src="$baseurl+form.identityPicTwo" alt />
          </div>
        </li>
        <li v-if="form.userIdentityType==2 && form.userCompanyPic" class="idcard_right">
          <p>{{$t('common.Certificate')}}</p>
          <div class="pic">
            <img :src="$baseurl+form.userCompanyPic" alt />
          </div>
        </li>
      </ul>
      <div v-if="optStatus==2" class="failure">
        <button @click="$goto('usercheck')">{{$t('common.ApplyAgain')}}</button>
      </div>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "userpass",
  data() {
    return {
      dad_text:this.$t('common.Reveiw'),
      switchon: true, //护照和身份证,true是身份证
      optStatus: 3,
      form: {
        userName: "",
        userCountry: "",
        userCountryEn: "",
        userIdentityType: "",
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
        userType: ""
      }
    };
  },
  created() {
    this.$loading();
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/user/getAuthDetails`
    })
      .then(res => {
        this.$toast.clear();
        console.log(res.data.data);
        if (res.data.data.optStatus === 0) {
          // 0审核中
          this.optStatus = 0;
        } else if (res.data.data.optStatus === 1) {
          // 1通过
          this.optStatus = 1;
        } else if (res.data.data.optStatus === 2) {
          // 2不通过
          this.optStatus = 2;
        }
        console.log(this.optStatus);
        for (let key in res.data.data) {
          this.form[key] = res.data.data[key];
          if (key == "userType") {
            if (this.form[key] == 1) {
              this.form[key] = this.$t('common.ProjectParty');
            } else if (this.form[key] == 3) {
              this.form[key] = this.$t('common.Investor');
            } else if (this.form[key] == 4) {
              this.form[key] = this.$t('common.Middleman');
            }
          }
          if (key == "userCountryEn") {
            if (
              this.form[key] == "China"
            ) {
              this.switchon = true;
            } else {
              this.switchon = false;
            }
          }
        }
        console.log(this.form);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss">
#userpass {
  header {
    position: relative;
    .van-icon-arrow-left {
      // line-height: 1rem;
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
</style>
<style lang='scss' scoped>
#userpass {
  width: 100%;
  header {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    font-size: 0.46rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    background: white;
    border-bottom: 0.08rem solid #d9d9d9;
  }
  main {
    background: white;
    padding: 1.6rem 0 2rem 0;
      h2{
           text-align: center;
      font-size: 0.64rem;
      font-weight: 600;
      margin: 0.8rem 0 0rem 0;
    }
    .failure {
      text-align: center;
      section {
        text-align: center;
        font-size: 0.64rem;
        font-weight: 600;
        margin: 0 0 1.1rem 0;
      }
      button {
        background: #00adef;
        width: 8rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.4rem;
        color: white;
      }
    }
    ul {
      padding: 0.5rem 0.5rem;
      li {
        margin-bottom: 0.5rem;
        p {
          margin-bottom: 0.1rem;
          font-size: 0.38rem;
        }
        div {
          background: #f6f6f6;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.38rem;
          border: 1px solid #d9d9d9;
          padding: 0 0.2rem;
          color: #8a8a8a;
        }
        div.pic {
          padding: 0;
          // border-radius: 0.1rem;
          border: 1px solid #d9d9d9;
          height: 5rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  main.userpass2 {
    padding: 3.24rem 0 3.04rem 0;
    text-align: center;

    img {
      // width: 4.28rem;
      height: 1.54rem;
    }
    section {
      text-align: center;
      font-size: 0.64rem;
      font-weight: 600;
      margin: 3.3rem 0 1.1rem 0;
    }
    .backbtn {
      text-align: center;
      // width: 100px;
      button {
        background: #00adef;
        width: 8rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.4rem;
        color: white;
      }
    }
  }
}
</style>

