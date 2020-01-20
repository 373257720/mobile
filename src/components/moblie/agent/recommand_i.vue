<template>
  <div id="a_recommand_i">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <article>
        <!-- <header>{{title}}</header> -->
        <ul>
          <li class="identity">
            <p class="row1">投资者类型:</p>
            <p class="row2">
              <van-cell-group>
                <van-dropdown-menu>
                  <van-dropdown-item v-model="form.investorsType" :options="investors_type" />
                </van-dropdown-menu>
              </van-cell-group>
            </p>
          </li>
          <li class="investorsCompany" v-show="form.investorsType==2">
            <p class="row1">投资者公司:</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="form.investorsCompany" placeholder="请输入" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">投资者姓名:</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="form.investorsName" placeholder="请输入" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsArea">
            <p class="row1">地区</p>
            <p class="row2">
              <van-cell-group>
                <van-dropdown-menu>
                  <van-dropdown-item
                    v-model="form.investorsArea"
                    :options="region"
                    :title="region_nametitle"
                    @change="function(value){
          return regionchoose(value,region[value])
        }"
                  />
                </van-dropdown-menu>
                <!-- <van-field v-model="form.investorsArea" placeholder="请输入" /> -->
              </van-cell-group>
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
  name: "a_recommand_i",
  data() {
    return {
      investors_type: [{ text: "个人", value: 1 }, { text: "公司", value: 2 }],
      dad_text: "推荐投资人",
      title: "",
      region: [
        // {
        //   text: "地区",
        //   value: 0,
        //   remark: ""
        // }
      ],
      region_nametitle: "",
      form: {
        investorsType: "",
        investorsCompany: "",
        investorsName: "",
        investorsArea: "",
        projectId: "",
        // areaCode: ""
        // identity: ""
      }
    };
  },
  created() {
    this.form.projectId = this.$route.query.projectId;
    this.$global
      .changepage(`${this.$baseurl}/bsl_web/base/countryList.do`, "get")
      .then(res => {
        // console.log(res);
        // this.region = [...res.data.data];
        // console.log(this.region);
        for (let i = 0; i < res.data.data.length; i++) {
          this.region.push({
            text: res.data.data[i].countryZhname,
            value: i,
            remark: res.data.data[i].countryCode
          });
        }
      });
  },
  computed: {
    // typeofidentity(){
    //     this.form.investorsType
    // }
  },
  methods: {
    remind(meg) {
      this.$dialog
        .alert({
          title: meg
          // message: "弹窗内容"
        })
        .then(() => {
          // this.$goto("mhome");
        });
    },
    regionchoose(value, region) {
      this.region_nametitle = region.text;
      this.form.investorsArea = region.text;
      // this.form.areaCode = region.remark;
      //  console.log(this.form.investorsArea,region.remark)
    },
    submit() {
      console.log(this.form);
      this.$dialog
        .confirm({
          title: "确认提交"
          // message: "确认提交"
        })
        .then(() => {
          // on confirm
          this.$axios({
            method: "post",
            url: `${this.$baseurl}/bsl_web/projectSign/submitInvestors`,
            data: this.$qs.stringify(this.form)
          }).then(res => {
            if (res.data.resultCode == 10000) {
              this.$dialog
                .alert({
                  title: "提交成功"
                  // message: "弹窗内容"
                })
                .then(() => {
                  this.$goto("mhome");
                });
            } else {
              this.remind(res.data.resultDesc);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
#a_recommand_i {
  .van-cell {
    font-size: 0.38rem;
    padding: 0 1rem;
    /*line-height: 1rem;*/
    // padding: 0;
    height: 100%;
    /*line-height: 1.2rem;*/
  }
  .van-dropdown-menu__title {
    font-size: 0.38rem;
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
  }
  .van-field__control{
    height: 100%;
  }
  .van-dropdown-menu__item {
    justify-content: left;
    width: 100%;
    flex: none;
  }
  .van-cell-group{
    height: 100%;
  }
  .van-icon-arrow-left {
    position: absolute;
    left: 0.6rem;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
  .van-dropdown-menu {
    height: 100%;
    border-radius: 0.05rem;
    // border: 0.01rem solid #ababab;
    background: #f6f6f6;
    .van-cell {
      font-size: 0.38rem;
      padding: 0 1rem;
      line-height: 1rem;
      // padding: 0;
      height:1rem;
      /*line-height: 1.2rem;*/
    }
  }
  .van-field__body {
    //  width: 100%;
    /*height: 1rem;*/
    // border: 0.02rem solid #ababab;
    border-radius: 0.05rem;
    background: #f6f6f6;
    padding: 0 0.5rem;
    box-sizing: border-box;
    height: 100%;
  }
  .van-field__control {
    // padding: 0 0.2rem;
    // height: 0.5rem;
  }
  .van-field__clear {
    font-size: 0.32rem;
  }
  .van-field {
    padding: 0;
  }
  .van-uploader__preview {
    margin: 0;

    // overflow: hidden;
  }
  .van-uploader__preview-image {
    margin: 0;
    width: 100%;
    height: 3.3rem;
    //  border: 0.01rem solid #ababab;
    //  overflow: hidden;

    img {
      //  border-radius: 0.02rem;
      border-radius: 0.1rem;
    }
  }
  .van-uploader {
    width: 100%;
    height: 3.3rem;
  }
  .van-uploader__upload {
    width: 100%;
    background: #f6f6f6;
    border: 0;
    height: 3.3rem;
    // border: 1px solid #ababab;
    border-radius: 0.05rem;
    box-sizing: border-box;
    .van-uploader__upload-icon {
      font-size: 0.5rem;
    }
  }
  // .van-uploader__input{
  //   height: 3.3rem;
  // }
  .van-dropdown-menu__title::after {
    border: 0.1rem solid;
    /*top: 50%;*/
    right: 0.5rem;
    margin: 0;
    transform: rotate(0);
    border-color: currentColor transparent transparent transparent;
  }
  .van-hairline--top-bottom::after {
    border: 0;
  }
  .van-dropdown-menu__title--down::after {
    border: 0.1rem solid;
    /*top: 50%;*/
    /*right: 0.5rem;*/
    border-color: currentColor transparent transparent transparent;
  }
}
</style>
<style lang="scss" scoped>
#a_recommand_i {
  width: 100%;
  main {
    // z-index: -999;
    margin-top: 1.6rem;
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
        height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        // font-size: 0.5rem;
        color: #0f6ebe;
        // text-align: center;
        font-weight: 600;
        line-height: 0.7rem;
        // border-bottom: 0.1rem solid #b5b5b5;
      }
      ul {
        padding: 0.5rem 0.5rem 2rem 0.5rem;
        li {
          margin-bottom: 0.4rem;
          display: flex;
          height: 1.2rem;
          /*align-items: baseline;*/
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
            line-height: 1.2rem;
            /*margin-bottom: 0.2rem;*/
          }
          .row2 {
            width: 7rem;
            height: 100%;
            word-break: break-all;
            /*line-height: 1.2rem;*/
            color: #787878;
            box-sizing: border-box;
             border: 1px solid #b3b3b3;

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
            // border: 1px solid #b3b3b3;
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
        font-size: 0.38rem;
        button {
          width: 9.9rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>
