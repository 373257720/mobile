<template>
  <div id="usercheck">
    <div class="usercheck">
      <header>审核</header>
      <van-cell-group class="vanForm">
          <div class="usertype">
            <p>类型</p>
            <van-dropdown-menu >
              <van-dropdown-item  @change="function(params){return signer_submit(params,'userType')}" v-model="form.userType" :options="option1" />
            </van-dropdown-menu>
            <footer>{{form_err.userType}}</footer>
          </div>
          <div class="identity">
            <p>身份</p>
            <van-dropdown-menu>
              <van-dropdown-item v-model="form.userIdentityType" :options="option2" />
            </van-dropdown-menu>
            <footer>{{form_err.userIdentityType}}</footer>
          </div>
          <div class="nationality">
            <p>国籍</p>
            <van-dropdown-menu>
              <van-dropdown-item @close="choose_nation" v-model="form.userCountry" @change="nation" :options="countrylist" />
            </van-dropdown-menu>
            <footer>{{form_err.userCountry}}</footer>
          </div>
          <div class="identy_check" v-show="form.userIdentityType==2?false:true">
            <div class="idcard_num">
              <p>个人姓名</p>
              <van-field  @blur="(e)=>{vertify(e,'userName')}" v-model="form.userName" clearable placeholder="请输入"/>
              <footer>{{form_err.userName}}</footer>
            </div>
            <div class="idcard_num">
              <p>{{form.userCountry==2?'身份证号码':'Passport'}}</p>
              <van-field  @blur="(e)=>{vertify(e,'userIdentity')}" v-model="form.userIdentity" placeholder="请输入" clearable />
              <footer>{{form_err.userIdentity}}</footer>
            </div>
            <div class="id_front">
              <p>{{switchon==true?'身份证正面':'护照'}}</p>
              <van-uploader
                :before-read="function(params){return asyncBeforeRead(params,1)}"
                v-model="fileList_front"
                multiple
                :max-count="1"
              />
              <footer>{{form_err.identityPicOne}}</footer>
            </div>
            <div class="id_back" v-show="switchon">
              <p>身份证背面</p>
              <van-uploader
                :before-read="function(params){return asyncBeforeRead(params,2)}"
                v-model="fileList_back"
                multiple
                :max-count="1"
              />
              <footer>{{form_err.identityPicTwo}}</footer>
            </div>
          </div>
          <div  class="gongsi" v-show="form.userIdentityType==2?true:false">
            <div class="companyname2" >
              <p>公司名字</p>
              <van-field  @blur="(e)=>{vertify(e,'userCompanyCh')}" v-model="form.userCompanyCh" placeholder="请输入公司名称" clearable />
              <footer>{{form_err.userCompanyCh}}</footer>
            </div>
            <div class="companyname" >
              <p>Company Name</p>
              <van-field
                required
                @blur="(e)=>{vertify(e,'userCompanyEn')}"
                v-model="form.userCompanyEn"
                placeholder="Please enter the company name"
                clearable
              />
              <footer>{{form_err.userCompanyEn}}</footer>
            </div>
            <div class="company_address" >
              <p>公司地址</p>
              <van-field   @blur="(e)=>{vertify(e,'userAddressCh')}" v-model="form.userAddressCh" placeholder="请输入公司地址" clearable />
              <footer>{{form_err.userAddressCh}}</footer>
            </div>
            <div class="company_address_eng">
              <p>Company Address</p>
              <van-field
                v-model="form.userAddressEn"
                required
                @blur="(e)=>{vertify(e,'userAddressEn')}"
                placeholder="Please enter the company address"
                clearable
              />
              <footer>{{form_err.userAddressEn}}</footer>
            </div>
            <div class="companycheck">
              <p>公司证书</p>
              <van-uploader
                :before-read="function(params){return asyncBeforeRead(params,3)}"
                v-model="fileList_company"
                multiple
                :max-count="1"
              />
            </div>
          </div>
<!--        </vantForm>-->
      </van-cell-group>
      <div class="commit">
        <button @click="submit">提交</button>
      </div>
    </div>
    <!-- <div class="usercheck2" v-if="!success">
      <h2>
        <img src="../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>你的资料已提交</section>
      <nav class="backbtn">
        <button @click="$goto('login')"></button>
      </nav>
    </div>-->
  </div>
</template>
<script>
  import validator from './validator.js'
export default {
  name: "usercheck",
  components: {
    // VantForm
  },
  data() {
    return {
      // success: true,
      switchon: false,
      countrylist: [],
      option1: [
        { text: "项目方", value: 1 },
        { text: "中间人", value: 4 },
        { text: "投资者", value: 3 }
      ],
      option2: [{ text: "个人", value: 1 }, { text: "公司", value: 2 }],
      fileList_front: [],
      fileList_back: [],
      fileList_company: [],
      form_err:{
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
        userCountry: "",
        userIdentityType: 1,
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
        userType: 1,
        // identity: ""
      },
      rules: {
        userType: [
          {required: true, message: '请选择' ,trigger: "change" }
        ],
        userName :[
          {required: true, message: '请选择',trigger: "blur"  }
        ],
        mobile: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback('请输入手机号码');
              } else if (/^[1][0-9]{10}$/.test(value)) {
                callback();
              } else {
                callback('请输入正确的手机号码');
              }
            }
          }
        ],
        code: [
          {required: true, message: '请输入验证码'}
        ]
      },

    };
  },
  watch:{

  },
  created() {
    // this.validator = validator(this.rules, this.form);
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/base/countryList.do`
    })
      .then(res => {
        this.countrylist = res.data.data;
        for (let i = 0; i < this.countrylist.length; i++) {
          this.countrylist[i].value = i;
          this.countrylist[i].text = this.countrylist[i].countryTcname;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    // success: function() {
    //   if (this.value != 0 && this.value != 1) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  },
  methods: {
    vertify(e,b){
      var reg = /^[0-9a-zA-Z]+$/;
      if(b=='userName'){
        if(!this.form.userName){
          this.form_err.userName='请输入个人姓名';
        }else{
          this.form_err.userName='';

        }
      }else if(b=='userIdentity'){
        if(!this.form.userIdentity){
          this.form_err.userIdentity='请输入证件号码';
        }else{
          this.form_err.userIdentity='';
          if(!reg.test(this.form.userIdentity)){
            this.form_err.userIdentity="你输入证件号码格式不正确";
          }
        }
      }else if(b=='userCompanyCh'){
        if(!this.form.userCompanyCh){
          this.form_err.userCompanyCh='请输入公司中文名称';
        }else{
          this.form_err.userCompanyCh=''
        }
      }else if(b=='userCompanyEn'){
        if(!this.form.userCompanyEn){
          this.form_err.userCompanyEn='Please input the company name';
        }else{
          this.form_err.userCompanyEn=''
        }
      }else if(b=='userAddressCh'){
        if(!this.form.userAddressCh){
          this.form_err.userAddressCh='请输入公司中文地址';
        }else{
          this.form_err.userAddressCh=''
        }
      }else if(b=='userAddressEn'){
        if(!this.form.userAddressEn){
          this.form_err.userAddressEn='Please input the company address';
        }else{
          this.form_err.userAddressEn=''
        }
      }
    },
    choose_nation(){
      if(!this.form.userCountry && this.form.userCountry!==0){
        this.form_err.userCountry="请选择"
      }else{
        this.form_err.userCountry=''
      }
    },
    signer_submit(value,type){
      console.log(value,type)
      this.validator.validate((error,fields)=>{
        console.log(error,fields)
      })
    },
    resetField(attrs) {
      attrs = !attrs ? Object.keys(this.form_err) : ( Array.isArray(attrs) ? attrs : [attrs]);
      attrs.forEach(attr => {
        this.form_err[attr] = ''
      })
    },
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          console.log(fields)
          fields.forEach(item => {
            // console.log(item)
            this.form_err[item.field] = item.message
          })
        }
        callback && callback(errors, fields)
      }, data);
    },
    submit() {

      if(this.form.userIdentityType==1){
        if(!this.form.userCountry && this.form.userCountry!==0){
          this.$toast('请选择国籍')
          return
        }
        else if(this.form.userName==''){
          this.$toast('请输入个人姓名')
          return
        }else if(this.form.userIdentity==''){
          this.$toast('请输入证件号码')
          return
        }else if(this.form.identityPicOne==''){
          this.$toast('请上传证件正面')
          return
        }else if(this.form.userCountry==2 && this.form.identityPicTwo==''){
          this.$toast('请上传证件背面')
        }
      }else if(this.form.userIdentityType==2){
        if(!this.form.userCountry && this.form.userCountry!==0){
          this.$toast('请选择国籍')
          return
        }
        else if(this.form.userCompanyCh==''){
          this.$toast('请输入公司中文名称')
          return
        }else if(this.form.userCompanyEn==''){
          this.$toast('Please input the company name')
          return
        } else if(this.form.userAddressCh==''){
          this.$toast('请输入公司中文地址')
          return
        }else if(this.form.userAddressEn==''){
          this.$toast('Please input the company address')
          return
        }
        else if(this.form.userCompanyPic==''){
          this.$toast('请上传公司证书')
          return
        }
      }
      this.commit();

      // this.validate((errors, fields) => {
      //   console.log(errors, fields)
      // })

    },
    nation(value) {
      console.log(value);
      if (value == 2) {
        this.switchon = true;
        this.form.identityType = 1; //身份证
      } else {
        this.switchon = false;
        this.form.identityType = 2; //护照
      }
      this.form.userCountryEn = this.countrylist[value].countryEnname;
      this.form.userCountryCh = this.countrylist[value].countryZhname;
    },
    // 返回 Promise
    asyncBeforeRead(file, index) {
      if (file.type !== "image/jpeg") {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      let formData = new FormData();
      formData.append("file", file);
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/upload/pic.do`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        var imgurl = res.data.data.url;
        // console.log(imgurl);
        if (index == 1) {
          this.form.identityPicOne = imgurl;
        } else if (index == 2) {
          this.form.identityPicTwo = imgurl;
        } else if (index == 3) {
          this.form.userCompanyPic = imgurl;
        }
        // console.log(this.form.userCompanyPic);
      });
      console.log(this.fileList_front)
      return true;
    },
    commit() {
      this.$loading();
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/user/submitAuth`,
        data: this.$qs.stringify(this.form),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            this.$dialog
              .alert({
                title: res.data.resultDesc,
                message: "确定返回登录页"
              })
              .then(() => {
                this.$goto("login");
              });
            // this.success = !this.success;
            // this.$toast.clear();
          } else {
            this.$dialog
              .alert({
                title: res.data.resultDesc
              })
              .then(() => {});
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
#usercheck {
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
    .van-field__body{
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
      border-radius: 0.05rem;
      border: 1px solid #ababab;
      background: #f6f6f6;
    }
    .isactive{
      border-color:#ee0a24;;
    }
    .issort{
      border-color:#ababab;
    }

  .van-field__body {
    //  width: 100%;
    height: 1rem;
    // border: 0.02rem solid #ababab;
    border-radius: 0.05rem;
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

    // overflow: hidden;
  }
  .van-uploader__preview-image {
    margin: 0;
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
    box-sizing: border-box;
    height: 5rem;
    margin-bottom: 0;
  }
  .van-uploader__upload {
    width: 100%;
  box-sizing: border-box;
    background: #f6f6f6;
    border: 0;
    height: 5rem;
    margin: 0;
    border: 1px solid #ababab;
    border-radius: 0.05rem;

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
  .usercheck2 {
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
  .usercheck {
    font-size: 0.38rem;
    .vanForm{
      >div {
        /*margin-bottom: 0.6rem;*/
        padding: 0 0.8rem;
        > p {
          margin-bottom: 0.1rem;
          font-size: 0.38rem;
        }
        footer{
          height: 0.8rem;
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
    }
    div.gongsi {
      > div {
        /*margin-bottom: 0.6rem;*/
        > p {
          margin-bottom: 0.1rem;
          font-size: 0.38rem;
        }
      }
    }
    .id_front,id_back{
      footer{
        height: 0.8rem;
        color: #ee0a24;
      }
      /*margin-bottom: 0.8rem;*/
    }
    header {
      text-align: center;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.44rem 0 0.36rem 0;
      box-sizing: border-box;
    }
    .commit{
      padding: 0 0.8rem;
      button {
      width: 100%;
      color: white;

      border-radius: 0.05rem;
      margin: 0.6rem 0;
      height: 1rem;
      background: #00adef;
    }
    }

  }
}
</style>
