<template>
  <div class="signatureBox">
    <nav class="visaDetailTop">
      <van-icon name="arrow-left"  @click="$global.previous()" />电子签名
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
      <div class="btnBox">
        <button @click="overwrite">重写</button>
        <button @click="handelSaveE">提交签名</button>
      </div>
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
    let canvas = this.$refs.canvasF;
    var clientWidth = document.documentElement.clientWidth;
    //根据设计图中的canvas画布的占比进行设置
    // console.log(canvas.offsetLeft);

    // var canvasWidth = Math.floor((clientWidth * 300) / 720);
    var canvasWidth = Math.floor(clientWidth - 2 * canvas.offsetLeft);
    canvas.height = canvasWidth + 150;
    canvas.width = canvasWidth - 2;

    this.canvasTxt = canvas.getContext("2d");
    // this.canvasTxt.font = 'normal 800 40px sans-serif'; 
    // console.log(this.canvasTxt.font);
    
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
<style scoped>
/* portrait */
/* @media screen and (orientation:portrait) { */
/* 竖屏情况下 */
/* portrait-specific styles */

/* } */

/* landscape */
/* 横屏情况下 */
/* @media screen and (orientation:landscape) {
} */
nav.visaDetailTop {
  position: relative;
  width: 100%;
  border-bottom: 0.01rem dashed #b3b3b3;
  text-align: center;
  line-height: 1.5rem;
  height: 1.5rem;
  font-size: 0.46rem;
  position: fixed;
  top: 0;
  background: white;
}
nav.visaDetailTop .van-icon-arrow-left {
  line-height: 1.5rem;
  position: absolute;
  left: 0.6rem;
  /* top: 50%; */
  /* transform: (translate(0, -50%)); */
}

/* landscape-specific styles */
.signatureBox {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
.visaDetailTop {
  /*position: absolute;*/ /*top: 0px;*/ /*left: 0px;*/
  width: 100%;
  /*overflow: hidden;*/
  /* padding: 5px; */
  box-sizing: border-box;
  z-index: 2;
  /* border-bottom: 1px solid #e5e5e5; */
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
  padding: 2rem 0.5rem;
  box-sizing: border-box;
  flex: 1;
}
canvas {
  border: 1px solid #8e8e8e;
}
.btnBox {
  height: 30px;
  padding: 5px;
  text-align: right;
  line-height: 30px;
}
.btnBox button:first-of-type {
  /* border: 1px solid #00adef; */
  background: #00adef;
  border-radius: 4px;
  color: #fff;
  padding: 0 10px;
}
.btnBox button:last-of-type {
  /* border: 1px solid #00adef; */
  background: #00adef;
  color: #fff;
  border-radius: 4px;
  padding: 0 10px;
}
@media only screen and (min-width: 750px) {
  .signatureBox {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    overflow: visible;
  }
}
</style>