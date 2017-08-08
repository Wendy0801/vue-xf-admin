webpackJsonp([4,48],{19:function(t,e,o){e=t.exports=o(3)(),e.push([t.id,".el-upload{margin-top:12px}","",{version:3,sources:["/./src/components/ImgUploader.vue"],names:[],mappings:"AACA,WACE,eAAiB,CAClB",file:"ImgUploader.vue",sourcesContent:["\n.el-upload{\n  margin-top: 12px;\n}\n"],sourceRoot:"webpack://"}])},20:function(t,e,o){var a=o(19);"string"==typeof a&&(a=[[t.id,a,""]]);o(4)(a,{});a.locals&&(t.exports=a.locals)},21:function(t,e,o){o(20);var a=o(2)(o(28),o(22),null,null);t.exports=a.exports},22:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-upload",{attrs:{action:t.uploadUrl,data:t.uploadImgData,name:"file","on-success":t.onSuccess,"before-upload":t.checkData}},[o("el-button",{attrs:{size:"small",type:"primary"}},[t._v(t._s(t.btnText))])],1)],1)},staticRenderFns:[]}},28:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=o(36),n=a(r);e.default={data:function(){return{uploadUrl:"http://up-z2.qiniu.com/",qiniuImgUrl:this.qnImgUrl,uploadImgData:{token:""}}},props:["btnText","token","limit","qnImgUrl"],watch:{token:function(){this.token&&""!==this.token&&this.initConfig()}},mounted:function(){},methods:{initConfig:function(){this.uploadImgData={token:this.token}},checkData:function(t){var e=this;return new n.default(function(o,a){if(e.limit){var r=new FileReader;r.readAsDataURL(t),r.onload=function(t){var r=new Image;r.src=t.target.result,console.log(r.src),r.onload=function(t){console.log(r.width,r.height),console.log(e.limit.width,e.limit.height),r.width<=e.limit.width&&r.height<=e.limit.height?o(!0):(e.$emit("onSizeError","图片尺寸不符合规范"),a("图片尺寸不符合规范"))}}}else o(!0)})},onSuccess:function(t){var e=""+this.qiniuImgUrl+t.key;this.$emit("onSuccess",e,t)}}}},251:function(t,e,o){e=t.exports=o(3)(),e.push([t.id,".author-edit-form[data-v-a1655eb2]{padding:40px;width:600px}","",{version:3,sources:["/./src/pages/author-edit/author-edit.scss"],names:[],mappings:"AACA,mCAAmC,aAAa,WAAW,CAC1D",file:"author-edit.scss",sourcesContent:["\n.author-edit-form[data-v-a1655eb2]{padding:40px;width:600px\n}\n"],sourceRoot:"webpack://"}])},296:function(t,e,o){var a=o(251);"string"==typeof a&&(a=[[t.id,a,""]]);o(4)(a,{});a.locals&&(t.exports=a.locals)},391:function(t,e,o){o(296);var a=o(2)(o(720),o(442),"data-v-a1655eb2",null);t.exports=a.exports},442:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"author-edit-form"},[o("el-form",{ref:"authorForm",staticClass:"demo-authorForm",attrs:{model:t.authorForm,rules:t.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"作者名称",prop:"e_name"}},[o("el-input",{directives:[{name:"model",rawName:"v-model",value:t.authorForm.e_name,expression:"authorForm.e_name"}],domProps:{value:t.authorForm.e_name},on:{input:function(e){t.authorForm.e_name=e}}})],1),t._v(" "),o("el-form-item",{attrs:{label:"作者头像",prop:"e_avatar"}},[[t.authorForm.e_avatar?o("div",{staticClass:"user-face"},[o("img",{directives:[{name:"show",rawName:"v-show",value:t.authorForm.e_avatar,expression:"authorForm.e_avatar"}],attrs:{src:t.authorForm.e_avatar}})]):t._e(),t._v(" "),o("img-uploader",{attrs:{btnText:"点击上传图片",token:t.uptoken,qnImgUrl:t.domain},on:{onSuccess:t.uploadSuccess,onSizeError:t.sizeError}})]],2),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("authorForm")}}},[t._v("提交")]),t._v(" "),o("el-button",{on:{click:function(e){t.resetForm("authorForm")}}},[t._v("重置")])],1)],1)],1)},staticRenderFns:[]}},720:function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=o(64),n=a(r),i=o(5),u=a(i),s=o(21),d=a(s);e.default={data:function(){return{uptoken:"",domain:"",uploadUrl:u.default.getUploadUrl(),authorForm:{e_name:"",e_avatar:""},rules:{e_name:[{required:!0,message:"请输入通知标题",trigger:"blur"}],e_avatar:[{required:!0,message:"请上传头像"}]}}},components:{"img-uploader":d.default},mounted:function(){this.editorUpload(),this.authorId=this.$route.params.authorId,this.authorId&&this.getPrevAuthorInfo()},methods:{editorUpload:function(){var t=this;u.default.get({ext:"common/resource/qiniu/config"}).then(function(e){t.uptoken=e.body.uptoken,t.domain=e.body.domain})},getPrevAuthorInfo:function(){var t=this;u.default.get({ext:"editor/read",e_id:this.authorId}).then(function(e){1===e.data.code&&(t.authorForm.e_avatar=e.data.data.eavatar,t.authorForm.e_name=e.data.data.ename,t.authorForm.e_type=""+e.data.data.etype)})},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){return t?void(e.authorId?e.editAuthor():e.addAuthor()):(e.$alert("信息填写不完整!","提示",{confirmButtonText:"确定"}).catch(function(){}),!1)})},resetForm:function(t){this.$refs[t].resetFields()},uploadImgSucess:function(t){this.authorForm.e_avatar=t.url},addAuthor:function(){var t=this,e=(0,n.default)(this.authorForm,{ext:"editor/add"});u.default.post(e).then(function(e){1===e.data.code&&(t.$notify({type:"success",message:"添加成功"}),t.resetForm("authorForm"),t.$router.push({}))})},editAuthor:function(){var t=this,e=(0,n.default)(this.authorForm,{ext:"editor/edit",e_id:this.authorId});console.log(e),u.default.put(e).then(function(e){1===e.data.code&&(t.$notify({type:"success",message:"修改成功"}),t.$router.back())})},uploadSuccess:function(t){this.authorForm.e_avatar=this.domain+t,console.log(t)},sizeError:function(t){this.$alert(t,"提示",{confirmButtonText:"确定"}).catch(function(){})}}}}});
//# sourceMappingURL=4.90c28cf73588d7d86a51.js.map