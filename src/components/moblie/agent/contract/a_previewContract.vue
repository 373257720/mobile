<template>
  <div id="a_previewContract">
    <commonnav>
      Preview Contract
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <!-- <h1>Step 1 Please choose a suitable contract sample</h1> -->
      <!-- <article>{{article}}</article> -->
      <!-- <input type="textarea" v-model="article"> -->
      <textarea name v-model="article" id cols="30" rows="15"></textarea>
      <footer>
          <van-button >Download contract content (pdf)</van-button>  
          <!-- <p @click="signNDA">{{$t("project.SignNDAterms")}}</p> -->
          <!-- <button @click="clickInterested">{{$t('project.Interested')}}</button> -->
          <!-- <button @click="$routerto('signContractStep1')">{{$t('project.SignContract')}}</button>
          <button @click="$routerto('signContractStep1')">{{$t('project.Contractwithibank')}}</button>-->
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
        >{{$t('common.Submit')}}</button> -->
      </form>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      show: false,
      fileId: "",
      article: "",
      Template: "",
      TemplateList: [],
      errorsMsg: ""
    };
  },
  created() {
    this.projectId = this.$route.query.projectId;
    this.signStatus4 = this.$route.query.signStatus4;
    this.signId = this.$route.query.signId;
    this.middlemanId = this.$route.query.middlemanId;
    this.middlemanGetTemplateWord();
    // /bsl_web/projectSign/getContractTemplateList
  },
  computed: {},
  methods: {
    go() {
      if (this.article) {
        this.$routerto("P_a_previewContractStep2", {
          projectId: this.projectId,
          signStatus4: this.signStatus4,
          signId: this.signId,
          middlemanId: this.middlemanId,
          fileId: this.fileId
        });
      }
    },

    middlemanGetTemplateWord() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/middlemanGetTemplateWord`,
          { signId: this.$route.query.signId, middlemanId: this.$route.query.middlemanId }
        )
        .then(res => {
          this.$store.commit("isloading", false);
          this.article = res.data.data;
          console.log(this.article);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
#a_previewContract {
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
      height: vw(900);
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
