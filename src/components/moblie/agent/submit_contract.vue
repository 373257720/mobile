<template>
  <div id="a_submit_contract">
    <div class="a_submit_contract" v-if="success">
      <nav class="a_submit_contract">
        <van-icon name="arrow-left" @click="$global.previous()" />签署合约
      </nav>
      <main>
        <article>
          <div class="contract">
            <div class="top"></div>
            <div class="middle" v-html="content"></div>
            <div class="button">
              <p>
                <img :src="owner_signature" alt />
                <span>投行</span>
                <span>2019.11.11</span>
              </p>
              <p>
                <img :src="agent_signature" alt />
                <span>中间人</span>
                <span>2019.11.11</span>
              </p>
            </div>
          </div>
          <footer>
            <button @click="contract_submit">提交</button>
          </footer>
        </article>
      </main>
      <van-dialog v-model="show2" :show-confirm-button="false">
        <footer class="email">
          <p>请输入投资者邮箱</p>
          <div class="emailadress">
            <van-field v-model="emailadress" clearable />
          </div>
          <aside>
            <button @click="submit_email">确定</button>
            <button @click="loginout">取消</button>
          </aside>
        </footer>

        <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
      </van-dialog>
      <mbottom></mbottom>
    </div>
    <div class="usercheck2" v-if="!success">
      <h2>
        <img src="../../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>成功发送给中间人</section>
      <nav class="backbtn">
        <button @click="$goto('mhome')">进入首页</button>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      owner_signature: "",
      content: "",
      str: "",
      investorsId:'',
      emailadress: "",
      show2: false, //邮箱
      agent_signature: "",
      success: true,
      signId: "",
      custmoers_obj: {}
    };
  },
  created() {
    // console.log(this.$route.query);
    // console.log(this.$store.state.contract);
    this.str = this.$store.state.contract;
    let a = this.str.split("!!!!!");

    this.owner_signature = a[1];
    this.content = a[0];
    this.agent_signature = a[2];
    // console.log(this.content);
  },
  computed: {
    // contract_content: function(){
    // },
  },
  mounted() {
    // this.content = "";
  },
  methods: {
    submit_email() {
      console.log(this.investorsId);
      
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/sendProject4`,
        data: this.$qs.stringify({
          signId: this.signId,
          memberEmail: this.emailadress,
          investorsId:this.investorsId,
          emailData: `<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style> 
        /**
         * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)
         * http://cssreset.com
         */
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed,
        figure, figcaption, footer, header,
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video, input {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font-weight: normal;
            vertical-align: baseline;
        }

        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure,
        footer, header, menu, nav, section {
            display: block;
        }

        body {
            line-height: 1;
        }

        blockquote, q {
            quotes: none;
        }

        blockquote:before, blockquote:after,
        q:before, q:after {
            content: none;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        /* custom */
        a {
            color: #7e8c8d;
            text-decoration: none;
            -webkit-backface-visibility: hidden;
        }

        li {
            list-style: none;
        }

        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }

        ::-webkit-scrollbar-track-piece {
            background-color: rgba(0, 0, 0, 0.2);
            -webkit-border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:vertical {
            height: 5px;
            background-color: rgba(125, 125, 125, 0.7);
            -webkit-border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:horizontal {
            width: 5px;
            background-color: rgba(125, 125, 125, 0.7);
            -webkit-border-radius: 6px;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        body {
            -webkit-text-size-adjust: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        input, select, option, textarea, button {
            outline: none;
        }

        img {
            content: normal !important;
        }
        .email {
            width:870px;
            border-left:30px solid #4d98db;
            border-top:36px solid #4d98db;
            border-right:30px solid #4d98db;
            border-bottom:86px solid #4d98db;
            margin:auto;
        }
        .head {
            line-height:82px;
            margin-top:39px;
        }
    </style>
</head>

<body>
    <div id="box"  style="width: 100%;height: 100%; justify-content: center; 
    align-items: center; 
    display: -webkit-flex;">
        <div class="box"  style="border:1px solid #cccccc;border-radius:5px;width: 580px;height:310px;font-size: 14px; 
        justify-content: center; 
        flex-direction: column;
        display: -webkit-flex;">
            <h2></h2>
            <div class="column" style="display: flex;margin-bottom: 15px;">
                <span style="display:block;width: 120px;">【投资银行】</span>
                <span style="display:block;width: 430px;">你有一个投资项目，有<span style=""color:#67C4F3>中间人A</span>把<span style=""color:#67C4F3>投行B</span>推荐给你，同意吗</span>
            </div>
            <div class="column" style="display: flex;margin-bottom: 15px;">
                <span style="display:block;width: 120px;">【投资项目】</span>
                <span style="display:block;width: 430px;">${this.custmoers_obj.projectName}</span>
            </div>
            <div class="column" style="display: flex;margin-bottom: 15px;">
                <span style="display:block;width: 120px;">【中间人】</span>
                <span style="display:block;width: 430px;">${this.custmoers_obj.bslName4}</span>
            </div>
            <div class="column" style="display: flex;margin-bottom: 15px;">
                <span style="display:block;width: 120px;">【投行B】</span>
                <span style="display:block;width: 400px;">${this.custmoers_obj.bslName1}</span>
            </div>
            <div class="column" style="display: flex;justify-content: space-around;margin-top:20px;">
                   <a href="http://localhost:8080/#/i_wait_confirm?projectLan=${this.custmoers_obj.projectLan}&signId=${this.custmoers_obj.signId}">
                     <div class="button"
                    style="width: 250px;height: 40px;background: #00B1F5;color:white;text-align: center;line-height: 40px;">
                    了解详情</div>
                    </a>
                </a>
            </div>
        </div>
    </div>
</body>

</html>`
        })
      }).then(res => {
        console.log(res);
        // console.log();
        // this.show2 = true;
        // if (res.data.resultCode == 10000) {
        // //   this.success=false;

        // }
      });
    },
    loginout() {
      // console.log(this.$dialog);
      this.show2 = !this.show2;
    },
    contract_submit() {
      this.$axios({
        method: "post",
        url: `${this.$baseurl}/bsl_web/projectSign/signProject4`,
        data: this.$qs.stringify({
          projectId: this.$route.query.projectId,
          investorsId: this.$route.query.investorsId,
          signAgreement: this.str
        })
      }).then(res => {
        console.log(res);
        if (res.data.resultCode == 10000) {
          //   this.success=false;
        this.signId = res.data.data.signId;
          this.show2 = true;
          this.$axios({
            method: "get",
            url: `${this.$baseurl}/bsl_web/project/getDetails?signId=${this.signId}`
          }).then(res => {
            console.log(res.data.data);
                 this.investorsId=res.data.data.investorsId;
          
            this.custmoers_obj = res.data.data;
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
#a_submit_contract {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-cell {
    font-size: 0.3rem;
    background: #f2f2f2;
    // padding: 0;
    padding: 0.2rem 0.3rem;
    margin: 0 0 0.5rem;
    border: 1px solid #b5b5b5;
  }
  .van-field__control {
    // font-size: 0.1rem;

    // height: 1rem;
  }
  .van-dialog {
    font-size: 0.4rem;
  }
  .van-icon-clear {
    font-size: 0.4rem;
  }
}
</style>
<style lang="scss" scoped>
#a_submit_contract {
  width: 100%;
  footer.email {
    padding: 0 0.6rem 0.5rem 0.6rem;
    p {
      text-align: center;
      height: 1.5rem;
      font-size: 0.4rem;
      margin-top: 1rem;
    }
    aside {
      height: 2.2rem;
      display: flex;
      font-size: 0.3rem;
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
  .usercheck2 {
    padding: 3.24rem 0 3.04rem 0;
    text-align: center;
    img {
      // width: 4.28rem;
      height: 1.54rem;
    }
    section {
      text-align: center;
      font-size: 0.64rem;
      font-weight: 600;
      margin: 3.3rem 0 1.1rem 0;
    }
    .backbtn {
      text-align: center;
      // width: 100px;
      button {
        background: #00adef;
        width: 8rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.4rem;
        color: white;
      }
    }
  }
  nav.a_submit_contract {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    z-index: 5;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.1rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    padding: 0.5rem;
    background: #ffffff;
    .contract {
      background: #f2f2f2;
      box-sizing: border-box;
      font-size: 0.4rem;
      line-height: 0.6rem;
      padding: 0.4rem 0.4rem;
      width: 100%;
      height: 12rem;
      overflow-y: auto;
      word-wrap: break-word;
      color: rgb(169, 169, 169);
      div.button {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 3rem;
            height: 1rem;
            border-bottom: 1px solid rgb(169, 169, 169);
          }
        }
      }
    }
    footer {
      width: 100%;
      button {
        width: 100%;
        margin-top: 1rem;
        background: #00adef;
        color: white;
        height: 0.8rem;
      }
    }
  }
}
</style>