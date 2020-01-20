<template>
  <div id="userpass">
    <!-- <div class="userpass2" v-if="!success"> -->
    <header>
      <van-icon name="arrow-left" @click="$global.previous()" />
      <commonnav :msg="dad_text"></commonnav>
    </header>
    <main class="userpass2" v-if="optStatus==0">
      <h2>
        <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>你的资料已提交,请等待审核</section>
      <nav class="backbtn"></nav>
    </main>
    <main v-if="optStatus==1">
      <ul>
        <li>
          <p>类型:</p>
          <div>{{form.userType}}</div>
        </li>
        <li>
          <p>身份:</p>
          <div>{{form.userIdentityType==1?'个人':'公司'}}</div>
        </li>
        <li>
          <p>国籍:</p>
          <div>{{form.userCountryCh}}</div>
        </li>
        <li v-if="form.userIdentityType==1">
          <p>姓名:</p>
          <div>{{form.userName}}</div>
        </li>
        <li v-if="form.userIdentityType==1">
          <p v-if="switchon">身份证号:</p>
          <p v-if="!switchon">护照:</p>
          <div>{{form.userIdentity}}</div>
        </li>
        <li v-if="form.userIdentityType==2">
          <p>公司名称:</p>
          <div>{{form.userCompanyCh}}</div>
        </li>
        <li v-if="form.userIdentityType==2">
          <p>公司地址:</p>
          <div>{{form.userAddressCh}}</div>
        </li>
        <li class="idcard_left" v-if="form.userIdentityType==1">
          <p>{{switchon==true?'身份证正面':'护照'}}</p>
          <div class="pic">
            <img :src="$baseurl+form.identityPicOne" alt />
          </div>
        </li>
        <li class="idcard_right" v-if="switchon && form.userIdentityType==1">
          <p>身份证反面</p>
          <div class="pic">
            <img :src="$baseurl+form.identityPicTwo" alt />
          </div>
        </li>
        <li v-if="form.userIdentityType==2" class="idcard_right">
          <p>公司营业执照</p>
          <div class="pic">
            <img :src="$baseurl+form.userCompanyPic" alt />
          </div>
        </li>
      </ul>
    </main>
    <main v-if="optStatus==2">
     <h2>很抱歉,您的审核没通过</h2>
<!--      <h2>{{flut}}}</h2>-->
      <ul>
        <li>
          <p>类型:</p>
          <div>{{form.userType}}</div>
        </li>
        <li>
          <p>身份:</p>
          <div>{{form.userIdentityType==1?'个人':'公司'}}</div>
        </li>
        <li>
          <p>国籍:</p>
          <div>{{form.userCountryCh}}</div>
        </li>
        <li v-if="form.userIdentityType==1">
          <p>姓名:</p>
          <div>{{form.userName}}</div>
        </li>
        <li v-if="form.userIdentityType==1">
          <p v-if="switchon">身份证号:</p>
          <p v-if="!switchon">护照:</p>
          <div>{{form.userIdentity}}</div>
        </li>
        <li v-if="form.userIdentityType==2">
          <p>公司名称:</p>
          <div>{{form.userCompanyCh}}</div>
        </li>
        <li v-if="form.userIdentityType==2">
          <p>公司地址:</p>
          <div>{{form.userAddressCh}}</div>
        </li>
        <li class="idcard_left" v-if="form.userIdentityType==1">
          <p>{{switchon==true?'身份证正面':'护照'}}</p>
          <div class="pic">
            <img :src="$baseurl+form.identityPicOne" alt="">
          </div>
        </li>
        <li class="idcard_right" v-if="switchon && form.userIdentityType==1">
          <p>身份证反面</p>
          <div class="pic">
            <img :src="$baseurl+form.identityPicTwo" alt />
          </div>
        </li>
        <li v-if="form.userIdentityType==2" class="idcard_right">
          <p>公司营业执照</p>
          <div class="pic">
            <img :src="$baseurl+form.userCompanyPic" alt />
          </div>
        </li>
      </ul>
       <div class="failure">
        <button @click="$goto('usercheck')">再次申请</button>
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
      dad_text: "个人审核",
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
        if (res.data.data.optStatus == 0) {
          // 0审核中
          this.optStatus = 0;
        } else if (res.data.data.optStatus == 1) {
          // 1通过
          this.optStatus = 1;
        } else if (res.data.data.optStatus == 2) {
          // 2不通过
          this.optStatus = 2;
        }
        console.log(this.optStatus);

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
          if (key == "userCountryEn") {
            // console.log(111);
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

