import axios from 'axios'
import Vue from 'vue'
import router from '../../router';

const global = {
  stamptodate: function (stamp) {
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
    '1': "待审核",
    '2': "待签约",
    '5': "待确认",
    '6': "成功签约",
    '3': "投行已拒绝",
    '4': "已签约待发送邮件",
    '7': "投资者已拒绝"

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

  goods_deatails: function (url, methods, datas) {
    let details_lists = [{
        keyword: "projectIndustry",
        name: "行业:",
        response: ""
      },
      {
        keyword: "projectArea",
        name: "地区:",
        response: ""
      },
      {
        keyword: "signStatus",
        name: "项目状态",
        response: ""
      },
      {
        keyword: "projectCompany",
        name: "公司名称:",
        response: ""
      },
      {
        keyword: "publicCompany",
        name: "是否是上市公司",
        response: ""
      },
      {
        keyword: "collectMoney",
        name: "集资额:",
        response: ""
      },
      {
        keyword: "projectMobile",
        name: "联络电话:",
        response: ""
      },
      {
        keyword: "projectEmail",
        name: "电邮",
        response: ""
      },

      {
        keyword: "projectDescribe",
        name: "项目介绍",
        response: ""
      }
    ];
    let nav_lists = [{
        keyword: "financingStage",
        name: "融资阶段",
        response: ""
      },
      {
        keyword: "interestProjectCount",
        name: "项目方<br>有兴趣数量",
        response: ""
      },
      {
        keyword: 'committedCount',
        name: "已提交</br>投资者数量",
        response: ""
      }
    ];
    let investor_infor = [{
        keyword: 'investorsType',
        name: "投资者类型:",
        response: ""
      },
      {
        keyword: 'investorsCompany',
        name: "投资者公司:",
        response: ""
      },
      {
        keyword: 'investorsName',
        name: "投资者姓名:",
        response: ""
      },
      {
        keyword: 'investorsArea',
        name: "投资者地区:",
        response: ""
      }
    ];
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: methods,
        data: datas
      }).then((res) => {

        let projectName = res.data.data.projectName;
        for (var i in res.data.data) {
          for (var j = 0; j < details_lists.length; j++) {
            if (details_lists[j].keyword == i) {
              if (details_lists[j].keyword == "signStatus") {
                details_lists[j].response = this.pic_obj[
                  res.data.data[i]
                ];
              } else if (details_lists[j].keyword == "publicCompany") {
                details_lists[j].response = res.data.data[i] == false ? '否' : '是'

              } else {
                details_lists[j].response = res.data.data[i];
              }
            }

          }
          for (var w = 0; w < nav_lists.length; w++) {
            if (nav_lists[w].keyword == i) {
              if (nav_lists[w].keyword == "financingStage") {
                nav_lists[w].response = this.financingStage[
                  res.data.data[i]
                ];
              } else {
                nav_lists[w].response = res.data.data[i];
              }
            }
          }
          // if()
        }
        let combin = {
          details_lists: details_lists,
          nav_lists: nav_lists,
          title: projectName
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
