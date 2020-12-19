<template>
  <!-- <keep-alive include="a_project_intro,a_recommand_i"> -->
  <router-view :selectedItem.sync="selectedItem"></router-view>
  <!-- </keep-alive> -->
</template>
<script>
export default {
  name: "projectSubStatus",
  data() {
    return {
      selectedItem: {}
    };
  },
  created() {},
  // components: {
  //   loadmore
  // },
  methods: {}
};
</script>
