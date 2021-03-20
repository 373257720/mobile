<template>
  <div id="projectChain">
    <commonnav>
      {{ $t("project.projectStatus") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
    </commonnav>
    <main id="container"></main>
  </div>
</template>

<script>
// var echarts = require("echarts");
// import G6 from "@antv/g6";
export default {
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      myChart: "",
    };
  },
  created() {
    // console.log(G6);
    // console.log(echarts);
  },
  mounted() {
    this.initG6();
  },
  methods: {
    initG6() {
      let projectId = this.$route.query.projectId;
      this.$store.commit("isloading", true);
      const data = {
        id: "Project",
        // type: "image",
        // img:
        //   "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
        children: [
          // {
          //   id: "Classification",
          //   children: [
          //     {
          //       id: "Rules",
          //       children: [
          //         {
          //           id: "Multiple linear regression",
          //           children: [
          //             {
          //               id: "Support vector regression",
          //               children: [
          //                 {
          //                   id: "sfas",
          //                   children: [
          //                     {
          //                       id: "dfsaf",
          //                     },
          //                   ],
          //                 },
          //               ],
          //             },
          //           ],
          //         },
          //       ],
          //     },
          //   ],
          // },
        ],
      };
      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;
      const graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        linkCenter: true,
        modes: {
          default: [
            {
              type: "collapse-expand",
              onChange: function onChange(item, collapsed) {
                const data = item.get("model");
                console.log(data);
                data.collapsed = collapsed;
                return true;
              },
            },
            "drag-canvas",
            "zoom-canvas",
          ],
        },
        defaultNode: {
          size: 30,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          style: {
            fill: "#steelblue",
            // stroke: "#eaff8f",
            lineWidth: 10,
            // ... 其他属性
          },
        },
        defaultEdge: {
          type: "cubic-vertical",
          style: {
            stroke: "#4F3DAD",
            lineWidth: 3,
          },
        },
        layout: {
          type: "dendrogram",
          direction: "V", // H / V / LR / RL / TB / BT
          nodeSep: 150,
          rankSep: 80,
        },
      });
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectChain`,
          { projectId: projectId }
        )
        .then((res) => {
          this.$store.commit("isloading", false);
          if (res.data.resultCode === 10000) {
            data.children = [];
            let obj = res.data.data.resultListMap;
            let num = 1;
            for (let key in obj) {
              if (obj[key].length) {
                let a = this.$global.iteration(obj[key]);
                // console.log(a);
                data.children.push({
                  id: "第" + num + "条链",
                  // type: "image",
                  // img:
                  collapsed:true,
                  //   "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
                  children:a,
                });
              } else {
                data.children.push({
                  id: "第" + num + "条链",
                   collapsed:true,
                  // type: "image",
                  // img:
                  //   "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
                });
              }
              num++;
            }
            console.log(data);
            graph.node(function (node) {
              let position = "right";
              let rotate = 0;
              if (!node.children) {
                position = "bottom";
                rotate = Math.PI / 2;
              }
              return {
                label: node.label || node.id,
                labelCfg: {
                  position,
                  offset: 5,
                  style: {
                    rotate,
                    fontSize: 14,
                    textAlign: "start",
                    fill: "#4F3DAD",
                  },
                },
              };
            });
            graph.data(data);
            graph.render();
            graph.fitCenter();
            if (typeof window !== "undefined") {
              window.onresize = () => {
                if (!graph || graph.get("destroyed")) return;
                if (
                  !container ||
                  !container.scrollWidth ||
                  !container.scrollHeight
                )
                  return;
                graph.changeSize(container.scrollWidth, container.scrollHeight);
              };
            }
          } else {
            this.$dialog
              .alert({
                // title: "标题",
                message: res.data.resultDesc,
              })
              .then(() => {
                // on close
              });
          }
        });
    },
  },
};
</script>
<style lang="scss">
#projectChain {
  height: 100%;
  padding-top: 60px;
  // overflow: hidden;
  #container {
    // overflow: auto;
    // overflow-x: auto;
    width: 80%;
    height: 90%;
    margin: 0 auto;
    border: 2px solid #4f3dad;
    // margin-top: 60px;
  }
}
</style>