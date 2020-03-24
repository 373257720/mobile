<template>
  <div id="forgotpassword">
    <commonnav :msg="dad_text"></commonnav>
    <main>
      <article>
        <ul>
          <li class="investorsCompany">
            <p class="row1">{{$t('common.Email')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field  v-model="email" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('common.Code')}}:</p>
            <p class="row2">
              <van-field
                v-model="form.verificationCode"
                center
                :placeholder="$t('ContractWrods.pleaseEnter')"
              >
                <template #button>
                  <van-button v-if="!isactive" size="small" type="primary">{{code}}</van-button>
                  <van-button v-else-if="isactive" @click="sendcode" class="isactive"  size="small" type="primary">{{code}}</van-button>
                </template>
<!--                <button v-if="!isactive"  slot="button" >-->
<!--                  {{countdown?countdown:code}}-->
<!--                  </button>-->
<!--                <button v-else-if="isactive" @click="sendcode" class="isactive"  slot="button" >-->
<!--                 {{code}}-->
<!--                  </button>-->
              </van-field>

            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('common.NewPassword')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field type="password"  v-model="form.newPwd" :placeholder="$t('ContractWrods.pleaseEnter')" />
              </van-cell-group>
            </p>
          </li>
          <li class="investorsName">
            <p class="row1">{{$t('common.ConfirmPassword')}}:</p>
            <p class="row2">
              <van-cell-group>
                <van-field type="password" v-model="comfirmpassword" :placeholder="$t('ContractWrods.pleaseEnter')" />
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
        code:this.$t('common.Sendcode'),
        dad_text:  this.$t('common.forgetpassword'),
        isactive:false,
        countdown:null,
        // verificationCodeToken:'',
        timeCounter:null,
        watch:false,//controll watch's email，
        email:'',
        comfirmpassword: '',
        form: {
          verificationCodeToken:'',
          verificationCode: "",
          newPwd: "",
        }
      };
    },
    watch:{
      'email':function (neww,oldd) {
        if(this.watch){
            return
        }
        // console.log(neww)
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
        const self = this;
        self.isactive=false;
        self.watch=true;
        // self.timeCounter = setTimeout(()=>{}, 100);
        this.$loading();
        this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/base/sendEmail.do`,
          {memberEmail:self.email}).then(res=>{
              if(res.data.resultCode==10000){
                let obj=JSON.parse(res.data.data);
                // console.log(JSON.parse(res.data.data).verificationCodeToken)
                this.form.verificationCodeToken=obj.verificationCodeToken
              }
               console.log(this.form)
              // clearTimeout(self.timeCounter);
              // self.timeCounter = null;
              this.$toast(res.data.resultDesc)
              let regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
              if(regemail.test(self.email)){
                this.isactive=true;
              }
              self.watch=false;
          })

      },
      // countDown() {
      //   const self = this;
      //   if(self.countdown===0){
      //           let regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      //           if(regemail.test(self.form.email)){
      //             this.isactive=true;
      //           }
      //            clearTimeout(self.timeCounter)
      //             self.timeCounter = null;
      //            return
      //   }else{
      //     self.timeCounter = setTimeout(()=>{
      //       self.countdown--;
      //       this.countDown();
      //     }, 1000);
      //   }
      //
      // },
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
        // if(this.form.verificationCodeToken==''){
        //   this.$toast({ message:'请发送邮件'});
        //   return false;
        // }
        if(this.form.newPwd==''){
          this.$toast({ message:this.$t('common.PleaseFillInTheNewPassword')});
          return false;
        }
        if(this.comfirmpassword==''){
          this.$toast({ message:this.$t('common.ConfirmPassword')});
          return false;
        }
        if(this.comfirmpassword!==this.form.newPwd){
          this.$toast({ message:this.$t('common.PasswordsEnteredTwiceAreInconsistent')});
          return false;
        }
        else if(this.form.verificationCode==''){
          this.$toast({ message:this.$t('agent.PleaseEnterRegion')});
          return false;
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
            this.$loading();
            this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/user/forgetPwd.do`,this.form).
            then(res => {
              this.$toast.clear();
              if (res.data.resultCode == 10000) {
                this.$dialog
                  .alert({
                    title: res.data.resultDesc,
                  })
                  .then(() => {
                    this.$routerto("login")
                  });
              } else {
               this.$toast(res.data.resultDesc);
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
      background-color:#afafaf;
      border: #00adef;
    }

    .van-field__body{
      /*border: 1px solid #ababab;*/
    }
    .van-field__button{
      button{
        height: 1rem;
        width: 4rem;
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
