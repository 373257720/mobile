<template>
  <div id="a_wait_sendemail">
    <!-- <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约请求
    </nav>-->
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>

        <!-- <header>投资者资料</header> -->
        <commoninvestors :investor_infor="investor_infor"></commoninvestors>
      </div>
      <article>
        <!-- <header>项目详情</header> -->
        <boxx :nav_lists="nav_lists"></boxx>
        <commondetails :toson="details_lists"></commondetails>
        <div class="owner_confirmed">
          <van-divider>投行已确认</van-divider>
          <p>投行已经确认你所推荐的投资者，请尽快发送邮件给投资者</p>
        </div>
        <footer>
          <aside>
            <button @click="summit">发送邮件到投资者</button>
          </aside>
        </footer>
        <van-dialog v-model="show2" :show-confirm-button="false">
          <footer class="email">
            <p>请输入投资者邮箱</p>
            <p class="reminder" >{{show}}</p>
            <div class="emailadress">
              <van-field v-model="emailadress" clearable />
            </div>
            <aside>
              <button @click="submit_email">确定</button>
              <button @click="cancel">取消</button>
            </aside>
          </footer>
        </van-dialog>
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
      title: "",
      dad_text: "待发送邮件到投资者",
      show2: false, //邮箱开关
      show:'',//邮箱验证
      custmoers_obj: {},
      investorsId: "",
      emailadress: "",
      investor_infor: {
        investorsType: {
          name: "投资者类型:",
          response: ""
        },
        investorsCompany: {
          name: "投资者公司:",
          response: ""
        },
        investorsName: {
          name: "投资者姓名:",
          response: ""
        },
        investorsArea: {
          name: "投资者地区:",
          response: ""
        }
      },
      nav_lists: {
        financingStage: {
          name: "融资阶段",
          response: ""
        },

        committedCount: {
          name: "已提交</br>投资者数量",
          response: ""
        },
        interestProjectCount: {
          name: "项目方<br>有兴趣数量",
          response: ""
        },
      },
      details_lists: {
        projectIndustry: {
          name: "行业:",
          response: ""
        },
        projectArea: {
          name: "地区:",
          response: ""
        },
        // signStatu: {
        //   name: "项目状态:",
        //   response: "暂无"
        // },
        projectCompany: {
          name: "公司名称:",
          response: ""
        },
        currencyType: {
          name: "币种:",
          response: ""
        },
        collectMoney: {
          name: "集资额:",
          collectMoneyMin:'',
          collectMoneyMax: "",
        },
        projectMobile: {
          name: "联系电话:",
          response: ""
        },
        projectEmail: {
          name: "电邮:",
          response: ""
        },
        projectDescribe: {
          name: "项目简介:",
          response: ""
        }
      }
    };
  },
  beforeRouteLeave(to,from,next){
      console.log(to,from)
        if(to.name=='uploadtoblock'){
          // console.log(123)
           next({path: '/mysign'});
        }else{
          next()
        }
  },
  created() {
    this.$loading();
    this.agent_beforesend();
    let details = this.$route.query;
    this.$global
      .goods_deatails(
        `${
          this.$baseurl
        }/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${
          details.projectId
        }&signStatus=${details.signStatus}&signId=${
          details.signId ? details.signId : -1
        }`,
        "get",
        {},
        this.details_lists,
        this.nav_lists,
        this.investor_infor
      )
      .then(res => {
        console.log(res);
        this.title = res.title;
        this.$toast.clear();
      });
  },
  methods: {
    cancel() {
      this.show2 = false;
           this.show='';
    },
    // 提交
    summit() {
      this.show2 = true;
    },
    // 中间人发送邮件前专用
    agent_beforesend() {
      this.$axios({
        method: "get",
        url: `${this.$baseurl}/bsl_web/project/getDetails?signId=${this.$route.query.signId}`
      }).then(res => {
        if (res.data.resultCode == 10000) {
          this.investorsId = res.data.data.investorsId;
          this.custmoers_obj = res.data.data;
          console.log(this.custmoers_obj);
        }
      });
    },
    submit_email() {
    this.show='';
    var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if(reg.test(this.emailadress)) {
        this.$loading();
        this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/sendProject4`,
        data: this.$qs.stringify({
          signId: this.$route.query.signId,
          memberEmail: this.emailadress,
          investorsId: this.investorsId,
          emailData: `<html lang="en" style="width: 100%;margin: 0;padding: 0;
            height: 100%;">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>mobile</title>
                  </head>




          <body>
              <table id="box" style="width: 580px;height:350px;
              margin: auto;
              border-collapse:collapse; border-spacing:0px 10px;
              border:1px solid #cccccc;border-radius:5px;

            ">
                  <thead>
                      <tr>
                          <th colspan="2" height="100">
                              <img style="width: 100px;height: 50px;" src="${this.custmoers_obj.picUrl}"
                                  alt="">
                          </th>
                      </tr>
                  </thead>
                  <tobody>
                      <tr class="column" style="">
                          <td style="text-align:center;vertical-align:top;">【投资银行】</td>
                          <td style="padding:0 20px 0 0;width: 430px;text-align:left;vertical-align:top;">尊敬的投资人，您有一个投资项目，由中间人把项目方推荐给您，同意与其签约？
                          </td>
                      </tr>
                      <tr class="column" style="">
                          <td style="text-align:center;vertical-align:top;">【投资项目】</td>
                          <td style="padding:0 20px 0 0;text-align:left;vertical-align:top;">
                            ${this.custmoers_obj.projectName}</td>
                      </tr>
                      <tr class="column" style="margin-bottom: 15px;">
                          <td style="width: 120px;text-align:center;vertical-align:top;">【中间人】</td>
                          <td style="padding:0 20px 0 0;width: 430px;text-align:left;vertical-align:top;">
                              ${this.custmoers_obj.bslName4}</td>
                      </tr>
                      <tr class="column" style="margin-bottom: 15px;">
                          <td style="width: 120px;text-align:center;vertical-align:top;">【项目方】</td>
                          <td style="padding:0 20px 0 0;width: 400px;text-align:left;vertical-align:top;">
                              ${this.custmoers_obj.bslName1}
                          </td>
                      </tr>
                    <tr class="column" style="margin-bottom: 15px;color: lightcoral">
                        <td style="width: 120px;text-align:center;vertical-align:top;">提示：</td>
                        <td style="padding:0 20px 0 0;width: 400px;text-align:left;vertical-align:top;">
                          投资者注册账号后，并提交资料认证。待银行认证后，方可查阅详细资料。如果您已有账号，可以直接登录进行操作。
                        </td>
                    </tr>
                      <tr class="column" style="">
                          <td colspan="2" style="text-align:center;vertical-align:center;">
                              <a href="${this.$baseurl3}/#/i_emailto_confirm?projectLan=${this.custmoers_obj.projectLan}&signId=${this.custmoers_obj.signId}" class="button" style="text-decoration:none;">
                                  <span
                                      style="display:inline-block;text-decoration:none;width:200px;height:40px;background: #00B1F5;color:white;line-height:40px;">
                                      了解详情
                                  </span>
                              </a>
                          </td>


                      </tr>
                  </tobody>

              </table>
          </body>

          </html>`
        })
      }).then(res => {
        this.$toast.clear();
        console.log(res);
         this.show2 = false;
        if (res.data.resultCode == 10000) {
          let query1 = Object.assign({},this.$route.query,{signStatus: 9})
          this.$router.push({query:query1})
          this.$dialog
            .alert({
              title: "发送成功",
              message: "等待投资者确认并完善资料"
            })
            .then(() => {
              this.$routerto("mysign");
            });
        } else  {
          this.$dialog
            .alert({
              title: res.data.resultDesc
            })
            .then(() => {});
        }
      });
      }else{
          this.show='邮箱格式不正确';
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
  .owner_confirmed{
    margin-bottom: 0.5rem;
     .van-divider{
    background:#F2F2F2;
    border-color: #D2D2D2;
    padding: 0 2rem;
    margin:0;
    color: #858585;
    font-size: 0.42rem;
    }
    P{
      padding: 0.2rem 0.5rem;
      color:#f36c69;
      line-height: 0.6rem;
      font-size: 0.42rem;

    }
  }

  .van-field__control{
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
          justify-content: space-between;
          button {
            height: 1rem;
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
