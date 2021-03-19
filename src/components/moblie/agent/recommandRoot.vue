<template>
  <keep-alive include="recommand_i">
    <router-view
      v-on:childByValue="restore"
      :recommendList="List"
    ></router-view>
  </keep-alive>

  <!-- <div id="recommandRoot">123</div> -->
</template>
<script>
export default {
  name: "recommandRoot",
  // provide() {
  //   return { recommendList: this.List, restore: this.restore };
  // },
  data() {
    return {
      List: [
        // {
        //   recommendType: { label: "Middleman genus", value: 1 },
        //   recommendEmail: {
        //     label: "Middleman email",
        //     value: "373257720@qq.com",
        //   },
        //   recommendName: { label: "Middleman name", value: "Tony" },
        //   recommendArea: {
        //     label: "Region",
        //     value: "HK",
        //     countryZhname: "香港",
        //     countryEnname: "Hong Kong",
        //   },
        // },
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
    restore(childValue) {
      // childValue就是子组件传过来的值
      this.List = [];
    },
    Passquery() {
      console.log(this.query);
      //   let obj = this.$route.query;
      //   return obj;
    },
    restore() {
      this.List = [];
      // this.List = [
      //   {
      //     recommendType: { label: "Middleman genus", value: 1 },
      //     recommendEmail: {
      //       label: "Middleman email",
      //       value: "373257720@qq.com",
      //     },
      //     recommendName: { label: "Middleman name", value: "Tony" },
      //     recommendArea: {
      //       label: "Region",
      //       value: "HK",
      //       countryZhname: "香港",
      //       countryEnname: "Hong Kong",
      //     },
      //   },
      // ];
    },
  },
};
</script>
