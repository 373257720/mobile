<template>
  <div id="projectStatus">
    <!-- <commonnav>{{$t('project.projectStatus')}}</commonnav> -->
    <commonnav>
      {{$t('project.projectStatus')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$routerto('mysign')" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main>
      <ul>
        <li
          @click="clickItem(value)"
          v-for="(value,key) in multipleList"
          :key="key"
          v-if="value.arr.length>0"
        >
          <div>
            <p>{{value.text}}</p>
            <aside>{{value.arr.length}}</aside>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import loadmore from "../loadmore";
export default {
  name: "projectStatus",
  // beforeRouteLeave(to, from, next) {
  //   from.meta.keepAlive = false;
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {

  //   if (from.name === "signContractStep2" || from.name === "mysign") {
  //     // 处理页面缓存后，返回首页再次进入缓存页时数据为更新
  //     // 该生命周期无法获取到this，因此把vm实例当作参数传递
  //     next(vm => {
  //       // 因为我这里查询表单是动态的，所以首页进入时需要调用一次，在改方法中请求返回后调用了获取列表数据getTableDatas方法
  //       vm.getMyProjectStatusList();
  //     });
  //   } else if (!from.name) {
  //     // 处理刷新页面时，获取动态表单方法未执行，导致表单无法加载
  //     next(vm => {
  //        vm.getMyProjectStatusList();
  //     });
  //   } else {
  //     next()
  //     // 详情返回时只更新列表数据，因为如果在详情页面做了操作，列表数据状态会改变，其他使用缓存
  //     // next(vm => {
  //     //   vm.getTableDatas();
  //     // });
  //   }
  // },
  //  beforeRouteLeave(to, from, next) {
  //   from.meta.keepAlive = false
  //   next()
  // },
  data() {
    return {
      multipleList: {
        PendingItems: {
          arr: [],
          text: this.$t("project.YouAndProjectparty"),
          type: 1
          //signStatus4小于10
        },
        NDArequestitem: {
          arr: [],
          text: this.$t("project.YouRecommandMiddleman"),
          type: 2
          //signStatus4小于26大于11
        },
        NDAprojecttobesigned: {
          arr: [],
          text: this.$t("project.YouAndInverstor"),
          type: 3
          //signStatus4小于42大于29
        },
        SignedNDAtobelisted: {
          arr: [],
          text: this.$t("project.MiddlemanRecommandYou"),
          type: 4
          //signStatus4大于49
        }
      }
    };
  },
  created() {
    // console.log(123);
    this.getMyProjectStatusList();
  },
  activated() {
    // console.log(123);
  },
  methods: {
    clickItem(item) {
      this.$store.commit("selectedProjectStatusMutations", item);
      this.$routerto("projectSubStatus", { type: item.type });
    },
    getMyProjectStatusList(done) {
      this.$store.commit("isloading", true);
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectStatusList`,
          { projectId: this.$route.query.projectId }
        )

        .then(res => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode == 10000) {
            let data = res.data.data;
            for (let key in data) {
              if (key == "signList") {
                data[key].forEach(item => {
                  //  [3,5,6,14,17,20,22,32]已拒绝项目（中间人感兴趣，拒绝；中间人推荐下家或者投资人被拒绝；磋商拒绝）
                  if (item.signStatus4 < 10) {
                    if (
                      item.signStatus4 !== 3 &&
                      item.signStatus4 !== 5 &&
                      item.signStatus4 !== 6
                    ) {
                      this.multipleList.PendingItems.arr.push(item);
                    }
                  } else if (11 < item.signStatus4 < 26) {
                    if (
                      item.signStatus4 !== 14 &&
                      item.signStatus4 !== 17 &&
                      item.signStatus4 !== 20 &&
                      item.signStatus4 !== 22
                    ) {
                      this.multipleList.NDArequestitem.arr.push(item);
                    }
                  } else if (29 < item.signStatus4 < 42) {
                    if (item.signStatus4 !== 32) {
                      this.multipleList.NDAprojecttobesigned.arr.push(item);
                    }
                  } else if (item.signStatus4 > 49) {
                    this.multipleList.SignedNDAtobelisted.arr.push(item);
                  }
                });
                data.signList.forEach(item => {
                  if (
                    item.signStatus4 == 3 ||
                    item.signStatus4 == 5 ||
                    item.signStatus4 == 6 ||
                    item.signStatus4 == 14 ||
                    item.signStatus4 == 17 ||
                    item.signStatus4 == 20 ||
                    item.signStatus4 == 22 ||
                    item.signStatus4 == 32
                  ) {
                    this.multipleList.PendingItems.arr.push(item);
                    this.multipleList.NDArequestitem.arr.push(item);
                    this.multipleList.NDAprojecttobesigned.arr.push(item);
                    this.multipleList.SignedNDAtobelisted.arr.push(item);
                  }
                });
              } else if (key == "ndaList") {
                data[key].forEach(item => {
                  if (item.signNdaStatus) {
                    this.multipleList.PendingItems.arr.push(item);
                  }
                });
              }
            }
          }
        });
    }
  }
};
</script>
<style lang="scss">
/*van-fade-enter-active*/
/*van-fade-enter-to*/

#projectStatus {
  //   height: 100%;
}
</style>
<style lang="scss" scoped>
#projectStatus {
  // padding-top: vw(96);
  main {
    padding: vw(290) vw(64) 0;
    ul {
      li {
        width: vw(622);
        // height: vw(152);
        background: #4f3dad;
        padding: vw(30) 0;
        border-radius: vw(16);
        margin-bottom: vw(60);
        div {
          display: flex;

          //   justify-content: center;
          align-items: center;
          color: #ffffff;
          p {
            width: vw(472);
            // height: vw(92);
            font-size: vw(36);
            display: flex;
            align-items: center;
            font-weight: bold;
            line-height: vw(42);
            padding-left: vw(76);
            margin-right: vw(30);
          }
          aside {
            width: vw(52);
            height: vw(52);
            background: #00f0ab;
            border-radius: 50%;
            opacity: 1;
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
