<template>
  <div id="i_perfect_infor">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />完善资料
    </nav>
    <main>
      <article>
        <!-- <header>{{title}}</header> -->
        <ul>
          <li>
            <p class="row1">投资者类型</p>
            <p class="row2">
            <van-dropdown-menu>
                <van-dropdown-item  v-model="form.investorsType" :options="option1" />
              </van-dropdown-menu>
<!--              <van-field  v-model="form.investorsType" placeholder="-" />-->
            </p>
          </li>
          <li v-show="form.investorsType==2">
            <p class="row1">投资者公司：</p>
            <p class="row2">
              <van-field  v-model="form.investorsCompany" placeholder="请输入" clearable />
            </p>
          </li>
          <li>

            <p class="row1">投资者地区：</p>
            <p class="row2">
              <!-- <van-dropdown-menu>
                <van-dropdown-item @close="choose_nation" placeholder="-" v-model="form.investorsArea"  :options="countrylist" />
              </van-dropdown-menu> -->
                <a-select
              showSearch
              placeholder="请输入"
              labelInValue
            :getPopupContainer="triggerNode => {return triggerNode.parentNode}"
              :showArrow="false"
              :filterOption="false"
              @change="handleChange"
              @search='search'
              :notFoundContent="countrylist_fetching ? undefined : '没有数据'"
            
            >
              <!-- :filterOption="filterOption" -->
            <a-spin v-if="countrylist_fetching" slot="notFoundContent" size="small"/>
                 <a-select-option v-for="d in region" :key="d.remark" :value='d.value+1' >{{d.chinese}}</a-select-option>
          </a-select> 
            </p>
          </li>

          <li>
            <p class="row1">投资者姓名：</p>
            <p class="row2">
              <van-field  v-model="form.investorsName" placeholder="请输入" clearable />
            </p>
          </li>
          <li>
            <p class="row1">投资者电话：</p>
            <p class="row2">
              <van-field v-model="form.investorsMobile" placeholder="请输入" clearable />
            </p>
          </li>
          <li>
            <p class="row1">投资者邮箱：</p>
            <p class="row2">
              <van-field v-model="form.investorsEmail" placeholder="请输入" clearable />
            </p>
          </li>
          <li >
            <p class="row1">投资者地址：</p>
            <p class="row2">
              <van-field v-model="form.investorsCompanyAddress" placeholder="请输入" clearable />
            </p>
          </li>
          <li>
            <p class="row1">感兴趣行业：</p>
            <p class="row2">
              <van-checkbox-group v-model="form.interestedIndustries">
                <van-checkbox
                  v-for="(item) in industrylist"
                  :key="item.industryId"
                  :name="item.industryNameCh"
                >{{item.industryNameCh}}</van-checkbox>
              </van-checkbox-group>
            </p>
          </li>
        </ul>
        <footer>
          <aside>
            <button @click="submit">提交</button>
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
let timeout;
export default {
  name: "i_perfect_infor",
  data() {
    return {
      title: "",
      countrylist_fetching:false,
      form: {
        signId: this.$route.query.signId,
        signStatus: 8,
        investorsId: this.$route.query.investorsId,
        investorsType:1,
        investorsCompany: "",
        investorsName: "",
        investorsArea: "",
        investorsEmail: "",
        investorsMobile: "",
        interestedIndustries: [],
        investorsCompanyAddress: "",
        investorsName: ""
      },
      industrylist: [],
      region:[],
      option1: [{ text: "个人", value: 1 }, { text: "公司", value: 2 }]
    };
  },
  // beforeRouteEnter(to,from,next){
  //   next(vm=>{
  //     // vm.targetU
  //     // console.log(vm);
  //     vm.target=JSON.parse(to.query.investor_infor)
  //     console.log(vm.target);

  //   })
  // },
  created() {
    this.ulHtml('');
     this.$loading();
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/base/getAllIndustry`
    })
      .then(res => {
        if(res.data.resultCode==10000){
          this.title = res.data.data.projectName;
          this.industrylist = res.data.data;
        }
        this.$toast.clear();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
     search(val){
    if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
    timeout = setTimeout(this.ulHtml(val), 300);
      ;
    },
   handleChange (value) {
      this.form.investorsArea=this.region[value.key-1].chinese;
      this.countrylist_fetching = false;
      // console.log(this.form)
    },
    ulHtml(val){
      this.region=[];
      let arr=[];
      this.countrylist_fetching=true;
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
             this.region=arr;
         }
         this.countrylist_fetching = false
      });
      // console.log(this.region)
    },
     submit() {
        var regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
       if(this.form.investorsType==2 && this.form.investorsCompany=='')   { this.$toast({ message:'请输入投资者公司名称'});
            return  
        }
        if(this.form.investorsArea==''){
            this.$toast('请输入投资者地区');
            return
        }else  if(this.form.investorsName==''){
            this.$toast('请输入投资者姓名');
            return
        }else  if(this.form.investorsMobile==''){
            this.$toast('请输入投资者电话');
            return
        }else  if(this.form.investorsEmail==''){
            this.$toast('请输入投资者邮箱');
            return
        }else  if(!regemail.test(this.form.investorsEmail)){
          this.$toast('邮箱格式不正确');
            return
        }
        else  if(this.form.investorsCompanyAddress==''){
            this.$toast('请输入投资者地址');
            return
        }else  if(this.form.interestedIndustries.length<=0){
            this.$toast('请选择感兴趣行业');
            return
        }
        
      this.commit();
    },
    choose_nation(){
      // if(!this.form.investorsArea && this.form.investorsArea!==0){
      //   this.form_err.investorsArea="请选择"
      // }else{
      //   this.form_err.investorsArea=''
      // }
    },
    commit() {
      let formtable = JSON.parse(JSON.stringify(this.form));
      let interestedIndustries = this.form.interestedIndustries.join("/");
      formtable.interestedIndustries = interestedIndustries;
      // let  formtable= {
      //   signId: this.$route.query.signId,
      //   signStatus: 6,
      //   investorsId: this.$route.query.investorsId,
      //   investorsType: 1,
      //   investorsCompany: "2",
      //   investorsName: "2",
      //   investorsArea: "2",
      //   investorsEmail: "2",
      //   investorsMobile: "2",
      //   interestedIndustries: a ,
      //   investorsCompanyAddress: "2",
      //   investorsName: "33"
      // };
      // if (formtable.investorsType == "个人") {
      //   formtable.investorsType = 1;
      // } else if (formtable.investorsType == "公司") {
      //   formtable.investorsType = 2;
      // }s
      console.log(formtable);
      this.$loading();
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/signProject3`,
        data: this.$qs.stringify(formtable)
      })
        .then(res => {
          console.log(res);
          this.dialog(res.data.resultDesc, res.data.resultCode);
           this.$toast.clear();
          // if (res.data.resultCode == 10000) {
          //   this.dialog("提交成功", res.data.resultCode);
          //   // this.$routerto("mhome");
          // }
          // else if (res.data.resultDesc == 10017) {
          //   this.dialog("签约流程错误");
          // } else if (res.data.resultCode == 10010) {
          //   this.dialog("请填写投资者电话");
          // } else if (res.data.resultCode == 10011) {
          //   this.dialog("请填写投资者邮箱");
          // } else if (res.data.resultCode == 10012) {
          //   this.dialog("请填写感兴趣行业");
          // } else if (res.data.resultCode == 10013) {
          //   this.dialog("请填写公司的地址");
          // }else if (res.data.resultCode == 10051) {
          //   this.dialog("用户资料尚未审核，请耐心等待");
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    dialog(str, num) {
      this.$dialog
        .confirm({
          title: str
        })
        .then(() => {
          if (num == 10000) {
            this.$routerto("mhome");
          }
        }).catch(err=>{

      })
    }
  }
};
</script>
<style lang="scss">
#i_perfect_infor {

//  .van-button__text{
//      font-size: 0.48rem !important;
//     }
  .ant-select{
    width: 100%;
    font-size: 0.38rem;
    color: #323233;
    .ant-select-selection__placeholder, .ant-select-search__field__placeholder{
      color:#969799;
    }
    .ant-select-selection{
       padding: 0 0.2rem;
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
      border-radius: 0.05rem;
              border: 1px solid #ababab;
    }
  }
  .van-cell {
    font-size: 0.38rem;
    padding: 0 1rem;
    line-height: 1rem;
    // padding: 0;
  }
  .van-dropdown-menu__title {
    font-size: 0.38rem;
    width: 100%;
    // text-align: left;
  }
  .van-icon-arrow-left {
    position: absolute;
    left: 0.6rem;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
  .van-dropdown-menu {
    height: 1rem;
    border-radius: 0.05rem;
    box-sizing: border-box;
    border: 1px solid #ababab;
    background: #f6f6f6;
  }
  .van-field__body {
    //  width: 100%;
    height: 1rem;
    line-height: 1rem;
     border: 1px solid #ababab;
    border-radius: 0.05rem;
    background: #f6f6f6;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }

  .van-icon-success {
    height: 0.4rem;
    width: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.3rem;
  }
  .van-field__control {
    // padding: 0 0.2rem;
    // height: 0.5rem;
  }
  .van-field__clear {
    font-size: 0.3rem;
  }
  .van-field {
    padding: 0;
  }
  .van-cell--clickable {
    .van-cell__title {
      margin-left: 2.7rem;
    }
    .van-cell__value {
      display: none;
    }
  }
  .van-checkbox__icon {
    height: 100%;
  }

  .van-dropdown-menu__title::after {
    border: 0.1rem solid;
    /*top: 50%;*/
    right: 0.5rem;
    margin: 0;
    transform: rotate(0);
    border-color: currentColor transparent transparent transparent;
  }

  .van-dropdown-menu__title--down::after {
    border: 0.1rem solid;
    /*top: 50%;*/
    border-color: currentColor transparent transparent transparent;
  }
}
</style>
<style lang="scss" scoped>
#i_perfect_infor {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    z-index: 2017;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      margin: 0 0 1rem 0;
      header {
        // border-bottom: 0.1rem solid #b5b5b5;
        height: 2rem;
        font-size: 0.38rem;
        color: #0f6ebe;
        text-align: center;
        // font-weight: 600;
        line-height: 2rem;
      }
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.4rem;
          display: flex;
          /*line-height: 0.48rem;*/
          align-items: center;
          font-size: 0.3rem;
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
            .row1::before {
                content: "*";
                color: #f56c6c;
                margin-right: 0.1rem;
            }  
          .row2 {
            position: relative;
            width: 7rem;
            word-break: break-all;
            color: #787878;
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        button {
          width: 8rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>
