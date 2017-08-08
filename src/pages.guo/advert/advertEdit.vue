<template>
    <div class="advert-edit-container">

        <el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm">
            <el-form-item label="名称" prop="ba_name">
                <el-input v-model="editForm.ba_name"></el-input>
            </el-form-item>
            <el-form-item prop="ba_image">

                <img v-show="editForm.ba_image" :src="editForm.ba_image" alt="" width="200">
                <img-uploader btnText="点击上传广告URL(图片/Falsh)" :token="uptoken" :qnImgUrl="domain" @onSuccess="uploadSuccess" @onSizeError="sizeError"></img-uploader>

                <!--<span class="tip">请上传尺寸为750px*420px的轮播图</span>-->
            </el-form-item>
            <el-form-item label="排序" prop="ba_sort">
                <el-input v-model="editForm.ba_sort"></el-input>
            </el-form-item>
            <el-form-item label="业务类型" prop="ba_business">
                <el-select v-model="editForm.ba_business" placeholder="请选择业务类型" @change="changeType(editForm.ba_business)">
                    <el-option v-for="item in baBusiness" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告类型" prop="ba_admaster_type" v-show="editForm.ba_business==5">
                <!--<el-select v-model="editForm.ba_admaster_type" placeholder="请选择广告类型">
                    <el-option v-for="item in admasterType" :label="item.name" :value="item.value"></el-option>
                </el-select>-->
                <el-radio-group v-model="editForm.ba_admaster_type" @change="changeAdmasterType(editForm.ba_admaster_type)">
                    <el-radio :label="0">正常</el-radio>
                    <el-radio :label="1">秒针</el-radio>
                    <el-radio :label="2">AdMaster</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="曝光地址" prop="ba_expousre_address" v-show="!editForm.ba_admaster_type==0&&editForm.ba_business==5">
                <el-input v-model="editForm.ba_expousre_address"></el-input>
            </el-form-item>
            <!--<el-form-item label="业务标识" prop="ba_type">
                    <el-select v-model="editForm.ba_type" placeholder="请选择业务标识">
                        <el-option v-for="item in baType" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>-->
            <el-form-item label="跳转URL" prop="ba_url" id="ba_url" v-show="editForm.ba_business==5">
                <el-input v-model="editForm.ba_url"></el-input>
            </el-form-item>
            <el-form-item label="活动ID" prop="ba_params" id="ba_params" v-show="editForm.ba_business==4">
                <el-select v-model="editForm.ba_params" placeholder="请选择活动id">
                    <el-option v-for="item in activityIdList" :label="item.actiTitle" :value="item.actiId"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="作者" prop="user_id">
                    <el-select v-model="editForm.user_id" placeholder="请选择作者">
                        <el-option :label="item.ename" :value="item.eid" v-for="item in editerList"></el-option>
                    </el-select>
                </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary " @click="editSumbit">确 定</el-button>
        </div>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    import ImgUploader from 'COMPONENTS/ImgUploader'
    export default {
        name: 'advert',
        data() {
            return {
                uptoken: '',
                domain: '',
                activityIdList: [],
                admasterType: [
                    { value: 0, name: '正常' },
                    { value: 1, name: '秒针' },
                ],
                baBusiness: [
                    // { value: 1, name: '资讯' },
                    // { value: 2, name: '视频' },
                    // { value: 3, name: '活动选手' },
                    { value: 4, name: '活动' },
                    { value: 5, name: '外链' }
                ],
                baType: [
                    { value: 1, name: '对应资讯id' },
                    { value: 2, name: '对应vode_id' },
                    { value: 3, name: '对应play_id' },
                    { value: 4, name: '活动ID' },
                ],
                uploadUrl: ApiService.getUploadUrl(),
                editForm: {
                    ba_id: '',
                    ba_name: '',
                    ba_image: '',
                    ba_sort: '',
                    ba_business: '',
                    ba_url: '',
                    ba_params: '',
                    ba_admaster_type: '',
                    ba_expousre_address: ''
                },
                editFormRules: {
                    ba_name: [
                        { required: true, message: '请输入广告banner名称', trigger: 'blur' }
                    ],
                    ba_image: [
                        { required: true, message: '请上传广告URL(图片/Falsh)' }
                    ],
                    ba_admaster_type: [
                        { required: true, message: '请选择广告类型' }
                    ],
                    ba_business: [
                        { required: true, message: '请选择业务类型' }
                    ],
                    ba_url: [
                        { required: true, message: '请填写跳转URL' }
                    ],
                    ba_expousre_address: [
                        { required: true, message: '请填写跳转曝光地址' }
                    ],
                    ba_params: [
                        { required: true, message: '请选择活动id' }
                    ],

                }


            }
        },
        components: {
            'img-uploader': ImgUploader
        },
        mounted: function () {
            this.getEditerList();
            this.getActivityId();
            var id;
            id = this.editForm.ba_id = this.$route.params['advertId'];
            if (id) {
                this.advertEdit(id);
            } else {
                this.editForm.ba_id = '';

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
            advertEdit: function (id) {
                ApiService.get({
                    'ext': 'banners/read',
                    'ba_id': id
                }).then((res) => {
                    this.editForm = {
                        ba_id: res.data.data.baId,
                        ba_name: res.data.data.baName,
                        ba_image: res.data.data.baImage,
                        ba_sort: res.data.data.baSort,
                        ba_business: res.data.data.baBusiness,
                        ba_url: res.data.data.baUrl,
                        ba_params: +res.data.data.baParams,
                        ba_admaster_type: res.data.data.baAdmasterType,
                        ba_expousre_address: res.data.data.baExpousreAddress,
                    }
                    this.changeType(res.data.data.baParams);
                    this.changeAdmasterType(res.data.data.baAdmasterType);
                })
            },
            getActivityId: function () {
                ApiService.get({
                    'ext': 'activity/readList',
                }).then(res => {
                    this.activityIdList = res.data.data;
                })
            },
            getEditerList: function () {
                ApiService.get({
                    'ext': 'editor/readList'
                }).then(res => {
                    this.editerList = res.data.data;
                })
            },

            editSumbit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        if (this.editForm.ba_id == '') {
                            ApiService.post({
                                'ext': 'banners/add',
                                'ba_name': this.editForm.ba_name,
                                'ba_image': this.editForm.ba_image,
                                'ba_sort': this.editForm.ba_sort,
                                'ba_admaster_type': this.editForm.ba_admaster_type,
                                'ba_expousre_address': this.editForm.ba_expousre_address,
                                'ba_business': this.editForm.ba_business,
                                'ba_url': this.editForm.ba_url,
                                'ba_params': this.editForm.ba_params,
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '成功',
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.$router.push({ path: `/advert` });
                                } else {
                                    this.$notify({
                                        title: '失败',
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }

                            })
                        } else {
                            ApiService.put({
                                'ext': 'banners/edit',
                                'ba_id': this.editForm.ba_id,
                                'ba_name': this.editForm.ba_name,
                                'ba_image': this.editForm.ba_image,
                                'ba_sort': this.editForm.ba_sort,
                                'ba_admaster_type': this.editForm.ba_admaster_type,
                                'ba_expousre_address': this.editForm.ba_expousre_address,
                                'ba_business': this.editForm.ba_business,
                                'ba_url': this.editForm.ba_url,
                                'ba_params': this.editForm.ba_params,
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '成功',
                                        message: '操作成功',
                                        type: 'success'
                                    });
                                    this.$router.push({ path: `/advert` });
                                } else {
                                    this.$notify({
                                        title: '失败',
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }

                            })

                        }
                    } else {
                        this.$alert('信息填写不完整!', '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                        return false;
                    }
                })
            },
            advertDel: function (ids) {
                console.log(ids);
                this.$confirm('您确定要删除广告banner?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'banners/delete',
                        'ids': ids
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        });
                        this.listLoading = true;
                        this.getAvertList();
                    })
                }).catch(() => { })

            },
            batchSelect: function (checkList) {
                this.avertId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.avertId.push(checkList[i].baId)
                }
            },
            batchDel: function () {
                var ids = this.avertId.join(',');
                this.advertDel(ids);
            },
            UploadImgSucess: function (response, file, fileList) {
                this.editForm.ba_image = response.url;
            },
            changeType: function (type) {
                if (type == 4) {
                    this.editForm.ba_url = '';
                    this.editForm.ba_admaster_type='';
                    this.editForm.ba_expousre_address = '';
                    this.editFormRules.ba_url = [];
                    this.editFormRules.ba_admaster_type = [];
                    this.editFormRules.ba_expousre_address = [];
                    this.editFormRules.ba_params = [{ required: true, message: '请选择活动id' }]

                } else if (type == 5) {
                    this.editForm.ba_params = '';
                    this.editFormRules.ba_params = [];
                    this.editFormRules.ba_url = [{ required: true, message: '请填写跳转URL' }];
                    this.editFormRules.ba_admaster_type = [{ required: true, message: '请选择广告类型' }];
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
            advertCurrentChange: function (val) {
                this.pageNum = val;
                this.getAvertList();
            },
            showPreview(index, imgList = this.imgList) {//缩略图预览
                // 获取尺寸
                var _dealList = [];
                var _loadedCount = 0;
                var self = this;

                imgList.map((item, index) => {
                    var _img = new Image();
                    _img.src = item;
                    _img.onload = function () {
                        _loadedCount++;
                        _dealList.push({
                            src: item,
                            w: _img.width,
                            h: _img.height
                        })
                        if (_loadedCount === imgList.length) {
                            _configPreview();
                        }
                    }
                    _img.onerror = function () {
                        _loadedCount++;
                        _dealList.splice(index, 0, {
                            src: '/static/images/default1.jpg',
                            w: 100,
                            h: 100
                        })
                        if (_loadedCount === imgList.length) {
                            _configPreview();
                        }
                    }
                })

                function _configPreview() {
                    self.$preview.open(index, _dealList)
                }
            },
            uploadSuccess: function (data) {
                this.editForm.ba_image = this.domain + data;
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
<!--<style lang="scss" src="./advert.scss" scoped></style>-->
<style lang="scss" src="./advert.scss" scoped></style>