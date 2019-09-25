<template>
  <div id="userpass">
    <header>
      <van-icon name="arrow-left" @click="$global.previous()" />个人审核
    </header>
    <main>
      <ul>
        <li>
          <p>类型:</p>
          <div>{{form.userType}}</div>
        </li>
        <li>
          <p>国籍:</p>
          <div>{{form.userCountryCh}}</div>
        </li>
        <li>
          <p>身份证号:</p>
          <p></p>
          <div>{{form.userIdentity}}</div>
        </li>
        <li>
          <p>公司名称:</p>
          <div>{{form.userCompanyCh}}</div>
        </li>
        <li>
          <p>公司地址:</p>
          <div>{{form.userAddressCh}}</div>
        </li>
        <li class="idcard_left">
          <p>{{success==true?'身份证正面':'护照'}}</p>
          <div class="pic">
            <img :src="$baseurl+form.identityPicOne" alt />
          </div>
        </li>
        <li class="idcard_right" v-if="success">
          <p>身份证反面</p>
          <div class="pic">
            <img :src="$baseurl+form.identityPicTwo" alt />
          </div>
        </li>
        <li class="idcard_right">
          <p>公司营业执照</p>
          <div class="pic">
            <img :src="$baseurl+form.userCompanyPic" alt />
          </div>
        </li>
      </ul>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "userpass",
  data() {
    return {
      success: true,
      form: {
        userCountry: "",
        userCountryEn: "",
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
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/user/getAuthDetails`
    })
      .then(res => {
        for (let key in res.data.data) {
          this.form[key] = res.data.data[key];
          if (key == "userType") {
            if (this.form[key] == 1) {
              this.form[key] = "项目方";
            } else if (this.form[key] == 3) {
              this.form[key] = "投资者";
            } else if (this.form[key] == 4) {
              this.form[key] = "投资中间人";
            }
          }
          if (key == "userCountry") {
            if (
              this.form[key] == "HKG" ||
              this.form[key] == "MAC" ||
              this.form[key] == "CHN"
            ) {
              this.success=true;
            }else {
               this.success=false;
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
    padding: 1.5rem 0 1rem 0;
    ul {
      padding: 0.5rem 0.5rem;
      li {
        margin-bottom: 0.5rem;
        p {
          margin-bottom: 0.1rem;
          font-size: 0.25rem;
        }
        div {
          background: #f6f6f6;
          height: 0.7rem;
          line-height: 0.7rem;
          font-size: 0.2rem;
          border: 0.01rem solid #d9d9d9;
          padding: 0 0.2rem;
        }
        div.pic {
          padding: 0;
          border-radius: 0.1rem;
          height: 3rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

