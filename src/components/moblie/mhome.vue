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
    <div id="main">
      <div class="main">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :loading-text="loadText"
           finished-text="没有更多了"
           error-text="请求失败，点击重新加载"
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
                <span v-html="goods.projectDescribe.length>90? goods.projectDescribe.substr(0, [90])+'...':goods.projectDescribe"></span>
                <!-- <div class="van-multi-ellipsis--l3" v-html="goods.projectDescribe"></div> -->
              </section>
              <div class="tag" v-if="usertype==1">
                <ul>
                  <li v-for="(item,key) in  tags" :key="item.text">
                    <div
                      v-if="goods.signUserList[key].length>0 && goods.signUserList[key][0].signCount">
                      <span> {{item.text}}</span>
                      <span>( {{goods.signUserList[key][0].signCount}} )</span>
                    </div>
                  </li>
                </ul>
              </div>
            </article>
            <footer>
              <button
                v-if="usertype==1"
                @click="router('p_investor_lists',{arr: JSON.stringify(goods.signUserList['signUserList6'][0].investorsIdList) })"
              >签约投资者资料 ( {{goods.signUserList['signUserList6'][0].signCount?goods.signUserList['signUserList6'][0].signCount:0}} )</button>
              <button
                v-else-if="usertype==3"
                @click="$routerto('i_conected_project',{projectId:goods.projectId,signStatus:goods.signUserResp[0].signStatus,signId:goods.signUserResp[0].signId})"
              >已连接项目</button>
              <button v-else-if="usertype==4" @click="routerto(goods)">感兴趣项目</button>
            </footer>
          </div>
        </van-list>
      </div>
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
      tags: {
        signUserList1: {
          text: "待审核",
          number: 0
        },
        signUserList2: {
          text: "待签约",
          number: 0
        },
        signUserList4: {
          text: "待确认",
          number: 0
        },
        signUserList6: {
          text: "已签约",
          number: 0
        },
        signUserList37: {
          text: "已拒绝",
          number: 0
        }},
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      // activeId: 1,
      searchkey: "",
      loading: false,
      finished: false,
      loadText: "加载中…",
      pageNum: 1,
      loadNumUp: 20,
      upGoodsInfo: [],
      value1: "", //行业value
      region_name: "",
      region_nametitle: "",
      option: [
        {
          text: "地区",
          value: 0,
          remark: ""
        }
      ]
    };
  },
  created() {
    this.usertype = this.$store.state.currentUsertype;
    // console.log();
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
    // this.loading = true
    // this.onLoad();
  },
  methods: {
    router(name, obj) {
      if (obj.arr && obj.arr.length > 0) {
        this.$routerto(name, obj);
      }
    },
    routerto(item) {

      this.$store.state.currentUsertype;
      if (this.$store.state.currentUsertype == 1) {
        // console.log(item.signUserResp);
        let hash = [];
        for (var i = 0; i < item.signUserResp.length; i++) {
          if (hash.indexOf(item.signUserResp[i].signStatus) == -1) {
            hash.push(item.signUserResp[i].signStatus);
          }
        }
        console.log(hash);
        if (item.signUserResp.length > 1) {
          this.$routerto(
            "mysign",
             {
              projectId: item.projectId,
              array:JSON.stringify(hash),
            }
          );
        } else if (item.signUserResp.length <= 1) {
          this.$routerto("p_goods_details", {
            projectId: item.projectId,
            signStatus: item.signUserResp[0].signStatus,
            signId: item.signUserResp[0].signId
          });
        }
      } else if (this.$store.state.currentUsertype == 3) {
        this.$routerto("a_project_intro", { projectId: projectId });
      } else if (this.$store.state.currentUsertype == 4)
      {
        if(item.isSign==1){
          this.$routerto("a_project_intro", {
            projectId: item.projectId,
            signStatus: item.signUserResp[0].signStatus,
            signId: item.signUserResp[0].signId
          });
        }else if(item.isSign==0){
          this.$routerto("a_project_intro", {
            projectId: item.projectId,
            signStatus: 0,
          });
        }

      }
    },
    region(value, region) {
      this.region_name = region.remark;
      this.region_nametitle = region.text;
      // console.log(value, region, this.region_name);
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
    },
    onSearch() {
      // console.log(this.searchkey);
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
    },
    onClickNav(index) {
      this.mainActiveIndex = index;
    },
    onClickItem(data) {
      // console.log(data);
      if (this.activeIds == data.id) {
        this.activeIds = 0;
      } else {
        this.activeIds = data.id;
      }
      this.pageNum = 1;
      this.upGoodsInfo = [];
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结
      this.onLoad();
    },
    onLoad() {
      // this.loading = true;
      if (this.activeIds == 0) {
        this.activeIds = "";
      }
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/project/getAllProject?`,
        params: {
          searchKey: this.searchkey,
          pageIndex: this.pageNum,
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
            if (re.length > 0) {
              this.upGoodsInfo = this.upGoodsInfo.concat(re);
              this.loading = false;
              this.finished = true;
            }
            if (
              this.upGoodsInfo.length >= res.data.data.pageTotal ||
              this.upGoodsInfo.length == 0
            ) {
               this.loading = false;
              // document.querySelector(
              //   "#mhome .van-loading__circular"
              // ).style.display = "none";
              this.finished = true;
            }

            this.pageNum++;
          } else {
            this.loading = false;
            this.finished = true;
          }
          // console.log(this.loading);
          // let arr=[];
          // for(let i=0;i<this.upGoodsInfo.length;i++){

          // }
        })
        .catch(err => {
          // this.loadText = "加载失败";
          // document.querySelector(
          //   "#mhome .van-loading__circular"
          // ).style.display = "none";
          // let a = (document.querySelector("#mhome .van-loading__text").style =
          //   "margin-left:0");
          // console.log(a);
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
      // padding: 0.3rem 0.4rem 0 0.4rem;
     /*background: #2E3063 !important;*/
    }
    .van-hairline--top-bottom::after {
      border: 0;
    }
    .van-search__content--round{
      border:1px solid #ccc;
    }
    .van-search__action {
      // font-size: 4rem;
      div {
        display: flex;
        align-items: center;
        .van-icon-search {
          background: #ffc303;
          border-radius: 50%;
          width: 0.8rem;
          height: 0.8rem;
          font-weight: 600;
          color: #282407;
          text-align: center;
          line-height: 0.8rem;
          font-size: 0.44rem;
        }
      }
    }

    .van-popup {
      max-height: 62%;
    }
    .van-cell {
      font-size: 0.32rem;
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
      font-weight: 400;
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
      height: 1rem;
      line-height: 1rem;
      font-size: 0.38rem;
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
      border-bottom: 1px solid #ccc;
      // line-height: 1.06rem;
      .van-dropdown-menu__title {
        font-size: 0.38rem;
      }
      .van-dropdown-item--down {
        .van-tree-select {
          font-size: 0.38rem;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
#mhome {
  display: flex;
  height: 100vh;
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
  #main {
    background: #eeeeee;
    height: 100%;
  }
  .main {
    margin: 4.7rem 0 1.3rem 0;
    // margin-bottom: 5rem;
    // height: 100%;
    background: #eeeeee;
    box-sizing: border-box;
    .goodlists {
      margin: 0.2rem 0.1rem;
      background: white;
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
      article {
        padding: 0.27rem 0.46rem 0.27rem 0.46rem;
        border-bottom: 1px solid #ccc;
        nav {
          // width: 6.3rem;
          font-size: 0.5rem;
          color: #0f6ebe;
          font-weight: 600;
          line-height: 0.7rem;
          margin-bottom: 0.7rem;
          box-sizing: border-box;
        }
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          font-size: 0.34rem;
          flex-wrap: wrap;

          div {
            display: flex;
            width: 2.7rem;
            color: #fdfffe;
            text-indent: 0.6rem;
            line-height: 0.6rem;
            margin-right: 0.44rem;
            margin-bottom: 0.12rem;
            background: url(../../assets/c5652240e4485f406fbaf8cb89b0afb.png)
              no-repeat;
            background-size: cover;
            span:nth-of-type(1){

            }
            span:nth-of-type(2){
              text-indent:0.1rem;
            }
          }
          /*foot*/

        }
        section {
          font-size: 0.38rem;
          margin-bottom: 0.1rem;
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
        div.tag{
          min-height: 0rem;
          max-height: 1.2rem;
        }
      }
      footer {
        height: 1.2rem;
        position: relative;
        display: flex;
        align-items: center;
        button {
          width: 45%;
          text-align: center;
          position: absolute;
          right: 0.25rem;
          border-radius: 0.125rem;
          height: 0.88rem;
          background: #00adef;
          color: white;
          font-size: 0.38rem;
          // top: 50%;
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


