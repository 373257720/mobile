
<template>
  <div id="goTop">
    <div class="icons" v-show="visiable" @click="handleScrollTop">
      <!-- <i class="icons-top"></i> -->
      <van-icon class="icons-top" name="arrow-up" />
    </div>
  </div>
</template>
 
 
 
<script>
export default {
  name: "goTop",
  data() {
    return {
      scrollTop: 0, //初始化scrollTop
      visiable: false //默认不显示
    };
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        document.querySelector(".loadmore") &&
        document.querySelector(".loadmore").scrollTop;
      if (this.scrollTop > window.screen.height) {
        this.visiable = true;
      } else {
        this.visiable = false;
      }
    },

    handleScrollTop() {
      let timer = null,
        that = this;
      if (timer) {
        return;
      }
      timer = setInterval(function() {
        // console.log("定时循环回到顶部");
        var top = that.scrollTop;
        // console.log(top);
        var speed = Math.ceil(top / 4);
        if (that.scrollTop !== 0) {
          document.querySelector(".loadmore").scrollTop -= speed;
        } else {
          document.querySelector(".loadmore").scrollTop -= speed;
        }
        if (top === 0) {
          clearInterval(timer);
          // console.log(1);
        }
      }, 30);
    }
  },
  mounted() {
    //  this.visiable = true;
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }
};
</script>
 
<style lang="scss"  scoped>
.icons {
  position: fixed;
  right: vw(50);
  bottom: 80px;
  z-index: 999999;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #b4bccc;
}

.icons:hover {
  background-color: #fff;
}

.icons-top {
  color: #000;
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #00f0ab;
  // background-size: 20px;
  font-size: 18px;
  // background-repeat: no-repeat;
  // background-position: center center;
  /* background-color: #00f0ab; */
  // background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABaUlEQVRYR+2W7U3DQBBE31QAJaQDUkJSAXQA6QAqACqADggVBCoAKoAOCBWEDgatZEcHyeX8AYqQvD/P59t3s7tjiz2H9pyfAWBQ4H8rYPtQ0mefSeqlgO0HYCVp1hWiM4DtOXACHADzrhCdAGxfAZdAffM74ELSbVslWgPYPgMi4UxSqMC2taYgrQCSRNeSQoV1VCU5BaaSnn8dwPYYeAIeJYUKG1FBHFcQb00gGimQJH+RFI2XDdtx+6OmEEWAmHXgHfgAJqW5r/YHhCuInT6xE6A6LGSPfcXktSzVe1GCVQmiBBCHjICxpGWTmiYQ0TOhxKukae7dLEBiNHHzRg31M0nVOwGxyBnVVoCuI5WZjGjaRc4tNwBsnwM3qdG0kT4DsWFe9b5vAH0crQSZu9gawHYt1X3OaEpJSs+3lTYFiGZZ/lXyZDri+zGSNIm1FKD3z0VJgdQnakMrOmHTQ7vuGwAGBQYFvgCufKAhUkYyWwAAAABJRU5ErkJggg==");
}
</style>