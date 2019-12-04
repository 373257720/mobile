<template>
  <div id="common_details">
    <main>
      <article>
        <ul>
          <li v-for="(item,key) in toson" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2" v-if="key=='projectDescribe'" v-html="item.response">{{item}}</p>
            <p class="row2" v-else-if="key!='projectDescribe'">{{item.response}}</p>
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  props: ["toson"],
  data() {
    return {};
  },
  created() {
    console.log(this.toson);
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
#common_details {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      // position: absolute;
      // left: 0.6rem;
      // top: 50%;
      // transform: (translate(0, -50%));
    }
  }

  .van-dialog {
    font-size: 0.38rem;
  }
  .van-cell {
  }
}
</style>
<style lang="scss" scoped>
#common_details {
  width: 100%;

  main {
    background: #ffffff;

    article {
      // margin: 0 0 1.3rem 0;
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.38rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4rem;
          }
          .draft {
            margin-bottom: 0.25rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
          .draft1 {
            padding: 0.2rem 0.4rem;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>