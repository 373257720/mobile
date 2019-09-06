<template>
  <div id="i_conected_project">
    <nav>
      <van-icon name="arrow-left" />成功签约
    </nav>
    <main>
      <article>
        <header>放水电费鼎飞丹砂</header>
        <ul>
          <li i v-for="(item) in details_lists" :key="item">
            <p class="row1">{{item}}</p>
            <p class="row2">地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非官方地方</p>
          </li>
          <li class="contract">
            <p class="row1 draft">草拟合约:</p>
            <section class="row2 draft1">
              <article class="draft1_middle">
                <!-- <img src="../../../assets/10fe37a805f657460d990771d6454f1.png" alt=""> -->
              </article>
            </section>
          </li>
        </ul>
        <footer>
          <button @click="exporthtml">导出</button>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "i_conected_project",
  data() {
    return {
      details_lists: [
        "公司名称:",
        "是否上市公司:",
        "项目详情:",
        "集资额：",
        "联系电话：",
        "电邮：",
        "投资者公司：",
        "投资者姓名:",
        "投资者电话：",
        "投资者邮箱:",
        "感兴趣行业："
      ],
      articlee: ""
    };
  },
  mounted() {
    this.articlee =
      "<p>度过了漫长而煎熬的6月，是时候总结一波。最近移动端的一款产品原计划是引入第三方的签名插件，该插件依赖复杂，若干个js使用document.write顺序加载，插件源码是ES5的，甚至说是ES3都不为过。为了能够顺利嵌入我们的VUE项目，我阅读了两天插件的源码（demo及文档不全，囧），度过了漫长而煎熬的6月，是时候总结一波。最近移动端的一款产品原计划是引入第三方的签名插件，该插件依赖复杂，若干个js使用document.write顺序加载，插件源码是ES5的，甚至说是ES3都不为过。为了能够顺利嵌入我们的VUE项目，我阅读了两天插件的源码（demo及文档不全，囧），然后花了一天多点的时间使用ES6引用它。鉴于单页应用中，任何非全局资源都不该提前加载的指导性原则，为了做到动态加载，我甚至还专门写了一个simple的vue组件iload.js去顺序加载这些资源并执行回调。一切看似很完美，结果发现demo引用的一个压缩的js中居然写死了插件相关DOM节点的id和style，此刻我的内心几乎是崩溃的。这样的一个插件我怕是无力引入了吧然后花了一天多点的时间使用ES6引用它。鉴于单页应用中，任何非全局资源都不该提前加载的指导性原则，为了做到动态加载，我甚至还专门写了一个simple的vue组件iload.js去顺序加载这些资源并执行回调。一切看似很完美，结果发现demo引用的一个压缩的js中居然写死了插件相关DOM节点的id和style，此刻我的内心几乎是崩溃的。这样的一个插件我怕是无力引入了吧度过了漫长而煎熬的6月，是时候总结一波。最近移动端的一款产品原计划是引入第三方的签名插件，该插件依赖复杂，若干个js使用document.write顺序加载，插件源码是ES5的，甚至说是ES3都不为过。为了能够顺利嵌入我们的VUE项目，我阅读了两天插件的源码（demo及文档不全，囧），然后花了一天多点的时间使用ES6引用它。鉴于单页应用中，任何非全局资源都不该提前加载的指导性原则，为了做到动态加载，我甚至还专门写了一个simple的vue组件iload.js去顺序加载这些资源并执行回调。一切看似很完美，结果发现demo引用的一个压缩的js中居然写死了插件相关DOM节点的id和style，此刻我的内心几乎是崩溃的。这样的一个插件我怕是无力引入了吧度过了漫长而煎熬的6月，是时候总结一波。最近移动端的一款产品原计划是引入第三方的签名插件，该插件依赖复杂，若干个js使用document.write顺序加载，插件源码是ES5的，甚至说是ES3都不为过。为了能够顺利嵌入我们的VUE项目，我阅读了两天插件的源码（demo及文档不全，囧），然后花了一天多点的时间使用ES6引用它。鉴于单页应用中，任何非全局资源都不该提前加载的指导性原则，为了做到动态加载，我甚至还专门写了一个simple的vue组件iload.js去顺序加载这些资源并执行回调。一切看似很完美，结果发现demo引用的一个压缩的js中居然写死了插件相关DOM节点的id和style，此刻我的内心几乎是崩溃的。这样的一个插件我怕是无力引入了吧度过了漫长而煎熬的6月，是时候总结一波。最近移动端的一款产品原计划是引入第三方的签名插件，该插件依赖复杂，若干个js使用document.write顺序加载，插件源码是ES5的，甚至说是ES3都不为过。为了能够顺利嵌入我们的VUE项目，我阅读了两天插件的源码（demo及文档不全，囧），然后花了一天多点的时间使用ES6引用它。鉴于单页应用中，任何非全局资源都不该提前加载的指导性原则，为了做到动态加载，我甚至还专门写了一个simple的vue组件iload.js去顺序加载这些资源并执行回调。一切看似很完美，结果发现demo引用的一个压缩的js中居然写死了插件相关DOM节点的id和style，此刻我的内心几乎是崩溃的。这样的一个插件我怕是无力引入了吧度过了漫长而煎熬的6月，是时候总结一波。最近移动端的一款产品原计划是引入第三方的签名插件，该插件依赖复杂，若干个js使用document.write顺序加载，插件源码是ES5的，甚至说是ES3都不为过。为了能够顺利嵌入我们的VUE项目，我阅读了两天插件的源码（demo及文档不全，囧），然后花了一天多点的时间使用ES6引用它。鉴于单页应用中，任何非全局资源都不该提前加载的指导性原则，为了做到动态加载，我甚至还专门写了一个simple的vue组件iload.js去顺序加载这些资源并执行回调。一切看似很完美，结果发现demo引用的一个压缩的js中居然写死了插件相关DOM节点的id和style，此刻我的内心几乎是崩溃的。这样的一个插件我怕是无力引入了吧</p>";
      // "<p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p><p></p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p><p></p><p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p><p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p><p></p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p><p></p><p>到右出现的顺序存储。缓冲区编号从&nbsp;1&nbsp;开始，最多可存储&nbsp;99&nbsp;个捕获的子表达式。每个缓冲区都可以使用&nbsp;\n&nbsp;访问，其中&nbsp;n&nbsp;为一个标识特定缓冲区的一位或两位十进制数。</p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p><p>可以使用非捕获元字符&nbsp;?:、?=&nbsp;或&nbsp;?!&nbsp;来重写捕获，忽略对相关匹配的保存。</p><p></p><p>反向引用的最简单的、最有用的应用之一，是提供查找文本中两个相同的相邻单词的匹配项的能力。以下面的句子为例：</p>";
    document.querySelector(
      "#i_conected_project .contract .draft1_middle"
    ).innerHTML = this.articlee;
    var arr = document.querySelector(
      "#i_conected_project .contract .draft1_middle"
    ).children;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].innerHTML == "") {
        arr[i].style.height = 0.46 + "rem";
      }
    }
    // this.articlee="<img src="../../../assets/10fe37a805f657460d990771d6454f1.png" alt />"
  },
  methods: {
    gg() {
      // console.log(this.$dialog);
      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    exporthtml() {
      // var content = this.content.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');

      var str = document.querySelector(
        "#i_conected_project .contract .draft1_middle"
      );
      document.querySelector(
        "#i_conected_project .contract .draft1"
      ).scrollTop = 0;
      html2canvas(str, {
        // 渲染完成时调用，获得 canvas
        useCORS: true,
        allowTaint: true,
        background: "#FFFFFF",
        onrendered: function(canvas) {
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;
          // var contentWidth = 310;
          // var contentHeight = 440;
          console.log(canvas);
          //一页pdf显示html页面生成的canvas高度;
          var pageHeight = (contentWidth / 592.28) * 841.89;
          // var pageHeight = 440;
          console.log(pageHeight);
          //未生成pdf的html页面高度
          var leftHeight = contentHeight;
          //页面偏移
          var position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 595.28;
          var imgHeight = (592.28 / contentWidth) * contentHeight;
          // console.log(imgHeight);
          // 从 canvas 提取图片数据
          var pageData = canvas.toDataURL("image/jpeg", 1.0);
          // console.log(pageData);
          //初始化pdf，设置相应格式（单位为pt,导出a4纸的大小）
          var pdf = new jsPDF("p", "pt", "a4"); //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          //输出保存命名的pdf
          pdf.save("pdf_" + new Date().getTime() + ".pdf");
        } // 导出的pdf默认背景颜色为黑色，所以要设置颜色为白
      });
    }
  }
};
</script>
<style lang="scss">
#i_conected_project {
  .van-hairline--top-bottom::after {
    border: 0.01rem solid #8e8e8e;
  }
  .van-cell {
    padding: 0;
    .van-field__control {
      background: #f2f2f2;
      font-size: 0.3rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
    }
  }
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
.van-dialog {
  font-size: 0.3rem;
}
.van-dialog__message {
  font-size: 0.3rem;
}
.van-button {
  font-size: 0.3rem;
}
</style>
<style lang="scss" scoped>
#i_conected_project {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    margin-bottom: 1.2rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      header {
        height: 1.7rem;
        font-size: 0.32rem;
        text-align: center;
        font-weight: 600;
        line-height: 1.7rem;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.4rem;
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
        .contract {
          display: block;
          .row2 {
            width: 6.5rem;
            height: 6rem;
            // height:100%;
            border: 0.02rem solid #b3b3b3;
            overflow-y: auto;

            .draft1_middle {
              padding: 0 0.3rem 0 0.3rem;
              box-sizing: border-box;
              line-height: 0.46rem;
              font-size: 0.3rem;
              // page-break-inside: avoid !important;
              // p {
              //   line-height: 0.4rem;
              // }
              // font-size: 0.3rem;
              // height:100%;
            }
          }
        }
      }
      footer {
        padding: 0.5rem;
        button {
          width: 6.5rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
        button {
          margin-bottom: 0.4rem;
        }
        aside {
          height: 1.5rem;
          // width: 6.5rem;
          display: flex;
          justify-content: space-between;
          button {
            width: 3rem;
          }
        }
      }
    }
  }
}
</style>