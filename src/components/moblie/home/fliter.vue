<template>
  <div id="mhome">
    <commonnav>
      Fliter
      <template v-slot:arrowRight>
        <van-icon name="arrow" />
      </template>
    </commonnav>
    <main>
      <div class="mhome-tag">
        <ul>
          <li  v-for="(item,idx) in taglist" :key="item.name">
            <p>
              {{item.name}}
              <span @click="delectTag(item,idx)">+</span>
            </p>
          </li>
        </ul>
        <article>
          <div>
            <p class="label">Industry</p>
            <div class="item">
              <p>
                <span>Biodiversity</span>
                <span>,</span>
                <span>Biodiversity</span>
              </p>
              <van-icon name="arrow" @click="$routerto('mutilPick')"  />
            </div>
          </div>
          <div>
            <p class="label">Industry</p>
            <div class="item">
              <p>
                <span>Biodiversity</span>
                <span>Biodiversity</span>
              </p>
              <van-icon name="arrow" @click="$routerto('mutilPick')"/>
            </div>
          </div>
          <div>
            <p class="label">Industry</p>
            <div class="item">
              <p>
                <span>Biodiversity</span>
                <span>Biodiversity</span>
              </p>

              <van-icon name="arrow" @click="$routerto('mutilPick')" />
            </div>
          </div>
        </article>
      </div>
      <footer>
        <button>Search</button>
      </footer>
    </main>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
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
    delectTag(item, idx) {
      this.taglist.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
#mhome {
  main {
    // padding-top: vw(212);
    width: 100%;
    padding: vw(140) vw(60) vw(116) vw(60);
    ul {
      display: flex;
      // flex-wrap: wrap;
      flex-flow: row wrap;
      margin-bottom: vw(60);
      // padding-top: vw(10);
      li {
        color: #3ab5cc;
        height: vw(53);
        border: vw(2) solid #3ab5cc;
        border-radius: vw(52);
        padding: 0 vw(26);
        margin-right: vw(20);
        margin-bottom: vw(10);
        p {
          font-size: vw(26);
          line-height: vw(53);
          span {
          }
          // &::after {
          //   content: "+";
          //   margin-left: vw(10);
          // }
        }
      }
    }
    article {
      p.label {
        font-size: vw(40);
        font-weight: bold;
        color: #4f3dad;
        opacity: 1;
        margin-bottom: vw(56);
      }
      div.item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: vw(142);
        color: #4f3dad;
        p {
          display: flex;
          align-items: center;
        }
        span {
          font-size: vw(30);
        }
        i {
          font-size: vw(40);
        }
      }
    }
    footer {
      display: flex;
      justify-content: center;
      button {
        width: vw(528);
        height: vw(114);
        background: #00f0ab;
        border-radius: vw(40);
        font-size: vw(40);
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>

