(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"083d":function(t,a,e){},"1d0e":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-page",{staticClass:"flex flex-center map-wrapper"},[e("div",{attrs:{id:"container"}}),e("q-dialog",{attrs:{persistent:"","no-esc-dismiss":""},model:{value:t.visible,callback:function(a){t.visible=a},expression:"visible"}},[e("div",[e("alarmForm",{attrs:{id:t.drawingOverlayId},on:{onSubmit:t.saveAlarmInfo,cancelEdit:t.cancelEdit}})],1)]),t.hasInfoAlarmOverlayList.length>0?e("q-card",{staticClass:"list-wrapper"},[e("div",{staticClass:"title"},[t._v("报警区域列表")]),t._l(t.hasInfoAlarmOverlayList,(function(a,i){return e("div",{key:a.id,staticClass:"list-item flex"},[t._v("\n      "+t._s(i+1)+"-报警区域名称:"+t._s(a.info?a.info.alarmName:"-")+"\n      编号:"+t._s(a.info?a.info.alarmNo:"-")+"\n      "),e("q-btn",{attrs:{size:"xs",icon:"delete",round:"",outline:"","text-color":"blue-5",flat:""},on:{click:function(e){return t.deleteOverlay(a)}}})],1)}))],2):t._e(),e("q-card",{class:["search-wrapper",{"gt-xs":t.showSearchFlag}]},[e("div",{staticClass:"flex"},[e("label",{attrs:{for:""}},[t._v("经度:")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.point.lng,expression:"point.lng"}],attrs:{type:"text"},domProps:{value:t.point.lng},on:{input:function(a){a.target.composing||t.$set(t.point,"lng",a.target.value)}}})]),e("div",{staticClass:"flex"},[e("label",{attrs:{for:""}},[t._v("纬度:")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.point.lat,expression:"point.lat"}],attrs:{type:"text"},domProps:{value:t.point.lat},on:{input:function(a){a.target.composing||t.$set(t.point,"lat",a.target.value)}}})]),e("button",{on:{click:t.searchPoint}},[t._v("查询")])]),e("q-page-sticky",{staticClass:"xs",attrs:{position:"bottom-right",offset:[18,18]}},[e("q-btn",{attrs:{fab:"",color:"blue-5","text-color":"grey-1",icon:"search",direction:"left"},on:{click:function(a){t.showSearchFlag=!t.showSearchFlag}}})],1)],1)},n=[],r=e("4082"),l=e.n(r),o=e("ded3"),s=e.n(o),c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-form",{staticClass:"q-gutter-md q-pa-md",on:{submit:t.onSubmit}},[e("q-input",{attrs:{filled:"",label:"区域名称",rules:[function(t){return t&&t.length>0||"请输入"}]},model:{value:t.formData.alarmName,callback:function(a){t.$set(t.formData,"alarmName",a)},expression:"formData.alarmName"}}),e("q-input",{attrs:{filled:"",label:"区域编号",rules:[function(t){return t&&t.length>0||"请输入"}]},model:{value:t.formData.alarmNo,callback:function(a){t.$set(t.formData,"alarmNo",a)},expression:"formData.alarmNo"}}),e("q-input",{attrs:{filled:"",label:"区域描述",rules:[function(t){return t&&t.length>0||"请输入"}]},model:{value:t.formData.alarmDesc,callback:function(a){t.$set(t.formData,"alarmDesc",a)},expression:"formData.alarmDesc"}}),e("div",[e("q-btn",{attrs:{label:"确定",type:"submit",color:"primary"}}),e("q-btn",{staticClass:"q-ml-sm",attrs:{label:"取消",color:"primary",flat:""},on:{click:t.onReset}})],1)],1)},p=[],d={data(){return{formData:{}}},components:{},methods:{onSubmit(){this.$emit("onSubmit",this.formData)},onReset(){this.$emit("cancelEdit")}},props:{id:{type:String}}},m=d,v=(e("92fa"),e("2877")),h=e("0378"),f=e("27f9"),g=e("9c40"),u=e("eebe"),y=e.n(u),O=Object(v["a"])(m,c,p,!1,null,"1f2fb2de",null),w=O.exports;y()(O,"components",{QForm:h["a"],QInput:f["a"],QBtn:g["a"]});e("5319");const x=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var a=16*Math.random()|0,e="x"==t?a:3&a|8;return e.toString(16)}));var b={name:"mapProject",data(){return{alarmOverlayList:[],map:void 0,styleOptions:{strokeColor:"red",fillColor:"red",strokeWeight:3,strokeOpacity:.8,fillOpacity:.6,strokeStyle:"solid"},visible:!1,drawingOverlayId:void 0,drawingManager:void 0,point:{lng:"",lat:""},showSearchFlag:!0}},mounted(){this.init()},components:{alarmForm:w},computed:{hasInfoAlarmOverlayList(){return this.alarmOverlayList.filter((t=>t.info))}},methods:{init(){const t=localStorage.getItem("overlay_info");t&&t.length>0?(this.alarmOverlayList=JSON.parse(t),this.initMap(),this.updateOverlay()):this.initMap()},initMap(){this.map=new BMap.Map("container"),this.map.centerAndZoom(new BMap.Point(116.404,39.915),15),window.screen.width<768&&this.map.addEventListener("click",this.onMapClick),this.drawingManager=new BMapLib.DrawingManager(this.map,{isOpen:!1,enableDrawingTool:!0,drawingToolOptions:{anchor:BMAP_ANCHOR_TOP_RIGHT,offset:new BMap.Size(5,5),drawingModes:[BMAP_DRAWING_CIRCLE,BMAP_DRAWING_POLYGON]},circleOptions:this.styleOptions,polygonOptions:this.styleOptions}),this.drawingManager.addEventListener("overlaycomplete",this.overlaycomplete)},onMapClick(t){const{point:a}=t,e=new BMap.Marker(a);this.map.addOverlay(e);const i=x();this.drawingOverlayId=i;const n={point:a,overlay:e,drawingMode:"marker",id:i};this.alarmOverlayList.push(n),this.visible=!0},overlaycomplete(t){if(window.screen.width<768)return;const{overlay:a,drawingMode:e}=t;this.drawingManager.close();let i={};const n=x();if(this.drawingOverlayId=n,"polygon"===e){const t=a.getPath();i={path:t,drawingMode:e,id:n,overlay:a}}else{const{point:t}=a;i={point:t,drawingMode:e,radius:a.getRadius(),id:n,overlay:a}}a.addEventListener("rightclick",(()=>this.deleteOverlay(i))),this.alarmOverlayList.push(i),this.visible=!0},updateOverlay(){this.alarmOverlayList=this.alarmOverlayList.map((t=>{const a=this.getOverlay(t);return window.screen.width>768&&a.addEventListener("rightclick",(()=>this.deleteOverlay(t))),s()(s()({},t),{},{overlay:a})})),this.alarmOverlayList.forEach((t=>{this.map.addOverlay(t.overlay)}))},getOverlay(t){const{drawingMode:a}=t;if("polygon"===a){const a=t.path.map((t=>new BMap.Point(t.lng,t.lat)));return new BMap.Polygon(a,this.styleOptions)}return"circle"===a?new BMap.Circle(new BMap.Point(t.point.lng,t.point.lat),t.radius,this.styleOptions):new BMap.Marker(new BMap.Point(t.point.lng,t.point.lat))},saveAlarmInfo(t){const a=this.alarmOverlayList.findIndex((t=>t.id===this.drawingOverlayId)),e=s()(s()({},this.alarmOverlayList[a]),{},{info:t});this.alarmOverlayList.splice(a,1,e),this.visible=!1;const i=this.alarmOverlayList.map((t=>{const{overlay:a}=t,e=l()(t,["overlay"]);return e}));localStorage.setItem("overlay_info",JSON.stringify(i))},cancelEdit(){const t=this.alarmOverlayList.findIndex((t=>t.id===this.drawingOverlayId)),{overlay:a}=this.alarmOverlayList[t];this.alarmOverlayList.splice(t,1),this.map.removeOverlay(a),this.visible=!1},deleteOverlay(t){this.$q.dialog({title:"Confirm",message:t.info?`确定要删除${t.info.alarmNo}-${t.info.alarmName}报警区域吗？`:"确定删除该报警区域吗？",color:"negative",ok:"确定",cancel:"取消"}).onOk((()=>{this.map.removeOverlay(t.overlay);const a=this.alarmOverlayList.findIndex((a=>a.id===t.id));this.alarmOverlayList.splice(a,1);const e=this.alarmOverlayList.map((t=>{const{overlay:a}=t,e=l()(t,["overlay"]);return e}));localStorage.setItem("overlay_info",JSON.stringify(e))}))},searchPoint(){const t=new BMap.Point(this.point.lng,this.point.lat);let a=[],e="";this.alarmOverlayList.forEach((e=>{const{drawingMode:i,overlay:n}=e;let r;switch(i){case"polygon":r=BMapLib.GeoUtils.isPointInPolygon(t,n);break;case"circle":r=BMapLib.GeoUtils.isPointInCircle(t,n);break;case"marker":r=this.point.lng===`${e.point.lng}`&&this.point.lat===`${e.point.lat}`;break;default:break}r&&a.push(`${e.info.alarmNo}-${e.info.alarmName}`)})),e=a.length>0?`坐标：经度${this.point.lng}纬度${this.point.lat}的点在以下报警区域：${a.join(",")}`:"未在报警区域内",this.$q.dialog({title:"查询结果",message:e,ok:"确定"})}}},M=b,k=(e("4367"),e("9989")),L=e("24e8"),I=e("f09f"),_=e("de5e"),P=Object(v["a"])(M,i,n,!1,null,"68f46ac9",null);a["default"]=P.exports;y()(P,"components",{QPage:k["a"],QDialog:L["a"],QCard:I["a"],QBtn:g["a"],QPageSticky:_["a"]})},4367:function(t,a,e){"use strict";e("e590")},"92fa":function(t,a,e){"use strict";e("083d")},e590:function(t,a,e){}}]);