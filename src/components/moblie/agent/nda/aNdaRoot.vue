<template>
  <keep-alive>
    <div class="aNdaRoot">
      <A-Ndaclause v-show="nowIndex == 'ndaClause'"></A-Ndaclause>
      <NDA-signature v-if="nowIndex == 'NDAsignature'"></NDA-signature>
      <NDA-submit v-if="nowIndex == 'NDAsubmit'"></NDA-submit>
    </div>
  </keep-alive>
</template>
<script>
import aNdaclause from "./aNdaclause";
import NDAsignature from "./NDAsignature";
import NDAsubmit from "./NDAsubmit";
export default {
  provide() {
    return {
      NDAcontract: this.NDAcontract,
      goto: this.goto,
    };
  },
  components: {
    "A-Ndaclause": aNdaclause,
    "NDA-signature": NDAsignature,
    "NDA-submit": NDAsubmit,
  },
  data() {
    return {
      nowIndex: "ndaClause",
      NDAcontract: {
        projectPartybehalf: "",
        projectPartyname: "",
        projectPartytitle: "",
        projectPartySignature: "",
        projectPartySigntime: "",
        middlemanbehalf: "",
        middlemanname: "",
        middlemantitle: "",
        middlemanSignature: "",
        middlemanSigntime: "",
        editorContent: "",
      },
    };
  },
  methods: {
    goto(num) {
      this.nowIndex = num;
    },
  },
};
</script>
<style lang='scss' scoped>
#aNdaRoot {
  height: 100vh;
  width: 100vw;
  // background: #2f36ac;
  display: flex;
  flex-direction: column;
  align-items: center;

  main {
    // align-items: center;
    color: #000;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: vw(184) vw(94) vw(116);
    font-size: vw(30);

    footer {
      display: flex;
      justify-content: center;
      button {
        color: #ffffff;
        border-radius: vw(16);
        width: vw(226);
        font-weight: bold;
        line-height: vw(72);
        height: vw(72);
        font-size: vw(24);
        background: #00f0ab;
        // background: #00f0ab;
      }
    }
  }
}
</style>
