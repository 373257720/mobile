<template>
  <div>
    <keep-alive>
      <!-- //当前进入的路由 meta里面 keepAlive为true时走这里 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "projectRoot",
  data() {
    return {
      // selectedItem: {}
    };
  },
  created() {},
  // components: {
  //   loadmore
  // },
  methods: {}
};
</script>
