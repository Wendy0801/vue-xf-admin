<template>
    <div class="banner-edit-container">
        <el-form :model="editForm" label-width="125px" :rules="editFormRules" ref="editForm">
            <el-form-item label="名称" prop="title">
                <el-input v-model="editForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="轮播类型" prop="busi_type">
                <el-select v-model="editForm.busi_type" placeholder="请选择轮播类型" @change="changeType(editForm.busi_type)">
                    <el-option v-for="item in busiType" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告类型" prop="ba_admaster_type" v-show="editForm.busi_type==1">
                <el-radio-group v-model="editForm.ba_admaster_type" @change="changeAdmasterType(editForm.ba_admaster_type)">
                    <el-radio :label="0">正常</el-radio>
                    <el-radio :label="1">秒针</el-radio>
                    <el-radio :label="2">AdMaster</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="曝光地址" prop="ba_expousre_address" v-show="editForm.busi_type==1 && !editForm.ba_admaster_type==0">
                <el-input v-model="editForm.ba_expousre_address"></el-input>
            </el-form-item>
            <el-form-item label="url" prop="url" id="url" v-show="editForm.busi_type==1">
                <el-input v-model="editForm.url" auto-complete="off" @change="preview"></el-input>
                <span class="tip">请务必复制正确的资讯id,否则可能出现报错异常,地址如下:</span><br/>
                <el-button type="text" @click="loadNews">1.资讯管理-资讯管理列表中</el-button>
            </el-form-item>


            <el-form-item label="选手ID" prop="busi_type_id" id="userid" v-show="editForm.busi_type==2">
                <el-input v-model="editForm.busi_type_id" auto-complete="off"></el-input>
                <span class="tip">请务必复制正确的选手ID,否则可能出现报错异常,地址如下:</span><br/>
                <el-button type="text" @click="loadSignUser">1.活动管理-第二季选秀管理-报名用户</el-button>
                </br/>
                <el-button type="text" @click="loadUser">2.系统后台-用户账号管理</el-button>
            </el-form-item>
            <el-form-item label="活动ID" prop="busi_type_id" id="activeid" v-show="editForm.busi_type==3">
                <el-input v-model="editForm.busi_type_id" auto-complete="off"></el-input>
                <span class="tip">请务必复制正确的活动ID,否则可能出现报错异常,地址如下:</span>
                </br/>
                <el-button type="text" @click="loadActivity">活动管理-活动管理列表中</el-button>
            </el-form-item>
            <el-form-item prop="imageUrl">
                <img v-show="editForm.imageUrl" :src="editForm.imageUrl" alt="">
                <img-uploader btnText="上传图片" :token="uptoken" :qnImgUrl="domain" :limit="limitData" @onSuccess="uploadSuccess" @onSizeError="sizeError"></img-uploader>
                <span class="tip">请上传尺寸为750px*420px的轮播图</span>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editSubmit">{{btnEditText}}</el-button>
        </div>
    </div>

</template>
<script>
    import ApiService from 'SERVICES/api.service'
    import ImgUploader from 'COMPONENTS/ImgUploader'
    export default {
        data() {
            return {
                uptoken: '',
                domain: '',
                limitData: {
                    width: 750,
                    height: 420
                },
                busiType: [
                    { name: '外链[资讯/通知/默认]', value: 1 },
                    { name: '选手主页', value: 2 },
                    { name: '活动主页', value: 3 }
                ],
                // admasterType: [
                //     { value: 0, name: '正常' },
                //     { value: 1, name: '秒针' },
                // ],
                //编辑界面数据
                editForm: {
                    id: '',
                    title: this.$store.state.bannerTitle,
                    busi_type: this.$store.state.bannerType,
                    ba_admaster_type: this.$store.state.bannerAdmasterType,
                    ba_expousre_address: this.$store.state.bannerExpousreAddress,
                    url: '',
                    // params: '',
                    // previewUrl: '',
                    busi_type_id: '',
                    imageUrl: '',
                },
                btnEditText: '提 交',
                editFormRules: {
                    title: [
                        { required: true, message: '请输入轮播图标题', trigger: 'blur' },
                    ],
                    busi_type: [
                        { required: true, message: '请输入选择轮播类型' },
                    ],
                    ba_admaster_type: [
                        { required: true, message: '请输入选择广告类型' },
                    ],
                    url: [
                        { required: true, message: '请输入输入url', trigger: 'blur' },
                    ],
                    ba_expousre_address: [
                        { required: true, message: '请输入输入曝光地址', trigger: 'blur' },
                    ],
                    busi_type_id: [
                        { required: true, message: '请输入非外链设置ID', trigger: 'blur' },
                    ],
                    imageUrl: [
                        { required: true, message: '请输入上传轮播图' },
                    ]
                },



            }
        },
        components: {
            'img-uploader': ImgUploader
        },
        mounted: function () {
            var id;
            id = this.editForm.id = this.$route.params['bannerId'];
            if (id) {
                this.bannerEdit(id);
            } else {
                this.editForm.id = '';
                this.changeType(this.$store.state.bannerType);
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
            saveValue: function () {
                this.$store.commit('SETBANNERTITLE', this.editForm.title);
                this.$store.commit('SETBANNERTYPE', this.editForm.busi_type);
                this.$store.commit('SETBANNERADMASTERTYPE', this.editForm.ba_admaster_type);
                this.$store.commit('SETBANNEREXPOUSREADDRESS', this.editForm.ba_expousre_address);
            },
            bannerEdit: function (id) {
                ApiService.get({
                    'ext': 'homepage/carouse/read',
                    'id': id
                }).then(res => {
                    this.editForm.id = res.data.data.caroId;
                    this.editForm.title = res.data.data.caroDesc;
                    this.editForm.busi_type = res.data.data.caroType;
                    this.editForm.ba_admaster_type = res.data.data.baAdmasterType
                    this.editForm.ba_expousre_address = res.data.data.baExpousreAddress
                    if (res.data.data.caroUrl) {
                        this.editForm.url = res.data.data.caroUrl
                    } else {
                        this.editForm.url = '';
                    }
                    this.editForm.busi_type_id = res.data.data.caroTypeId;
                    this.editForm.imageUrl = res.data.data.caroCover;
                    this.changeType(res.data.data.caroType);
                    this.changeAdmasterType(res.data.data.baAdmasterType);
                })
            },
            changeType: function (type) {

                if (type == 1) {
                    this.editFormRules.busi_type_id = [];
                    this.editFormRules.url = [{ required: true, message: '请输入输入url', trigger: 'blur' },];
                    this.editFormRules.ba_admaster_type = [{ required: true, message: '请输入选择广告类型' },];
                    this.editFormRules.busi_type_id = '';

                } else if (type == 2) {
                    this.editFormRules.url = [];
                    this.editFormRules.ba_admaster_type = [];
                    this.editFormRules.ba_expousre_address = [];
                    this.editFormRules.busi_type_id = [{ required: true, message: '请输入非外链设置ID', trigger: 'blur' },];
                    this.editForm = {
                        id: this.editForm.id,
                        title: this.editForm.title,
                        busi_type: this.editForm.busi_type,
                        ba_admaster_type: '',
                        ba_expousre_address: '',
                        url: '',
                        busi_type_id: this.editForm.busi_type_id,
                        imageUrl: this.editForm.imageUrl,
                    };

                } else if (type == 3) {
                    this.editFormRules.url = [];
                    this.editFormRules.ba_admaster_type = [];
                    this.editFormRules.ba_expousre_address = [];
                    this.editFormRules.busi_type_id = [{ required: true, message: '请输入非外链设置ID', trigger: 'blur' },];
                    this.editForm = {
                        id: this.editForm.id,
                        title: this.editForm.title,
                        busi_type: this.editForm.busi_type,
                        ba_admaster_type: '',
                        ba_expousre_address: '',
                        url: '',
                        busi_type_id: this.editForm.busi_type_id,
                        imageUrl: this.editForm.imageUrl,
                    };
                }


            },
            changeAdmasterType: function (type) {
                if (type == 0) {
                    this.editFormRules.ba_expousre_address = [];
                    this.editForm.ba_expousre_address = '';
                } else {
                    this.editFormRules.ba_expousre_address = [{ required: true, message: '请输入输入曝光地址', trigger: 'blur' },];
                }
            },
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        if (this.editForm.id == '') {
                            ApiService.post({
                                'ext': 'homepage/carouse/add',
                                'title': this.editForm.title,
                                'busi_type': this.editForm.busi_type,
                                'ba_admaster_type': this.editForm.ba_admaster_type,
                                'ba_expousre_address': this.editForm.ba_expousre_address,
                                'url': this.editForm.url,
                                // 'params': this.editForm.params,
                                'busi_type_id': this.editForm.busi_type_id,
                                'imageUrl': this.editForm.imageUrl,
                            })
                                .then(res => {
                                    this.editFormVisible = false;
                                    this.listLoading = true;
                                    this.$notify({
                                        title: '成功',
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$router.push({ path: `/bannerList` });
                                })
                        } else {
                            ApiService.post({
                                'ext': 'homepage/carouse/edit',
                                'id': this.editForm.id,
                                'title': this.editForm.title,
                                'busi_type': this.editForm.busi_type,
                                'ba_admaster_type': this.editForm.ba_admaster_type,
                                'ba_expousre_address': this.editForm.ba_expousre_address,
                                'url': this.editForm.url,
                                // 'params': this.editForm.params,
                                'busi_type_id': this.editForm.busi_type_id,
                                'imageUrl': this.editForm.imageUrl,
                            })
                                .then(res => {
                                    this.editFormVisible = false;
                                    this.listLoading = true;

                                    this.$notify({
                                        title: '成功',
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$router.push({ path: `/bannerList` });
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
            loadSignUser: function () {
                this.saveValue();
                this.$router.push({ path: `/signUpList` });
            },
            loadUser: function () {
                this.saveValue();
                this.$router.push({ path: `/user-list` });
            },
            loadActivity: function () {
                this.saveValue();
                this.$router.push({ path: `/activityList` });
            },
            loadNews: function () {
                this.saveValue();
                this.$router.push({ path: `/newsList` });
            },
            preview: function () {
                // this.editForm.previewUrl = this.editForm.url + this.editForm.params;
            },
            uploadSuccess: function (data) {
                this.editForm.imageUrl = this.domain + data;
                console.log(data);
            },
            sizeError: function (data) {
                this.$alert(data, '提示', {
                    confirmButtonText: '确定'
                }).catch(() => { })
            }
        }
    }

</script>
<style>
    .banner-edit-container {
        padding: 50px 12px;
    }
    
    .dialog-footer {
        float: right;
    }
    
    .el-form-item img {
        width: 200px;
    }
    
    .el-form-item .tip {
        color: #999;
    }
</style>