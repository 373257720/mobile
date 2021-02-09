<template>
  <div id="projectDetails">
    <commonnav>
      project detail
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
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
        <div class="projectsDetails-recommand">
          <!-- <div>
            You have not recommend
            any investors before.
          </div>-->
          <div class="project-swipe">
            <van-icon name="arrow-left" @click="privous" />
            <p>
              Investors you recommend
              before
            </p>
            <div class="project-swipe-plugin">
              <van-swipe ref="swipe" :autoplay="3000" :show-indicators="false" @change="onChange">
                <template #default>
                  <van-swipe-item>
                    <h3>
                      Investors you recommend
                      before
                    </h3>
                    <ul>
                      <li>
                        <aside></aside>
                        <article>Recommended countdown: 5 days</article>
                      </li>
                      <li>
                        <aside></aside>
                        <article>Recommended countdown: 5 days</article>
                      </li>
                      <li>
                        <aside></aside>
                        <article>Recommended countdown: 5 days</article>
                      </li>
                      <li>
                        <aside></aside>
                        <article>Recommended countdown: 5 days</article>
                      </li>
                    </ul>
                  </van-swipe-item>
                  <van-swipe-item>2</van-swipe-item>
                  <van-swipe-item>3</van-swipe-item>
                </template>
                <!-- <template #indicator>
                  <div class="custom-indicator">{{ current + 1 }}/4</div>
                </template>-->
              </van-swipe>
            </div>
            <p @click="$routerto('a_recommand_i')">See all</p>
            <van-icon name="arrow" @click="next" />
          </div>
          <div @click="$routerto('recent_recommand')">Recommend More</div>
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
          <p @click="signNDA">Sign NDA terms</p>
          <button>Interested</button>
          <button @click="$routerto('signContractStep1')">Sign Contract</button>
        </footer>
      </div>
    </main>
    <DialogMsg
      :remindervisible.sync="remindervisible"
      :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText"
      @comfirmFromDialog="comfirmFromDialog"
      :title="title"
      :showCancel="true"
      :msg="msg"
    ></DialogMsg>
    <DialogMsg
      :remindervisible.sync="remindervisible2"
      :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText"
      @comfirmFromDialog="gotoNDA"
      :title="title"
      :showCancel="true"
      :msg="msg"
    ></DialogMsg>
  </div>
</template>
<script>
export default {
  name: "mhome",
  data() {
    return {
      current: 0,
      msg: "",
      remindervisible2: false,
      confirmButtonText: "",
      cancelButtonText: "",
      title: "",
      remindervisible: false,
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
    gotoNDA() {
      this.remindervisible = false;
      this.$routerto("ndaClause");
    },
    comfirmFromDialog(data) {
      this.remindervisible = false;
      setTimeout(() => {
        this.title = "Sign NDA";
        this.msg = "Please sign the NDA to get more information";
        this.confirmButtonText = "Yes";
        this.cancelButtonText = "No";
        this.remindervisible2 = true;
      }, 300);
    },
    signNDA() {
      this.title = "Request project details";
      this.msg = "You can sign the NDA to get more information";
      this.confirmButtonText = "Yes";
      this.cancelButtonText = "No";
      this.remindervisible = true;
    },
    privous() {
      this.$refs.swipe.prev();
    },
    next() {
      this.$refs.swipe.next();
    },
    onChange(index) {
      this.current = index;
    },
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
<style lang="scss" >
/* .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  } */
.van-swipe {
  // &:before{
  //     content: "\e630"
  // }
}
</style>
<style lang="scss" scoped>
#projectDetails {
  main {
    // padding-top: vw(212);
    padding: vw(192) vw(70) vw(80);
    color: #4f3dad;
    .project-swipe {
      padding: vw(38) vw(80) vw(76);
      p:nth-of-type(1) {
        font-size: vw(36);
        font-weight: bold;
        line-height: vw(42);
        color: #ffffff;
        margin-bottom: vw(52);
      }

      p:nth-of-type(2) {
        margin-top: vw(62);
        font-size: vw(24);
        text-align: center;
        font-weight: bold;
        color: #ffffff;
        text-decoration: underline;
      }
      .project-swipe-plugin {
        width: vw(458);
        margin: 0 auto;
        h3 {
          font-size: vw(30);
          font-weight: bold;
          color: #ffffff;
        }
        li {
          display: flex;
          margin-bottom: vw(30);
          aside {
            width: vw(29);
            height: vw(29);
            background: #fff;
          }
          article {
            font-size: vw(24);
            font-weight: bold;
            line-height: vw(28);
            color: #ffffff;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }

        // background: red;
      }
      position: relative;
      .van-icon-arrow-left {
        position: absolute;
        top: 50%;
        font-size: vw(27);
        transform: translate(0, -50%);
        left: vw(24);
      }
      .van-icon-arrow {
        position: absolute;
        top: 50%;
        font-size: vw(27);
        transform: translate(0, -50%);
        right: vw(24);
      }
    }
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
    .projectsDetails-recommand {
      color: #ffffff;
      > div:nth-of-type(1) {
        width: 100%;
        // height: vw(594);
        background: #3ab5cc;
        border-radius: vw(30);
        margin-bottom: vw(36);
      }
      > div:nth-of-type(2) {
        width: vw(602);
        height: vw(72);
        line-height: vw(72);
        text-align: center;
        background: #00f0ab;
        font-size: vw(26);
        border-radius: vw(16);
        margin-bottom: vw(104);
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
