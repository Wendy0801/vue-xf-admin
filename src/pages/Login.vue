<template>
    <div class="login-container">
        <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" @change="remeberPassward"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.enter="loginNow" @change="remeberPassward"></el-input>
            </el-form-item>
            <el-checkbox v-model="isRemeberMe" style="margin:0px 0px 35px 0px;" @change="remeberPassward">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="loginNow">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import NProgress from 'nprogress'
    import ApiService from 'SERVICES/api.service';
    import { Md5 } from 'SERVICES/md5.service';

    export default {
        data() {
            return {
                logining: false,
                loginForm: {
                    username: '',
                    password: ''
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                isRemeberMe: '',
            };
        },
        mounted: function () {
            this.getStorage();
        },
        methods: {
            loginNow() {
                // if (this.logining) {
                //     return fasle;
                // }
                // NProgress.start();
                this.logining = true;
                this.verifyData()
                    .then(() => {
                        ApiService.post({
                            'ext': 'system/session/login',
                            'user_name': this.loginForm.username,
                            // 'password': Md5(this.loginForm.password)
                            'password': this.loginForm.password
                        })
                            .then(res => {
                                console.log(res);
                                if (res.data.code === 1) {
                                    this.$notify({
                                        'type': 'success',
                                        'message': '登陆成功'
                                    });
                                    this.logining = false;
                                    sessionStorage.setItem('ssId', res.data.data.ssId);
                                    ApiService.writeCookie({
                                        'ssId': res.data.data.ssId
                                    });
                                    this.getUserAuth(res.data.data.ssUserId);
                                    
                                }
                                else {
                                    this.logining = false;
                                    this.$notify({
                                        'type': 'error',
                                        'message': res.data.msg
                                    })
                                }
                            })
                    })
            },
            getUserAuth(ssUserId) {
                ApiService.get({
                    'ext': 'system/user/read',
                    'userId': ssUserId
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            var _powers = res.data.data.powers;
                            var _authList = [];
                            _powers.map(item => {
                                _authList.push(item.powerPath);
                            })
                            ApiService.writeCookie({
                                'authList': _authList
                            });
                            this.$router.push({ 'path': '/' });
                        }
                    })
            },

            verifyData() {
                return new Promise(resolve => {
                    this.$refs.loginForm.validate((valid) => {
                        if (valid) {
                            resolve(true);
                        }
                    })
                })
            },
            getStorage: function () {
                if (localStorage.getItem('remeber') == 'true') {
                    this.isRemeberMe = true;
                } else if (localStorage.getItem('remeber') == 'false') {
                    this.isRemeberMe = false;
                }
                this.loginForm.username = localStorage.getItem('user');
                this.loginForm.password = localStorage.getItem('pass');
            },
            remeberPassward: function () {
                if (this.isRemeberMe) {
                    localStorage.setItem('user', this.loginForm.username);
                    localStorage.setItem('pass', this.loginForm.password);
                    localStorage.setItem('remeber', true);
                } else {
                    console.log(this.isRemeberMe);
                    localStorage.setItem('user', '');
                    localStorage.setItem('pass', '');
                    localStorage.setItem('remeber', false);
                }
            }
        }
    }

</script>

<style scoped>
    .login-container {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background: url(/static/images/loginBack.png);
    }
    
    .card-box {
        padding: 20px;
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin-bottom: 20px;
        background-color: #F9FAFC;
        margin: 180px auto;
        width: 400px;
        border: 2px solid #8492A6;
    }
    
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    
    .loginform {
        width: 350px;
        padding: 35px 35px 15px 35px;
    }
</style>