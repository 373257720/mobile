<template>
  <div id="sign_contract">
    <!-- <cavans :contract="contract" @imgurl="commit"></cavans> -->
    <div class="container signbox">
      <div id="canvasBox" :style="getHorizontalStyle">
        <div class="greet">
          <nav class="visaDetailTop">
            <van-icon name="arrow-left" @click="$global.previous()" />
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
          v-model="show"
          @confirm="submitSignature"
          show-cancel-button
        >
          <div class="previewImg">
            <img :src="preview" />
          </div>
        </van-dialog>
        <van-dialog
          v-model="showNotsign"
          :message="errorMsg"
          @confirm="errorMsgfun(submitSuccessful)"
        ></van-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { Draw, draw_stauts } from "../../draw";
export default {
  name: "sign_contract",
  // props: ["contract"],
  data() {
    return {
      show: false,
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
    // console.log(this.$store.state.contract.body);
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
      var imgs = this.imgurl.replace(/^data:image\/\w+;base64,/, "");
      this.picSigning(imgs);
    },
    commit() {
      // console.log(this.draw);
      // var aa = this.draw.scale(100, 50, this.draw.canvas);
      this.imgurl = this.draw.getPNGImage(this.draw.canvas);
      // console.log(this.imgurl);
      if (draw_stauts == 0) {
        this.showNotsign = true;
      } else {
        // this.draw.commit();
        this.show = true;
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
    convertBase64UrlToImgFile(urlData, fileName, fileType) {
      var bytes = window.atob(urlData); //转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Int8Array(ab);
      var i;
      for (i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      //转换成文件，添加文件的type，name，lastModifiedDate属性
      var blob = new Blob([ab], { type: fileType });
      blob.lastModifiedDate = new Date();
      blob.name = fileName;
      // console.log(blob);
      return blob;
    },
    errorMsgfun(submitSuccessful) {
      if (submitSuccessful) {
        this.$routerto("mysign");
      }
    },
    picSigning(file) {
      let fileName = new Date().getTime() + ".jpeg"; //随机文件名
      let imgfile = this.convertBase64UrlToImgFile(
        file,
        fileName,
        "image/jpeg"
      ); //转换成file
      let formData = new FormData();
      formData.append("file", imgfile, fileName);
      //放到表单中，此处的file要和后台取文件时候的属性名称保持一致
      formData.append("X_Token", this.$store.state.X_Token);
      this.$axios
        .post(
          `${this.$axios.defaults.baseURL}/bsl_web/upload/picSigning`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.resultCode == 10000) {
            if (this.$store.state.currentUsertype == 1) {
              this.$global
                .post_encapsulation(
                  `${this.$axios.defaults.baseURL}/bsl_web/projectSign/iBackSignOrRejectCommission `,
                  {
                    optType: 0,
                    signId: this.$route.query.signId,
                    middlemanId: this.$route.query.middlemanId,
                    signingTime: new Date().getTime(),
                    signingPicPath: res.data.data.signingPicPath,
                  }
                )
                .then((res) => {
                  this.showNotsign = true;
                  this.errorMsg = res.data.resultDesc;
                  if (res.data.resultCode == 10000) {
                    this.submitSuccessful = true;
                  }
                });
            } else if (this.$store.state.currentUsertype == 4) {
              this.$global
                .post_encapsulation(
                  `${this.$axios.defaults.baseURL}/bsl_web/projectSign/middlemanSign `,
                  {
                    signId: this.$route.query.signId,
                    middlemanId: this.$route.query.middlemanId,
                    signingTime: new Date().getTime(),
                    signingPicPath: res.data.data.signingPicPath,
                  }
                )
                .then((res) => {
                  this.showNotsign = true;
                  this.errorMsg = res.data.resultDesc;
                  if (res.data.resultCode == 10000) {
                    this.submitSuccessful = true;
                  }
                });
            }
          } else {
            this.showNotsign = true;
            this.errorMsg = res.data.resultDesc;
          }
        });
    },
  },
};
</script>
<style lang="scss">
#sign_contract {
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
#sign_contract {
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
