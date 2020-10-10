<template>
  <div id="AccountMessage">
    <commonnav>{{$t('Account.Message')}}</commonnav>
    <mu-paper  class="demo-loadmore-wrap">
      <mu-container ref="container" class="demo-loadmore-content">
        <mu-load-more
          @refresh="refresh"
          loading-text="loading"
          :refreshing="refreshing"
          :loading="loading"
          @load="load"
        >
          <mu-list>
            <div class="timestamp" v-for="i in num" :key="i" @click="$routerto('MessageDetails')">
              <p>22/07/2020</p>
              <mu-list-item  :ripple="false" button>
                <mu-list-item-action>
                  <div style="width: 35px;
height: 27px;background:#00F0AB"></div>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>Invitation to register has been sent</mu-list-item-title>
                  <mu-list-item-sub-title>
                    <!-- <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> -->
                    Your invitation link has been sent, and the investor you recommended has received the email
                  </mu-list-item-sub-title>
                </mu-list-item-content>
                <mu-list-item-action class="time">
                  <!-- <mu-list-item-after-text>22/07/2020</mu-list-item-after-text> -->
                  <mu-list-item-after-text>1</mu-list-item-after-text>
                </mu-list-item-action>
              </mu-list-item>
            </div>
          </mu-list>
        </mu-load-more>
      </mu-container>
    </mu-paper>
  </div>
</template>
<script>
import loadmore from "../loadmore";
export default {
  name: "AccountMessage",
  data() {
    return { num: 10, refreshing: false, loading: false, text: "List" };
  },
  created() {},
  // components: {
  //   loadmore
  // },
  methods: {
    // handleleterClick() {},
    refresh() {
      //   console.log(123);
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.text = this.text === "List" ? "Menu" : "List";
        this.num = 10;
      }, 2000);
    },
    load() {
      console.log(123);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
        console.log(this.num);
      }, 2000);
    }
  }
};
</script>
<style lang="scss">
/*van-fade-enter-active*/
/*van-fade-enter-to*/
.demo-loadmore-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  .mu-appbar {
    width: 100%;
  }
}

.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
#AccountMessage {
  height: 100%;
  .mu-list{
    padding: vw(140) 0 0 0;
  }
  .timestamp {
    padding: vw(40) 0 0 0;
    > p {
      //   width: 100px;
      height: vw(22);
      font-size: vw(20);
      line-height: vw(22);
      color: #4f3dad;
      text-align: right;
      padding-right: vw(20);
      margin-bottom: vw(22);
    }
  }
  .timestamp:nth-of-type(1) {
    // padding: vw(128) 0 0 0;
  }
  .time {
    align-items: flex-end;
  }
  .mu-item-after-text {
    width: vw(52);
    height: vw(52);
    background: #00f0ab;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: vw(52);
  }
  .demo-loadmore-content {
    //  height: 100%;
  }
  .mu-item {
    padding: 0 vw(46);
  }
  .mu-item-title {
    //   width: 215px;
    height: vw(30);
    font-size: vw(26);
    font-weight: bold;
    line-height: vw(30);
    color: #4f3dad;
    margin-bottom: vw(18);
  }
  .mu-item-sub-title {
    font-size: vw(20);
    white-space: normal;
    line-height: vw(22);
    color: #4f3dad;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .demo-loadmore-wrap {
    max-width: 100%;
    height: 100%;
    // padding-top: vw(28)
    // padding-bottom: vw(116);
  }
  .container {
    padding: 0;
  }
  .mu-item-wrapper {
    border-bottom: 1px solid #4f3dad;
    padding: 0 0 vw(54) 0;
  }

  .van-overlay {
    // opacity: 0.5;
    background-color: rgba(0, 0, 0, 0.7);
    /*background-color: black;*/
  }
}
</style>
<style lang="scss" scoped>
#AccountMessage {
  // padding-top: vw(96);
}
</style>
