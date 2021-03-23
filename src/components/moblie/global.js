import axios from "axios";
import Vue from "vue";
import router from "../../router";
import { i18n } from "../../language";
import qs from "qs";
import { Dialog } from "vant";
Vue.use(Dialog);
import store from "../../store/store";
import AsyncValidator from "async-validator";
const global = {
  /**
  * 设置cookie
  * @param name cookie的名称
  * @param value cookie的值
  * @param day cookie的过期时间
  */
  setCookie(name, value, day) {
    if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      var expires = day * 24 * 60 * 60 * 1000;
      var date = new Date(+new Date() + expires);
      document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
      document.cookie = name + "=" + escape(value);
    }
  },
  /**
     * 获取对应名称的cookie
     * @param name cookie的名称
     * @returns {null} 不存在时，返回null
     */
    
  getCookie(name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  inputModel (value, point, iskeeppoint,max) {
    console.log(value);
    let val
    if (iskeeppoint) {
      val = value.replace(/[^\d.]/g, '')
    } else {
      val = value.replace(/[^\d]/g, '')
    }
    let len = val.length
    let newValue = val
    console.log(len)
    // 解决首位直接输入 '0开头的数字'问题
    if (len == 2 && val.charAt(0) == 0 && val.charAt(1) != '.') {
      newValue = val.charAt(1)
      return newValue
    }
    // 解决数字键盘可以输入输入多个小数点问题
    if (val.split('.').length > 2) {
      newValue = ''
      return newValue
    }
    // 解决开始就输入点问题
    if (val.indexOf('.') === 0) {
      newValue = ''
      return newValue
    }
    // 解决保留两位小数问题
    if (val) {
      let pointIndex = val.indexOf('.')
      if (point === 0 && len === 2 && val.charAt(pointIndex) === '.') {
        console.log('只能输入整数')
        newValue = val.substr(0, pointIndex)
        return newValue
      }
      if (pointIndex > 0 && len - pointIndex > point + 1) {
        console.log('只能输入' + point + '位小数')
        newValue = val.substr(0, pointIndex + point + 1)
        return newValue
      }
    }
    // 解决输入最大值问题
    if (max > 0 && val > max) {
      //   console.log("---4---");
      value = val.substr(0, len - 1);
      return value;
    }

    return newValue
  },
  isJSON(str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log('error：' + str + '!!!' + e);
        return false;
      }
    }
    console.log('It is not a string!')
  },
  quickSort(arr, key, order) {
    if (arr.length < 2) { return arr; }
    let baseindex = Math.floor(arr.length / 2);
    let base = arr.splice(baseindex, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
      if (key) {
        if (order == "ascending") {
          if (arr[i][key] < base[key]) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);
          }
        } else if (order == "descending") {
          if (arr[i][key] > base[key]) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);
          }
        }

      } else {
        if (order == "ascending") {
          if (arr[i] < base) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);

          }
        } else if (order == "descending") {
          if (arr[i] > base) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);

          }
        }

      }
    }
    return this.quickSort(left, key, order).concat([base], this.quickSort(right, key, order));

  },
  //去除换行 
  ClearBr(key) {
    // key = key.replace(/<\/?.+?>/g, "");
    key = key.replace(/[\r\n]/g, "");
    return key;
  },
  //去除空格 
  rim(str) {
    return str.replace(/>\s+</g, "><")
    // return str.replace(/\s+/g, "");
  },
  nodeToString(node) {
    var tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    var str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks in IE
    return str;
  },
  lan() {
    if (i18n.locale == "zh_CN") {
      return "";
    } else {
      return "En";
    }
  },
  countryLan() {
    if (i18n.locale == "zh_CN") {
      return "Zh";
    } else {
      return "En";
    }
  },
  language() {
    if (i18n.locale == "zh_CN") {
      return "Ch";
    } else {
      return "En";
    }
  },
  // format num add comma
  formatNum: function (num) {
    let value = Math.round(num * 100) / 100;
    let s = value.toString().split(".");
    let format_num;
    if (s.length == 1) {
      format_num = value.toLocaleString().toString() + ".00";
    } else if (s.length > 1) {
      if (s[1].length < 2) {
        format_num = value.toLocaleString().toString() + "0";
      }
    }
    return format_num;
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
  recursion(arr) {
    let result = []
    arr.forEach((item, idx) => {
      if (item.hasOwnProperty('listResult')) {
        if (item["listResult"].length) {
          result[idx] = this.recursion(item["listResult"])
          console.log(result[idx]);
          //result.push(...this.recursion(item["listResult"]));
        } else {
          result[idx] = item["listResult"]
          console.log(result[idx]);
        }
      }
    });
    return result;
  },
  iteration(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // console.log(obj[key]);
        let newObj;
        if (obj[key].hasOwnProperty('listResult')) {
          let label;
          if (obj[key].layer === 0) {
            label = "投资者"
          } else {
            label = '第' + obj[key].layer + '层中间人'
          }
          newObj = Object.assign({
            children: obj[key].listResult,
            id: obj[key].signId,
            label: label,
            // type: "image",
            // img:
            //   "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
          })
          // console.log(obj[key]);
        } else {
          newObj = obj[key]
        }
        result[key] = this.iteration(newObj); //递归复制
      } else {
        result[key] = obj[key]
      }

    }
    // console.log(result);
    return result;
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
    //console.log(result);
    return result;
  },
  newdateTodate: function (stamp) {
    if (stamp) {
      var date = new Date(stamp);
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
  stamptodate: function (timestamp) {
    if (timestamp) {
      let date;
      if (timestamp.toString().length == 10) {
        date = new Date(parseInt(timestamp * 1000));

      } else if (timestamp.toString().length == 13) {
        date = new Date(parseInt(timestamp));
      }
      console.log(date.getFullYear());
      //时间戳为10位需*1000，时间戳为1
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      return Y + M + D;
    }
  },
  timestampToTime: function (timestamp) {
    if (timestamp) {
      let date;
      if (timestamp.toString().length == 10) {
        date = new Date(parseInt(timestamp * 1000));

      } else if (timestamp.toString().length == 13) {
        date = new Date(parseInt(timestamp));
      }
      console.log(date.getFullYear());
      //时间戳为10位需*1000，时间戳为1
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
    }

  },
  pic_obj: {
    "1": i18n.t("project.PendingItems"),
    "2": i18n.t("project.Projecttobesigned"),
    "3": i18n.t("project.failedSigned"),
    "4": i18n.t("project.MiddleAgreeContract"),
    "5": i18n.t("project.failedSigned"),
    "6": i18n.t("project.failedSigned"),
    "7": i18n.t("project.waitMiddleSigned"),
    "8": i18n.t("project.unfinishedSignContract"),
    "9": i18n.t("project.chainedToRecommand")
    // "10": "common.SignedContract",
    // "11": "common.InvestorHasRejected"
  },
  sharingMechanismType: {
    0: "中間人總募資金額的百分比",
    1: "項目方兌佣金收入的百分比",
  },
  ndastage: {
    "1": "申请签署NDA项目",
    "2": "等待中间人签约NAD",
    "3": "NAD签署待上链",
    "4": "NDA签署已上链",
  },
  middleman_obj: {
    "1": i18n.t("project.PendingItems"),
    "2": i18n.t("project.Projecttobesigned"),
    "3": i18n.t("project.failedSigned"),
    "4": i18n.t("project.MiddleAgreeContract"),
    "5": i18n.t("project.failedSigned"),
    "6": i18n.t("project.failedSigned"),
    "7": i18n.t("project.waitMiddlemanSigned"),
    "8": i18n.t("project.unfinishedSignContract"),
    "9": i18n.t("project.chainedToRecommand"),

    // "10": "common.SignedContract",
    // "11": "common.InvestorHasRejected"
  },
  financingStage: {
    // 0: "projectOwner.SeedRound",
    0: i18n.t("projectOwner.AngelWheel"),
    1: i18n.t("projectOwner.ARound"),
    2: i18n.t("projectOwner.BRound"),
    3: i18n.t("projectOwner.CRound"),
    4: i18n.t("projectOwner.PreIPO"),
    5: i18n.t("projectOwner.DebtFinancing")
  },
  // 0初步接洽；1在物色投資者；2已完成部份融；3完成融資
  projectStatus: {
    0: "初步接洽",
    1: "在物色投資者",
    2: "已完成部份融资",
    3: "完成融資"
  },
  // 投资者身份类型：1个人，2公司
  investorsType: {
    1: "common.individual",
    2: "common.company"
  },
  encapsulation(url, datas, method) {
    if (method == "get") {
      this.get_encapsulation(url, datas)
    } else if (method == "post") {
      this.post_encapsulation(url, datas)
    }
  },

  get_encapsulation: function (url, datas) {
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
        .catch(function (error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  post_encapsulation: function (url, datas, cancel) {
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
        .catch(function (error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  previous() {
    if (this.getCookie('islogin')) {
      router.go(-1);
    } else {
      Dialog.alert({
        title: "cookie已不存在，需要重新登录"
      }).then(() => {
        const restore_obj = this.deepCopy(store._modules.root.state);
        store.dispatch("reset_actions", restore_obj);
        window.sessionStorage.clear();
        location.href = process.env.WEB_API;
      });
    }



  },
  cleanall() {
    this.$routerto("login");
    sessionStorage.clear();
  },

};

export default global;
