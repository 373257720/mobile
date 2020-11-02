<template>
  <div id="mhome">
    <commonnav>
      mutilPick
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
      <template v-slot:search>
        <van-search
          v-model="searchkey"
          :placeholder="$t('common.PleaseEnterTheSearchKeyword')"
          shape="round"
          left-icon
        >
          <div slot="right-icon">
            <van-icon name="search" />
          </div>
        </van-search>
      </template>
    </commonnav>
    <main>
      <van-checkbox-group checked-color="#00F0AB" v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item"
            :title="`${item}`"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <footer>
        <button @click="$routerto('mhome')">Interested</button>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      list: ["a", "b", "dsf", "sd", "fsf", "hfghfh", "fdgfd", "iuouio"],
      result: [],
      searchkey: ""
    };
  },
  created() {},

  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss">
#mhome {
  .van-checkbox-group {
    height: vw(700);
    overflow-y: auto;
    .van-checkbox__icon .van-icon {
      width: vw(44);
      height: vw(44);
      line-height: vw(44);
      border-color: #00f0ab;
    }
    .van-cell__title {
      color: #4f3dad;
      font-size: vw(30);
    }
    .van-cell {
      padding: vw(45) vw(60);
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
#mhome {
  main {
    // padding-top: vw(212);
    width: 100%;
    padding: vw(270) 0 vw(116);
    footer {
      margin-top: vw(70);
      font-weight: bold;
      display: flex;
      justify-content: center;
      button {
        width: vw(528);
        height: vw(114);
        background: #00f0ab;
        border-radius: vw(40);
        font-size: vw(40);
        line-height: vw(114);
        color: #ffffff;
      }
    }
  }
}
</style>

