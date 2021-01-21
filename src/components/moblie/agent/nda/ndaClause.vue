<template>
  <div id="login1st">
    <commonnav>
      NDA clause
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main class="main">
      <form ref="form">
        <div class="mui-input-row input-row">
          <p class="label">For and on behalf of</p>
          <input
            name="userName"
            type="text"
            v-model="NDAcontract.projectPartybehalf"
          />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Name</p>
          <input
            name="Password"
            type="text"
            v-model="NDAcontract.projectPartyname"
          />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">Title</p>
          <input
            name="Password"
            type="text"
            v-model="NDAcontract.projectPartytitle"
          />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">NDA Terms</p>
          <div id="editor">
            <!-- Employee shall not use for Employee’s personal benefit, or disclose,
            communicate or divulge to, or use for the direct or indirect benefit
            of any person, firm, association or company other than Company, any
            “Confidential Information,” which term shall mean any information
            regarding the business methods, business policies, policies,
            procedures, techniques, research or development projects or results,
            historical or projected financial information, budgets, trade
            secrets, or other knowledge or processes of, or developed by,
            Company or any other confidential information relating to or dealing
            with the business operations of Company, made known to Employee or
            learned or acquired by Employee while in the employ of Company, but
            Confidential Information shall not include information otherwise
            lawfully known generally by or readily accessible to the general
            public. The foregoing provisions of this subsection shall apply
            during and after the period when the Employee is an employee of the
            Company and shall be in addition to (and not a limitation of) any
            legally applicable protections of Company interest in confidential
            information, trade secrets, and the like. -->
          </div>
          <!-- <input name="Password" type="text" v-model="validateForm.password" /> -->
        </div>
        <p class="error">{{ errorsMsg }}</p>
        <footer>
          <button
            :disabled="isdisabled"
            :class="isdisabled ? 'passive' : 'active'"
            class="button is-primary"
            @click.prevent="submit_click"
          >
            Sign
          </button>
        </footer>
      </form>
    </main>
  </div>
</template>

<script type="text/javascript" src="https://unpkg.zhimg.com/wangeditor@4.6.2/dist/wangEditor.min.js"></script>
<script>
import E from "wangeditor";
import i18next from "i18next";
export default {
  name: "register",
  inject: ["NDAcontract", "goto"],
  data() {
    return {
      submitDisabled: false,
      cache: [],
      validateForm: {
        behalf: "",
        name: "",
        title: "",
      },
      editor: null,
      editorContent: "",
      errorsMsg: "",
    };
  },
  computed: {
    isdisabled() {
      if (
        this.NDAcontract.projectPartybehalf &&
        this.NDAcontract.projectPartyname &&
        this.NDAcontract.projectPartytitle &&
        this.NDAcontract.editorContent
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    // console.log(this.NDAcontract);
    // this.username = this.$route.query.email ? this.$route.query.email : "";
    // console.log(this.$route.query.email);
  },
  mounted() {
    // var E = window.wangEditor;
    // console.log(E);
    var editor = new E("#editor");
    // editor = new E(this.$refs.editorElem);
    editor.config.height = 400;
    editor.config.zIndex = 100;
    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "justify",
      "splitLine",
      "undo",
      "redo",
    ];
    editor.config.onchange = (newHtml) => {
      this.editorOnchange.call(this, newHtml);
      // console.log("change 之后最新的 html", newHtml);
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    // console.log(i18next);
    editor.config.onchangeTimeout = 500; // 修改为 500ms
    let lan = this.$i18n.locale == "zh_CN" ? "zh-CN" : "en";
    editor.config.lang = lan;
    editor.i18next = i18next;
    // editor.i18next
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();
  },
  methods: {
    editorOnchange(newHtml) {
      this.NDAcontract.editorContent = newHtml;
    },
    submit_click() {
      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        // console.log(errorMsg);
        return false;
      }
      // console.log(this.NDAcontract);
      this.goto("NDAsignature");
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },
    blur(event) {
      var validator = new AsyncValidator({
        [event.target.name]: this.rules[event.target.name],
      });
      validator
        .validate(
          { [event.target.name]: this.form[event.target.name] },
          { first: true }
        )
        .then(() => {
          this.errors[event.target.name] = "";
        })
        .catch(({ errors, fields }) => {
          this.errors[event.target.name] = errors[0].message;
        });
    },
  },
};
</script>



<style lang='scss'>
#login1st {
  // .mu-input-focus-line {
  //   display: none;
  // }

  // .mu-form-item-label {
  //   // height: vw(30);
  //   font-size: vw(30);
  //   font-weight: bold;
  //   line-height: vw(30);
  //   color: #4f3dad;
  //   // margin-bottom: vw(64);
  // }
  // .mu-input__error {
  //   // .mu-text-field-input {
  //   //   color: #f44336;
  //   // }
  //   // .mu-input-line {
  //   //   background: #f44336;
  //   // }
  // }
  // .mu-form-item__error .mu-form-item-help {
  //   color: #0ce5b2;
  // }
  // .mu-form-item-content {
  //   min-height: vw(34);
  //   margin-top: vw(62);
  // }
  // .mu-input-line {
  //   background: #4f3dad;
  // }
  // .mu-text-field-input {
  //   color: #4f3dad;
  //   font-size: vw(32);
  //   height: vw(32);
  // }
  // .mu-form-item__error .mu-form-item-help {
  //   bottom: vw(-4);
  // }
}
</style>
<style lang='scss' scoped>
#login1st {
  min-height: 100vh;
  width: 100vw;
  // background: #2f36ac;
  display: flex;
  flex-direction: column;
  align-items: center;
  .label {
  }
  .error {
    height: vw(24);
    font-size: vw(24);
    // font-weight: 400;
    color: #0ce5b2;
    margin-bottom: vw(18);
    // line-height: vw(24);
  }
  main {
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 100%;
    padding: vw(184) vw(94) vw(116);
    // padding-top: vw(184);
    font-size: vw(30);
    color: #4f3dad;
    p.label {
      margin-bottom: vw(62);
      height: vw(34);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
    }
    .mui-input-row {
      width: 100%;
      margin-bottom: vw(60);
      // div {
      //   height: vw(404);
      //   overflow: auto;
      //   padding: vw(30) vw(24);
      //   border: vw(2) solid #4f3dad;
      // }
      span {
        display: inline-block;
      }
      input {
        width: 100%;
        font-size: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
      p.helpText {
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
        color: #8277b9;
        margin-top: vw(50);
      }
    }
    // div.btn {
    //   margin-top: vw(290);
    //   width: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    //   .reminder {
    //     color: #0ce5b2;
    //     width: vw(569);
    //     display: flex;
    //     justify-content: center;
    //     // height: vw(75);
    //   }
    // }
    footer {
      display: flex;
      justify-content: space-around;
      button {
        color: #ffffff;
        // background: #4f3dad;
        border-radius: vw(16);
        width: vw(226);
        font-weight: bold;
        line-height: vw(72);
        height: vw(72);
        font-size: vw(24);
        // background: #00f0ab;
      }
      button.passive {
        background: #828282;
      }
      button.active {
        background: #00f0ab;
      }
    }

    // button.active{

    // }
  }
  // @media all and (orientation: landscape) {
  //   main {
  //     padding-top: vw(227);
  //     div.btn {
  //       margin-top: vw(90);
  //       // padding-bottom: vw(90);
  //     }
  //   }
  // }
}
</style>
