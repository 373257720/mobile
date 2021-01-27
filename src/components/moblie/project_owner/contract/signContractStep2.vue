<template>
  <div id="signContract">
    <commonnav>
      {{ $t("project.Contract") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>{{ $t("project.Step2Pleaseaddcompletecontractdetails") }}</h1>
      <form ref="form" @submit.prevent="submit_click">
        <div
          class="mui-input-row input-row"
          v-for="i in dataList"
          :key="i.cellInfo"
        >
          <p class="label">{{ i.cellInfo }}</p>
          <section>
            <input
              name="userName"
              v-model="i.listCell[0]"
            />
          </section>
        </div>
        <p class="error">{{ errorsMsg }}</p>
        <button
          v-if="dataList.length"
          class="button is-primary active"
          type="submit"
        >
          {{ $t("common.Submit") }}
        </button>
      </form>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      validateForm: {},
      dataList: [],
      errorsMsg: "",
      fileId: "",
    };
  },
  created() {
    this.fileId = this.$route.query.fileId || null;
    // this.query=this.$route.query
    this.getExcel();
  },
  computed: {},
  methods: {
    getExcel() {
      // 1绿色2黄色3红色4橙色
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/iBackGetContractItems`,
          { fileId: this.fileId }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.dataList = res.data.data.list;
          console.log(this.dataList);

          this.dataList.forEach((item) => {
            if (item.type === 1) {
              if (!item.listCell.length) {
                item.listCell.push("");
              }
            }
          });
          // console.log(res.data.data.list);
        });
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      this.dataList.forEach((item) => {
        item.listCell.forEach((i, d) => {
          validator.add(i, [["isNotEmpty", this.$t("common.Pleasefillout")]]);
        });
      });
      var errorMsg = validator.start(); // 获得效验结果
      console.log(errorMsg);
      return errorMsg; // 返回效验结果
    },
    submit_click() {
      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        return false;
      }
      this.iBackSaveContractItems();
    },
    iBackSaveContractItems() {
      this.$store.commit("isloading", true);
      let RequestUrl = "";
      if (this.$route.query.signStatus4 == 16) {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/iBackSaveContractItems`;
      } else {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSign/iBackSaveContractItems`;
      }
      this.$global
        .post_encapsulation(RequestUrl, {
          fileId: this.fileId,
          importListStr: this.dataList,
          signId: this.$route.query.signId,
          middlemanId: this.$route.query.middlemanId,
        })
        .then((res) => {
          this.$store.commit("isloading", false);
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode == 10000) {
                // if (this.$route.query.signStatus4 == 16) {
                //   this.$replaceto("mysign");
                // } else {
                  
                // }
                this.$routerto("ibankSignContractStep3", this.$route.query);
              }
              // on close
            });
        });
    },
  },
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

    .mui-input-row {
      margin-bottom: vw(60);
      font-size: vw(26);
      p.label {
        margin-bottom: vw(62);
        height: vw(32);
        line-height: vw(32);
        font-size: vw(26);
        font-weight: bold;
      }
      input {
        display: inline-block;
        width: 100%;
        font-size: vw(30);
        line-height: vw(34);
        height: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
    }
    p.error {
      // height: vw(24);
      font-size: vw(24);
      // font-weight: 400;
      color: #0ce5b2;
      margin-bottom: vw(18);
      // line-height: vw(24);
    }
    button {
      color: #ffffff;
      // background: #4f3dad;
      border-radius: vw(16);
      width: vw(566);
      font-weight: bold;
      line-height: vw(72);
      height: vw(72);
      font-size: vw(24);
    }
    button.passive {
      background: #828282;
    }
    button.active {
      background: #00f0ab;
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

