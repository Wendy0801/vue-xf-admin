<template>
    <section class="user-edit-container">
        <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
            <el-form-item label="用户名" prop="cust_name">
                <el-input v-model="editForm.cust_name"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="cust_mobile">
                <el-input v-model="editForm.cust_mobile"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="editForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="用户个性签名" prop="cust_desc">
                <el-input v-model="editForm.cust_desc"></el-input>
            </el-form-item>
            <el-form-item prop="cust_portrait">
                <img v-show="editForm.cust_portrait" :src="editForm.cust_portrait" width="200">
                <img-uploader btnText="上传头像" :token="uptoken" :qnImgUrl="domain" @onSuccess="uploadSuccess"></img-uploader>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="submitCancel">取 消</el-button>
            <el-button type="primary" @click="submitSure">确 定</el-button>
        </div>
    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    import ImgUploader from 'COMPONENTS/ImgUploader'
    export default {
        data() {
            return {
                uptoken: '',
                domain: '',
                editForm: {
                    cust_id: '',
                    cust_name: '',
                    cust_mobile: '',
                    cust_desc: '',
                    sex: '',
                    cust_portrait: ''
                },
                editFormRules: {
                    cust_name: [
                        { required: true, message: '请填写用户姓名' }
                    ],
                    cust_mobile: [
                        { required: true, message: '请填写用户电话' }
                    ],
                    cust_desc: [
                        { required: true, message: '请填写用户个性签名' }
                    ],
                    sex: [
                        { required: true, message: '请选择用户性别' }
                    ],
                    cust_portrait: [
                        { required: true, message: '请上传用户头像' }
                    ]

                }
            }
        },
        components: {
            'img-uploader': ImgUploader
        },
        mounted() {
            var id = this.$route.params['custId'];
            if (id) {
                this.fictitiousEdit(id)
                this.editForm.cust_id = id;
            } else {
                this.editForm.cust_id = '';
            }
            this.editorUpload();
        },
        methods: {
            fictitiousEdit(id) {
                ApiService.get({
                    'ext': 'robot/user/read',
                    'cust_id': id
                }).then(res => {
                    if (res.data.code == 1) {
                        this.editForm = {
                            cust_id: res.data.data.custId,
                            cust_name: res.data.data.custName,
                            cust_mobile: res.data.data.custMobile,
                            cust_desc: res.data.data.custDesc,
                            sex: res.data.data.sex == "男" ? 1 : 2,
                            cust_portrait: res.data.data.custPortrait
                        }
                    }
                })
            },
            editorUpload: function () {
                ApiService.get({
                    'ext': 'common/resource/qiniu/config'
                }).then(res => {
                    this.uptoken = res.body.uptoken;
                    this.domain = res.body.domain;
                })
            },
            submitSure:function() {
                this.$refs.editForm.validate(res => {
                    if (res) {
                        if (this.editForm.cust_id == '') {
                            ApiService.post({
                                'ext': 'robot/user/add',
                                'cust_name': this.editForm.cust_name,
                                'cust_mobile': this.editForm.cust_mobile,
                                'cust_desc': this.editForm.cust_desc,
                                'sex': this.editForm.sex,
                                'cust_portrait': this.editForm.cust_portrait
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '成功',
                                        message: '添加成功',
                                        type: "success"
                                    })
                                    this.$router.push({ path: `/fictitiousUsers` })
                                }
                            })
                        } else {
                            ApiService.post({
                                'ext': 'robot/user/edit',
                                'cust_id': this.editForm.cust_id,
                                'cust_name': this.editForm.cust_name,
                                'cust_mobile': this.editForm.cust_mobile,
                                'cust_desc': this.editForm.cust_desc,
                                'sex': this.editForm.sex,
                                'cust_portrait': this.editForm.cust_portrait
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '成功',
                                        message: '编辑成功',
                                        type: "success"
                                    })
                                    this.$router.push({ path: `/fictitiousUsers` })
                                }
                            })
                        }

                    }
                })
            },
            submitCancel() {

            },
            uploadSuccess(value) {
                this.editForm.cust_portrait = this.domain + value;
            }
        }

    }

</script>
<style lang="scss" src="./fictitiousUser.scss" scoped></style>