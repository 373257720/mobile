<template>
  <div id="p_check_contract">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签署合约
    </nav>
    <main>
      <article>
        <div v-html="content">
          <!-- <textarea v-model="content" style="width:100%; height: 8rem" placeholder="请输入"></textarea> -->
        </div>
        <footer>
          <button @click="gg">导出</button>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      content:'',
      details_lists: ["申请时间:", "申请中间人:", "申请项目:"]
    };
  },
  mounted(){
    this.content= "<p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p><p></p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p><p></p><p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p><p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p><p></p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p><p></p><p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p>"
  },
  methods: {
    gg(){
      console.log(this.content);
      
    }
    // gg() {
    //   // console.log(this.$dialog);

    //   this.$dialog
    //     .confirm({
    //       title: "标题",
    //       message: "弹窗内容"
    //     })
    //     .then(() => {
    //       // on confirm
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    // }
  }
};
</script>
<style lang="scss">
#p_check_contract {
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
   .van-field{
     background: #f2f2f2;
     
   }
}
</style>
<style lang="scss" scoped>
#p_check_contract {
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
    padding: 0.5rem;
    background: #ffffff;
   div{
      background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.3rem 0.4rem;
      width:100%; 
      height: 8rem;
      overflow-y: auto;
      color: rgb(169, 169, 169);
    }
    footer {
      width: 100%;
      button {
        width: 100%;
        margin-top: 1rem;
        background: #00adef;
        color: white;
        height: 0.8rem;
      }
    }
  }
}
</style>