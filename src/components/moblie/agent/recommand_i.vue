<template>
  <div id="a_recommand_i">
    <commonnav>
      Recommended
      investors
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$router.go(-1)"/>
      </template>
    </commonnav>
    <main>
      <van-checkbox-group
        :style="{height:articleHight+'px'}"
        checked-color="#00F0AB"
        v-model="result"
      >
        <van-cell-group ref="article">
          <van-cell ref="box" v-for="(item) in list" :key="item">
            <template #title>
              <h3>
                Investors you recommend
                before
              </h3>
              <ul>
                <li>
                  <aside></aside>
                  <article>Recommended countdown: 5 days</article>
                </li>
                <li>
                  <aside></aside>
                  <article>Recommended countdown: 5 days</article>
                </li>
                <li>
                  <aside></aside>
                  <article>Recommended countdown: 5 days</article>
                </li>
                <li>
                  <aside></aside>
                  <article>Recommended countdown: 5 days</article>
                </li>
              </ul>
            </template>

            <template #right-icon>
              <van-checkbox @click="toggle" :name="item" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <footer>
        <p class="drop">
          <van-icon @click="dropdown" :class="{'rotate1':rotate1}" name="arrow-down" />
        </p>
        <div class>
          <span >Recommend new investors</span>
          <span @click="$routerto('recommandMiddleman')">+</span>
        </div>
        <div class="comfirm">
          <button @click="$routerto('projectDetail')">comfirm</button>
        </div>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      articleHight: null,
      list: ["a", "b", "dsf", "sd", "fsf", "hfghfh", "fdgfd", "iuouio"],
      result: [],
      searchkey: "",
      boxHeight: null
    };
  },
  computed: {
    rotate1() {
      if (this.articleHight > this.boxHeight * 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {},
  mounted() {
    this.boxHeight = this.$refs.box.clientHeight;
    this.articleHight = this.$refs.box.clientHeight * 2;
  },
  methods: {
    dropdown() {
      if (this.articleHight > this.$refs.box.clientHeight * 2) {
        this.articleHight = this.$refs.box.clientHeight * 2;
      } else {
        this.articleHight = this.$refs.article.clientHeight;
      }
    },
    toggle() {
      // console.log(index);
      // this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss">
#a_recommand_i {
  .van-checkbox-group {
    // height: vw(700);
    overflow: hidden;
    transition: all 2s ease-out;
    // height: vw(300);
    // overflow-y: auto;
    .van-checkbox__icon .van-icon {
      width: vw(62);
      height: vw(62);
      line-height: vw(62);
      font-size: vw(40);
      border-color: #00f0ab;
    }
    .van-cell__title {
      color: #4f3dad;
      font-size: vw(30);
    }
    .van-cell {
      padding: 0;
      padding-bottom: vw(60);
      // padding-left: 0;
      // padding-right: 0;
    }
    .van-cell::after {
      border-bottom: none;
    }
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border-width: 0;
    }
  }
}
</style>
<style lang="scss"  scoped>
#a_recommand_i {
  main {
    // padding-top: vw(212);
    width: 100%;
    padding: vw(200) vw(60) vw(116) vw(92);
    p.drop {
      text-align: center;
      .van-icon-arrow-down {
        transform-origin: center center;
        transform: rotate(0deg); //返回原点
        transition: transform 1s ease-out;
      }
      .van-icon::before {
        font-size: vw(30);

        font-weight: bold;
      }
      .rotate1 {
        transform-origin: center center;
        transform: rotate(180deg);
        transition: transform 2s ease-out;
      }
    }
    h3 {
      font-size: vw(30);
      font-weight: bold;
      color: #4f3dad;
      margin-bottom: vw(22);
      opacity: 1;
    }
    li {
      display: flex;
      margin-bottom: vw(30);
      aside {
        width: vw(29);
        height: vw(29);
        background: #4f3dad;
        margin-right: vw(28);
      }
      article {
        font-size: vw(24);
        font-weight: bold;
        line-height: vw(28);
        color: #4f3dad;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

    footer {
      // margin-top: vw(70);
      font-weight: bold;
      span {
        // width: 468px;
        font-size: vw(36);
        font-weight: bold;
        line-height: vw(42);
        color: #4f3dad;
      }
      span:nth-of-type(2) {
        display: inline-block;
        background: #00f0ab;
        width: vw(64);
        height: vw(64);
        border-radius: 50%;
        line-height: vw(64);
        text-align: center;
        color: #fff;
      }
      p.drop {
        display: flex;
        justify-content: center;
      }
      .comfirm {
        display: flex;
        margin-top: vw(144);
        justify-content: flex-end;
        button {
          width: vw(238);
          height: vw(72);
          background: #00f0ab;
          border-radius: vw(16);
          font-size: vw(24);
          font-weight: bold;
          line-height: vw(72);
          color: #ffffff;
        }
      }
    }
  }
}
</style>

