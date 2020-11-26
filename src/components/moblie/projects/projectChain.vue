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
    <main id="main"></main>
  </div>
</template>
<script>
// import VueDraggableResizable from 'vue-draggable-resizable'
var echarts = require("echarts");
export default {
  data: function() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
  },
  created() {
    // console.log(echarts);
  },
  mounted() {
    var data = {
      name: "flare",
      animationEasing: "quarticIn",
      children: [
        {
          name: "data",
          children: [
            {
              name: "converters",
              children: [
                { name: "Converters", value: 721 },
                { name: "DelimitedTextConverter", value: 4294 }
              ]
            },
            {
              name: "DataUtil",
              value: 3322
            }
          ]
        },
        {
          name: "display",
          children: [
            { name: "DirtySprite", value: 8833 },
            { name: "LineSprite", value: 1732 },
            { name: "RectSprite", value: 3623 }
          ]
        },
        {
          name: "flex",
          children: [{ name: "FlareVis", value: 4116 }]
        },
        {
          name: "query",
          children: [
            { name: "AggregateExpression", value: 1616 },
            { name: "And", value: 1027 },
            { name: "Arithmetic", value: 3891 },
            { name: "Average", value: 891 },
            { name: "BinaryExpression", value: 2893 },
            { name: "Comparison", value: 5103 },
            { name: "CompositeExpression", value: 3677 },
            { name: "Count", value: 781 },
            { name: "DateUtil", value: 4141 },
            { name: "Distinct", value: 933 },
            { name: "Expression", value: 5130 },
            { name: "ExpressionIterator", value: 3617 },
            { name: "Fn", value: 3240 },
            { name: "If", value: 2732 },
            { name: "IsA", value: 2039 },
            { name: "Literal", value: 1214 },
            { name: "Match", value: 3748 },
            { name: "Maximum", value: 843 },
            {
              name: "methods",
              children: [
                { name: "add", value: 593 },
                { name: "and", value: 330 },
                { name: "average", value: 287 },
                { name: "count", value: 277 },
                { name: "distinct", value: 292 },
                { name: "div", value: 595 },
                { name: "eq", value: 594 },
                { name: "fn", value: 460 },
                { name: "gt", value: 603 },
                { name: "gte", value: 625 },
                { name: "iff", value: 748 },
                { name: "isa", value: 461 },
                { name: "lt", value: 597 },
                { name: "lte", value: 619 },
                { name: "max", value: 283 },
                { name: "min", value: 283 },
                { name: "mod", value: 591 },
                { name: "mul", value: 603 },
                { name: "neq", value: 599 },
                { name: "not", value: 386 },
                { name: "or", value: 323 },
                { name: "orderby", value: 307 },
                { name: "range", value: 772 },
                { name: "select", value: 296 },
                { name: "stddev", value: 363 },
                { name: "sub", value: 600 },
                { name: "sum", value: 280 },
                { name: "update", value: 307 },
                { name: "variance", value: 335 },
                { name: "where", value: 299 },
                { name: "xor", value: 354 },
                { name: "x_x", value: 264 }
              ]
            },
            { name: "Minimum", value: 843 },
            { name: "Not", value: 1554 },
            { name: "Or", value: 970 },
            { name: "Query", value: 13896 },
            { name: "Range", value: 1594 },
            { name: "StringUtil", value: 4130 },
            { name: "Sum", value: 791 },
            { name: "Variable", value: 1124 },
            { name: "Variance", value: 1876 },
            { name: "Xor", value: 1101 }
          ]
        },
        {
          name: "scale",
          children: [
            { name: "IScaleMap", value: 2105 },
            { name: "LinearScale", value: 1316 },
            { name: "LogScale", value: 3151 },
            { name: "OrdinalScale", value: 3770 },
            { name: "QuantileScale", value: 2435 },
            { name: "QuantitativeScale", value: 4839 },
            { name: "RootScale", value: 1756 },
            { name: "Scale", value: 4268 },
            { name: "ScaleType", value: 1821 },
            { name: "TimeScale", value: 5833 }
          ]
        }
      ]
    };
    var myChart = echarts.init(document.getElementById("main"));
    console.log(myChart);
    myChart.setOption({
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      // dataZoom: {
      //   show: true,
      //   realtime: true,
      //   start: 0,
      //   end: 50
      // },
      series: [
        {
          type: "tree",
          id: 0,
          name: "tree1",
          data: [data],
          // leafDepth:1,
          top: "10%",
          left: "20%",
          bottom: "22%",
          right: "20%",
          roam: true,
          symbol:
            "image://http://demo.sc.chinaz.com/Files/pic/icons/7903/w1.png",
          symbolSize: 25,
          symbolOffset: [0, "40%"],
          symbolKeepAspect: true,
          scaleLimit: {
            min: 1
          },
          layout: "orthogonal",
          // nodeClick: "zoomToNode",
          zoomToNodeRatio: 1,
          orient: "TB",
          edgeShape: "curve",
          lineStyle: {
            width: 2
          },
          itemStyle: {
            color: "#4F3DAD",
            borderColor: "#4F3DAD"
          },
          lineStyle: {
            color: "#00F0AB",
            width: 2,
            curveness: 0.5
          },
          label: {
            show: true,
            backgroundColor: "#fff",
            position: "top",
            rotate: -90,
            verticalAlign: "middle",
            align: "right",
            fontSize: 9,
            color: "#4F3DAD"
            // rotate: -90
          },

          leaves: {
            label: {
              show: true,
              position: "bottom",
              rotate: -90,
              verticalAlign: "middle",
              align: "left"
              // distance: 20,
              // align: "center",
              // width: "50px"
            }
          },
          initialTreeDepth: 2,
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    });
  },
  methods: {
    onResize: function(x, y, width, height) {
      console.log(x, y, width, height);

      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    }
  }
};
</script>
<style lang="scss">
#mysign {
  height: 100%;
  #main {
    padding-top: vw(140);
    /* margin-top: vw(150); */
    height: 100%;
    // height: calc(100vh - vw(140));
  }
}
</style>