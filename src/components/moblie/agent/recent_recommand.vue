<template>
  <div id="recent_recommand">
    <commonnav>
      {{ $t("project.RecommendMore") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <div @click="routerto(1)">
        <span>{{ $t("agent.RM") }}</span>
      </div>
      <div @click="routerto(2)">
        <span>{{ $t("agent.RecommendInvestors") }}</span>
      </div>
    </main>
  </div>
</template>

<script>
let timeout;
export default {
  name: "recent_recommand",
  props: {
    recommendList: Array,
  },
  // inject: ["recommendList"],
  data() {
    return {
      num: 1,
      interestedInduslistid: [],
      industrylist: [],
      countrylist_fetching: false,
      investors_type: [
        {
          text: this.$t("common.individual"),
          value: 1,
        },
        {
          text: this.$t("common.company"),
          value: 2,
        },
      ],
      dad_text: this.$t("agent.RecommendInvestors"),
      title: "",
      investorsArea: undefined,
      // Routequery: {
      //   towho: null,
      //   signId: "",
      //   signStatus4: "",
      // },
    };
  },

  created() {
    console.log(this.recommendList);
    // this.Routequery = Object.assign(this.Routequery, this.$route.query);
  },
  computed: {},
  methods: {
    routerto(num) {
      let Routequery = Object.assign({ towho: num }, this.$route.query);
      this.$routerto("a_recommand_i", Routequery);
    },
  },
};
</script>

<style lang="scss">
#recent_recommand {
  main {
    // padding: 0.5rem;
    padding: vw(322) vw(100) vw(160);
    // width: 100%;
    display: flex;
    flex-direction: column;
    div {
      width: vw(552);
      height: vw(108);
      background: #4f3dad;
      border-radius: vw(16);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      color: #ffffff;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
        margin-bottom: vw(114);
      }
    }
  }
}
</style>
