<template>
  <div class="genus">
    <commonnav>
    {{$t('common.Genus')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="pickgenus" />
      </template>
    </commonnav>
    <main>
      <ul class="timestamp">
        <li id="itemGenus" @click="pickgenus(item)" v-for="item in optionType  " :key="item.value">
          <div class="item item-1">{{ item.text}}</div>
        </li>
      </ul>
    </main>
    <!-- <layer :loaded.sync="loaded"></layer> -->
  </div>
</template>  
<script >
// import Scroll from "../loadmore";
// import layer from "./layer";
export default {
  name: "genus",
  props: ["usercheck"],
  data() {
    return {
      optionType: [
        { text: this.$t("common.ProjectParty"), value: 1 },
        { text: this.$t("common.Middleman"), value: 4 },
        { text: this.$t("common.Investor"), value: 3 }
      ]
    };
  },
  components: {},
  created() {},
  methods: {
    pickgenus(item) {
      if (item) this.usercheck.genus = item;
      this.$emit("fromKids", "genus");
      // this.$global.previous();
      // this.$emit("pickNation",item)
    }
  }
};
</script>
<style lang='scss' scoped>
.genus {
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
