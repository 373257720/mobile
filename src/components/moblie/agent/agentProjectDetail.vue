<template>
  <div id="a_projectdetail">
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
       <!-- 已接受投资者数量，即投行审核通过的投资者
       已提交的投资者数量，即中间人推荐投资者给投行，填写投资者资料 -->
       <h3>{{$t("agent.NumberOfinvestorsHaveSubmitted1")}}({{ProjectDetail.committedCount}})/{{$t("agent.Signedinvestor")}}({{ProjectDetail.interestProjectCount}})</h3>
       <!-- <h3>已提交投资者数量({{ProjectDetail.committedCount}})/已接受投资者数量({{ProjectDetail.interestProjectCount}})</h3> -->
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
        <div  v-if="$route.query.signStatus4==9 || $route.query.signStatus4==41" class="projectsDetails-recommand">
          <!-- <div class="project-swipe">
            <van-icon name="arrow-left" @click="privous" />
            <p>
              Investors you recommend
              before
            </p>
            <div class="project-swipe-plugin">
              <van-swipe ref="swipe" :autoplay="3000" :show-indicators="false" @change="onChange">
                <template #default>
                  <van-swipe-item>
                    <h3>
                      Investors you recommend
                      before
                    </h3>
                    <ul>
                      <li>
                        <aside></aside>
                        <article>Recommended countdown: 5 days</article>
                      </li>
                      <li>
                        <aside></aside>
                        <article>Recommended countdown: 5 days</article>
                      </li>
                      <li>
                        <aside></aside>
                        <article>Recommended countdown: 5 days</article>
                      </li>
                      <li>
                        <aside></aside>
                        <article>Recommended countdown: 5 days</article>
                      </li>
                    </ul>
                  </van-swipe-item>
                  <van-swipe-item>2</van-swipe-item>
                  <van-swipe-item>3</van-swipe-item>
                </template>
              </van-swipe>
            </div>
            <p @click="$routerto('a_recommand_i')">See all</p>
            <van-icon name="arrow" @click="next" />
          </div> -->
          <div class="RecommendMore" @click="$routerto('recent_recommand', $route.query)">
            {{$t('project.RecommendMore')}}</div>
        </div>
        <div  v-if="$route.query.signStatus4>11 && $route.query.signStatus4<30" class="recommnandInfo">
        <h3 v-if="$route.query.signStatus4>11 && $route.query.signStatus4<26">你推荐的中间人资料</h3>
        <h3 v-if="$route.query.signStatus4>49 && $route.query.signStatus4<55">你推荐的投资人信息</h3>
        <ul>
          <li v-for="(value,key) in middlemanInfo" :key="key" :class="{'potentialInvestorsTags':value.classname}">
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
       <!-- 磋商结果：0投行填写建议磋商的分成比例；
       1中间人a反建议，
       2投行反建议磋商，
       3投行拒绝，
       4中间人a拒绝，
        5中间人a同意分成比例，
        6投行同意分成比例,
        7投行签署合约，
        8中间人a签署合约
        ，9中间人b反建议磋商
        ，10，
        中间人a发送填写好的佣金分成建议 ，
        11中间人b拒绝，
        12中间人b同意分成比例 -->
          <p class="underline" @click="signNDA(0)" v-if="signNdaStatus===0">{{$t("project.SignNDAterms")}}</p>
          <p  v-if="signNdaStatus===1">等待投行签约NDA</p>
          <p class="underline" @click="signNDA(2)" v-if="signNdaStatus===2">等待您签约NDA</p>
          <p  v-if="signNdaStatus===3">NDA签署待上链</p>
          <p  class="underline" @click="signNDA(4)" v-if="signNdaStatus===4">下载NDA合同</p>
          <van-button
            v-if="$route.query.signStatus4==2 && sharingResult===0"
            @click="goto"
          >{{$t('project.Contractwithibank')}}</van-button>
          <van-button
            v-if="$route.query.signStatus4==2 && (sharingResult===1 || sharingResult===2 || sharingResult===6)"
           @click="$routerto('A_bargin',$route.query)"
          >和投行磋商</van-button>
          <van-button
            v-if="$route.query.signStatus4==7"
           @click="$routerto('a_previewContract',Object.assign({sharingResult:sharingResult},$route.query))"
          >和投行签约</van-button> 
          <van-button
            v-if="$route.query.signStatus4==9"
           @click="getContractParams"
          >下载和投行签约合同</van-button> 
          <van-button
            v-if="$route.query.signStatus4==18"
            @click="goto"
          >{{$t('project.Contractwithibank')}}</van-button>
           <van-button
            v-if="$route.query.signStatus4==19 "
            @click="$routerto('middmanAbargin',$route.query)"
          >和中间人b磋商</van-button>
           <div v-if="$route.query.signStatus4==21">
            <van-button
           @click="$routerto('middmanAbargin',$route.query)"
          >中间人a签约</van-button> 
          </div>
          <div v-if="$route.query.signStatus4==30">
         <van-button
           @click="signStatus30(32)"
          >拒绝签约</van-button> 
            <van-button
           @click="signStatus30(31)"
          >同意签约</van-button> 
          </div>
           <div v-if="$route.query.signStatus4==34">
          <van-button
           @click="$routerto('a_previewContract',$route.query)"
          >确认中间人a的合同</van-button> 
          </div>
          <div v-if="$route.query.signStatus4==35">
            <van-button
           @click="$routerto('middlemanBargin',$route.query)"
          >和中间人a磋商</van-button> 
          </div>
             <div v-if="$route.query.signStatus4==38">
            <van-button
           @click="$routerto('a_previewContract', Object.assign({sharingResult:sharingResult},$route.query))"
          >中间人b签约</van-button> 
          </div>
           <div v-if="$route.query.signStatus4==41 || $route.query.signStatus4==25">
            <van-button
           @click="getContractParams"
          >下载和中间人签约的合同</van-button> 
          </div>
              <!-- <div v-if="$route.query.signStatus4==21">
            <van-button
           @click="$routerto('middmanAbargin',$route.query)"
          >和中间人b签约</van-button> 
          </div> -->
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
    ></DialogMsg>
    <!-- <DialogMsg
      :remindervisible.sync="remindervisible2"
      :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText"
      @comfirmFromDialog="gotoNDA"
      :title="title"
      :showCancel="true"
      :msg="msg"
    ></DialogMsg>-->
  </div>
</template>
<script>
export default {
  name: "a_projectdetail",

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
      signNdaStatus: null,
      sharingResult: null,
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
      articleoffsetHeight: 0,
      projectDescribeHeight: 0,
    };
  },
  created() {
    console.log(this.$store.state);
  },
  activated() {
    this.projectId = this.$route.query.projectId;
    this.signStatus4 = this.$route.query.signStatus4;
    this.signId = this.$route.query.signId;
    this.middlemanId = this.$route.query.middlemanId;
    if (this.signStatus4 > 11 && this.signStatus4 < 26) {
      // 中间a详情
      this.getProjectDetailsAndNextMiddleman();
    } else if (this.signStatus4 > 29 && this.signStatus4 < 42) {
      // 中间人b
      this.getProjectDetailsAndParentMiddleman();
    } else {
      this.getProjectDetails();
    }
  },
  methods: {
    getProjectDetailsAndParentMiddleman() {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProjectDetails/getProjectDetailsAndParentMiddleman`,
          {
            signId: this.$route.query.signId,
            projectId: this.$route.query.projectId,
            signUserId4: this.$route.query.signUserId4,
            middlemanId: this.$route.query.middlemanId,
            parentMiddlemanId: this.$route.query.parentMiddlemanId,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            console.log(res);
            let result = res.data.data;
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
                    this.projectItem[key].content = eval(
                      "(" + result[key + this.$global.lan()] + ")"
                    );
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

            this.middlemanInfo.userIdentityType.content = this.$t(
              this.$global.investorsType[result.userIdentityType]
            );
            this.middlemanInfo.recommendEmail.content = result.recommendEmail;
            this.sharingResult = result.sharingResult;
            this.signNdaStatus = result.signNdaStatus;
            console.log(this.signNdaStatus);
            this.$nextTick(() => {
              this.articleoffsetHeight = this.$refs.article.offsetHeight;
              this.projectDescribeHeight = this.$refs.projectDescribe.offsetHeight;
              if (this.projectDescribeHeight > this.articleoffsetHeight) {
                this.isshowDropdown = true;
              }
            });
          } else {
            this.$dialog
              .alert({
                message: res.data.resultDesc,
              })
              .then(() => {});
          }
        });
    },
    getContractParams() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/project/getViewContractPdfUrl`,
          {
            middlemanId: this.$route.query.middlemanId,
            type: true,
          }
        )
        .then((res) => {
          if (res.data.resultCode == 10000) {
            this.downloadContract(res.data.data);
          } else {
            this.$dialog
              .alert({
                // title: "标题",
                message: res.data.resultDesc,
              })
              .then(() => {
                // on close
              });
          }
        });
    },
    downloadContract(fileUrl) {
      window.location.href = `${this.$axios.defaults.baseURL}/bsl_web/upload/downloadFile?X_Token=${this.$store.state.X_Token}&fileUrl=${fileUrl}`;
    },
    goto() {
      this.$routerto("agentsignContractStep1", {
        signId: this.$route.query.signId,
        middlemanId: this.$route.query.middlemanId,
        signStatus4: this.$route.query.signStatus4,
      });
    },
    getProjectDetails() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectDetails`,
          {
            projectId: this.$route.query.projectId,
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            signStatus4: this.$route.query.signStatus4,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            let data = res.data.data.data;
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
            this.sharingResult = res.data.data.sharingResult;
            if (this.signStatus4 < 50) {
            }
            this.signNdaStatus = res.data.data.signNdaStatus;
            // console.log(this.signNdaStatus);
            this.$nextTick(() => {
              this.articleoffsetHeight = this.$refs.article.offsetHeight;
              this.projectDescribeHeight = this.$refs.projectDescribe.offsetHeight;
              if (this.projectDescribeHeight > this.articleoffsetHeight) {
                this.isshowDropdown = true;
              }
            });
          } else {
            this.$dialog
              .alert({
                message: res.data.resultDesc,
              })
              .then(() => {});
          }

          // this.ProjectDetail=res.data.data.data
          // console.log(this.ProjectDetail);
        });
    },
    getProjectDetailsAndNextMiddleman() {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProjectDetails/getProjectDetailsAndNextMiddleman`,
          {
            projectId: this.$route.query.projectId,
            signId: this.$route.query.signId,
            signUserId4: this.$route.query.signUserId4,
            middlemanId: this.$route.query.middlemanId,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            console.log(res);
            let result = res.data.data;
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
                    this.projectItem[key].content = eval(
                      "(" + result[key + this.$global.lan()] + ")"
                    );
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
          } else {
            this.$dialog
              .alert({
                message: res.data.resultDesc,
              })
              .then(() => {});
          }
          // this.ProjectDetail=res.data.data.data
          // console.log(this.ProjectDetail);
        });
    },
    clickInterested() {
      // this.$store.commit("isloading", true);
      // this.$global
      //   .get_encapsulation(
      //     `${this.$axios.defaults.baseURL}/bsl_web/projectSign/interested`,
      //     { projectId: this.projectId, projectUserId: "263" }
      //   )
      //   .then((res) => {
      //     this.$store.commit("isloading", false);
      //     this.remindervisible = true;
      //     this.msgtype = "interested";
      //     // this.msg = "您还可以签署NDA来获取该项目更多的资讯";
      //     this.msg = "您已成功申请项目";
      //   });
    },
    signStatus30(isAgree) {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/middlemanBConfirm`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            signStatus: isAgree,
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
                this.$replaceto("mysign");
              }
            });
        });
    },
    // gotoNDA() {
    //   this.remindervisible = false;
    //   this.$routerto("ndaClause");
    // },
    comfirmFromDialog(data) {
      this.remindervisible = false;
      this.$$routerto("projectStatus");
    },
    signNDA(num) {
      if (num === 0) {
        this.$dialog
          .confirm({
            title: "Request project details",
            message: "You can sign the NDA to get more information",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          })
          .then(() => {
            // this.$routerto("ndaClause");
            this.$global
              .get_encapsulation(
                `${this.$axios.defaults.baseURL}/bsl_web/projectNda/middlemanSubmitSignNda`,
                { middlemanId: this.middlemanId, signId: this.signId }
              )
              .then((res) => {
                if (res.data.resultCode == 10000) {
                  this.signNdaStatus = 1;
                }
                this.$dialog
                  .alert({
                    message: res.data.resultDesc,
                  })
                  .then();
              });
          })
          .catch(() => {
            // on cancel
          });
      } else if (num === 2) {
        this.$routerto("aNdaRoot", this.$route.query);
      } else if (num === 4) {
        this.$store.commit("isloading", true);
        this.$global
          .get_encapsulation(
            `${this.$axios.defaults.baseURL}/bsl_web/projectNda/getSignNdaContent`,
            {
              signId: this.$route.query.signId,
              middlemanId: this.$route.query.middlemanId,
            }
          )
          .then((res) => {
            this.$store.commit("isloading", false);
            if (res.data.resultCode == 10000) {
              let ndaurl = res.data.data;
              this.downloadFile("下载nda合同", ndaurl);
            } else {
              this.$dialog
                .alert({
                  message: res.data.resultDesc,
                })
                .then();
            }
          });
      }
    },
    downloadFile(fileName, data) {
      if (!data) {
        return;
      }
      window.location.href = `${this.$axios.defaults.baseURL}/bsl_web/upload/downloadFile?X_Token=${this.$store.state.X_Token}&fileUrl=${data}`;
      // this.$global
      //   .get_encapsulation(
      //     `${this.$axios.defaults.baseURL}/bsl_web/upload/downloadFile`,
      //     {
      //       fileUrl: data,
      //     }
      //   )
      // this.$axios
      //   .get(
      //     `${this.$axios.defaults.baseURL}/bsl_web/upload/downloadFile`,
      //     {
      //       X_Token: this.$store.state.X_Token,
      //       fileUrl: data,
      //     },
      //   )

      // console.log(data);
      // let url = window.URL.createObjectURL(new Blob([data]));
      // let link = document.createElement("a");
      // link.style.display = "none";
      // link.href = url;
      // link.setAttribute("download", fileName);
      // document.body.appendChild(link);
      // link.click();
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
#a_projectdetail {
  main {
    // padding-top: vw(212);
    padding: vw(192) vw(70) vw(80);
    color: #4f3dad;
    // .recommnandInfo{
    //   margin-bottom: vw(60);
    //   ul{
    //     li:nth-type-of(4){
    //       margin-bottom: 0;
    //     }
    //   }
    // }
    .projectsDetails-recommand {
      color: #ffffff;
      div.project-swipe {
        width: 100%;
        // height: vw(594);
        background: #3ab5cc;
        border-radius: vw(30);
        margin-bottom: vw(36);
      }
      div.RecommendMore {
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
          // width: vw(48);
          // height: vw(48);
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
    }
  }
}
</style>
