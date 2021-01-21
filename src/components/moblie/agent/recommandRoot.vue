<template>
  <router-view></router-view>
  <!-- <div id="recommandRoot">123</div> -->
</template>
<script>
export default {
  name: "recommandRoot",
  provide() {
    return { recommendList: this.List };
  },
  data() {
    return {
      List: [
        {
          recommendType: { label: "Middleman genus", value: 1 },
          recommendEmail: {
            label: "Middleman email",
            value: "373257720@qq.com",
          },
          recommendName: { label: "Middleman name", value: "Tony" },
          recommendArea: {
            label: "Region",
            value: "HK",
            countryZhname: "香港",
            countryEnname: "Hong Kong",
          },
        },
      ],
    };
  },
  created() {
    //   let self = this;
    //   console.log(this.$route.query);
    // console.log(this.$route.query);
    // this.query = this.$route.query;
    // console.log(this.query);
  },
  methods: {
    Passquery() {
      console.log(this.query);
      //   let obj = this.$route.query;
      //   return obj;
    },
  },
};
</script>
