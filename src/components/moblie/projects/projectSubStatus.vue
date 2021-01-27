<template>
  <div id="projectSubStatus">
    <!-- <commonnav>{{$t('project.projectStatus')}}</commonnav> -->
    <commonnav>
      {{ $t("project.projectStatus") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="goback" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
      <ul>
        <li v-for="(item, idx) in multipleList" :key="idx">
          <div @click="clickItem(item)">
            <p>{{ item.text }}</p>
            <aside>{{ item.arr.length > 0 ? item.arr.length : 0 }}</aside>
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
  beforeRouteLeave(to, from, next) {
    if (to.name === "projectStatus") {
      to.meta.keepAlive = false;
    }
    next();
  },
  data() {
    return {
      num: 10,
      refreshing: false,
      loading: false,
      text: "List",
      statusList: [],
      signList: [],
      list: {
        0: {
          arr: [],
          text: "",
          type: 0,
        },
      },
      multipleList: [],
    };
  },
  activated() {
    // console.log(this.$store.state.selectedProjectStatus);
    if (this.$store.state.currentUsertype == 4) {
      let type;
      if (this.$route.query && this.$route.query.type) {
        type = parseInt(this.$route.query.type);
      }
      switch (type) {
        case 1:
          this.multipleList = [
            {
              arr: [],
              text: this.$t("project.PendingItems"),
              type: [1],
              nda: null,
              //1
            },
            {
              arr: [],
              text: this.$t("project.NDArequestitem"),
              type: null,
              nda: 1,
              //nda-1
            },
            {
              arr: [],
              text: this.$t("project.NDAprojecttobesigned"),
              type: null,
              nda: 2,
              //nda-2
            },
            {
              arr: [],
              text: this.$t("project.SignedNDAtobelisted"),
              type: null,
              nda: 3,
              //nda-3
            },
            {
              arr: [],
              text: this.$t("project.NDAhasChained"),
              type: null,
              nda: 4,
              //nda-4
            },
            {
              arr: [],
              text: this.$t("project.Projecttobesigned"),
              type: [2],
              nda: null,
              //2
            },
            {
              arr: [],
              text: this.$t("project.MiddleAgreeContract"),
              type: [4],
              nda: null,
              //4
            },
            {
              arr: [],
              text: this.$t("project.Waitingforyoutosignthecontract"),
              type: [7],
              nda: null,
              //7
            },
            {
              arr: [],
              text: this.$t("project.unfinishedSignContract"),
              type: [8],
              nda: null,
              //8
            },
            {
              arr: [],
              text: this.$t("project.chainedToRecommand"),
              type: [9],
              nda: null,
              //9
            },
            {
              arr: [],
              text: this.$t("project.failedSigned"),
              type: [3, 5, 6, 14, 17, 20, 22, 32],
              nda: null,
              //3, 5, 6, 14, 17, 20, 22, 32
            },
          ];
          break;
        case 2:
          this.multipleList = [
            {
              arr: [],
              text: "待审核 你推荐的中间人资料",
              type: [12],
            },
            {
              arr: [],
              text: "已审核待发送",
              type: [13],
            },
            {
              arr: [],
              text: "已发送待确认",
              type: [15],
            },
            {
              arr: [],
              text: "已确认等待项目方准备合同资料",
              type: [16],
            },
            {
              arr: [],
              text: "（投行）已收到合同资料待发送",
              type: [18],
            },
            {
              arr: [],
              text: "（中间人a）已发送，磋商中",
              type: [19],
            },
            {
              arr: [],
              text: "(中间人b）已确认待签约",
              type: [21],
            },
            {
              arr: [],
              text: "（中间人a）等待你推荐的中间人签约",
              type: [23],
            },
            {
              arr: [],
              text: "（中间人b）你推荐的中间人暂未完成签约程序",
              type: [24],
            },
            {
              arr: [],
              text: "（后台系统）你推荐的中间人已上链",
              type: [25],
            },
            {
              arr: [],
              text: this.$t("project.failedSigned"),
              type: [3, 5, 6, 14, 17, 20, 22, 32],
            },
          ];
          break;
        case 3:
          this.multipleList = [
            {
              arr: [],
              text: "(中间人b)收到推荐待确认",
              type: [30],
            },
            {
              arr: [],
              text: "中间人b)已确认待项目方准备合约",
              type: [31],
            },
            {
              arr: [],
              text: " (中间人b)待上家中间人填写分成机制",
              type: [33],
            },
            {
              arr: [],
              text: " (中间人b) 已收到合约待确认",
              type: [34],
            },
            {
              arr: [],
              text: "(中间人b)与上家中间人磋商中",
              type: [35],
            },
            {
              arr: [],
              text: "(中间人b)已同意待上家中间人签约",
              type: [36],
            },
            {
              arr: [],
              text: "(中间人b)已拒绝和上家中间人签约",
              type: [37],
            },
            {
              arr: [],
              text: "中间人a)等待你签约",
              type: [38],
            },
            {
              arr: [],
              text: "(中间人a)上家中间人拒绝和你签约",
              type: [39],
            },
            {
              arr: [],
              text: "(中间人b)你暂时未完成签约程序",
              type: [40],
            },
            {
              arr: [],
              text:
                "（后台系统）已上链待推荐（上链成功，等待我推荐新的中间人或投资者）",
              type: [41],
            },
            {
              arr: [],
              text: this.$t("project.failedSigned"),
              type: [3, 5, 6, 14, 17, 20, 22, 32],
            },
          ];
          break;
        case 4:
          this.multipleList = [
            {
              arr: [],
              text: "待审核你推荐的投资者资料",
              type: [50],
            },
            {
              arr: [],
              text: "已审核等待你发送链接给投资者",
              type: [51],
            },
            {
              arr: [],
              text: "等待你推荐的投资人确认",
              type: [52],
            },
            {
              arr: [],
              text: "与你推荐的投资者签约成功项目",
              type: [53],
            },
            {
              arr: [],
              text: "投资人拒绝",
              type: [54],
            },
            {
              arr: [],
              text: this.$t("project.failedSigned"),
              type: [3, 5, 6, 14, 17, 20, 22, 32],
            },
          ];

          break;
      }
      console.log(this.$store.state.selectedProjectStatus.arr);
      this.$store.state.selectedProjectStatus.arr.forEach((item) => {
        this.multipleList.forEach((self) => {
          if (item.signStatus4) {
            // console.log(item.signStatus4);
            if (self.type instanceof Array) {
              for (let j = 0; j < self.type.length; j++) {
                // console.log(self.type[j], item.signStatus4);
                if (self.type[j] == item.signStatus4) {
                  self.arr.push(item);
                }
              }
            }
          }
          if (item.signNdaStatus) {
            if (self.nda) {
              if (self.nda == item.signNdaStatus) {
                self.arr.push(item);
              }
            }
          }
        });
      });
      // console.log(this.multipleList);
    }

    if (this.$store.state.currentUsertype == 1) {
      this.multipleList = [
        {
          arr: [],
          text: this.$t("project.PendingItems"),
          type: [1],
          nda: null,
          //1
        },
        {
          arr: [],
          text: this.$t("project.NDArequestitem"),
          type: null,
          nda: 1,
          //nda-1
        },
        {
          arr: [],
          text: this.$t("project.NDAprojecttobesigned"),
          type: null,
          nda: 2,
          //nda-2
        },
        {
          arr: [],
          text: this.$t("project.SignedNDAtobelisted"),
          type: null,
          nda: 3,
          //nda-3
        },
        {
          arr: [],
          text: this.$t("project.NDAhasChained"),
          type: null,
          nda: 4,
          //nda-4
        },
        {
          arr: [],
          text: this.$t("project.Projecttobesigned"),
          type: [2],
          nda: null,
          //2
        },
        {
          arr: [],
          text: this.$t("project.MiddleAgreeContract"),
          type: [4],
          nda: null,
          //4
        },
        {
          arr: [],
          text: this.$t("project.waitMiddleSigned"),
          type: [7],
          nda: null,
          //7
        },
        {
          arr: [],
          text: this.$t("project.unfinishedSignContract"),
          type: [8],
          nda: null,
          //8
        },
        {
          arr: [],
          text: this.$t("project.chainedToRecommand"),
          type: [9],
          nda: null,
          //9
        },
        {
          arr: [],
          text: this.$t("project.waitChecked"),
          type: [50, 12],
        },
        {
          arr: [],
          text: this.$t("project.CheckedTosend"),
          type: [51, 13],
        },
        {
          arr: [],
          text: this.$t("project.waitComfirm"),
          type: [52, 15],
        },
        {
          arr: [],
          text: this.$t("project.waitreadyContract"),
          type: [16],
        },
          {
          arr: [],
          text: "投行准备了合约发给中间人a，等待中间人a查看",
          type: [18],
        },
        {
          arr: [],
          text: this.$t("project.successfulSigned"),
          type: [53, 24],
        },
        {
          arr: [],
          text: this.$t("project.failedSigned"),
          type: [3, 5, 6, 54],
        },
      ];
      console.log(this.multipleList);
      this.acceptOrRejectCommission();
    }
  },
  methods: {
    goback() {
      if (this.$store.state.currentUsertype == 1) {
        this.$routerto("mysign");
      } else if (this.$store.state.currentUsertype == 4) {
        this.$routerto("projectStatus", {
          projectId: this.$route.query.projectId,
        });
      }
    },
    clickItem(item) {
      if (item.arr.length) {
        this.$store.commit("selectedItemMutations", item);
        this.$routerto("projectList");
      }
    },
    acceptOrRejectCommission() {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectStatusList`,
          { projectId: this.$route.query.projectId }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            let data = res.data.data;
            for (let key in data) {
              if (key == "signList") {
                data[key].forEach((item) => {
                  //  [3,5,6,14,17,20,22,32]已拒绝项目（中间人感兴趣，拒绝；中间人推荐下家或者投资人被拒绝；磋商拒绝）
                  this.multipleList.forEach((self) => {
                    if (self.type instanceof Array) {
                      self.type.forEach((j) => {
                        if (j == item.signStatus4) {
                          self.arr.push(item);
                        }
                      });
                    }
                  });
                });
              } else if (key == "ndaList") {
                data[key].forEach((item) => {
                  this.multipleList.forEach((self) => {
                    if (self.nda && self.nda == item.signNdaStatus) {
                      self.arr.push(item);
                    }
                  });
                });
              }
            }
          }
        });

      // let data = res.data.data;

      // this.$global
      //   .post_encapsulation(
      //     `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectStatusList`
      //   )
      //   .then(res => {

      //   });
    },
  },
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
    padding: vw(228) 0 vw(114);
    ul {
      li {
        display: flex;
        // height: vw(92);
        justify-content: center;
        // padding: vw(30) 0;

        div {
          display: flex;
          align-items: center;
          width: vw(522);
          background: #4f3dad;
          padding: vw(30) vw(20);
          border-radius: vw(16);
          margin-bottom: vw(60);
          color: #ffffff;
          p {
            width: vw(400);
            // height: vw(92);
            font-size: vw(26);
            font-weight: bold;
            text-align: center;
            line-height: vw(30);
            // padding-left: vw(76);
            margin-right: vw(10);
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
