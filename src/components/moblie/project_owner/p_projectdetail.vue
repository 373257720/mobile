<template>
  <div id="p_projectdetail">
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
       <h3>已提交投资者数量({{ProjectDetail.committedCount}})/已接受投资者数量({{ProjectDetail.interestProjectCount}})</h3>      <div class="projectMoney">
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
        <div class="middleman" v-if="$route.query.signStatus4>11" >
        <h3 v-if="$route.query.signStatus4>11 && $route.query.signStatus4<26">被推荐人中间人信息</h3>
        <h3 v-if="$route.query.signStatus4>49 && $route.query.signStatus4<55">被推荐人投资人信息</h3>
        <ul v-if="($route.query.signStatus4>11 && $route.query.signStatus4<26) || ($route.query.signStatus4>49 && $route.query.signStatus4<55)">
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
        <footer >
          <p class="underline" @click="signNDA(1)" v-if="signNdaStatus==1">{{$t("project.SignNDAterms")}}</p>
          <p  v-if="signNdaStatus===2">等待中间人签约NDA</p>
          <p  v-if="signNdaStatus===3">NDA签署待上链</p>
          <p class="underline"  @click="signNDA(4)" v-if="signNdaStatus===4">下载NDA合同</p>
         <div v-if="signStatus4==1">
             <button @click="refuse">{{$t('investor.Refuse')}}</button>
            <button @click="ibankSignContractStep1()">{{$t('project.Interested')}}</button>
         </div>
         <div v-if="signStatus4==2 && (sharingResult===1 || sharingResult===2 || sharingResult===6)" >
           <van-button  @click="$routerto('p_bargin',$route.query)">磋商</van-button>
         </div>
         <div v-if="signStatus4==2 && sharingResult===5">
            <van-button  @click="$routerto('a_previewContract',Object.assign({sharingResult:sharingResult},$route.query))">签约</van-button>
         </div>
         <div v-if="signStatus4==4">
            <van-button  @click="$routerto('a_previewContract',Object.assign({sharingResult:sharingResult},$route.query))">签约</van-button>
         </div>
           <div v-if="signStatus4==9" >
              <van-button  @click="getContractParams">下载签约合同</van-button>
         </div>
         <div v-if="signStatus4==12" >
            <van-button  @click="ibankReviewedMiddleman(14)">拒绝</van-button>
          <van-button  @click="ibankReviewedMiddleman(15)">感兴趣</van-button>
         </div>
           <div v-if="signStatus4==16" >
          <van-button  @click="ibankSignContractStep1()">草拟中间人和中间人合约</van-button>

         </div>
         <div v-if="signStatus4==50" >
            <van-button  @click="ibankReviewedInvestor(52)">拒绝</van-button>
              <van-button  @click="ibankReviewedInvestor(53)">感兴趣</van-button>
         </div>
        </footer>
          <!-- <button @click="$routerto('P_signContractStep1')">{{$t('project.SignContract')}}</button> -->
          <!-- <button @click="$routerto('signContractStep1')">{{$t('project.Contractwithibank')}}</button> -->
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
    <!-- <DialogMsg
      :remindervisible.sync="remindervisible2"
      :confirmButtonText="confirmButtonText"
      @comfirmFromDialog="confirmrefuse"
      :title="title"
      :showCancel="false"
      :msg="msg"
    ></DialogMsg> -->
  </div>
</template>
<script>
export default {
  name: "p_projectdetail",
  data() {
    return {
      current: 0,
      msg: "",
      msgtype: "",
      remindervisible2: false,
      confirmButtonText: "",
      cancelButtonText: "",
      title: "",
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
    this.projectId = this.$route.query.projectId;
    this.signStatus4 = this.$route.query.signStatus4;
    this.signId = this.$route.query.signId;
    this.middlemanId = this.$route.query.middlemanId;
    if (
      this.$route.query.signStatus4 > 11 &&
      this.$route.query.signStatus4 < 26
    ) {
      //to middleman
      this.getProjectDetailsAndMiddleman();
    } else if (
      this.$route.query.signStatus4 > 49 &&
      this.$route.query.signStatus4 < 56
    ) {
      this.getProjectDetailsAndInvestors();
    } else {
      this.getProjectDetails();
    }
  },
  mounted() {
    console.log(process.env);
  },
  methods: {
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
    htmlSendtoEmail() {
      let letter = `<meta charset="utf-8" />
                <div class="content-wrap"
     style="margin: 0px auto; overflow: hidden; padding: 0px; width: 500px;border:1px solid #cccccc;">
  <div tindex="1" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
              <td
                style="width: 100%; max-width: 100%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 500px;">
                    <tbody>
                    <tr>
                      <td
                        style="direction: ltr; width: 500px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top;">
                        <div style="display: inline-block; vertical-align: top; width: 100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                 style="vertical-align: top;">
                            <tr>
                              <td
                                style="font-size: 0px; word-break: break-word; width: 500px; text-align: center; padding: 30px 0; ">
                                <div>
                                  <img height="auto" alt="" width="180" height="200"
                                       src="${this.letterObj.picUrl}"
                                       style="box-sizing: border-box; border: 0px; display: inline-block; outline: none; text-decoration: none; height: auto; max-width: 100%; padding: 0px;" />
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div tindex="2" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
              <td
                style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 150px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 20px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                <div>【信息】</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td
                style="width: 80%; max-width: 80%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 320px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 20px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: left; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                <div>尊敬的用户${this.letterObj.middlemanB}，您有壹個投資項目，由下列中間人把項目方推薦給您
                                  請核對及提供您的資料作系統紀錄和核實用途。
                                  閣下完成登錄核實程序后，投資銀行的負責人員將與您聯係並進一步提供投資項目相關資料。謝謝！</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div tindex="3" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
              <td
                style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 150px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 20px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                <div>【中间人】</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td
                style="width: 80%; max-width: 80%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 320px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 20px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: left; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                <div>${this.letterObj.middlemanA}</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div tindex="2" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
              <td
                style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 150px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 20px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                <div>【投资项目】</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td
                style="width: 80%; max-width: 80%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 320px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 20px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: left; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                <div>${this.letterObj.projectName}</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div tindex="4" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
              <td
                style="width: 20%; max-width: 20%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 150px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 150px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 20px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align: center; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                <div>【投资银行】</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td
                style="width: 80%; max-width: 80%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 320px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 20px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align:left; line-height: 20px; color: rgb(102, 102, 102); font-size: 14px; font-weight: normal;'>
                                <div>${this.letterObj.projectOwner}</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div tindex="5" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
              <td
                style="width: 100%; max-width: 100%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 400px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei";word-wrap:break-word;word-break:break-all; overflow-wrap: break-word; margin: 0px; text-align:left; line-height: 20px;  color: lightcoral; font-size: 14px; font-weight: normal;'>
                                <div>如您還未在系統注冊賬號，請先按以下連接註冊 <a href="${process.env.WEB_API}/#/homePage">http://www.bit-bro.biz/#/homePage</a>。注冊完成后，再按以下按鈕登錄操作。</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div tindex="5" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
 
              <td
                style="width: 100%; max-width: 100%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                         style="width: 400px;">
                    <tbody>
                    <tr>
                      <td
                        style='direction: ltr; width: 320px; font-size: 0px; padding-bottom: 0px; text-align: center; vertical-align: top; background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 10% 50%;'>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                               style="vertical-align: top;">
                          <tr>
                            <td align="left" style="font-size: 0px; padding: 10px 0;">
                              <div class="text"
                                   style='font-family: "Microsoft YaHei"; overflow-wrap: break-word; margin: 0px; text-align:center; line-height: 20px;  color: lightcoral; font-size: 14px; font-weight: normal;'>
                                <div>如果您已有账号，可以直接登录进行操作。</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div tindex="6" style="margin: 0px auto; max-width: 500px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           style='background-color: rgb(255, 255, 255); background-image: url(""); background-repeat: no-repeat; background-size: 100px; background-position: 1% 50%;'>
      <tbody>
      <tr>
        <td style="direction: ltr; font-size: 0px; text-align: center; vertical-align: top; width: 500px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="vertical-align: top;">
            <tbody>
            <tr>
              <td
                style="width: 100%; max-width: 100%; min-height: 1px; font-size: 14px; text-align: left; direction: ltr; vertical-align: top; padding: 0px;">
                <div class="full" style="margin: 0px auto; max-width: 500px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 500px;">
                    <tbody>
                    <tr>
                      <td align="center" vertical-align="middle"
                          style='font-size: 0px; word-break: break-word; width: 500px; padding: 30px 0; background-image: url(""); background-size: 100px; background-position: 10% 50%; background-repeat: no-repeat;'>
                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                               style="border-collapse: separate; line-height: 1;">
                          <tr>
                            <td align="center" bgcolor="#409EFF" valign="middle"
                                style="line-height: 1; background-color: rgb(64, 158, 255); border-radius:5px; cursor:pointer">
                              <a href="${process.env.WEB_API}/#/homePage"" class="button" style="text-decoration:none;">
                                <p style='font-family: "Microsoft YaHei";padding: 14px 54px; margin: 0px; color: rgb(255, 255, 255); line-height: 1; font-size: 14px; font-weight: normal; text-decoration: none; text-transform: none;'>
                                  <span>登錄系統並確認資料</span>
                                </p>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>`;

      // let emailData=``
      return letter;
    },
    ibankReviewedMiddleman(isAgree) {
      let letter = this.htmlSendtoEmail();
      console.log(letter);
      this.$dialog
        .confirm({
          title: "提醒",
          message: "请确认操作",
        })
        .then(() => {
          this.$store.commit("isloading", true);
          this.$global
            .post_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/ibankReviewedMiddleman`,
              {
                signStatus: isAgree,
                signId: this.$route.query.signId,
                emailData: letter,
                middlemanId: this.$route.query.middlemanId,
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
                    this.$routerto("mysign");
                  }
                  // on close
                });
            });
        });
    },
    ibankReviewedInvestor(isAgree) {
      let letter = this.htmlSendtoEmail();
      console.log(this.letterObj.middlemanA);
      this.$dialog
        .confirm({
          title: "提醒",
          message: "请确认操作",
        })
        .then(() => {
          this.$store.commit("isloading", true);
          this.$global
            .post_encapsulation(
              `${this.$axios.defaults.baseURL}/bsl_web/projectSignTwo/ibankReviewedInvestors`,
              {
                signStatus: isAgree,
                signId: this.$route.query.signId,
                emailData: letter,
                middlemanId: this.$route.query.middlemanId,
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
                    this.$routerto("mysign");
                  }
                  // on close
                });
            });
        });
    },
    getProjectDetailsAndMiddleman() {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProjectDetails/getProjectDetailsAndMiddleman`,
          {
            projectId: this.$route.query.projectId,
            recommendUserId: this.$route.query.recommendUserId,
            recommendedUserId: this.$route.query.recommendedUserId,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
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
            if (result.isDisplayUserName4) {
              this.letterObj.middlemanA =
                result.userIdentityType4 == 1
                  ? result.userName4
                  : result.userIdentityType4 == 2
                  ? result["userCompany" + this.$global.language() + "4"]
                  : "";
            } else {
              this.letterObj.middlemanA = result.bslName4;
            }
            console.log(this.letterObj.middlemanA);
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
    getProjectDetailsAndInvestors() {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProjectDetails/iBackGetProjectDetailsAndInvestors`,
          {
            projectId: this.$route.query.projectId,
            recommendUserId: this.$route.query.recommendUserId,
            recommendedUserId: this.$route.query.recommendedUserId,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
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
            if (result.isDisplayUserName4) {
              this.letterObj.middlemanA =
                result.userIdentityType4 == 1
                  ? result.userName4
                  : result.userIdentityType4 == 2
                  ? result["userCompany" + this.$global.language() + "4"]
                  : "";
            } else {
              this.letterObj.middlemanA = result.bslName4;
            }
            console.log(this.letterObj.middlemanA);
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
    getProjectDetails() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectDetails`,
          {
            projectId: this.projectId,
            signId: this.signId,
            middlemanId: this.middlemanId,
          }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            let data = res.data.data.data;
            this.sharingResult = res.data.data.sharingResult;
            this.signNdaStatus = res.data.data.signNdaStatus;
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
      // @param signStatus=3 is refuse
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/draftContractOrReject`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            signStatus: 3,
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
                this.$replaceto("projectSubStatus", {
                  projectId: this.$route.query.projectId,
                });
              }
            });
        });
    },
    ibankSignContractStep1() {
      // this.$routerto("P_signContractStep1", { projectId: this.projectId });
      this.$routerto("ibankSignContractStep1", {
        projectId: this.projectId,
        signStatus4: this.signStatus4,
        signId: this.signId,
        middlemanId: this.middlemanId,
      });
    },
    gotoNDA() {
      this.remindervisible = false;
      this.$routerto("ndaClause");
    },
    signNDA(num) {
      if (num == 1) {
        this.$routerto("ndaRoot", this.$route.query);
      } else if (num == 4) {
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
      // this.title = "Request project details";
      // this.msg = "You can sign the NDA to get more information";
      // this.confirmButtonText = "Yes";
      // this.cancelButtonText = "No";
      // this.remindervisible = true;
    },
    downloadFile(fileName, data) {
      if (!data) {
        return;
      }
      window.location.href = `${this.$axios.defaults.baseURL}/bsl_web/upload/downloadFile?X_Token=${this.$store.state.X_Token}&fileUrl=${data}`;
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
</style>
<style lang="scss" scoped>
#p_projectdetail {
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
