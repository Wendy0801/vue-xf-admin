<template>
    <div class="news-edit-container">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
            <el-form-item label="文章标题" prop="info_title">
                <el-input v-model="editForm.info_title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="info_type">

                <el-select v-model="editForm.info_type" placeholder="请选择文章分类" @change="typeChange">
                    <el-option :label="item.icName" :value="item.icId" v-for="item of categoryList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="info_type2">
                <el-select v-model="editForm.info_type2" placeholder="请选择文章二级分类">
                    <el-option :label="item.icName" :value="item.icId" v-for="item in secondCategoryList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标签" prop="info_lable">
                <el-select v-model="editForm.info_lable" placeholder="请选择文章标签">
                    <!--<el-option v-for="label im labelList" label="区域一" value="shanghai"></el-option>-->
                    <el-option :label="item.name" :value="item.name" v-for="item of labelList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="info_cover2" id="infoCover2">

                <img v-show="editForm.info_cover2" :src="editForm.info_cover2" alt="" width="200">
                <img-uploader btnText="上传资讯封面" :token="uptoken" :qnImgUrl="domain" :limit="limitData2" @onSuccess="uploadSuccess2" @onSizeError="sizeError2"></img-uploader>

                <span class="tip">请上传尺寸为686px*1048px的资讯封面</span>
            </el-form-item>
            <el-form-item prop="info_cover">

                <img v-show="editForm.info_cover" :src="editForm.info_cover" alt="" width="200">
                <img-uploader btnText="上传主页资讯封面" :token="uptoken" :qnImgUrl="domain" :limit="limitData1" @onSuccess="uploadSuccess1" @onSizeError="sizeError1"></img-uploader>

                <span class="tip">请上传尺寸为686px*420px的主页资讯封面</span>
            </el-form-item>
            <el-form-item label="作者" prop="user_id">
                <el-select v-model="editForm.user_id" placeholder="请选择作者">
                    <el-option :label="item.ename" :value="item.eid" v-for="item in editerList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="外部URL" prop="external_url">
                <el-input v-model="editForm.external_url" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
                <el-switch on-text="" off-text="" v-model="editForm.ih_display"></el-switch>
            </el-form-item>
            <el-form-item label="资讯描述" prop="info_desc">
                <el-input type="textarea" :rows="2" placeholder="请输入资讯描述" v-model="editForm.info_desc" :maxlength="64">
                </el-input>
            </el-form-item>
            <el-form-item label="内容编辑" prop="info_content">

                <text-editor ref="informationEditor" editorId="information-editor" :token="uptoken" :qnImgUrl="domain" :editorText="editForm.info_content"></text-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="previewContent">内容预览</el-button>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editSubmit">{{btnEditText}}</el-button>
        </div>
        <!--预览内容-->
        <el-dialog title="预览" v-model="dialogVisible" size="small" @close="previewCancel">

            <div class="preview">
                <div class="frame-item" v-html="contentHtml"></div>
            </div>

        </el-dialog>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    import TextEditor from 'COMPONENTS/TextEditor'
    import ImgUploader from 'COMPONENTS/ImgUploader'
    export default {
        name: 'news',
        data() {
            return {
                uptoken: '',
                domain: '',
                contentHtml: '',
                limitData1: {
                    width: 686,
                    height: 420
                },
                limitData2: {
                    width: 686,
                    height: 1048
                },
                labelList: [],
                editerList: [],
                categoryList: [],
                secondCategoryList: [],
                myEditor: {},
                uploadUrl: ApiService.getUploadUrl(),
                btnEditText: '确定',
                editForm: {
                    'info_id': '',
                    'info_title': '',
                    'info_type': '',
                    'info_type2': '',
                    'info_type_name': '',
                    'info_lable': '',
                    'info_cover': '',
                    'info_cover2': '',
                    'user_id': '',
                    // 'create_name': '',
                    // 'create_portrait': '',
                    'external_url': '',
                    'ih_display': true,
                    'info_desc': '',
                    'info_content': ''
                },
                editFormRules: {
                    info_title: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' }
                    ],
                    info_type: [
                        { required: true, message: '请选择文章分类' }],
                    info_type2: [
                        { required: true, message: '请选择文章二级分类' }],
                    info_lable: [
                        { required: true, message: '请选择文章标签' }
                    ],
                    info_cover: [
                        { required: true, message: '请上传主页封面' }
                    ],
                    info_cover2: [
                        // { required: true, message: '请上传资讯封面' }
                    ],
                    user_id: [
                        { required: true, message: '请选择作者' }],
                    external_url: [
                        // { required: true, message: '请输入外部url', trigger: 'blur' }
                    ],
                    info_desc: [
                        { required: true, message: '请输入资讯描述' }
                    ],
                    info_content: [
                        { required: true, message: '请输入文章内容' }
                    ]
                },
                dialogVisible: false

            }
        },
        components: {
            'text-editor': TextEditor,
            'img-uploader': ImgUploader
        },
        mounted: function () {
            var id;
            id = this.editForm.info_id = this.$route.params['newsId'];
            this.newsEdit(id)

            this.getLabelList();
            this.getEditerList();
            this.getCategory();
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
            getLabelList: function () {
                ApiService.get({
                    'ext': 'information/lable/readList'
                }).then(res => {
                    this.labelList = res.data.data;
                })
            },
            getEditerList: function () {
                ApiService.get({
                    'ext': 'editor/readList'
                }).then(res => {
                    this.editerList = res.data.data;
                })
            },
            getCategory: function () {
                ApiService.get({
                    'ext': 'information/category/readList',
                    'ic_pid': 0
                }).then(res => {
                    if (res.data.code == 1) {
                        this.categoryList = res.data.data;
                    }
                })
            },
            newsEdit: function (id) {
                ApiService.get({
                    'ext': 'information/manage/readExternalUrl',
                    'id': id
                }).then(res => {
                    if (res.data.code == 1) {
                        this.editForm = {
                            info_id: res.data.data.infoId,
                            info_title: res.data.data.infoTitle,
                            info_type: res.data.data.infoType == 1 ? '娱乐' : '时尚',
                            info_type2: res.data.data.infoType2,
                            info_lable: res.data.data.infoLableName,
                            info_cover: res.data.data.infoCover,
                            info_cover2: res.data.data.infoCover2,
                            user_id: res.data.data.userId,
                            //create_name : res.createName,
                            //create_portrait :res.createPortrait,
                            external_url: res.data.data.externalUrl,
                            ih_display: res.data.data.ihDisplay === 0 ? false : true,
                            info_desc: res.data.data.infoDesc,
                            info_content: res.data.data.infoContent
                        }
                        this.typeChange(res.data.data.infoType);
                    } else {
                        this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                    }

                })

            },
            editSubmit: function () {
                this.editForm.info_content = this.$refs.informationEditor.getText();
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        ApiService.post({
                            'ext': 'information/manage/edit',
                            'info_id': this.editForm.info_id,
                            'info_title': this.editForm.info_title,
                            'info_type': isNaN(this.editForm.info_type) ? (this.editForm.info_type == '娱乐' ? 1 : 2) : this.editForm.info_type,
                            'info_type2':this.editForm.info_type2, 
                            'info_lable': this.editForm.info_lable,
                            'info_cover': this.editForm.info_cover,
                            'info_cover2': this.editForm.info_cover2,
                            'user_id': this.editForm.user_id,
                            // 'create_name': this.editForm.create_name,
                            // 'create_portrait': this.editForm.create_portrait,
                            'external_url': this.editForm.external_url,
                            'ih_display': this.editForm.ih_display ? 1 : 0,
                            'info_desc': this.editForm.info_desc,
                            'info_content': this.$refs.informationEditor.getContent()
                        }).then(res => {
                            this.editFormVisible = false;
                            this.listLoading = true;
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$router.push({ path: `/newsList` });
                        })


                    } else {
                        this.$alert('信息填写不完整!', '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                        return false;
                    }
                });


            },
            typeChange: function (value) {
                var typeValue;
                if (value == 1 || value == '娱乐') {
                    document.getElementById('infoCover2').style.display = 'none';
                    this.editFormRules.info_cover2 = [];
                    typeValue = 1;
                } else {
                    document.getElementById('infoCover2').style.display = 'block';
                    this.editFormRules.info_cover2 = [{ required: true, message: '请上传资讯封面' }];
                    typeValue = 2;
                }
                // this.editForm.info_type2 = '',
                this.getSecondType(typeValue);
            },
            getSecondType: function (value) {
                ApiService.get({
                    'ext': 'information/category/readList',
                    'ic_pid': value
                }).then(res => {
                    if (res.data.code == 1) {
                        this.secondCategoryList = res.data.data;
                    }
                }).catch(()=>{})
            },
            previewContent: function () {
                this.dialogVisible = true;
                this.contentHtml = this.$refs.informationEditor.getContent();

            },
            previewCancel: function () {
                this.dialogVisible = false;
                this.contentHtml = '';
            },
            uploadSuccess1: function (data) {
                this.editForm.info_cover = this.domain + data;
                console.log(data);
            },
            sizeError1: function (data) {
                this.$alert(data, '提示', {
                    confirmButtonText: '确定'
                }).catch(() => { })
            },
            uploadSuccess2: function (data) {
                this.editForm.info_cover2 = this.domain + data;
                console.log(data);
            },
            sizeError2: function (data) {
                this.$alert(data, '提示', {
                    confirmButtonText: '确定'
                }).catch(() => { })
            }

        }
    }

</script>

<style lang="scss" src="./newsList.scss" scoped></style>