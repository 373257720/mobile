<template>
  <div class="container signbox">
    <div id="canvasBox" :style="getHorizontalStyle">
      <div class="greet">
        <nav class="visaDetailTop">
          <van-icon name="arrow-left" @click="$global.previous()" />
          {{$t('common.ElectronicSignature')}}
        </nav>
      </div>
      <p>Please draw signature below</p>
      <canvas></canvas>
      <div class="btnBox">
        <button @mousedown="clear">{{$t('common.Rewrite')}}</button>
        <button @mousedown="commit">{{$t('common.Submit')}}</button>
      </div>
      <van-dialog v-model="show" @confirm="commitSignature" show-cancel-button>
        <img :src="preview" />
      </van-dialog>
      <van-dialog v-model="showNotsign">
        <span>未签名</span>
      </van-dialog>
      <!-- <van-dialog v-model="show" :title="$t('common.PleaseSignInTheBox')"></van-dialog> -->
    </div>
    <!-- <img :src="url" alt=""> -->
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
import { Draw, draw_stauts } from "./draw";
export default {
  name: "canvans",
  props: ["contract"],
  // inject:['app'],
  data() {
    return {
      msg: this.$t("common.PleaseSignInTheBox"),
      degree: 90,
      imgurl: "",
      domjiedian: "",
      preview: null,
      show: false,
      showNotsign: false
      // draw_stauts:draw_stauts,
    };
  },
  components: {
    // Draw
  },
  beforeCreate() {
    // document.title = "手写签名";
    // console.log(1111);
  },
  created() {
    // if()
    // console.log(this.app)
    // console.log(draw_stauts);
  },
  mounted() {
    this.canvasBox = document.getElementById("canvasBox");
    this.domjiedian = document.querySelector("html");
    this.renderResize();
    this.initCanvas();
    this.$nextTick(() => {
      window.addEventListener("resize", this.renderResize, false);
    });
    //  console.log(this.draw);
  },
  beforeDestroy() {
    this.domjiedian.style.fontSize = null;
    window.removeEventListener("resize", this.renderResize, false);

    // var html = document.querySelector("html");
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
      // console.log(length);
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector("canvas"));
        this.canvasBox.insertBefore(
          document.createElement("canvas"),
          document.querySelector(".btnBox")
        );
        setTimeout(() => {
          this.initCanvas();
        }, 1000);
      }
      // console.log(width, length);
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
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      if (width > height) {
        this.degree = 0;
        this.domjiedian.style.fontSize = width / 16 + "px";
      } else if (width < height) {
        this.degree = 90;
        this.domjiedian.style.fontSize = height / 16 + "px";
      }
      // 做页面适配
      // 注意：renderResize方法执行时虚拟dom尚未渲染挂载，如果要操作vue实例，最好在this.$nextTick()里进行。
    },
    initCanvas() {
      const canvas = document.querySelector("canvas");
      this.draw = new Draw(canvas, -this.degree);
    },
    commitSignature() {
      this.$emit("imgurl", this.imgurl);
      // if (this.$route.name == "a_sign_contract") {
      //   this.$emit("aimgurl", this.imgurl);
      // } else if (this.$route.name == "p_sign_contract") {
      //   this.$emit("imgurl", this.imgurl);
      // }
    },
    commit() {
      // var aa = this.draw.scale(100, 50, this.draw.canvas);
      this.imgurl = this.draw.getPNGImage(this.draw.canvas);
      // console.log(this.imgurl);
      if (draw_stauts == 0) {
        this.showNotsign = true;
      } else {
        this.draw.commit();
        this.show = true;
        this.preview = this.imgurl;
      }
    },

    clear() {
      if (this.$route.name == "a_sign_contract") {
        this.contract.agent_sign = "";
      } else if (this.$route.name == "p_sign_contract") {
        this.contract.owner_sign = "";
      }
      this.draw.clear();
    }
    // download() {
    //   this.draw.downloadPNGImage(this.draw.getPNGImage());
    // },
    // savePNG() {
    //   this.signImage = this.draw.getPNGImage();
    //   this.showBox = true;
    // },
    // upload() {
    //   const image = this.draw.getPNGImage();
    //   const blob = this.draw.dataURLtoBlob(image);
    //   const url = "";
    //   const successCallback = response => {
    //     console.log(response);
    //   };
    //   const failureCallback = error => {
    //     console.log(error);
    //   };
    //   this.draw.upload(blob, url, successCallback, failureCallback);
    // }
  }
};
</script>

<style lang="scss" >
.signbox {
  width: 100%;
  height: 100%;
  .van-dialog {
    width: 50%;
    font-size: 0.38rem;
    .van-dialog__content {
      padding: 0.6rem;
      display: flex;
      justify-content: center;
    }
    .van-button {
      font-size: 0.36rem;
    }
  }
  nav.visaDetailTop .van-icon-arrow-left {
    line-height: 1rem;
    position: absolute;
    left: 0.6rem;
  }

  nav.visaDetailTop {
    /* width: 100%; */
    // border-bottom: 0.02rem dashed #b3b3b3;
    text-align: center;
    line-height: 1rem;
    color: #4f3dad;
    padding: 0.2rem 0;
    font-size: 0.4rem;

    font-weight: bold;
  }
  #canvasBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    p {
      font-size: 0.3rem;
      font-weight: bold;
      padding: 0.2rem 0;
      margin: 0 10%;
      // line-height:vw(34);
      color: #4f3dad;
    }
  }
  canvas {
    margin: 0 6%;
    // flex: 1;
    height: 10rem;
    /* width: 100%; */
    cursor: crosshair;
    border: 2px solid #4f3dad;
  }
  .btnBox {
    line-height: 1rem;
    font-size: 0.46rem;
    /* height: 2rem; */
    text-align: center;
    padding: 0.5rem 0 1rem;
    // margin: 0.3rem 0;
  }
  .btnBox > button {
    /* border: 1px solid #00adef; */
    background: #00f0ab;
    border-radius: 4px;
    color: #fff;
    padding: 0 10px;
    width: 3rem;
    /* height: 1rem;   */
  }
}

/* .greet {
  font-size: 0.2rem;
  user-select: none;
}
input {
  font-size: 0.2rem;
}
.greet select {
  font-size: 0.18rem;
} */
/* .canvasbox {
  display: flex;
  justify-content: center;
  align-items: center;
} */

/* .image-box {
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
} */
</style>
