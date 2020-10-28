<template>
  <div id="layer" v-if="loaded">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
      style="enable-background:new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        fill="#0ce5b2"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
        transform="rotate(275.098 25 25)"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    loaded: Boolean,
    showCancel: Boolean,
    title: String,
    msg: String
  },
  data() {
    return {
      ishow: this.remindervisible
    };
  },
  computed: {},
  watch: {
    remindervisible: function(neww, old) {
      this.ishow = neww;
      console.log(neww);
    }
  },
  methods: {
    comfirm() {
      this.$emit("comfirmFromDialog", false);
    },
    closeSimple() {
      // console.log(1)
      this.$emit("update:remindervisible", false);

      // if (this.issuccess) {
      //   console.log(this.issuccess);

      //   this.$router.replace({
      //     path: "/login" //跳转的路径
      //   });
      // }
    }
  }
};
</script>

<style lang='scss'>
#layer {
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0.5;
  position: absolute;
  top: 0;
  z-index: 201;
  display: flex;
  justify-content: center;
  align-items: center;
  svg:not(:root) {
    width: vw(100);
    height: vw(100);
  }
}
</style>
