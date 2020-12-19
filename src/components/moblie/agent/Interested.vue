<template>
  <div id="agentProjectDetail">
    <commonnav>
      {{$t('common.ProjectDetails')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>

    <main>
      <div class="mhome-tag">
        <h2>{{ProjectDetail.projectName}}</h2>
        <h3>Signed intermediary({{ProjectDetail.committedCount}})/Signed investor({{ProjectDetail.interestProjectCount}})</h3>
        <div class="projectMoney">
          <aside class="iconfont icon-1"></aside>
          <p>
            <span>{{ProjectDetail.committedCount}}</span>
            <span>${{ProjectDetail.collectMoneyMin}}-{{ProjectDetail.collectMoneyMax}}</span>
          </p>
        </div>
        <div class="projectDetail">
          <aside class="iconfont icon-3"></aside>
          <div>
            <article ref="article" :style="{height:articleHight}">
              <p ref="articleOrign">{{ProjectDetail.projectDescribe}}</p>
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
          <p @click="signNDA">{{$t("project.SignNDAterms")}}</p>
          <!-- <p @click="signNDA">{{$t("project.NDAcontract")}}</p> -->
          <button @click="clickInterested">{{$t('project.Interested')}}</button>
          <!-- <button @click="$routerto('signContractStep1')">{{$t('project.SignContract')}}</button>
          <button @click="$routerto('signContractStep1')">{{$t('project.Contractwithibank')}}</button>-->
        </footer>
      </div>
    </main>
    <DialogMsg
      :remindervisible.sync="remindervisible"
      :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText"
      @comfirmFromDialog="comfirmFromDialog"
      :title="title"
      :msgtype="msgtype"
      :showCancel="true"
      :msg="msg"
    ></DialogMsg>
    <!-- <DialogMsg
      :remindervisible.sync="remindervisible2"
      :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText"
      @comfirmFromDialog="gotoNDA"
      :title="title"
      :showCancel="true"
      :msg="msg"
    ></DialogMsg>-->
  </div>
</template>
<script>
export default {
  name: "agentProjectDetail",
  data() {
    return {
      current: 0,
      msg: "",
      msgtype: "",
      remindervisible2: false,
      confirmButtonText: "",
      cancelButtonText: "",
      title: "",
      remindervisible: false,
      articleHight: null,
      ProjectDetail: {
        projectName: "",
        committedCount: 0,
        interestProjectCount: 0,
        collectMoneyMin: "",
        collectMoneyMax: "",
        projectDescribe: ""
      },
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
  created() {
    this.projectId = this.$route.query.projectId;
    this.getProjectDetails();
  },
  methods: {
    getProjectDetails() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/project/getProjectDetails`,
          { projectId: this.projectId }
        )
        .then(res => {
         this.$store.commit("isloading", false);
          for (let key in this.ProjectDetail) {
            for (let i in res.data.data.data) {
              if (key === i) {
                  
                if (key == "projectName") {
                //   this.ProjectDetail[key] = res.data.data.data[projectNameEn];
                }
              }
            }
          }
          // this.ProjectDetail=res.data.data.data
          // console.log(this.ProjectDetail);
        });
    },
    clickInterested() {
      this.$store.commit("isloading", true);
      this.$global
        .get_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/projectSign/interested`,
          { projectId: this.projectId, projectUserId: "263" }
        )
        .then(res => {
          this.$store.commit("isloading", false);
          this.remindervisible = true;
          this.msgtype = "interested";
          this.msg = "您还可以签署NDA来获取该项目更多的资讯";
        });
    },
    gotoNDA() {
      this.remindervisible = false;
      this.$routerto("ndaClause");
    },
    comfirmFromDialog(data) {
      console.log(data);
      this.remindervisible = false;
      //   if (data == "interested") {
      //     this.$routerto("ndaClause");
      //   }
      this.$routerto("ndaClause");
      //   setTimeout(() => {
      //     // this.title = "Sign NDA";
      //     // this.msg = "Please sign the NDA to get more information";
      //     // this.confirmButtonText = "Yes";
      //     // this.cancelButtonText = "No";\
      //     this.$routerto("ndaClause");
      //     // this.remindervisible2 = true;
      //   }, 300);
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
#agentProjectDetail {
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
        // height: vw(30);

        margin-right: vw(20);
        font-size: vw(29);
        // width: vw(30);
        // background: #4f3dad;
        // margin-right: vw(26);
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

    div.isSuccessful,
    div.isFailed {
      nav {
        display: flex;
        justify-content: center;
        p {
          width: vw(332);
          height: vw(193);
          background: #3ab5cc;
          opacity: 1;
        }
      }
      section {
        display: flex;
        justify-content: space-between;
        margin-bottom: vw(70);
        span {
          font-size: vw(30);
          font-family: Helvetica Neue;
          font-weight: bold;
          line-height: vw(34);
          color: #3ab5cc;
        }
      }

      .Bname {
        > p {
          margin-bottom: vw(34);
          font-size: vw(30);
          font-weight: bold;
        }
      }
    }
    div.isSuccessful {
      header {
        color: #3ab5cc;
        font-weight: bold;
        margin-bottom: vw(60);
        span {
          font-size: vw(24);
          line-height: vw(28);
        }
        span:first-of-type {
          font-size: vw(60);
          font-weight: bold;
        }
      }
      footer {
        margin-bottom: vw(156);
        button {
          width: vw(250);
          height: vw(72);
          background: #00f0ab;
          opacity: 1;
          border-radius: vw(16);
        }
      }
    }
    div.isFailed {
      header {
        color: #3ab5cc;
        font-weight: bold;
        margin-bottom: vw(60);
        text-align: center;
        span {
          font-size: vw(24);
          font-weight: bold;
          color: #3ab5cc;
          opacity: 1;
        }
      }
      footer {
        margin-bottom: vw(156);
        article {
          width: vw(542);
          font-size: vw(20);
          font-family: Helvetica Neue;
          font-weight: bold;
          line-height: vw(22);
          color: #3ab5cc;
        }
      }
    }
    .projectsDetails-recommand {
      color: #ffffff;
      .project-swipe {
        width: 100%;
        // height: vw(594);
        background: #3ab5cc;
        border-radius: vw(30);
        margin-bottom: vw(36);
      }
      .recommand {
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
      margin-bottom: vw(56);
      aside {
        margin-right: vw(20);
        font-size: vw(29);
        // background: #4f3dad;
        // margin-right: vw(26);
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
        min-width: vw(186);
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
