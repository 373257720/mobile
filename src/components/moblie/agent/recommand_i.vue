<template>
  <div id="a_recommand_i">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <article>
        <!-- <header>{{title}}</header> -->
        <ul>
          <li class="identity">
            <p class="row1">投资者类型:</p>
            <p class="row2">
              <van-cell-group>
                <van-dropdown-menu >
                  <van-dropdown-item  v-model="form.investorsType" :options="investors_type" />
                </van-dropdown-menu>
              </van-cell-group>
            </p>
          </li>
          <li class="investorsCompany" v-show="form.investorsType==2">
            <p class="row1">投资者公司:</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="form.investorsCompany" placeholder="请输入" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">投资者姓名:</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="form.investorsName" placeholder="请输入" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsArea">
            <p class="row1">地区</p>
            <p class="row2">
<!--              <el-select-->
<!--                @change="selectregion(regionlist[form.bslAreaCode])"-->
<!--                v-model="form.investorsArea"-->
<!--                placeholder="请选择"-->
<!--                remote-->
<!--                :remote-method="region_remoteMethod"-->
<!--                filterable-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="(item,index) in region" :key="item.countryCode"  :label="item.text" :value="item.countryCode"-->
<!--                >-->
<!--&lt;!&ndash;                  <span style="float: left; ">{{ item.countryZhname }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;                  <span style="float: right; color: #8492a6; font-size: 13px">{{item.countryEnname}}</span>&ndash;&gt;-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--              <mu-select  @change="searchregion" solo filterable v-model="form.investorsArea" full-width>-->
<!--                <mu-option  v-for="(item,index) in region" :key="item.countryCode"  :label="item.text" :value="item.countryCode"></mu-option>-->
<!--              </mu-select>-->
<!-- 
              <van-cell-group>
                <van-dropdown-menu>
                  <van-dropdown-item
                    v-model="form.investorsArea"
                    :options="region"
                    :title="region_nametitle"
                    @change="function(value){
          return regionchoose(value,region[value])
        }"
                  />
                </van-dropdown-menu> -->
             <!-- <input type="text" class="layui-input blockInput" id="taskExpression" name="taskExpression" :v-model="region_nametitle" lay-verify="required"  oninput="ulHtml()"/> -->
            <!-- <div id="expressionDiv" class="expression" style="width: 535px;height:200px;display:none;border: 1px rgb(210, 210, 210) solid;"> -->
             
            <!-- </div> -->
                <!-- <van-field v-model="region_nametitle" placeholder="请输入" @focus='getlist' @input='ulHtml' @blur='judge'/>
                <ul id="expression" v-show="isshow">
                  <li v-for='(item,idx) in region' :key='idx' @click='selectregion(item)'>{{item.text}}</li>
                </ul> -->
                <!-- <a-select
            showSearch
            placeholder="请输入报告模板类型"
            v-decorator="['reportTemplate', validatorRules.reportTemplate]"
          >
          <a-select-option v-for="d in templateDatas" :key="d.value" :value="d.value">{{d.text}}</a-select-option>
          </a-select> -->
              <!-- </van-cell-group> -->
            <a-select
              showSearch
              placeholder="请输入"
              :value="form.investorsArea"
              :showArrow="false"
               :getPopupContainer="triggerNode => triggerNode.parentNode"
              :filterOption="false"
              @change="handleChange"
              @search='search'
              :notFoundContent="countrylist_fetching ? undefined : 'Not Found'"
            >
             <a-spin v-if="countrylist_fetching" slot="notFoundContent" size="small"/>
              <a-select-option :title='d.chinese' v-for="d in region" :key="d.remark" :value='d.value+1' >{{d.chinese}}{{d.eng}}</a-select-option>
         </a-select> 
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
// let currentValue;

// import jsonp from 'fetch-jsonp';
// import querystring from 'querystring';
export default {
  name: "a_recommand_i",
  data() {
    return {
      countrylist_fetching:false,
      investors_type: [{ text: "个人", value: 1 }, { text: "公司", value: 2 }],
      dad_text: "推荐投资人",
      title: "",
      region: [
        // {
        //   text: "地区",
        //   value: 0,
        //   remark: ""
        // }
      ],
      form: {
        investorsType: 1,
        investorsCompany: "",
        investorsName: "",
        investorsArea: "",
        projectId: "",
        // areaCode: ""
        // identity: ""
      }
    };
  },

  created() {
    this.form.projectId = this.$route.query.projectId;
    this.ulHtml('');
    // console.log(this.region)
  },
  computed: {

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
    //  console.log(value)
      this.form.investorsArea=this.region[value-1].chinese;
      this.countrylist_fetching = false;
      // console.log(this.form)
    },
    // handleBlur() {
    //   // console.log('blur');
    // },
    // handleFocus() {
    //   // console.log('focus');
    // },
    // filterOption(input, option) {
    //   if(this.region.length>0){
    //     return true
    //   }else{
    //     return false
    //   }
    //   // return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    // },
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
          // console.log(this.region)
         this.countrylist_fetching = false
      });
  
    },
    // selectregion(val) {
    //   console.log(val);
    //   this.region_nametitle=val.text;
    //   this.form.investorsArea=val.remark;
    //    this.isshow=false;
    //    this.iswatch=true;
    //   // this.form.bslAreaCode = val.countryCode;
    //   // this.form.projectArea = val.countryZhname;
    //   // this.form.projectAreaEn = val.countryEnname;
    // },
    remind(meg) {
      this.$dialog
        .alert({
          title: meg
          // message: "弹窗内容"
        })
        .then(() => {
          // this.$goto("mhome");
        });
    },
    regionchoose(value, region) {
      this.region_nametitle = region.text;
      this.form.investorsArea = region.text;
      // this.form.areaCode = region.remark;
      //  console.log(this.form.investorsArea,region.remark)
    },
    submit() {
       if(this.form.investorsType==2 && this.form.investorsCompany==''){
              this.$toast({ message:'请输入公司名称'});
            return  
        }
        if(this.form.investorsName==''){
            this.$toast('请输入投资者姓名');
            return
        }else if(this.form.investorsArea==''){
            this.$toast('请输入地区');
            return
        }
      this.commit();
    },
    commit() {
      this.$dialog
        .confirm({
          title: "确认提交"
          // message: "确认提交"
        })
        .then(() => {
          this.$axios({
            method: "post",
            url: `${this.$baseurl}/bsl_web/projectSign/submitInvestors`,
            data: this.$qs.stringify(this.form)
          }).then(res => {
            if (res.data.resultCode == 10000) {
              this.$dialog
                .alert({
                  title: res.data.resultDesc
                  // message: "弹窗内容"
                })
                .then(() => {
                  this.$goto("mhome");
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
    font-size: 0.38rem;
    color: #323233;
    .ant-select-selection__placeholder, .ant-select-search__field__placeholder{
      color:#969799;
    }
    .ant-select-selection{
       padding: 0 0.5rem;
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
  .el-select{
    height: 100%;
    width: 100%;
    background: #f6f6f6;
    padding: 0 0.5rem;
    box-sizing: border-box;

  }
  .el-input{
    height: 100%;

  }
  .el-input--suffix .el-input__inner{
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .el-input__inner{
    border: none;
    font-size: 0.38rem;
    color: #323233;
    background: #f6f6f6;
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
    padding: 0 0.5rem;
    box-sizing: border-box;
  }
  .van-field__control{
    height: 100%;
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
    border-radius: 0.05rem;
    // border: 0.01rem solid #ababab;
    background: #f6f6f6;
    .van-cell {
      font-size: 0.38rem;
      padding: 0 1rem;
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
    border-radius: 0.05rem;
    background: #f6f6f6;
    padding: 0 0.5rem;
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
  main {
    // z-index: -999;
    margin-top: 1.6rem;
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
        height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        // font-size: 0.5rem;
        color: #0f6ebe;
        // text-align: center;
        font-weight: 600;
        line-height: 0.7rem;
        // border-bottom: 0.1rem solid #b5b5b5;
      }
      ul {
        padding: 0.5rem 0.5rem 2rem 0.5rem;
        li {
          margin-bottom: 0.4rem;
          display: flex;
          height: 1rem;
          /*align-items: baseline;*/
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
            line-height: 1rem;
            /*margin-bottom: 0.2rem;*/
          }
            .row1::before {
                content: "*";
                color: #f56c6c;
                margin-right: 0.1rem;
            }  
          .row2 {
              position: relative;
            width: 7rem;
            height: 100%;
            word-break: break-all;
            /*line-height: 1.2rem;*/
            color: #787878;
            box-sizing: border-box;
             border: 1px solid #b3b3b3;

          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.38rem;
        button {
          width: 9.9rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>
