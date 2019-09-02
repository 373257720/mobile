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
                会分页吗?你可以试试，
                <br />验证一下自己的想法: demo6
                <br />addPage()，
                <br />我们可以通过pdf.addPage()，
                <br />来添加一页pdf，然后通过pdf.addImage(...)，
                <br />将图片赋予这页pdf来显示。
                <br />会分页吗?3423423423423dfgfdfsd df df f
                <br />验证一下自己的想法: demo6
                <br />addPage()，
                <br />我们可以通过pdf.addPage()，
                <br />来添加一页pdf，然后通过pdf.addImage(...)，
                <br />将图片赋予这页pdf来显示。如果页面内容根据a4比例转化后高度超过a4纸高度呢，的pdf会怎么样？
                <br />会分页吗?你可以试试，
                <br />验证一下自己的想法: demo6jsPDF提供了一个很有用的API，
                <br />addPage()，
                <br />我们可以通过pdf.addPage()，
                <br />来添加一页pdf，
                <br />
                <img src="../../../assets/10fe37a805f657460d990771d6454f1.png" alt />
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
      ]
      //   wait_input: []
    };
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
      // for(var i=0,i<)
      // var arr = document.querySelector(
      //   "#i_conected_project .contract .draft1_middle"
      // ).children;
      var arr = document.querySelector(
        "#i_conected_project .contract .draft1_middle"
      ).children;
      console.log(arr);
      // for (var i = 0; i < arr.length; i++) {
      //   console.log(arr[i].style);
      // }
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
          console.log(canvas);
          //一页pdf显示html页面生成的canvas高度;
          var pageHeight = (contentWidth / 592.28) * 841.89;
          //未生成pdf的html页面高度
          var leftHeight = contentHeight;
          //页面偏移
          var position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 595.28;
          var imgHeight = (592.28 / contentWidth) * contentHeight;
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
              padding: 0.3rem;
              box-sizing: border-box;
              line-height: 0.4rem;
              page-break-inside: avoid !important;
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