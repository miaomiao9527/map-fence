<template>
  <q-page class="flex flex-center map-wrapper">
    <div id="container"></div>
    <q-dialog v-model="visible" persistent no-esc-dismiss>
      <div>
        <alarmForm @onSubmit="saveAlarmInfo" @cancelEdit="cancelEdit" :id="drawingOverlayId"/>
      </div>
    </q-dialog>
    <q-card class="list-wrapper" v-if="alarmOverlayList.length>0">
      <div class="title">报警区域列表</div>
      <div
        class="list-item"
        v-for="(item, index) in alarmOverlayList"
        :key="`item_${index}`"
      >
        {{ index + 1 }}-报警区域名称:{{ item.info?item.info.alarmName:'-' }} 编号:{{
          item.info?item.info.alarmNo:'-'
        }}
      </div>
    </q-card>
    <q-card class="search-wrapper">
      经度: <input v-model="point.lng" type="text"/>
      纬度: <input v-model="point.lat" type="text"/>
		 <button @click="searchPoint">查询</button>
    </q-card>
  </q-page>
</template>

<script>
import alarmForm from "./components/alarmForm";
import { getfakeId } from "./utils/index";
export default {
  name: "mapProject",
  data() {
    return {

      alarmOverlayList: [], // 包含overlay的数组
      map: undefined,
      styleOptions: {
        strokeColor: "red", //边线颜色。
        fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: "solid", //边线的样式，solid或dashed。
      },
      visible: false, // 表单对话框
      drawingOverlayId: undefined, // 新绘制覆盖层的id
      drawingManager: undefined, // 绘制
      point:{
        lng:'',
        lat:''
      }

    };
  },
  mounted() {
    this.init();
  },
  components: {
    alarmForm,
  },
  computed: {},
  methods: {
    // 初始化
    init() {
      const overlay = localStorage.getItem("overlay_info");
      if (overlay && overlay.length > 0) {
        this.alarmOverlayList = JSON.parse(overlay);
        this.initMap();
        this.updateOverlay();
      } else {
        this.initMap();
      }
    },
    // 地图及控件初始化
    initMap() {
      this.map = new BMap.Map("container");
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
      this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
          offset: new BMap.Size(5, 5), //偏离值
          drawingModes: [BMAP_DRAWING_CIRCLE, BMAP_DRAWING_POLYGON], // 绘图模式
        },
        circleOptions: this.styleOptions, //圆的样式
        polygonOptions: this.styleOptions, //多边形的样式
      });
      this.drawingManager.addEventListener(
        "overlaycomplete",
        this.overlaycomplete
      );
    },
    // 绘制完成
    overlaycomplete(e){
      const { overlay, drawingMode } = e;
      this.drawingManager.close();
      let target = {};
      const id = getfakeId();
      this.drawingOverlayId = id; // 新绘制的覆盖层的id
      if (drawingMode === "polygon") {
        const path = overlay.getPath();
        target = { path, drawingMode, id, overlay };
      } else {
        const { point, Fa } = overlay;
        target = { point, drawingMode, radius: Fa, id, overlay };
      }
      overlay.addEventListener("rightclick", (e) =>
        this.deleteOverlay(e, target)
      );
      this.alarmOverlayList.push(target);
      this.visible = true;
    },
    // 自定义绘制overlay
    updateOverlay() {
      this.alarmOverlayList = this.alarmOverlayList.map((item) => {
        const overlay = this.getOverlay(item);
        overlay.addEventListener("rightclick", (e) =>
          this.deleteOverlay(e, item)
        );
        return { ...item, overlay };
      });
      this.alarmOverlayList.forEach((overlayItem) => {
        this.map.addOverlay(overlayItem.overlay);
      });
    },
    //获取overlay
    getOverlay(data) {
      const { drawingMode } = data;
      if (drawingMode === "polygon") {
        const pointList = data.path.map(
          (item) => new BMap.Point(item.lng, item.lat)
        );
        return new BMap.Polygon(pointList, this.styleOptions);
      } else {
        return new BMap.Circle(data.point, data.radius, this.styleOptions);
      }
    },
    // 保存报警信息
    saveAlarmInfo(data) {
      const index = this.alarmOverlayList.findIndex(
        (e) => e.id === this.drawingOverlayId
      );
      const result = { ...this.alarmOverlayList[index], info: data };
      this.alarmOverlayList.splice(index, 1, result);
      this.visible = false;
      // 存储时不包含overlay对象
      const storageList = this.alarmOverlayList.map((item) => {
        const { overlay, ...other } = item;
        return other;
      });
      localStorage.setItem("overlay_info", JSON.stringify(storageList));
    },
    // 取消编辑
    cancelEdit(){
      const index = this.alarmOverlayList.findIndex(
        (e) => e.id === this.drawingOverlayId
      );
      const {overlay} = this.alarmOverlayList[index];
      this.alarmOverlayList.splice(index, 1)
      this.map.removeOverlay(overlay);
      this.visible = false;
    },
    // 删除overlay
    deleteOverlay(e, info) {
      this.$q
        .dialog({
          title: "Confirm",
          message: `确定要删除${info.info.alarmNo}-${info.info.alarmName}报警区域吗？`,
          color: "negative",
          ok: "确定",
          cancel: "取消",
        })
        .onOk(() => {
          this.map.removeOverlay(e.target);
          const index = this.alarmOverlayList.findIndex((item) => item.id === info.id);
          this.alarmOverlayList.splice(index, 1);
          const storageList = this.alarmOverlayList.map((item) => {
            const { overlay, ...other } = item;
            return other;
          });
          localStorage.setItem("overlay_info", JSON.stringify(storageList));
        });
    },

    searchPoint(){
      const point =new BMap.Point(this.point.lng,this.point.lat)
      let inOverlay = []
      let message ='';
      this.alarmOverlayList.forEach((item)=>{
        const {drawingMode,overlay } = item;
        let isIn;
        switch (drawingMode) {
          case 'polygon':
            isIn=BMapLib.GeoUtils.isPointInPolygon(point, overlay)
            break;
          case 'circle':
            isIn=BMapLib.GeoUtils.isPointInCircle(point, overlay)
            break;
          default:
            break;
        }
        if(isIn){
          inOverlay.push(`${item.info.alarmNo}-${item.info.alarmName}`)
        }
      })
      if(inOverlay.length>0){
        message =`坐标：经度${this.point.lng}纬度${this.point.lat}的点在以下报警区域：${inOverlay.join(',')}`
      }else{
        message ='未在报警区域内'
      }
      this.$q.dialog({
        title:'查询结果',
        message,
        ok:'确定'
      })
    }
  },

};
</script>

<style lang='scss' scoped>
.map-wrapper {
  height: calc(100vh - 50px);
  #container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .list-wrapper {
    position: absolute;
    top: calc((100vh - 50px) / 2);
    right: 20px;
    height: calc((100vh - 50px) * 0.8);
    transform: translate(0, -50%);
    padding: 20px 30px;
    overflow: auto;
    .title {
      margin: 10px auto;
    }
    .list-item {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .search-wrapper{
    position: absolute;
    top:20px;
    left:20%;
    transform: translate(-50%,0);
    border-radius: 10px;
    padding: 10px;
    background:#fff;
    display: flex;
    align-items: center;
    input{
      margin:0 5px;
    }
  }
}
</style>
