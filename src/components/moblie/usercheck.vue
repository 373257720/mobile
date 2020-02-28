<template>
  <div id="usercheck">
    <div class="usercheck">
      <header>审核</header>
      <van-cell-group class="vanForm">
          <div class="usertype">
            <p>类型</p>
            <van-dropdown-menu >
              <van-dropdown-item @change="function(params){return signer_submit(params,'userType')}" v-model="form.userType" :options="option1" >
              </van-dropdown-item>
            </van-dropdown-menu>
            <footer>{{form_err.userType}}</footer>
          </div>
          <div class="identity">
            <p>身份</p>
            <van-dropdown-menu>
              <van-dropdown-item v-if='form.userType==1' disabled v-model="form.userIdentityType" :options="option2" />
            <van-dropdown-item v-else   v-model="form.userIdentityType" :options="option2" />
            </van-dropdown-menu>
            <footer>{{form_err.userIdentityType}}</footer>
          </div>
          <div class="nationality">
            <p>国籍</p>
            <div class="nationality_position">
           <a-select
              showSearch
              :value="form.userCountryCh"
              placeholder="请输入"
              :showArrow="false"
              :filterOption="false"
             :getPopupContainer="triggerNode => triggerNode.parentNode"
              @change="handleChange"
              @search='search'
              :notFoundContent="coutry_fetching ? undefined : 'Not Found'"

            >
              <!-- :filterOption="filterOption" -->
            <a-spin v-if="coutry_fetching" slot="notFoundContent" size="small"/>
            <a-select-option v-for="d in countrylist" :key="d.remark" :value='d.value+1' >{{d.chinese}}{{d.eng}}</a-select-option>
            </a-select>
            </div>

            <!-- <van-dropdown-menu>
              <van-dropdown-item v-model="form.userCountry" @change="nation" :options="countrylist" />
            </van-dropdown-menu> -->
            <footer>{{form_err.userCountry}}</footer>
          </div>
          <div class="identy_check" v-show="form.userIdentityType==2?false:true">
            <div class="idcard_num">
              <p>个人姓名</p>
              <van-field   v-model="form.userName" placeholder="请输入" clearable />
              <footer>{{form_err.userName}}</footer>
            </div>
                  <!-- this.form.userCountry=this.countrylist[value].remark; -->
            <div class="idcard_num">
              <p>{{form.userCountry==='CHN'?'身份证号码':'Passport'}}</p>
              <van-field v-model="form.userIdentity" placeholder="请输入" clearable />
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
             <footer>{{form_err.userIdentity}}</footer>
            </div>
            <div class="id_back" v-show="switchon">
              <p>身份证背面</p>
              <van-uploader
                :before-read="function(params){return asyncBeforeRead(params,2)}"
                v-model="fileList_back"
                multiple
                :max-count="1"
              />
            </div>
          </div>
          <div  class="gongsi" v-show="form.userIdentityType==2?true:false">
            <div class="companyname2" >
              <p>公司名字</p>
              <van-field v-model="form.userCompanyCh" placeholder="请输入公司名称" clearable />
            </div>
            <div class="companyname" >
              <p>Company name</p>
              <van-field
                required
                v-model="form.userCompanyEn"
                placeholder="Please enter the company name"
                clearable
              />
            </div>
            <div class="company_address" >
              <p>公司地址</p>
              <van-field  v-model="form.userAddressCh" placeholder="请输入公司地址" clearable />
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
let timeout;
  // import validator from './validator.js'
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
        emailData:'',
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
        userType: null,
        // identity: ""
      },
      createTime:'',//注册时间
      email_pic:'',
      bslEmail:'',
      // rules: {
      //   userType: [
      //     {required: true, message: '请选择' ,trigger: "change" }
      //   ],
      //   userName :[
      //     {required: true, message: '请选择',trigger: "blur"  }
      //   ],
      //   mobile: [
      //     {
      //       validator: (rule, value, callback) => {
      //         if (!value) {
      //           callback('请输入手机号码');
      //         } else if (/^[1][0-9]{10}$/.test(value)) {
      //           callback();
      //         } else {
      //           callback('请输入正确的手机号码');
      //         }
      //       }
      //     }
      //   ],
      //   code: [
      //     {required: true, message: '请输入验证码'}
      //   ]
      // },

    };
  },
  created() {
      this.form.userType=1;
      this.ulHtml('');
      this.$loading();
       this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/user/getUserDetail`).then(res=>{
         this.$toast.clear();
          if(res.data.resultCode==10000){
            this.createTime=res.data.data.createTime;
            this.email_pic=res.data.data.picUrl?res.data.data.picUrl:'';
            this.bslEmail=res.data.data.bslEmail?res.data.data.bslEmail:'';
          }
       })

    // this.validator = validator(this.rules, this.form);

  },
  watch:{
    'form.userType':{
            handler: function(val,oldVal){
              if(val==1){
                // console.log(this)
                this.form.userIdentityType=2
              }

            },
            // 深度观察
            deep:true
        }
  },
  methods: {
    signer_submit(){

    },
    search(val){
         if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
       timeout = setTimeout(this.ulHtml(val), 300);
      ;
    },
   handleChange (value) {
      // console.log(value);
        if (this.countrylist[value-1].remark === 'CHN') {
        this.switchon = true;
        this.form.identityType = 1; //身份证
      } else {
        this.switchon = false;
        this.form.identityType = 2; //护照
      }
      this.form.userCountry=this.countrylist[value-1].remark;
      this.form.userCountryEn = this.countrylist[value-1].eng;
      this.form.userCountryCh = this.countrylist[value-1].chinese;
      this.coutry_fetching = false;
      // console.log(this.form)
    },
    ulHtml(val){
      this.countrylist=[];
      let arr=[];
      this.coutry_fetching = true

      this.$global.changepage(`${this.$baseurl}/bsl_web/base/countryList.do?searchKey=${val}`, "get")
      .then(res => {
         if(res.data.data.length>0){
            for (let i = 0; i < res.data.data.length; i++) {
                  arr.push({
                    chinese: res.data.data[i].countryZhname,
                    eng:res.data.data[i].countryEnname,
                    value: i,
                    remark: res.data.data[i].countryCode
                  });
             }
             this.countrylist=arr;
         }
           this.coutry_fetching = false
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
      if(this.form.userIdentityType==1){
        if(this.form.userCountry==''){
            this.$toast('请输入国籍');
            return
        }
        else if(this.form.userName==''){
            this.$toast('请输入个人姓名');
            return
        }else if(this.form.userIdentity==''){
            this.$toast('请输入证件号码');
            return
        }else if(this.form.userCountry == 'CHN'){
           if(this.fileList_front.length==0){
                this.$toast('请上传身份证正面');
            return
           }else if(this.fileList_back.length==0){
                  this.$toast('请上传身份证反面');
            return
           }
        }
        else if(this.form.userCountry != 'CHN'){
            if(this.fileList_front.length==0){
                this.$toast('请上传护照');
            return
           }
        }
      }else if(this.form.userIdentityType==2){
           if(this.form.userCountry==''){
            this.$toast('请输入国籍');
            return
        }
        else if(this.form.userCompanyEn==''){
            this.$toast('Please input company name');
            return
        }else if(this.form.userAddressEn==''){
            this.$toast('Please input company address');
            return
        }else if(this.fileList_company.length==0){
            this.$toast('请上传公司证书');
            return
        }
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
        this.$toast("请上传 jpg 格式图片");
        return false;
      };
      let formData = new FormData();
      formData.append("file", file);
      this.$loading();
     return  new Promise((resolve, reject) => {
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/bsl_web/upload/pic.do`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          this.$toast.clear();
          if(res.data.resultCode==10000){
            var imgurl = res.data.data.url;
            console.log(imgurl);
            if (index == 1) {
              this.form.identityPicOne = imgurl;
            } else if (index == 2) {
              this.form.identityPicTwo = imgurl;
            } else if (index == 3) {
              this.form.userCompanyPic = imgurl;
            }
            resolve(true)
          }else{
            this.$toast(res.data.resultDesc);
            reject(res.data.resultDesc)
          }
        }).catch(err => {
          this.$toast('系统异常');
          reject(err)
        });
      })
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
      if(this.form.userIdentityType==1){
        userIdentityType="个人";
        userIdentityType_name=this.form.userName;
      }else if(this.form.userIdentityType==2){
         userIdentityType="公司";
        userIdentityType_name=this.form.userCompanyEn;
      }
      let signuptime=this.createTime?this.$global.timestampToTime(this.createTime):'';
      this.form.emailData=`<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <table id="box" style="width: 580px;height:450px;
     margin: auto;
    border-collapse:collapse; border-spacing:0px 10px;
    border:1px solid #cccccc;border-radius:5px;
  ">
        <thead>
            <tr>
                <th colspan="2" height="100">
                    <img style="width: 100px;height: 50px;" src="${this.email_pic}"
                        alt="">
                </th>
            </tr>
        </thead>
        <tobody>
             <tr class="column" style="color: lightcoral">
                <td style="text-align:center;vertical-align:top;">提示：</td>
                <td style="padding-right:20px;width: 430px;text-align:left;vertical-align:top;">
                您已收到新用户的个人信息提交，请尽快审核。
              </td>
            </tr>
            <tr class="column" style="">
                <td style="width: 180px;text-align:center;vertical-align:top;">【注册时间】</td>
                <td style="padding-right:20px;width: 430px;text-align:left;vertical-align:top;">
                ${signuptime}
              </td>
            </tr>
            <tr class="column" style="margin-bottom: 15px;">
                <td style="width: 180px;text-align:center;vertical-align:top;">【类型】</td>
                <td style="padding-right:20px;width: 430px;text-align:left;vertical-align:top;">
                    ${userIdentityType}</td>
            </tr>
             <tr class="column" style="margin-bottom: 15px;">
                <td style="width: 180px;text-align:center;vertical-align:top;">【个人/公司名字】</td>
                <td style="padding-right:20px;width: 430px;text-align:left;vertical-align:top;">
                    ${userIdentityType_name}</td>
            </tr>
            <tr class="column" style="margin-bottom: 15px;">
                <td style="width: 180px;text-align:center;vertical-align:top;">【注册邮箱】</td>
                <td style="padding-right:20px;width: 430px;text-align:left;vertical-align:top;">
                        ${this.bslEmail}
                </td>
            </tr>
            <tr class="column" style="">
                <td colspan="2" style="text-align:center;vertical-align:center;">
                    <a href="${this.$baseurl2}/#/login" class="button" style="text-decoration:none;">
                        <span
                            style="display:inline-block;border-radius:5px;text-decoration:none;width:250px;height:40px;background: #00B1F5;color:white;line-height:40px;">
                            登录PC后台管理系统台查看
                        </span>
                    </a>
                </td>
            </tr>
        </tobody>

    </table>
</body>

</html>`
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
                // message: "点"
              })
              .then(() => {
                this.$router.replace({  //核心语句
                  path:'/mhome',   //跳转的路径
                })
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
            this.$dialog
              .alert({
                title: '网络异常',
                message: "点击返回登录页"
              })
              .then(() => {
                this.$goto("login");
              });
        });
    }
  }
};
</script>
<style lang="scss">
#usercheck {
  .ant-select-dropdown-menu{
      max-height: 4rem;
    }
   .ant-select{
    width: 100%;
    border: 1px solid #ababab;
    font-size: 0.38rem;
    color: #323233;
    .ant-select-selection__placeholder, .ant-select-search__field__placeholder{
      color:#969799;
    }

    .ant-select-selection{
       padding: 0 0.2rem;
        //  border: 1px solid #ababab;
      background: #f6f6f6;
      box-shadow:none;
    }
 .ant-select-selection--single{
   height:100%;

 }
 .ant-select-selection__rendered{

   margin:0;
 }
    .ant-select-selection{
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
    height: 5rem;

   display: block;
    margin-bottom: 0;
  }
  // .van-uploader__wrapper{
  //   width: 100%;
  //   height: 100%;
  // }
  .van-uploader__upload {
    width: 100%;
    background: #f6f6f6;
    border: 0;
    height: 5rem;
    border: 1px solid #ababab;
    margin: 0;

    border-radius: 0.05rem;
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
    .vanForm{
      div.nationality_position{
            position: relative;
      }
      >div {
        /*margin-bottom: 0.6rem;*/
        padding: 0 0.8rem;
        > p {
          margin-bottom: 0.1rem;
          font-size: 0.38rem;

        }
          >p::before {
              content: "*";
              color: #f56c6c;
              margin-right: 0.1rem;
          }
        footer{
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
           >p::before {
              content: "*";
              color: #f56c6c;
              margin-right: 0.1rem;
          }
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
      .companyname,.company_address_eng,.companycheck{
           >p::before {
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
    .commit{
      padding: 0 0.8rem;
      margin-bottom: 2rem;
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
