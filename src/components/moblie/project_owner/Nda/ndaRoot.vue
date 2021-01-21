<template>
  <keep-alive>
    <div class="secondLayer">
      <NDA-Clause v-show="nowIndex == 'ndaClause'"></NDA-Clause>
      <NDA-signature v-if="nowIndex == 'NDAsignature'"></NDA-signature>
      <NDA-submit v-show="nowIndex == 'NDAsubmit'"></NDA-submit>
    </div>
  </keep-alive>
</template>
<script>
import NDAClause from "./ndaClause";
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
    "NDA-Clause": NDAClause,
    "NDA-signature": NDAsignature,
    "NDA-submit": NDAsubmit,
  },
  data() {
    return {
      nowIndex:"ndaClause",
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
