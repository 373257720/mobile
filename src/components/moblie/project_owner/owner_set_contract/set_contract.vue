<template>
  <div id="p_set_contract">
    <!--   <nav>
      <van-icon name="arrow-left" @click="$router.go(-1)" />{{$t('agent.SignTheContract')}}
    </nav>-->
    <!-- <commonnav :msg="$t('agent.SignTheContract')"></commonnav> -->
    <main>
      <article>
        <div class="sub_title">
          <header>For and on behalf of:</header>
          <div>
            <van-field
              v-model="contract.owner_behalf"
              autosize
              maxlength="60"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              show-word-limit
            />
            <!-- <input maxlength="60" v-model="contract.owner_behalf"  placeholder="请输入"> -->
          </div>
        </div>
        <div class="sub_title">
          <header>Name:</header>
          <div>
            <!-- <input maxlength="30" v-model="contract.owner_name"  placeholder="请输入"> -->
            <van-field
              v-model="contract.owner_name"
              autosize
              maxlength="30"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              show-word-limit
            />
          </div>
        </div>
        <div class="sub_title">
          <header>Title:</header>
          <div>
            <!-- <input maxlength="30" v-model="contract.owner_title"  placeholder="请输入"> -->
            <van-field
              v-model="contract.owner_title"
              autosize
              maxlength="30"
              :placeholder="$t('ContractWrods.pleaseEnter')"
              show-word-limit
            />
          </div>
        </div>
        <div class="sub_title">
          <header>Contract content:</header>
          <div>
            <!--          <vue-html5-editor :content="contract.article" :height="400"-->
            <!--            @change="updateData"></vue-html5-editor>-->
            <quill-editor
              v-model="contract.article"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
            ></quill-editor>
            <!-- <textarea v-model="contract.article"  :placeholder="$t('ContractWrods.pleaseEnter')"></textarea> -->
          </div>
        </div>
        <footer>
          <button @click="signature">{{$t('agent.Sign')}}</button>
        </footer>
      </article>
    </main>
  </div>
</template>
<script>
// import VueUeditorWrap from "vue-ueditor-wrap";
import { Quill, quillEditor } from "vue-quill-editor";
export default {
  name: "goods_details",
  props: ["contract"],
  data() {
    return {
      editorOption: {
        placeholder: this.$t("ContractWrods.pleaseEnter"),
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "underline"], // toggled buttons
              [{ header: 1 }, { header: 2 }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ list: "ordered" }, { list: "bullet" }], // superscript/subscript
              // [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ color: [] }, { background: [] }], //                 // text direction
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown      // dropdown with defaults from theme
              // [{ 'font': [] }],
              [{ align: [] }],
              // ["sourceEditor"]

              // ['clean']
            ], // 工具栏选项
            // divider: {
            //   // See optional "config" below
            //   cssText: "border: none;border-bottom: 1px inset;"
            // },
            // divider: true,
            // handlers: {
            //   shadeBox: null,
            //   sourceEditor: e => {
            //     //添加工具方法
            //     console.log(e);
            //     // ducument.created
            //     const sourceEditorButton = document.querySelector(".ql-editor");
            //     let shadeBox = document.createElement("hr");
            //     shadeBox.className="divider";
            //     // shadeBox.classList.add = "divider";
            //     // shadeBox.setAttribute("class", "divider");
            //     console.log(sourceEditorButton);
            //     // const sourceEditorButton = document.querySelector(
            //     //   ".ql-sourceEditor"
            //     // );
            //     sourceEditorButton.appendChild(shadeBox);
            //   }
            // } // 事件重写
          }
        },
        initButton: function() {
          //在使用的页面中初始化按钮样式
          // const sourceEditorButton = document.querySelector(".ql-sourceEditor");
          // sourceEditorButton.style.cssText = "font-weight:550";
          // sourceEditorButton.innerText = "—";
        },
        register(q) {
          //注册标签(因为在富文本编辑器中是没有div,table等标签的，需要自己去注册自己需要的标签)
          class div extends q.import("blots/block/embed") {}
          class table extends q.import("blots/block/embed") {}
          class tr extends q.import("blots/block/embed") {}
          class td extends q.import("blots/block/embed") {}
          class hr extends q.import("blots/block/embed") {}
          // class DividerBlot extends q.import("blots/block/embed"){}
          // DividerBlot.blotName = "divider";
          // DividerBlot.tagName = "hr";
          // Quill.register(DividerBlot);
          hr.blotName = hr.tagName = "hr";
          div.blotName = div.tagName = "div";
          table.blotName = table.tagName = "table";
          tr.blotName = tr.tagName = "tr";
          td.blotName = td.tagName = "td";
          q.register(div);
          q.register(hr);
          q.register(table);
          q.register(tr);
          q.register(td);
        }
      }
      // content: '请输入文章内容',
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
  mounted() {
      
    // this.editorOption.register(Quill);
    // this.editorOption.initButton();
    // quillConfig.initButton();
  },
  watch: {
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
    updateData(e = "") {
      this.contract.article = e;
      console.info(this.contract.article);
    },
    onEditorChange() {
      // console.log('Change',)
      // this.contract.article=E;
      console.log("change", this.contract.article);
    },
    onEditorBlur() {
      console.log("blur", this.contract.article);
    },

    onEditorFocus() {
      console.log("focus", this.contract.article);
    },
    signature() {
      if (this.contract.owner_behalf == "") {
        this.$toast(this.$t("ContractWrods.PleaseEnterRepresentativeRights"));
        return;
      } else if (this.contract.owner_name == "") {
        this.$toast(this.$t("ContractWrods.PleaseEnterName"));
        return;
      } else if (this.contract.owner_title == "") {
        this.$toast(this.$t("ContractWrods.PleaseEnterTheTitle"));
        return;
      } else if (this.contract.article == "") {
        this.$toast(this.$t("projectOwner.PleaseEnterContractContent"));
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
.divider {
  line-height: 1.5rem;
  height: 1px;
  // position: relative;
  background: black;
  // border-bottom: 1px solid black;
  margin: 0.5rem 0;
}
// .divider::before{
//     content:"";
//     position:absolute;
//     height: 1px;
//     top:50%;
//     transform: translateY(-50%);
//     width: 100%;
//     background: #555;

// }
#p_set_contract {
  .van-field__control {
    box-sizing: border-box;
    border-radius: 3px;
    font-size: 0.38rem;
    line-height: 1rem;
    background: #f6f6f6;
    // color: rgba(0, 0, 0, 0.65);
    padding: 0.1rem 0.2rem;
    height: 1rem;
    width: 100%;
    border: 1px solid #a9a9a9;
  }
  .van-cell {
    padding: 0;
  }
  div.toolbar {
    z-index: 0 !important;
  }
  .vue-html5-editor > .content {
    //  background: #f6f6f6;
    max-height: 4rem;
  }
  //   .vue-html5-editor {
  //     border: 1px solid #a9a9a9;

  // }
  div.ql-container.ql-snow {
    height: 13rem;
    background: #f6f6f6;
  }

  div.ql-editor.ql-blank {
    height: 12rem;
  }

  .van-hairline--top-bottom::after {
    border: 0.02rem solid #8e8e8e;
  }
  .van-field {
    // background: #f2f2f2;
  }
}
</style>
<style lang="scss" scoped>
#p_set_contract {
  width: 100%;

  main {
    // margin-top: 1.5rem;
    margin-bottom: 1.3rem;
    padding: 0.5rem;
    background: #ffffff;
    .sub_title {
      header {
        font-size: 0.42rem;
        font-weight: 600;
      }
      input {
        box-sizing: border-box;
        font-size: 0.42rem;
        line-height: 1rem;
        padding: 0.2rem;
        height: 1rem;
        width: 100%;
        border: 1px solid rgb(169, 169, 169);
      }
    }
    textarea {
      box-sizing: border-box;
      font-size: 12px;
      color: black;
      line-height: 0.56rem;
      padding: 0.3rem 0.4rem;
      width: 100%;
      height: 13rem;
    }
    footer {
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        width: 8rem;
        font-size: 0.42rem;
        margin: 1rem 0;
        line-height: 1rem;
        background: #00adef;
        color: white;
        height: 1rem;
        border-radius: 5px;
      }
    }
  }
}
</style>
