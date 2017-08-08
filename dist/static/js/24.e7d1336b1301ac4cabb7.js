webpackJsonp([24,48],{241:function(t,i,e){i=t.exports=e(3)(),i.push([t.id,".el-form-item img{width:200px}.el-form-item .tip{color:#999}#actiParams,#actiUrl,#url{display:none}","",{version:3,sources:["/./src/pages.guo/activityList/activityList.vue"],names:[],mappings:"AACA,kBACI,WAAa,CAChB,AACD,mBACI,UAAY,CACf,AACD,0BAGI,YAAc,CACjB",file:"activityList.vue",sourcesContent:["\n.el-form-item img {\n    width: 200px;\n}\n.el-form-item .tip {\n    color: #999;\n}\n#actiUrl,\n#actiParams,\n#url {\n    display: none;\n}\n"],sourceRoot:"webpack://"}])},285:function(t,i,e){var a=e(241);"string"==typeof a&&(a=[[t.id,a,""]]);e(4)(a,{});a.locals&&(t.exports=a.locals)},357:function(t,i,e){e(285);var a=e(2)(e(686),e(425),null,null);t.exports=a.exports},425:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("section",[e("el-col",{staticClass:"toolbar",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("el-input",{directives:[{name:"model",rawName:"v-model",value:t.acti_name,expression:"acti_name"}],attrs:{placeholder:"活动标题"},domProps:{value:t.acti_name},on:{change:t.allList,input:function(i){t.acti_name=i}}})],1),t._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:t.getActivityList}},[t._v("查询")])],1),t._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:t.activityAdd}},[t._v("新增")])],1)],1)],1),t._v(" "),[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.activityList,stripe:""},on:{"selection-change":t.batchSelect}},[e("el-table-column",{attrs:{type:"selection"}}),t._v(" "),e("el-table-column",{attrs:{prop:"sequenceNumber",width:"80",label:"序号"}}),t._v(" "),e("el-table-column",{attrs:{prop:"actiId",label:"活动ID",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"actiName",label:"活动名称",width:"200"}}),t._v(" "),e("el-table-column",{attrs:{prop:"actiLabel",label:"标签",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{label:"缩略图",width:"150"},scopedSlots:{default:function(i){return[e("img",{staticClass:"preview-img",attrs:{src:i.row.actiCover,alt:""},on:{click:function(e){t.showPreview(i.$index)}}})]}}}),t._v(" "),e("el-table-column",{attrs:{label:"标签",width:"80"},scopedSlots:{default:function(i){return[e("span",[t._v(t._s(0==i.row.actiDisplay?"是":"否"))])]}}}),t._v(" "),e("el-table-column",{attrs:{label:"排序管理"},scopedSlots:{default:function(i){return[e("el-input",{attrs:{value:i.row.actiSort},on:{focus:function(e){t.changeSort(i.row)}}})]}}}),t._v(" "),e("el-table-column",{attrs:{context:t._self,label:"操作"},inlineTemplate:{render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("span",[e("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){t.activityEdit(t.row)}}},[t._v("编辑")]),t._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){t.activityDel(t.row)}}},[t._v("删除")]),t._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){t.activityApplyUser(t.row)}}},[t._v("用户")]),t._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){t.activityVideoSort(t.row)}}},[t._v("视频")]),t._v(" "),e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){t.activityPlyerSort(t.row)}}},[t._v("达人")])],1)},staticRenderFns:[]}})],1)],t._v(" "),e("el-col",{staticClass:"toolbar",attrs:{span:24}},[e("el-button",{attrs:{type:"primary"},on:{click:t.batchDel}},[t._v("批量删除")]),t._v(" "),e("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"total,prev, pager, next,jumper",total:t.total,"page-size":10},on:{"current-change":t.activityCurrentChange}})],1)],2)},staticRenderFns:[]}},686:function(t,i,e){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(i,"__esModule",{value:!0});var n=e(5),c=a(n);i.default={name:"banner",data:function(){return{activityList:[],activityId:[],imgList:[],acti_name:"",total:0,pSize:10,pageNum:1,listLoading:!0,btnEditText:"提 交"}},computed:{},mounted:function(){this.getActivityList()},methods:{getActivityList:function(){var t=this;c.default.post({ext:"activity/page",pageNum:this.pageNum,pageSize:this.pSize,acti_name:this.acti_name}).then(function(i){t.activityList=i.data.data.list,t.total=i.data.data.total,t.listLoading=!1,t.activityList.map(function(i){t.imgList.push(i.actiCover)})})},allList:function(){this.acti_name||this.getActivityList()},activityAdd:function(){this.$router.push({path:"/activityEdit"})},activityEdit:function(t){this.$router.push({path:"/activityEdit/"+t.actiId})},activityApplyUser:function(t){this.$router.push({path:"/signUpList/"+t.actiId})},activityVideoSort:function(t){this.$router.push({path:"/showVideoOrder/"+t.actiId})},activityPlyerSort:function(t){this.$router.push({path:"/showplayerOrder/"+t.actiId})},activityDel:function(t){var i=this;this.$confirm("您确定要删除该活动","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){c.default.post({ext:"activity/delete",ids:t.actiId}).then(function(t){1==t.data.code?(i.$notify({title:"成功",message:"删除成功",type:"success"}),i.listLoading=!0,i.getActivityList()):i.$notify({title:"失败",message:t.data.msg,type:"error"})})}).catch(function(){})},activityCurrentChange:function(t){this.pageNum=t,this.getActivityList()},changeSort:function(t){var i=this;this.$prompt("请输入序列号","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var a=e.value;return a?void c.default.put({ext:"activity/acti_sort",ids:t.actiId,acti_sort:a}).then(function(t){i.listLoading=!0,i.$notify({title:"成功",message:"操作成功",type:"success"}),i.getActivityList()}):(i.$alert("序列号不能为空","提示",{confirmButtonText:"确定"}).then(function(){}).catch(function(){}),!1)}).catch(function(){})},batchSelect:function(t){this.activityId=[];for(var i=0;i<t.length;i++)this.activityId.push(t[i].actiId)},batchDel:function(){var t=this;if(this.activityId.length>0){var i=this.activityId.join(",");this.$confirm("您确定要删除该活动","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){c.default.post({ext:"activity/delete",ids:i}).then(function(i){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.listLoading=!0,t.getActivityList()})}).catch(function(){})}else this.$confirm("请勾选您需要删除的活动","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).catch(function(){})},showPreview:function(t){function i(){c.$preview.open(t,a)}var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.imgList,a=[],n=0,c=this;e.map(function(t,c){var o=new Image;o.src=t,o.onload=function(){n++,a.push({src:t,w:o.width,h:o.height}),n===e.length&&i()},o.onerror=function(){n++,a.splice(c,0,{src:"/static/images/default1.jpg",w:100,h:100}),n===e.length&&i()}})}}}}});
//# sourceMappingURL=24.e7d1336b1301ac4cabb7.js.map