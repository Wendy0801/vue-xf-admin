<template>
    <div class="activity-container">
        <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
            <el-form-item label="活动名称" prop="acti_name">
                <el-input v-model="editForm.acti_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动标题" prop="acti_title">
                <el-input v-model="editForm.acti_title" auto-complete="off" :maxlength="28"></el-input>
            </el-form-item>
            <el-form-item label="活动标签" prop="acti_label">
                <el-input v-model="editForm.acti_label" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动排序" prop="acti_sort">
                <el-input v-model="editForm.acti_sort" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
                <el-switch on-text="" off-text="" v-model="editForm.acti_display"></el-switch>
            </el-form-item>
            <el-form-item label="活动分类" prop="acti_category">
                <el-select v-model="editForm.acti_category">
                    <el-option v-for="item in activityCategory" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动类型" prop="acti_type">
                <el-select v-model="editForm.acti_type" placeholder="请选择活动类型">
                    <el-option label="选秀活动" value="1"></el-option>
                    <el-option label="节日活动" value="2"></el-option>
                    <el-option label="其他活动" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动状态" prop="acti_status">
                <el-select v-model="editForm.acti_status" placeholder="请选择活动状态">
                    <el-option label="进行中" value="0"></el-option>
                    <el-option label="已结束" value="1"></el-option>
                    <el-option label="已删除" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="打开类型" prop="open_type">
                <el-select v-model="editForm.open_type" placeholder="请选择打开类型" @change="changeType">
                    <el-option label="原生" value="1"></el-option>
                    <el-option label="H5" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动介绍描述" prop="acti_desc">

                <text-editor ref="activityEditor" editorId="activityDesc" :token="uptoken" :qnImgUrl='domain' :editorText="editForm.acti_desc"></text-editor>

                <el-button type="primary" class="previewContent" @click="previewContent('acti_desc')">活动介绍描述预览</el-button>
            </el-form-item>
            <div id="type-html-5">

                <el-form-item label="活动规则" prop="acti_explain">

                    <el-input type="textarea" :rows="10" placeholder="请输入活动规则" v-model="editForm.acti_explain">
                    </el-input>
                    <el-button type="primary" class="previewContent" @click="previewContent('acti_explain')">活动规则预览</el-button>
                </el-form-item>
                <el-form-item label="用户报名说明" prop="acti_user_explain">

                    <el-input type="textarea" :rows="10" placeholder="请输入用户报名说明" v-model="editForm.acti_user_explain">
                    </el-input>
                    <el-button type="primary" class="previewContent" @click="previewContent('acti_user_explain')">用户报名说明预览</el-button>
                </el-form-item>
                <el-form-item label="上传视频说明" prop="acti_video_desc">

                    <el-input type="textarea" :rows="10" placeholder="请输入上传视频说明" v-model="editForm.acti_video_desc">
                    </el-input>
                    <el-button type="primary" class="previewContent" @click="previewContent('acti_video_desc')">上传视频说明预览</el-button>
                </el-form-item>
                <el-form-item label="活动开始时间" prop="begin_time">
                    <el-date-picker v-model="editForm.begin_time" type="datetime" placeholder="选择开始时间" format="yyyy-MM-dd  HH:mm:ss" @change="startDateFormat"></el-date-picker>
                </el-form-item>
                <el-form-item label="活动结束时间" prop="end_time">
                    <el-date-picker v-model="editForm.end_time" type="datetime" placeholder="选择结束时间" format="yyyy-MM-dd  HH:mm:ss" @change="endDateFormat"></el-date-picker>
                </el-form-item>
            </div>

            <el-form-item label="H5 URL" prop="acti_url" id="actiUrl">
                <el-input v-model="editForm.acti_url" auto-complete="off" @change="preview"></el-input>
            </el-form-item>
            <el-form-item label="参数" prop="acti_params" id="actiParams">
                <el-input v-model="editForm.acti_params" auto-complete="off" @change="preview">></el-input>
            </el-form-item>
            <el-form-item label="活动链接" id="url">
                <el-input v-model="editForm.url" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-model="editForm.acti_cover" prop="acti_cover">
                <img v-show="editForm.acti_cover" :src="editForm.acti_cover" alt="" width="200">
                <img-uploader btnText="点击上传活动列表页活动入口图" :token="uptoken" :qnImgUrl='domain' :limit="limitData" @onSuccess="uploadSuccess"
                    @onSizeError="sizeError"></img-uploader>

                    <span class="tip">请上传尺寸为750px*560px的活动列表页活动入口图</span>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :rows="2" placeholder="请输入remark" v-model="editForm.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editSubmit">{{btnEditText}}</el-button>
        </div>
        <!--预览-->
        <el-dialog title="预览" v-model="dialogVisible" size="small" @close="previewCancel">

            <div class="preview">
                <div class="frame-item" id="frame-item" v-html="contentHtml"></div>
            </div>

        </el-dialog>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    import TextEditor from 'COMPONENTS/TextEditor'
    import ImgUploader from 'COMPONENTS/ImgUploader'
    export default {
        name: 'activity',
        data() {
            return {
                uptoken: '',
                domain: '',
                contentHtml: '',
                limitData: {
                    width: 750,
                    height: 560
                },
                activityCategory: [
                    { value: 1, name: '视频' },
                    { value: 2, name: '相册' },
                    { value: 3, name: '视频+相册' }
                ],
                dialogVisible: false,
                //编辑界面数据
                editForm: {
                    acti_id: '',
                    acti_name: '',
                    acti_title: '',
                    acti_label: '',
                    acti_category: '',
                    acti_display: true,
                    acti_url: '',
                    acti_params: '',
                    url: '',
                    acti_cover: '',
                    acti_desc: '',
                    acti_explain: '',
                    acti_user_explain: '',
                    acti_video_desc: '',
                    acti_type: '',
                    acti_status: '',
                    acti_sort: '',
                    open_type: '',
                    begin_time: '',
                    end_time: '',
                    remark: ''
                },
                btnEditText: '提 交',
                editFormRules: {
                    acti_name: [
                        { required: true, message: '请填写活动名称', trigger: 'blur' }
                    ],
                    acti_title: [
                        { required: true, message: '请填写活动标题', trigger: 'blur' }
                    ],
                    acti_label: [
                        { required: true, message: '请填写活动标签', trigger: 'blur' }
                    ],
                    acti_sort: [
                        { required: true, message: '请填写活动排序' }
                    ],
                    acti_type: [
                        { required: true, message: '请选择活动类型' }
                    ],
                    acti_status: [
                        { required: true, message: '请选择活动状态', trigger: 'change' }
                    ],
                    open_type: [
                        { required: true, message: '请选择活动打开类型', trigger: 'change' }
                    ],
                    acti_desc: [
                        { required: true, message: '请填写活动介绍', trigger: 'blur' }
                    ],
                    acti_explain: [
                        { required: true, message: '请填写活动规则', trigger: 'blur' }
                    ],
                    acti_user_explain: [
                        { required: true, message: '请填写用户报名说明', trigger: 'blur' }
                    ],
                    acti_video_desc: [
                        { required: true, message: '请填写上传视频说明', trigger: 'blur' }
                    ],
                    begin_time: [
                        { required: true, message: '请选择活动开始时间', trigger: 'change' }
                    ],
                    end_time: [
                        { required: true, message: '请选择活动结束时间', trigger: 'change' }
                    ],
                    acti_url: [
                        { required: true, message: '请填写活动url', trigger: 'blur' }
                    ],
                    acti_cover: [
                        { required: true, message: '请上传列表页图片' }
                    ],
                    acti_params: [
                        { required: true, message: '请填写活动参数', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请填写活动备注', trigger: 'blur' }
                    ],
                    acti_category: [
                        { required: true, message: '请选择活动分类' }
                    ],

                }

            }
        },
        components: {
            'text-editor': TextEditor,
            'img-uploader': ImgUploader
        },
        computed: {
        },
        mounted: function () {
            var id;
            id = this.editForm.acti_id = this.$route.params['activityId'];
            if (id) {
                this.activityEdit(id);
            } else {
                this.editForm.acti_id = '';
                // window['UE'].getEditor('activityDesc');
            }
            this.editorUpload();
        },
        methods: {
            editorUpload: function () {
                ApiService.get({
                    'ext': 'common/resource/qiniu/config'
                }).then(res => {
                    this.uptoken = res.body.uptoken;
                    this.domain = res.body.domain;
                })
            },
            activityEdit: function (id) {
                ApiService.get({
                    'ext': 'activity/read',
                    'acti_id': id
                }).then(res => {
                    this.editForm = {
                        acti_id: res.data.data.actiId,
                        acti_name: res.data.data.actiName,
                        acti_title: res.data.data.actiTitle,
                        acti_label: res.data.data.actiLabel,
                        acti_display: res.data.data.actiDisplay == 0 ? true : false,
                        acti_url: res.data.data.actiUrl,
                        acti_params: res.data.data.actiParams,
                        url: res.data.data.actiUrl + res.data.data.actiParams,
                        acti_cover: res.data.data.actiCover,
                        acti_desc: res.data.data.actiDesc,
                        acti_explain: res.data.data.actiExplain,
                        acti_user_explain: res.data.data.actiUserExplain,
                        acti_video_desc: res.data.data.actiVideoDesc,
                        acti_category:res.data.data.actiCategory,
                        acti_type: res.data.data.actiType == 1 ? '选秀活动' : (res.data.data.actiType == 2 ? '节日活动' : '其他活动'),
                        acti_status: res.data.data.actiStatus == 0 ? '进行中' : (res.data.data.actiStatus == 1 ? '已结束' : '已删除'),
                        acti_sort: res.data.data.actiSort,
                        open_type: res.data.data.openType == 1 ? '原生' : 'H5',
                        begin_time: res.data.data.beginTime,
                        end_time: res.data.data.endTime,
                        remark: res.data.data.remark
                    }
                    this.changeType(res.data.data.openType);

                })

            },
            changeType: function (value) {
                console.log(value)
                if (value == 1 || value == "原生") {
                    document.getElementById('type-html-5').style.display = 'block';

                    document.getElementById('actiUrl').style.display = 'none';
                    document.getElementById('actiParams').style.display = 'none';	//这二个都不要了
                    document.getElementById('url').style.display = 'none';			//这二个都不要了
                    this.editForm.acti_url = '';
                    this.editForm.acti_params = '';
                    this.editForm.url = '';
                    this.editFormRules.acti_url = [];
                    this.editFormRules.acti_params = [];
                } else {
                    document.getElementById('actiUrl').style.display = 'block';
                    document.getElementById('actiParams').style.display = 'none';	//这二个都不要了
                    document.getElementById('url').style.display = 'none';			//这二个都不要了

                    /* 隐藏不必须的内容 */
                    document.getElementById('type-html-5').style.display = 'none';

                    this.editFormRules.acti_url = [
                        { required: true, message: '请填写活动url', trigger: 'blur' }
                    ];
					/*
                    this.editFormRules.acti_params = [
                        { required: true, message: '请填写活动参数', trigger: 'blur' }
                    ];
					*/
                    this.editFormRules.acti_desc = [];
                    this.editFormRules.acti_explain = [];
                    this.editFormRules.acti_user_explain = [];
                    this.editFormRules.acti_video_desc = [];
                    this.editFormRules.begin_time = [];
                    this.editFormRules.end_time = [];
                    this.editFormRules.acti_params = [];
                }
            },
            editSubmit() {
                this.editForm.acti_desc = this.$refs.activityEditor.getText();
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        if (this.editForm.acti_id == "") {
                            ApiService.post({
                                'ext': 'activity/add',
                                'acti_name': this.editForm.acti_name,
                                'acti_title': this.editForm.acti_title,
                                'acti_label': this.editForm.acti_label,
                                'acti_display': this.editForm.acti_display ? '0' : '1',
                                'acti_url': this.editForm.acti_url,
                                'acti_params': this.editForm.acti_params,
                                'acti_cover': this.editForm.acti_cover,
                                'acti_desc': this.$refs.activityEditor.getContent(),
                                'acti_explain': this.editForm.acti_explain,
                                'acti_user_explain': this.editForm.acti_user_explain,
                                'acti_video_desc': this.editForm.acti_video_desc,
                                'acti_type': this.editForm.acti_type,
                                'acti_status': this.editForm.acti_status,
                                'acti_sort': this.editForm.acti_sort,
                                'open_type': this.editForm.open_type,
                                'begin_time': this.editForm.begin_time,
                                'end_time': this.editForm.end_time,
                                'remark': this.editForm.remark,
                                'acti_category':this.editForm.acti_category
                            })
                                .then(res => {
                                    if (res.data.code == 1) {
                                        this.$notify({
                                            title: '成功',
                                            message: '提交成功',
                                            type: 'success'
                                        });
                                        this.$router.push({ path: `/activityList` });
                                    } else {
                                        this.$alert(res.data.msg, '提示', {
                                            confirmButtonText: '确定'
                                        }).catch(() => { })
                                        return false;
                                    }
                                })

                        } else {
                            ApiService.put({
                                'ext': 'activity/edit',
                                'acti_id': this.editForm.acti_id,
                                'acti_name': this.editForm.acti_name,
                                'acti_title': this.editForm.acti_title,
                                'acti_label': this.editForm.acti_label,
                                'acti_display': this.editForm.acti_display ? '0' : '1',
                                'acti_url': this.editForm.acti_url,
                                'acti_params': this.editForm.acti_params,
                                'acti_cover': this.editForm.acti_cover,
                                'acti_desc': this.$refs.activityEditor.getContent(),
                                'acti_explain': this.editForm.acti_explain,
                                'acti_user_explain': this.editForm.acti_user_explain,
                                'acti_video_desc': this.editForm.acti_video_desc,
                                'acti_type': isNaN(this.editForm.acti_type) ? (this.editForm.acti_type == '选秀活动' ? 1 : (this.editForm.acti_type == "节日活动" ? 2 : 3)) : this.editForm.acti_type,
                                'acti_status': isNaN(this.editForm.acti_status) ? (this.editForm.acti_status == '进行中' ? 0 : (this.editForm.acti_status == "已结束" ? 1 : 2)) : this.editForm.acti_status,
                                'acti_sort': this.editForm.acti_sort,
                                'open_type': isNaN(this.editForm.open_type) ? (this.editForm.open_type == '原生' ? 1 : 2) : this.editForm.open_type,
                                'begin_time': this.editForm.begin_time,
                                'end_time': this.editForm.end_time,
                                'remark': this.editForm.remark,
                                'acti_category':this.editForm.acti_category
                            })
                                .then(res => {
                                    if (res.data.code == 1) {
                                        this.$notify({
                                            title: '成功',
                                            message: '提交成功',
                                            type: 'success'
                                        });
                                        this.$router.push({ path: `/activityList` });
                                    } else {

                                        this.$alert(res.data.msg, '提示', {
                                            confirmButtonText: '确定'
                                        }).catch(() => { })
                                        return false;

                                    }

                                })

                        }
                    } else {
                        this.$alert('信息填写不完整!', '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                        return false;
                    }
                });


            },

            startDateFormat: function (vm) {
                this.editForm.begin_time = vm;
            },
            endDateFormat: function (vm) {
                this.editForm.end_time = vm;
            },
            preview: function () {
                this.editForm.url = this.editForm.acti_url + this.editForm.acti_params;
            },
            previewContent: function (type) {
                this.dialogVisible = true;

                if (type == 'acti_desc') {
                    this.contentHtml = this.$refs.activityEditor.getContent();
                } else if (type == 'acti_explain') {
                    this.contentHtml = this.editForm.acti_explain;
                } else if (type == 'acti_user_explain') {
                    this.contentHtml = this.editForm.acti_user_explain;
                } else if (type == 'acti_video_desc') {
                    this.contentHtml = this.editForm.acti_video_desc;
                }
            },
            previewCancel: function () {
                this.dialogVisible = false;
                this.contentHtml = '';
            },
            uploadSuccess(data) {
                this.editForm.acti_cover = this.domain + data;
                console.log(data);
            },
            sizeError(data) {
                console.log(this);
                this.$alert(data, '提示', {
                    confirmButtonText: '确定'
                }).catch(() => { })
            }
        }
    }

</script>
<style lang="scss" src="./activity.scss" scoped></style>