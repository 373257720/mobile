<template>
  <div id="vip">
    <commonnav>
      personal Review
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main>
      <ul>
        <li>
          <aside>Genus:</aside>
          <p>middleman</p>
        </li>
        <li>
          <aside>Identity:</aside>
          <p>person</p>
        </li>
        <li>
          <aside>Name:</aside>
          <p>Peter Paker</p>
        </li>
        <li>
          <aside>Identity card Number:</aside>
          <p>2589451684</p>
        </li>
        <li class="pic">
          <aside>Identity card front and back:</aside>
          <img src="../../../assets/logo.png" alt />
          <img src="../../../assets/logo.png" alt />
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {};
  },
  created() {},
  methods: {
    // handleleterClick() {},
  }
};
</script>

<style lang="scss" scoped>
#vip {
  main {
    padding: vw(140) vw(60) vw(116);
    ul {
      li {
        font-size: vw(30);
        font-family: Helvetica Neue;
        font-weight: bold;
        line-height: vw(34);
        color: #4f3dad;
        opacity: 1;
        margin-bottom: vw(40);
        display: flex;
        aside {
          margin-right: vw(10);
        }
      }
      li.pic {
        display: initial;
        aside {
          margin-bottom: vw(66);
        }
        img {
          width: 100%;
          height: vw(288);
          border: vw(4) dashed #4f3dad;
          opacity: 1;
        }
        img:nth-of-type(2) {
          margin-top: vw(66);
        }
      }
    }
  }
}
</style>
