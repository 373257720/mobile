<template>
  <div id="mhome">
    <commonnav>
      {{GoToname}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="pickgenus" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <van-search
      v-model="searchkey"
      :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
      shape="round"
      left-icon
    >
      <div slot="right-icon">
        <van-icon name="search" />
      </div>
    </van-search>
    <main>
      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
      >
        <van-checkbox-group
          v-if="GoToname==='Industry'"
          checked-color="#00F0AB"
          v-model="result.industryList"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in List.industryList"
              clickable
              :key="item.value"
              :title="`${item.label}`"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item.value" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-checkbox-group
          v-if="GoToname==='Region'"
          checked-color="#00F0AB"
          v-model="result.regionList"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in List.regionList"
              clickable
              :key="item.value"
              :title="`${item.label}`"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item.value" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-checkbox-group
          v-if="GoToname==='Tag'"
          checked-color="#00F0AB"
          v-model="result.taglist"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in List.taglist"
              clickable
              :key="item.value"
              :title="`${item.label}`"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item.value" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </v-scroll>
    </main>
    <footer>
      <button @click="pickgenus">Interested</button>
    </footer>
  </div>
</template>
<script>
import Scroll from "../loadmore";
export default {
  name: "mhome",
  props: ["GoToname", "result", "List"],
  components: {
    "v-scroll": Scroll
  },
  data() {
    return {
      // list: [],
      loaded: false,
      refreshing: false,
      IndustryResult: [],
      // RegionResult: [],
      // TagResult: [],
      searchkey: ""
    };
  },
  created() {},
  activated() {

    this.initial();
  },
  methods: {
    initial(done) {
      switch (this.GoToname) {
        case "Industry":
          if (this.List.industryList.length === 0) {
            this.loaded = false;
          }
          setTimeout(() => {
            this.List.industryList = [
              {
                label: "a",
                value: 1,
                key: "industry"
              },
              {
                label: "b",
                value: 2,
                key: "industry"
              },
              {
                label: "c",
                value: 3,
                key: "industry"
              },
              {
                label: "d",
                value: 4,
                key: "industry"
              },
              {
                label: "c",
                value: 5,
                key: "industry"
              },
              {
                label: "d",
                value: 6,
                key: "industry"
              }
            ];
            this.loaded = true;
            if (done) done();
          }, 2000);
          break;
        case "Region":
          if (this.List.regionList.length === 0) {
            this.loaded = false;
          }
          setTimeout(() => {
            this.List.regionList = [
              {
                label: "e",
                value: 1,
                key: "region"
              },
              {
                label: "f",
                value: 2,
                key: "region"
              },
              {
                label: "g",
                value: 3,
                key: "region"
              },
              {
                label: "h",
                value: 4,
                key: "region"
              }
            ];
            this.loaded = true;
            if (done) done();
          }, 2000);
          break;
        case "Tag":
          if (this.List.taglist.length === 0) {
            this.loaded = false;
          }
          setTimeout(() => {
            this.List.taglist = [
              {
                label: "p",
                value: 1,
                key: "tag"
              },
              {
                label: "o",
                value: 2,
                key: "tag"
              },
              {
                label: "i",
                value: 3,
                key: "tag"
              },
              {
                label: "t",
                value: 4,
                key: "tag"
              }
            ];
            this.loaded = true;
            if (done) done();
          }, 2000);
          break;
        default:
        // 默认代码块;
      }
    },
    onRefresh(done) {
      this.loaded = false;
      this.initial(done);
      //   3. 在刷新方法内部进行自己的逻辑处理 此处调用了后台接口
      // this.onRefreshPort(done);
      // this.$global
      //   .get_encapsulation(
      //     `${this.$axios.defaults.baseURL}/bsl_web/project/getAllProject`,
      //     {
      //       searchKey: this.searchkey,
      //       pageIndex: this.pageNum,
      //       pageSize: this.loadNumUp,
      //       bslAreaCode: this.region_name,
      //       industryId: this.activeIds
      //     }
      //   )
      //   .then(res => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       let re = res.data.data.lists;
      //       if (re.length > 0) {
      //         this.upGoodsInfo = this.upGoodsInfo.concat(re);
      //         this.loading = false;
      //       }
      //       if (
      //         this.upGoodsInfo.length >= res.data.data.pageTotal ||
      //         this.upGoodsInfo.length == 0
      //       ) {
      //         this.finished = true;
      //       }
      //       this.pageNum++;
      //     } else {
      //       this.loading = false;
      //       this.finished = true;
      //     }
      //     // console.log(this.upGoodsInfo);
      //   });
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    /**
     * 上拉加载接口
     */
    onInfinitePort(done) {
      // this.initial();
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: this.searchkey
          }
        )
        .then(res => {
          if (res.data.data instanceof Array) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.countrylist.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                lable:
                  this.$i18n.locale === "zh_CN"
                    ? res.data.data[i].countryZhname
                    : res.data.data[i].countryEnname,
                value: i,
                remark: res.data.data[i].countryCode
              });
            }
            done();
          }
        });
    },
    pickgenus() {
      this.$emit("fromKids", this.result);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss">
#mhome {
  .van-checkbox-group {
    overflow-y: auto;
    .van-checkbox__icon .van-icon {
      width: vw(44);
      height: vw(44);
      line-height: vw(44);
      border-color: #00f0ab;
    }
    .van-cell__title {
      color: #4f3dad;
      font-size: vw(30);
    }
    .van-cell {
      padding: vw(45) vw(60);
      // padding-left: 0;
      // padding-right: 0;
    }
    .van-cell::after {
      border-bottom: none;
    }
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border-width: 0;
    }
  }
}
</style>
<style lang="scss"  scoped>
#mhome {
  .van-search {
    width: vw(598);
    margin: 0 auto;
    padding: 0;
    padding: vw(140) 0 0 0;
    margin-bottom: vw(48);
    .van-search__content {
      border: vw(2) solid #3ab5cc;
      background: #fff;
      .van-icon-search,
      .van-icon-clear {
        color: #3ab5cc;
      }
    }
  }

  main {
    // padding-top: vw(212);
    height: vw(700);
    position: relative;
    width: 100%;
    .yo-scroll {
      top: 0;
    }
  }
  footer {
    margin-top: vw(70);
    font-weight: bold;
    display: flex;
    justify-content: center;
    button {
      width: vw(528);
      height: vw(114);
      background: #00f0ab;
      border-radius: vw(40);
      font-size: vw(40);
      line-height: vw(114);
      color: #ffffff;
    }
  }
}
</style>

