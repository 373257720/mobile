<template>
  <div id="p_investor_lists">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />
      {{$t('common.InformationOfContractedInvestors')}}
    </nav>
    <!-- <commonnav :msg="dad_text"></commonnav> -->
    <main>
      <article>
        <ul>
          <li
            v-for="(item,index) in totallists"
            :key="item.item"
            @click="$routerto('p_inverstor_details',{investorsId:item.investorsId})"
          >
            <aside>{{index+1}}</aside>
            <article class="main_right">
              <div v-for="(ite) in details_lists" :key="ite.name">
                <p v-if="item[ite.keyword]">
                  <span class="row1">{{ite.name}}</span>
                  <span class="row2">{{item[ite.keyword]}}</span>
                </p>
              </div>
            </article>
            <footer class="checkall">
              <img src="../../../assets/932de214a934dcc83b834aab8d58a34.png" alt />
            </footer>
          </li>
        </ul>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      dad_text: this.$t("projectOwner.InvestorInformation"),
      form: {
        investorsIdList: []
        // X_Token: this.$store.state.X_Token
      },
      // investorsId:'',
      details_lists: [
        {
          keyword: "signTime3",
          name: this.$t("projectOwner.SigningTime"),
          response: ""
        },
        {
          keyword: "investorsCompany",
          name: this.$t("agent.InvestorCompany"),
          response: ""
        },
        {
          keyword: "investorsName",
          name: this.$t("agent.InvestorName"),
          response: ""
        },
        {
          keyword: "investorsMobile",
          name: this.$t("investor.InvestorPhone"),
          response: ""
        }
      ],
      totallists: []
    };
  },

  methods: {},
  created() {
    this.$loading();
    let arr = [];
    // console.log(this.$route.query);
    arr = this.$route.query.arr && JSON.parse(this.$route.query.arr);
    this.form.investorsIdList = arr;
    // this.$axios({
    //   method: "post",
    //   url: `${this.$baseurl}/bsl_web/projectSign/getInvestorsList`,
    //   data: this.$qs.stringify(this.form, { arrayFormat: "brackets" })
    // });
    this.$global
      .post_encapsulation(
        `${this.$baseurl}/bsl_web/projectSign/getInvestorsList`,
        this.form
      )
      .then(res => {
        this.$toast.clear();
        if (res.data.resultCode == 10000) {
          this.totallists = res.data.data;
          for (let i = 0; i < this.totallists.length; i++) {
            this.totallists[i].signTime3 =
              this.totallists[i].signTime3 == 0
                ? ""
                : this.$global.timestampToTime(this.totallists[i].signTime3);
          }
        }else{

        }
      });
  }
};
</script>
<style lang="scss">
#p_investor_lists {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
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
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;

    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    padding: 1.5rem 0 1.3rem 0;
    background: #ffffff;
    ul {
      padding: 0 0.42rem;
      li {
        padding: 0.2rem 0;
        font-size: 0.38rem;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        border-bottom: 0.02rem dashed #b3b3b3;
        aside {
          width: 0.62rem;
          height: 0.62rem;
          border-radius: 50%;
          color: #02a7e7;
          text-align: center;
          line-height: 0.62rem;
          font-size: 0.42rem;
          border: 0.03rem solid #02a7e7;
        }
        .main_right {
          flex: 3;
          margin: 0 0.5rem;
          width: 7.16rem;
          // font-size: 0.36rem;
          > div {
            display: flex;

            line-height: 0.6rem;
            p {
              margin: 0.1rem;
            }
            .row1 {
              color: #4c4c4c;
              display: inline-block;
              font-weight: 600;

              width: 2.86rem;
            }
            .row2 {
              display: inline-block;
              // width: 3.5rem;
              flex: 1;
              color: #787878;
              word-wrap: break-word;
            }
          }
        }
        .checkall {
          img {
            width: 0.6rem;
            height: 0.6rem;
          }
        }
      }
    }
  }
}
</style>

