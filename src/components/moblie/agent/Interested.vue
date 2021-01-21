<template>
  <div id="agentProjectDetail">
    <commonnav>
      {{$t('common.ProjectDetails')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
      <div class="mhome-tag">
        <h2>{{ProjectDetail.projectName}}</h2>
        <h3>Signed intermediary({{ProjectDetail.committedCount}})/Signed investor({{ProjectDetail.interestProjectCount}})</h3>
        <div class="projectMoney">
          <p>
            <span class="icon">
              <i class="iconfont icon-bitbroicon_setting"></i>
            </span>
            <span>{{ProjectDetail.projectIndustry}}</span>
          </p>
          <p>
            <span class="currencyType">{{ProjectDetail.currencyType}}</span>
            <span>{{ProjectDetail.collectMoneyMin}}</span>
            <span>-</span>
            <span>{{ProjectDetail.collectMoneyMax}}</span>
          </p>
        </div>
        <div class="projectDetail">
          <aside class="iconfont icon-3"></aside>
          <div>
            <article ref="article" :style="{height:articleHight}">
              <p
                class="projectDescribe"
                v-html="ProjectDetail.projectDescribe"
                ref="projectDescribe"
              ></p>
            </article>
            <p class="drop" v-if="isshowDropdown">
              <van-icon @click="dropdown" :class="{'rotate1':articleHight}" name="arrow-down" />
            </p>
          </div>
        </div>
        <ul>
          <li v-for="(value,key) in projectItem" :key="key" :class="{'potentialInvestorsTags':value.classname}">
            <aside class="iconfont" :class="value.tag"></aside>
            <p  v-if="key=='potentialInvestorsTags'">
              <section v-for="(item,idx) in value.content" :key="idx">
                <span>{{idx+1}}.</span>
                <span>{{item}}</span>
              </section>
            </p>
            <p v-else>{{value.content}}</p>
          </li>
        </ul>
        <footer>
           <!-- <p @click="signNDA">{{$t("project.SignNDAterms")}}</p> -->
          <van-button @click="clickInterested">{{$t('project.Interested')}}</van-button>    
          <!-- <button @click="clickInterested">{{$t('project.Interested')}}</button> -->
          <!-- <button @click="$routerto('signContractStep1')">{{$t('project.SignContract')}}</button>
          <button @click="$routerto('signContractStep1')">{{$t('project.Contractwithibank')}}</button>-->
        </footer>
      </div>
    </main>
    <DialogMsg
      :remindervisible.sync="remindervisible"
      :confirmButtonText="confirmButtonText"
      @comfirmFromDialog="comfirmFromDialog"
      :title="title"
      :msgtype="msgtype"
      :msg="msg"
    ></DialogMsg>
  </div>
</template>
<script>
export default {
  name: "agentProjectDetail",
  data() {
    return {
      current: 0,
      msg: "",
      msgtype: "",
      remindervisible2: false,
      confirmButtonText: "",
      cancelButtonText: "",
      title: "",
      remindervisible: false,
      articleHight: null,
      isshowDropdown: false,
      ProjectDetail: {
        projectName: "",
        currencyType: "",
        committedCount: 0,
        projectIndustry: "",
        interestProjectCount: 0,
        collectMoneyMin: "",
        collectMoneyMax: "",
        projectDescribe: "",
      },
      projectItem: {
        // projectStatus: null,
        projectCompany: {
          tag: "icon-bitbroicon2",
          content: "",
        },
        projectMobile: {
          tag: "icon-bitbroicon4",
          content: "",
        },
        projectEmail: {
          tag: "icon-bitbroicon5",
          content: "",
        },
        financingStage: {
          tag: "icon-bitbroicon6",
          content: "",
        },
        potentialInvestorsTags: {
          tag: "icon-bitbroicon7",
          content: [],
          classname: true,
        },
      },
      projectUserId: null,
      articleoffsetHeight: 0,
      projectDescribeHeight: 0,
    };
  },
  created() {
    this.projectId = this.$route.query.projectId;
    this.getProjectDetails();
  },
  mounted() {},
  methods: {
    getProjectDetails() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/project/getProjectDetails`,
          { projectId: this.projectId }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            let data = res.data.data.data;
            this.projectUserId = data.projectUserId;
            for (let i in data) {
              for (let key in this.ProjectDetail) {
                if (key === i) {
                  if (key == "projectName") {
                    this.ProjectDetail[key] = data[key + this.$global.lan()];
                  } else if (
                    key == "collectMoneyMin" ||
                    key == "collectMoneyMax"
                  ) {
                    this.ProjectDetail[key] = this.$global.formatNum(data[key]);
                  } else if (key == "projectIndustry") {
                    this.ProjectDetail[key] = eval(
                      "(" + data[key + this.$global.lan()] + ")"
                    ).join(",");
                  } else if (key == "projectDescribe") {
                    this.ProjectDetail[key] = data[
                      key + this.$global.lan()
                    ].replace(/[\n\r]/g, "<br>");
                  } else {
                    this.ProjectDetail[key] = res.data.data.data[i];
                  }
                }
              }
              for (let key in this.projectItem) {
                if (key === i) {
                  if (key == "projectCompany") {
                    this.projectItem[key].content =
                      data[key + this.$global.lan()];
                  } else if (key == "potentialInvestorsTags") {
                    this.projectItem[key].content = eval(
                      "(" + data[key + this.$global.lan()] + ")"
                    );
                  } else if (key == "financingStage") {
                    this.projectItem[key].content = this.$global.financingStage[
                      data[i]
                    ];
                  } else if (key == "projectStatus") {
                    this.projectItem[key].content = this.$global.projectStatus[
                      data[i]
                    ];
                  } else {
                    this.projectItem[key].content = data[i];
                  }
                }
              }
            }

            this.$nextTick(() => {
              this.articleoffsetHeight = this.$refs.article.offsetHeight;
              this.projectDescribeHeight = this.$refs.projectDescribe.offsetHeight;
              if (this.projectDescribeHeight > this.articleoffsetHeight) {
                this.isshowDropdown = true;
              }
            });
          }

          // this.ProjectDetail=res.data.data.data
          // console.log(this.ProjectDetail);
        });
    },
    clickInterested() {
      this.msg = "";
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/interested`,
          { projectId: this.projectId, projectUserId: this.projectUserId }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.remindervisible = true;
          this.msgtype = "interested";
          // if(res.data.resultCode==10000)
          // this.msg = "您还可以签署NDA来获取该项目更多的资讯";
          this.msg = res.data.resultDesc;
        });
    },
    gotoNDA() {
      this.remindervisible = false;
      this.$routerto("ndaClause");
    },
    comfirmFromDialog(data) {
      console.log(data);
      this.remindervisible = false;
      this.$routerto("mysign");
      // if (data == "interested") {
      //   this.$routerto("ndaClause");
      // }
      // this.$routerto("ndaClause");
      //   setTimeout(() => {
      //     // this.title = "Sign NDA";
      //     // this.msg = "Please sign the NDA to get more information";
      //     // this.confirmButtonText = "Yes";
      //     // this.cancelButtonText = "No";\
      //     this.$routerto("ndaClause");
      //     // this.remindervisible2 = true;
      //   }, 300);
    },
 
    privous() {
      this.$refs.swipe.prev();
    },
    next() {
      this.$refs.swipe.next();
    },
    onChange(index) {
      this.current = index;
    },
    dropdown() {
      if (this.articleHight) {
        this.articleHight = null;
        return;
      }
      this.articleHight = this.$refs.projectDescribe.clientHeight + "px";
    },
  },
};
</script>
<style lang="scss" >
/* .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  } */
.van-swipe {
  // &:before{
  //     content: "\e630"
  // }
}
</style>
<style lang="scss" scoped>
#agentProjectDetail {
  main {
    // padding-top: vw(212);
    padding: vw(192) vw(70) vw(80);
    color: #4f3dad;
    .project-swipe {
      padding: vw(38) vw(80) vw(76);
      p:nth-of-type(1) {
        font-size: vw(36);
        font-weight: bold;
        line-height: vw(42);
        color: #ffffff;
        margin-bottom: vw(52);
      }

      p:nth-of-type(2) {
        margin-top: vw(62);
        font-size: vw(24);
        text-align: center;
        font-weight: bold;
        color: #ffffff;
        text-decoration: underline;
      }
      .project-swipe-plugin {
        width: vw(458);
        margin: 0 auto;
        h3 {
          font-size: vw(30);
          font-weight: bold;
          color: #ffffff;
        }
        li {
          display: flex;
          margin-bottom: vw(30);
          aside {
            width: vw(29);
            height: vw(29);
            background: #fff;
          }
          article {
            font-size: vw(24);
            font-weight: bold;
            line-height: vw(28);
            color: #ffffff;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }

        // background: red;
      }
      position: relative;
      .van-icon-arrow-left {
        position: absolute;
        top: 50%;
        font-size: vw(27);
        transform: translate(0, -50%);
        left: vw(24);
      }
      .van-icon-arrow {
        position: absolute;
        top: 50%;
        font-size: vw(27);
        transform: translate(0, -50%);
        right: vw(24);
      }
    }
    h2 {
      font-size: vw(50);
      font-weight: bold;
      line-height: vw(58);
      color: #4f3dad;
      margin-bottom: vw(34);
    }
    h3 {
      //   height: 28px;
      color: #4f3dad;
      font-size: vw(24);
      font-weight: bold;
      line-height: vw(30);
      margin-bottom: vw(34);
    }
    .projectMoney {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: vw(53);
      span.icon {
        align-self: center;
        margin-right: vw(20);
        font-size: vw(29);
      }

      p {
        // flex: 1;
        display: flex;
        align-items: center;
        span.currencyType {
          margin-right: vw(20);
        }
        span {
          font-size: vw(24);
          font-weight: bold;
        }
      }
      p:nth-of-type(1) {
        // margin-right: vw(20);
      }
    }

    .projectsDetails-recommand {
      color: #ffffff;
      .project-swipe {
        width: 100%;
        // height: vw(594);
        background: #3ab5cc;
        border-radius: vw(30);
        margin-bottom: vw(36);
      }
      .recommand {
        width: vw(602);
        height: vw(72);
        line-height: vw(72);
        text-align: center;
        background: #00f0ab;
        font-size: vw(26);
        border-radius: vw(16);
        margin-bottom: vw(104);
      }
    }
    .projectDetail {
      display: flex;
      margin-bottom: vw(56);
      aside {
        margin-right: vw(20);
        font-size: vw(29);
        // background: #4f3dad;
        // margin-right: vw(26);
      }
      div {
        flex: 1;
        font-size: vw(24);
        font-weight: bold;

        article {
          height: vw(210);
          overflow: hidden;
          line-height: vw(30);
          transition: all 0.8s ease-out;
          margin-bottom: vw(22);
          p:nth-of-type(1) {
          }
        }
        p.drop {
          text-align: center;
          .van-icon-arrow-down {
            transform-origin: center center;
            transform: rotate(0deg); //返回原点
            transition: transform 0.8s ease-out;
          }
          .van-icon::before {
            font-size: vw(30);

            font-weight: bold;
          }
          .rotate1 {
            transform-origin: center center;
            transform: rotate(180deg);
            transition: transform 1s ease-out;
          }
        }
      }
    }
    ul {
      li {
        display: flex;
        align-items: center;
        margin-bottom: vw(25);
        aside {
          font-size: vw(48);
          line-height: vw(48);
          border-radius: 50%;
          margin-right: vw(30);
        }
        p {
          flex: 1;
          margin: 0;
          font-weight: bold;
          font-size: vw(24);
        }
      }
      li.potentialInvestorsTags {
        align-items: flex-start;
      }
    }
    footer {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: vw(20);
        color: #00f0ab;

        text-decoration: underline;
        margin-bottom: vw(32);
      }
      button {
        min-width: vw(186);
        height: vw(72);
        background: #00f0ab;
        border-radius: vw(16);
        font-size: vw(26);
        line-height: vw(72);
        color: #ffffff;
      }
    }
  }
}
</style>
