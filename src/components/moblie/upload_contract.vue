<template>
  <div id="upload_contract">
    <div class="upload_contract">
      <div class="top"></div>
      <div class="middle" v-html="article"></div>
      <div class="button">
        <p>
          <i>
            <img :src="owner" alt />
          </i>
          <span>投行</span>
          <span>{{owner_signdate?owner_signdate:''}}</span>
        </p>
        <p>
          <i>
            <img :src="agent" alt />
          </i>

          <span>中间人</span>
          <span>{{agent_signdate?agent_signdate:''}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "upload",
  data() {
    return {
      //   iframeData:{}
      owner: "",
      agent: "",
      article: "",
      owner_signdate:'',
      agent_signdate:'',
    };
  },
  created() {},
  computed: {
    // contract_content: function(){
    // },
  },
  mounted() {
    // 接受父页面发来的信息
    window.addEventListener("message", this.handleMessageFromParent); // 子接收方式二参数
    // console.log(555);
    
    // this.iframeData = this.$route.query; // 子接收方式一参数
  },

  methods: {
    handleMessageFromParent(event) {
      // 子接收父参数
      // console.log(1111);
      
      var data = event.data;
      switch (data.cmd) {
        case "toson":
          // 处理业务逻辑
          // console.log(data.params);
            let ee=  JSON.parse(data.params);

          this.owner = ee.owner;
          this.agent = ee.agent;
          this.article = ee.article;
          this.owner_signdate=this.$global.stamptodate(ee.owner_signdate);
          this.agent_signdate=this.$global.stamptodate(ee.agent_signdate);
          
          //   this.iframeData = data;
          // console.log(data);

          break;
      }
    },
    handleMessageToParent() {
      // 子向父传参
      window.parent.postMessage(
        {
          cmd: "returnFormJson",
          params: {}
        },
        "*"
      );
    }
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
#upload_contract {
  .upload_contract {
    // background: #f2f2f2;
    // border: 1px solid #b5b5b5;
    box-sizing: border-box;
    font-size: 0.4rem;
    line-height: 0.6rem;
    padding: 0.4rem 0.4rem;
    width: 100%;
    height: 13rem;
    overflow-y: auto;
    word-wrap: break-word;
    color: rgb(169, 169, 169);
    div.button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        flex-direction: column;
        align-items: center;
        i {
          width: 3rem;
          height: 1rem;
          border-bottom: 1px solid rgb(169, 169, 169);
          img {
            width: 3rem;
            height: 1rem;
          }
        }
      }
    }
  }
}
</style>