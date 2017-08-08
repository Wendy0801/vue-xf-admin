<template>
    <div class="notice-add-container">
        <div class="notice-add-inner">
            <el-form :model="noticeForm" :rules="rules" ref="noticeForm" label-width="100px" class="demo-noticeForm">
                <el-form-item label="通知标题" prop="noti_title">
                    <el-input v-model="noticeForm.noti_title" :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="noti_userid">
                    <el-select v-model="noticeForm.noti_userid" placeholder="请选择作者">
                        <el-option :label="item.ename" :value="item.eid" v-for="item in authorList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外部URL" prop="noti_url">
                    <el-input v-model="noticeForm.noti_url" placeholder="填写URL后,该文章链接会直接跳转倒对应的URL"></el-input>
                </el-form-item>
                <!--<el-form-item label="立即推送" prop="isPushNow">
                    <el-switch on-text="" off-text="" v-model="isPushNow"></el-switch>
                </el-form-item>-->
                <el-form-item label="内容编辑" prop="content">
                    <el-input type="textarea" v-model="noticeForm.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('noticeForm')">立即创建</el-button>
                    <el-button @click="resetForm('noticeForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
     
    export default {
        data() {
            return {
                noticeId: null, // 修改时传入的id
                prevNoticeInfo: {},
                isPushNow: false,
                noticeForm: {
                    noti_title: '',
                    content: '',
                    // push_state: 0,
                    noti_userid: '',
                    noti_url: ''
                },
                rules: {
                    noti_title: [
                        { required: true, message: '请输入通知标题', trigger: 'blur' },
                    ],
                    noti_userid:[
                        { required: true, message: '请选择作者' },
                    ],
                    noti_url:[
                        { required: true, message: '请输入外部Url' ,trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                    ]
                },
                authorList: []
            };
        },
        mounted() {
            this.noticeId = this.$route.params['noticeId'];
            if (this.noticeId) {
                this.getPrevNoticeInfo();
            }

            this.getAuthorList();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.noticeId) {
                            this.editNotice();
                        }
                        else {
                            this.addNotice();
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
            getPrevNoticeInfo() {
                // this.noticeForm = {
                //     noti_title: '哈哈哈哈',
                //     content: '阿斯蒂芬阿凡达哈哈史蒂夫',
                //     push_state: 0,
                //     noti_userid: '2',
                //     noti_url: 'dsafadfasdf'
                // }
                ApiService.get({
                    'ext': 'system/notice/read',
                    'noti_id': this.noticeId
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.noticeForm = {
                                'noti_title': res.data.data.notiTitle,
                                'content': res.data.data.content,
                                // 'push_state': res.data.data.notiStatus,
                                'noti_userid': res.data.data.notiUserid,
                                'noti_url': res.data.data.notiUrl,
                                'noti_id': this.noticeId
                            };
                            // this.isPushNow = this.noticeForm.push_state === 1 ? true : false;
                        }
                    })
            },
            getAuthorList() {
                ApiService.post({
                    'ext': 'editor/page',
                    'pageNum': 1,
                    'pageSize': 100
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.authorList = res.data.data.list;
                        }
                    })
            },
            addNotice() {
                let _noticeData = Object.assign(this.noticeForm, {
                    ext: 'system/notice/add'
                })
                // this.noticeForm['push_state'] = this.isPushNow ? 1 : 0;
                ApiService.post(_noticeData)
                    .then(res => {
                        if (res.data.code === 1) {
                            this.$notify({
                                showClose: true,
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.push({ 'path': '/user-notice' });
                        }
                        else {
                            this.$notify({
                                showClose: true,
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
            },
            editNotice() {
                this.formatPostData('edit')
                    .then(data => {
                        ApiService.put(data)
                            .then(res => {
                                if (res.data.code === 1) {
                                    this.$notify({
                                        showClose: true,
                                        type: 'success',
                                        message: '操作成功!'
                                    });
                                    this.$router.push({ 'path': '/user-notice' });

                                } else {
                                    this.$notify({
                                        showClose: true,
                                        type: 'error',
                                        message: res.data.msg
                                    })
                                }

                            })
                    })
            },
            formatPostData(type = 'add') {
                return new Promise(resolve => {
                    let _noticeData = Object.assign(this.noticeForm, {
                        ext: `system/notice/${type}`
                    })
                    // this.noticeForm['push_state'] = this.isPushNow ? 1 : 0;
                    resolve(_noticeData);
                })
            }
        }
    }

</script>
<style lang="scss" src="./add-notice.scss" scoped></style>