<template>
  <div id="fliter">
    <commonnav>
      {{$t('common.Fliter')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
      <div class="fliter-tag">
        <ul>
          <li v-for="(item,idx) in result.industryList" :key="item.name">
            <p>
              {{item}}
              <span @click="delectTag(item,idx)"></span>
            </p>
          </li>
        </ul>
        <article>
          <div>
            <p class="label">{{$t('common.Industry')}}</p>
            <div class="item">
              <p>
                <span v-for="(item) in result.industryList" :key="item.name">
                  {{
                  item
                  }},
                </span>
              </p>
              <van-icon name="arrow" @click="goto('Industry')" />
            </div>
          </div>
          <div>
            <p class="label">{{$t('common.region')}}</p>
            <div class="item">
              <p>
                <span v-for="(item) in result.regionList" :key="item.name">{{ item}},</span>
              </p>
              <van-icon name="arrow" @click="goto('Region')" />
            </div>
          </div>
          <div>
            <p class="label">Tag</p>
            <div class="item">
              <p>
                <span v-for="(item) in result.taglist" :key="item.name">{{ item}}，</span>
              </p>

              <van-icon name="arrow" @click="goto('Tag')" />
            </div>
          </div>
        </article>
      </div>
      <footer>
        <!-- <button>{{$t('common.Search')}}</button> -->
        <van-button @click="$routerto('mhome')">{{$t('common.Search')}}</van-button>
      </footer>
    </main>
    <transition name="slide-fade">
      <keep-alive>
        <div
          class="secondLayer"
          @fromKids="pick"
          :result="result"
          :List="List"
          :GoToname="name"
          :is="currentView"
        ></div>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import mutilPick from "@/components/moblie/home/mutilPick";
export default {
  name: "fliter",
  components: {
    "mutil-Pick": mutilPick
  },
  data() {
    return {
      name: "",
      currentView: "",
      List: {
        industryList: [],
        regionList: [],
        taglist: []
      },
      result: {
        industryList: [],
        regionList: [],
        taglist: []
      }
      // electedList: {
      //   industryList: [],
      //   regionList: [],
      //   taglist: []
      // }
    };
  },
  created() {},
  computed: {
    totalResults: {
      get: function() {
        return this.result.industryList.push.appluy;
      },
      set: function(newValue) {}
    }
  },
  methods: {
    pick(data) {
      // console.log(data);
      // console.log();

      // if (this.name == "Industry") {
      //   for (let i = 0; i < data.length; i++) {
      //     this.result.industryList.push({
      //       name: data[i]
      //     });
      //   }
      // } else if (this.name == "Region") {
      //   for (let i = 0; i < data.length; i++) {
      //     this.result.regionList.push({
      //       name: data[i]
      //     });
      //   }
      // } else if (this.name == "Tag") {
      //   for (let i = 0; i < data.length; i++) {
      //     this.result.taglist.push({
      //       name: data[i]
      //     });
      //   }
      // }

      this.currentView = "";
    },
    goto(name) {
      this.name = name;
      this.currentView = "mutil-Pick";
    },
    delectTag(item, idx) {
      if (this.name == "Industry") {
        this.result.industryList.splice(idx, 1);
      } else if (this.name == "Region") {
        this.result.regionList.splice(idx, 1);
      } else if (this.name == "Tag") {
        this.result.taglist.splice(idx, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#fliter {
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.4s ease;
    // position: fixed;
  }

  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(100%);
    // opacity: 0;
  }
  .secondLayer {
    position: fixed;
    z-index: 201;
    top: 0;
    height: 100%;
    width: 100%;
    background: #fff;
  }
  main {
    // padding-top: vw(212);
    width: 100%;
    padding: vw(140) vw(60) vw(116) vw(60);
    ul {
      display: flex;
      // flex-wrap: wrap;
      flex-flow: row wrap;
      margin-bottom: vw(60);
      // padding-top: vw(10);
      li {
        color: #3ab5cc;
        height: vw(53);
        border: vw(2) solid #3ab5cc;
        border-radius: vw(52);
        padding: 0 vw(26);
        margin-right: vw(20);
        margin-bottom: vw(10);
        p {
          font-size: vw(26);
          line-height: vw(53);
          span {
            // transform: rotate(90deg);
            display: inline-block;
            position: relative;
            width: vw(18);
            height: vw(18);
            &:before,
            &:after {
              position: absolute;
              content: " ";
              background-color: #3ab5cc;
              left: vw(8);
              width: vw(2);
              height: vw(18);
            }
            &:before {
              transform: rotate(45deg);
            }
            &:after {
              transform: rotate(-45deg);
            }
          }
          // &::after {
          //   content: "+";
          //   margin-left: vw(10);
          // }
        }
      }
    }
    article {
      p.label {
        font-size: vw(40);
        font-weight: bold;
        color: #4f3dad;
        opacity: 1;
        margin-bottom: vw(56);
      }
      div.item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: vw(142);
        color: #4f3dad;
        p {
          display: flex;
          align-items: center;
        }
        span {
          font-size: vw(30);
        }
        i {
          font-size: vw(40);
        }
      }
    }
    footer {
      display: flex;
      justify-content: center;
      button {
        width: vw(528);
        height: vw(114);
        border: none;
        background: #00f0ab;
        border-radius: vw(40);
        font-size: vw(40);
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>

