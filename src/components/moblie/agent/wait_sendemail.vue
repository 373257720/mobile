<template>
  <div id="a_wait_sendemail">
    <!-- <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约请求
    </nav>-->
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
        <commoninvestors :investor_infor="investor_infor"></commoninvestors>
      </div>
      <article>
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <div class="owner_confirmed">
          <van-divider>{{$t('agent.InvestmentBankConfirmed')}}</van-divider>
          <p>{{$t('agent.TheInvestmentBankHasConfirmed')}}</p>
        </div>
        <footer>
          <aside>
            <button @click="summit">{{$t('agent.SendEmailToInvestors')}}</button>
          </aside>
        </footer>
        <van-dialog v-model="show2" :show-confirm-button="false">
          <footer class="email">
            <p>{{$t('investor.PleaseEnterInvestorEmail')}}</p>
            <p class="reminder">{{show}}</p>
            <div class="emailadress">
              <van-field v-model="emailadress" clearable />
            </div>
            <aside>
              <button @click="submit_email">{{$t('common.Determine')}}</button>
              <button @click="cancel">{{$t('common.Cancel')}}</button>
            </aside>
          </footer>
        </van-dialog>
      </article>
    </main>
    <!--    <mbottom></mbottom>-->
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      title: "",
      dad_text: this.$t("agent.InvitationToBeSentToInvestors"),
      show2: false, //邮箱开关
      show: "", //邮箱验证信息
      custmoers_obj: {},
      investorsId: "",
      emailadress: "",
      nav_lists: {
        financingStage: {
          name: this.$t("agent.FinancingStage"),
          response: ""
        },
        committedCount: {
          name: this.$t("agent.NumberOfinvestorsHaveSubmitted"),
          response: ""
        },
        interestProjectCount: {
          name: this.$t("agent.Numberofprojectsinterested"),
          response: ""
        }
      },
      details_lists: {
        projectIndustry: {
          name: this.$t("common.Industry"),
          response: ""
        },
        projectArea: {
          name: this.$t("common.region"),
          response: ""
        },
        projectCompany: {
          name: this.$t("common.CompanyName"),
          response: ""
        },
        currencyType: {
          name: this.$t("common.Currency"),
          response: ""
        },
        collectMoney: {
          name: this.$t("common.FundingAmount"),
          collectMoneyMin: "",
          collectMoneyMax: ""
        },
        projectMobile: {
          name: this.$t("common.ContactNumber"),
          response: ""
        },
        projectEmail: {
          name: this.$t("common.Email"),
          response: ""
        },
        signStatus: {
          name: this.$t("common.ContractStatus"),
          response: "",
          classname: "red"
        },
        projectDescribe: {
          name: this.$t("common.ProjectDescription"),
          response: ""
        },
        projectDetail: {
          name: this.$t("common.ProjectDetails"),
          response: ""
        },
        potentialInvestorsTags: {
          name: this.$t("common.potentialInvestors"),
          response: ""
        }
      },
      investor_infor: {
        investorsType: {
          name: this.$t("agent.InvestorType"),
          response: ""
        },
        investorsCompany: {
          name: this.$t("agent.InvestorCompany"),
          response: ""
        },
        investorsName: {
          name: this.$t("agent.InvestorName"),
          response: ""
        },
        investorsArea: {
          name: this.$t("agent.InvestorRegion"),
          response: ""
        }
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (to.name == "uploadtoblock") {
      next({ path: "/mysign" });
    } else {
      next();
    }
  },
  created() {
    this.$loading();
    let details = this.$route.query;
    this.agent_beforesend();
    this.$global
      .goods_deatails(
        `${this.$baseurl}/bsl_web/project/getProjectDetails`,
        "get",
        {
          projectId: details.projectId,
          signStatus: details.signStatus,
          signId: details.signId || -1
        },
        this.details_lists,
        this.nav_lists,
        this.investor_infor,
        {}
      )
      .then(res => {
        console.log(res);
        this.title = res.title;
        // this.investorsId = res.investorsId;
        this.$toast.clear();
        if (res.projectLifeCycle == -1) {
          this.$dialog
            .alert({
              title: this.$t("common.TheItemNoLongerExists")
            })
            .then(() => {
              this.$router.go(-1);
            });
          return;
        }
      });
  },
  methods: {
    cancel() {
      this.show2 = false;
      this.show = "";
      this.emailadress = "";
    },
    // 提交
    summit() {
      this.show2 = true;
    },
    // 中间人发送邮件前专用
    agent_beforesend() {
      this.$global
        .get_encapsulation(`${this.$baseurl}/bsl_web/project/getDetails`, {
          signId: this.$route.query.signId
        })
        .then(res => {
          if (res.data.resultCode == 10000) {
            this.investorsId = res.data.data.investorsId;
            this.picUrl = res.data.data.investorsId.picUrl;
            this.custmoers_obj = res.data.data;
            console.log(this.custmoers_obj);
          }
        });
    },
    submit_email() {
      this.show = "";
      console.log(this.custmoers_obj);
      let companyname;
      let agent_name;
      if (this.custmoers_obj.userIdentityType1 == 2) {
        companyname = this.custmoers_obj.userCompanyEn1;
      } else if (this.custmoers_obj.userIdentityType1 == 1) {
        companyname = this.custmoers_obj.userName1;
      }
      if (this.custmoers_obj.userIdentityType4 == 1) {
        agent_name = this.custmoers_obj.userName4;
      } else if (this.custmoers_obj.userIdentityType4 == 2) {
        agent_name = this.custmoers_obj.userCompanyEn4;
      }
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
                                       src="${this.custmoers_obj.picUrl}"
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
                                <div>尊敬的投資人，您有壹個投資項目，由下列中間人把項目方推薦給您
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
                                <div>${agent_name}</div>
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
                                <div>${
                                  this.custmoers_obj.projectName
                                    ? this.custmoers_obj.projectName
                                    : ""
                                }</div>
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
                                <div>${companyname}</div>
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
                                <div>如您還未在系統注冊賬號，請先按以下連接註冊 <a href="${
                                  this.$baseurl3
                                }/#/register">http://www.bit-bro.biz/#/register</a>。注冊完成后，再按以下按鈕登錄操作。</div>
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
                              <a href="${
                                this.$baseurl3
                              }/#/i_emailto_confirm?projectLan=${
        this.custmoers_obj.projectLan
      }&signId=${
        this.custmoers_obj.signId
      }" class="button" style="text-decoration:none;">
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
      var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (reg.test(this.emailadress)) {
        this.$loading();
        this.$global
          .post_encapsulation(
            `${this.$baseurl}/bsl_web/projectSign/sendProject4`,
            {
              signId: this.$route.query.signId,
              memberEmail: this.emailadress,
              investorsId: this.investorsId,
              emailData: letter
            }
          )
          .then(res => {
            this.$toast.clear();
            this.show2 = false;
            if (res.data.resultCode == 10000) {
              let query1 = Object.assign({}, this.$route.query, {
                signStatus: 9
              });
              this.$router.push({ query: query1 });
              this.$dialog
                .alert({
                  title: this.$t("agent.SentSuccessfully"),
                  message: this.$t(
                    "agent.PleaseWaitForInvestorsToConfirmAndImproveTheInformation"
                  )
                })
                .then(() => {
                  this.$routerto("mysign");
                });
            } else {
              this.$dialog
                .alert({
                  title: res.data.resultDesc
                })
                .then(() => {});
            }
          });
      } else {
        this.show = this.$t("agent.EmailFormatIsIncorrect");
      }
    }
  }
};
</script>
<style lang="scss">
#a_wait_sendemail {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .owner_confirmed {
    margin-bottom: 0.5rem;
    .van-divider {
      background: #f2f2f2;
      border-color: #d2d2d2;
      padding: 0 2rem;
      margin: 0;
      color: #858585;
      font-size: 0.42rem;
    }
    p {
      padding: 0.2rem 0.5rem;
      color: #f36c69;
      text-align: center;
      line-height: 0.6rem;
      font-size: 0.42rem;
    }
  }

  .van-field__control {
    font-size: 0.4rem;
  }
  .van-dialog {
    font-size: 0.4rem;
  }
  .van-cell {
    font-size: 0.3rem;
    background: #f2f2f2;
    // padding: 0;
    padding: 0.2rem 0.3rem;
    margin: 0 0 0.5rem;
    border: 1px solid #b5b5b5;
  }
}
</style>
<style lang="scss" scoped>
#a_wait_sendemail {
  width: 100%;
  height: 100%;
  main {
    padding: 1.6rem 0 1.3rem 0;
    background: #ffffff;

    div.investors_infor {
      h2 {
        min-height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        word-break: break-all;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;
      }
    }
    article {
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.42rem;
        aside {
          height: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          button {
            height: 1rem;
            color: #ffffff;
            width: 8rem;
            border-radius: 5px;
          }
          button:nth-of-type(1) {
            background: #00adef;
          }
          button:nth-of-type(2) {
            background: #ff7c2c;
          }
        }
      }
      footer.email {
        padding: 0 0.6rem 0.5rem 0.6rem;
        p {
          text-align: center;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.42rem;
          margin-top: 0.5rem;
        }
        p.reminder {
          margin: 0;
          height: 1rem;
          font-size: 0.38rem;
          line-height: 1rem;
          color: #f36c69;
        }
        aside {
          height: 2.2rem;
          display: flex;
          font-size: 0.4rem;
          flex-direction: column;
          justify-content: space-between;
          button {
            height: 1rem;
            width: 8rem;
            border-radius: 5px;
            color: #ffffff;
          }
          button:nth-of-type(1) {
            background: #00adef;
          }
          button:nth-of-type(2) {
            background: #ff7c2c;
          }
        }
      }
    }
  }
}
</style>
