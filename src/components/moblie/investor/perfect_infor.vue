<template>
  <div id="i_perfect_infor">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />完善资料
    </nav>
    <main>
      <article>
        <header>{{title}}</header>
        <ul>
          <li>
            <p class="row1">投资者类型</p>
            <p class="row2">
              <van-dropdown-menu>
                <van-dropdown-item v-model="form.investorsType" :options="option1" />
              </van-dropdown-menu>
            </p>
          </li>
          <li>
            <p class="row1">投资者公司：</p>
            <p class="row2">
              <van-field v-model="form.investorsCompany" placeholder="请输入密码" clearable />
            </p>
          </li>
          <li>
            <p class="row1">投资者姓名：</p>
            <p class="row2">
              <van-field v-model="form.investorsName" placeholder="请输入密码" clearable />
            </p>
          </li>
          <li>
            <p class="row1">投资者地区：</p>
            <p class="row2">
              <van-field v-model="form.investorsArea" placeholder="请输入密码" clearable />
            </p>
          </li>
          <li>
            <p class="row1">投资者电话：</p>
            <p class="row2">
              <van-field v-model="form.investorsMobile" placeholder="请输入密码" clearable />
            </p>
          </li>
          <li>
            <p class="row1">投资者邮箱：</p>
            <p class="row2">
              <van-field v-model="form.investorsEmail" placeholder="请输入密码" clearable />
            </p>
          </li>
          <li>
            <p class="row1">公司地址：</p>
            <p class="row2">
              <van-field v-model="form.investorsCompanyAddress" placeholder="请输入密码" clearable />
            </p>
          </li>
          <li>
            <p class="row1">感兴趣行业：</p>
            <p class="row2">
              <van-checkbox-group v-model="form.interestedIndustries">
                <van-checkbox
                  v-for="(item) in countrylist"
                  :key="item.industryId"
                  :name="item.industryNameCh"
                >{{ item.industryNameCh }}</van-checkbox>
              </van-checkbox-group>
            </p>
          </li>
        </ul>
        <footer>
          <aside>
            <button @click="submit">提交</button>
          </aside>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "i_perfect_infor",
  data() {
    return {
      title:'',
      form: {
        signId: this.$route.query.signId,
        signStatus: 6,
        investorsId: this.$route.query.investorsId,
        investorsType: null,
        investorsCompany: "",
        investorsName: "",
        investorsArea: "",
        investorsEmail: "",
        investorsMobile: "",
        interestedIndustries: [],
        investorsCompanyAddress: "",
        investorsName: ""
      },
      countrylist: [],
      option1: [{ text: "个人", value: 1 }, { text: "公司", value: 2 }]
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/base/getAllIndustry`
    })
      .then(res => {
         this.title=res.data.data.projectName;
        // console.log(res);
        this.countrylist = res.data.data;
        console.log(this.countrylist);
        
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    submit() {
     let formtable=JSON.parse(JSON.stringify(this.form));
      let interestedIndustries =this.form.interestedIndustries.join("/");
      formtable.interestedIndustries=interestedIndustries;

      // let  formtable= {
      //   signId: this.$route.query.signId,
      //   signStatus: 6,
      //   investorsId: this.$route.query.investorsId,
      //   investorsType: 1,
      //   investorsCompany: "2",
      //   investorsName: "2",
      //   investorsArea: "2",
      //   investorsEmail: "2",
      //   investorsMobile: "2",
      //   interestedIndustries: a ,
      //   investorsCompanyAddress: "2",
      //   investorsName: "33"
      // };
      console.log(formtable);
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/signProject3`,
        data: this.$qs.stringify (formtable),
      })
        .then(res => {
          console.log(res);
          if(res.data.resultCode==10000){
              // this.$routerto('mhome')
              this.gg();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    gg() {
      this.$dialog
        .confirm({
          title: "提交成功",
          // message: "弹窗内容"
        })
        .then(() => {
          // on confirm
           this.$routerto('mhome')
        })
        // .catch(() => {
        //   // on cancel
        // });
    }
  }
};
</script>
<style lang="scss">
#i_perfect_infor {
  .van-cell {
    font-size: 0.38rem;
    padding: 0 1rem;
    line-height: 1rem;
    // padding: 0;
  }
  .van-dropdown-menu__title {
    font-size: 0.38rem;
    width: 100%;
    // text-align: left;
  }
  .van-icon-arrow-left {
    position: absolute;
    left: 0.6rem;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
  .van-dropdown-menu {
    height: 1rem;
    border-radius: 0.05rem;
    // border: 1px solid #ababab;
    background: #f6f6f6;
  }
  .van-field__body {
    //  width: 100%;
    height: 1rem;
    // border: 0.02rem solid #ababab;
    border-radius: 0.05rem;
    background: #f6f6f6;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }

  .van-icon-success {
    height: 0.4rem;
    width: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.2rem;
  }
  .van-field__control {
    // padding: 0 0.2rem;
    // height: 0.5rem;
  }
  .van-field__clear {
    font-size: 0.3rem;
  }
  .van-field {
    padding: 0;
  }

  .van-dropdown-menu__title::after {
    border: 0.1rem solid;
    top: 50%;
    right: 0.5rem;
    transform: rotate(0);
    border-color: currentColor transparent transparent transparent;
  }

  .van-dropdown-menu__title--down::after {
    border: 0.1rem solid;
    top: 50%;
    border-color: currentColor transparent transparent transparent;
  }
}
</style>
<style lang="scss" scoped>
#i_perfect_infor {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    z-index: 5;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      margin: 0 0 1rem 0;
      header {
        // border-bottom: 0.1rem solid #b5b5b5;
        height: 2rem;
        font-size: 0.38rem;
        color: #0f6ebe;
        text-align: center;
        // font-weight: 600;
        line-height: 2rem;
      }
      ul {
        padding: 0.5rem 0.5rem 2rem 0.5rem;
        li {
          margin-bottom: 0.4rem;
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
            margin-bottom: 0.2rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
        .contract {
          display: block;

          .row1 {
            margin-bottom: 0.1rem;
          }
          .row2 {
            width: 6.5rem;
            height: 6rem;
            border: 0.01rem solid #b3b3b3;
            // box-sizing: border-box;
            padding: 0;
            background: #f2f2f2;
            .draft1_middle {
              padding: 0.3rem;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              overflow-y: auto;
            }
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        button {
          width: 6.5rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>