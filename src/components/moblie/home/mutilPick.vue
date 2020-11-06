<template>
  <div id="mhome">
    <commonnav>
      {{GoToname}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="pickgenus" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
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
      <van-checkbox-group
        v-if="GoToname==='Industry'"
        checked-color="#00F0AB"
        v-model="result.industryList"
        @change="change"
      >
        <van-cell-group>
          <van-cell
            v-for="(item, index) in List.industryList"
            clickable
            :key="item.value"
            :title="`${item.label}`"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item.value" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-checkbox-group
        v-if="GoToname==='Region'"
        checked-color="#00F0AB"
        v-model="result.regionList"
      >
        <van-cell-group>
          <van-cell
            v-for="(item, index) in List.regionList"
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
      <van-checkbox-group v-if="GoToname==='Tag'" checked-color="#00F0AB" v-model="result.taglist">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in List.taglist"
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
        <button @click="pickgenus">Interested</button>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  props: ["GoToname", "result", "List", "electedList"],
  data() {
    return {
      list: [],
      IndustryResult: [],
      // RegionResult: [],
      // TagResult: [],
      searchkey: ""
    };
  },
  created() {
  
  },
  activated() {
    console.log(this.GoToname);
    switch (this.GoToname) {
      case "Industry":
        this.List.industryList = [
          {
            label: "a",
            value: 1
          },
          {
            label: "b",
            value: 2
          },
          {
            label: "c",
            value: 3
          },
          {
            label: "d",
            value: 4
          }
        ];
        break;
      case "Region":
        this.List.regionList = ["a", "b", "c", "d", "e", "f"];
        break;
      case "Tag":
        this.List.taglist = [1, 2, 3, 4, 5, 6];
        break;
      default:
      // 默认代码块;
    }
    console.log(this.List.regionList);
  },
  methods: {
    change(any) {
      // console.log(any);
      // this.IndustryResult = [];
      // this.electedList.industryList= any.map(item => {
      //   let obj;
      //   this.List.industryList.forEach(it => {
      //     if (item === it.value) {
      //       obj = it;
      //     }
      //   });
      //   return obj;
      // });
      // console.log(arr);
    },
    pickgenus() {
      // this.$nextTick(() => {
      console.log(this.result);

      // });
      // let result;
      // switch (this.GoToname) {
      //   case "Industry":
      //     result = this.IndustryResult;
      //     break;
      //   case "Region":
      //     result = this.RegionResult;
      //     break;
      //   case "Tag":
      //     result = this.TagResult;
      //     break;
      //   default:
      //   // 默认代码块;
      // }
      this.$emit("fromKids");

      // if (item) this.usercheck.genus = item;

      // this.$global.previous();
      // this.$emit("pickNation",item)
    },
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
  .van-search {
    width: vw(598);
    margin: 0 auto;
    padding: 0;
    margin-bottom: vw(48);
    .van-search__content {
      border: vw(2) solid #3ab5cc;
      background: #fff;
      .van-icon-search,
      .van-icon-clear {
        color: #3ab5cc;
      }
    }
  }

  main {
    // padding-top: vw(212);
    width: 100%;
    padding: vw(140) 0 vw(116);
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

