<template>
  <div id="projectsDetails">
    <commonnav>
      project detail
      <template v-slot:arrowRight>
        <van-icon name="arrow" />
      </template>
    </commonnav>
    <main>
      <div class="mhome-tag">
        <h2>CDC Biodiversité – Biodiversity Offsetting</h2>
        <h3>Signed intermediary(99)/Signed investor(99)</h3>
        <div class="projectMoney">
          <aside></aside>
          <p>
            <span>Biodiversity offsets</span>
            <span>$ 600,000,000,000</span>
          </p>
        </div>
        <div class="projectDetail">
          <aside></aside>
          <div>
            <article ref="article" :style="{height:articleHight}">
              <p ref="articleOrign">
                This is the first NCFF operation that supports
                a Biodiversity Offseting scheme. The operation
                consists of a EUR 5 million loan to the French
                CDC Biodiversité, a subsidiary of the Caisse
                des Dépots, who will use the loan for the
                rehabilitation and management of conservation
                sites around France. The rehabilitation and
                management of conservation sites will allow
                CDC Biodiversité to generate offset credits
                (Unités de Compensation) for clients which
                are required to offset their impacts on
                certain habitats and species as a condition
                of a planning permission. This EIB loan will enable
                CDC Biodiversité to support investment in new sites,
                while keeping its existing sites,
                some of which have high ecological value, and make the necessary
                investments to register and market the credits of those sites
                to comply with regulatory requirements in France.
              </p>
            </article>
            <p class="drop">
              <van-icon @click="dropdown" :class="{'rotate1':articleHight}" name="arrow-down" />
            </p>
          </div>
        </div>
        <ul>
          <li>
            <aside></aside>
            <p>Biodiversity offsets</p>
          </li>
          <li>
            <aside></aside>
            <p>Biodiversity offsets</p>
          </li>
          <li>
            <aside></aside>
            <p>Biodiversity offsets</p>
          </li>
          <li>
            <aside></aside>
            <p>Biodiversity offsets</p>
          </li>

          <li>
            <aside></aside>
            <p>Biodiversity offsets</p>
          </li>
          <li>
            <aside></aside>
            <p>Biodiversity offsets</p>
          </li>
          <li>
            <aside></aside>
            <p>Biodiversity offsets</p>
          </li>
        </ul>
        <footer>
          <p>Sign NDA terms</p>
          <button>Interested</button>
        </footer>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      articleHight: null,
      taglist: [
        {
          name: "Biodiversity",
          isactive: false
        },
        {
          name: "Transport",
          isactive: false
        },
        {
          name: "Computer",
          isactive: false
        },
        {
          name: "InnovFin",
          isactive: false
        },
        {
          name: "Comsdfdsputer",
          isactive: false
        },
        {
          name: "InnosdfdsfvFin",
          isactive: false
        }
      ]
    };
  },
  created() {},

  methods: {
    dropdown() {
      if (this.articleHight) {
        this.articleHight = null;
        return;
      }
      this.articleHight = this.$refs.articleOrign.clientHeight + "px";
    }
  }
};
</script>
<style lang="scss" scoped>
#projectsDetails {
  main {
    // padding-top: vw(212);
    padding: vw(192) vw(70) vw(80);
    color: #4f3dad;
    h2 {
      font-size: vw(50);
      font-weight: bold;
      line-height: vw(58);
      color: #4f3dad;
      margin-bottom: vw(34);
    }
    h3 {
      //   height: 28px;
      color: #4f3dad;
      font-size: vw(24);
      font-weight: bold;
      line-height: vw(30);
      margin-bottom: vw(34);
    }
    .projectMoney {
      display: flex;
      align-items: center;
      margin-bottom: vw(53);
      aside {
        height: vw(30);
        width: vw(30);
        background: #4f3dad;
        margin-right: vw(26);
      }
      p {
        flex: 1;
        display: flex;
        justify-content: space-between;
        span {
          font-size: vw(24);
          font-weight: bold;
          //   line-height: 29px;
        }
      }
    }
    .projectDetail {
      display: flex;
      //   align-items: center;
      margin-bottom: vw(56);
      aside {
        height: vw(30);
        width: vw(30);
        background: #4f3dad;
        margin-right: vw(26);
      }
      div {
        flex: 1;
        font-size: vw(24);
        font-weight: bold;

        article {
          height: vw(210);  
          overflow: hidden;
          line-height: vw(30);
          transition: all 1s ease-out;
          margin-bottom: vw(22);
          p:nth-of-type(1) {
          }
        }
        p.drop {
          text-align: center;
          .van-icon-arrow-down {
            transform-origin: center center;
            transform: rotate(0deg); //返回原点
            transition: transform 1s ease-out;
          }
          .van-icon::before {
            font-size: vw(30);

            font-weight: bold;
          }
          .rotate1 {
            transform-origin: center center;
            transform: rotate(180deg);
            transition: transform 1s ease-out;
          }
        }
      }
    }
    ul {
      li {
        display: flex;
        align-items: center;
        margin-bottom: vw(25);
        aside {
          width: vw(48);
          height: vw(48);
          background: #4f3dad;
          border-radius: 50%;
          margin-right: vw(30);
        }
        p {
          margin: 0;
          font-weight: bold;
          font-size: vw(24);
        }
      }
    }
    footer {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: vw(20);
        color: #00f0ab;
        text-decoration: underline;
        margin-bottom: vw(32);
      }
      button {
        width: vw(186);
        height: vw(72);
        background: #00f0ab;
        border-radius: vw(16);
        font-size: vw(26);
        line-height: vw(72);
        color: #ffffff;
      }
    }
  }
}
</style>

