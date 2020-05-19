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
          <li i v-for="(item) in details_lists" :key="item.name">
            <div
              v-if="item.keyword!='investorsCompany' || (item.keyword=='investorsCompany' && item.response!='')"
            >
              <p class="row1">{{item.name}}</p>
              <p class="row2">{{item.response}}</p>
            </div>
          </li>
        </ul>
        <!-- <footer>
          <button @click="check_contract">查看合约</button>
        </footer> -->
      </article>
    </main>
<!--    <mbottom></mbottom>-->
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
    console.log(this.$route.query);

    this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/projectSign/getInvestorsDetail`,
      {investorsId:this.$route.query.investorsId})
      .then(res => {
      console.log(res);
      this.$route.query.signId = res.data.data.signId;
      for (var i in res.data.data) {
        for (var j = 0; j < this.details_lists.length; j++) {
          if (this.details_lists[j].keyword == i) {
			  if(res.data.data.lan=='zh_CN'){
				  if(i=='interestedIndustries'){
				      this.details_lists[j].response = res.data.data.interestedIndustries || '-';
				  }else if(i=='investorsArea'){
					   this.details_lists[j].response = res.data.data.investorsArea || '-';;
				  }  else if(i=='investorsCompany'){
					this.details_lists[j].response = res.data.data.investorsCompany || '-';;
						}  else if(i=='investorsCompanyAddress'){
							   this.details_lists[j].response = res.data.data.investorsCompanyAddress || '-';;
						}
			  }else {
				  if(i=='interestedIndustries'){
				   this.details_lists[j].response = res.data.data.interestedIndustriesEn || '-';;
				  }else if(i=='investorsArea'){
					 this.details_lists[j].response = res.data.data.investorsAreaEn || '-';;
				  }else if(i=='investorsCompany'){
					this.details_lists[j].response = res.data.data.investorsCompanyEn || '-';;
				}else if(i=='investorsCompanyAddress'){
				 this.details_lists[j].response = res.data.data.investorsCompanyAddressEn || '-';;
				}
				    
			  }
			// if (this.details_lists[j].keyword == "signStatus") {
   //            this.details_lists[j].response = this.$global.pic_obj[
   //              res.data.data[i]
   //            ]|| '-';;
   //          } else 
			
			if (this.details_lists[j].keyword == "publicCompany") {
              this.details_lists[j].response =
                res.data.data[i] == false ? this.$t('common.isno'): this.$t('common.isyes')|| '-';;
            }
			// else if (this.details_lists[j].keyword == "signTime3") {
   //            this.details_lists[j].response =  res.data.data[i]==0?"-":this.$global.timestampToTime(
   //              res.data.data[i]
   //            );
   //          } 
			else {
              this.details_lists[j].response = res.data.data[i]|| '-';;
            }
            // if (this.details_lists[j].keyword == "signTime3") {
            //   this.details_lists[j].response =  res.data.data[i]==0?"":this.$global.timestampToTime(
            //     res.data.data[i]
            //   );
            // }
          }
        }
      }
      this.$toast.clear();
    });
  },
  methods:{

  }
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

