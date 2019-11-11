<template>
  <div id="mhome">
    <header>
      <div>
        <img src="../../assets/a815bb7a0d3bbf55b916045900e4d9f.png" alt />
      </div>
      <van-search
        v-model="searchkey"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        left-icon
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">
          <van-icon name="search" />
        </div>
      </van-search>
      <van-dropdown-menu>
        <van-dropdown-item
          :title="activeIds==0?'行业':items[0].children[activeIds-1].text"
          v-model="value1"
          ref="item"
        >
          <van-tree-select
            :items="items"
            :active-id="activeIds"
            :main-active-index="mainActiveIndex"
            @click-nav="onClickNav"
            @click-item="onClickItem"
          />
        </van-dropdown-item>
        <van-dropdown-item
          v-model="region_name"
          @change="function(value){
          return region(value,option[value])
        }"
          :title="region_nametitle?region_nametitle:'地区'"
          :options="option"
        />
      </van-dropdown-menu>
    </header>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :loading-text="loadText"
        :offset="300"
      >
        <div v-for="(goods,item) in  upGoodsInfo" :key="item" class="goodlists">
          <article @click="routerto(goods)">
            <nav>{{goods.projectName}}</nav>
            <section>
              <span>行业：</span>
              <span>{{goods.projectIndustry}}</span>
            </section>
            <section>
              <span>地区：</span>
              <span>{{goods.projectArea}}</span>
            </section>
            <section>
              <span>简介：</span>
              <span v-html="goods.projectDescribe.substr(0, [70])+'...'"></span>
              <!-- <div class="van-multi-ellipsis--l2">{{goods.projectDescribe}}</div> -->
            </section>
            <footer>
              <ul>
                <li v-for="(item) in  tags" :key="item.text">{{item.text}}（{{item.number}}）</li>
              </ul>
            </footer>
          </article>
          <footer>
            <button
              v-if="usertype==1"
              @click="$routerto('p_investor_infor',{pro:JSON.stringify(goods.signUserResp)})"
            >签约投资者资料（0）</button>
            <button v-else-if="usertype==4" @click="routerto(goods)">感兴趣项目</button>
          </footer>
        </div>
      </van-list>
    </div>
    <mbottom></mbottom>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "mhome",
  data() {
    return {
      items: [
        {
          text: "行业",
          children: []
        }
      ],
      usertype: "",
      activeIds: 0,
      tags: [
        {
          text: "待审核",
          number: 0
        },
        {
          text: "待签约",
          number: 0
        },
        {
          text: "待确认",
          number: 0
        },
        {
          text: "拒绝",
          number: 0
        },
        {
          text: "已签约",
          number: 0
        }
      ],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      // activeId: 1,
      searchkey: "",
      loading: false,
      finished: false,
      loadText: "loading…",
      pageNum: 0,
      loadNumUp: 5,
      upGoodsInfo: [],
      value1: "", //行业value
      region_name: "",
      region_nametitle: "",
      option: [
        {
          text: "全部地区",
          value: 0,
          remark: ""
        }
      ]
    };
  },
  created() {
   
    this.usertype = this.$store.state.currentUsertype;
    console.log(this.usertype);
    let axiosList = [
      this.$axios.get(`${this.$baseurl}/bsl_web/base/getAllIndustry`),
      this.$axios.get(`${this.$baseurl}/bsl_web/base/countryList.do`)
    ];
    this.$axios.all(axiosList).then(
      this.$axios.spread((res1, res2) => {
        if (res1) {
          for (let i = 0; i < res1.data.data.length; i++) {
            this.items[0].children.push({
              text: res1.data.data[i].industryNameCh,
              id: res1.data.data[i].industryId
            });
          }
        }
        if (res2) {
          for (let i = 0; i < res2.data.data.length; i++) {
            this.option.push({
              text: res2.data.data[i].countryZhname,
              value: i + 1,
              remark: res2.data.data[i].countryCode
            });
          }
        }
      })
    );
  },
  methods: {
    routerto(item) {
      this.$store.state.currentUsertype;
      if (this.$store.state.currentUsertype == 1) {
        console.log(item.signUserResp);
        // console.log(item.signUserResp.length);
        if (item.signUserResp.length > 1) {
          this.$routerto("mysign");
        } else if (item.signUserResp.length <= 1) {
          this.$routerto("p_goods_details", {
            projectId: item.projectId,
            signStatus: item.signUserResp[0].signStatus,
            signId: item.signUserResp[0].signId
          });
        }
      } else if (this.$store.state.currentUsertype == 3) {
        // this.$routerto("a_project_intro", { projectId: projectId });
      } else if (this.$store.state.currentUsertype == 4) {
        this.$routerto("a_project_intro", {
          projectId: item.projectId,
          signStatus: item.signUserResp[0].signStatus,
          signId: item.signUserResp[0].signId
        });
      }
    },
    region(value, region) {
      this.region_name = region.remark;
      this.region_nametitle = region.text;
      console.log(value, region, this.region_name);
      this.pageNum = 0;
      this.upGoodsInfo = [];
      this.onLoad();
    },
    onSearch() {
      // console.log(this.searchkey);
      this.pageNum = 0;
      this.upGoodsInfo = [];
      this.onLoad();
    },
    onClickNav(index) {
      this.mainActiveIndex = index;
    },
    onClickItem(data) {
      console.log(data);
      if (this.activeIds == data.id) {
        this.activeIds = 0;
      } else {
        this.activeIds = data.id;
      }
      this.pageNum = 0;
      this.upGoodsInfo = [];
      this.onLoad();
    },
    onLoad() {
      if (this.activeIds == 0) {
        this.activeIds = "";
      }
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/project/getAllProject?`,
        params: {
          searchKey: this.searchkey,
          pageIndex: ++this.pageNum,
          pageSize: this.loadNumUp,
          bslAreaCode: this.region_name,
          industryId: this.activeIds
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.status === 200) {
            let re = res.data.data.lists;
            if (re.length !== 0) {
              // this.upGoodsInfo = [];
              this.upGoodsInfo = this.upGoodsInfo.concat(re);
            }
            this.loading = false;
            if (this.upGoodsInfo.length >= res.data.data.pageTotal) {
              this.loadText = "加载完成";
              this.finished = true;
            }
          } else {
            this.finished = true;
          }
          console.log(this.upGoodsInfo);
          // let arr=[];
          // for(let i=0;i<this.upGoodsInfo.length;i++){
          //   arr.push()  this.upGoodsInfo[i].signUserResp
          // }
        })
        .catch(err => {
          this.loadText = "loading failed";
          document.querySelector(
            "#mhome .van-loading__circular"
          ).style.display = "none";
          let a = (document.querySelector("#mhome .van-loading__text").style =
            "margin-left:0");
          console.log(a);
        });
    }
  }
};
</script>

<style lang="scss">
#mhome {
  .van-list {
    // padding-bottom: 1.3rem;
  }
  header {
    .van-search {
      padding: 0.3rem 0.4rem 0 0.4rem;
    }
    .van-hairline--top-bottom::after {
      border: 0;
    }
    .van-search__action {
      font-size: 0.38rem;
      line-height: 0.76rem;
    }
    .van-icon-search {
      background: #ffc303;
      border-radius: 50%;
      width: 0.6rem;
      height: 0.6rem;
      color: #282407;
      text-align: center;
      line-height: 0.6rem;
      font-size: 0.4rem;
    }
    .van-popup {
      max-height: 62%;
    }
    .van-cell {
      font-size: 0.1rem;
      line-height: 0.5rem;
      // height: 0.76rem;
      padding: 0 0.25rem 0 0;
    }

    .van-field__left-icon .van-icon,
    .van-field__right-icon .van-icon {
      font-size: 0.3rem;
    }
    .van-tree-select__nav-item {
      line-height: 1rem;
    }
    .van-tree-select__item {
      line-height: 1rem;
    }
    .van-tree-select__nav-item--active {
      border-color: rgb(25, 137, 250);
    }
    .van-tree-select__item--active {
      color: rgb(25, 137, 250);
    }
    .van-tree-select__selected {
      //  line-height: 1rem;
      margin-top: -0.2rem;
    }
    .van-field__control {
      height: 0.76rem;
      // font-size: 0.36rem;
    }
    .van-field__clear {
      // height: 0.1rem;
      font-size: 0.4rem;
    }
    .van-cell--clickable {
      padding: 0.2rem 0.3rem;
    }
    .van-dropdown-menu {
      height: 1.06rem;
      // line-height: 1.06rem;
      .van-dropdown-menu__title {
        font-size: 0.32rem;
      }
      .van-dropdown-item--down {
        .van-tree-select {
          font-size: 0.32rem;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
#mhome {
  display: flex;
  height: 100%;
  flex-direction: column;
  > header {
    // height: 3.8rem;
    width: 100%;
    z-index: 5;
    position: fixed;
    top: 0;
    background: white;
    h3 {
      text-align: center;
      font-size: 0.4rem;
      margin: 0.3rem 0;
    }
    > div {
      // width: 100%;
      // height:  1.82rem;;
      img {
        width: auto;
        height: auto;
        display: block;
        // display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .main {
    margin: 3.95rem 0 1.5rem 0;
    // margin-bottom: 5rem;
    height: 100%;
    background: #eeeeee;
    box-sizing: border-box;
    .goodlists {
      margin: 0.2rem 0.1rem;
      background: white;
      display: flex;
      flex-direction: column;
      border: 0.02rem solid #ccc;
      article {
        padding: 0.27rem 0.46rem 0.27rem 0.46rem;
        border-bottom: 0.02rem solid #ccc;
        nav {
          // width: 6.3rem;
          font-size: 0.5rem;
          color: #0f6ebe;
          font-weight: 550;
          line-height: 0.5rem;
          margin-bottom: 0.7rem;
          box-sizing: border-box;
        }
        ul {
          display: flex;
          font-size: 0.03rem;
          flex-wrap: wrap;

          li {
            display: flex;
            height: 0.5rem;
            width: 2.36rem;
            // font-size: 0.1rem;
            color: #fdfffe;
            // text-align: center;
            justify-content: center;
            line-height: 0.5rem;
            margin-right: 0.44rem;
            margin-bottom: 0.12rem;
            background: url(../../assets/c5652240e4485f406fbaf8cb89b0afb.png)
              no-repeat;
          }
        }
        section {
          font-size: 0.28rem;
          margin-bottom: 0.32rem;
          color: #747474;
          // display: flex;
          span:nth-of-type(1) {
            // display: block;
            vertical-align: top;
            // line-height: 0.2rem;
            // width: 2.5rem;
            line-height: 0.4rem;
            // flex:
          }
          span:nth-of-type(2) {
            // display: inline-block;
            vertical-align: top;
            // width: 8.3rem;
            word-break: break-all;
            // flex: 1;
            line-height: 0.4rem;
          }
        }
      }
      footer {
        // flex: 1;
        height: 1.2rem;
        // position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 95%;

          // position: absolute;
          // right: 0.25rem;
          height: 0.88rem;
          background: #00adef;
          color: white;
          font-size: 0.3rem;
          top: 50%;
          // transform: translateY(-50%);
        }
        button.active {
          background: #747474;
        }
      }
    }
  }
  #moblie_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>


