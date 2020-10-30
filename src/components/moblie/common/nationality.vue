<template>
  <div class="Nationality">
    <commonnav>
      {{$t('common.Nationality')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="pickcountry" />
      </template>
    </commonnav>
    <main>
      <header>
        <van-search
          v-model="searchkey"
          :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
          shape="round"
          left-icon
        >
          <div slot="right-icon" @click="getcountrylist">
            <van-icon name="search" />
          </div>
        </van-search>
      </header>
      <v-scroll :on-refresh="onRefresh" :loaded.sync="loaded" :on-infinite="onInfinite">
        <ul class="timestamp">
          <li
            id="itemGenus"
            @click="pickcountry(item)"
            v-for="item in countrylist  "
            :key="item.remark"
          >
            <div class="item item-1">{{ item.lable}}</div>
          </li>
        </ul>
      </v-scroll>
    </main>
    <!-- <layer :loaded.sync="loaded"></layer> -->
  </div>
</template>  
<script >
import Scroll from "../loadmore";
import layer from "./layer";
export default {
  name: "Nationality",
  props: ["usercheck"],
  data() {
    return {
      optionType: [
        { text: this.$t("common.ProjectParty"), value: 1 },
        { text: this.$t("common.Middleman"), value: 4 },
        { text: this.$t("common.Investor"), value: 3 }
      ],
      countrylist: [],
      searchkey: "",
      loaded: false
    };
  },
  components: {
    layer: layer,
    "v-scroll": Scroll
  },
  created() {
    
    this.getcountrylist();
  },
  methods: {
    pickcountry(item) {
      if (item) this.usercheck.nation = item;
      // console.log(item);
      
      this.$emit("fromKids", "nation");
      // this.$emit("pickNation",item)
    },
    onRefresh(done) {
      //   3. 在刷新方法内部进行自己的逻辑处理 此处调用了后台接口
      // console.log(done);
      this.loaded = false;
      this.getcountrylist(done);
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    /**
     * 上拉加载接口
     */
    onInfinitePort(done) {
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
    getcountrylist(done) {
      this.countrylist = [];
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: this.searchkey
          }
        )
        .then(res => {
          if (res.data.data.length > 0) {
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
            this.loaded = true;
            if (done) done();
          }
        });
    }
  }
};
</script>
<style lang='scss' scoped>
.Nationality {
  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #4f3dad;
    padding-top: vw(140);
    font-size: vw(30);
    header {
      padding: 0 vw(76);
      .van-search {
        width: vw(598);
        // height: vw(68);
        box-sizing: border-box;
        // margin: 0 auto;
        padding: 0;
      }
      .van-search__content {
        border: vw(2) solid #3ab5cc;
        background: #fff;
        .van-icon-search,
        .van-icon-clear {
          color: #3ab5cc;
        }
      }
    }
    .timestamp {
      li {
        border-bottom: vw(2) solid #4f3dad;
        padding: vw(40);

        font-weight: bold;
        line-height: vw(34);

        font-size: vw(30);
      }
    }
  }
}
</style>