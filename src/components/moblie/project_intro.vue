<template>
  <div id="project_intro">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />项目简介
    </nav>
    <main id="project_intro_length">
      <h3>监考费第三方斯蒂芬</h3>
      <article>灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么多的字而灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么多的字而 灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么多的字而 灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么多的字而 多的字而的字而 灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因</article>
      <footer>
        <button @click="goto" v-if="success">签约</button>
        <div v-else-if="!success" class="sign">
          <header>签署合约：</header>
          <van-cell-group>
            <van-field v-model="message" type="textarea" placeholder="请输入留言" autosize />
          </van-cell-group>
          <button>签署</button>
          <button @click="goto" class="previous">上一步</button>
        </div>
      </footer>
    </main>

    <!-- <div class="project_intro2 con" v-if="!success">
      <nav>
        <img src="../../assets/19b9f427bcaefd8a3e879024299a204.png" alt />
        <span>您已注册成功{{time}}s</span>
      </nav>
    </div>-->
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "project_intro",
  data() {
    return {
      success: true,
      time: 3,
      message: ""
      // project_intro_length: ""
      // A:this.$refs.article.offsetHeight
      // project_intro_length: document.getElementById("article").offsetHeight
    };
  },
  methods: {
    goto() {
      this.success = !this.success;
      var textarea = this.message
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;");
      // var aa = setInterval(() => {
      //   --this.time;
      // }, 1000);
      // setTimeout(() => {
      //   clearInterval(aa);
      //   this.$goto("home");
      // }, 4000);
    }
  },
  mounted() {
    // document.getElementById("project_intro").offsetHeight += document.getElementById(
    //   "project_intro_length"
    // ).offsetHeight;
    // console.log(document);
    // console.log( document.getElementById("project_intro").offsetHeight,document.getElementById("project_intro_length").offsetHeight);
    // console.log(a, b);
    // document.getElementById("project_intro").offsetHeight+=document.getElementById("project_intro_length").offsetHeight;
  }
};
</script>
<style lang="scss">
#project_intro {
  nav {
    position: relative;
    .van-icon-arrow-left {
      // line-height: 1rem;
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-field {
    margin-top: 0.2rem;
    width: 100%;
    min-height: 5rem;
    background: #f2f2f2;
    .van-field__control {
      min-height: 5rem;
      font-size: 0.3rem;
      line-height: 0.4rem;
    }
  }
}
</style>
<style lang="scss" scoped>
#project_intro {
  nav {
    width: 100%;
    border-bottom: 0.01rem dashed #b3b3b3;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    font-size: 0.4rem;
    top: 0;
    background: white;
  }
  main {
    margin: 2rem 0.6rem 1.5rem 0.6rem;
    h3 {
      margin: 0.3rem 0;
      text-align: center;
    }
    article {
      // margin:0 0.6rem;
      font-size: 0.3rem;
      line-height: 0.5rem;
      color: #4c4c4c;
    }
  }
  footer {
    display: flex;
    justify-content: center;
    .sign {
      margin-top: 0.5rem;
      width: 100%;
      section {
        margin-top: 0.2rem;
        width: 100%;
        min-height: 5rem;
        background: #f2f2f2;
      }
    }
    button {
      width: 100%;
      height: 0.8rem;
      margin: 0.4rem 0;
      background: #00adef;
      color: white;
    }
    button.previous {
      margin: 0 0 0.4rem 0;
    }
  }
}
</style>


