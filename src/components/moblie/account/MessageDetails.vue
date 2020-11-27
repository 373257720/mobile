<template>
  <div id="MessageDetails">
    <commonnav>
      {{$t('Account.Message')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <header>22/07/2020 15:08:52</header>
      <p>Invitation to register has been sent</p>
      <article>
        Your invitation link has been sent, and the investor
        you recommended has received the email...
        You can go to remind him to go to APP to register
        and log in to operate, thank you for your use.
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "MessageDetails",
  data() {
    return { id: null };
  },
  created() {
    this.id = this.$route.query.id || null;
    this.getinfoDetails();
  },
  methods: {
    haveRead() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/updateUserMessage`,
          { messageId: this.id }
        )
        .then(res => {
          console.log(res);
        });
    },
    getinfoDetails() {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/getUserMessage`,
          { messageId: this.id }
        )
        .then(res => {
          console.log(res);
          this.haveRead();
        });
    }
    // handleleterClick() {},
  }
};
</script>

<style lang="scss" scoped>
#MessageDetails {
  padding-top: vw(96);
  main {
    margin-top: vw(76);
    color: #4f3dad;
    padding: 0 vw(126);
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
      height: vw(22);
      font-size: vw(20);
      line-height: vw(22);
      margin-bottom: vw(48);
    }
    p {
      width: vw(496);
      height: vw(34);
      font-size: vw(30);
      font-weight: bold;
      line-height: vw(34);
      margin-bottom: vw(78);
    }
    article {
      width: vw(496);
      font-size: vw(24);
      line-height: vw(28);
      opacity: 1;
    }
  }
}
</style>
