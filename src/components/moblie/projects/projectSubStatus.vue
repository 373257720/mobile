<template>
  <div id="projectSubStatus">
    <!-- <commonnav>{{$t('project.projectStatus')}}</commonnav> -->
    <commonnav>
      {{$t('project.projectStatus')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
      <ul>
        <li v-for="(item,idx) in multipleList" :key="idx">
          <div @click="clickItem(item)" v-if="item.arr.length>0">
            <p>{{item.text}}</p>
            <aside>{{item.arr.length>0?item.arr.length:0}}</aside>
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
  // props: {
  //   selectedItem: {
  //     type: Object,
  //   }
  // },
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
          total: 0
        }
      },
      multipleList: {
        PendingItems: {
          arr: [],
          text: this.$t("project.PendingItems"),
          total: 0
          //1
        },
        NDArequestitem: {
          arr: [],
          text: this.$t("project.NDArequestitem"),
          total: 0
          //nda-1
        },
        NDAprojecttobesigned: {
          arr: [],
          text: this.$t("project.NDAprojecttobesigned"),
          total: 0
          //nda-2
        },
        SignedNDAtobelisted: {
          arr: [],
          text: this.$t("project.SignedNDAtobelisted"),
          total: 0
          //nda-3
        },
        NDAhasChained: {
          arr: [],
          text: this.$t("project.NDAhasChained"),
          total: 0
          //nda-4
        },
        Projecttobesigned: {
          arr: [],
          text: this.$t("project.Projecttobesigned"),
          total: 0
          //2
        },
        MiddleAgreeContract: {
          arr: [],
          text: this.$t("project.MiddleAgreeContract"),
          total: 0
          //4
        },
        waitMiddleSigned: {
          arr: [],
          text: this.$t("project.waitMiddleSigned"),
          total: 0
          //7
        },
        unfinishedSignContract: {
          arr: [],
          text: this.$t("project.unfinishedSignContract"),
          total: 0
          //8
        },
        chainedToRecommand: {
          arr: [],
          text: this.$t("project.chainedToRecommand"),
          total: 0
          //9
        },
        waitChecked: {
          arr: [],
          text: this.$t("project.waitChecked"),
          total: 0
          //50,12
        },
        CheckedTosend: {
          arr: [],
          text: this.$t("project.CheckedTosend"),
          total: 0
          //51,13
        },
        waitComfirm: {
          arr: [],
          text: this.$t("project.waitComfirm"),
          total: 0
          //52,15
        },
        waitreadyContract: {
          arr: [],
          text: this.$t("project.waitreadyContract"),
          total: 0
          //16
        },
        successfulSigned: {
          arr: [],
          text: this.$t("project.successfulSigned"),
          total: 0
          //53,24
        },
        failedSigned: {
          arr: [],
          text: this.$t("project.failedSigned"),
          total: 0
          //3,5,6,54
        }
      }
    };
  },
  created() {
    this.acceptOrRejectCommission();
  },
  // components: {
  //   loadmore
  // },
  methods: {
    clickItem(item) {
      this.$store.commit("selectedItemMutations", item);
      // this.selectedItem=item;
      // this.$emit('update:selectedItem',item)
      this.$routerto("projectList");
    },
    acceptOrRejectCommission() {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectStatusList`
        )
        .then(res => {
          this.$store.commit("isloading", false);
          this.signList = res.data.data.signList;
          // this.statusList = [
          //   ...res.data.data.ndaList,
          //   ...res.data.data.signList
          // ];
          // var len = this.statusList.length;
          this.signList.forEach(item => {
            switch (item.signStatus4) {
              case 1:
                this.multipleList.PendingItems.arr.push(item);
                break;
              case 2:
                this.multipleList.Projecttobesigned.arr.push(item);
                break;
              case 4:
                this.multipleList.MiddleAgreeContract.arr.push(item);
                break;

              case 7:
                this.multipleList.waitMiddleSigned.arr.push(item);
                break;
              case 8:
                this.multipleList.unfinishedSignContract.arr.push(item);
                break;
              case 9:
                this.multipleList.chainedToRecommand.arr.push(item);
                break;
              case 16:
                this.multipleList.waitreadyContract.arr.push(item);
                break;
              // waitChecked
              case 50:
                this.multipleList.waitChecked.arr.push(item);
                break;
              case 12:
                this.multipleList.waitChecked.arr.push(item);
                break;

                waitreadyContract;
              // CheckedTosend
              case 51:
                this.multipleList.CheckedTosend.arr.push(item);
                break;
              case 13:
                this.multipleList.CheckedTosend.arr.push(item);
                break;
              // waitComfirm
              case 52:
                this.multipleList.waitComfirm.arr.push(item);
                break;
              case 15:
                this.multipleList.waitComfirm.arr.push(item);
                break;
              // successfulSigned
              case 53:
                this.list[24].arr.push(item);
                this.multipleList.successfulSigned.arr.push(item);
                break;
              case 24:
                this.list[24].arr.push(item);
                this.multipleList.successfulSigned.arr.push(item);
                break;
              // failedSigned
              case 3:
                this.multipleList.failedSigned.arr.push(item);
                break;
              case 5:
                this.multipleList.failedSigned.arr.push(item);
                break;
              case 6:
                this.multipleList.failedSigned.arr.push(item);
                break;
              case 54:
                this.multipleList.failedSigned.arr.push(item);
                break;
            }
          });

          console.log(this.multipleList);
        });
    },
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
