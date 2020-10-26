<template>
  <div id="projectSubStatus">
    <commonnav>{{$t('project.projectStatus')}}</commonnav>
    <main>
      <ul>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>

        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
            <aside>1</aside>
          </div>
        </li>
        <li @click="$routerto('projectList')">
          <div>
            <p>Has agreed to wait for the project party to sign the contract</p>
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
  name: "projectSubStatus",
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

#projectSubStatus {
  //   height: 100%;
}
</style>
<style lang="scss" scoped>
#projectSubStatus {
  // padding-top: vw(96);
  main {
    padding: vw(228) vw(100) 0;
    ul {
      li {
        display: flex;
        // height: vw(92);
        justify-content: center;

        // padding: vw(30) 0;

        margin-bottom: vw(60);
        div {
          display: flex;
          align-items: center;
          width: vw(522);
          background: #4f3dad;
          padding: vw(20);
          border-radius: vw(16);

          color: #ffffff;
          p {
            width: vw(472);
            // height: vw(92);
            font-size: vw(26);
            font-weight: bold;
            text-align: center;
            // line-height: vw(42);
            // padding-left: vw(76);
            // margin-right: vw(10);
          }
          aside {
            width: vw(52);
            margin-left: vw(5);
            height: vw(52);
            background: #00f0ab;
            border-radius: 50%;
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
