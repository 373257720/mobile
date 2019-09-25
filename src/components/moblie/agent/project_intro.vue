<template>
  <div id="project_intro">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />项目简介
    </nav>
    <main id="project_intro_length">
      <h3>{{title}}</h3>
      <article v-html="main"></article>
      <footer>
        <button @click="goto" v-if="success">签约</button>
        <div v-else-if="!success" class="sign">
          <header>签署合约：</header>
          <van-cell-group>
            <van-field v-model="message" type="textarea" placeholder="请输入留言" autosize />
          </van-cell-group>
          <button @click="aa">签署</button>
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
      message: "",
      title:'',
      main:''
      // project_intro_length: ""
      // A:this.$refs.article.offsetHeight
      // project_intro_length: document.getElementById("article").offsetHeight
    };
  },
  methods: {
    goto() {
      this.success = !this.success;
      // var aa = setInterval(() => {
      //   --this.time;
      // }, 1000);
      // setTimeout(() => {
      //   clearInterval(aa);
      //   this.$goto("home");
      // }, 4000);
    },
    aa() {
      var textarea = this.message
        .replace(/\n/g, "</p><p>")
        // .replace(/\r\n/g, "<p></p>")
        .replace(/\s/g, "&nbsp;");
      // "<p>"+textarea+"</p>"
      console.log("<p>" + textarea + "</p>");
      // var arr = document.querySelector(
      //   "#i_conected_project .contract .draft1_middle"
      // ).children;
      // console.log(arr);
      // for (var i = 0; i < arr.length; i++) {
      //   console.log((arr[i].innerHTML = ""));
      //   if ((arr[i].innerHTML = "")) {
      //     arr[i].style.height = 0.4 + "rem";
      //   }
      // }
    }
  },
  created() {
    console.log(this.$route.query.projectId);
    let projectid = this.$route.query.projectId;
    this.$axios({
      method: "get",
      url: `${this.$baseurl}/bsl_web/project/getProjectDetails?projectId=${projectid}`
    }).then(res => {
      console.log(res);
      this.title=res.data.data.projectName;
      this.main=res.data.data.projectDetail
    });

    // this.router
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
  .contract {
    display: block;

    .row1 {
      margin-bottom: 0.1rem;
    }
    .row2 {
      width: 6.5rem;
      height: 6rem;
      border: 0.01rem solid #b3b3b3;
      // box-sizing: border-box;
      padding: 0;
      background: #f2f2f2;
      .draft1_middle {
        padding: 0.3rem;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }
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


