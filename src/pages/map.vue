<template>
  <q-page class="flex flex-center">
    <div id="container"></div>
  </q-page>
</template>

<script>

  export default {
    name:'mapProject',
    data () {
      return{
        alarmArea:[]
      };
    },
    mounted(){
      this.init()
    },
    components: {

    },
    methods: {
      init(){
        const map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
        const styleOptions = {
          strokeColor:"red",    //边线颜色。
          fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
        }

        const drawingManager = new BMapLib.DrawingManager(map, {
          isOpen: false, //是否开启绘制模式
          enableDrawingTool: true, //是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingModes:[BMAP_DRAWING_CIRCLE,BMAP_DRAWING_POLYGON],// 绘图模式
          },
          circleOptions: styleOptions, //圆的样式
          // polylineOptions: styleOptions, //线的样式
          polygonOptions: styleOptions, //多边形的样式
          // rectangleOptions: styleOptions //矩形的样式
        });
      }
    }
  }
</script>

<style lang='scss' scoped>
 #container{
   width: 100%;
   height: 100vh;
   overflow: auto;
 }
</style>
