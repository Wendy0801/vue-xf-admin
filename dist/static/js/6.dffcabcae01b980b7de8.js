webpackJsonp([6,48],{19:function(e,a,t){a=e.exports=t(3)(),a.push([e.id,".el-upload{margin-top:12px}","",{version:3,sources:["/./src/components/ImgUploader.vue"],names:[],mappings:"AACA,WACE,eAAiB,CAClB",file:"ImgUploader.vue",sourcesContent:["\n.el-upload{\n  margin-top: 12px;\n}\n"],sourceRoot:"webpack://"}])},20:function(e,a,t){var r=t(19);"string"==typeof r&&(r=[[e.id,r,""]]);t(4)(r,{});r.locals&&(e.exports=r.locals)},21:function(e,a,t){t(20);var r=t(2)(t(28),t(22),null,null);e.exports=r.exports},22:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("el-upload",{attrs:{action:e.uploadUrl,data:e.uploadImgData,name:"file","on-success":e.onSuccess,"before-upload":e.checkData}},[t("el-button",{attrs:{size:"small",type:"primary"}},[e._v(e._s(e.btnText))])],1)],1)},staticRenderFns:[]}},28:function(e,a,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var s=t(36),i=r(s);a.default={data:function(){return{uploadUrl:"http://up-z2.qiniu.com/",qiniuImgUrl:this.qnImgUrl,uploadImgData:{token:""}}},props:["btnText","token","limit","qnImgUrl"],watch:{token:function(){this.token&&""!==this.token&&this.initConfig()}},mounted:function(){},methods:{initConfig:function(){this.uploadImgData={token:this.token}},checkData:function(e){var a=this;return new i.default(function(t,r){if(a.limit){var s=new FileReader;s.readAsDataURL(e),s.onload=function(e){var s=new Image;s.src=e.target.result,console.log(s.src),s.onload=function(e){console.log(s.width,s.height),console.log(a.limit.width,a.limit.height),s.width<=a.limit.width&&s.height<=a.limit.height?t(!0):(a.$emit("onSizeError","图片尺寸不符合规范"),r("图片尺寸不符合规范"))}}}else t(!0)})},onSuccess:function(e){var a=""+this.qiniuImgUrl+e.key;this.$emit("onSuccess",a,e)}}}},236:function(e,a,t){a=e.exports=t(3)(),a.push([e.id,".advert-edit-container[data-v-483eb54a]{padding:50px 12px}.dialog-footer[data-v-483eb54a]{float:right}","",{version:3,sources:["/./src/pages.guo/advert/advert.scss"],names:[],mappings:"AACA,wCAAwC,iBAAiB,CACxD,AACD,gCAAgC,WAAW,CAC1C",file:"advert.scss",sourcesContent:["\n.advert-edit-container[data-v-483eb54a]{padding:50px 12px\n}\n.dialog-footer[data-v-483eb54a]{float:right\n}\n"],sourceRoot:"webpack://"}])},280:function(e,a,t){var r=t(236);"string"==typeof r&&(r=[[e.id,r,""]]);t(4)(r,{});r.locals&&(e.exports=r.locals)},360:function(e,a,t){t(280);var r=t(2)(t(689),t(420),"data-v-483eb54a",null);e.exports=r.exports},420:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"advert-edit-container"},[t("el-form",{ref:"editForm",attrs:{model:e.editForm,"label-width":"150px",rules:e.editFormRules}},[t("el-form-item",{attrs:{label:"名称",prop:"ba_name"}},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.editForm.ba_name,expression:"editForm.ba_name"}],domProps:{value:e.editForm.ba_name},on:{input:function(a){e.editForm.ba_name=a}}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"ba_image"}},[t("img",{directives:[{name:"show",rawName:"v-show",value:e.editForm.ba_image,expression:"editForm.ba_image"}],attrs:{src:e.editForm.ba_image,alt:"",width:"200"}}),e._v(" "),t("img-uploader",{attrs:{btnText:"点击上传广告URL(图片/Falsh)",token:e.uptoken,qnImgUrl:e.domain},on:{onSuccess:e.uploadSuccess,onSizeError:e.sizeError}})],1),e._v(" "),t("el-form-item",{attrs:{label:"排序",prop:"ba_sort"}},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.editForm.ba_sort,expression:"editForm.ba_sort"}],domProps:{value:e.editForm.ba_sort},on:{input:function(a){e.editForm.ba_sort=a}}})],1),e._v(" "),t("el-form-item",{attrs:{label:"业务类型",prop:"ba_business"}},[t("el-select",{directives:[{name:"model",rawName:"v-model",value:e.editForm.ba_business,expression:"editForm.ba_business"}],attrs:{placeholder:"请选择业务类型"},domProps:{value:e.editForm.ba_business},on:{change:function(a){e.changeType(e.editForm.ba_business)},input:function(a){e.editForm.ba_business=a}}},e._l(e.baBusiness,function(e){return t("el-option",{attrs:{label:e.name,value:e.value}})}))],1),e._v(" "),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:5==e.editForm.ba_business,expression:"editForm.ba_business==5"}],attrs:{label:"广告类型",prop:"ba_admaster_type"}},[t("el-radio-group",{directives:[{name:"model",rawName:"v-model",value:e.editForm.ba_admaster_type,expression:"editForm.ba_admaster_type"}],domProps:{value:e.editForm.ba_admaster_type},on:{change:function(a){e.changeAdmasterType(e.editForm.ba_admaster_type)},input:function(a){e.editForm.ba_admaster_type=a}}},[t("el-radio",{attrs:{label:0}},[e._v("正常")]),e._v(" "),t("el-radio",{attrs:{label:1}},[e._v("秒针")]),e._v(" "),t("el-radio",{attrs:{label:2}},[e._v("AdMaster")])],1)],1),e._v(" "),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:0==!e.editForm.ba_admaster_type&&5==e.editForm.ba_business,expression:"!editForm.ba_admaster_type==0&&editForm.ba_business==5"}],attrs:{label:"曝光地址",prop:"ba_expousre_address"}},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.editForm.ba_expousre_address,expression:"editForm.ba_expousre_address"}],domProps:{value:e.editForm.ba_expousre_address},on:{input:function(a){e.editForm.ba_expousre_address=a}}})],1),e._v(" "),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:5==e.editForm.ba_business,expression:"editForm.ba_business==5"}],attrs:{label:"跳转URL",prop:"ba_url",id:"ba_url"}},[t("el-input",{directives:[{name:"model",rawName:"v-model",value:e.editForm.ba_url,expression:"editForm.ba_url"}],domProps:{value:e.editForm.ba_url},on:{input:function(a){e.editForm.ba_url=a}}})],1),e._v(" "),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:4==e.editForm.ba_business,expression:"editForm.ba_business==4"}],attrs:{label:"活动ID",prop:"ba_params",id:"ba_params"}},[t("el-select",{directives:[{name:"model",rawName:"v-model",value:e.editForm.ba_params,expression:"editForm.ba_params"}],attrs:{placeholder:"请选择活动id"},domProps:{value:e.editForm.ba_params},on:{input:function(a){e.editForm.ba_params=a}}},e._l(e.activityIdList,function(e){return t("el-option",{attrs:{label:e.actiTitle,value:e.actiId}})}))],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",slot:"footer"},[t("el-button",{attrs:{type:"primary "},on:{click:e.editSumbit}},[e._v("确 定")])],1)],1)},staticRenderFns:[]}},689:function(e,a,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var s=t(5),i=r(s),o=t(21),n=r(o);a.default={name:"advert",data:function(){return{uptoken:"",domain:"",activityIdList:[],admasterType:[{value:0,name:"正常"},{value:1,name:"秒针"}],baBusiness:[{value:4,name:"活动"},{value:5,name:"外链"}],baType:[{value:1,name:"对应资讯id"},{value:2,name:"对应vode_id"},{value:3,name:"对应play_id"},{value:4,name:"活动ID"}],uploadUrl:i.default.getUploadUrl(),editForm:{ba_id:"",ba_name:"",ba_image:"",ba_sort:"",ba_business:"",ba_url:"",ba_params:"",ba_admaster_type:"",ba_expousre_address:""},editFormRules:{ba_name:[{required:!0,message:"请输入广告banner名称",trigger:"blur"}],ba_image:[{required:!0,message:"请上传广告URL(图片/Falsh)"}],ba_admaster_type:[{required:!0,message:"请选择广告类型"}],ba_business:[{required:!0,message:"请选择业务类型"}],ba_url:[{required:!0,message:"请填写跳转URL"}],ba_expousre_address:[{required:!0,message:"请填写跳转曝光地址"}],ba_params:[{required:!0,message:"请选择活动id"}]}}},components:{"img-uploader":n.default},mounted:function(){this.getEditerList(),this.getActivityId();var e;e=this.editForm.ba_id=this.$route.params.advertId,e?this.advertEdit(e):this.editForm.ba_id="",this.editorUpload()},methods:{editorUpload:function(){var e=this;i.default.get({ext:"common/resource/qiniu/config"}).then(function(a){e.uptoken=a.body.uptoken,e.domain=a.body.domain})},advertEdit:function(e){var a=this;i.default.get({ext:"banners/read",ba_id:e}).then(function(e){a.editForm={ba_id:e.data.data.baId,ba_name:e.data.data.baName,ba_image:e.data.data.baImage,ba_sort:e.data.data.baSort,ba_business:e.data.data.baBusiness,ba_url:e.data.data.baUrl,ba_params:+e.data.data.baParams,ba_admaster_type:e.data.data.baAdmasterType,ba_expousre_address:e.data.data.baExpousreAddress},a.changeType(e.data.data.baParams),a.changeAdmasterType(e.data.data.baAdmasterType)})},getActivityId:function(){var e=this;i.default.get({ext:"activity/readList"}).then(function(a){e.activityIdList=a.data.data})},getEditerList:function(){var e=this;i.default.get({ext:"editor/readList"}).then(function(a){e.editerList=a.data.data})},editSumbit:function(){var e=this;this.$refs.editForm.validate(function(a){return a?void(""==e.editForm.ba_id?i.default.post({ext:"banners/add",ba_name:e.editForm.ba_name,ba_image:e.editForm.ba_image,ba_sort:e.editForm.ba_sort,ba_admaster_type:e.editForm.ba_admaster_type,ba_expousre_address:e.editForm.ba_expousre_address,ba_business:e.editForm.ba_business,ba_url:e.editForm.ba_url,ba_params:e.editForm.ba_params}).then(function(a){1==a.data.code?(e.$notify({title:"成功",message:"添加成功",type:"success"}),e.$router.push({path:"/advert"})):e.$notify({title:"失败",message:a.data.msg,type:"error"})}):i.default.put({ext:"banners/edit",ba_id:e.editForm.ba_id,ba_name:e.editForm.ba_name,ba_image:e.editForm.ba_image,ba_sort:e.editForm.ba_sort,ba_admaster_type:e.editForm.ba_admaster_type,ba_expousre_address:e.editForm.ba_expousre_address,ba_business:e.editForm.ba_business,ba_url:e.editForm.ba_url,ba_params:e.editForm.ba_params}).then(function(a){1==a.data.code?(e.$notify({title:"成功",message:"操作成功",type:"success"}),e.$router.push({path:"/advert"})):e.$notify({title:"失败",message:a.data.msg,type:"error"})})):(e.$alert("信息填写不完整!","提示",{confirmButtonText:"确定"}).catch(function(){}),!1)})},advertDel:function(e){var a=this;console.log(e),this.$confirm("您确定要删除广告banner?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){i.default.post({ext:"banners/delete",ids:e}).then(function(e){a.$notify({title:"成功",message:"删除成功",type:"success"}),a.listLoading=!0,a.getAvertList()})}).catch(function(){})},batchSelect:function(e){this.avertId=[];for(var a=0;a<e.length;a++)this.avertId.push(e[a].baId)},batchDel:function(){var e=this.avertId.join(",");this.advertDel(e)},UploadImgSucess:function(e,a,t){this.editForm.ba_image=e.url},changeType:function(e){4==e?(this.editForm.ba_url="",this.editForm.ba_admaster_type="",this.editForm.ba_expousre_address="",this.editFormRules.ba_url=[],this.editFormRules.ba_admaster_type=[],this.editFormRules.ba_expousre_address=[],this.editFormRules.ba_params=[{required:!0,message:"请选择活动id"}]):5==e&&(this.editForm.ba_params="",this.editFormRules.ba_params=[],this.editFormRules.ba_url=[{required:!0,message:"请填写跳转URL"}],this.editFormRules.ba_admaster_type=[{required:!0,message:"请选择广告类型"}])},changeAdmasterType:function(e){0==e?(this.editFormRules.ba_expousre_address=[],this.editForm.ba_expousre_address=""):this.editFormRules.ba_expousre_address=[{required:!0,message:"请输入输入曝光地址",trigger:"blur"}]},advertCurrentChange:function(e){this.pageNum=e,this.getAvertList()},showPreview:function(e){function a(){i.$preview.open(e,r)}var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.imgList,r=[],s=0,i=this;t.map(function(e,i){var o=new Image;o.src=e,o.onload=function(){s++,r.push({src:e,w:o.width,h:o.height}),s===t.length&&a()},o.onerror=function(){s++,r.splice(i,0,{src:"/static/images/default1.jpg",w:100,h:100}),s===t.length&&a()}})},uploadSuccess:function(e){this.editForm.ba_image=this.domain+e,console.log(e)},sizeError:function(e){this.$alert(e,"提示",{confirmButtonText:"确定"}).catch(function(){})}}}}});
//# sourceMappingURL=6.dffcabcae01b980b7de8.js.map