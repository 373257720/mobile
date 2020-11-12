<template>
  <div id="a_recommand_i">
    <commonnav>
      Recommended
      middleman
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()"/>
      </template>
    </commonnav>
    <main>
      <h3>Recommend new middleman</h3>
      <div :style="{height:articleHight+'px'}" class="article" ref="article">
        <section ref="box" v-for="(item,idx) in list" :key="item">
          <p>
            <span>{{idx+1}}</span>
          </p>
          <div class="mui-input-row input-row">
            <p class="label">Middleman genus</p>
            <input name="userName" type="text" v-model="validateForm.username" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">Middleman email</p>
            <input name="Password" type="text" v-model="validateForm.password" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">Middleman name</p>
            <input name="Password" type="text" v-model="validateForm.password" />
          </div>
          <div class="mui-input-row input-row">
            <p class="label">Region</p>
            <input name="Password" type="text" v-model="validateForm.password" />
          </div>
          <p class="error">{{errorsMsg}}</p>
        </section>
      </div>
      <footer>
        <p class="drop">
          <van-icon @click="additem" :class="{'rotate1':rotate1}" name="arrow-down" />
        </p>
        <div class="comfirm">
          <button @click="submit_click" >comfirm</button>
        </div>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      articleHight: null,
      list: ["a", "b", "d", "c"],
      result: [],
      searchkey: "",
      isdisabled: false,
      errorsMsg: "",
      boxHeight: null,
      validateForm: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    rotate1() {
      if (this.articleHight > this.boxHeight * 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {},
  mounted() {
    this.boxHeight = this.$refs.box[0].clientHeight;
    this.articleHight = this.$refs.box[0].clientHeight * 1;
  },
  methods: {
    submit_click() {
      // this.errorsMsg = "";
      // let errorMsg = this.validateFunc();
      // if (errorMsg) {
      //   this.errorsMsg = errorMsg;
      //   // console.log(errorMsg);
      //   return false;
      // }
      this.$routerto('a_recommand_i')
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
    additem() {
      this.articleHight += this.boxHeight;
    },
    toggle() {
      // console.log(index);
      // this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss">
#a_recommand_i {
}
</style>
<style lang="scss"  scoped>
#a_recommand_i {
  main {
    // width: 100%;
    padding: vw(200) vw(90) vw(116);
    h3 {
      font-size: vw(40);
      font-weight: bold;
      color: #4f3dad;
      margin-bottom: vw(52);
      opacity: 1;
    }
    .article {
      overflow: hidden;
      transition: all 1s ease-out;
      section {
        > p {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: vw(30);
          span {
            display: inline-block;
            width: vw(62);
            height: vw(62);
            background: #00f0ab;
            border-radius: 50%;
            font-size: vw(34);
            text-align: center;
            line-height: vw(62);
            color: #fff;
          }
        }
      }
    }

    .mui-input-row {
      font-size: initial;
      width: 100%;
      margin-bottom: vw(60);
      p.label {
        color: #4f3dad;
        margin-bottom: vw(30);
        height: vw(34);
        font-size: vw(30);
        font-weight: bold;
        line-height: vw(34);
      }
      span {
        display: inline-block;
      }
      input {
        width: 100%;
        font-size: vw(34);
        border-bottom: vw(2) solid #4f3dad;
      }
    }
    p.drop {
      text-align: center;
      .van-icon-arrow-down {
        transform-origin: center center;
        transform: rotate(0deg); //返回原点
        transition: transform 1s ease-out;
      }
      .van-icon::before {
        font-size: vw(30);

        font-weight: bold;
      }
      .rotate1 {
        // transform-origin: center center;
        // transform: rotate(180deg);
        // transition: transform 2s ease-out;
      }
    }

    li {
      display: flex;
      margin-bottom: vw(30);
      aside {
        width: vw(29);
        height: vw(29);
        background: #4f3dad;
        margin-right: vw(28);
      }
      article {
        font-size: vw(24);
        font-weight: bold;
        line-height: vw(28);
        color: #4f3dad;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

    footer {
      // margin-top: vw(70);
      font-weight: bold;
      span {
        // width: 468px;
        font-size: vw(36);
        font-weight: bold;
        line-height: vw(42);
        color: #4f3dad;
      }
      span:nth-of-type(2) {
        display: inline-block;
        background: #00f0ab;
        width: vw(64);
        height: vw(64);
        border-radius: 50%;
        line-height: vw(64);
        text-align: center;
        color: #fff;
      }
      p.drop {
        display: flex;
        justify-content: center;
      }
      .comfirm {
        display: flex;
        margin-top: vw(144);
        justify-content: flex-end;
        button {
          width: vw(238);
          height: vw(72);
          background: #00f0ab;
          border-radius: vw(16);
          font-size: vw(24);
          font-weight: bold;
          line-height: vw(72);
          color: #ffffff;
        }
      }
    }
  }
}
</style>

