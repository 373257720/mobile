<template>
  <div id="mhome">
    <header>
      <div>
        <img src="../../assets/b6914fa1dc74e7b7678ac9ffb9ad647.png" alt />
      </div>
      <van-search
        v-model="searchkey"
        :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
        show-action
        shape="round"
        left-icon
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">
          <van-icon name="search" />
        </div>
      </van-search>
      <van-dropdown-menu>
        <van-dropdown-item
          :title="industry_title"
          v-model="industry_value"
          ref="item"
        >
          <van-tree-select
            :items="items"
            :active-id="activeIds"
            :main-active-index="mainActiveIndex"
            @click-nav="onClickNav"
            @click-item="onClickItem"
          />
        </van-dropdown-item>
        <van-dropdown-item class='region_class' :title="region_title" ref="region" >
          <van-search v-model="text" @input='search_region' :placeholder="$t('common.PleaseEnterTheSearchKeyword')"/>
          <a-spin v-if="countrylist_fetching" size="small"/>
            <ul  v-if='!countrylist_fetching && countrylist.length>0'>
              <li v-for="d in countrylist" :class="d.classname" :key="d.remark" :value='d.value'
                  @click="select_country(d.remark,d.eng,d.chinese,d.value)">
                <span>{{d.eng}}</span>
                <span>{{d.chinese}}</span>
              </li>
            </ul>
            <ul  style="max-height:200px" v-else-if="!countrylist_fetching &&  countrylist.length<1">
              <li >{{$t('common.NoMore')}}</li>
            </ul>
        </van-dropdown-item>
     </van-dropdown-menu>
    </header>
    <div id="main">
      <div class="main">
         <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :loading-text="loadText"
           :finished-text="$t('common.NoMore')"
           :error-text="$t('common.RequestFailed')"
          :offset="300"
        >
          <div v-for="(goods,idx) in  upGoodsInfo" :key="idx" class="goodlists">
            <article @click="routerto(goods)">
              <nav>{{goods.projectName}}</nav>
              <section>
                <span>{{$t('common.Industry')}}:</span>
                <span>{{goods.projectIndustry}}</span>
              </section>
              <section>
                <span>{{$t('common.region')}}:</span>
                <span>{{goods.projectArea}}</span>
              </section>
              <section>
                <span>{{$t('common.ProjectDescription')}}:</span>
                <span v-html="goods.projectDescribe.length>90? goods.projectDescribe.substr(0, [90])+'...':goods.projectDescribe"></span>
                <!-- <div class="van-multi-ellipsis--l3" v-html="goods.projectDescribe"></div> -->
              </section>
              <div class="tag" v-if="usertype==1">
                <ul>
                  <li v-for="(item,key) in  tags" :key="item.text">
                    <div
                      v-if="goods.signUserList[key].length>0 && goods.signUserList[key][0].signCount">
                      <span class="spot"></span>
                      <span> {{item.text}}</span>
                      <span>({{goods.signUserList[key][0].signCount}})</span>
                    </div>
                  </li>
                </ul>
              </div>
            </article>
            <footer>
              <button
                v-if="usertype==1"
                :class="[goods.signUserList['signUserList10'][0].signCount>0?'isactive':'']"
                @click="router('p_investor_lists',{arr: JSON.stringify(goods.signUserList['signUserList10'][0].investorsIdList) })"
              >{{$t('common.InformationOfContractedInvestors')}} ({{goods.signUserList['signUserList10'][0].signCount?goods.signUserList['signUserList10'][0].signCount:0}})
              </button>
              <button class="isactive"
                v-else-if="usertype==3"
                @click="$routerto('i_conected_project',{projectId:goods.projectId,signStatus:goods.signUserResp[0].signStatus,signId:goods.signUserResp[0].signId})"
              >{{$t('common.ConnectedItems')}}</button>
              <button class="isactive" v-else-if="usertype==4" @click="routerto(goods)">{{$t('common.ItemsOfInterest')}}</button>

            </footer>
          </div>
        </van-list>
         </van-pull-refresh>
      </div>
    </div>
    <mbottom></mbottom>
  </div>
</template>
<script>
import {i18n} from "../../language";

let  timeout;
import { log } from "util";
export default {
  name: "mhome",
  data() {
    return {
      text:'',
      refreshing: false,
      countrylist_fetching:false,
      items: [
        {
          text: this.$t('common.Industry'),
          children: []
        }
      ],
      industry_title:this.$t('common.Industry'),
      usertype: "",
      activenum:0,//行业下标
      activeIds: '',//行业id
      tags: {
        signUserList1: {
          text: this.$t('common.Pending'),
          number: 0
        },
        signUserList2: {
          text: this.$t('common.ToBeSigned'),
          number: 0
        },
         signUserList4: {
          text: this.$t('common.SignedForChain'),
          number: 0
        },
        signUserList5: {
          text: this.$t('common.ChainedForRecommendation'),
          number: 0
        },
        signUserList6: {
          text: this.$t('common.PendingReview'),
          number: 0
        },
        signUserList8: {
          text: this.$t('common.ReviewedPending'),
          number: 0
        },
        signUserList9: {
          text: this.$t('common.ToBeConfirmedByInvestors'),
          number: 0
        },
        signUserList10: {
          text: this.$t('common.SignedContract'),
          number: 0
        },
        signUserList3711: {
          text: this.$t('common.InvestorHasRejected'),
          number: 0
        }},
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      // activeId: 1,
      searchkey: "",
      loading: false,
      finished: false,
      loadText: "Loading…",
      pageNum: 1,
      loadNumUp: 20,
      upGoodsInfo: [],
      industry_value: "", //行业value
      region_name: "",
      region_nametitle: "",
      region_title:this.$t('common.AllAreas'),
      countrylist: [
          {
            chinese: '全部地区',
            eng:'AllAreas',
            value: 0,
            remark: "",
            classname:''
          }
      ]
    };
  },
  created() {
    this.usertype = this.$store.state.currentUsertype;
    let axiosList = [
      this.$axios.get(`${this.$baseurl}/bsl_web/base/getAllIndustry?X_Token=${this.$store.state.X_Token}`),
      this.$axios.get(`${this.$baseurl}/bsl_web/base/countryList.do?X_Token=${this.$store.state.X_Token}`)
    ];
    this.$axios.all(axiosList).then(
      this.$axios.spread((res1, res2) => {
        if (res1) {
          console.log(this.$i18n.locale)
          if(this.$i18n.locale=='zh_CN'){
            for (let i = 0; i < res1.data.data.length; i++) {
              this.items[0].children.push({
                text: res1.data.data[i].industryNameCh,
                id: res1.data.data[i].industryId,
                num:i+1,
              });
            }
          }else{
            for (let i = 0; i < res1.data.data.length; i++) {
              this.items[0].children.push({
                text: res1.data.data[i].industryNameEn,
                id: res1.data.data[i].industryId,
                num:i+1,
              });
            }
          }

        }
        if (res2) {
          for (let i = 0; i < res2.data.data.length; i++) {
            this.countrylist.push({
                 chinese: res2.data.data[i].countryZhname,
                    eng:res2.data.data[i].countryEnname,
                    value: i+1,
                    remark: res2.data.data[i].countryCode,
                    classname:''
            });
          }
          // console.log(this.countrylist)
        }
      })
    );
    // this.loading = true
    // this.onLoad();
  },

  methods: {
    onRefresh() {
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.upGoodsInfo = [];
      this.pageNum = 1;
      this.onLoad();
    },
    select_country(remark,eng,chinese,idx) {
      console.log(remark,eng,chinese)
      if(this.$i18n.locale=='zh_CN'){
        this.region_title=chinese;
      }else{
        this.region_title=eng;
      }
      this.region_name=remark;
      this.countrylist_fetching = false;
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
      this.countrylist.forEach(item=>{
        item.classname='';
      })
      this.countrylist[idx].classname='country_isactive',
       this.$refs.region.toggle()
    },
    search_region(val){
    if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
    timeout = setTimeout(this.ulHtml(val), 300);
      ;
    },
   handleChange (value) {
      this.form.investorsArea=this.region[value.key].chinese;
      this.countrylist_fetching = false;
      // console.log(this.form)
    },
    ulHtml(val){
      this.countrylist=[];
      let arr=[];
      arr.push({
            chinese: this.$t('common.AllAreas'),
            eng:this.$t('common.AllAreas'),
            value: 0,
            remark: "",
            classname:''
          })
      this.countrylist_fetching=true;
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/base/countryList.do`,
        {searchKey:val})
      .then(res => {
         if(res.data.data.length>0){
            for (let i = 0; i < res.data.data.length; i++) {
                   arr.push({
                    chinese: res.data.data[i].countryZhname,
                    eng:res.data.data[i].countryEnname,
                    value: i+1,
                    remark: res.data.data[i].countryCode,
                    classname:''
                  });
             }
             this.countrylist=arr;
         }
         this.countrylist_fetching = false

      });

    },
    router(name, obj) {
      if (obj.arr && obj.arr.length > 0) {
        this.$routerto(name, obj);
      }
    },
  uniq(array){
  var temp = []; //一个新的临时数组
  for(var i = 0; i < array.length; i++){
    if(temp.indexOf(array[i]) == -1){
      temp.push(array[i]);
    }
  }
  return temp;
},
    routerto(item) {
      console.log(item)

      // this.$store.state.currentUsertype;
      if (this.$store.state.currentUsertype == 1) {
        let hash = [];
        for (var i = 0; i < item.signUserResp.length; i++) {
          if (hash.indexOf(item.signUserResp[i].signStatus) <0) {
            hash.push(item.signUserResp[i].signStatus);
          }
        }
        if(hash.includes(3) || hash.includes(7) || hash.includes(11)){
         hash= this.uniq(hash.concat(3,7,11))
        }
        if (item.signUserResp.length > 0) {
          this.$routerto(
            "mysign",
             {
              projectId: item.projectId,
              array:JSON.stringify(hash),
            }
          );
        } else if (item.signUserResp.length < 1) {

          let obj={
              projectId: item.projectId,
              signStatus: item.signUserResp[0].signStatus,
              signId: item.signUserResp[0].signId
          };
          this.$routerto("p_goods_details", obj);
        }
      } else if (this.$store.state.currentUsertype == 3) {
      let obj={
              projectId: item.projectId,
              signStatus: item.signUserResp[0].signStatus,
              signId: item.signUserResp[0].signId
        }
       this.$routerto('i_conected_project',obj)
        // this.$routerto("a_project_intro", { projectId: item.projectId });
      } else if (this.$store.state.currentUsertype == 4)
      {
        if(item.isSign==1){
             let obj={
                  projectId: item.projectId,
                  signStatus: item.signUserResp[0].signStatus,
                  signId: item.signUserResp[0].signId
            }
          if(item.signUserResp[0].signStatus<5){
            if(item.signUserResp[0].signStatus==1){
                this.$routerto("a_wait_review", obj);
            }else if(item.signUserResp[0].signStatus==2){
                this.$routerto("a_wait_signed", obj);
            }else if(item.signUserResp[0].signStatus==3){
                  this.$routerto("a_sign_failed", obj);
            }else if(item.signUserResp[0].signStatus==4){
                  this.$routerto("uploadtoblock", obj);
            }
          }
          else if(item.signUserResp[0].signStatus>=5){
              this.$routerto("a_project_intro", obj);
          }
        }else if(item.isSign==0){

          this.$routerto("a_project_intro", {
            projectId: item.projectId,
            isSign:"0",
            // signId: item.signUserResp[0].signId,
            signStatus: '0',
          });
        }
      }
    },

    onSearch() {
      // console.log(this.searchkey);
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
    },
    onClickNav(index) {
      this.mainActiveIndex = index;
    },
    onClickItem(data) {
      // console.log(data)
      if (this.activenum== data.num) {
        this.activenum=0;
        this.activeIds = '';
        this.industry_title=this.$t('common.Industry');
      } else {
        this.activenum=data.num
        this.activeIds = data.id;
        this.industry_title=this.items[0].children[this.activenum-1].text;
      }
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
    },
    onLoad() {
      // this.loading = true;
       if (this.refreshing) {
          this.upGoodsInfo= [];
          this.refreshing = false;
      }
      this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/project/getAllProject`,
        {
          searchKey: this.searchkey,
          pageIndex: this.pageNum,
          pageSize: this.loadNumUp,
          bslAreaCode: this.region_name,
          industryId: this.activeIds})
        .then(res => {
          if (res.status === 200) {
            let re = res.data.data.lists;
            if (re.length > 0) {
              this.upGoodsInfo = this.upGoodsInfo.concat(re);
              this.loading = false;
            }
            if (
              this.upGoodsInfo.length >= res.data.data.pageTotal ||
              this.upGoodsInfo.length == 0
            ) {
              this.finished = true;
            }
            this.pageNum++;
          } else {
            this.loading = false;
            this.finished = true;
          }
          // console.log(this.upGoodsInfo);

        })
        .catch(err => {
          // this.loadText = "加载失败";
          // document.querySelector(
          //   "#mhome .van-loading__circular"
          // ).style.display = "none";
          // let a = (document.querySelector("#mhome .van-loading__text").style =
          //   "margin-left:0");
          // console.log(a);
        });
    }
  }
};
</script>

<style lang="scss">
#mhome {
    .van-pull-refresh{
      // padding: 2.8rem 0 2rem 0;
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
  header {
    .van-hairline--top-bottom::after {
      border: 0;
    }
    .van-search__content--round{
      border:1px solid #ccc;
    }
    .van-search__action {
      // font-size: 4rem;
      div {
        display: flex;
        align-items: center;
        .van-icon-search {
          background: #ffc303;
          border-radius: 50%;
          width: 0.8rem;
          height: 0.8rem;
          font-weight: 600;
          color: #282407;
          text-align: center;
          line-height: 0.8rem;
          font-size: 0.44rem;
        }
      }
    }
    .region_class{
      .van-search{
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
      }
      .van-icon-clear{
          padding-right: 0.5rem;
      }
      .van-popup{
        // overflow-y: visible;
        overflow: hidden;
      }
      .country_isactive{
        color: #1989fa;
      }
    .ant-spin-spinning{
      padding: 0 0.5rem;
    }
      .van-popup {

    //  height: 6.2rem;
      ul{
          max-height: 6rem;
          // overflow: hidden;
      }
    }

    .van-cell {
      padding: 0;
      line-height: 1rem;
    }
     ul{
        overflow-y: auto;
         padding: 0 0.5rem;
        li{
          min-height: 1rem;
          cursor: pointer;
          font-size: 0.38rem;
        }
      }
    }

    .van-popup {
      max-height: 62%;

    }
    .van-cell {
      font-size: 0.32rem;
      line-height: 0.5rem;
      // height: 0.76rem;
      padding: 0 0.25rem 0 0;
    }

    .van-field__left-icon .van-icon,
    .van-field__right-icon .van-icon {
      font-size: 0.3rem;
    }
    .van-tree-select__nav-item {
      line-height: 1rem;
    }
    .van-tree-select__item {
      line-height: 1rem;
      font-weight: 400;
    }
    .van-tree-select__nav-item--active {
      border-color: rgb(25, 137, 250);
    }
    .van-tree-select__item--active {
      color: rgb(25, 137, 250);
    }
    .van-tree-select__selected {
      //  line-height: 1rem;
      margin-top: -0.2rem;
    }
    .van-field__control {
      height: 1rem;
      line-height: 1rem;
      font-size: 0.38rem;
      // font-size: 0.36rem;
    }
    .van-field__clear {
      // height: 0.1rem;
      font-size: 0.4rem;
    }
    .van-cell--clickable {
      padding: 0.2rem 0.3rem;
    }
    .van-dropdown-menu {
      height: 1.06rem;
      border-bottom: 1px solid #ccc;
      // line-height: 1.06rem;
      .van-dropdown-menu__title {
        font-size: 0.38rem;
      }
      .van-dropdown-item--down {
        .van-tree-select {
          font-size: 0.38rem;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
#mhome {
  display: flex;
  height: 100%;
  flex-direction: column;

  > header {
    width: 100%;
    z-index: 5;
    position: fixed;
    top: 0;
    background: white;
    h3 {
      text-align: center;
      font-size: 0.4rem;
      margin: 0.3rem 0;
    }
    > div {
       /*width: 100%;*/
      /*height:  2rem;*/
      img {
        /*width: auto;*/
        /*height: auto;*/
        /*display: block;*/
        // display: inline-block;
        width: 100%;
        /*width: auto;*/
        /*height: auto;*/
        /*max-width: 100%;*/
        /*max-height: 100%;*/
        height: 2rem;

      }
    }
  }
  #main {
    background: #eeeeee;
    height: 100%;
  }
  .main {
    padding: 4.84rem 0 1.3rem 0;
    // margin-bottom: 5rem;
    // height: 100%;
    background: #eeeeee;
    box-sizing: border-box;
    .goodlists {
      margin:0 0.1rem 0.2rem 0.1rem;
      background: white;
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
      article {
        padding: 0.27rem 0.46rem 0.27rem 0.46rem;
        border-bottom: 1px solid #ccc;
        nav {
          // width: 6.3rem;
          font-size: 0.5rem;
          color: #0f6ebe;
          font-weight: 600;
          line-height: 0.7rem;
          margin-bottom: 0.7rem;
          box-sizing: border-box;
        }
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          font-size: 0.34rem;
          flex-wrap: wrap;
          /*justify-content: space-between;*/
          div {
            display: flex;
            /*width: 6rem;*/
            /*padding: 0 0.2rem;*/
            color: #fdfffe  ;
            height: 0.6rem;
            align-items: center;
            /*line-height: 0.6rem;*/
            margin-right: 0.2rem;

            margin-bottom: 0.12rem;
            background: url(../../assets/1b8b7a9c6657be15ae60708495f9da3.png) no-repeat;
            /*background-origin:content-box;*/
            background-size: cover;
            span:nth-of-type(1){
              height: 0.2rem;
              width: 0.2rem;
              border-radius: 50%;
              margin:0 0.12rem;
              background: white;
            }
            span:nth-of-type(2){

             }
            span:nth-of-type(3){
              margin:0 0.12rem;
            }
          }
          /*foot*/

        }
        section {
          font-size: 0.38rem;
          margin-bottom: 0.1rem;
          color: #747474;
          // display: flex;
          span:nth-of-type(1) {
            // display: block;
            vertical-align: top;
            // line-height: 0.2rem;
            // width: 2.5rem;
            line-height: 0.4rem;
            // flex:
          }
          span:nth-of-type(2) {
            // display: inline-block;
            vertical-align: top;
            // width: 8.3rem;
            word-break: break-all;
            // flex: 1;
            line-height: 0.4rem;
          }
        }
        div.tag{
          min-height: 0rem;
          // max-height: 1.2rem;
        }
      }
      footer {
        height: 1.2rem;
        position: relative;
        display: flex;
        align-items: center;
        button {
          min-width: 45%;
          padding: 0 0.2rem;
          box-sizing: border-box;
          text-align: center;
          position: absolute;
          right: 0.25rem;
          border-radius: 0.125rem;
          height: 0.88rem;
          background: #747474;;
          /*background: #747474;;*/
          color: white;
          font-size: 0.38rem;
          // top: 50%;
          // transform: translateY(-50%);
        }

         .isactive{
           background: #00adef;

         }

      }
    }
  }
  #moblie_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>


