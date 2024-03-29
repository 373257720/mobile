import Vue from "vue";
// import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import VeeValidate, { Validator } from "vee-validate";
import { i18n } from "../../../language";
// import zh_CN from "vee-validate/dist/locale/zh_CN";
// import zh from "vee-validate/dist/locale/zh_CN";
// import en from "vee-validate/dist/locale/en";
// console.log(zh);
// console.log(i18n);

// Validator.addLocale(zh);
// Validator.localize('zh', zh);
// Vue.use(VeeValidate, {
//   i18nRootKey: "validations",
//   // customize the root path for validation messages.
//   locale: i18n.locale,
//   dictionary: {
//     zh_CN,
//     // en
//     // en_US
//   }
// });
const dictionary = {
  en: {
    messages: {
      required: () => "Some English Message"
    }
  },
  zh_CN: {
    messages: {
      required:  "1111"
    }
  }
};
Validator.localize(dictionary);
const validator = new Validator({ first_name: "required" });
validator.localize("zh_CN");
Vue.use(VeeValidate);

// console.log(Validator.add);

// import attributesEn from './strings/validator/attributes/en.js';
// import VeeValidate from "vee-validate";

// 引入中文文件
// Validator.localize('cn', cn);
// import * as rules from "vee-validate/dist/rules";
// import { messages } from "vee-validate/dist/locale/zh_CN.json";

// extend("secret", {
//   validate: value => value === "example",
//   message: "This is not the magic word"
// });
// Object.keys(rules).forEach(rule => {
//   extend(rule, {
//     ...rules[rule],
//     message: messages[rule]
//   });
// });
// Register it globally
// Vue.component("ValidationProvider", ValidationProvider);
// Vue.component("ValidationObserver", ValidationObserver);
// No message specified.

// Override the default message.
// extend("required", {
//   ...required,
//   message: "This field is required"
// });
// 自定义validate

// const validator = {
//   getMessage(field, args) {
//     // will be added to default locale messages.
//     // Returns a message.
//   },
//   validate(value, args) {
//     // Returns a Boolean or a Promise that resolves to a boolean.
//   }
// };

// 1.IPV4地址
Validator.extend("ipAddr", {
  messages: {
    zh_CN: field => "请输入正确的IPV4地址"
  },
  validate: value => {
    return /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/.test(
      value
    );
  }
});

// 2.端口【0~65535】
Validator.extend("port", {
  messages: {
    zh_CN: field => "请输入正确格式的端口号"
  },
  validate: value => {
    return /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(
      value
    );
  }
});

// 3.用户昵称
Validator.extend("name", {
  getMessage: field => i18n.t("common.isno"),
  validate: value => {
    return /^[\u4e00-\u9fa5A-Za-z0-9]*$/.test(value);
  }
});

// 4.用户昵称
Validator.extend("phone", {
  messages: {
    zh_CN: field => "手机号格式不正确"
  },
  validate: value => {
    return /^1[2-9]\d{9}$/.test(value);
  }
});

// 5.邮箱
Validator.extend("email", {
  messages: {
    zh_CN: field => "邮箱格式不正确"
  },
  validate: value => {
    return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(
      value
    );
  }
});

// 6.验证码
Validator.extend("code", {
  messages: {
    zh_CN: field => "验证码格式不正确"
  },
  validate: value => {
    return /^[0-9]*$/.test(value);
  }
});

// 6.登录密码
Validator.extend("logpwd", {
  messages: {
    zh_CN: field => "登录密码格式不正确"
  },
  validate: value => {
    return /^\S{6,18}$/.test(value);
  }
});

// 7.交易密码
Validator.extend("tradpwd", {
  messages: {
    zh_CN: field => "交易密码格式不正确"
  },
  validate: value => {
    return /^\S{6,18}$/.test(value);
  }
});

// 8.推荐人
Validator.extend("recom", {
  messages: {
    zh_CN: field => "推荐人格式不正确"
  },
  validate: value => {
    return /^[^\u4e00-\u9fa5]{0,}$/.test(value);
  }
});

// 9.用户协议
Validator.extend("see", {
  messages: {
    zh_CN: field => "请阅读用户协议，并同意"
  },
  validate: value => {
    return true;
  }
});

// 10.忘记密码，新的登录密码
Validator.extend("npwd", {
  messages: {
    zh_CN: field => "登录密码格式不正确[6~18位]"
  },
  validate: value => {
    return /^\S{6,18}$/.test(value);
  }
});

// 11.忘记密码，确认新的登录密码
Validator.extend("qrwd", {
  messages: {
    zh_CN: field => "登录密码格式不正确[6~18位]"
  },
  validate: value => {
    return /^\S{6,18}$/.test(value);
  }
});
