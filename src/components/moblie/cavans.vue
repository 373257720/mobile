<template>
  <div class="container">
    <div id="canvasBox" :style="getHorizontalStyle" v-show="!showBox">
      <div class="greet">
        <nav class="visaDetailTop">
          <van-icon name="arrow-left" @click="$global.previous()" />电子签名
        </nav>
        <!-- <input type="button" value="清屏"  /> -->
        <!-- <input type="button" value="生成png图片" @touchstart="savePNG" @mousedown="savePNG" /> -->
      </div>
      <canvas></canvas>
      <div class="btnBox">
        <button @touchstart="clear" @mousedown="clear">重写</button>
        <button @mousedown="clear">提交签名</button>
      </div>
    </div>
    <!-- <div class="image-box" v-show="showBox">
      <header>
        请长按图片并保存至本地后发送好友
        <input type="button" value="返回" @click="showBox = false" />
      </header>
      <img :src="signImage" />
    </div>-->
  </div>
</template>

<script>
import Draw from "./draw";
export default {
  name: "canvans",
  data() {
    return {
      msg: "请在下方空白处签名",
      degree: 90,
      signImage: null,
      showBox: false
    };
  },
  components: {
    Draw
  },
  beforeCreate() {
    document.title = "手写签名";
  },
  created() {
    this.$nextTick(() => {
      // console.log(222);
      window.addEventListener("resize", this.renderResize, false);
    });
  },
  mounted() {
    this.canvasBox = document.getElementById("canvasBox");
    this.initCanvas();
    this.renderResize();
  },
  computed: {
    getHorizontalStyle() {
      const d = document;
      const w =
        window.innerWidth ||
        d.documentElement.clientWidth ||
        d.body.clientWidth;
      const h =
        window.innerHeight ||
        d.documentElement.clientHeight ||
        d.body.clientHeight;
      let length = (h - w) / 2;
      let width = w;
      let height = h;

      switch (this.degree) {
        case -90:
          length = -length;
        case 90:
          width = h;
          height = w;
          break;
        default:
          length = 0;
      }

      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector("canvas"));
        this.canvasBox.insertBefore(
          document.createElement("canvas"),
          document.querySelector(".btnBox")
        );

        // this.canvasBox.appendChild(document.createElement("canvas"));
        setTimeout(() => {
          this.initCanvas();
        }, 200);
      }
      console.log(this.degree, length);
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: "center center"
      };
    }
  },
  methods: {
    renderResize() {
      // 判断横竖屏
      var html = document.querySelector("html");
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      if (width > height) {
        this.degree = 0;
        html.style.fontSize = width / 16 + "px";
        // console.log(this.degree);
      } else if (width < height) {
        this.degree = 90;
        html.style.fontSize = height / 16 + "px";
      }
      // 做页面适配
      // 注意：renderResize方法执行时虚拟dom尚未渲染挂载，如果要操作vue实例，最好在this.$nextTick()里进行。
    },
    initCanvas() {
      const canvas = document.querySelector("canvas");
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
    },
    download() {
      this.draw.downloadPNGImage(this.draw.getPNGImage());
    },
    savePNG() {
      this.signImage = this.draw.getPNGImage();
      this.showBox = true;
    },
    upload() {
      const image = this.draw.getPNGImage();
      const blob = this.draw.dataURLtoBlob(image);
      const url = "";
      const successCallback = response => {
        console.log(response);
      };
      const failureCallback = error => {
        console.log(error);
      };
      this.draw.upload(blob, url, successCallback, failureCallback);
    }
  }
};
</script>

<style>
nav.visaDetailTop .van-icon-arrow-left {
  line-height: 1rem;
  position: absolute;
  left: 0.6rem;
}
nav.visaDetailTop {
  /* width: 100%; */
  border-bottom: 0.02rem dashed #b3b3b3;
  text-align: center;
  line-height: 1rem;
  padding: 0.2rem;
  font-size: 0.46rem;
}
.container {
  width: 100%;
  height: 100%;
}
#canvasBox {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.greet {
  font-size: 0.2rem;
  user-select: none;
}
input {
  font-size: 0.2rem;
}
.greet select {
  font-size: 0.18rem;
}
canvas {
  flex: 1;
  /* margin:1rem; */
  /* padding: 5rem; */
  /* box-sizing: border-box; */
  cursor: crosshair;
  border: 0.02rem solid lightgray;
}
.image-box {
  width: 100%;
  height: 100%;
}
.image-box header {
  font-size: 0.18rem;
}
.image-box img {
  max-width: 80%;
  max-height: 80%;
  margin-top: 0.5rem;
  border: 0.01rem solid gray;
}
.btnBox {
  line-height: 1rem;
  font-size: 0.46rem;
  /* height: 2rem; */
  text-align: center;
  /* margin: 0.5rem 0; */
}
.btnBox > button {
  /* border: 1px solid #00adef; */
  background: #00adef;
  border-radius: 4px;
  color: #fff;
  padding: 0 10px;
  width: 3rem;
  /* height: 1rem;   */
}
</style>