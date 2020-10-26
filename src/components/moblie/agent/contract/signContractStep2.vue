<template>
  <div id="signContractStep2">
    <commonnav>
      Contract
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <h1>Step 2 please choose suitable commission sharing mechanism</h1>
      <div>
        <h3>Project proposal</h3>
        <van-radio-group v-model="radio">
          <van-radio
            name="1"
            label-disabled
            checked-color="#00f0ab"
          >Percentage of total funds raised by intermediaries</van-radio>
          <div class="count">
            <input type="number" v-model="intermediaries" />
            <span>%</span>
            <p>
              <span class="iconfont icon-arrow_on" @click="up('intermediaries')"></span>
              <span class="iconfont icon-arrow_under" @click="down('intermediaries')"></span>
              <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
              <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
            </p>
          </div>
          <van-radio
            name="2"
            label-disabled
            checked-color="#00f0ab"
          >Percentage of commission income from project party</van-radio>
          <div class="count">
            <input type="number" name="projectParty" v-model="projectParty" />
            <span>%</span>
            <p>
              <span
                :class="{'isactive':isactive}"
                @click="up('projectParty')"
                class="iconfont icon-arrow_on projectParty"
              ></span>
              <span class="iconfont icon-arrow_under projectParty" @click="down('projectParty')"></span>
              <!-- <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_on"></van-icon>
              <van-icon class="iconfont" class-prefix="icon" slot="icon" name="arrow_under"></van-icon>-->
            </p>
          </div>
        </van-radio-group>
        <footer>
          <button>Preview Contract</button>
        </footer>
        <ul>
          <li>
            <button @click="()=>remindervisible=true">Accept</button>
          </li>
          <li>
            <button @click="$routerto('bargin')">Suggest</button>
          </li>
          <li>
            <button>Reject</button>
          </li>
        </ul>
      </div>
    </main>
    <DialogMsg :remindervisible.sync="remindervisible"   :showCancel="true" :msg="msg"></DialogMsg>
  </div>
</template>
<script>
// let setTime=null;
export default {
  name: "mhome",
  data() {
    return {
      msg: `Are you sure to accept this commission sharing mechanism from the project side?
Once confirmed, it cannot be undone or changed
And sign the contract with the project party`,
      radio: "",
      remindervisible:false,
      isactive: false,
      intermediaries: 0,
      projectParty: 0,
      timeout: null
      //   setTime:null,
    };
  },
  created() {},
  computed: {},
  watch: {
    projectParty(newvalue, oldvalue) {
      //  let reg= /^([1-9][0-9]*)+(.[0-9]{1,2})?$/;
      let newvalue_ = newvalue;
      console.log(newvalue_);
      if (newvalue_) {
        if (/\./i.test(newvalue_)) {
          //判断处理含有.的情况下
          if (newvalue_.split(".").length - 1 > 1) {
            this.projectParty = oldvalue;
            return;
          }
          if (/\.\d\d\d$/.test(newvalue_)) {
            this.projectParty = oldvalue; //限制只能输入2位小数点
          }
          // else {
          //   this.projectParty = newvalue_.replace(/[^\d\.\,]/gi, "");
          //   //开始输入小数点之后，只能输入数字
          // }
        }
      } else {
        this.projectParty = oldvalue;

        return;
      }
    }
  },

  methods: {
    dosome(){
      this.remindervisible=false;
    },
    max(value) {
      if (value.target.value * 1 < 0) {
        this.projectParty = 0;
      } else if (value.target.value * 1 > 100) {
        value.target.value = 100;
      }
    },
    up(e) {
      this[e]++;
      this.isactive = true;
      // console.log(setTime)
      // if(setTime){

      // }else{
      //       setTime=setTimeout(()=>this.isactive=false,200);
      // }

      // if(e==="projectParty"){
      //     this.projectParty++;
      // }else if(e==="intermediaries"){
      //    this.intermediaries++;
      // }
    },
    down(e) {
      this[e]--;
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
<style lang="scss">
.van-radio__icon {
  height: vw(44);
  .van-icon {
    width: vw(44);
    height: vw(44);
    // background: #00f0ab;
  }
}

.van-radio__label {
  margin-left: vw(26);
  font-size: vw(20);
  color: #fff;
  line-height: vw(26);
}
</style>
<style lang="scss" scoped>
#signContractStep2 {
  main {
    width: 100%;
    padding: vw(140) vw(60) vw(116);
    color: #4f3dad;
    h1 {
      padding-top: vw(46);
      margin-bottom: vw(80);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #4f3dad;
    }
    > div {
      padding: vw(42) vw(58) vw(48);
      width: vw(630);

      // height: vw(955);
      background: #4f3dad;
      border-radius: vw(50);
      color: #ffffff;

      h3 {
        font-size: vw(26);
        font-weight: bold;
        color: #ffffff;
        margin-bottom: vw(60);
      }
      footer {
        padding-top: vw(250);
        display: flex;
        justify-content: flex-end;
        margin-bottom: vw(76);
        button {
          width: vw(262);
          height: vw(56);
          background: #00f0ab;

          opacity: 1;
          border-radius: vw(16);
          font-size: vw(24);
          font-weight: bold;
          line-height: vw(56);
          color: #ffffff;
        }
      }
      ul {
        display: flex;
        justify-content: space-between;
        li {
          button {
            width: vw(150);
            height: vw(56);
            font-size: vw(24);
            background: #00f0ab;
            line-height: vw(56);
            color: #ffffff;
            border-radius: vw(16);
          }
        }
      }
      div.count:nth-of-type(2) {
        margin-bottom: vw(76);
      }
      div.count {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: vw(26);
        margin-top: vw(32);
        color: #00e3a2;
        font-weight: bold;
        input {
          text-align: center;
          width: vw(100);
          font-size: vw(20);
          padding: vw(8);
          color: #4f3dad;
          height: vw(40);
          background: #ffffff;
          opacity: 1;
          border-radius: vw(5);
        }
        > span {
          margin: 0 vw(8);
        }
        .isactive {
          color: #fff;
        }
        p {
          display: flex;
          flex-direction: column;
          .iconfont {
            font-size: vw(27);
            line-height: vw(27);
          }
          .icon-arrow_on {
            margin-bottom: vw(8);
          }
        }
      }
    }
  }
}
</style>

