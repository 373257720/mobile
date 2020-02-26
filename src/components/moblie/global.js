import axios from 'axios'
import Vue from 'vue'
import router from '../../router';
import qs from 'qs'

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
  changepage: function (url, methods, datas) {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: methods,
        data: datas
      }).then((res) => {
        resolve(res)
        // console.log(resolve);

      }).catch(function (error) {
        reject(error)
        // console.log(error);
      })
    })
  },
  pic_obj: {
    '1': "待处理",
    '2': "待签约",
    '3': "投行已拒绝",
    '4':'已签约待上链',
    '5': "已上链待推荐",
    '6': "待审核",
    '7': "投行已拒绝",
    '8':"已审核待发送",
    '9':'待投资者确认',
    '10':'签约成功',
    '11': "投资者已拒绝"
  },
  financingStage: {
    '0': '种子轮',
    '1': "天使轮",
    '2': "A轮",
    '3': "B轮",
    '4': "C轮",
    '5': "PRE-IPO",
    '6': "IPO",
  },
  // 投资者身份类型：1个人，2公司
  investorsType: {
    '1': '个人',
    '2': '公司'
  },
  get_encapsulation: function (url,  datas) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: datas
      }).then((res) => {
        resolve(res)
      }).catch(function (error) {
        reject(error)
        // console.log(error);
      })
    })
  },
  post_encapsulation: function (url,  datas) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(datas))
        .then((res) => {
          resolve(res)
        }).catch(function (error) {
        reject(error)
        // console.log(error);
      })
    })

  },
  goods_deatails: function (url, methods, datas, details_lists, nav_lists, investor_infor,middlemen) {
    return new Promise((resolve, reject) => {
      axios({
          url: url,
          method: methods,
          params: datas
        })
        .then((res) => {
          let {projectLifeCycle,signAgreement,investorsEmailSend,investorsId,projectName,signUserId3,signUserId1,signAgreementKey}= res.data.data;
          // let projectLifeCycle=res.data.data.projectLifeCycle;
          // let signAgreement = res.data.data.signAgreement;
          // let investorsEmailSend=res.data.data.investorsEmailSend;
          // let investorsId = res.data.data.investorsId;
          // let projectName = res.data.data.projectName;
          // let signUserId3=res.data.data.signUserId3;
          // let signUserId1=res.data.data.signUserId1;
          // let signAgreementKey = res.data.data.signAgreementKey;
          for (let i in res.data.data) {
            if(details_lists.collectMoney.hasOwnProperty(i)){
              if (i == "collectMoneyMax"){
                details_lists.collectMoney[i]=res.data.data[i]*1>0?res.data.data[i].toLocaleString():'';
              }else if (i == "collectMoneyMin"){
                details_lists.collectMoney[i]=res.data.data[i]*1>0?res.data.data[i].toLocaleString():'';
              }
            }
            if (details_lists.hasOwnProperty(i)) {
              if (i == "signStatus") {
                details_lists[i].response = this.pic_obj[
                  res.data.data[i]
                ];
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
    this.$goto("login");
    sessionStorage.clear();

  }


}

export default global
