<template>
  <div id="p_submit_contract">
    <div class="p_submit_contract">
      <nav class="p_submit_contract">
        <van-icon name="arrow-left" @click="$global.previous()" />签署合约
      </nav>
      <main>
        <article>
          <contractcomponent :contract="contract"></contractcomponent>
          <footer>
            <button @click="contract_submit">提交</button>
          </footer>
        </article>
      </main>
      <mbottom></mbottom>
    </div>
    <!-- <div class="usercheck2" v-if="!success">
      <h2>
        <img src="../../../assets/f2c54dee46c853237c6ac91840de782.png" alt />
      </h2>
      <section>成功发送给中间人</section>
      <nav class="backbtn">
        <button @click="$goto('mhome')">进入首页</button>
      </nav>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "goods_details",
  props:['contract'],
  data() {
    return {
    };
  },

  created() {
    console.log(this.contract)
  },
  computed: {
  },
  mounted() {

  },
  methods: {
    contract_submit() {
      for(let i in this.contract){
        if(this.contract[i]==''){
          this.$dialog
            .confirm({
              title: "请返回完成信息填写"
              // message: "弹窗内容"
            })
            .then(() => {
                this.$routerto('p_set_contract',this.$route.query)
            });
            return;
        }
      }
        this.$loading();
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/bsl_web/projectSign/sendInvestorsData`,
          data: this.$qs.stringify({
            projectId: this.$route.query.projectId,
            signId: this.$route.query.signId,
            signStatus: 2,
            signAgreement: JSON.stringify(this.contract)
          })
        }).then(res => {
          this.$toast.clear();
          if (res.data.resultCode == 10000) {
            this.$dialog
              .alert({
                title: res.data.resultDesc,
                message: "返回我的项目"
              })
              .then(() => {
                this.$routerto("mysign");
              });
          } else if(res.data.resultCode==10051) {
            this.$dialog
              .alert({
                title: "提醒",
                message: "您的注册审核不通过，请前往我的-个人审核里修改"
              })
              .then(() => {
              });
          }else{
            this.$dialog
              .alert({
                title: "提醒",
                message: res.data.resultDesc,
              })
              .then(() => {

              });
          }
        });
    }
  }
};
</script>
<style lang="scss">
#p_submit_contract {
  nav {
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
  .van-field__control{
    min-height: 4rem;
  }
  .van-cell{
    padding: 0;
  }
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
</style>
<style lang="scss" scoped>
#p_submit_contract {
  width: 100%;
  nav.p_submit_contract {
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
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: #ffffff;
    footer {
      width: 100%;
      font-size: 0.42rem;
      button {
        width: 100%;
        margin-top: 1rem;
        background: #00adef;
        color: white;
        height: 1rem;
      }
    }
  }
}
</style>
