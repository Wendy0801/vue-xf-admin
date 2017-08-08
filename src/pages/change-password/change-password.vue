<template>
    <div>
        <div class="changepwd-form-container">
            <el-form :model="pwdForm" ref="pwdForm" :label-position="labelPosition" :rules="rules" label-width="120px">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="pwdForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="pwdForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码" prop="newPasswordAgain">
                    <el-input type="password" v-model="pwdForm.newPasswordAgain"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="large" @click="submitForm('pwdForm')">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
    import { Md5 } from 'SERVICES/md5.service';
    export default {
        data() {
            return {
                labelPosition: 'right',
                userId : '' ,
                pwdForm: {
                    oldPassword: '',
                    newPassword: '',
                    newPasswordAgain: ''
                },
                rules: {
                    oldPassword: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ],
                    newPasswordAgain: [
                        { required: true, message: '请重复新旧密码', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted() {
            // this.userId = ApiService.getCookie('userId') || 0;
            this.sessionId = sessionStorage.getItem('ssId');
            this.getUserinfo();
        },
        methods: {
            getUserinfo() {
                ApiService.get({
                    'ext': 'system/session/info',
                    'ss_id': this.sessionId
                })
                    .then(res => {
                        if(res.data.code===1) {
                            this.userId = res.data.data.ssUserId ; 
                        }
                        else {
                            this.$notify({
                                'type' : 'error' ,
                                'message' : '获取用户信息失败,请重新登陆!'
                            }) ; 
                        }
                    })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.changeNow();
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
            changeNow() {
                this.verifyData()
                    .then(() => {
                        ApiService.put({
                            'ext': 'system/user/password',
                            'id': this.userId,
                            // 'old_password': Md5(this.pwdForm.oldPassword),
                            // 'new_password': Md5(this.pwdForm.newPassword),
                            'old_password': this.pwdForm.oldPassword,
                            'new_password': this.pwdForm.newPassword
                        })
                            .then(res => {
                                if (res.data.code === 1) {
                                    this.$notify({
                                        showClose: true,
                                        type: 'success',
                                        message: '修改成功'
                                    });
                                    this.$router.push({ 'path': '/login' });
                                }
                                else {
                                    this.$notify({
                                        showClose: true,
                                        type: 'error',
                                        message: res.data.msg
                                    });
                                }
                            })
                    })
                    .catch(error => {
                        this.$notify({
                            showClose: true,
                            type: 'error',
                            message: error
                        });
                    })
            },
            verifyData() {
                return new Promise(resolve => {
                    if (this.pwdForm.oldPassword && this.pwdForm.newPassword && this.pwdForm.newPasswordAgain) {
                        if (this.pwdForm.newPassword === this.pwdForm.newPasswordAgain) {
                            resolve(true);
                        }
                        else {
                            throw '新密码两次输入不一致!';
                        }
                    }
                    else {
                        throw '请填写完整信息!';
                    }
                })
            }
        }
    }

</script>
<style lang="scss" src="./change-password.scss" scoped></style>