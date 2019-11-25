<template>
  <div id="p_user_contact2">
    <commonnav :msg="dad_text"></commonnav>
    <!-- <main></main> -->
    <ul>
      <li>
        <!-- <p> -->
        <span>
          <img src="../../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
        </span>
        <span>{{name}}</span>
        <!-- <van-icon name="arrow" /> -->
        <!-- </p> -->
      </li>
      <li>
        <section>
          <p v-for="(item) in details_lists" :key="item.name">
            <span>{{item.name}}</span>
            <span>{{item.response}}</span>
            <!-- <van-icon name="arrow" /> -->
          </p>
        </section>
      </li>
    </ul>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "user_contact",
  data() {
    return {
      searchkey: "",
      dad_text: "联络人",
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
          keyword: "interestedIndustries",
          name: "投资者兴趣:",
          response: ""
        },
        {
          keyword: "investorsEmail",
          name: "投资者邮箱:",
          response: ""
        },
        {
          keyword: "investorsCompanyAddress",
          name: "公司地址:",
          response: ""
        },
        {
          keyword: "signTime3",
          name: "签约时间:",
          response: ""
        }
      ]
    };
  },
  computed: {
    name() {
      return this.$route.query.idname;
    }
  },
  created() {
    this.$global
      .changepage(
        `${this.$baseurl}/bsl_web/projectSign/getInvestorsDetail?investorsId=${this.$route.query.investorsId}`,
        "get"
      )
      .then(res => {
        for (let i in res.data.data) {
          for (let j = 0; j < this.details_lists.length; j++) {
            if (this.details_lists[j].keyword == i) {
              if (this.details_lists[j].keyword == "signStatus") {
                this.details_lists[j].response = this.$global.pic_obj[
                  res.data.data[i]
                ];
              } else if (this.details_lists[j].keyword == "publicCompany") {
                this.details_lists[j].response =
                  this.res.data.data[i] == false ? "否" : "是";
              } else {
                this.details_lists[j].response = res.data.data[i];
              }
              if (this.details_lists[j].keyword == "signTime3") {
                this.details_lists[j].response = this.$global.timestampToTime(
                  res.data.data[i]
                );
              }
            }
          }
        }
      });

    // if(a.er
  },
  methods: {
    onSearch() {
      console.log(this.searchkey);
    }
  }
};
</script>
<style lang="scss">
#p_user_contact2 {
  .van-search {
    padding: 0.1rem 0.2rem;
  }
  .van-search__action {
    font-size: 0.3rem;
    line-height: 0.5rem;
  }
  .van-cell {
    font-size: 0.1rem;
    line-height: 0.5rem;
    padding: 0.1rem 0.25rem 0.1rem 0;
  }
  .van-cell--clickable {
    padding: 0.1rem 0.3rem;
  }
  .van-field__left-icon .van-icon,
  .van-field__right-icon .van-icon {
    font-size: 0.3rem;
  }
  .van-field__clear {
    // height: 0.1rem;
    font-size: 0.3rem;
  }
  .van-field__control {
    // height: 0.5rem;
    // font-size: 0.1rem;
  }
  nav {
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }

  .van-dropdown-menu {
    height: 1rem;
  }
  .van-hairline--top-bottom {
    text-align: left;
    .van-ellipsis {
      font-size: 0.3rem;
    }
    .van-cell--clickable {
      font-size: 0.3rem;
    }
  }
}
</style>
<style lang="scss" scoped>
#p_user_contact2 {
  width: 100%;

  ul {
    padding: 1.6rem 0 1.5rem 0;
    background: white;
    li:nth-child(1) {
      margin-bottom: 0.5rem;
      height: 2.23rem;
      display: flex;
      align-items: center;
      border-bottom: 0.02rem dashed #f2f2f2;
      img {
        height: 1.46rem;
        width: 1.46rem;
      }

      span:nth-child(1) {
        // display: inline;
        // font-weight: 600;
        // color: #4c4c4c;
        margin-right: 0.76rem;
        // font-size: 0.3rem;
        // line-height: 1.5rem;
      }
      span:nth-child(2) {
        font-weight: 600;
        color: #4c4c4c;
        font-size: 0.38rem;
        // line-height: 1.5rem;
      }
    }
    li {
      word-break: break-all;
      margin: 0 0.7rem 0;
      display: flex;
      font-size: 0.3rem;

      p {
        display: flex;
        // flex-direction: column;
        // margin-left: 0.4rem;
        margin-bottom: 0.4rem;
        font-size: 0.38rem;
        line-height: 0.5rem;
        // align-items: baseline;
        span:nth-child(1) {
          font-weight: 550;
          width: 2.3rem;
          color: #4c4c4c;
          display: inline-block;
          //   width: 2rem;
        }
        span:nth-child(2) {
          flex: 1;
          font-weight: 500;
          color: #787878;
          // font-size: 0.2rem;
          // line-height: 0.5rem;
          display: inline-block;
          //   width: 3rem;
        }
      }
    }
  }
}
</style>