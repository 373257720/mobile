<template>
  <div id="a_recommand_i">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <article>
        <ul>
          <li class="identity">
            <p class="row1 must">{{$t('agent.InvestorType')}}:</p>
            <p class="row2">
           <!--   <van-cell-group>
                <van-dropdown-menu >
                  <van-dropdown-item @change="cleanall" v-model="form.investorsType" :options="investors_type" />
                </van-dropdown-menu>
              </van-cell-group> -->
		 <a-select :default-value="1" @change="handleChange1">
			<a-select-option v-for="item in investors_type" :value="item.value" :key='item.value'>
				{{item.text}}
			</a-select-option>
		  </a-select>
            </p>
          </li>
          <li class="investorsArea">
            <p class="row1 must">{{$t('common.region')}}:</p>
            <p class="row2">
              <a-select
                showSearch
                :value="investorsArea"
                :placeholder="$t('ContractWrods.pleaseEnter')"
                :defaultActiveFirstOption="false"
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                :filterOption="false"
                @change="handleChange"
                @search='search'
                :notFoundContent="countrylist_fetching ? undefined : 'Not Found'"
              >
                <a-spin v-if="countrylist_fetching" slot="notFoundContent" size="small"/>
                <a-select-option :title='d.chinese' v-for="d in region" :key="d.remark" :value='d.value+1' >
                  <span style="margin-right: 0.1rem">{{d.eng}}</span><span>{{d.chinese}}</span></a-select-option>
              </a-select>
            </p>
          </li>
          <li class="investorsCompany" v-show="form.investorsType==2">
            <p class="row1 must">Investor company:</p>
            <p class="row2">
			<a-input  v-model="form.investorsCompanyEn" :placeholder="$t('ContractWrods.pleaseEnter')"/>
             <!-- <van-cell-group>
                <van-field  v-model="form.investorsCompanyEn" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group> -->
            </p>
          </li>
          <li class="investorsCompany" v-show="form.investorsType==2">
            <p class="row1">投资者公司(中文):</p>
            <p class="row2 ">
            <!--  <van-cell-group>
                <van-field  v-model="form.investorsCompany" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group> -->
			  <a-input  v-model="form.investorsCompany" :placeholder="$t('ContractWrods.pleaseEnter')"/>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1 must">{{$t('agent.InvestorName')}}:</p>
            <p class="row2">
          <!--    <van-cell-group>
                <van-field v-model="form.investorsName" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group> -->
			   <a-input :placeholder="$t('ContractWrods.pleaseEnter')"  v-model="form.investorsName"/>
            </p>
          </li>

        </ul>
        <footer>
          <button @click="submit">{{$t('ContractWrods.submit')}}</button>
        </footer>
      </article>
    </main>
<!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
let timeout;
// let currentValue;

// import jsonp from 'fetch-jsonp';
// import querystring from 'querystring';
export default {
  name: "a_recommand_i",
  data() {
    return {
      countrylist_fetching:false,
      investors_type: [{ text:  this.$t('common.individual'), value: 1 }, 
	  { text: this.$t('common.company'), value: 2 }],
      dad_text:  this.$t('agent.RecommendInvestors'),
      title: "",
      region: [
        // {
        //   text: "地区",
        //   value: 0,
        //   remark: ""
        // }
      ],
      investorsArea:undefined,
      form: {
        investorsType: 1,
        investorsCompany: "",
        investorsCompanyEn:'',
        investorsName: "",
        investorsArea: '',
        investorsAreaEn:'',
        projectId: "",
        signId:'',
        signStatus:'',
        signUserId1:'',

        // areaCode: ""
        // identity: ""
      }
    };
  },

  created() {
    this.form.projectId = this.$route.query.projectId?this.$route.query.projectId:"";
    this.form.signId= this.$route.query.projectId?this.$route.query.signId:-1;
    this.form.signStatus=this.$route.query.signStatus>=5?5:this.$route.query.signStatus;
    this.form.signUserId1=this.$route.query.signUserId1?this.$route.query.signUserId1:'';
    // console.log(this.form.signUserId1?1:2)
    this.ulHtml('');
  },
  computed: {

  },
  methods: {
	  handleChange1(value){
		  this.form.investorsType=value;
		  // console.log()
		  
		  
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
      this.investorsArea=this.$i18n.locale=='zh_CN'?this.region[value-1].chinese:this.region[value-1].eng;
     this.form.investorsAreaEn=this.region[value-1].eng;
      this.form.investorsArea=this.region[value-1].chinese;
      this.countrylist_fetching = false;
      // console.log(this.form)
    },
    cleanall(value){
        this.form.investorsCompany='';
    },
    ulHtml(val){
      this.region=[];
      let arr=[];
      this.countrylist_fetching=true;
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/base/countryList.do`,
        {
          searchKey:val,
        }
      )
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
          // console.log(this.region)
         this.countrylist_fetching = false
      });

    },
    remind(meg) {
      this.$dialog
        .alert({
          title: meg
          // message: "弹窗内容"
        })
        .then(() => {
        });
    },
    regionchoose(value, region) {
      this.region_nametitle = region.text;
      this.form.investorsArea = region.text;
      // this.form.areaCode = region.remark;
      //  console.log(this.form.investorsArea,region.remark)
    },
    submit() {
      // if(this.form.investorsType==2 && this.form.investorsCompany==''){
      //   this.$toast({ message:this.$t('agent.PleaseEnterTheCompanyName')});
      //   return
      // }
       if(this.form.investorsType==2 && this.form.investorsCompanyEn==''){
              this.$toast({ message:this.$t('agent.PleaseEnterTheCompanyName')});
          return
        }
        if(this.form.investorsName==''){
          this.$toast({ message:this.$t('agent.PleaseEnterInvestorName')});
            return
        }else if(this.form.investorsArea==''){
          this.$toast({ message:this.$t('agent.PleaseEnterRegion')});
            return
        }
      console.log(this.form)
      this.commit();
    },
    commit() {
      console.log(this.form)
      this.$dialog
        .confirm({
          title: this.$t('agent.Confirm')
          // message: "确认提交"
        })
        .then(() => {
          this.$loading()
           this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/projectSign/submitInvestors`,
             this.form)
            .then(res => {
              this.$toast.clear();
              if (res.data.resultCode == 10000) {
                this.$dialog
                  .alert({
                    title: res.data.resultDesc,
                    message: this.$t('agent.WaitingForInvestmentBankReview')
                  })
                  .then(() => {
                    this.$routerto("mysign")
                  });
              } else {
                this.remind(res.data.resultDesc);
              }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
#a_recommand_i {
   .ant-select-dropdown-menu{
      max-height: 4rem;
    }
  .ant-select{
    width: 100%;
    height: 100%;
    // border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 0.38rem;
    color: #323233;
    .ant-select-selection__placeholder, .ant-select-search__field__placeholder{
      color:#969799;
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
     height: 100%;
     line-height: 1rem;
     margin:0;
   }
    .ant-select-selection{
          // border: 0;
    }
  }
  .van-cell {
    font-size: 0.38rem;
    padding: 0 1rem;
    /*line-height: 1rem;*/
    // padding: 0;
    height: 100%;
    /*line-height: 1.2rem;*/
  }
  .van-dropdown-menu__title {
    font-size: 0.38rem;
    width: 100%;
    // height: 100%  ;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }
  .van-field__control{
    height: 100%;
    line-height: 1rem;
  }
  .van-dropdown-menu__item {
    justify-content: left;
    width: 100%;
    flex: none;
  }
  .van-cell-group{
    height: 100%;
  }
  .van-icon-arrow-left {
    position: absolute;
    left: 0.6rem;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
  .van-dropdown-menu {
    height: 100%;
    border-radius: 3px;
    border: 1px solid #b3b3b3;
    // border: 0.01rem solid #ababab;
    background: #f6f6f6;
    .van-cell {
      font-size: 0.38rem;
      padding: 0 0.8rem;
      line-height: 1rem;
      // padding: 0;
      height:1rem;
      /*line-height: 1.2rem;*/
    }
  }
  .van-field__body {
    //  width: 100%;
    /*height: 1rem;*/
    // border: 0.02rem solid #ababab;
    border-radius: 3px;
    border: 1px solid #b3b3b3;
    background: #f6f6f6;
    padding: 0 0.3rem;
    box-sizing: border-box;
    height: 100%;
  }
  .van-field__control {
    // padding: 0 0.2rem;
    // height: 0.5rem;
  }
  .van-field__clear {
    font-size: 0.32rem;
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
    height: 3.3rem;
    //  border: 0.01rem solid #ababab;
    //  overflow: hidden;

    img {
      //  border-radius: 0.02rem;
      border-radius: 0.1rem;
    }
  }
  .van-uploader {
    width: 100%;
    height: 3.3rem;
  }
  .van-uploader__upload {
    width: 100%;
    background: #f6f6f6;
    border: 0;
    height: 3.3rem;
    // border: 1px solid #ababab;
    border-radius: 0.05rem;
    box-sizing: border-box;
    .van-uploader__upload-icon {
      font-size: 0.5rem;
    }
  }
  // .van-uploader__input{
  //   height: 3.3rem;
  // }
  .van-dropdown-menu__title::after {
    border: 0.1rem solid;
    /*top: 50%;*/
    right: 0.5rem;
    margin: 0;
    transform: rotate(0);
    border-color: currentColor transparent transparent transparent;
  }
  .van-hairline--top-bottom::after {
    border: 0;
  }
  .van-dropdown-menu__title--down::after {
    border: 0.1rem solid;
    /*top: 50%;*/
    /*right: 0.5rem;*/
    border-color: currentColor transparent transparent transparent;
  }
}
</style>
<style lang="scss" scoped>
#a_recommand_i {
  width: 100%;
  height: 100%;
  main {
    padding-top: 1.6rem;
    background: #ffffff;
    article {
     padding: 0 0.5rem;
      width: 100%;
    }
      ul {
        padding: 0.5rem 0;
        li {
          margin-bottom: 0.4rem;
          /*line-height: 1rem;*/
          /*display:-webkit-box;*/
          /*display: -moz-box;*/
          /*display: -ms-flexbox;*/
          /*display: -webkit-flex;*/
          /*display: flex;*/

          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            /*width: 3rem;*/
            /*flex:2;*/
            /*line-height: 1rem;*/
            /*margin-bottom: 0.2rem;*/
          }
          .must::before {
                content: "*";
                color: #f56c6c;
                margin-right: 0.1rem;
            }
          .row2 {
              position: relative;
            /*flex:3;*/
            height: 1rem;
            word-break: break-all;
            border-radius: 3px;
            /*overflow: hidden;*/
            /*line-height: 1.2rem;*/
            color: #787878;
            box-sizing: border-box;
             /*border: 1px solid #b3b3b3;*/

          }
        }
      }
      footer {
        padding-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        font-size: 0.42rem;
        button {
          width: 8rem;
          border-radius:5px;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }


</style>
