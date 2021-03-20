// import Vue from "vue";
// import Validator from "vue-validator";
// Vue.use(Validator);
// //自定义验证器
// //添加一个简单的手机号验证
// //匹配0-9之间的数字,并且长度是11位
// Vue.validator("tel", function(val) {
//   return /^[0-9]{11}$/.test(val);
// });
// //添加一个密码验证
// //匹配6-20位的任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
// Vue.validator("passw", function(val) {
//   return /^(\w){6,20}$/.test(val);
// });

let strategies = {
  isArray: (value, errorMsg) => {
    if (value.length<1) {
      return errorMsg;
    }
  },
  isNotEmpty: (value, errorMsg) => {
    if (value === "" || value === null) {
      return errorMsg;
    }
  },
  emailFormat: (value, errorMsg) => {
    let ruleReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!ruleReg.test(value)) {
      return errorMsg;
    }
  },
  password: (value, errorMsg) => {
    // 最少8个字符，有1个大写字母和1个小写字母，以及至少1个数字。
    let ruleReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!ruleReg.test(value)) {
      return errorMsg;
    }
  },
  confirmpasswrod: (value, value2, errorMsg) => {
    console.log(value, value2);
    
    if (value2 !== value) {
      return errorMsg;
    }
  },
  minLength: (value, length, errorMsg) => {
    if (value.length < length) {
      return errorMsg;
    }
  },

  mobileFormat: (value, errorMsg) => {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
};

export var Validator = function() {
  this.cache = []; // 保存效验规则
};

Validator.prototype.add = function(dom, rules) {
  var self = this;
  for (var i = 0, rule; (rule = rules[i++]); ) {
    (function(rule) {
      var strategyAry = rule[0].split("|");
      var errorMsg = rule[1];
      self.cache.push(function() {
        var strategy = strategyAry.shift();     
        strategyAry.unshift(dom);
        strategyAry.push(errorMsg);   
        console.log(dom,strategyAry);   
        return strategies[strategy].apply(dom, strategyAry);
      });
    })(rule);
  }
  // var str = rule.split("|");
  // this.cache.push(function() {
  //   // str 返回的是 minLength:6
  //   var strategy = str.shift();
  //   // console.log(strategy);
  //   str.unshift(dom); // value添加进参数列表.
  //   // console.log(str);
  //   str.push(errorMsg); // 把errorMsg添加进参数列表
  //   // return  strategys[strategy](dom, str)
  //   // console.log(dom, str);

  //   return strategys[strategy].apply(dom, str);
};
Validator.prototype.start = function() {
  // let msg = [];
  // for (var i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
  //   var istrue = validatorFunc(); // 开始效验 并取得效验后的返回信息
  //   if (istrue) {
  //     msg.push(istrue);
  //   }
  // }
  // return msg;
  for (let i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
    // console.log(this.cache[i]);
    var errorMsg = validatorFunc();
    // console.log(errorMsg);
    
    if (errorMsg) {
      return errorMsg;
    }
  }
};
