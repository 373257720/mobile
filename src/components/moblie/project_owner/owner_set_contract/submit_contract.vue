
<template>
  <div id="p_submit_contract">
    <!--    <nav class="p_submit_contract">
        <van-icon name="arrow-left" @click="$router.go(-1)" />{{$t('agent.SignTheContract')}}
    </nav>-->
    <commonnav :msg="$t('agent.SignTheContract')"></commonnav>
    <main>
      <article>
        <contractcomponent :contract="contract"></contractcomponent>
        <footer>
          <button @click="contract_submit">{{$t('common.Submit')}}</button>
        </footer>
      </article>
    </main>
    <!-- <mbottom></mbottom> -->
  </div>
</template>
<script>
export default {
  name: "goods_details",
  props: ["contract"],
  data() {
    return {
      projectId: "",
      signId: ""
    };
  },
  // beforeRouteEnter:(to,from,next)=>{
  //     if(from.name=="p_sign_contract" ||from.name=="p_submit_contract"){
  //       next()
  //     }else{
  //       next();
  //     }
  //     // next(vm=>{
  //     //     alert(vm.num)
  //     // })
  // },

  computed: {},
  mounted() {},
  methods: {
    contract_submit() {
      for (let i in this.contract) {
        if (this.contract[i] == "") {
          this.$dialog
            .confirm({
              title: this.$t("ContractWrods.PleaseReturnToCompleteInformation")
              // message: "弹窗内容"
            })
            .then(() => {
              this.$router.go(-2);
            });
          return;
        }
      }
      let projectId = this.$route.query.projectId
        ? this.$route.query.projectId * 1
        : -1;
      let signId = this.$route.query.signId ? this.$route.query.signId * 1 : -1;
      console.log(projectId, signId);
      console.log(this.contract);
      this.$loading();
      if (projectId) {
        this.$global
          .post_encapsulation(
            `${this.$baseurl}/bsl_web/projectSign/reviewInterestedRequest`,
            {
              projectId: projectId,
              signId: signId,
              signStatus: 2,
              signAgreement: JSON.stringify(this.contract)
            }
          )
          .then(res => {
            console.log(res);
            this.$toast.clear();
            if (res.data.resultCode == 10000) {
              this.$dialog
                .alert({
                  title: res.data.resultDesc,
                  message: this.$t("projectOwner.BackToMyProject")
                })
                .then(() => {
                  this.$routerto("mysign");
                });
            } else if (res.data.resultCode == 10051) {
              this.$dialog
                .alert({
                  title: this.$t("common.Reminder"),
                  message: this.$t(
                    "projectOwner.YourRegistrationReviewDidNotPass"
                  )
                })
                .then(() => {
                  this.$routerto("mysign");
                });
            } else {
              this.$dialog
                .alert({
                  title: res.data.resultDesc,
                  message: this.$t("projectOwner.BackToMyProject")
                })
                .then(() => {
                  this.$routerto("mysign");
                });
            }
          });
      } else {
        // console.log('没有projectid')
      }
    }
  }
};
</script>
<style lang="scss">
#p_submit_contract {
  .van-field__control {
    min-height: 4rem;
  }
  .van-cell {
    padding: 0;
  }
  .van-dialog {
    font-size: 0.48rem;
  }
  .van-dialog__message {
    font-size: 0.4rem;
  }
  .van-button {
    font-size: 0.48rem;
  }
}
</style>
<style lang="scss" scoped>
#p_submit_contract {
  width: 100%;
  height: 100%;
  padding: 1.6rem 0 1.3rem 0;
  div.middle {
    /*margin: 0 0.5rem;*/
    box-sizing: border-box;
  }
  main {
    // margin-top: 1.5rem;
    // margin-bottom: 1.5rem;
    padding: 0.5rem;
    height: 100%;
    width: 100%;
    background: #ffffff;
    article {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      > div {
        height: 85%;
      }
      footer {
        width: 100%;
        font-size: 0.42rem;
        display: flex;
        justify-content: center;
        button {
          width: 8rem;
          background: #00adef;
          border-radius: 5px;
          line-height: 1rem;
          color: white;
          height: 1rem;
        }
        .blockchain {
          background: orange;
        }
      }
    }
  }
}
</style>
