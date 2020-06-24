<template>
  <div id="contract_component">
    <div class="contract_component">
      <!--      <van-field-->
      <!--        class="middle"-->
      <!--        v-model="contract.article"-->
      <!--        autosize-->
      <!--        readonly-->
      <!--        type="textarea"-->
      <!--      />-->

      <div class="middle ql-editor" v-html="contract.article"></div>
  
      <!-- <a href="javascript:void(0)" @click="next()">1023</a> -->
      <!-- <div class="button">
        <ul>
          <li>
            <nav>For and on behalf of:</nav>
            <h3>{{contract.owner_behalf}}</h3>
          </li>
          <li>
            <div>
              <p class="signature">
                <img v-if="contract.owner_sign" :src="contract.owner_sign" alt />
              </p>
            </div>
            <p>Signature</p>
          </li>
          <li>
            <p>
              <span>{{contract.owner_name}}</span>
            </p>
            <p>Name</p>
          </li>
          <li>
            <p>
              <span>{{contract.owner_title}}</span>
            </p>
            <p>Title</p>
          </li>
          <li>
            <p>
              <span>{{owner_signdate}}</span>
            </p>
            <p>Date</p>
          </li>
        </ul>
        <ul>
          <li>
            <nav>For and on behalf of:</nav>
            <h3>{{contract.agent_behalf}}</h3>
          </li>
          <li>
            <div>
              <p class="signature">
                <img v-if="contract.agent_sign" :src="contract.agent_sign" alt />
              </p>
            </div>
            <p>Signature</p>
          </li>
          <li>
            <p>
              <span>{{contract.agent_name}}</span>
            </p>
            <p>Name</p>
          </li>
          <li>
            <p>
              <span>{{contract.agent_title}}</span>
            </p>
            <p>Title</p>
          </li>
          <li>
            <p>
              <span>{{agent_signdate}}</span>
            </p>
            <p>Date</p>
          </li>
        </ul>
      </div>-->
    </div>
        <div id="divPagenation" >
        <van-pagination @change="goto" v-model="currentPage" :page-count="total" :items-per-page="5" />
      </div>
  </div>
</template>
<script>
// import loginVue from "./login.vue";
export default {
  name: "contract_component",
  props: ["contract"],
  data() {
    return {
      currentPage:1,
      total:null,
      strDisplayPagenation: ""
      // contract:{
      //   article:'',
      //   owner_sign:'',
      //   owner_name:'',
      //   owner_title:'',
      // owner_signdate:'',
      // agent_signdate:'',
      //   agent_name:'',
      //   agent_title:'',
      //   agent_signdate:null,
      // }
    };
  },
  created() {
    this.contract.article =
      "<p>女老师竭力向孩子们证明，学习好功课的重要性。 </p><p>她说：“牛顿坐在树下，眼睛盯着树在思考，这时，有一个苹果落在他的头上，于是他发现了万有引力定律，孩子们，你们想想看，做一位伟大的科学家多么好，多么神气啊，要想做到这一点，就必须好好学习。” </p><p>“班上一个调皮鬼对此并不满意。他说：“兴许是这样，可是，假如他坐在学校里，埋头书本，那他就什么也发现不了啦。” </p><p>女老师竭力向孩子们证明，学习好功课的重要性。 </p><p>她说：“牛顿坐在树下，眼睛盯着树在思考，这时，有一个苹果落在他的头上，于是他发现了万有引力定律，孩子们，你们想想看，做一位伟大的科学家多么好，多么神气啊，要想做到这一点，就必须好好学习。” </p><p>“班上一个调皮鬼对此并不满意。他说：“兴许是这样，可是，假如他坐在学校里，埋头书本，那他就什么也发现不了啦。” </p><p>女老师竭力向孩子们证明，学习好功课的重要性。 </p><p>她说：“牛顿坐在树下，眼睛盯着树在思考，这时，有一个苹果落在他的头上，于是他发现了万有引力定律，孩子们，你们想想看，做一位伟大的科学家多么好，多么神气啊，要想做到这一点，就必须好好学习。” </p><p>“班上一个调皮鬼对此并不满意。他说：“兴许是这样，可是，假如他坐在学校里，埋头书本，那他就什么也发现不了啦。” </p><p>女老师竭力向孩子们证明，学习好功课的重要性。 </p><p>她说：“牛顿坐在树下，眼睛盯着树在思考，这时，有一个苹果落在他的头上，于是他发现了万有引力定律，孩子们，你们想想看，做一位伟大的科学家多么好，多么神气啊，要想做到这一点，就必须好好学习。” </p><p>“班上一个调皮鬼对此并不满意。他说：“兴许是这样，可是，假如他坐在学校里，埋头书本，那他就什么也发现不了啦。” </p><p>女老师竭力向孩子们证明，学习好功课的重要性。 </p><p>她说：“牛顿坐在树下，眼睛盯着树在思考，这时，有一个苹果落在他的头上，于是他发现了万有引力定律，孩子们，你们想想看，做一位伟大的科学家多么好，多么神气啊，要想做到这一点，就必须好好学习。” </p><p>“班上一个调皮鬼对此并不满意。他说：“兴许是这样，可是，假如他坐在学校里，埋头书本，那他就什么也发现不了啦。” </p>";
    // this.owner_signdate=this.contract.owner_signdate? this.$global.stamptodate(this.contract.owner_signdate):"";
    // this.agent_signdate=this.contract.agent_signdate?this.$global.stamptodate(this.contract.agent_signdate):'';
  },
  computed: {
    owner_signdate: function() {
      return this.contract.owner_signdate
        ? this.$global.stamptodate(this.contract.owner_signdate)
        : "";
    },
    agent_signdate: function() {
      return this.contract.agent_signdate
        ? this.$global.stamptodate(this.contract.agent_signdate)
        : "";
    }
  },
  mounted() {
    this.DHTMLpagenation(this.contract.article);
    // this.content = "";
  },
  methods: {
    DHTMLpagenation(content) {
      this.content = content;
      this.contentLength = content.length;
      this.pageSizeCount;
      this.perpageLength = 500;
      //default perpage byte length.
      this.currentPage = 1;
      //this.regularExp=/.+[\?\&]{1}page=(\d+)/;
      this.regularExp = /\d+/;
      this.divDisplayContent;
      this.contentStyle = null;
      this.strDisplayContent = "";
      this.divDisplayPagenation;
      this.strDisplayPagenation = "";
      arguments.length == 2 ? (perpageLength = arguments[1]) : "";

      this.divDisplayContent = document.querySelector(".middle");
      this.divDisplayPagenation = document.querySelector("#divPagenation");

      // console.log(component);

      // this.divDisplayPagenation.appendChild(component.$el);
      this.initialize();

      //   return this;
    },
    initialize() {
      this.divDisplayContent.className =
        this.contentStyle != null ? this.contentStyle : "divContent";
      // console.log(divDisplayContent.className);

      if (this.contentLength <= this.perpageLength) {
        this.strDisplayContent = this.content;
        this.divDisplayContent.innerHTML = this.strDisplayContent;
        return null;
      }

      this.pageSizeCount = Math.ceil(this.contentLength / this.perpageLength);

      
      this.total=this.pageSizeCount;
      // console.log(this.total);
      
      this.goto(this.currentPage);
    },
    goto(iCurrentPage) {
      // console.log(iCurrentPage);
      
      if (this.regularExp.test(iCurrentPage)) {
        this.currentPage = iCurrentPage;
        // console.log(this.content);
        this.strDisplayContent = this.content.substr(
          (this.currentPage - 1) * this.perpageLength,
          this.perpageLength
        );
        // console.log(this.strDisplayContent);
      } else {
        alert("page parameter error!");
      }
      this.displayPage();
      this.displayContent();
    },
    displayContent() {
      this.divDisplayContent.innerHTML = this.strDisplayContent;
    },
    displayPage() {
      this.strDisplayPagenation = "分页：";
      // if (this.currentPage && this.currentPage != 1) {
      // this.strDisplayPagenation +=
      //   '<a href="javascript:void(0)" @click="previous()">上一页</a>&nbsp;&nbsp;';
      // } else this.strDisplayPagenation += "上一页&nbsp;&nbsp;";

      // console.log(this.strDisplayPagenation);

      for (let i = 1; i <= this.pageSizeCount; i++) {

        // if (i != this.currentPage)
        // this.strDisplayPagenation +=
        //   '<a href="javascript:void(0)" @click="goto(' +
        //   i +
        //   ');">' +
        //   i +
        //   "</a>&nbsp;&nbsp;";
        // else this.strDisplayPagenation += i + "&nbsp;&nbsp;";
      }
      // console.log(this.strDisplayPagenation);
      // console.log(currentPage,pageSizeCount);

      if (this.currentPage && this.currentPage != this.pageSizeCount) {
        this.strDisplayPagenation +=
          "<a href='javascript:void(0)' @click='next()'>下一页</a>&nbsp;&nbsp;";
        //   console.log(strDisplayPagenation );
      } else this.strDisplayPagenation += "下一页&nbsp;&nbsp;";
      // console.log(this.strDisplayPagenation );
      // let a=this.strDisplayPagenation;
      //  str=this.strDisplayPagenation;

      // console.log(this.strDisplayPagenation);

      // strDisplayPagenation +=
      //   // `共${{pageSizeCount}}页，每页`
      //   //   " " +
      //   pageSizeCount +
      //   " 页，每页" +
      //   perpageLength +
      //   " 字符，调整字符数：<input type='text' value='" +
      //   perpageLength +
      //   "' id='ctlPerpageLength'><input type='button' value='确定' onclick='DHTMLpagenation.change(document.getElementById(\"ctlPerpageLength\").value);'>";

      // this.divDisplayPagenation.innerHTML = this.strDisplayPagenation;
      //   console.log(divDisplayPagenation);
    },
    next() {
      // with (this) {
      this.goto(this.currentPage + 1);
      // }
    }

    // contract_submit() {
    //   this.$loading();
    //   // if (this.content && this.signature) {
    //   this.$axios({
    //     method: "post",
    //     url: `${this.$baseurl3}/bsl_web/projectSign/sendInvestorsData`,
    //     data: this.$qs.stringify({
    //       projectId: this.$route.query.projectId,
    //       signId: this.$route.query.signId,
    //       signStatus: 2,
    //       signAgreement: JSON.stringify(this.$store.state.contract)
    //     })
    //   }).then(res => {
    //     this.$toast.clear();
    //     if (res.data.resultCode == 10000) {
    //       this.$dialog
    //         .alert({
    //           title: "提交成功",
    //           message: "返回我的项目"
    //         })
    //         .then(() => {
    //           this.$routerto("mysign");
    //         });
    //     } else if(res.data.resultCode==10051) {
    //       this.$dialog
    //         .alert({
    //           title: "提醒",
    //           message: "您的注册审核不通过，请前往我的-个人审核里修改"
    //         })
    //         .then(() => {
    //           // on close
    //           // this.$routerto("mysign");
    //         });
    //     }
    //   });
    //   // } else {
    //   //   this.$dialog
    //   //     .confirm({
    //   //       title: "请返回完成签名"
    //   //       // message: "弹窗内容"
    //   //     })
    //   //     .then(() => {
    //   //       // on confirm
    //   //     });
    //   // }
    //   // console.log(JSON.stringify(this.$store.state.contract));
    // }
  }
};
</script>
<style lang="scss">
#contract_component {
  width: 100%;
  height: 100%;
  .contract_component {
    border: 1px solid #b5b5b5;
    box-sizing: border-box;
    /*background: #f6f6f6;*/
    padding: 0.375rem 0.46875rem;
    width: 100%;
    height: 100%;
    /*overflow-y: auto;*/
    overflow-y: scroll;

    /*&::-webkit-scrollbar {!*滚动条整体样式*!*/
    /*  width: 0.2rem;     !*高宽分别对应横竖滚动条的尺寸*!*/
    /*  !*height: 1px;*!*/
    /*}*/
    /*&::-webkit-scrollbar-thumb {!*滚动条里面小方块*!*/
    /*  border-radius: 10px;*/
    /*  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
    /*  background: #535353;*/
    /*}*/
    /*&::-webkit-scrollbar-track {!*滚动条里面轨道*!*/
    /*  !*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*!*/
    /*  !*border-radius: 10px;*!*/
    /*  !*background: #EDEDED;*!*/
    /*}*/
    color: black;
    word-wrap: break-word;
    div.middle {
      min-height: 5rem;
      background: none;
      border: 0;
      width: 100%;
      white-space: pre-wrap; // !* css-3 *!*/
      white-space: -moz-pre-wrap; // !* Mozilla, since 1999 *!*/
      white-space: -o-pre-wrap;
    }
    div.ql-editor {
      font-size: 14px;
      overflow-y: initial;
      height: initial;
      padding: 0;
    }
    div.button {
      font-size: 12px;
      line-height: 14px;
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      ul {
        width: 40%;
        li {
          p {
            height: 1rem;
          }
          p.signature {
            text-align: center;
            height: 1.2rem;
            img {
              // width: 100%;
              // height: 1rem;
              /*width: auto;*/
              /*height: auto;*/
              max-width: 100%;
              max-height: 100%;
            }
          }
          p:nth-child(1) {
            position: relative;
            span {
              position: absolute;
              line-height: 0.44rem;
              word-break: break-all;
              bottom: 0;
            }
            /*line-height:1rem;*/
            line-height: initial;
          }
          p:nth-child(2) {
            font-weight: 600;
            border-top: 1px solid black;
          }
        }
        li:nth-of-type(1) {
          margin-bottom: 0.6rem;
          nav {
            font-weight: 600;
          }
          h3 {
            height: 3rem;
            line-height: initial;
          }
        }
      }
    }
  }
}
</style>
