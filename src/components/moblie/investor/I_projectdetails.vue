<template>
  <div id="I_projectdetails">
    <commonnav>
      {{$t('common.ProjectDetails')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <!-- <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template> -->
    </commonnav>
    <main>
      <div class="mhome-tag">
    <h2>{{ProjectDetail.projectName}}</h2>
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
        <footer >
         <div v-if="signStatus4==53">
             <button @click="refuse">{{$t('investor.Refuse')}}</button>
            <button @click="completeInfo()">完善资料</button>
         </div>
         <div v-if="signStatus4==54">
           <van-button  @click="$routerto('i_inverstor_infor',{investorsId:investorsId})">我的资料</van-button>
         </div>
        </footer>
      </div>
    </main>
    <DialogMsg
      :remindervisible.sync="remindervisible"
      :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText"
      @comfirmFromDialog="comfirmFromDialog"
      :title="title"
      :showCancel="true"
      :msg="msg"
      :msgtype="msgtype"
    ></DialogMsg>
  </div>
</template>
<script>
export default {
  name: "I_projectdetails",
  data() {
    return {
      current: 0,
      msg: "",
      msgtype: "",
      remindervisible2: false,
      confirmButtonText: "",
      cancelButtonText: "",
      title: "",
      investorsId:null,
      sharingResult: null,
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
      signNdaStatus: null,
      middlemanInfo: {
        userIdentityType: {
          tag: "icon-bitbroicon2",
          content: "",
        },
        userName: {
          tag: "icon-bitbroicon7",
          content: "",
        },
        userCountry: {
          tag: "icon-bitbroicon2",
          content: "",
        },
        recommendEmail: {
          tag: "icon-bitbroicon5",
          content: "",
        },
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
      letterObj: {
        picUrl: "",
        projectOwner: "",
        projectName: "",
        middlemanA: "",
        middlemanB: "",
      },
      articleoffsetHeight: 0,
      projectDescribeHeight: 0,
    };
  },
  created() {
    this.investorsGetProjectDetails();
    this.projectId = this.$route.query.projectId;
    this.signStatus4 = this.$route.query.signStatus4;
    this.signId = this.$route.query.signId;
    this.middlemanId = this.$route.query.middlemanId;
  },
  mounted() {
    console.log(process.env);
  },
  methods: {
    investorsGetProjectDetails() {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProjectDetails/investorsGetProjectDetails`,
          {
            projectId: this.$route.query.projectId,
            middlemanId: this.$route.query.middlemanId,
            signId: this.$route.query.signId,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            let result = res.data.data;
            this.investorsId=result.investorsId 
            for (let i in result) {
              for (let key in this.ProjectDetail) {
                if (key === i) {
                  if (key == "projectName") {
                    this.ProjectDetail[key] = result[key + this.$global.lan()];
                  } else if (
                    key == "collectMoneyMin" ||
                    key == "collectMoneyMax"
                  ) {
                    this.ProjectDetail[key] = this.$global.formatNum(
                      result[key]
                    );
                  } else if (key == "projectIndustry") {
                    if (result[key + this.$global.lan()].indexOf("[") > -1) {
                      this.ProjectDetail[key] = eval(
                        "(" + result[key + this.$global.lan()] + ")"
                      ).join(",");
                    }
                    this.ProjectDetail[key] = eval(
                      "(" + result[key + this.$global.lan()] + ")"
                    ).join(",");
                  } else if (key == "projectDescribe") {
                    this.ProjectDetail[key] = result[
                      key + this.$global.lan()
                    ].replace(/[\n\r]/g, "<br>");
                  } else {
                    this.ProjectDetail[key] = result[i];
                  }
                }
              }
              for (let key in this.projectItem) {
                if (key === i) {
                  if (key == "projectCompany") {
                    this.projectItem[key].content =
                      result[key + this.$global.lan()];
                  } else if (key == "potentialInvestorsTags") {
                    if (result[key + this.$global.lan()].indexOf("[") > -1) {
                      this.projectItem[key].content = eval(
                        "(" + result[key + this.$global.lan()] + ")"
                      );
                    }
                  } else if (key == "financingStage") {
                    this.projectItem[key].content = this.$global.financingStage[
                      result[i]
                    ];
                  } else if (key == "projectStatus") {
                    this.projectItem[key].content = this.$global.projectStatus[
                      result[i]
                    ];
                  } else {
                    this.projectItem[key].content = result[i];
                  }
                }
              }
            }
            if (result.userIdentityType == 1) {
              this.middlemanInfo.userName.content = result.userName;
            } else if (result.userIdentityType == 2) {
              this.middlemanInfo.userName.content =
                result["userCompany" + this.$global.language()];
            }
            if (
              Object.prototype.toString.call(result.userCountry) ==
              "[object String]"
            ) {
              if (this.$i18n.locale == "zh_CN") {
                this.middlemanInfo.userCountry.content = result.userCountry.split(
                  ","
                )[0];
              } else {
                this.middlemanInfo.userCountry.content = result.userCountry.split(
                  ","
                )[1];
              }
            }
            this.letterObj.picUrl = result.picUrl;
            this.letterObj.middlemanA =
              result.userIdentityType4 == 1
                ? result.userName4
                : result.userIdentityType4 == 2
                ? result["userCompany" + this.$global.language() + "4"]
                : "";
            this.letterObj.middlemanB = result.recommendEmail;
            this.letterObj.projectOwner =
              result["userCompany" + this.$global.language() + "1"];
            this.letterObj.projectName =
              result["projectName" + this.$global.lan()];

            this.middlemanInfo.userIdentityType.content = this.$t(
              this.$global.investorsType[result.userIdentityType]
            );
            this.middlemanInfo.recommendEmail.content = result.recommendEmail;
            this.sharingResult = result.sharingResult;
            this.signNdaStatus = result.signNdaStatus;

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

    refuse() {
      this.title = "提醒";
      this.msg = "是否确定拒绝这次合作?拒绝后无法撤销";
      this.msgtype = "No";
      this.confirmButtonText = this.$t("common.isyes");
      this.cancelButtonText = this.$t("common.isno");
      this.remindervisible = true;
    },
    comfirmFromDialog() {
      this.remindervisible = false;
      this.$store.commit("isloading", true);
      // @param signStatus=55 is refuse
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignThree/investorsAgree`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            signStatus: 55,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          this.$dialog
            .alert({
              message: res.data.resultDesc,
            })
            .then(() => {
              if (res.data.resultCode == 10000) {
                this.$replaceto("mysign", {
                  projectId: this.$route.query.projectId,
                });
              }
            });
        });
    },
    completeInfo() {
      // this.$routerto("P_signContractStep1", { projectId: this.projectId });
      this.$routerto("completeInfo", {
        projectId: this.projectId,
        signStatus4: this.signStatus4,
        signId: this.signId,
        middlemanId: this.middlemanId,
      });
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
</style>
<style lang="scss" scoped>
#I_projectdetails {
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

    div.isSuccessful,
    div.isFailed {
      nav {
        display: flex;
        justify-content: center;

        p {
          width: vw(332);
          height: vw(193);
          background: #3ab5cc;
          opacity: 1;
        }
      }
      section {
        display: flex;
        justify-content: space-between;

        margin-bottom: vw(70);
        span {
          font-size: vw(30);
          font-family: Helvetica Neue;
          font-weight: bold;
          line-height: vw(34);
          color: #3ab5cc;
        }
      }

      .Bname {
        > p {
          margin-bottom: vw(34);
          font-size: vw(30);
          font-weight: bold;
        }
      }
    }
    div.isSuccessful {
      header {
        color: #3ab5cc;
        font-weight: bold;
        margin-bottom: vw(60);
        span {
          font-size: vw(24);
          line-height: vw(28);
        }
        span:first-of-type {
          font-size: vw(60);
          font-weight: bold;
        }
      }
      footer {
        margin-bottom: vw(156);
        button {
          width: vw(250);
          height: vw(72);
          background: #00f0ab;
          opacity: 1;
          border-radius: vw(16);
        }
      }
    }
    div.isFailed {
      header {
        color: #3ab5cc;
        font-weight: bold;
        margin-bottom: vw(60);
        text-align: center;
        span {
          font-size: vw(24);
          font-weight: bold;
          color: #3ab5cc;
          opacity: 1;
        }
      }
      footer {
        margin-bottom: vw(156);
        article {
          width: vw(542);
          font-size: vw(20);
          font-family: Helvetica Neue;
          font-weight: bold;
          line-height: vw(22);
          color: #3ab5cc;
        }
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

        margin-bottom: vw(32);
      }
      p.underline {
        text-decoration: underline;
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
      button:nth-of-type(1) {
        margin-bottom: vw(30);
      }
    }
  }
}
</style>
