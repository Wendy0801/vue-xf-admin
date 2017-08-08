webpackJsonp([37,48],{380:function(e,t,s){var i=s(2)(s(709),s(450),null,null);e.exports=i.exports},450:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",[s("el-col",{staticClass:"toolbar",attrs:{span:24}},[s("el-form",{attrs:{inline:!0}},[s("el-form-item",[s("el-input",{directives:[{name:"model",rawName:"v-model",value:e.swSensitive,expression:"swSensitive"}],attrs:{placeholder:"请输入敏感词关键字"},domProps:{value:e.swSensitive},on:{change:e.allList,input:function(t){e.swSensitive=t}}})],1),e._v(" "),s("el-form-item",[s("span",{staticClass:"demonstration"},[e._v("添加人:")]),e._v(" "),s("el-select",{directives:[{name:"model",rawName:"v-model",value:e.userId,expression:"userId"}],attrs:{placeholder:"请选择添加人"},domProps:{value:e.userId},on:{input:function(t){e.userId=t}}},[s("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.userList,function(e){return s("el-option",{attrs:{label:e.ename,value:e.eid}})})],2)],1),e._v(" "),s("el-form-item",[s("span",{staticClass:"demonstration"},[e._v("敏感级别:")]),e._v(" "),s("el-select",{directives:[{name:"model",rawName:"v-model",value:e.swLevel,expression:"swLevel"}],attrs:{placeholder:"请选择级别"},domProps:{value:e.swLevel},on:{input:function(t){e.swLevel=t}}},[s("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.levelList,function(e){return s("el-option",{attrs:{label:e.name,value:e.value}})})],2)],1),e._v(" "),s("el-form-item",[s("span",{staticClass:"demonstration"},[e._v("类别:")]),e._v(" "),s("el-select",{directives:[{name:"model",rawName:"v-model",value:e.swCategory,expression:"swCategory"}],attrs:{placeholder:"请选择级别"},domProps:{value:e.swCategory},on:{input:function(t){e.swCategory=t}}},[s("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.categorList,function(e){return s("el-option",{attrs:{label:e.name,value:e.value}})})],2)],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.getSensitiveWords}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.sensitiveWordAdd}},[e._v("新增敏感词")])],1)],1)],1),e._v(" "),[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{stripe:"",data:e.sensitiveWordsList},on:{"selection-change":e.batchSelect}},[s("el-table-column",{attrs:{type:"selection",width:"80"}}),e._v(" "),s("el-table-column",{attrs:{prop:"sequenceNumber",width:"100",label:"序号"}}),e._v(" "),s("el-table-column",{attrs:{prop:"swSensitive",label:"敏感词"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userName",label:"添加人"}}),e._v(" "),s("el-table-column",{attrs:{label:"敏感级别"},scopedSlots:{default:function(t){return e._l(e.levelList,function(i){return i.value===t.row.swLevel?s("span",[e._v(e._s(i.name))]):e._e()})}}}),e._v(" "),s("el-table-column",{attrs:{label:"类别"},scopedSlots:{default:function(t){return e._l(e.categorList,function(i){return i.value===t.row.swCategory?s("span",[e._v(e._s(i.name))]):e._e()})}}}),e._v(" "),s("el-table-column",{attrs:{prop:"swSource",label:"来源"}}),e._v(" "),s("el-table-column",{attrs:{prop:"swCreateTime",label:"添加时间"}}),e._v(" "),s("el-table-column",{attrs:{prop:"swUpdateTime",label:"更新时间"}}),e._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:{default:function(t){return[s("el-button",{attrs:{type:"text"},on:{click:function(s){e.sensitiveWordEdit(t.row)}}},[e._v("编辑")]),e._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(s){e.sensitiveWordDel(t.row.swId)}}},[e._v("删除")])]}}})],1)],e._v(" "),s("el-col",{staticClass:"toolbar",attrs:{span:24}},[s("el-button",{attrs:{type:"primary"},on:{click:e.batchDel}},[e._v("批量删除")]),e._v(" "),s("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"total,prev,pager,next,jumper",total:e.total},on:{"current-change":e.sensitivCurrentChange}})],1),e._v(" "),s("el-dialog",{directives:[{name:"model",rawName:"v-model",value:e.editFormVisible,expression:"editFormVisible"}],attrs:{title:e.editFormTtile},domProps:{value:e.editFormVisible},on:{close:e.editCancel,input:function(t){e.editFormVisible=t}}},[s("el-form",{ref:"editForm",attrs:{model:e.editForm,"label-width":"100px",rules:e.editFormRules}},[s("el-form-item",{attrs:{label:"敏感词",prop:"sw_sensitive"}},[s("el-input",{directives:[{name:"model",rawName:"v-model",value:e.editForm.sw_sensitive,expression:"editForm.sw_sensitive"}],domProps:{value:e.editForm.sw_sensitive},on:{input:function(t){e.editForm.sw_sensitive=t}}})],1),e._v(" "),s("el-form-item",{attrs:{label:"添加人",prop:"user_id"}},[s("el-select",{directives:[{name:"model",rawName:"v-model",value:e.editForm.user_id,expression:"editForm.user_id"}],attrs:{placeholder:"请选择添加人"},domProps:{value:e.editForm.user_id},on:{input:function(t){e.editForm.user_id=t}}},e._l(e.userList,function(e){return s("el-option",{attrs:{label:e.ename,value:e.eid}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"描述说明",prop:"sw_desc"}},[s("el-input",{directives:[{name:"model",rawName:"v-model",value:e.editForm.sw_desc,expression:"editForm.sw_desc"}],domProps:{value:e.editForm.sw_desc},on:{input:function(t){e.editForm.sw_desc=t}}})],1),e._v(" "),s("el-form-item",{attrs:{label:"敏感级别",prop:"sw_level"}},[s("el-select",{directives:[{name:"model",rawName:"v-model",value:e.editForm.sw_level,expression:"editForm.sw_level"}],attrs:{placeholder:"请选择级别"},domProps:{value:e.editForm.sw_level},on:{input:function(t){e.editForm.sw_level=t}}},e._l(e.levelList,function(e){return s("el-option",{attrs:{label:e.name,value:e.value}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"类别",prop:"sw_category"}},[s("el-select",{directives:[{name:"model",rawName:"v-model",value:e.editForm.sw_category,expression:"editForm.sw_category"}],attrs:{placeholder:"请选择类别"},domProps:{value:e.editForm.sw_category},on:{input:function(t){e.editForm.sw_category=t}}},e._l(e.categorList,function(e){return s("el-option",{attrs:{label:e.name,value:e.value}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"来源",prop:"sw_source"}},[s("el-input",{directives:[{name:"model",rawName:"v-model",value:e.editForm.sw_source,expression:"editForm.sw_source"}],domProps:{value:e.editForm.sw_source},on:{input:function(t){e.editForm.sw_source=t}}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",slot:"footer"},[s("el-button",{on:{click:e.editCancel}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary "},on:{click:e.editSumbit}},[e._v("确 定")])],1)],1)],2)},staticRenderFns:[]}},709:function(e,t,s){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=s(5),r=i(o);t.default={name:"sensitiveWords",data:function(){return{sensitiveWordsList:[],sensitiveId:[],swSensitive:"",userId:"",swLevel:"",swCategory:"",userList:[],levelList:[{name:"一级",value:1},{name:"二级",value:2},{name:"三级",value:3},{name:"四级",value:4},{name:"五级",value:5}],categorList:[{name:"政治类",value:1},{name:"色情类",value:2},{name:"侵权类",value:3},{name:"其他",value:4}],total:0,pageNum:1,pageSize:10,editFormTtile:"编辑",editFormVisible:!1,editForm:{sw_id:"",sw_sensitive:"",user_id:"",sw_desc:"",sw_level:"",sw_category:"",sw_source:""},listLoading:!1,editFormRules:{sw_sensitive:[{required:!0,message:"请填写敏感词名称",trigger:"blur"}],user_id:[{required:!0,message:"请选择添加人"}],sw_desc:[{required:!0,message:"请填写描述说明",trigger:"blur"}],sw_level:[{required:!0,message:"请选择敏感级别"}],sw_category:[{required:!0,message:"请选择敏感级别"}],sw_source:[{required:!0,message:"请填写来源",trigger:"blur"}]}}},mounted:function(){this.getSensitiveWords(),this.getUser()},methods:{getSensitiveWords:function(){var e=this;r.default.post({ext:"sensitive/word/page",pageNum:this.pageNum,pageSize:this.pageSize,sw_sensitive:this.swSensitive,user_id:this.userId,sw_level:this.swLevel,sw_category:this.swCategory}).then(function(t){1==t.data.code?(console.log(t),e.sensitiveWordsList=t.data.data.list,e.total=t.data.data.total):e.$notify({title:"失败",message:"res.data.msg",type:"error"}),e.listLoading=!1})},getUser:function(){var e=this;r.default.get({ext:"editor/readList"}).then(function(t){e.userList=t.data.data})},allList:function(){this.swSensitive||this.getSensitiveWords()},sensitiveWordAdd:function(){this.editFormVisible=!0,this.editForm={sw_id:"",sw_sensitive:"",user_id:"",sw_desc:"",sw_level:"",sw_category:"",sw_source:""}},sensitiveWordEdit:function(e){this.editFormVisible=!0,this.editForm={sw_id:e.swId,sw_sensitive:e.swSensitive,user_id:e.userId,sw_desc:e.swDesc,sw_level:e.swLevel,sw_category:e.swCategory,sw_source:e.swSource}},editCancel:function(){this.editFormVisible=!1,this.$refs.editForm.resetFields()},editSumbit:function(){var e=this;this.$refs.editForm.validate(function(t){return!!t&&void(""==e.editForm.sw_id?r.default.post({ext:"sensitive/word/add",sw_sensitive:e.editForm.sw_sensitive,user_id:e.editForm.user_id,sw_desc:e.editForm.sw_desc,sw_level:e.editForm.sw_level,sw_category:e.editForm.sw_category,sw_source:e.editForm.sw_source}).then(function(t){1==t.data.code?(e.$notify({title:"成功",message:"添加成功",type:"success"}),e.editFormVisible=!1,e.listLoading=!0,e.getSensitiveWords()):e.$notify({title:"失败",message:t.data.msg,type:"error"})}):r.default.put({ext:"sensitive/word/edit",sw_id:e.editForm.sw_id,sw_sensitive:e.editForm.sw_sensitive,user_id:e.editForm.user_id,sw_desc:e.editForm.sw_desc,sw_level:e.editForm.sw_level,sw_category:e.editForm.sw_category,sw_source:e.editForm.sw_source}).then(function(t){1==t.data.code?(e.$notify({title:"成功",message:"操作成功",type:"success"}),e.listLoading=!0,e.getSensitiveWords(),e.editFormVisible=!1):e.$notify({title:"失败",message:t.data.msg,type:"error"})}))})},sensitiveWordDel:function(e){var t=this;this.$confirm("您确定要删除评论?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){r.default.post({ext:"sensitive/word/delete",ids:e}).then(function(e){1==e.data.code?(t.$notify({title:"成功",message:"操作成功",type:"success"}),t.listLoading=!0,t.getSensitiveWords(),t.editFormVisible=!1):t.$notify({title:"失败",message:e.data.msg,type:"error"})})}).catch(function(){})},batchSelect:function(e){this.sensitiveId=[];for(var t=0;t<e.length;t++)this.sensitiveId.push(e[t].swId);console.log(this.sensitiveId)},batchDel:function(){var e=this.sensitiveId.join(",");this.sensitiveWordDel(e)},sensitivCurrentChange:function(e){this.pageNum=e,this.getSensitiveWords()}}}}});
//# sourceMappingURL=37.311ce2ea54cff5269916.js.map