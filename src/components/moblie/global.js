import axios from 'axios'
import Vue from 'vue'
import router from '../../router';

const global = {
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


  // new Promise (function (resolve,reject){
  //   axios({
  //     method: "get",
  //     url:`http://192.168.1.37:8080/bsl_web/base/getAllIndustry`,
  //   }).then(res=>{
  //     resolve(res)
  //   })


  // resolve(res);
  // arr = [...res.data.data.lists];
  // arr.forEach((item, idx) => {
  //   item.projectStartTime = this.timestampToTime(item.projectStartTime)
  //   item.signTime = this.timestampToTime(item.signTime)
  //   arr = Vue.set(arr, idx, item)
  //   console.log(arr)
  // })

  // }),

  previous() {
    router.go(-1);

  },
  cleanall() {
    this.$goto("login");
    sessionStorage.clear();

  }


  // abc:async function(url, num, currpage, pagesize){
  //   let a = await this.getdata(url, num, currpage, pagesize);
  //   console.log(a);
  // }


}

export default global
