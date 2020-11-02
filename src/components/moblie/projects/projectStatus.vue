<template>
  <div id="projectStatus">
    <!-- <commonnav>{{$t('project.projectStatus')}}</commonnav> -->
    <commonnav>
      {{$t('project.projectStatus')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()"  />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
      <ul>
        <li @click="$routerto('projectSubStatus')">
          <div>
            <p>You (the middleman) and the project party</p>
            <aside>1</aside>
          </div>
        </li>
        <li>
          <div>
            <p>You (the middleman) and the project party</p>
            <aside>1</aside>
          </div>
        </li>
        <li>
          <div>
            <p>You (the middleman) and the project party</p>
            <aside>1</aside>
          </div>
        </li>
        <li>
          <div>
            <p>You (the middleman) and the project party</p>
            <aside>1</aside>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import loadmore from "../loadmore";
export default {
  name: "projectStatus",
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

#projectStatus {
  //   height: 100%;
}
</style>
<style lang="scss" scoped>
#projectStatus {
  // padding-top: vw(96);
  main {
    padding: vw(290) vw(64) 0;
    ul {
      li {
        width: vw(622);
        height: vw(152);
        background: #4f3dad;
        padding: vw(30) 0;
        border-radius: vw(16);
        margin-bottom: vw(60);
        div {
          display: flex;
          //   justify-content: center;
          align-items: center;
          color: #ffffff;
          p {
            width: vw(472);
            height: vw(92);
            font-size: vw(36);
            font-weight: bold;
            line-height: vw(42);
            padding-left: vw(76);
            margin-right: vw(30);
          }
          aside {
            width: vw(52);
            height: vw(52);
            background: #00f0ab;
            border-radius: 50%;
            opacity: 1;
            font-size: vw(30);
            line-height: vw(52);
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
