<template>
  <div id="i_inverstor_infor">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约投资者资料
    </nav>
    <main>
      <!-- <aside>
        <img src="../../assets/26566ffb301dac8c24d21969b538612.png" alt />
      </aside>-->
      <article>
        <!-- <header>放水电费鼎飞丹砂</header> -->
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">{{item.response}}</p>
          </li>
        </ul>
      </article>
    </main>
    <mbottom></mbottom>
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
          name: "投资者公司:",
          response: ""
        },
        {
          keyword: "investorsName",
          name: "投资者名称",
          response: ""
        },
        {
          keyword: "investorsArea",
          name: "投资者地区:",
          response: ""
        },
        {
          keyword: "investorsMobile",
          name: "投资者电话:",
          response: ""
        },

        {
          keyword: "investorsEmail",
          name: "投资者邮箱:",
          response: ""
        },
        {
          keyword: "interestedIndustries",
          name: "投资者兴趣:",
          response: ""
        },
        {
          keyword: "investorsCompanyAddress",
          name: "投资者地址:",
          response: ""
        }
        // {
        //   name: "签约时间:",
        //   response: ""
        // }
      ]
    };
  },
  created() {
    this.$axios({
      method: "post",
      url: `${this.$baseurl}/bsl_web/projectSign/getInvestorsDetail?investorsId=${this.$route.query.investorsId}`
    }).then(res => {
      for (var i in res.data.data) {

        for (var j = 0; j < this.details_lists.length; j++) {
          if (this.details_lists[j].keyword == i) {
            this.details_lists[j].response = res.data.data[i];
          }
        }
      }
      // console.log(res);
      
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
      margin: 0 0 1.3rem 0;

      ul {
        padding: 0.5rem 0.5rem 0 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
      }
    }
  }
}
</style>
