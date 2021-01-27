<template>
  <div id="mutil-Pick">
    <commonnav>
      {{ titleName }}
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
        <van-icon name="search" @click="(e) => searchFun(e, null)" />
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
          v-if="GoToname === 'Industry'"
          checked-color="#00F0AB"
          v-model="result.industryList"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in IndustryList"
              clickable
              :key="item.value"
              :title="item.label"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item.value" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-checkbox-group
          v-if="GoToname === 'Region'"
          checked-color="#00F0AB"
          v-model="result.regionList"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in RegionList"
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
          v-if="GoToname === 'Tag'"
          checked-color="#00F0AB"
          v-model="result.taglist"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in TagtList"
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
      <button @click="pickgenus">{{ $t("Account.Comfirm") }}</button>
    </footer>
  </div>
</template>
<script>
import Scroll from "../loadmore";
export default {
  name: "mutil-Pick",
  props: ["GoToname", "result", "List", "afterEnter"],
  components: {
    "v-scroll": Scroll,
  },
  data() {
    return {
      loaded: false,
      refreshing: false,
      IndustryList: [],
      RegionList: [],
      TagtList: [],
      searchkey: "",
      watch: true,
    };
  },
  created() {},
  activated() {},
  computed: {
    titleName() {
      switch (this.GoToname) {
        case "Industry":
          return this.$t("common.Industry");
          break;
        case "Region":
          return this.$t("common.region");
          break;
        case "Tag":
          return this.$t("common.Tag");
          break;
        default:
        // 默认代码块;
      }
    },
  },
  watch: {
    GoToname(neww) {
      if (neww) {
        this.watch = true;
      }
    },
    afterEnter(neww, oldd) {
      if (neww && this.watch) {
        this.watch = false;
        this.initial();
      }
    },
  },
  methods: {
    searchFun(e, done) {
      switch (this.GoToname) {
        case "Industry":
          if (this.IndustryList.length === 0) {
            this.loaded = false;
          }
          this.searchIndustryList(done);
          break;
        case "Region":
          if (this.RegionList.length === 0) {
            this.loaded = false;
          }
          this.searchtCountryList(done);
          break;
        case "Tag":
          if (this.TagtList.length === 0) {
            this.loaded = false;
          }
          this.searchAllProjectTags(done);
          break;
        default:
        // 默认代码块;
      }
    },
    initial(done) {
      this.searchkey = "";
      switch (this.GoToname) {
        case "Industry":
          if (this.List.industryList.length === 0) {
            this.loaded = false;
          }
          this.getIndustryList(done);
          break;
        case "Region":
          if (this.List.regionList.length === 0) {
            this.loaded = false;
          }
          // setTimeout(()=>{
          this.getCountryList(done);
          // },400)
          // this.getCountryList(done);
          break;
        case "Tag":
          if (this.List.taglist.length === 0) {
            this.loaded = false;
          }
          this.getAllProjectTags(done);
          break;
        default:
        // 默认代码块;
      }
    },
    onRefresh(done) {
      this.loaded = false;
      this.searchFun(null, done);
    },
    searchtCountryList(done) {
      let self = this;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: this.searchkey,
          }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            if (res.data.data.length) {
              self.RegionList = res.data.data.map((item, idx) => {
                return {
                  label: item["country" + self.$global.countryLan() + "name"],
                  labelCh: item.countryZhname,
                  labelEn: item.countryEnname,
                  value: item.countryCode,
                  key: "region",
                };
              });
            }
          }
          this.loaded = true;
          if (done) done();
        });
    },
    getCountryList(done) {
      let self = this;
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            this.List.regionList = [];
            this.RegionList = [];
            res.data.data.forEach((item) => {
              let one = {
                label: item["country" + self.$global.countryLan() + "name"],
                value: item.countryCode,
                labelCh: item.countryZhname,
                labelEn: item.countryEnname,
                key: "region",
              };
              self.List.regionList.push(one);
              self.RegionList.push(one);
            });
          }
          this.loaded = true;
          if (done) done();
        });
    },
    searchIndustryList(done) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/getAllIndustry`,
          {
            searchKey: this.searchkey,
          }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            this.IndustryList = res.data.data.map((item) => {
              return {
                label: item["industryName" + this.$global.language()],
                value: item["industryName" + this.$global.language()],
                labelCh: item.industryNameCh,
                labelEn: item.industryNameEn,
                key: "industry",
              };
            });
          }
          this.loaded = true;
          if (done) done();
        });
    },
    getIndustryList(done) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/getAllIndustry`
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            this.List.industryList = [];
            this.IndustryList = [];
            res.data.data.forEach((item) => {
              let one = {
                label: item["industryName" + this.$global.language()],
                value: item["industryName" + this.$global.language()],
                labelCh: item.industryNameCh,
                labelEn: item.industryNameEn,
                key: "industry",
              };
              this.List.industryList.push(one);
              this.IndustryList.push(one);
            });
          }

          this.loaded = true;
          if (done) done();
          // console.log(this.Industrylist);
        });
    },
    searchAllProjectTags() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/getAllProjectTags`
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            this.TagtList = res.data.data.projectTagsList.map((item) => {
              return {
                label: item["tagsName" + this.$global.lan()],
                value: item["tagsName" + this.$global.lan()],
                labelCh: item.tagsName,
                labelEn: item.tagsNameEn,
                key: "tag",
              };
            });
          }
          this.loaded = true;
          if (done) done();
        });
    },
    getAllProjectTags(done) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/index/getAllProjectTags`
        )
        .then((res) => {
          // console.log(this.Industrylist)
          if (res.data.resultCode === 10000) {
            this.List.taglist = [];
            this.TagtList = [];
            res.data.data.projectTagsList.forEach((item) => {
              let one = {
                label: item["tagsName" + this.$global.lan()],
                value: item["tagsName" + this.$global.lan()],
                labelCh: item.tagsName,
                labelEn: item.tagsNameEn,
                key: "tag",
              };
              this.List.taglist.push(one);
              this.TagtList.push(one);
            });
          }
          this.loaded = true;
          if (done) done();
        });
    },
    // 上拉加载接口
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    onInfinitePort(done) {
      // this.initial();
      console.log(done);
    },
    pickgenus() {
      console.log(this.result);
      this.$emit("fromKids", this.result);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
  },
};
</script>
<style lang="scss">
#mutil-Pick {
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
#mutil-Pick {
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

