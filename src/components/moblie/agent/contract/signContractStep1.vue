<template>
  <div id="signContract">
    <commonnav>
      {{$t('project.Contract')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>{{$t('project.Step1Pleaseaddcompletecontractdetails')}}</h1>
      <form ref="form" @submit.prevent="submit_click">
        <section v-for="(item) in validateForm.datalist" :key="item.cellInfo">
          <div v-if="item.type===2" class="mui-input-row input-row">
            <p class="label">{{item.cellInfo}}</p>
            <input name="userName" type="text" v-model="item.listCell[0]" />
            <!-- <section v-for="(i,d) in item.listCell" :key="d">
              <span>{{d+1}}</span>
              <input name="userName" type="text" v-model="item.listCell[d]" />
            </section>-->
          </div>
          <div v-if="item.type===3" class="mui-input-row input-row">
            <p class="label">{{item.cellInfo}}</p>
            <!-- <input name="userName" type="text" v-model="validateForm.username" />- -->
            <!-- <select class="label" style="width:100%;border:none" v-model="one">
              <option v-for="(self,index) in item.listCell" :value="index" :key="index">{{self}}</option>
            </select>-->


            
            <a-select placeholder="Select" size="large" @change="handleChange">
              <van-icon slot="suffixIcon" name="arrow-down" />
              <a-select-option
                :value="index"
                v-for="(self,index) in item.listCell"
                :key="index"
              >{{self}}</a-select-option>
            </a-select>
            <!-- <div class="divInput">
              <div class="input" @click="openValue">
                <van-icon name="arrow-left" />
              </div>
              <div class="list" v-show="show">
                <ul>
                  <li
                    @click="getvalue(index,self)"
                    v-for="(self,index) in item.listCell"
                    :key="index"
                  >{{ self }}</li>
                </ul>
              </div>
            </div>-->
            <br />
          </div>
          <div v-if="item.type===4 " class="mui-input-row input-row">
            <p class="label">{{item.cellInfo}}</p>
            <p>{{item.listCell[one]}}</p>
            <!-- <div v-for="(i,idx) in item.listCell[one]" :key="idx" class="mui-input-row input-row">
              <p class="label">{{idx+1}}.</p>
              <p>{{i}}</p>
            </div>-->
          </div>
        </section>
        <!-- <div  class="mui-input-row input-row" >
          <p class="label">{{$t('project.FinderCompanyName')}}</p>
          <input name="userName" type="text" v-model="validateForm.username" />
        </div>-->
        <!-- <div class="mui-input-row input-row">
          <p class="label">{{$t('project.FinderAddress')}}</p>
          <input name="Password" type="text" v-model="validateForm.password" />
        </div>-->
        <p class="error">{{errorsMsg}}</p>
        <button
          :disabled="isdisabled"
          :class="isdisabled?'passive':'active'"
          class="button is-primary"
          type="submit"
        >{{$t('common.Submit')}}</button>
      </form>
    </main>
    <DialogMsg
      :remindervisible.sync="remindervisible"
      :confirmButtonText="confirmButtonText"
      @comfirmFromDialog="comfirmFromDialog"
      :title="title"
      :showCancel="false"
      :msg="msg"
    ></DialogMsg>
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
      one: 0,
      remindervisible: false,
      confirmButtonText: "",
      cancelButtonText: "",
      msg: "",
      title: "",
      show: false,
      resultCode: null,
      validateForm: {
        username: "",
        password: "",
        datalist: []
      },
      errorsMsg: ""
    };
  },
  created() {
    this.middlemanGetContractItems();
  },
  computed: {
    isdisabled() {
      // if (this.validateForm.username && this.validateForm.password) {
      //   return false;
      // } else {
      //   return true;
      // }
    }
  },
  methods: {
    comfirmFromDialog(data) {
      this.remindervisible = false;
      if (this.resultCode === 10000) {
        this.$routerto("agentsignContractStep2", this.$route.query);
      }

      // setTimeout(() => {
      //   // this.title = "Sign NDA";
      //   // this.msg = "Please sign the NDA to get more information";
      //   // this.confirmButtonText = "Yes";
      //   // this.cancelButtonText = "No";\
      //   this.$routerto("ndaClause");
      //   // this.remindervisible2 = true;
      // }, 300);
    },
    handleChange(value) {
      this.one = value;
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
    },
    middlemanGetContractItems() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/middlemanGetContractItems`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId
          }
        )
        .then(res => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            this.validateForm.datalist = res.data.data.list;
            this.validateForm.datalist.forEach(element => {
              if (element.type == 3) {
                // this.one = item.listCell;
                console.log(element);
              }
            });
          }
          console.log(this.datalist);
        });
    },
    submit_click() {
      this.validateForm.datalist.forEach((item, idx) => {
        if (item.type === 3) {
          item.listCell.forEach((i, d) => {
            if (this.one !== d) {
              item.listCell.splice(d, 1);
            }
          });
        }
        if (item.type === 4) {
          item.listCell.forEach((i, d) => {
            if (this.one !== d) {
              item.listCell.splice(d, 1);
            }
          });
        }
      });
      console.log(this.validateForm.datalist);
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/middlemanSaveContractItems`,
          {
            importListStr: this.validateForm.datalist,
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId
          }
        )
        .then(res => {
          this.$store.commit("isloading", false);
          this.title = "Reminder";
          this.resultCode = res.data.resultCode;
          this.msg = res.data.resultDesc;
          this.confirmButtonText = "Yes";
          // this.cancelButtonText = "No";
          this.remindervisible = true;
        });
      // console.log(123)
      // this.errorsMsg = "";
      // let errorMsg = this.validateFunc();
      // if (errorMsg) {
      //   this.errorsMsg = errorMsg;
      //   // console.log(errorMsg);
      //   return false;
      // }
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

