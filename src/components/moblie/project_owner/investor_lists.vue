<template>
  <div id="p_investor_lists">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />投资者资料
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
              <section v-for="(ite) in details_lists" :key="ite.name">
                <span class="row1">{{ite.name}}</span>
                <span class="row2">{{item[ite.keyword]}}</span>
              </section>
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
      dad_text: "投资者资料",
      form: {
        investorsIdList: []
      },
      // investorsId:'',
      details_lists: [
        {
          keyword: "signTime3",
          name: "签约成功时间:",
          response: ""
        },
        {
          keyword: "investorsCompany",
          name: "投资者公司:",
          response: ""
        },
        {
          keyword: "investorsName",
          name: "投资者名称:",
          response: ""
        },
        {
          keyword: "investorsMobile",
          name: "投资者电话",
          response: ""
        },
        {
          keyword: "interestedIndustries",
          name: "投资者兴趣:",
          response: ""
        }
      ],
      totallists: []
    };
  },

  methods: {
    gg() {
      // console.log(this.$dialog);

      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  created() {
    let arr = [];
    console.log(this.$route.query);
    arr = JSON.parse(this.$route.query.arr);
    this.form.investorsIdList = arr;
    this.$axios({
      method: "post",
      url: `${this.$baseurl}/bsl_web/projectSign/getInvestorsList`,
      data: this.$qs.stringify(this.form, { arrayFormat: "brackets" })
    }).then(res => {
      // console.log(res);
      this.totallists = res.data.data;
      for (let i = 0; i < this.totallists.length; i++) {
        this.totallists[i].signTime3 = this.$global.timestampToTime(
          this.totallists[i].signTime3
        );
      }

      console.log(this.totallists);
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
.van-dialog {
  font-size: 0.3rem;
}
.van-dialog__message {
  font-size: 0.3rem;
}
.van-button {
  font-size: 0.3rem;
}
</style>
<style lang="scss" scoped>
#p_investor_lists {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    font-weight: 550;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.16rem solid #b5b5b5;
  }
  main {
    margin-top: 1.7rem;
    background: #ffffff;
    ul {
      padding: 0 0.42rem 1.2rem 0.42rem;
      li {
        padding: 0.5rem 0 0.2rem 0;
        font-size: 0.3rem;
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
          line-height: 0.6rem;
          font-size: 0.16rem;
          border: 0.03rem solid #02a7e7;
        }
        .main_right {
          margin: 0 0.5rem;
          width: 7.16rem;
          font-size: 0.36rem;
          section {
            display: flex;
            margin-bottom: 0.3rem;
            line-height: 0.5rem;
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
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
    }
  }
}
</style>