import axios from 'axios'
import Vue from 'vue'
import router from '../../router';
import  {i18n}  from '../../language'
import qs from 'qs'
import store from "../../store/store";

const global = {
  stamptodate: function (stamp) {
    if(stamp==''){
      return '';
    }
    var date = new Date(stamp);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10 ?
        "0" + (date.getMonth() + 1) :
        date.getMonth() + 1) + "-";
    var D =
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    return Y + M + D
  },
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为1
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
  },
  pic_obj: {
    '1': i18n.t('common.Pending'),
    '2': i18n.t('common.ToBeSigned'),
    '3': i18n.t('common.InvestmentBankHasRejected'),
    '4':i18n.t('common.SignedForChain'),
    '5':i18n.t('common.ChainedForRecommendation'),
    '6': ('common.PendingReview'),
    '7': i18n.t('common.InvestmentBankHasRejected'),
    '8':i18n.t('common.ReviewedPending'),
    '9':i18n.t('common.ToBeConfirmedByInvestors'),
    '10':i18n.t('common.SignedContract'),
    '11': i18n.t('common.InvestorHasRejected'),
  },
  financingStage: {
    '0': i18n.t('projectOwner.SeedRound'),
    '1':i18n.t('projectOwner.AngelWheel'),
    '2': i18n.t('projectOwner.ARound'),
    '3': i18n.t('projectOwner.BRound'),
    '4': i18n.t('projectOwner.CRound'),
    '5': "PRE-IPO",
    '6': "IPO",
  },
  // 投资者身份类型：1个人，2公司
  investorsType: {
    '1': i18n.t('common.individual'),
    '2': i18n.t('common.company'),
  },
  get_encapsulation: function (url,  datas) {
    if(Object.prototype.toString.call(datas) !== '[object Object]'){
        datas={};
    }
    if(store.state.X_Token){
      datas.X_Token=store.state.X_Token;
    }
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: datas
      },{ headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then((res) => {
        resolve(res)
      }).catch(function (error) {
        reject(error)
        // console.log(error);
      })
    })
  },
  post_encapsulation: function (url,  datas) {
    if(Object.prototype.toString.call(datas) !== '[object Object]'){
      datas={};
    }
    if(store.state.X_Token){
      datas.X_Token=store.state.X_Token;
    }
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(datas),{  headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },})
          .then((res) => {
            resolve(res)
          }).catch(function (error) {
          reject(error)
          // console.log(error);
        })

    })

  },
  goods_deatails: function (url, methods, datas, details_lists, nav_lists, investor_infor,middlemen) {
    datas.projectLan=i18n.locale;
    datas.X_Token=store.state.X_Token;
    console.log(datas)
    return new Promise((resolve, reject) => {
      axios({
          url: url,
          method: methods,
          params: datas
        })
        .then((res) => {
          // let {projectLifeCycle,signAgreement,investorsEmailSend,investorsId,projectName,signUserId3,signUserId1,signAgreementKey}= res.data.data;
          let projectLifeCycle=res.data.data.projectLifeCycle;
          let signAgreement = res.data.data.signAgreement;
          let investorsEmailSend=res.data.data.investorsEmailSend;
          let investorsId = res.data.data.investorsId;
          let projectName = res.data.data.projectName;
          let signUserId3=res.data.data.signUserId3;
          let investorsName=res.data.data.investorsName;
          let signUserId1=res.data.data.signUserId1;
          let investorsType=res.data.data.investorsType;
          let investorsCompany=res.data.data.investorsCompany;
          let signAgreementKey = res.data.data.signAgreementKey;
          for (let i in res.data.data) {
            if(details_lists.collectMoney.hasOwnProperty(i)){
              if ( res.data.data[i]*1>0){
                let value=Math.round(res.data.data[i]*100)/100;
                var s=value.toString().split(".");
                if(s.length==1){
                  details_lists.collectMoney[i]= (value.toLocaleString()).toString()+".00"
                }
                if(s.length>1){
                  if(s[1].length<2){
                    details_lists.collectMoney[i]= (value.toLocaleString()).toString()+"0"
                  }
                }
              }else{
                res.data.data[i]='';
              }
              // if (i == "collectMoneyMax" && res.data.data[i]*1>0){
              //   // details_lists.collectMoney[i]=res.data.data[i]*1>0?res.data.data[i].toLocaleString():'';
              // }else if (i == "collectMoneyMin"){
              //  let value=Math.round(res.data.data[i]*100)/100;
              //   var s=value.toString().split(".");
              //   if(s.length==1){
              //     details_lists.collectMoney[i]= (value.toLocaleString()).toString()+".00"
              //   }
              //   if(s.length>1){
              //     if(s[1].length<2){
              //       details_lists.collectMoney[i]= (value.toLocaleString()).toString()+"0"
              //     }
              //   }
              //   // details_lists.collectMoney[i]=res.data.data[i]*1>0?res.data.data[i].toLocaleString():'';
              // }
            }
            if (details_lists.hasOwnProperty(i)) {
              if (i == "signStatus") {
                details_lists[i].response = this.pic_obj[res.data.data[i]];
              } else if (i == "publicCompany") {
                details_lists[i].response = res.data.data[i] == false ? '否' : '是'
              } else {
                details_lists[i].response = res.data.data[i];
              }
            }
            if (nav_lists.hasOwnProperty(i)) {
              if (i == "financingStage") {
                nav_lists[i].response = this.financingStage[
                  res.data.data[i]
                ];
              } else {
                nav_lists[i].response = res.data.data[i];
              }
            }
            if (middlemen.hasOwnProperty(i)) {
              middlemen[i].response = res.data.data[i];
            }
            if (investor_infor.hasOwnProperty(i)) {
              if (i == 'investorsType') {
                investor_infor[i].response = this.investorsType[res.data.data[i]]
              } else {
                investor_infor[i].response = res.data.data[i];
              }
            }
          }
          let combin = {
            signUserId1:signUserId1,
            signUserId3:signUserId3,
            projectLifeCycle:projectLifeCycle,
            investorsEmailSend:investorsEmailSend,
            signAgreement: signAgreement,
            investorsId: investorsId,
            investorsType:investorsType,
            investorsName:investorsName,
            investorsCompany:investorsCompany,
            title: projectName,
            signAgreementKey: signAgreementKey,
          }
          resolve(combin)

        }).catch(function (error) {
          reject(error)
          // console.log(error);
        })
    })

  },

  previous() {
    router.go(-1);

  },
  cleanall() {
    this.$routerto("login");
    sessionStorage.clear();


  }


}

export default global
