<template>
  <div class="Nationality">
    <commonnav>
      {{$t('common.Identity')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="pickgenus" />
      </template>
    </commonnav>
    <main>
      <ul class="timestamp">
        <li id="itemGenus" @click="pickgenus(item)" v-for="item in optionId  " :key="item.value">
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
  name: "identity",
  props: ["usercheck"],
  data() {
    return {
      optionId: []
    };
  },
  components: {},
  created() {
    console.log(this.usercheck);
    if (this.usercheck.genus &&  this.usercheck.genus.value === 1) {
      this.optionId = [{ text: this.$t("common.company"), value: 2 }];
    } else {
      this.optionId = [
        { text: this.$t("common.individual"), value: 1 },
        { text: this.$t("common.company"), value: 2 }
      ];
    }
  },
  methods: {
    pickgenus(item) {
      // console.log(item);
      // this.$store.commit("pickIdentity", item);
      if (item) this.usercheck.identity = item;
      this.$emit("fromKids", 'identity');
      // this.$emit("pickNation",item)
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
