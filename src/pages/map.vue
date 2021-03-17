<template>
  <q-page class="flex flex-center map-wrapper">
    <div id="container"></div>
		<q-dialog v-model="visible" persistent no-esc-dismiss>
      <div>
        <alarmForm @onSubmit="saveAlarmInfo" @cancel="onCancel"/>
      </div>
		</q-dialog>
    <q-card class="list-wrapper">
      <div class="title">报警区域列表</div>
      <div class="list-item" v-for="(item,index) in alarmInfoList" :key="`item_${index}`">
        {{index+1}}-报警区域名称:{{item.info.alarmName}} 编号:{{item.info.alarmNo}}
      </div>
    </q-card>

  </q-page>
</template>

<script>
import alarmForm from './components/alarmForm'
import {getfakeId} from './utils/index'
  export default {
    name:'mapProject',
    data () {
      return{
        alarmInfoList:[],// 包含info且包含overlay对象的数组
        alaramOverlayList:[],// 包含overlay的数组
        map:undefined,
        styleOptions: {
          strokeColor:"red",    //边线颜色。
          fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
        },
				visible:false, // 表单对话框
        drawingOverlayId:undefined,// 新绘制覆盖层的id
        drawingManager:undefined,// 绘制
      };
    },
    mounted(){
      this.init()
    },
    components: {
      alarmForm
    },
    computed:{

    },
    methods: {
      // 初始化
      init(){
        const overlay =localStorage.getItem("overlay_info")
        if(overlay&&overlay.length>0){
            this.alaramOverlayList = JSON.parse(overlay);
            this.initMap();
            this.updateOverlay()
          }else{
            this.initMap()
          }
      },
      // 地图及控件初始化
      initMap(){
        this.map = new BMap.Map("container");
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
        this.drawingManager = new BMapLib.DrawingManager(this.map, {
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
        this.drawingManager.addEventListener('overlaycomplete', this.overlayComplete);
      },
      // 绘制完成
      overlaycCmplete(e){
        const {overlay,drawingMode} =e
        // debugger
        this.drawingManager.close()
        let target={}
        const id=getfakeId()
        this.drawingOverlayId = id // 新绘制的覆盖层的id
        if(drawingMode==='polygon'){
          const path=overlay.getPath()
          target={path,drawingMode,id}
        }else{
          const {point,Fa} =overlay
          console.log(point.lat)
          target={point,drawingMode,radius:Fa,id}
        }
        overlay.addEventListener('rightclick',(e)=>this.deleteOverlay(e,target))
        this.alarmArea.push(target)
        this.visible = true;

      },
      // 自定义绘制overlay
      updateOverlay(){
        this.alaramOverlayList=this.alaramOverlayList.map(item=>{
          const overlay=this.getOverlay(item)
          overlay.addEventListener('rightclick',(e)=>this.deleteOverlay(e,overlayItem))
          return{...item,overlay}
        })
        this.alaramOverlayList.forEach(overlayItem=>{
          this.map.addOverlay(overlayItem.overlay);
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
      },
      saveAlarmInfo(data){
        const index = this.alarmArea.findIndex(e=>e.id===this.drawingOverlayId)
        const result = {...this.alarmArea[index],info:data}
        this.alarmArea.splice(index,1,result)
        this.visible =false;
        localStorage.setItem('overlay_info',JSON.stringify(this.alarmArea))
      },
      // 删除overlay
      deleteOverlay(e,info){
        this.$q.dialog({
          title: 'Confirm',
          message: `确定要删除${info.info.alarmNo}-${info.info.alarmName}报警区域吗？`,
          color: 'negative',
          ok: "确定",
          cancel: '取消',
        }).onOk(()=>{
          this.map.removeOverlay(e.target)
          const index=this.alarmArea.findIndex(item=>item.id===info.id)
          this.alarmArea.splice(index,1)
          localStorage.setItem('overlay_info',JSON.stringify(this.alarmArea))
        })
      }
    },
    watch:{
      alarmArea:{
        immediate:true,
        deep:true,
        handler(val){
          if(val.length){
            this.alarmInfoList =val.filter(e=>e.info)
          }else{
            this.alarmInfoList =[];
          }
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
.map-wrapper{
  height: calc(100vh - 50px);
  #container{
   width: 100%;
   height:100%;
   overflow: auto;
 }
 .list-wrapper{
   position: absolute;
   top:calc((100vh - 50px) / 2);
   right: 20px;
   height:calc((100vh - 50px) * 0.8);
   transform: translate(0,-50%);
   padding:20px 30px;
   overflow: auto;
   .title{
     margin:10px auto;
   }
   .list-item{
     margin-bottom: 5px;
     &:last-child{
       margin-bottom: 0;
     }
   }
 }
}

</style>
