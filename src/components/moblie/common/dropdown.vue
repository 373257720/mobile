<template>
  <div class="vue-dropdown default-theme">
    <div class="cur-name" @click="isShow = !isShow">
      {{ itemlist.cur.name }}
    </div>
    <div class="list-and-search" :class="isShow ? 'on' : ''">
      <div class="search-module clearfix" v-show="isNeedSearch">
        <input
          class="search-text"
          @keyup="search($event)"
          :placeholder="placeholder"
        />
      </div>
      <ul class="list-module">
        <li
          v-for="(item, index) in datalist"
          @click="selectToggle(item)"
          :key="index"
        >
          <span class="list-item-text">{{ item.name }}</span>
        </li>
      </ul>
      <div class="tip-nodata" v-show="isNeedSearch && datalist.length == 0">
        {{ nodatatext }}
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      datalist: [],
      isShow: false,
    };
  },
  props: {
    itemlist: Object, //父组件传来的数据
    placeholder: {
      type: String,
      default: "搜索", //input placeholder的默认值
    },
    isNeedSearch: {
      //是否需要搜索框
      type: Boolean,
      default: false,
    },
    nodatatext: {
      //是否需要显示搜索
      type: String,
      default: "未找到结果", //没有搜索到时的文本提示
    },
  },
  created() {
    this.datalist = this.itemlist.data;
    //点击组件以外的地方，收起
    document.addEventListener(
      "click",
      (e) => {
        if (!this.$el.contains(e.target)) {
          this.isShow = false;
        }
      },
      false
    );
  },
  methods: {
    selectToggle(data) {
      this.itemlist.cur.name = data.name;
      this.isShow = false;
      this.$emit("item-click", data);
    },
    search(e) {
      let searchvalue = e.currentTarget.value;
      this.datalist = this.itemlist.data.filter((item, index, arr) => {
        return item.name.indexOf(searchvalue) != -1;
      });
    },
  },
};
</script>
 
<style lang="scss" scoped>
.list-and-search {
  position: absolute;
  top: vw(63);
  font-size: vw(20);
  background: #fff;
  width: 100%;
  border: vw(2) solid #ccc;
  display: none;
  &.on {
    display: block;
  }
}
.cur-name {
  //   height: vw(80);
  font-size: vw(34);
  height: vw(60);
  line-height: vw(60);
  //   text-indent: 10px;
  position: relative;
  //   color: #777;
  &:after {
    position: absolute;
    right: 9px;
    top: 13px;
    content: " ";
    width: 0;
    height: 0;
    // border-right: 6px solid transparent;
    // border-top: 6px solid #7b7b7b;
    // border-left: 6px solid transparent;
    // border-bottom: 6px solid transparent;
  }
  &.show {
    &:after {
      right: 9px;
      top: 6px;
      //   border-right: 6px solid transparent;
      //   border-bottom: 6px solid #7b7b7b;
      //   border-left: 6px solid transparent;
      //   border-top: 6px solid transparent;
    }
  }
}
.vue-dropdown.default-theme {
  position: relative;
  width: 100%;
  z-index: 10;
  font-size: vw(20);
  //   border-radius: 3px;
  border-bottom: vw(2) solid #4f3dad;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  &._self-show {
    display: block !important;
  }
  .search-module {
    position: relative;
    border-bottom: 1px solid #ccc;
    .search-text {
      width: 100%;
      height: vw(50);
      text-indent: 10px;
      // border-radius: 0.5em;
      box-shadow: none;
      outline: none;
      border: none;
      // &:focus {
      //  border-color: #2198f2;
      // }
    }
    .search-icon {
      position: absolute;
      top: 24%;
      right: 0.5em;
      color: #aaa;
    }
  }
  input::-webkit-input-placeholder {
    font-size: 14px;
  }
  ul.list-module {
    max-height: 200px;
    overflow-y: auto;
    font-size: vw(20);
    li {
      &._self-hide {
        display: none;
      }
      margin-top: 0.4em;
      padding: 0.4em;
      &:hover {
        cursor: pointer;
        color: #fff;
        background: #00a0e9;
      }
    }
  }
}
.tip-nodata {
  font-size: vw(20);
  padding: vw(10) 0;
  text-indent: vw(20);
}
</style>