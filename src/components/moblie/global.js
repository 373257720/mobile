import axios from "axios";
import Vue from "vue";
import router from "../../router";
import { i18n } from "../../language";
import qs from "qs";
import store from "../../store/store";
import AsyncValidator from "async-validator";
const global = {
  nodeToString(node) {
    var tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    var str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks in IE
    return str;
  },
  amountKeyupFunn(e) {
    var reg = /^[0-9]{1,2}\.[0-9]{2}$/;
    //  /(^[1-9]d?\.[0-9]{0,2}$)|(^0\.[0-9]{0,2}$)/;
    // /(^[1-9]\d?\.d{0,2}$)|(^0\.d{0,2}$)/;

    var event = e || window.event;
    var target = event.target || event.srcElement;
    console.log(target.value);
    // let b = target.value.match(reg) ? target.value.match(reg) : "";
    // if (target.value.length == 1) {
    //   e.target.value = target.value.replace(/[^1-9]/g, "");
    // } else {

    //   b = target.value.replace(/\D/g, "");
    // }
    // console.log(b);
  },
  singerValitator(event, form, rules) {
    let validator = new AsyncValidator({
      [event.target.name]: rules[event.target.name]
    });
    return new Promise((resolve, reject) => {
      validator
        .validate(
          { [event.target.name]: form[event.target.name] },
          { first: true }
        )
        .then(res => {
          resolve(res);
        })
        .catch(({ errors, fields }) => {
          reject({ errors, fields });
        });
    });
  },
  deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        // console.log(key);

        if (typeof obj[key] === "object" && obj[key] !== null) {
          result[key] = this.deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  stamptodate: function(stamp) {
    // if(stamp==''){
    //   return '';
    // }
    if (stamp) {
      var date = new Date(stamp * 1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      return Y + M + D;
    } else {
      return "";
    }
  },
  timestampToTime: function(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为1
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  pic_obj: {
    "1": "common.Pending",
    "2": "common.ToBeSigned",
    "3": "common.InvestmentBankHasRejected",
    "4": "common.SignedForChain",
    "5": "common.ChainedForRecommendation",
    "6": "common.PendingReview",
    "7": "common.InvestmentBankHasRejected",
    "8": "common.ReviewedPending",
    "9": "common.ToBeConfirmedByInvestors",
    "10": "common.SignedContract",
    "11": "common.InvestorHasRejected"
  },
  financingStage: {
    "0": "projectOwner.SeedRound",
    "1": "projectOwner.AngelWheel",
    "2": "projectOwner.ARound",
    "3": "projectOwner.BRound",
    "4": "projectOwner.CRound",
    "5": "common.PREIPO",
    "6": "common.IPO"
  },
  // 投资者身份类型：1个人，2公司
  investorsType: {
    "1": "common.individual",
    "2": "common.company"
  },
  get_encapsulation: function(url, datas) {
    if (Object.prototype.toString.call(datas) !== "[object Object]") {
      datas = {};
    }
    if (store.state.X_Token) {
      datas.X_Token = store.state.X_Token;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: datas
        })
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  post_encapsulation: function(url, datas, cancel) {
    if (Object.prototype.toString.call(datas) !== "[object Object]") {
      datas = {};
    }
    if (Object.prototype.toString.call(cancel) !== "[object Object]") {
      cancel = {};
    }

    if (store.state.X_Token) {
      datas.X_Token = store.state.X_Token;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(url, datas, cancel, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  goods_deatails: function(
    url,
    methods,
    datas,
    details_lists,
    nav_lists,
    investor_infor,
    middlemen
  ) {
    if (!datas.projectLan) {
      datas.projectLan = i18n.locale;
    }
    if (store.state.X_Token) {
      datas.X_Token = store.state.X_Token;
    }
    // console.log(datas)
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: methods,
        params: datas
      })
        .then(res => {
          let {
            projectLifeCycle,
            signAgreement,
            investorsEmailSend,
            investorsId,
            projectName,
            investorsName,
            signUserId3,
            signUserId1,
            investorsType,
            investorsCompany,
            signAgreementKey,
            projectLan
          } = res.data.data;
          // let projectLifeCycle=res.data.data.projectLifeCycle;
          // let signAgreement = res.data.data.signAgreement;
          // let investorsEmailSend=res.data.data.investorsEmailSend;
          // let investorsId = res.data.data.investorsId;
          // let projectName = res.data.data.projectName;
          // let signUserId3=res.data.data.signUserId3;
          // let investorsName=res.data.data.investorsName;
          // let signUserId1=res.data.data.signUserId1;
          // let investorsType=res.data.data.investorsType;
          // let investorsCompany=res.data.data.investorsCompany;
          // let signAgreementKey = res.data.data.signAgreementKey;
          for (let i in res.data.data) {
            if (details_lists.collectMoney.hasOwnProperty(i)) {
              if (res.data.data[i] * 1 > 0) {
                let value = Math.round(res.data.data[i] * 100) / 100;
                var s = value.toString().split(".");
                if (s.length == 1) {
                  details_lists.collectMoney[i] =
                    value.toLocaleString().toString() + ".00";
                }
                if (s.length > 1) {
                  if (s[1].length < 2) {
                    details_lists.collectMoney[i] =
                      value.toLocaleString().toString() + "0";
                  }
                }
              } else {
                res.data.data[i] = "";
              }
            }
            if (details_lists.hasOwnProperty(i)) {
              if (i == "signStatus") {
                details_lists[i].response = i18n.t(
                  this.pic_obj[res.data.data[i]]
                );
              } else if (i == "publicCompany") {
                details_lists[i].response =
                  res.data.data[i] == false
                    ? i18n.t("common.isno")
                    : i18n.t("common.isyes");
              } else {
                details_lists[i].response = res.data.data[i] || "-";
              }
            }
            if (nav_lists.hasOwnProperty(i)) {
              if (i == "financingStage") {
                nav_lists[i].response = i18n.t(
                  this.financingStage[res.data.data[i]]
                );
              } else {
                nav_lists[i].response = res.data.data[i] || 0;
              }
            }
            if (middlemen.hasOwnProperty(i)) {
              if (i == "userIdentityType") {
                middlemen.Type = res.data.data[i];
              }
              middlemen[i].response = res.data.data[i] || "-";
            }
            if (investor_infor.hasOwnProperty(i)) {
              if (i == "investorsType") {
                investor_infor.Type = res.data.data[i];
                investor_infor[i].response = i18n.t(
                  this.investorsType[res.data.data[i]]
                );
              } else if (i == "investorsArea") {
                if (projectLan == "zh_CN") {
                  investor_infor[i].response =
                    res.data.data.investorsArea || "-";
                } else {
                  investor_infor[i].response =
                    res.data.data.investorsAreaEn || "-";
                }
              } else if (i == "investorsCompany") {
                if (projectLan == "zh_CN") {
                  investor_infor[i].response =
                    res.data.data.investorsCompany || "-";
                } else {
                  investor_infor[i].response =
                    res.data.data.investorsCompanyEn || "-";
                }
                // console.log(investor_infor)
              } else {
                investor_infor[i].response = res.data.data[i];
              }
            }
          }
          let combin = {
            signUserId1: signUserId1,
            signUserId3: signUserId3,
            projectLifeCycle: projectLifeCycle,
            investorsEmailSend: investorsEmailSend,
            signAgreement: signAgreement,
            investorsId: investorsId,
            investorsType: investorsType,
            investorsName: investorsName,
            investorsCompany: investorsCompany,
            title: projectName,
            signAgreementKey: signAgreementKey
          };
          resolve(combin);
        })
        .catch(function(error) {
          reject(error);
          // console.log(error);
        });
    });
  },

  previous() {
    router.go(-1);
  },
  cleanall() {
    this.$routerto("login");
    sessionStorage.clear();
  },
  get_deatails: function(
    url,
    methods,
    datas,
    details_lists,
    nav_lists,
    investor_infor,
    middlemen
  ) {
    if (!datas.projectLan) {
      datas.projectLan = i18n.locale;
    }
    if (store.state.X_Token) {
      datas.X_Token = store.state.X_Token;
    }
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: methods,
        params: datas
      })
        .then(res => {
          let {
            projectLifeCycle,
            signAgreement,
            investorsEmailSend,
            investorsId,
            projectName,
            userIdentityType3,
            investorsName,
            projectLan,
            userCompanyCh3,
            signUserId3,
            signUserId1,
            investorsType,
            userCompanyEn3,
            userName3,
            userCountryCh3,
            userCountryEn3,
            investorsCompany,
            signAgreementKey
          } = res.data.data;
          for (let i in res.data.data) {
            if (details_lists.collectMoney.hasOwnProperty(i)) {
              if (res.data.data[i] * 1 > 0) {
                let value = Math.round(res.data.data[i] * 100) / 100;
                var s = value.toString().split(".");
                if (s.length == 1) {
                  details_lists.collectMoney[i] =
                    value.toLocaleString().toString() + ".00";
                }
                if (s.length > 1) {
                  if (s[1].length < 2) {
                    details_lists.collectMoney[i] =
                      value.toLocaleString().toString() + "0";
                  }
                }
              } else {
                res.data.data[i] = "";
              }
            }
            if (details_lists.hasOwnProperty(i)) {
              if (i == "signStatus") {
                details_lists[i].response = i18n.t(
                  this.pic_obj[res.data.data[i]]
                );
              } else if (i == "publicCompany") {
                details_lists[i].response =
                  res.data.data[i] == false
                    ? i18n.t("common.isno")
                    : i18n.t("common.isyes");
              } else {
                details_lists[i].response = res.data.data[i] || "-";
              }
            }
            if (nav_lists.hasOwnProperty(i)) {
              if (i == "financingStage") {
                nav_lists[i].response = i18n.t(
                  this.financingStage[res.data.data[i]]
                );
              } else {
                nav_lists[i].response = res.data.data[i] || 0;
              }
            }
            if (middlemen.hasOwnProperty(i)) {
              middlemen[i].response = res.data.data[i] || "-";
            }
            if (investor_infor.hasOwnProperty(i)) {
              if (i == "investorsType") {
                investor_infor.Type = res.data.data[i];
                investor_infor[i].response = i18n.t(
                  this.investorsType[res.data.data[i]]
                );
              } else if (i == "investorsArea") {
                if (projectLan == "zh_CN") {
                  investor_infor[i].response =
                    res.data.data.userCountryCh3 ||
                    res.data.data.investorsArea ||
                    "-";
                } else {
                  investor_infor[i].response =
                    res.data.data.userCountryEn3 ||
                    res.data.data.investorsAreaEn ||
                    "-";
                }
              } else if (i == "investorsCompany") {
                if (projectLan == "zh_CN") {
                  investor_infor[i].response =
                    res.data.data.userCompanyCh3 ||
                    res.data.data.investorsCompany ||
                    "-";
                } else {
                  investor_infor[i].response =
                    res.data.data.userCompanyEn3 ||
                    res.data.data.investorsCompanyEn ||
                    "-";
                }
              } else {
                investor_infor[i].response = res.data.data[i];
              }
            }
          }
          let combin = {
            signUserId1: signUserId1,
            signUserId3: signUserId3,
            projectLifeCycle: projectLifeCycle,
            investorsEmailSend: investorsEmailSend,
            signAgreement: signAgreement,
            investorsId: investorsId,
            investorsType: userIdentityType3,
            investorsCompany: userCompanyCh3,
            investorsCompanyEn: userCompanyEn3,
            investorsName: userName3,
            investorsArea: userCountryCh3,
            investorsAreaEn: userCountryEn3,
            title: projectName,
            signAgreementKey: signAgreementKey
          };
          resolve(combin);
        })
        .catch(function(error) {
          reject(error);
          // console.log(error);
        });
    });
  }
};

export default global;
