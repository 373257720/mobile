<template>
  <div id="project_intro">
    <nav>
      <van-icon name="arrow-left" />項目簡介
    </nav>
    <main id="project_intro_length">
      <!-- <aside>
        <img src="../../assets/26566ffb301dac8c24d21969b538612.png" alt />
      </aside>-->
      <article>灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么多的字而灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么多的字而 灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么多的字而 灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因为p标签放不下那么多的字而 多的字而的字而 灰色部分的是图片，因为p标签是块状元素，本来图片应该出现在第二行文字的下面，但是，却出现在了第二行文字的上面，经过分析，因为我给p标签的样式设置了宽度24px和高度，设置的行高也是24px，又因为p标签是块状元素，虽然，在视觉上看起来因</article>
      <footer>
        <button @click="goto">簽約</button>
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
      time: 3
      // project_intro_length: ""
      // A:this.$refs.article.offsetHeight
      // project_intro_length: document.getElementById("article").offsetHeight
    };
  },
  methods: {
    goto() {
      this.success = !this.success;
      var aa = setInterval(() => {
        --this.time;
      }, 1000);
      setTimeout(() => {
        clearInterval(aa);
        this.$goto("home");
      }, 4000);
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
     left:0.6rem;
     top:50%;
     transform: (translate(0,-50%))
    }
  }
}
</style>
<style lang="scss" scoped>
#project_intro {
  // height: 870px;
  // width: 100%;
  // margin: 0 0.6rem;
  nav {
    width: 100%;
    border-bottom: 0.01rem dashed #b3b3b3;
    text-align: center;
    line-height: 1rem;
    height: 1rem;
    position: fixed;
    top: 0;
    background: white;
  }
  main {
    margin: 1.5rem 0.6rem 0.6rem 0.6rem;

    // margin: 0 0.6rem;
    article {
      // margin:0 0.6rem;
      font-size: 0.16rem;
      line-height: 0.5rem;
    }

    // aside {
    //   display: flex;
    //   width: 100%;
    //   height: 3rem;
    //   justify-content: center;
    //   img {
    //     // align-items: center;
    //   }
    // }
    // img {
    //   vertical-align: middle;
    // }
    // span {
    //   vertical-align: middle;
    // }
    // article {
    //   // padding: 1rem;
    // }
  }
  footer {
    display: flex;
    justify-content: center;
    button {
      width: 100%;
      margin: 0.2rem 0;
      background: #00adef;
      color: white;
    }
  }
}
</style>


