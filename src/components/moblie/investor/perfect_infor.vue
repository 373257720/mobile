<template>
  <div id="i_perfect_infor">
<!--    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />{{$t('investor.CompleteMaterial')}}
    </nav> -->
    <commonnav :msg="$t('investor.CompleteMaterial')"></commonnav>
    <main>
      <article>
        <ul>
          <li>
            <p class="row1">{{$t('agent.InvestorType')}}:</p>
            <p class="row2">
            <van-dropdown-menu>
                <van-dropdown-item  disabled v-model="form.investorsType" :options="option1" />
              </van-dropdown-menu>
<!--              <van-field disabled   v-model="form.investorsType" placeholder="-" />-->
            </p>
          </li>
          <li>
            <p class="row1">{{$t('investor.InvestorRegion')}}:</p>
            <p class="row2">
              <van-field v-if="$i18n.locale=='zh_CN'"  disabled v-model="form.investorsArea"  placeholder="-" />
              <van-field v-else  disabled v-model="form.investorsAreaEn"  placeholder="-" />
              <!-- <van-dropdown-menu>
                <van-dropdown-item @close="choose_nation" placeholder="-" v-model="form.investorsArea"  :options="countrylist" />
              </van-dropdown-menu> -->
<!--                <a-select-->
<!--              showSearch-->
<!--              :placeholder="$t('ContractWrods.pleaseEnter')"-->
<!--              :value='investorsArea'-->
<!--             :getPopupContainer="triggerNode => triggerNode.parentNode"-->
<!--              :showArrow="false"-->
<!--              :filterOption="false"-->
<!--              @change="handleChange"-->
<!--              @search='search'-->
<!--              :notFoundContent="countrylist_fetching ? undefined : 'Not Found'"-->
<!--            >-->
<!--              &lt;!&ndash; :filterOption="filterOption" &ndash;&gt;-->
<!--            <a-spin v-if="countrylist_fetching" slot="notFoundContent" size="small"/>-->
<!--                 <a-select-option v-for="d in region" :key="d.remark" :value='d.value+1' >-->
<!--                <span>{{d.eng}}</span><span>{{d.chinese}}</span>  </a-select-option>-->
<!--          </a-select>-->
            </p>
          </li>

           <li v-show="form.investorsType==2">
            <p class="row1">{{$t('agent.InvestorCompany')}}:</p>
            <p class="row2">
              <van-field v-if="$i18n.locale=='zh_CN'"  disabled v-model="form.investorsCompany"  placeholder="-" />
              <van-field v-else disabled v-model="form.investorsCompanyEn"  placeholder="-" />
            </p>
          </li>
<!--          <li v-show="form.investorsType==2">-->
<!--            <p class="row1">公司名称:</p>-->
<!--            <p class="row2">-->
<!--              <van-field  disabled v-model="form.investorsCompany"  placeholder="-" />-->
<!--            </p>-->
<!--          </li>-->
          <li v-show="form.investorsType==1">
            <p class="row1">{{$t('agent.InvestorName')}}:</p>
            <p class="row2">
              <van-field  v-model="form.investorsName"  placeholder="-" />
            </p>
          </li>
          <li>
            <p class="row1 isbefore">{{$t('agent.InvestorPhone')}}:</p>
            <p class="row2">
              <van-field v-model="form.investorsMobile"  :placeholder="$t('ContractWrods.pleaseEnter')" />
            </p>
          </li>
          <li>
            <p class="row1 isbefore">{{$t('agent.InvestorMailbox')}}:</p>
            <p class="row2">
              <van-field v-model="form.investorsEmail"  :placeholder="$t('ContractWrods.pleaseEnter')" />
            </p>
          </li>
<!--          <li >-->
<!--            <p class="row1"> {{$t('investor.InvestorAddress')}}:</p>-->
<!--            <p class="row2">-->
<!--              <van-field v-model="form.investorsCompanyAddress"  :placeholder="$t('ContractWrods.pleaseEnter')"  />-->
<!--            </p>-->
<!--          </li>-->
          <li >
            <p class="row1 isbefore"> {{$t('investor.InvestorAddress')}}:</p>
            <p class="row2">
              <van-field v-model="form.investorsCompanyAddressEn"  :placeholder="$t('ContractWrods.pleaseEnter')"  />
            </p>
          </li>
          <li >
            <p class="row1">投资人地址(中文):</p>
            <p class="row2">
              <van-field v-model="form.investorsCompanyAddress"  :placeholder="$t('ContractWrods.pleaseEnter')"  />
            </p>
          </li>
          <li class="interests isbefore">
            <p class="row1">{{$t('investor.IndustryOfInterest')}}:</p>
            <p class="row2">
              <van-checkbox-group v-model="interestedInduslistid" ref="checkboxGroup">
<!--                <van-checkbox-->
<!--                  v-for="(item) in industrylist"-->
<!--                  :key="item.industryId"-->
<!--                  @click="chooseindustry"-->
<!--                  :name="item.industryId"-->
<!--                >-->
<!--                  <span>{{$i18n.locale=='zh_CN'?item.industryNameCh:item.industryNameEn}}</span>-->
<!--                </van-checkbox>-->
                <van-cell
                  v-for="(item, index) in industrylist"
                  clickable
                  :key="item.industryId"
                  :title="$i18n.locale=='zh_CN'?item.industryNameCh:item.industryNameEn"
                  @click="toggle(index)"
                >
                  <template #right-icon>
                    <van-checkbox  :name="item.industryId" ref="checkboxess" />
                  </template>
                </van-cell>
              </van-checkbox-group>
            </p>
          </li>
        </ul>
        <footer>
          <aside>
            <button @click="submit">{{$t('common.Submit')}}</button>
          </aside>
        </footer>
      </article>
    </main>

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
      investorsArea:undefined,
      form: {
        signId: this.$route.query.signId,
        signStatus: 10,
        signUserId3:this.$route.query.signUserId3,
        investorsId: this.$route.query.investorsId,
        investorsType:null,
        investorsCompany: "",
        investorsCompanyEn:'',
        investorsName: "",
        investorsArea:"",
        investorsAreaEn:'',
        investorsEmail: "",
        investorsMobile: "",
        interestedIndustries: [],
        interestedIndustriesEn:[],
        investorsCompanyAddress: "",
        investorsCompanyAddressEn:'',
        investorsName: ""
      },
      industrylist: [],
      interestedInduslistid:[],
      region:[],
      option1: [{ text: this.$t('common.individual'), value: 1 },
        { text: this.$t('common.company'), value: 2 }]
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
    this.$loading();
    this.ulHtml('');
    console.log(this.$store.state)
    this.form.investorsArea=this.$store.state.inverstor.investorsArea;
    this.form.investorsAreaEn=this.$store.state.inverstor.investorsAreaEn;
    this.investorsArea=this.$i18n.locate=='zh_CN'?this.form.investorsArea:this.form.investorsAreaEn;
    this.form.investorsType=this.$store.state.inverstor.investorsType;
    this.form.investorsName=this.$store.state.inverstor.investorsName;
    this.form.investorsCompany=this.$store.state.inverstor.investorsCompany;
    this.form.investorsCompanyEn=this.$store.state.inverstor.investorsCompanyEn;
    this.form.investorsName=this.$store.state.inverstor.investorsName;
    let a =this.$store.state.inverstor;
    this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_web/base/getAllIndustry`,)
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
   unique(arr) {
        if (!Array.isArray(arr)) {
          console.log('type error!')
          return
        }
        var array = [];
        for (var i = 0; i < arr.length; i++) {
          if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
          }
        }
        return array;
      },
    toggle(index) {
      this.$refs.checkboxess[index].toggle();
    },
    result(){
      this.form.interestedIndustries=[];
      this.form.interestedIndustriesEn=[];
      this.interestedInduslistid=this.unique(this.interestedInduslistid)
      this.interestedInduslistid.forEach(item=>{
        this.industrylist.forEach(item2=>{
          if(item2.industryId===item){
            this.form.interestedIndustries.push(item2.industryNameCh);
            this.form.interestedIndustriesEn.push(item2.industryNameEn);
          }
        })
      })
      this.form.interestedIndustries= this.unique(this.form.interestedIndustries);
      this.form.interestedIndustriesEn= this.unique(this.form.interestedIndustriesEn);
    },
    chooseindustry(e){
      console.log(e.target)
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
      this.investorsArea=this.$i18n.locale=='zh_CN'?this.region[value-1].chinese:this.region[value - 1].eng;
      this.form.investorsArea=this.region[value-1].chinese;
     this.form.investorsArea=this.region[value-1].eng;
     // this.userCountry=this.$i18n.locale=='zh_CN'?this.region[value-1].chinese:this.region[value - 1].eng;
      this.countrylist_fetching = false;
      // console.log(this.form)
    },
    ulHtml(val){
      this.region=[];
      let arr=[];
      this.countrylist_fetching=true;
      this.$global.get_encapsulation(`${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
        {
          searchKey:val,
        })
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
       this.result();
        var regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
       if(this.form.investorsType==2 && this.form.investorsCompany=='')
       { this.$toast({ message:this.$t('investor.PleaseEnterTheNameOfTheInvestorCompany')});
            return
        }
        // if(this.investorsArea==''){
        //     this.$toast(this.$t('investor.PleaseEnterInvestorRegion'));
        //     return
        // }
        else  if(this.form.investorsName==''){
          this.$toast(this.$t('investor.PleaseEnterInvestorName'));
            return
        }else  if(this.form.investorsMobile==''){
          this.$toast(this.$t('investor.PleaseEnterInvestorPhone'));
            return
        }else  if(this.form.investorsEmail==''){
          this.$toast(this.$t('investor.PleaseEnterInvestorEmail'));
            return
        }else  if(!regemail.test(this.form.investorsEmail)){
          this.$toast(this.$t('investor.EmailFormatIsIncorrect'));
            return
        }
        else  if(this.form.investorsCompanyAddressEn==''){
          this.$toast(this.$t('investor.PleaseEnterInvestorAddress'));
            return
        }else  if(this.form.interestedIndustries.length<=0){
          this.$toast(this.$t('investor.PleaseSelectIndustry'));
            return
        }
      this.commit();
    },
    commit() {
      let formtable = JSON.parse(JSON.stringify(this.form));
      let interestedIndustries = this.form.interestedIndustries.join("/");
      let interestedIndustriesEn=this.form.interestedIndustriesEn.join("/");
      formtable.interestedIndustries = interestedIndustries;
      formtable.interestedIndustriesEn=interestedIndustriesEn;
      console.log(formtable);
      this.$loading();
        this.$global.post_encapsulation(`${this.$axios.defaults.baseURL}/bsl_web/projectSign/signProject3`,
          formtable
        )
        .then(res => {
          console.log(res);
           this.$toast.clear();
          if (res.data.resultCode == 10000) {
             this.dialog(res.data.resultDesc, res.data.resultCode);
          }else{
            this.$toast(res.data.resultDesc);

          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    dialog(str, num) {
      this.$dialog
        .alert({
          title: str
        })
        .then(() => {
          if (num == 10000) {
            this.$routerto("mysign");
          }
        })
    }
  }
};
</script>
<style lang="scss">
#i_perfect_infor {
 .ant-select-dropdown-menu{
      max-height: 4rem;
    }
  .ant-select{
    width: 100%;
    border: 1px solid #ababab;
    border-radius: 3px;
    font-size: 0.38rem;
    color: #323233;
    .ant-select-selection-selected-value{
      height: 100%;
      line-height: 1rem;
    }
    .ant-select-selection__placeholder, .ant-select-search__field__placeholder{
      color:#969799;
      height: 1rem;
      line-height: 1rem;
      margin-top:0;
      top:0;

      /*height: 100%;*/
    }
    .ant-select-selection{
       padding: 0 0.3rem;
      background: #f6f6f6;
      box-shadow:none;
    }
 .ant-select-selection--single{
   height:100%;

 }
 .ant-select-selection__rendered{
   margin:0;
   height: 100%;
 }
    .ant-select-selection{
      border-radius: 0.05rem;
      border:0;
      height: 1rem;

    }
  }
  .van-cell {
    font-size: 0.38rem;
    padding: 0 1rem;
	// padding: 0.3125rem 0.5rem;
    line-height: 1rem;
    // padding: 0;
  }
  .van-dropdown-menu__title {
    font-size: 0.38rem;
    width: 100%;
    // text-align: left;
  }
  .van-dropdown-menu__item{
    border: 1px solid #ababab;
    border-radius: 3px;
    /*border: 1px solid #b3b3b3;*/
  }
  .van-dropdown-menu {
    height: 1rem;
    box-sizing: border-box;

    background: #f6f6f6;
  }
  .van-field__body {
    //  width: 100%;
    height: 1rem;
    line-height: 1rem;
     /*border: 1px solid #ababab;*/
    border-radius: 0.05rem;
    background: #f6f6f6;

    box-sizing: border-box;
  }

  .van-icon-success {
    height: 0.42rem;
    width: 0.42rem;
    line-height: 0.42rem;
    font-size: 0.38rem;
  }
  .van-field__control {
    // padding: 0 0.2rem;
    padding: 0 0.3rem;
    border: 1px solid #ababab;
    border-radius: 3px;
    height: 1rem;
    line-height: 1rem;
  }
  .van-field__clear {
    font-size: 0.3rem;
  }
  .van-field {
    padding: 0;
  }
  .van-cell--clickable {
    .van-cell__title {
      /*margin-left: 2.7rem;*/

    }
    .van-cell__value {
      display: none;
    }
  }
  .van-checkbox__icon {

    /*height: 100%;*/
    display: flex;
    align-items: center;
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
          /*display: flex;*/
          /*line-height: 0.48rem;*/
          align-items: center;
          font-size: 0.42rem;
          .row1 {
            flex: 1;
            color: #4c4c4c;
            /*margin-bottom: 0.12rem;*/
            font-weight: 600;
          }

          .isbefore::before {
              content: "*";
              display: inline-block;
              height: 100%;
              vertical-align: middle;
              color: #f56c6c;
              margin-right: 0.1rem;
            }
          .row2 {
            position: relative;
            /*width: 7rem;*/
            flex: 2;
            font-size: 0.42rem;
            /*word-break: break-all;*/
            color: #787878;
          }
        }
        li.interests{
          .row1{
            margin-bottom: 0.12rem;
          }

             .row2{
               .van-checkbox-group{
                 display: flex;
                 flex-wrap: wrap;
                 .van-checkbox{
                   /*padding: 0.12rem;*/
                   box-sizing: border-box;
                     display: flex;
                     align-items: flex-start;
                   /*width: 50%;*/

                 }
               }
             }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        button {
          font-size: 0.42rem;
          width: 8rem;
          height: 1rem;
          border-radius: 5px;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>
