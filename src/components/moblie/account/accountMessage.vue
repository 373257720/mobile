<template>
  <div id="AccountMessage">
    <commonnav>
      {{$t('Account.Message')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <v-scroll
        class="mhome-article"
        :on-refresh="onRefresh"
        :loaded="loaded"
        :on-infinite="onInfinite"
      >
        <div class="timestamp">
          <ul>
            <li @click="$routerto('MessageDetails',{id:item.id})" v-for="item in inforlist" :key="item.id">
              <nav>{{item.sendTime}}</nav>
              <section id="container">
                <div class="item item-1">
                  <p class="icon iconRight iconfont icon-1"></p>
                </div>
                <div class="item item-2">
                  <p>{{item.messageTitle}}</p>
                  <article>{{item.messageContent}}</article>
                </div>
                <div class="item item-3">
                  <p class="spot" v-if="item.isCheck"></p>
                </div>
              </section>
            </li>
          </ul>
        </div>
      </v-scroll>
    </main>
  </div>
</template>
<script>
import Scroll from "@/components/moblie/loadmore";
import ScrollTop from "@/components/moblie/common/toTop";
// import loadmore from "../loadmore";
export default {
  name: "AccountMessage",
  data() {
    return {
      num: 10,
      loaded: false,
      refreshing: false,
      loading: false,
      text: "List",
      inforlist: []
    };
  },
  components: {
    "v-scroll": Scroll,
    ScrollTop
  },
  created() {
    this.getinfolist();
  },

  methods: {
    getinfolist(done) {
      this.inforlist = [];
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/user/getUserMessageList`
        )
        .then(res => {
          console.log(res.data.data.lists);
          if (res.data.data.lists instanceof Array) {
            this.inforlist = res.data.data.lists;
            this.loaded = true;
            if (done) done();
          }
        });
    },
    onInfinite(done) {
      if (!this.loaded) this.onInfinitePort(done);
    },
    onInfinitePort(done) {
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/base/countryList.do`,
          {
            searchKey: this.searchkey
          }
        )
        .then(res => {
          if (res.data.data instanceof Array) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.countrylist.push({
                chinese: res.data.data[i].countryZhname,
                eng: res.data.data[i].countryEnname,
                lable:
                  this.$i18n.locale === "zh_CN"
                    ? res.data.data[i].countryZhname
                    : res.data.data[i].countryEnname,
                value: i,
                remark: res.data.data[i].countryCode
              });
            }
            done();
          }
        });
    },
    onRefresh(done) {
      this.loaded = false;
      this.getinfolist(done);
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

#AccountMessage {
  height: 100%;
}
</style>
<style lang="scss" scoped>
#AccountMessage {
  // padding-top: vw(96);
  main {
    // padding-bottom: 50px;
    height: 100%;
    position: relative;
    //  z-index: 200;
    // overflow: auto;
    .isFixed {
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 0;
    }
    .yo-scroll {
      position: absolute;
      top: 50px;
      bottom: 50px;
      -webkit-overflow-scrolling: touch;
    }
    .yo-scroll.Fixed {
      top: 0;
    }
    .yo-scrollTop {
      // top: 50px;
    }
    .mhome-tag {
      // padding-top: vw(62);
      li {
        display: flex;
        padding-left: vw(40);

        align-items: center;
        aside {
          width: vw(118);
          height: vw(34);
          font-size: vw(30);
          font-weight: bold;
          line-height: vw(34);
          color: #4f3dad;
          margin-right: vw(29);
        }
        div {
          display: flex;
          overflow-x: auto;
          flex: 1;
          margin-right: vw(20);
          color: #3ab5cc;
          p {
            height: vw(54);
            margin-right: vw(20);
            line-height: vw(54);
            border: vw(2) solid #3ab5cc;
            border-radius: vw(52);
            font-size: vw(26);
            font-weight: bold;
            padding: 0 vw(26);
          }
          p.isactive {
            background: #3ab5cc;
            color: #fff;
          }
        }
        div::-webkit-scrollbar {
          display: none;
        }
      }
      li:nth-of-type(2) {
        margin: vw(40) 0;
      }
    }
    .mhome-signTag {
      // padding: vw(62) 0;
      padding-left: vw(70);
      padding-top: vw(24);
      p {
        width: vw(124);
        display: flex;
        align-items: center;
        height: vw(54);
        justify-content: space-evenly;
        border: vw(2) solid #4f3dad;
        border-radius: vw(52);
        i {
          display: inline-block;
          width: vw(38);
          height: vw(38);
          background: #4f3dad;
          // margin-left: vw(26);
          // margin-right: vw(10);
        }
        span {
          // display: inline-block;
          width: vw(32);
          height: vw(32);
          align-self: center;
          font-weight: bold;
          text-align: center;
          // justify-self: center;
          background: #00f0ab;
          border-radius: 50%;
          color: #fff;
          font-size: vw(10);
        }
      }
    }
    .mhome-article {
      .timestamp {
        // margin-top: vw(50);
        // z-index: 180;
        ul {
          li {
            // margin-bottom: vw(40);
            padding: vw(40) vw(44) vw(40) vw(54);
            border-bottom: vw(2) solid #4f3dad;
            nav {
              // height: 22px;
              font-size: vw(20);
              font-weight: 400;
              // line-height: vw(22);
              margin-bottom: vw(22);
              display: flex;
              justify-content: flex-end;

              // opacity: 1;
            }
          }
          li:nth-last-of-type(1) {
            margin-bottom: vw(0);
          }
        }
      }
      #container {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        .item-1 {
          margin-right: vw(40);
        }
        .item-2 {
          width: vw(500);
          margin-right: vw(40);
          p {
            font-size: vw(26);
            line-height: vw(30);
            font-weight: bold;
            margin-bottom: vw(18);
          }
          article {
            font-size: vw(20);
            line-height: vw(22);
            color: #4f3dad;
            font-weight: 400;
          }
        }
        .item-3 {
          .spot {
            width: vw(24);
            height: vw(24);
            background: #00f0ab;
            border-radius: 50%;
            opacity: 1;
          }
        }
      }
      div.btn {
        display: flex;
        justify-content: flex-end;
        button {
          width: vw(232);
          height: vw(72);
          background: #00f0ab;
          border-radius: vw(16);
          color: #fff;
          border: none;
        }
      }
    }
  }
}
</style>
