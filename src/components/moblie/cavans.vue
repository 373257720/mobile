<template>
  <div id="signatureBox">
    <nav class="visaDetailTop">
      <van-icon name="arrow-left" @click="$global.previous()" />电子签名
    </nav>
    <div class="canvasBox" ref="canvasHW">
      <canvas
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        ref="canvasF"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      ></canvas>
    </div>
    <div class="btnBox">
      <button @click="overwrite">重写</button>
      <button @click="handelSaveE">提交签名</button>
    </div>
  </div>
</template>
<script>
//js
import axios from "axios";
export default {
  name: "signature",
  data() {
    return {
      points: [],
      canvasTxt: null,
      stage_info: [],
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false
    };
  },
  created() {},
  //   beforeMount() {
  //     window.addEventListener("orientationchange", () => {
  //       this.$router.push({ path: "/cavans" });
  //     });
  //   },
  mounted() {
    var signatureBox = document.querySelector("#signatureBox");
    var btnBox = document.querySelector(".btnBox");
    var canvasBox = document.querySelector(".canvasBox");
    var visaDetailTop = document.querySelector(".visaDetailTop");
    var aaa = window.getComputedStyle(signatureBox).getPropertyValue("height");
    document.querySelector(".visaDetailTop").style.width = aaa;
    window.getComputedStyle(visaDetailTop).getPropertyValue("height");

    btnBox.style.width = aaa;
    btnBox.style.left = window
      .getComputedStyle(visaDetailTop)
      .getPropertyValue("height");
    canvasBox.style.width =
      window.getComputedStyle(signatureBox).getPropertyValue("width") -
      window.getComputedStyle(visaDetailTop).getPropertyValue("height");
    canvasBox.style.marginRight = window
      .getComputedStyle(visaDetailTop)
      .getPropertyValue("height");
    canvasBox.style.marginLeft = window
      .getComputedStyle(visaDetailTop)
      .getPropertyValue("height");
    //  .style.height = aaa+;
    let canvas = this.$refs.canvasF;
    var clientWidth = document.documentElement.clientWidth;
    //根据设计图中的canvas画布的占比进行设置
    // console.log(canvas.offsetLeft);
    // var canvasWidth = Math.floor((clientWidth * 300) / 720);
    // var canvasWidth = Math.floor(clientWidth - 2 * canvas.offsetLeft);
    // canvas.height = canvasWidth+100;
    // canvas.width = canvasWidth-100;
    // this.canvasTxt = canvas.getContext("2d");
    // console.log(aaa);
    window
      .getComputedStyle(signatureBox)
      .getPropertyValue("height")
      .slice(0, -2);
    // var canvasWidth = Math.floor(clientWidth - 2 * canvas.offsetLeft);
    canvas.height =
      window
        .getComputedStyle(signatureBox)
        .getPropertyValue("height")
        .slice(0, -2) - 50;
    canvas.width =
      window
        .getComputedStyle(canvasBox)
        .getPropertyValue("width")
        .slice(0, -2) - 50;
    this.canvasTxt = canvas.getContext("2d");
    // this.canvasTxt.font = 'normal 800 40px sans-serif';
    // console.log(this.canvasTxt.font)
    // this.canvasTxt.font = '600 bold 80px sans-serif';
    // this.canvasTxt.fillText("", 10, 50);
    this.stage_info = canvas.getBoundingClientRect();
  },
  components: {
    // NavPublic
  },
  methods: {
    handelSaveE() {
      console.log(this.$refs.canvasF);
      let imgBase64 = this.$refs.canvasF.toDataURL();
      console.log(imgBase64);
      //   this.imgsrc = imgBase64;
    },
    backHome() {
      window.history.back();
    },
    //电脑设备事件
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();
      // console.log(ev);
      if (ev) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        // console.log(obj);
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.isDown = true;
      }
    }, //移动设备事件
    touchStart(ev) {
      ev = ev || event;
      // console.log(this.stage_info);
      // console.log(ev.targetTouches[0]);

      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    }, //移动设备事件
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    }, //电脑设备事件
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    }, //移动设备事件
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      // console.log(ev);
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
      }
    }, //重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
    }
  }
};
</script>
<style style='lcss' scoped>
/* portrait */
/* @media screen and (orientation:portrait) { */
/* 竖屏情况下 */
/* portrait-specific styles */

/* } */

/* landscape */
/* 横屏情况下 */
/* @media screen and (orientation:landscape) {
} */
/*
 * 强制横屏显示：通过竖屏时旋转解决横屏问题
 * 
 */
  #signatureBox {
  position: relative;
  width: 100%;
  height: 100%;
}
nav.visaDetailTop .van-icon-arrow-left {
  line-height: 1.5rem;
  position: absolute;
  left: 0.6rem;
}
nav.visaDetailTop {
  /* width: 100%; */
  border-bottom: 0.02rem dashed #b3b3b3;
  text-align: center;
  line-height: 1.5rem;
  position: absolute;
  /* --abc:height */
  font-size: 0.46rem;
  transform-origin: 0% 0%;
  transform: rotate(90deg);
  top: 0;
  left: 100vw;
}

.visaDetailTop p {
  margin: 0px;
  text-align: center;
  color: #000;
  font-size: 1em;
  position: relative;
}
p.visaTitle {
  width: 100%;
  position: absolute;
  top: 5px;
  left: 0px;
  text-align: center;
  font-size: 1.2em;
}
.btnBack {
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: transparent;
  border-color: transparent;
  outline: none;
}
.btnDaoHang {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  height: 2.2em;
  width: 2em;
  z-index: 1;
  background: transparent;
  border-color: transparent;
  outline: none;
}
.visaDetailTop p span {
  color: #fff;
  font-size: 1.2em;
}
.visaDetailTop p:first-of-type {
  float: left;
}
.visaDetailTop p:nth-of-type(2) {
  float: right;
}
.canvasBox {
  box-sizing: border-box;
  height: 100%;
  /* background: #58bc58; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 0 auto; */
}
canvas {
  border: 1px solid #8e8e8e;
}
.btnBox {
  line-height: 1rem;
  position: absolute;
  font-size: 0.46rem;
  transform-origin: 0% 0%;
  transform: rotate(90deg);
  /* background: red; */
  top: 0;
  left: 0;
  text-align: center;
  /* top: 80%; */
  /* left:20vw;  */
}
.btnBox button:first-of-type {
  /* border: 1px solid #00adef; */
  background: #00adef;
  border-radius: 4px;
  color: #fff;
  padding: 0 10px;
  width: 3rem;
  /* height: 1rem;   */
}
.btnBox button:last-of-type {
  /* border: 1px solid #00adef; */
  background: #00adef;
  color: #fff;
  border-radius: 4px;
  padding: 0 10px;
  width: 3rem;
}
@media screen and (orientation: portrait) {
  /* 竖屏 */

/* @media only screen and (min-width: 750px) {
  .signatureBox {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    overflow: visible;
  }
} */
}
@media screen and (orientation: landscape) {
  /* 横屏 */
}

</style>