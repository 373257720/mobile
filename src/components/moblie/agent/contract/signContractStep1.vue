<template>
  <div id="agentsignContractStep1">
    <commonnav>
      {{ $t("project.Contract") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>{{ $t("project.Step1Pleaseaddcompletecontractdetails") }}</h1>
      <form ref="form" @submit.prevent="submit_click">
        <section v-for="item in datalist" :key="item.cellInfo">
          <div v-if="item.type === 2" class="mui-input-row input-row">
            <p class="label">{{ item.cellInfo }}</p>
            <!-- <textarea class="textarea" rows="3" v-model="item.listCell[0]">
            </textarea> -->
            <van-field
              class="textarea"
              v-model="item.listCell[0]"
              rows="1"
              autosize
              type="textarea"
            />
            <!-- <input  name="userName" type="textarea" v-model="item.listCell[0]" /> -->
            <!-- <section v-for="(i,d) in item.listCell" :key="d">
              <span>{{d+1}}</span>
              <input name="userName" type="text" v-model="item.listCell[d]" />
            </section>-->
          </div>
          <div v-if="item.type === 3" class="mui-input-row input-row">
            <p v-if="item.cellInfo" class="label">{{ item.cellInfo }}</p>
            <!-- <input name="userName" type="text" v-model="validateForm.username" />- -->
            <!-- <select class="label" style="width:100%;border:none" v-model="one">
              <option v-for="(self,index) in item.listCell" :value="index" :key="index">{{self}}</option>
            </select>-->
            <a-select
              :default-value="item.listCell.lenghth ? null : 0"
              placeholder="Select"
              size="large"
              @change="handleChange"
            >
              <!-- <van-icon slot="suffixIcon" name="icon-bitbroicon7" /> -->
              <span slot="suffixIcon" class="iconfont icon-bitbroicon12"></span>
              <a-select-option
                :value="index"
                v-for="(self, index) in item.listCell"
                :key="index"
                >{{ self }}</a-select-option
              >
            </a-select>
          </div>
          <div v-if="item.type === 4" class="mui-input-row input-row">
            <p class="label">{{ item.cellInfo }}</p>
            <p>{{ item.listCell[one] }}</p>
          </div>
        </section>
        <p class="error">{{ errorsMsg }}</p>
        <button
          :disabled="isdisabled"
          :class="isdisabled ? 'passive' : 'active'"
          class="button is-primary"
          type="submit"
        >
          {{ $t("common.Submit") }}
        </button>
      </form>
    </main>
    <!-- <DialogMsg
      :remindervisible.sync="remindervisible"
      :confirmButtonText="confirmButtonText"
      @comfirmFromDialog="comfirmFromDialog"
      :title="title"
      :showCancel="false"
      :msg="msg"
    ></DialogMsg>-->
  </div>
</template>
<script>
export default {
  name: "a_signContractStep1",
  //   beforeRouteEnter(to, from, next) {
  //   if (from.name == "agentProjectDetail") {
  //     next(vm => {
  //       vm.middlemanGetContractItems();
  //     });
  //   } else {
  //     next();
  //   }
  // },

  data() {
    return {
      one: 0, //选择role
      // remindervisible: false,
      // confirmButtonText: "",
      // cancelButtonText: "",
      // msg: "",
      // title: "",
      resultCode: null,
      datalist: [],
      errorsMsg: "",
    };
  },
  activated() {
    this.middlemanGetContractItems();
  },
  computed: {
    isdisabled() {},
  },
  methods: {
    comfirmFromDialog(data) {
      this.remindervisible = false;
      if (this.resultCode === 10000) {
        this.$routerto("agentsignContractStep2", this.$route.query);
      }
    },
    handleChange(value) {
      this.one = value;
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
    },

    middlemanGetContractItems() {
      this.$store.commit("isloading", true);
      let RequestUrl;
      if (this.$route.query.signStatus4 == 18) {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/middlemanAGetContractItems`;
        this.$global
          .post_encapsulation(RequestUrl, {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
          })
          .then((res) => {
            this.$store.commit("isloading", false);
            if (res.data.resultCode == 10000) {
              this.datalist = res.data.data.list;
              this.datalist.forEach((item) => {
                if (item.type === 2) {
                  if (!item.listCell.length) {
                    item.listCell.push("");
                  }
                }
              });
            }
            console.log(this.datalist);
          });
      } else {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSign/middlemanGetContractItems`;
        this.$global
          .get_encapsulation(RequestUrl, {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
          })
          .then((res) => {
            this.$store.commit("isloading", false);
            if (res.data.resultCode == 10000) {
              this.datalist = res.data.data.list;
              this.datalist.forEach((item) => {
                if (item.type === 2) {
                  if (!item.listCell.length) {
                    item.listCell.push("");
                  }
                }
              });
            }
            console.log(this.datalist);
          });
      }
    },
    submit_click() {
      // console.log(this.validateForm.datalist);
      this.errorsMsg = "";
      let errorMsg = this.validateFunc();
      if (errorMsg) {
        this.errorsMsg = errorMsg;
        return false;
      }

      this.middlemanSaveContractItems();
    },

    middlemanSaveContractItems() {
      let arr = this.$global.deepCopy(this.datalist);
      arr.forEach((item, idx) => {
        if (item.type === 3 || item.type === 4) {
          item.listCell.forEach((i, d) => {
            if (this.one !== d) {
              item.listCell.splice(d, 1);
            }
          });
        }
      });
      this.$store.commit("isloading", true);
      let RequestUrl;
      if (this.$route.query.signStatus4 == 18) {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/middlemanASaveContractItems`;
      } else {
        RequestUrl = `${this.$axios.defaults.baseURL}/bsl_web/projectSign/middlemanSaveContractItems`;
      }
      this.$global
        .post_encapsulation(RequestUrl, {
          importListStr: arr,
          signId: this.$route.query.signId,
          middlemanId: this.$route.query.middlemanId,
        })
        .then((res) => {
          this.$store.commit("isloading", false);
          // this.title = "Reminder";
          this.resultCode = res.data.resultCode;
          this.msg = res.data.resultDesc;
          // this.confirmButtonText = "Yes";
          // this.cancelButtonText = "No";
          this.$dialog
            .alert({
              message: this.msg,
            })
            .then(() => {
              if (this.resultCode == 10000) {
                this.$routerto("agentsignContractStep2", this.$route.query);
              }
            });
        });
    },
    validateFunc() {
      let self = this;
      let validator = new this.$Validator();
      this.datalist.forEach((item, idx) => {
        if (item.type === 2) {
          validator.add(item.listCell[0], [
            ["isNotEmpty", this.$t("common.Pleasefillout")],
          ]);
        }
      });
      // console.log(this.validateForm.datalist);
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    },
  },
};
</script>
<style lang="scss">
#agentsignContractStep1{
  .ant-select {
  width: 100%;
  .icon-bitbroicon12 {
    font-size: vw(20);
    color: #4f3dad;
  }
}
.ant-select-lg {
  font-size: vw(26);
}
.ant-select-lg .ant-select-selection__rendered {
  line-height: vw(60);
}
.ant-select-lg .ant-select-selection--single {
  height: vw(60);
  border: none;
  border-radius: 0;
  border-bottom: 2px solid #4f3dad;
}
.ant-select-open .ant-select-selection {
  // border:none;
}
.textarea {
  padding: 0;
  border-bottom: vw(2) solid #4f3dad;
  .van-field__control {
    color: #4f3dad;
  }
}
}

</style>
<style lang="scss" scoped>
#agentsignContractStep1 {
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
    .mui-input-row {
      margin-bottom: vw(60);
      font-size: vw(26);
      display: flex;
      flex-direction: column;
      p.label {
        margin-bottom: vw(62);
        height: vw(32);
        line-height: vw(32);
        font-size: vw(26);
        font-weight: bold;
      }
      // textarea {
      //   display: inline-block;
      //   width: 100%;
      //   font-size: vw(30);
      //   line-height: vw(34);
      //   border: none;
      //   // height: vw(34);
      //   border-bottom: vw(2) solid #4f3dad;
      // }
    }
    p.error {
      height: vw(24);
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

