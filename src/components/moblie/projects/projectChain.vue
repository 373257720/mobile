<template>
  <div id="projectChain">
    <commonnav>
      {{ $t("project.projectStatus") }}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <!-- <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template> -->
    </commonnav>
    <main id="container"></main>
  </div>
</template>

<script>
// import VueDraggableResizable from 'vue-draggable-resizable'
// var echarts = require("echarts");
// import G6 from "@antv/g6";
export default {
  data: function () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      myChart: "",
    };
  },
  created() {
    // console.log(echarts);
  },
  mounted() {
    this.initG6();
  },
  methods: {
 
    initG6() {
      let projectId = this.$route.query.projectId;

      const data = {
        id: "Modeling Methods",
        type: "image",
        img:
          "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
        children: [
          // {
          //   id: "Classification",
          //   type: "image",
          //   img:
          //     "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
          //   children: [
          //     {
          //       id: "Logistic regression",
          //     },
          //     {
          //       id: "Linear discriminant analysis",
          //     },
          //     {
          //       id: "Rules",
          //     },
          //     {
          //       id: "Decision trees",
          //     },
          //     {
          //       id: "Naive Bayes",
          //     },
          //     {
          //       id: "K nearest neighbor",
          //     },
          //     {
          //       id: "Probabilistic neural network",
          //     },
          //     {
          //       id: "Support vector machine",
          //     },
          //   ],
          // },
          // {
          //   id: "Consensus",
          //   children: [
          //     {
          //       id: "Models diversity",
          //       children: [
          //         {
          //           id: "Different initializations",
          //         },
          //         {
          //           id: "Different parameter choices",
          //         },
          //         {
          //           id: "Different architectures",
          //         },
          //         {
          //           id: "Different modeling methods",
          //         },
          //         {
          //           id: "Different training sets",
          //         },
          //         {
          //           id: "Different feature sets",
          //         },
          //       ],
          //     },
          //     {
          //       id: "Methods",
          //       children: [
          //         {
          //           id: "Classifier selection",
          //         },
          //         {
          //           id: "Classifier fusion",
          //         },
          //       ],
          //     },
          //     {
          //       id: "Common",
          //       children: [
          //         {
          //           id: "Bagging",
          //         },
          //         {
          //           id: "Boosting",
          //         },
          //         {
          //           id: "AdaBoost",
          //         },
          //       ],
          //     },
          //   ],
          // },
          // {
          //   id: "Regression",
          //   children: [
          //     {
          //       id: "Multiple linear regression",
          //     },
          //     {
          //       id: "Partial least squares",
          //     },
          //     {
          //       id: "Multi-layer feedforward neural network",
          //     },
          //     {
          //       id: "General regression neural network",
          //     },
          //     {
          //       id: "Support vector regression",
          //       children: [
          //         {
          //           id: "dsfdsf",
          //         },
          //       ],
          //     },
          //   ],
          // },
        ],
      };
      this.$global
        .post_encapsulation(
          `${this.$axios.defaults.baseURL}/bsl_web/myProject/getMyProjectChain`,
          { projectId: projectId }
        )
        .then((res) => {
          if (res.data.resultCode === 10000) {
            let obj = res.data.data.resultListMap;
             let a = this.$global.recursion(obj['144450049_1613983010']);
             console.log(a);
            // for (let key in obj) {
            //   if (obj['144450049_1613983010'].length) {
               
            //     // console.log(a);
            //     data.children.push({
            //       id: key,
            //       img:
            //         "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
            //       children: a,
            //     });
            //   } else {
            //     data.children.push({
            //       id: key,
            //       img:
            //         "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
            //     });
            //   }
            // }
            console.log(data.children);
          }
        });

      const container = document.getElementById("container");
      const width = 600;
      const height = 800;
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
                data.collapsed = collapsed;
                return true;
              },
            },
            {
              type: "drag-canvas",
              scalableRange: 100,
              shouldBegin: true,
              allowDragOnItem: true,
            },
            "zoom-canvas",
          ],
        },
        defaultNode: {
          size: 80,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          style: {
            fill: "#steelblue",
            // stroke: "#eaff8f",
            lineWidth: 5,
            // ... 其他属性
          },
        },
        defaultEdge: {
          type: "cubic-vertical",
        },
        layout: {
          type: "dendrogram",
          direction: "TB", // H / V / LR / RL / TB / BT
          nodeSep: 82,
          rankSep: 150,
        },
      });

      graph.node(function (node) {
        let position = "right";
        let rotate = 0;
        if (!node.children) {
          position = "bottom";
          rotate = Math.PI / 2;
        }
        return {
          label: node.id,
          labelCfg: {
            position,
            offset: 5,
            style: {
              rotate,
              fontSize: 50,
              textAlign: "start",
              fill: "#4F3DAD",
            },
          },
        };
      });
      graph.data(data);
      graph.render();
      graph.fitView();
      graph.addBehaviors(["drag-canvas", "zoom-canvas"], "default");
      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
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
    overflow: auto;
    // overflow-x: auto;
    width: 80%;
    height: 90%;
    margin: 0 auto;
    border: 1px solid #4f3dad;
    // margin-top: 60px;
  }
}
</style>