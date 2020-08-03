<template>
  <div id="i_inverstor_infor">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />{{$t('investor.InformationOfContractedInvestors')}}
    </nav>
    <main>
      <!-- <aside>
        <img src="../../assets/26566ffb301dac8c24d21969b538612.png" alt />
      </aside>-->
      <article>
        <!-- <header>放水电费鼎飞丹砂</header> -->
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <div
              v-if="item.keyword!='investorsCompany' || (item.keyword=='investorsCompany' && item.response!='')"
            >
              <p class="row1">{{item.name}}</p>
              <p class="row2 init">{{item.response}}</p>
            </div>
          </li>
        </ul>
      </article>
    </main>
<!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
export default {
  name: "i_inverstor_infor",
  data() {
    return {
      details_lists: [
        {
          keyword: "investorsCompany",
          name:  this.$t('agent.InvestorCompany'),
          response: ""
        },
        {
          keyword: "investorsName",
          name: this.$t('agent.InvestorName'),
          response: ""
        },
        {
          keyword: "investorsArea",
          name: this.$t('investor.InvestorRegion'),
          response: ""
        },
        {
          keyword: "investorsMobile",
          name: this.$t('investor.InvestorPhone'),
          response: ""
        },
        {
          keyword: "investorsEmail",
          name: this.$t('investor.InvestorEmail'),
          response: ""
        },
        {
          keyword: "interestedIndustries",
          name: this.$t('investor.InvestorInterest'),
          response: ""
        },
        {
          keyword: "investorsCompanyAddress",
          name: this.$t('investor.InvestorCompanyAddress'),
          response: ""
        }
      ],

    };
  },
  created() {
    this.$loading();
      this.$global.get_encapsulation( `${this.$baseurl}/bsl_web/projectSign/getInvestorsDetail`,
        {
          investorsId:this.$route.query.investorsId,
        })
      .then(res => {
        console.log(res.data.data.lan)
      for (var i in res.data.data) {
        for (var j = 0; j < this.details_lists.length; j++) {
          if (this.details_lists[j].keyword == i) {
            if(i=='interestedIndustries'){
              if(res.data.data.lan=='zh_CN'){
                this.details_lists[j].response = res.data.data.interestedIndustries|| '-';
              }else {
                this.details_lists[j].response = res.data.data.interestedIndustriesEn|| '-';
              }
            }
           else if(i=='investorsArea'){
              if(res.data.data.lan=='zh_CN'){
                this.details_lists[j].response = res.data.data.investorsArea|| '-';
              }else {
                this.details_lists[j].response = res.data.data.investorsAreaEn|| '-';
              }
            }
            else if(i=='investorsCompany'){
              if(res.data.data.lan=='zh_CN'){
                this.details_lists[j].response = res.data.data.investorsCompany|| '-';
              }else {
                this.details_lists[j].response = res.data.data.investorsCompanyEn|| '-';
              }
            }
            else if(i=='investorsCompanyAddress'){
              if(res.data.data.lan=='zh_CN'){
                this.details_lists[j].response = res.data.data.investorsCompanyAddress || '-';
              }else {
                this.details_lists[j].response = res.data.data.investorsCompanyAddressEn|| '-';
              }
            }else {
              this.details_lists[j].response = res.data.data[i] || '-';
            }

          }
        }
      }
       this.$toast.clear();
    });

  }
};
</script>
<style lang="scss">
#i_inverstor_infor {
  nav {
    position: relative;
    .van-icon-arrow-left {
      // line-height: 1rem;
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
</style>
<style lang="scss" scoped>
#i_inverstor_infor {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    color:#333;
    font-size: 0.46rem;
    // background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    padding: 1.5rem 0 1.3rem 0;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      margin: 0 0 1.3rem 0;
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
