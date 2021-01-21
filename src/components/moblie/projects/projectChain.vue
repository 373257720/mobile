<template>
  <div id="mysign">
    <commonnav>
      {{$t('project.projectStatus')}}
      <template v-slot:arrowLeft>
        <van-icon name="arrow-left" @click="$global.previous()" />
      </template>
      <template v-slot:arrowRight>
        <i class="icon iconRight iconfont icon-message"></i>
      </template>
    </commonnav>
    <main id="container"></main>
  </div>
</template>
<script>
// import VueDraggableResizable from 'vue-draggable-resizable'
var echarts = require("echarts");
import G6 from "@antv/g6";
export default {
  data: function() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      myChart: ""
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
      const data = {
        id: "Modeling Methods",
        children: [
          {
            id: "Classification",
            children: [
              {
                id: "Logistic regression"
              },
              {
                id: "Linear discriminant analysis"
              },
              {
                id: "Rules"
              },
              {
                id: "Decision trees"
              },
              {
                id: "Naive Bayes"
              },
              {
                id: "K nearest neighbor"
              },
              {
                id: "Probabilistic neural network"
              },
              {
                id: "Support vector machine"
              }
            ]
          },
          {
            id: "Consensus",
            children: [
              {
                id: "Models diversity",
                children: [
                  {
                    id: "Different initializations"
                  },
                  {
                    id: "Different parameter choices"
                  },
                  {
                    id: "Different architectures"
                  },
                  {
                    id: "Different modeling methods"
                  },
                  {
                    id: "Different training sets"
                  },
                  {
                    id: "Different feature sets"
                  }
                ]
              },
              {
                id: "Methods",
                children: [
                  {
                    id: "Classifier selection"
                  },
                  {
                    id: "Classifier fusion"
                  }
                ]
              },
              {
                id: "Common",
                children: [
                  {
                    id: "Bagging"
                  },
                  {
                    id: "Boosting"
                  },
                  {
                    id: "AdaBoost"
                  }
                ]
              }
            ]
          },
          {
            id: "Regression",
            children: [
              {
                id: "Multiple linear regression"
              },
              {
                id: "Partial least squares"
              },
              {
                id: "Multi-layer feedforward neural network"
              },
              {
                id: "General regression neural network"
              },
              {
                id: "Support vector regression"
              }
            ]
          }
        ]
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
                data.collapsed = collapsed;
                return true;
              }
            },
            "drag-canvas",
            "zoom-canvas"
          ]
        },
        defaultNode: {
          size: 26,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ]
        },
        defaultEdge: {
          type: "cubic-vertical"
        },
        layout: {
          type: "dendrogram",
          direction: "TB", // H / V / LR / RL / TB / BT
          nodeSep: 40,
          rankSep: 100
        }
      });
      graph.node(function(node) {
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
              textAlign: "start"
            }
          }
        };
      });
      graph.data(data);
      graph.render();
      graph.fitView();

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    }
  }
};
</script>
<style lang="scss">
#mysign {
  height: 100%;
  #container {
    overflow: auto;
  }
}
</style>