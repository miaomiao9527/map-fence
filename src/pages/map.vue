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
        alarmArea:[],
        map:undefined,
        styleOptions: {
          strokeColor:"red",    //边线颜色。
          fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
      };
    },
    mounted(){
      this.init()
    },
    beforeDestroy(){
      const overlay =JSON.stringify(this.alarmArea);
      localStorage.setItem('overlay', overlay)
    },
    components: {

    },
    methods: {
      // 初始化
      init(){
        const overlay =localStorage.getItem("overlay")
        debugger
        if(overlay){
            this.alarmArea = JSON.parse(overlay);
            this.initMap();
            this.updateOverlay()
          }else{
            this.initMap()
          }
      },
      initMap(){
        this.map = new BMap.Map("container");
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);

        const drawingManager = new BMapLib.DrawingManager(this.map, {
          isOpen: false, //是否开启绘制模式
          enableDrawingTool: true, //是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingModes:[BMAP_DRAWING_CIRCLE,BMAP_DRAWING_POLYGON],// 绘图模式
          },
          circleOptions: this.styleOptions, //圆的样式
          polygonOptions: this.styleOptions, //多边形的样式
        });
        drawingManager.enableCalculate()
        drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);
      },
      // 绘制完成
      overlaycomplete(e){
        const {overlay,drawingMode} =e
        let target={}
        if(drawingMode==='polygon'){
          const path=overlay.getPath()
          target={path,drawingMode}
        }else{
          const {point,Fa} =overlay
          console.log(point.lat)
          target={point,drawingMode,radius:Fa}
        }
        this.alarmArea.push(target)
        localStorage.setItem('overlay',JSON.stringify(target))
      },
      // 自定义绘制overlay
      updateOverlay(){
        const overlayList=this.alarmArea.map(item=>this.getOverlay(item))
        overlayList.forEach(overlayItem=>{
          this.map.addOverlay(overlayItem);
        })
      },
      //获取overlay
      getOverlay(data){
        const {drawingMode} =data;
        if(drawingMode==='polygon'){
          const pontList=data.path.map(item=>new BMap.Point(item.lng, item.lat),)
          return new BMap.Polygon(pontList,this.styleOptions)
        }else{
          return new BMap.Circle(data.point,data.radius,this.styleOptions)
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
 #container{
   width: 100%;
   height: calc(100vh - 50px);
   overflow: auto;
 }
</style>
