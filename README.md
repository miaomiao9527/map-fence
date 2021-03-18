# map-fence (map-fence)

map-fence demo

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

#### map 地图页
> 基本功能描述
I 新增报警区域
该项目可实现圆形和多边形报警区域的绘制。
1. 新增：
1)点击选择绘制类型，然后在地图上完成报警区域绘制。
2)绘制成功后，弹出表单对话框，填写报警区域的相关信息。
3)若用户点击取消按钮，则该报警区域被删除，防止用户误操作。
4)正确填写信息后，点击确定，保存绘制信息，更新存储的区域报警信息，并在报警区域列表中展示基本信息。
2. 删除：__右键__点击报警区域,弹出confirm对话框。
1)用户点击确定之后，该报警区域从地图上删除，该报警区域的相关信息从报警区域列表中删除。更新存储的报警区域信息
2)用户点击取消之后，关闭对话框。
II 报警区域展示
每次进入页面时，在地图上展示历史报警区域，列表中展示历史报警区域相关信息。
可右键点击报警区域进行删除操作。
III 坐标检索
 分别输入经度和纬度，点击查询按钮，检索该坐标点所在的报警区域。
 若该坐标点不在报警区域内，弹出对话框，内容为未在报警区域内。
 若该坐标点在报警区域内，弹出对话框，列出它所在的所有报警区域的基本信息(名称，编号)。
> 一些待优化点
1. 使用[百度地图鼠标绘制开源库](http://lbsyun.baidu.com/jsdemo/demo/f0_7.htm)无法实现移动端的绘制。
2. 报警区域信息列表与地图上的报警区域联动。点击报警区域的某一项，对应地图上的绘制区域突出展示。
3. 搜索时候在地图上绘制出该坐标点。


