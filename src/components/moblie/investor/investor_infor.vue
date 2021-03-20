<template>
  <div id="p_investor_lists">
    <commonnav>
      投资人
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <article>
        <ul>
          <li v-for="(value,key) in projectItem" :key="key" 
          :class="{'potentialInvestorsTags':value.classname}">
            <div class="projectItem" v-if="value.content">
               <aside class="iconfont" :class="value.tag"></aside>
                  <p  v-if="key=='potentialInvestorsTags'">
                    <section v-for="(item,idx) in value.content" :key="idx">
                      <span>{{idx+1}}.</span>
                      <span>{{item}}</span>
                    </section>
                </p>
                  <p v-else-if="key=='optTime'">{{$global.timestampToTime(value.content)}}</p>
                  <p v-else>{{value.content}}</p>
            </div>
           
          </li>
        </ul>
        <!-- <section>
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{$global.timestampToTime(item.optTime)  }}</p>
            </section>
            <section>
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{ $t($global.investorsType[item.recommendType]) }}</p>
            </section>
            <section v-if="item.recommendType == 1">
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{ item.recommendName }}</p>
            </section>
            <section v-if="item.recommendType == 2">
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{ item.recommendCompany }}</p>
            </section>
            <section>
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{ item.recommendMobile }}</p>
            </section>
            <section>
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{ item.recommendIndustries.join(",") }}</p>
            </section>
            <section>
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{ item.recommendEmail }}</p>
            </section>
            <section>
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{ item.recommendCompanyAddress }}</p>
            </section>
            <section>
              <aside class="iconfont icon-bitbroicon2"></aside>
              <p>{{ item.recommendArea }}</p>
            </section> -->
        <!-- <p>
              <section v-for="(item,idx) in value.content" :key="idx">
                <span>{{idx+1}}.</span>
                <span>{{item}}</span>
              </section>
            </p> -->
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "investor_lists",
  data() {
    return {
      dad_text: this.$t("projectOwner.InvestorInformation"),
      form: {
        investorsIdList: [],
        // X_Token: this.$store.state.X_Token
      },
      // investorsId:'',
      projectItem: {
        recommendCompany: {
          tag: "icon-bitbroicon2",
          content: "",
        },
        recommendName: {
          tag: "icon-bitbroicon2",
          content: "",
        },
        recommendArea: {
          tag: "icon-bitbroicon2",
          content: "",
        },
        recommendMobile: {
          tag: "icon-bitbroicon4",
          content: "",
        },
        recommendEmail: {
          tag: "icon-bitbroicon5",
          content: "",
        },
        recommendIndustries: {
          tag: "icon-bitbroicon7",
          content: [],
          classname: true,
        },
        recommendCompanyAddress: {
          tag: "icon-bitbroicon2",
          content: "",
        },
        optTime: {
          tag: "icon-bitbroicon2",
          content: "",
        },
      },
    };
  },

  methods: {
    getInvestorsList() {
      // let arr = this.$route.query.arr && JSON.parse(this.$route.query.arr);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignOther/getInvestorsDetail`,
          { investorsId: this.$route.query.investorsId }
        )
        .then((res) => {
          console.log(res);
          let result = res.data.data;
          for (let i in result) {
            for (let key in this.projectItem) {
              if (key === i) {
                if (key == "projectCompany") {
                  this.projectItem[key].content =
                    result[key + this.$global.lan()];
                } else if (key == "recommendIndustries") {
                  // console.log(JSON.parse(result[key]));
                  let arr = JSON.parse(result[key]);
                  let arr2 = arr.map((item) => {
                    return item["industryName" + this.$global.language()];
                  });
                  this.projectItem[key].content = arr2.join(",");
                  // if (result[key].indexOf("[") > -1) {
                  //   this.projectItem[key].content = eval(
                  //     "(" + result[key + this.$global.lan()] + ")"
                  //   );
                  // }
                } else {
                  this.projectItem[key].content = result[i];
                }
              }
            }
          }

          // arr.forEach((item) => {
          //   let a = JSON.parse(item.recommendIndustries);
          //   item.recommendIndustries = a.map((item) => {
          //     return item["industryName" + this.$global.language()];
          //   });
          // });
          // console.log(arr);
          // // let a= arr[2].recommendIndustries

          // //   console.log(a);
          // this.totallists = arr;
          //  console.log(JSON.parse(this.totallists[0].recommendIndustries)[0]);
        });
    },
  },
  created() {
    this.getInvestorsList();
    // this.$loading();
    // let arr = [];
    // console.log(JSON.parse(this.$route.query.arr))
    // arr = this.$route.query.arr && JSON.parse(this.$route.query.arr);
    // this.form.investorsIdList = arr;
    // this.$axios({
    //   method: "post",
    //   url: `${this.$axios.defaults.baseURL}/bsl_web/projectSign/getInvestorsList`,
    //   data: this.$qs.stringify(this.form, { arrayFormat: "brackets" })
    // });
    // this.$global
    //   .post_encapsulation(
    //     `${this.$axios.defaults.baseURL}/bsl_web/projectSign/getInvestorsList`,
    //     this.form
    //   )
    //   .then(res => {
    //     this.$toast.clear();
    //     if (res.data.resultCode == 10000) {
    //       this.totallists = res.data.data;
    //       for (let i = 0; i < this.totallists.length; i++) {
    //         this.totallists[i].signTime3 =
    //           this.totallists[i].signTime3 == 0
    //             ? ""
    //             : this.$global.timestampToTime(this.totallists[i].signTime3);
    //       }
    //     }else{
    //     }
    //   });
  },
};
</script>
<style lang="scss">
#p_investor_lists {
}
// .van-dialog {
//   font-size: 0.3rem;
// }
// .van-dialog__message {
//   font-size: 0.3rem;
// }
// .van-button {
//   font-size: 0.3rem;
// }
</style>
<style lang="scss" scoped>
#p_investor_lists {
  width: 100%;
  height: 100%;
  main {
    padding: vw(192) vw(70) vw(80);
    background: #ffffff;
    color: #4f3dad;
    ul {
      li {
        margin-bottom: vw(25);
        div.projectItem {
          display: flex;
          align-items: center;

          aside {
            font-size: vw(48);
            line-height: vw(48);
            border-radius: 50%;
            margin-right: vw(30);
          }
          p {
            flex: 1;
            margin: 0;
            font-weight: bold;
            font-size: vw(24);
          }
        }
      }
      li.potentialInvestorsTags {
        // align-items: flex-start;
      }
    }
  }
}
</style>

