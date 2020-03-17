<template>
  <div id="forgotpassword">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <article>
        <ul>
          <li class="investorsCompany">
            <p class="row1">{{$t('agent.InvestorCompany')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field  v-model="form.email" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('agent.InvestorName')}}:</p>
            <p class="row2">
              <van-field
                v-model="form.vertificationCode"
                center
                :placeholder="$t('ContractWrods.pleaseEnter')"
              >
                <button v-if="!isactive" slot="button" >{{countdown?countdown:code}}</button>
                <button v-if="isactive" @click="sendcode" class="isactive"  slot="button" >{{code}}</button>
<!--                <van-button slot="button" size="small" type="primary">发送验证码</van-button>-->
              </van-field>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('agent.InvestorName')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="form.password" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('agent.InvestorName')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field v-model="form.comfirmpassword" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group>
            </p>
          </li>
        </ul>
        <footer>
          <button @click="submit">{{$t('ContractWrods.submit')}}</button>
        </footer>
      </article>
    </main>
  </div>
</template>
<script>
  // let timeout;
  export default {
    name: "forgotpassword",
    data() {
      return {
        code:'发送验证码',
        dad_text:  this.$t('common.forgetpassword'),
        isactive:false,
        countdown:null,
        timeCounter:null,
        form: {
          email: '',
          vertificationCode: "",
          password: "",
          comfirmpassword: '',
        }
      };
    },
    watch:{
      'form.email':function (neww,oldd) {
        console.log(this.countdown )
        // if(this.countdown !== 0){
        //     return
        // }
        let regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(regemail.test(neww)){
          this.isactive=true;
        }else{
          this.isactive=false;
        }
      },
    },
    methods: {
      sendcode() {
        this.isactive=false;
        this.countDown();
        this.countdown=5;
      },
      countDown(times) {
        const self = this;
        // let count = 0;
        if(self.countdown===0){
                let regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if(regemail.test(self.form.email)){
                  this.isactive=true;
                }
                 clearTimeout(self.timeCounter)
                  self.timeCounter = null;
                 return
        }else{
          self.timeCounter = setTimeout(()=>{
            self.countdown--;
            this.countDown();
          }, 1000);
        }

      },
      remind(meg) {
        this.$dialog
          .alert({
            title: meg
            // message: "弹窗内容"
          })
          .then(() => {

          });
      },
      submit() {
        if(this.form.investorsType==2 && this.form.investorsCompany==''){
          this.$toast({ message:this.$t('agent.PleaseEnterTheCompanyName')});
          return
        }
        if(this.form.investorsName==''){
          this.$toast({ message:this.$t('agent.PleaseEnterInvestorName')});
          return
        }else if(this.form.investorsArea==''){
          this.$toast({ message:this.$t('agent.PleaseEnterRegion')});
          return
        }
        this.commit();
      },
      commit() {
        console.log(this.form)
        this.$dialog
          .confirm({
            title: this.$t('agent.Confirm')
            // message: "确认提交"
          })
          .then(() => {
            this.$axios({
              method: "post",
              url: `${this.$baseurl}/bsl_web/projectSign/submitInvestors`,
              data: this.$qs.stringify(this.form)
            }).then(res => {
              if (res.data.resultCode == 10000) {
                this.$dialog
                  .alert({
                    title: res.data.resultDesc,
                    message: this.$t('agent.WaitingForInvestmentBankReview')
                  })
                  .then(() => {
                    this.$routerto("mysign")
                  });
              } else {
                this.remind(res.data.resultDesc);
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  };
</script>
<style lang="scss">
  #forgotpassword {
    .van-cell {
      font-size: 0.38rem;
      padding: 0 1rem;
      height: 100%;
    }
    .van-button--primary{
      color: #fff;
      background-color: grey;
      border: 1px solid grey;
    }
    .van-field__button{
      button{
        height: 1rem;
        width: 3rem;
        color: white;
        border-radius: 2px;
        cursor: pointer;
      }
      .isactive{
        background: #00adef;;
      }
    }
    .van-field__control{
      padding: 0.1rem 0.3rem;
      height: 1rem;
      border: 1px solid #ababab;
      line-height: 1rem;
    }
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      -webkit-transform: translate(0, -50%);
      transform: translate(0, -50%);
    }
    .van-field__clear {
      font-size: 0.32rem;
    }
    .van-field {
      padding: 0;
    }
  }
</style>
<style lang="scss" scoped>
  #forgotpassword {
    width: 100%;
    height: 100%;
    main {
      padding-top: 1.6rem;
      background: #ffffff;
      article {
        padding: 0 0.5rem;
        width: 100%;
      }
      ul {
        padding: 0.5rem 0;
        li {
          margin-bottom: 0.4rem;
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            /*width: 3rem;*/
            /*flex:2;*/
            /*line-height: 1rem;*/
            /*margin-bottom: 0.2rem;*/
          }
          .row2 {
            position: relative;
            /*flex:3;*/
            height: 100%;
            height: 1rem;
            word-break: break-all;
            /*line-height: 1.2rem;*/
            color: #787878;
            box-sizing: border-box;
            /*border: 1px solid #b3b3b3;*/

          }
        }
      }
      footer {
        padding-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        font-size: 0.42rem;
        button {
          border-radius: 5px;
          width:8rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }


</style>
