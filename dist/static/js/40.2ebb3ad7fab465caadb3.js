webpackJsonp([40,48],{377:function(e,t,s){var a=s(2)(s(706),s(406),null,null);e.exports=a.exports},406:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",[s("el-col",{staticClass:"toolbar",attrs:{span:24}},[s("el-form",{attrs:{inline:!0}},[s("el-form-item",[s("el-select",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],attrs:{placeholder:"请选择推送消息类型"},domProps:{value:e.type},on:{input:function(t){e.type=t}}},[s("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),s("el-option",{attrs:{label:"资讯",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"通知",value:"2"}})],1)],1),e._v(" "),s("el-form-item",[s("el-select",{directives:[{name:"model",rawName:"v-model",value:e.status,expression:"status"}],attrs:{placeholder:"请选择推送状态"},domProps:{value:e.status},on:{input:function(t){e.status=t}}},[s("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),s("el-option",{attrs:{label:"已推送",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"撤销推送",value:"2"}}),e._v(" "),s("el-option",{attrs:{label:"已设置",value:"3"}}),e._v(" "),s("el-option",{attrs:{label:"未设置",value:"4"}})],1)],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.getPushList}},[e._v("查询")])],1)],1)],1),e._v(" "),s("el-table",{attrs:{data:e.pushList}},[s("el-table-column",{attrs:{label:"序号",width:"80"},scopedSlots:{default:function(t){return[e._v("\n                "+e._s(t.$index+1+(e.pageNum-1)*e.pageSize)+"\n            ")]}}}),e._v(" "),s("el-table-column",{attrs:{label:"标题",prop:"title"}}),e._v(" "),s("el-table-column",{attrs:{label:"类型"},scopedSlots:{default:function(t){return[s("span",{directives:[{name:"show",rawName:"v-show",value:1==t.row.type,expression:"scope.row.type==1"}]},[e._v("资讯")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:2==t.row.type,expression:"scope.row.type==2"}]},[e._v("通知")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:3==t.row.type,expression:"scope.row.type==3"}]},[e._v("一级评论")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:4==t.row.type,expression:"scope.row.type==4"}]},[e._v("二级评论")])]}}}),e._v(" "),s("el-table-column",{attrs:{label:"推送时间",prop:"startTime"}}),e._v(" "),s("el-table-column",{attrs:{label:"推送状态"},scopedSlots:{default:function(t){return[s("span",{directives:[{name:"show",rawName:"v-show",value:1==t.row.status,expression:"scope.row.status==1"}]},[e._v("已推送")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:2==t.row.status,expression:"scope.row.status==2"}]},[e._v("撤销推送")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:3==t.row.status,expression:"scope.row.status==3"}]},[e._v("已设置")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:4==t.row.status,expression:"scope.row.status==4"}]},[e._v("未设置")])]}}}),e._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:{default:function(t){return[s("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.status,expression:"scope.row.status==1"}],attrs:{type:"text"}}),e._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.status,expression:"scope.row.status==2"}],attrs:{type:"text"},on:{click:function(s){e.editPush(t.row.id,t.row.status)}}},[e._v("设置推送")]),e._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:3==t.row.status,expression:"scope.row.status==3"}],attrs:{type:"text"},on:{click:function(s){e.editPush(t.row.id,t.row.status)}}},[e._v("取消推送")]),e._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:4==t.row.status,expression:"scope.row.status==4"}],attrs:{type:"text"},on:{click:function(s){e.editPush(t.row.id,t.row.status)}}},[e._v("设置推送")])]}}})],1),e._v(" "),s("el-col",{staticClass:"toolbar",attrs:{span:24}},[s("el-pagination",{attrs:{layout:"total, prev, pager, next, jumper",total:e.total},on:{"current-change":e.pusPage}})],1),e._v(" "),s("el-dialog",{directives:[{name:"model",rawName:"v-model",value:e.editFormVisible,expression:"editFormVisible"}],attrs:{title:"编辑"},domProps:{value:e.editFormVisible},on:{close:e.editCancel,input:function(t){e.editFormVisible=t}}},[s("el-form",{ref:"editForm",attrs:{model:e.editForm,"label-width":"120px",rules:e.editFormRules}},[s("el-form-item",{attrs:{label:"推送时间",prop:"startTime"}},[s("el-date-picker",{directives:[{name:"model",rawName:"v-model",value:e.editForm.startTime,expression:"editForm.startTime"}],attrs:{type:"datetime",placeholder:"选择推送时间",format:"yyyy-MM-dd HH:mm:ss"},domProps:{value:e.editForm.startTime},on:{change:e.startDateFormat,input:function(t){e.editForm.startTime=t}}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",slot:"footer"},[s("el-button",{on:{click:e.editCancel}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.editSumit}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]}},706:function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=s(5),i=a(o);t.default={name:"pushList",data:function(){return{type:"",status:"",pushList:[],pageNum:1,pageSize:10,total:0,editFormVisible:!1,editForm:{id:"",startTime:""},editFormRules:{startTime:[{required:!0,message:"请选择推送时间"}]}}},mounted:function(){this.getPushList()},methods:{getPushList:function(){var e=this;i.default.post({ext:"push/message/getPushMsgVoList",pageNum:this.pageNum,pageSize:this.pageSize,type:this.type,status:this.status}).then(function(t){e.pushList=t.data.data.list,e.total=t.data.data.total})},editPush:function(e,t){var s=this;this.editForm.id=e,2==t||4==t?this.editFormVisible=!0:3==t&&i.default.post({ext:"push/message/cancelPushMsg",id:e}).then(function(e){console.log(e),1==e.data.code&&s.$notify({title:"提示",message:"操作成功！",type:"success"}),s.editFormVisible=!1,s.getPushList()})},editSumit:function(){var e=this;this.$refs.editForm.validate(function(t){t&&i.default.post({ext:"push/message/setStartTime",id:e.editForm.id,startTime:e.editForm.startTime}).then(function(t){console.log(t),1==t.data.code&&e.$notify({title:"提示",message:"操作成功！",type:"success"}),e.editFormVisible=!1,e.getPushList()})})},editCancel:function(){this.editFormVisible=!1,this.$refs.editForm.resetFields()},startDateFormat:function(e){this.editForm.startTime=e},pusPage:function(e){this.pageNum=e,this.getPushList()}}}}});
//# sourceMappingURL=40.2ebb3ad7fab465caadb3.js.map