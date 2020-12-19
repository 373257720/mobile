<template>
  <div id="signContract">
    <commonnav>
      {{$t('project.Contract')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>Step 1 Please choose a suitable contract sample</h1>
      <div class="divInput">
        <div class="input" @click="openValue">
          <input v-model="Template" type="text" placeholder="筛选实验类型" />
          <!-- <img src="../assets/arrow.png" alt /> -->
          <van-icon name="arrow-left" />
        </div>
        <div class="list" v-show="show">
          <ul>
            <li
              @click="getvalue(index,item)"
              v-for="(item,index) in TemplateList"
              :key="item.id"
            >{{ item.fileName }}</li>
          </ul>
        </div>
      </div>
      <!-- <article>{{article}}</article> -->
      <!-- <input type="textarea" v-model="article"> -->
      <textarea name v-model="article" id cols="30" rows="10"></textarea>
      <footer>
        <van-button @click="$routerto('P_signContractStep2',{fileId:fileId})">Next</van-button>
      </footer>

      <!-- <form ref="form" @submit.prevent="submit_click">
        <div class="mui-input-row input-row">
          <p class="label">{{$t('project.FinderCompanyName')}}</p>
          <input name="userName" type="text" v-model="validateForm.username" />
        </div>
        <div class="mui-input-row input-row">
          <p class="label">{{$t('project.FinderAddress')}}</p>
          <input name="Password" type="text" v-model="validateForm.password" />
        </div>
        <p class="error">{{errorsMsg}}</p>
        <button
          :disabled="isdisabled"
          :class="isdisabled?'passive':'active'"
          class="button is-primary"
          type="submit"
        >{{$t('common.Submit')}}</button>
      </form>-->
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      show: false,
      validateForm: {
        username: "",
        password: ""
      },
      fileId:"",
      article: "",
      Template: "",
      TemplateList: [],
      errorsMsg: ""
    };
  },
  created() {
    this.getContractTemplateList();
    // /bsl_web/projectSign/getContractTemplateList
  },
  computed: {
    isdisabled() {
      if (this.validateForm.username && this.validateForm.password) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    openValue() {
      this.show = !this.show;
    },
    getvalue(index, item) {
      this.Template = item.fileName;
      this.fileId = item.id;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/iBackGetContractTemplateWord`,
          { fileId: item.id }
        )
        .then(res => {
          if (res.data.data) {
            this.article = res.data.data;
          }
          this.show = false;
        });
    },
    getContractTemplateList() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/getContractTemplateList`,
          { projectId: 130439808 }
        )
        .then(res => {
          this.TemplateList = res.data.data;
          console.log(this.TemplateList);
        });
    },
    submit_click() {
      // console.log(123);

      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        // console.log(errorMsg);
        return false;
      }
      this.$routerto("signContractStep2");
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      validator.add(self.validateForm.username, [
        ["isNotEmpty", this.$t("common.isno")],
        ["minLength|6", "不允许以空白字符命名"]
      ]);
      validator.add(self.validateForm.password, [
        ["isNotEmpty", "用户名不可为空"]
      ]);
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
#signContract {
  main {
    width: 100%;
    padding: vw(140) vw(92) vw(116);
    color: #4f3dad;
    h1 {
      padding-top: vw(65);
      margin-bottom: vw(80);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #4f3dad;
    }
    .divInput {
      position: relative;
      margin-bottom: vw(70);
      font-size: vw(30);
      ul li {
        list-style: none;
      }
      .input {
        // width: 140px;
        display: flex;
        height: vw(60);

        align-items: center;
      }
      .input input {
        border: none;
        outline: none;
        width: 90%;
        height: 100%;
      }
      .input i {
        // position: absolute;
        // right: 0;
        // top: 50%;
        // transform: translateY(-50%)
      }
      .list {
        width: 100%;
        position: absolute;
        top: vw(60);
        border: 1px solid #cccccc;
        height: vw(400);
        background: #fff;
        opacity: 3;
        overflow-y: auto;
      }
      .list ul li {
        width: 100%;
        // height: 30px;
        cursor: pointer;
        line-height: 30px;
        // padding-left: 10px;
      }
      .list ul li:hover {
        background-color: #cccccc;
      }
    }
    textarea {
      padding: vw(30) vw(24);
      margin-bottom: vw(80);
      border: vw(1) solid #4f3dad;
      width: 100%;
      height: vw(822);
      font-size: vw(24);
      font-family: Helvetica Neue;
      font-weight: bold;
      line-height: vw(28);
      color: #4f3dad;
      overflow-y: auto;
      opacity: 1;
    }
    footer {
      display: flex;
      justify-content: center;
      button {
        width: vw(184);
        height: vw(72);
        background: #00f0ab;
        opacity: 1;
        color: #fff;
        border-radius: vw(16);
      }
      button.passive {
        background: #828282;
      }
      button.active {
        background: #00f0ab;
      }
    }

    // footer {
    //   margin-top: vw(70);
    //   font-weight: bold;
    //   display: flex;
    //   justify-content: center;
    //   button {
    //     width: vw(528);
    //     height: vw(114);
    //     background: #00f0ab;
    //     border-radius: vw(40);
    //     font-size: vw(40);
    //     line-height: vw(114);
    //     color: #ffffff;
    //   }
    // }
  }
}
</style>

