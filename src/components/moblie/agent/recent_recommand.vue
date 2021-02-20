<template>
  <div id="recent_recommand">
    <commonnav>
      {{ $t("project.RecommendMore") }}
      <template v-slot:arrowLeft>
       <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <div @click="routerto(1)">
        <span>{{ $t("agent.RM") }}</span>
      </div>
      <div @click="routerto(2)">
        <span>{{ $t("agent.RecommendInvestors") }}</span>
      </div>
    </main>
  </div>
</template>

<script>
let timeout;
export default {
  name: "recent_recommand",
  inject: ["recommendList"],
  data() {
    return {
      num: 1,
      interestedInduslistid: [],
      industrylist: [],
      countrylist_fetching: false,
      investors_type: [
        {
          text: this.$t("common.individual"),
          value: 1,
        },
        {
          text: this.$t("common.company"),
          value: 2,
        },
      ],
      dad_text: this.$t("agent.RecommendInvestors"),
      title: "",
      investorsArea: undefined,
      // Routequery: {
      //   towho: null,
      //   signId: "",
      //   signStatus4: "",
      // },
    };
  },

  created() {
    console.log(this.recommendList);
    // this.Routequery = Object.assign(this.Routequery, this.$route.query);
  },
  computed: {},
  methods: {
    routerto(num) {
      let Routequery = Object.assign({ towho: num }, this.$route.query);
      this.$routerto("a_recommand_i", Routequery);
    },
    toggleAll() {
      // console.log(this.num)
      if (this.num == 1) {
        this.$refs.checkboxGroup.toggleAll(true);
        this.num = 2;
      } else if (this.num == 2) {
        this.$refs.checkboxGroup.toggleAll(false);
        this.num = 1;
      }
    },
    toggle(index) {
      this.$refs.checkboxess[index].toggle();
    },
    handleChange1(value) {
      this.form.investorsType = value;
      // console.log()
    },
    search(val) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(this.ulHtml(val), 300);
    },
    handleChange(value) {
      this.investorsArea =
        this.$i18n.locale == "zh_CN"
          ? this.region[value - 1].chinese
          : this.region[value - 1].eng;
      this.form.investorsAreaEn = this.region[value - 1].eng;
      this.form.investorsArea = this.region[value - 1].chinese;
      this.countrylist_fetching = false;
      // console.log(this.form)
    },
    cleanall(value) {
      this.form.investorsCompany = "";
    },
    ulHtml(val) {
      this.region = [];
      let arr = [];
      this.countrylist_fetching = true;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: val,
          }
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              arr.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                value: i,
                remark: res.data.data[i].countryCode,
              });
            }
            this.region = arr;
          }
          // console.log(this.region)
          this.countrylist_fetching = false;
        });
    },
    remind(meg) {
      this.$dialog
        .alert({
          title: meg,
          // message: "弹窗内容"
        })
        .then(() => {});
    },
    regionchoose(value, region) {
      this.region_nametitle = region.text;
      this.form.investorsArea = region.text;
      // this.form.areaCode = region.remark;
      //  console.log(this.form.investorsArea,region.remark)
    },
    submit() {
      // if(this.form.investorsType==2 && this.form.investorsCompany==''){
      //   this.$toast({ message:this.$t('agent.PleaseEnterTheCompanyName')});
      //   return
      // }
      if (this.form.investorsType == 2 && this.form.investorsCompanyEn == "") {
        this.$toast({
          message: this.$t("agent.PleaseEnterTheCompanyName"),
        });
        return;
      }
      if (this.form.investorsName == "") {
        this.$toast({
          message: this.$t("agent.PleaseEnterInvestorName"),
        });
        return;
      } else if (this.form.investorsArea == "") {
        this.$toast({
          message: this.$t("agent.PleaseEnterRegion"),
        });
        return;
      }
      console.log(this.form);
      this.commit();
    },
    commit() {
      console.log(this.form);
      this.$dialog
        .confirm({
          title: this.$t("agent.Confirm"),
          // message: "确认提交"
        })
        .then(() => {
          this.$loading();
          this.$global
            .post_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_web/projectSign/submitInvestors`,
              this.form
            )
            .then((res) => {
              this.$toast.clear();
              if (res.data.resultCode == 10000) {
                this.$dialog
                  .alert({
                    title: res.data.resultDesc,
                    message: this.$t("agent.WaitingForInvestmentBankReview"),
                  })
                  .then(() => {
                    this.$routerto("mysign");
                  });
              } else {
                this.remind(res.data.resultDesc);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss">
#recent_recommand {
  main {
    // padding: 0.5rem;
    padding: vw(322) vw(100) vw(160);
    // width: 100%;
    display: flex;
    flex-direction: column;
    div {
      width: vw(552);
      height: vw(108);
      background: #4f3dad;
      border-radius: vw(16);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #ffffff;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
        margin-bottom: vw(114);
      }
    }
  }
}
</style>
