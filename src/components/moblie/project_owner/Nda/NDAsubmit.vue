<template>
  <div id="NDAsubmit">
    <commonnav>
       NDA clause
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="goto('NDAsignature')" />
      </template>
    </commonnav>
    <main class="main">
      <div class="contractBox">
        <div class="middle wangedtior" v-html="NDAcontract.editorContent"></div>
        <div class="info">
          <ul>
            <li>
              <nav>For and on behalf of:</nav>
              <h3>{{ NDAcontract.projectPartybehalf }}</h3>
            </li>
            <li>
              <div>
                <p class="signature">
                  <img
                    v-if="NDAcontract.projectPartySignature"
                    :src="NDAcontract.projectPartySignature"
                    alt
                  />
                </p>
              </div>
              <p>Signature</p>
            </li>
            <li>
              <p>
                <span>{{ NDAcontract.projectPartyname }}</span>
              </p>
              <p>Name</p>
            </li>
            <li>
              <p>
                <span>{{ NDAcontract.projectPartytitle }}</span>
              </p>
              <p>Title</p>
            </li>
            <li>
              <p>
                <span>{{
                  $global.newdateTodate(NDAcontract.projectPartySigntime)
                }}</span>
              </p>
              <p>Date</p>
            </li>
          </ul>
          <ul>
            <li>
              <nav>For and on behalf of:</nav>
              <h3>{{ NDAcontract.middlemanbehalf }}</h3>
            </li>
            <li>
              <div>
                <p class="signature">
                  <img
                    v-if="NDAcontract.middlemanSignature"
                    :src="NDAcontract.middlemanSignature"
                    alt
                  />
                </p>
              </div>
              <p>Signature</p>
            </li>
            <li>
              <p>
                <span>{{ NDAcontract.middlemanname }}</span>
              </p>
              <p>Name</p>
            </li>
            <li>
              <p>
                <span>{{ NDAcontract.middlemantitle }}</span>
              </p>
              <p>Title</p>
            </li>
            <li>
              <p>
                <span>{{
                  $global.newdateTodate(NDAcontract.middlemanSigntime)
                }}</span>
              </p>
              <p>Date</p>
            </li>
          </ul>
        </div>
      </div>

      <footer>
        <button class="button is-primary" @click.prevent="submit_click">
          Submit
        </button>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "NDAsubmit",
  inject: ["NDAcontract", "goto"],
  data() {
    return {};
  },
  computed: {},
  created() {
    console.log(this.NDAcontract);
  },
  mounted() {},
  methods: {
    submit_click() {
      console.log(this.NDAcontract);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectNda/investmentBankSubmitSignNda`,
          {
            signId: this.$route.query.signId,
            middlemanId: this.$route.query.middlemanId,
            htmlData:JSON.stringify(this.NDAcontract) ,
          }
        )
        .then((res) => {

        });
      //   this.$routerto("NDAsignature");
    },
  },
};
</script>



<style lang='scss'>
</style>
<style lang='scss' scoped>
#NDAsubmit {
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
    .contractBox {
      overflow-y: auto;
      flex: 1;
      padding: vw(30) vw(20);
      border: 2px solid #4f3dad;
      margin-bottom: 10%;
      div.info {
        font-size: 12px;
        line-height: 14px;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        ul {
          width: 40%;
          li {
            p {
              height: 1rem;
            }
            p.signature {
              text-align: center;
              height: 2rem;
              img {
                // width: 100%;
                // height: 100%;
                // height: 1rem;
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
              }
            }
            p:nth-child(1) {
              position: relative;
              span {
                position: absolute;
                line-height: 0.44rem;
                word-break: break-all;
                bottom: 0;
              }
              /*line-height:1rem;*/
              line-height: initial;
            }
            p:nth-child(2) {
              font-weight: 600;
              border-top: 1px solid black;
            }
          }
          li:nth-of-type(1) {
            margin-bottom: 0.6rem;
            nav {
              font-weight: 600;
            }
            h3 {
              height: 3rem;
              line-height: initial;
            }
          }
        }
      }
    }
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
