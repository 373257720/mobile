<template>
  <!-- <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  
  </div>-->
  <router-view></router-view>
</template>
<script>
export default {
  name: "projectRoot",
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
