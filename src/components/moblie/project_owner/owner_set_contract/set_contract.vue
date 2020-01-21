<template>
  <div id="p_set_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签署合约
    </nav>
    <main>
      <article>
        <div class="sub_title">
          <header>For and on behalf of:</header>
          <div >
            <input maxlength="50" v-model="contract.owner_behalf"  placeholder="请输入"></input>
          </div>
        </div>
        <div class="sub_title">
          <header>Name:</header>
          <div >
            <input maxlength="30" v-model="contract.owner_name"  placeholder="请输入"></input>
          </div>
        </div>
       <div class="sub_title">
         <header>Title:</header>
         <div>
           <input maxlength="30" v-model="contract.owner_title"  placeholder="请输入"></input>
         </div>
       </div>
      <div class="sub_title">
        <header>Contract:</header>
        <div>
          <textarea v-model="contract.article"  placeholder="请输入"></textarea>
        </div>
      </div>
<!--        <div>-->
<!--          <textarea v-model="content"  placeholder="请输入"></textarea>-->
<!--        </div>-->
        <footer>
          <button @click="signature">签署</button>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
// import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  name: "goods_details",
  props:['contract'],
  data() {
    return {
      // contract:{
      //   article:'',
      //   owner_sign:'',
      //   owner_name:'',
      //   owner_title:'',
      //   owner_signdate:null,
      //   agent_name:'',
      //   agent_title:'',
      //   agent_signdate:null,
      // }

      // details_lists: ["申请时间:", "申请中间人:", "申请项目:"],
      // myConfig: {
      //   //编辑器配置
      //   elementPathEnabled: false, //编辑器不自动被内容撑高
      //   initialFrameWidth: 445, //容器宽度
      //   initialFrameHeight: 530, //容器高度
      //   autoHeightEnabled: false, // serverUrl: 'https://t.p.idyoga.cn/static/admin/lib/ueditor/1.4.3/php/controller.php',
      //   serverUrl:'',
      //   //  this.getNetUrl`/static/admin/lib/ueditor/1.4.3/php/controller.php`, //正测试 // UEDITOR_HOME_URL: '/yoga_college_admin/static/UEditor/',//打包后
      //   UEDITOR_HOME_URL: "/static/UEditor/UEditor/" //本地运行访问路径
      // }
    };
  },
  // components: {
  //   "vue-ueditor-wrap": VueUeditorWrap
  // },
  created() {
    // if(this.$store.state.contract.signId==this.$route.query.signId){
    //     for(let i in this.contract){
    //         if(this.$store.state.contract.hasOwnProperty(i)){
    //           this.contract[i]=this.$store.state.contract[i]
    //         }
    //     }
    // }
  },
  watch:{
    // contract: {
    //   handler(newValue, oldValue) {
    //     // var content = this.contract.content
    //     //   .replace(/\r\n/g, "<br/>")
    //     //   .replace(/\n/g, "<br/>")
    //     //   .replace(/\s/g, "&nbsp;");
    //     // this.$emit('getchildren',content)
    //   },
    //   deep: true
    // },
  },
  computed: {},
  methods: {
    signature() {
      if(this.contract.owner_behalf==''){
        this.$toast('请输入代表权益')
        return
      }else if(this.contract.owner_name==''){
        this.$toast('请输入名称')
        return;
      }else if(this.contract.owner_title==''){
        this.$toast('请输入职称')
        return;
      }else if(this.contract.article==''){
        this.$toast('请输入合同内容')
        return;
      }
        this.$routerto("p_sign_contract", this.$route.query);
    }
    // ready(editorInstance) {
    //   //编辑器实例化
    //   console.log(`实例${editorInstance.key}已经初始化:`, editorInstance);
    // }
  }
};
</script>
<style lang="scss">
#p_set_contract {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-hairline--top-bottom::after {
    border: 0.02rem solid #8e8e8e;
  }
  .van-field {
    background: #f2f2f2;
  }
}
// .van-dialog {
//   font-size: 0.3rem;
// }
// .van-hairline--top-bottom::after{
//      border: 0.02rem solid #8e8e8e;
// }
// van-cell van-cell--small van-field
// .van-dialog__message {
//   font-size: 0.3rem;
// }
// .van-button {
//   font-size: 0.3rem;
// }
</style>
<style lang="scss" scoped>
#p_set_contract {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    z-index: 5;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: #ffffff;
    .sub_title{
      margin-bottom:0.5rem;
      header{
        /*margin-bottom: 0.2rem;*/
        font-size: 0.38rem;
      }
      input{
        box-sizing: border-box;
        font-size: 0.38rem;
        line-height: 1rem;
        padding: 0.2rem;
        /*box-sizing: border-box !important;*/
        height: 1rem;
        width: 100%;
        /*height: 13rem;*/
        border: 1px solid rgb(169, 169, 169);
      }
    }
    textarea {
      // background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.36rem;
      line-height: 0.56rem;
      padding: 0.3rem 0.4rem;
      /*color: rgb(169, 169, 169);*/
      width:100%;
      height: 13rem
    }
    footer {
      width: 100%;
      button {
        width: 100%;
        font-size: 0.38rem;
        margin-bottom: 1rem;
        background: #00adef;
        color: white;
        height: 1rem;
      }
    }
  }
}
</style>
