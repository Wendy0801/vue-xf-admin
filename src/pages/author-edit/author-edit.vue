<template>
    <div class="author-edit-form">
        <el-form :model="authorForm" :rules="rules" ref="authorForm" label-width="100px" class="demo-authorForm">
            <el-form-item label="作者名称" prop="e_name">
                <el-input v-model="authorForm.e_name"></el-input>
            </el-form-item>
            <!--<el-form-item label="作者类型" prop="e_type">
                <el-select v-model="authorForm.e_type" placeholder="请选择作者">
                    <el-option label="资讯作者" value="1"></el-option>
                    <el-option label="通知作者" value="2"></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="作者头像" prop="e_avatar">
                <template>
                     <div class="user-face" v-if="authorForm.e_avatar">
                        <img v-show="authorForm.e_avatar" :src="authorForm.e_avatar"/>
                    </div>
                    <img-uploader btnText="点击上传图片" :token="uptoken" :qnImgUrl="domain" @onSuccess="uploadSuccess" @onSizeError="sizeError"></img-uploader>

                    <!--<span class="tip">请上传尺寸为750px*420px的轮播图</span>-->
                </template>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('authorForm')">提交</el-button>
                <el-button @click="resetForm('authorForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
    import ImgUploader from 'COMPONENTS/ImgUploader'
    export default {
        data() {
            return {
                uptoken: '',
                domain: '',
                uploadUrl: ApiService.getUploadUrl(),
                authorForm: {
                    'e_name': '',
                    'e_avatar': '',
                    // 'e_type': '1'
                },
                rules: {
                    e_name: [
                        { required: true, message: '请输入通知标题', trigger: 'blur' },
                    ],
                    e_avatar: [
                        { required: true, message: '请上传头像' },
                    ],
                },
            }
        },
        components: {
            'img-uploader': ImgUploader
        },
        mounted() {
            this.editorUpload();
            this.authorId = this.$route.params['authorId'];
            if (this.authorId) {
                this.getPrevAuthorInfo();
            }
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
            getPrevAuthorInfo() {
                ApiService.get({
                    'ext': 'editor/read',
                    'e_id': this.authorId
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.authorForm.e_avatar = res.data.data.eavatar;
                            this.authorForm.e_name = res.data.data.ename;
                            this.authorForm.e_type = `${res.data.data.etype}`;
                        }
                    })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.authorId) {
                            this.editAuthor();
                        }
                        else {
                            this.addAuthor();
                        }
                    } else {
                        this.$alert('信息填写不完整!', '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            uploadImgSucess(response) {
                this.authorForm.e_avatar = response.url;
            },
            addAuthor() {
                let _addData = Object.assign(this.authorForm, {
                    'ext': 'editor/add'
                })
                ApiService.post(_addData)
                    .then(res => {
                        if (res.data.code === 1) {
                            this.$notify({
                                'type': 'success',
                                'message': '添加成功'
                            });
                            this.resetForm('authorForm');
                            this.$router.push({});
                        }
                    })
            },
            editAuthor() {
                let _editData = Object.assign(this.authorForm, {
                    'ext': 'editor/edit',
                    'e_id': this.authorId
                });
                console.log(_editData)
                ApiService.put(_editData)
                    .then(res => {
                        if (res.data.code === 1) {
                            this.$notify({
                                'type': 'success',
                                'message': '修改成功'
                            });
                            this.$router.back();
                        }
                    })
            },
            uploadSuccess(data) {
                this.authorForm.e_avatar = this.domain + data;
                console.log(data);
            },
            sizeError(data) {
                this.$alert(data, '提示', {
                    confirmButtonText: '确定'
                }).catch(() => { })
            }
        }
    }

</script>
<style lang="scss" src="./author-edit.scss" scoped></style>