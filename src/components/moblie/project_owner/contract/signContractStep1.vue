<template>
  <div id="signContractStep1">
    <commonnav>
      {{ $t("project.Contract") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>{{ $t("project.Step1Pleasechooseasuitablecontracttemple") }}</h1>
      <div class="divInput">
        <!-- <div class="input" @click="openValue">
          <input v-model="Template" type="text" placeholder="筛选实验类型" />
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
        </div>-->
        <a-select placeholder="Select" size="large" @change="handleChange">
          <!-- <icon-font slot="suffixIcon"  type="icon-account" /> -->
          <span slot="suffixIcon" class="iconfont icon-bitbroicon12"></span>
          <!-- <van-icon slot="suffixIcon" name="arrow-down" /> -->
          <a-select-option
            v-for="(item, index) in TemplateList"
            :value="index"
            :key="item.id"
            >{{ item.fileName }}</a-select-option
          >
        </a-select>
      </div>
      <!-- <article>{{article}}</article> -->
      <!-- <input type="textarea" v-model="article"> -->
      <textarea name v-model="article" id cols="30" rows="10"></textarea>
      <footer>
        <van-button @click="go">{{ $t("common.Next") }}</van-button>
      </footer>
    </main>
  </div>
</template>
<script>
import { Icon } from "ant-design-vue";
import myicon from "../../../../../static/icon/iconfont";
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: myicon,
});
export default {
  name: "signContractStep1",
  components: {
    IconFont,
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "ibankSignContractStep2") {
      to.meta.keepAlive = false;
      next();
    } else {
      next();
    }
  },
  data() {
    return {
      show: false,
      validateForm: {
        username: "",
        password: "",
      },
      one: 0,
      fileId: "",
      article: "",
      Template: "",
      TemplateList: [],
      errorsMsg: "",
    };
  },
  created() {
    this.projectId = this.$route.query.projectId;
    this.signStatus4 = this.$route.query.signStatus4;
    this.signId = this.$route.query.signId;
    this.middlemanId = this.$route.query.middlemanId;
    if (this.signStatus4 == 16) {
      this.getMiddlemanContractTemplateList();
    } else {
      this.getContractTemplateList();
    }
  },
  computed: {
    isdisabled() {
      if (this.article) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    getMiddlemanContractTemplateList() {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/getMiddlemanContractTemplateList`,
          {
            projectId: this.projectId,
            signId: this.signId,
            middlemanId: this.middlemanId,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.TemplateList = res.data.data;
          console.log(this.TemplateList);
        });
    },
    handleChange(value) {
      this.one = value;
      let item = this.TemplateList[value];
      // console.log(value); // { key: "lucy", label: "Lucy (101)" }
      this.Template = item.fileName;
      this.fileId = item.id;
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/iBackGetContractTemplateWord`,
          { fileId: item.id }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.data) {
            this.article = res.data.data;
          }
          this.show = false;
        });
    },
    go() {
      if (this.article) {
        this.$routerto("ibankSignContractStep2", {
          projectId: this.projectId,
          signStatus4: this.signStatus4,
          signId: this.signId,
          middlemanId: this.middlemanId,
          fileId: this.fileId,
        });
      } else {
        this.$toast(this.$t("common.Pleasechoose"));
      }
    },
    // openValue() {
    //   this.show = !this.show;
    // },
    getContractTemplateList() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/getContractTemplateList`,
          { projectId: this.projectId }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.TemplateList = this.$global.quickSort(
            res.data.data,
            "createTime",
            "descending"
          );
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
        ["minLength|6", "不允许以空白字符命名"],
      ]);
      validator.add(self.validateForm.password, [
        ["isNotEmpty", "用户名不可为空"],
      ]);
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    },
  },
};
</script>
<style lang="scss">
#signContractStep1 {
  .ant-select-selection {
    border-color: #4f3dad;
  }
}
</style>

<style lang="scss" scoped>
#signContractStep1 {
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
      .ant-select {
        width: 100%;
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
        flex: 1;
        // width: vw(184);
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
  }
}
</style>

