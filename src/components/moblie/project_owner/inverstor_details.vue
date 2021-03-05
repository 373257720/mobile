<template>
  <div id="p_inverstor_details">
    <!--    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />
      {{$t('common.InformationOfContractedInvestors')}}
    </nav> -->
    <commonnav :msg="$t('common.InformationOfContractedInvestors')"></commonnav>
    <main>
      <article>
        <ul>
          <li i v-for="item in details_lists" :key="item.name">
            <div
              v-if="
                item.keyword != 'investorsCompany' ||
                (item.keyword == 'investorsCompany' && item.response != '')
              "
            >
              <p class="row1">{{ item.name }}</p>
              <p class="row2">{{ item.response }}</p>
            </div>
          </li>
        </ul>
        <!-- <footer>
          <button @click="check_contract">查看合约</button>
        </footer> -->
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "p_inverstor_details",
  data() {
    return {
      details_lists: [
        {
          keyword: "investorsCompany",
          name: this.$t("agent.InvestorCompany"),
          response: "",
        },
        {
          keyword: "investorsName",
          name: this.$t("agent.InvestorName"),
          response: "",
        },
        {
          keyword: "investorsArea",
          name: this.$t("investor.InvestorRegion"),
          response: "",
        },
        {
          keyword: "investorsMobile",
          name: this.$t("investor.InvestorPhone"),
          response: "",
        },
        {
          keyword: "investorsEmail",
          name: this.$t("investor.InvestorEmail"),
          response: "",
        },
        {
          keyword: "interestedIndustries",
          name: this.$t("investor.InvestorInterest"),
          response: "",
        },
        {
          keyword: "investorsCompanyAddress",
          name: this.$t("investor.InvestorCompanyAddress"),
          response: "",
        },
      ],
    };
  },
  created() {
    this.$loading();
    console.log(this.$route.query);

    this.$global
      .get_encapsulation(
        `${this.$axios.defaults.baseURL}/bsl_web/projectSignOther//bsl_web/myProjectDetails/investorsGetProjectDetails`,
        {
          investorsId: this.$route.query.investorsId,
        }
      )
      .then((res) => {
        // console.log(res);
        // this.$route.query.signId = res.data.data.signId;
        this.details_lists.forEach((item) => {
          if (res.data.data.hasOwnProperty(item.keyword)) {
            item.response = res.data.data[item.keyword] || "-";
            if (res.data.data.lan == "en_US") {
              if (item.keyword == "interestedIndustries") {
                item.response = res.data.data.interestedIndustriesEn || "-";
              } else if (item.keyword == "investorsArea") {
                item.response = res.data.data.investorsAreaEn || "-";
              } else if (item.keyword == "investorsCompany") {
                item.response = res.data.data.investorsCompanyEn || "-";
              } else if (item.keyword == "investorsCompanyAddress") {
                item.response = res.data.data.investorsCompanyAddressEn || "-";
              }
            }
          }
        });
        this.$toast.clear();
      });
  },
  methods: {},
};
</script>
<style lang="scss">
#p_inverstor_details {
}
</style>
<style lang="scss" scoped>
#p_inverstor_details {
  width: 100%;
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
      margin: 0 0 1.3rem 0;

      header {
        height: 1.7rem;
        font-size: 0.32rem;
        text-align: center;
        font-weight: 600;
        line-height: 1.7rem;
        border-bottom: 0.01rem dashed #b5b5b5;
      }

      ul {
        padding: 0.5rem 0.5rem 0 0.5rem;

        li {
          > div {
            margin-bottom: 0.5rem;
            align-items: baseline;
            font-size: 0.44rem;
            line-height: 0.56rem;
          }

          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            font-size: 0.46rem;
            margin-bottom: 0.2rem;
          }

          .row2 {
            /*height: 0.6rem;*/
            word-break: break-all;
            line-height: 0.6rem;
            color: #787878;
          }
        }
      }
    }
  }
}
</style>
