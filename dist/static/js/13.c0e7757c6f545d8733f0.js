webpackJsonp([13,48],{258:function(t,e,i){e=t.exports=i(3)(),e.push([t.id,"","",{version:3,sources:[],names:[],mappings:"",file:"showVideoOrder.vue",sourceRoot:"webpack://"}])},304:function(t,e,i){var o=i(258);"string"==typeof o&&(o=[[t.id,o,""]]);i(4)(o,{});o.locals&&(t.exports=o.locals)},381:function(t,e,i){i(304);var o=i(2)(i(710),i(452),null,null);t.exports=o.exports},452:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",[i("el-col",{staticClass:"toolbar",attrs:{span:24}},[i("el-form",{attrs:{inline:!0}},[i("el-form-item",[i("el-input",{directives:[{name:"model",rawName:"v-model",value:t.vide_title,expression:"vide_title"}],attrs:{placeholder:"输入视频标题"},domProps:{value:t.vide_title},on:{change:t.allList,input:function(e){t.vide_title=e}}})],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.getShowVideoList}},[t._v("查询")])],1)],1)],1),t._v(" "),[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.showVideoList,stripe:""},on:{"selection-change":t.batchSelect}},[i("el-table-column",{attrs:{type:"selection"}}),t._v(" "),i("el-table-column",{attrs:{prop:"sequenceNumber",width:"100",label:"序号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"videTitle",label:"视频标题",width:"150"}}),t._v(" "),i("el-table-column",{attrs:{prop:"playName",label:"发布者",width:"150"}}),t._v(" "),i("el-table-column",{attrs:{label:"排序管理"},scopedSlots:{default:function(e){return[i("el-input",{attrs:{value:e.row.videSort},on:{focus:function(i){t.changeSort(e.row)}}})]}}}),t._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:{default:function(e){return[i("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){t.showVideoWatch(e.row)}}},[t._v("观看")]),t._v(" "),i("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){t.showVideoDel(e.row)}}},[t._v("删除")])]}}})],1)],t._v(" "),i("el-col",{staticClass:"toolbar",attrs:{span:24}},[i("el-button",{attrs:{type:"primary"},on:{click:t.batchDel}},[t._v("删除")]),t._v(" "),i("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"total,prev, pager, next,jumper",total:t.total,"page-size":10},on:{"current-change":t.showVideoCurrentChange}})],1),t._v(" "),i("el-dialog",{directives:[{name:"model",rawName:"v-model",value:t.editFormVisible,expression:"editFormVisible"}],attrs:{title:t.editFormTtile,"close-on-click-modal":!1},domProps:{value:t.editFormVisible},on:{input:function(e){t.editFormVisible=e}}},[i("el-form",{attrs:{model:t.editForm,"label-width":"80px"}},[i("el-form-item",[[i("video",{attrs:{src:t.editForm.videUrl,controls:"controls",autoplay:"autoplay"}})]],2)],1),t._v(" "),i("div",{staticClass:"dialog-footer",slot:"footer"},[i("el-button",{attrs:{type:"primary",loading:t.editLoading},nativeOn:{click:function(e){t.editFormVisible=!1}}},[t._v(t._s(t.btnEditText))])],1)],1)],2)},staticRenderFns:[]}},710:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(5),s=o(n);e.default={name:"sign",data:function(){return{showVideoList:[],showVideoId:[],vide_title:"",total:0,pageNum:1,listLoading:!0,editFormVisible:!1,editFormTtile:"编辑",pSize:10,editForm:{videUrl:""},editLoading:!1,btnEditText:"确 定"}},computed:{},mounted:function(){this.getShowVideoList()},methods:{getShowVideoList:function(){var t=this;s.default.post({ext:"activity/second-talent-show-video-order/page",pageNum:this.pageNum,acti_id:this.$route.params.actiId,pageSize:this.pSize,vide_title:this.vide_title}).then(function(e){console.log(e.data),t.showVideoList=e.data.data.list,t.total=e.data.data.total,t.listLoading=!1})},allList:function(){this.vide_title||this.getShowVideoList()},showVideoCurrentChange:function(t){this.pageNum=t,this.getShowVideoList()},showVideoWatch:function(t){this.editFormVisible=!0,this.editFormTtile="观看视频",this.editForm.videUrl=t.videUrl},showVideoDel:function(t){var e=this;this.$confirm("您确定要删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){s.default.post({ext:"activity/second-talent-show-video-order/delete",ids:t.videId}).then(function(t){e.$notify({title:"成功",message:"操作成功",type:"success"}),e.listLoading=!0,e.getShowVideoList()})}).catch(function(){})},batchSelect:function(t){this.showVideoId=[];for(var e=0;e<t.length;e++)this.showVideoId.push(t[e].videId)},batchDel:function(){var t=this;if(this.showVideoId.length>0){var e=this.showVideoId.join(",");this.$confirm("您确定要删除该活动","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){s.default.post({ext:"activity/second-talent-show-video-order/delete",ids:e}).then(function(e){t.$notify({title:"成功",message:"删除成功",type:"success"}),t.listLoading=!0,t.getShowVideoList()})}).catch(function(){})}else this.$confirm("请勾选您需要删除的参赛视频","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).catch(function(){})},changeSort:function(t){var e=this;this.$prompt("请输入序列号","提示",{confirmButtonText:"确认",cancelButtonText:"取消"}).then(function(i){var o=i.value;return o?void s.default.put({ext:"activity/second-talent-show-video-order/vide_sort",ids:t.videId,vide_sort:o}).then(function(t){e.$notify({title:"成功",message:"操作成功",type:"success"}),e.listLoading=!0,e.getShowVideoList()}):(e.$alert("序列号不能为空","提示",{confirmButtonText:"确定"}).then(function(){}).catch(function(){}),!1)}).catch(function(){})}}}}});
//# sourceMappingURL=13.c0e7757c6f545d8733f0.js.map