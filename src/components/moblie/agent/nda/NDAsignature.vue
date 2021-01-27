<template>
  <div id="NDAsignature">
    <div class="container signbox">
      <div id="canvasBox" :style="getHorizontalStyle">
        <div class="greet">
          <nav class="visaDetailTop">
            <van-icon name="arrow-left" @click="goto('ndaClause')" />
            {{ $t("common.ElectronicSignature") }}
          </nav>
        </div>
        <p>Please draw signature below</p>
        <canvas></canvas>
        <div class="btnBox">
          <button @mousedown="clear">{{ $t("common.Rewrite") }}</button>
          <button @mousedown="commit">{{ $t("common.Submit") }}</button>
        </div>
        <van-dialog
          v-model="showDialog"
          @confirm="submitSignature"
          show-cancel-button
        >
          <div class="previewImg">
            <img :src="preview" />
          </div>
        </van-dialog>
        <van-dialog v-model="showNotsign" :message="errorMsg"></van-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { Draw, draw_stauts } from "../../draw";
export default {
  name: "NDAsignature",
  inject: ["NDAcontract", "goto"],
  data() {
    return {
      showDialog: false,
      errorMsg: this.$t("common.PleaseSignInTheBox"),
      degree: 90,
      imgurl: "",
      domjiedian: "",
      preview: null,
      submitSuccessful: false,
      showNotsign: false,
      // imgurl: ""
    };
  },
  created() {
    console.log(this.$route.query);
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
    // this.domjiedian.style.fontSize = null;
    window.removeEventListener("resize", this.renderResize, false);
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
        transformOrigin: "center center",
      };
    },
  },
  methods: {
    clear() {
      this.draw.clear();
    },
    submitSignature() {
      this.showDialog = false;
      let timestamp = new Date().getTime();
      if (this.$store.state.currentUsertype == 1) {
        this.NDAcontract.projectPartySigntime = timestamp;
        this.NDAcontract.projectPartySignature = this.imgurl;
      } else if (this.$store.state.currentUsertype == 4) {
        this.NDAcontract.middlemanSigntime = timestamp;
        this.NDAcontract.middlemanSignature = this.imgurl;
      }
      //   this.$routerto("NDAsubmit");
      this.goto("NDAsubmit");
      //   var imgs = this.imgurl.replace(/^data:image\/\w+;base64,/, "");
      //   this.picSigning(imgs);
    },
    commit() {
      // console.log(this.draw);
      // var aa = this.draw.scale(100, 50, this.draw.canvas);
      this.imgurl = this.draw.getPNGImage(this.draw.canvas);
      if (draw_stauts == 0) {
        this.showNotsign = true;
      } else {
        // this.draw.commit();
        this.showDialog = true;
        this.preview = this.imgurl;
      }
    },
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
    errorMsgfun(submitSuccessful) {
      if (submitSuccessful) {
        this.$routerto("mysign");
      }
    },
  },
};
</script>
<style lang="scss">
#NDAsignature {
  .van-dialog__content {
    text-align: center;
  }
  div.previewImg {
    padding: 0.6rem 0;
    img {
      height: 2rem;
    }
  }
  canvas {
    margin: 0 6%;
    cursor: crosshair;
    border: 2px solid #4f3dad;
  }
}
</style>
<style lang="scss" scoped>
#NDAsignature {
  width: 100%;
  height: 100%;
  position: relative;
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

    .btnBox {
      line-height: 1rem;
      font-size: 0.46rem;
      /* height: 2rem; */
      text-align: center;
      padding: 0.5rem 0 1rem;
      // margin: 0.3rem 0;
      > button {
        background: #00f0ab;
        border-radius: 4px;
        color: #fff;
        padding: 0 10px;
        width: 3rem;
        /* height: 1rem;   */
      }
    }
  }
}
</style>
