<template>
    <div>
        <el-table :data="noticeList" stripe style="width: 100%" @selection-change="batchSelect">
            <el-table-column type="selection" width="55" label="序号">
            </el-table-column>
            <el-table-column width="80">
                <template scope="scope">
                    <span>{{scope.$index+1+(pIndex-1)*pSize}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column label="发布者头像" width="140" prop="notiName">
                <template scope="scope">
                    <div class="user-face">
                        <img :src="scope.row.notiPortrait" alt="">
                    </div>
                </template>
            </el-table-column>-->
            <el-table-column label="发布者名字" prop="notiName">
            </el-table-column>
            <el-table-column label="最后保存时间" prop="createTime">
            </el-table-column>
            <el-table-column label="通知标题" prop="notiTitle">
            </el-table-column>
            <el-table-column label="是否推送" prop="notiStatus">
                <template scope="scope">
                    <span>{{scope.row.notiStatus===1?'是':'否'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" class="action-col">
                <template scope="scope">
                    <el-button type="text" @click="goEdit(scope.row.notiId)">编辑</el-button>
                    <el-button type="text" class="delete-btn" @click="deleteNotice(scope.row.notiId)">删除</el-button>
                    <el-button type="text" class="delete-btn" @click="noticePush(scope.row.notiId)">推送</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-col class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination @current-change="handleCurrentChange" :current-page="pIndex" :page-size="pSize" layout=" prev, pager, next, jumper,total"
                :total="total">
                </el-pagination>
        </el-col>

        <!--新增通知推送-->
        <el-dialog title="推送" v-model="editDialog" @close="editCancel('editDialog')">
            <el-form :model="editForm" label-width="120px" ref="editForm" :rules="editFormRules">
                <el-form-item label="推送内容标题" prop="title">
                    <el-input v-model="editForm.title" placeholder="请输入推送内容标题"></el-input>
                </el-form-item>
                <el-form-item label="消息文本" prop="text">
                    <el-input v-model="editForm.text" placeholder="请输入推送内容标题"></el-input>
                </el-form-item>
                <el-form-item label="消息类型" prop="type">
                    <el-radio-group v-model="editForm.type">
                        <el-radio :label="1">资讯</el-radio>
                        <el-radio :label="2">通知</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="消息ID" prop="msgId">
                    <el-input v-model="editForm.msgId" placeholder="请输入推送内容标题"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCancel('editDialog')">取 消</el-button>
                <el-button type="primary" @click="pushAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!--推送-->
        <el-dialog title="推送" v-model="pushDialog" @close="editCancel('pushDialog')">
            <el-form :model="editFormPush" label-width="120px" ref="editFormPush" :rules="editFormPushRules">
                <el-form-item label="推送时间" prop="startTime">
                    <el-date-picker type="datetime" v-model="editFormPush.startTime" placeholder="请选择推送时间" format="yyyy-MM-dd HH:mm:ss" @change="startDateFormat"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCancel('pushDialog')">取 消</el-button>
                <el-button type="primary" @click="pushSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
    export default {
        data() {
            return {
                noticeList: [

                ],
                noticeId: [],
                pIndex: 1,
                pSize: 10,
                total: 0,
                deleteIds: '',
                editDialog: false,
                pushDialog: false,
                editForm: {
                    title: '',
                    text: '',
                    type: '',
                    msgId: ''
                },
                editFormPush: {
                    id: '',
                    startTime: ''
                },
                editFormRules: {
                    title: [
                        { required: true, message: '请输入推送标题' }
                    ],
                    text: [
                        { required: true, message: '请输入推送消息文本' }
                    ],
                    type: [
                        { required: true, message: '请选择类型' }
                    ],
                    msgId: [
                        { required: true, message: '请输入消息ID' }
                    ]
                },
                editFormPushRules: {
                    startTime: [
                        { required: true, message: '请选择推送时间' }
                    ]
                }
            }
        },
        mounted() {
            this.getNoticeList();
        },
        methods: {
            getNoticeList(pIndex = 1, pSize = this.pSize) {
                ApiService.post({
                    ext: 'system/notice/page',
                    pageNum: pIndex,
                    pageSize: pSize
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.noticeList = res.data.data.list;
                            this.total = res.data.data.total;
                        }
                    })
            },
            handleCurrentChange(pIndex) {
                this.pIndex = pIndex;
                this.getNoticeList(pIndex);
            },
            goEdit(id) {
                this.$router.push({ path: `/add-notice/${id}` });
            },
            deleteNotice(id) {
                this.deleteIds = `${id}`;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        ApiService.post({
                            'ext': 'system/notice/delete',
                            'ids': this.deleteIds
                        })
                            .then(res => {
                                if (res.data.code === 1) {
                                    this.$notify({
                                        showClose: true,
                                        type: 'success',
                                        message: '删除成功'
                                    });
                                    this.deleteIds = '';
                                    this.getNoticeList();
                                }
                            })
                    })
                    .catch(() => { })
            },
            batchSelect: function (checkList) {
                this.noticeId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.noticeId.push(checkList[i].notiId);
                }
            },
            batchDel: function () {
                if (this.noticeId.length > 0) {
                    var _delIds = this.noticeId.join(',')
                    this.$confirm('您确定要删除通知?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    })
                        .then(() => {
                            ApiService.post({
                                'ext': 'system/notice/delete',
                                'ids': _delIds
                            })
                                .then(res => {
                                    this.$notify({
                                        title: '成功',
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                    this.listLoading = true;
                                    this.getNoticeList();
                                })
                        })
                        .catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的通知', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).catch(() => { })
                }
            },
            noticePush: function (id) {
                this.editDialog = true;
                this.editForm = {
                    title: '',
                    text: '',
                    type: 2,
                    msgId: id
                }
            },
            pushAdd: function () {
                this.$refs.editForm.validate(res => {
                    if (res) {
                        ApiService.post({
                            'ext': 'push/message/initPushMsg',
                            'title': this.editForm.title,
                            'text': this.editForm.text,
                            'type': this.editForm.type,
                            'msgId': this.editForm.msgId
                        }).then(res => {
                            if (res.data.code == 1) {
                                this.$confirm('新增通知推送文本成功，是否推送？', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消'
                                }).then(() => {
                                    this.editDialog = false;
                                     this.editFormPush.id = res.data.data;
                                     this.pushDialog = true;
                                }).catch(() => {
                                    this.editDialog = false;
                                })
                            }
                        })
                    }
                })
            },
            pushSubmit: function () {
                this.$refs.editFormPush.validate(res => {
                    if (res) {
                        ApiService.post({
                            'ext': 'push/message/setStartTime',
                            'id': this.editFormPush.id,
                            'startTime': this.editFormPush.startTime
                        }).then(res => {
                            this.$notify({
                                title: '提示',
                                message: '推送成功',
                                type: 'success'
                            });
                            this.pushDialog = false;
                            this.$router.push({ path: `/pushList` });
                        })
                    }
                })
            },
            editCancel: function (type) {
                if (type == 'editDialog') {
                    this.editDialog = false;
                    this.$refs.editForm.resetFields();
                } else {
                    this.pushDialog = false;
                    this.$refs.editFormPush.resetFields();
                }
            },

            startDateFormat: function (vm) {
                this.editFormPush.startTime = vm;
            },
        }
    }

</script>
<style lang="scss" src="./user-notice.scss" scoped></style>