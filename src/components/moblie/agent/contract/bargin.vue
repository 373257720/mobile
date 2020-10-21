<template>
  <div id="signContract">
    <commonnav>
      Project
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <div class="bargin-upper">
        <h3>
          Original suggestion from ibank
          (user name)
        </h3>
        <p>Percentage of total funds raised by intermediaries</p>
        <div class="count">
          <input disabled type="number" v-model="intermediaries" />
          <span>%</span>
        </div>
      </div>
      <div class="bargin-lower">
        <h3>Middleman A1 (user name) counter suggestion</h3>
        <van-radio-group v-model="radio">
          <van-radio
            name="2"
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
            </p>
          </div>
        </van-radio-group>
        <ul>
          <li>
            <button>Accept</button>
          </li>
          <li>
            <button>Accept</button>
          </li>
          <li>
            <button>Reject</button>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>
<script>
// let setTime=null;
export default {
  name: "mhome",
  data() {
    return {
      radio: "",
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
#signContract {
  main {
    width: 100%;
    padding: vw(280) vw(60) vw(116);
    color: #4f3dad;
    h1 {
      padding-top: vw(46);
      margin-bottom: vw(80);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #4f3dad;
    }
    .bargin-upper {
      padding: vw(42) vw(58) vw(94);
      border-radius: vw(50) vw(50) 0 0;
      background: #786cb4;

      > p {
        font-size: vw(20);
        color: #fff;
        line-height: vw(26);
      }
    }
    .bargin-lower {
      padding: vw(28) vw(58) vw(74);
      border-radius: 0 0 vw(50) vw(50);
      background: #4f3dad;
    }
    .bargin-upper,
    .bargin-lower {
      width: vw(630);
      color: #ffffff;
      h3 {
        font-size: vw(26);
        font-weight: bold;
        color: #ffffff;
        margin-bottom: vw(60);
      }
      ul {
        padding-top: vw(80);
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
        // margin-bottom: vw(76);
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

