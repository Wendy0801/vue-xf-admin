<template v-loading="listLoading">
    <section>
        <!--工具栏-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="输入文章标题" v-model="name" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getNewsList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="newsAdd">新增</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table :data="newsList" stripe v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                    <!--{{pageNum*pageSize+index}}-->
                </el-table-column>
                <el-table-column label="文章标题" prop="infoTitle">
                    <template scope="scope">
                        <div :title="scope.row.infoTitle">{{scope.row.infoTitle}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="资讯Id" prop="infoId"></el-table-column>
                <el-table-column label="文章分类" prop="infoType">
                    <template scope="scope">
                        <span>{{scope.row.infoType===1?'娱乐':'时尚'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="文章标签" prop="infoLableName"></el-table-column>
                <el-table-column label="是否显示" prop="ihDisplay">
                    <template scope="scope">
                        <span>{{scope.row.ihDisplay===0?'否':'是'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.infoSort" @focus="changeSort(scope.row)" v-model='sortNum'></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="newsEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="newsDel(scope.row)">删除</el-button>
                        <el-button type="text" @click="newPush(scope.row.infoId)">推送</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination layout="total,prev, pager, next,jumper" :total="total" style="float:right;" @current-change="newsCurrentChange">
            </el-pagination>
        </el-col>

        <!--新增资讯推送-->
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
    </section>


</template>
<script>
    import ApiService from 'SERVICES/api.service'

    export default {
        name: 'news',
        data() {
            return {
                name: '',
                sortNum: '',
                newsList: [],
                labelList: [],
                editerList: [],
                newsId: [],
                pageSize: 10,
                pageNum: 1,
                total: 0,
                myEditor: {},
                listLoading: true,
                uploadUrl: ApiService.getUploadUrl(),
                btnEditText: '确定',
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
            this.getNewsList();
        },
        methods: {
            getNewsList: function () {
                ApiService.post({
                    'ext': 'information/manage/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'keyword': this.name
                })
                    .then(res => {
                        this.newsList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })
            },
            allList: function () {
                if (!this.name) {
                    this.getNewsList();
                }
            },
            newsAdd: function () {
                // 新增
                this.$router.push({ path: `/newsAdd` });
            },
            //显示编辑界面
            newsEdit: function (res) {
                this.$router.push({ path: `/newsEdit/${res.infoId}` })
            },
            newsDel: function (res) {
                if (res.infoHomepage == 1) {
                    this.$alert('您删除的资讯已设置为主页资讯,无法删除', '提示', {
                        confirmButtonText: '确定',
                    }).catch(() => { })
                } else {
                    this.$confirm('您确定要删除该资讯?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        ApiService.post({
                            'ext': 'information/manage/delete',
                            'ids': res.infoId
                        })
                            .then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getNewsList();


                            })
                    }).catch(() => { })
                }
            },
            changeSort: function (res) {
                this.$prompt('请输入序号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    if (value) {
                        ApiService.post({
                            'ext': 'information/manage/state',
                            'ids': res.infoId,
                            'order': value
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getNewsList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定',
                        }).then(() => { }).catch(() => { })
                        return false;
                    }

                }).catch(() => { })
            },
            batchSelect: function (checkList) {
                this.newsId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.newsId.push(checkList[i].infoId);
                }
            },
            batchDel: function () {
                if (this.newsId.length > 0) {
                    var _delId = this.newsId.join(',');
                    this.$confirm('您确定要删除该资讯?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        ApiService.post({
                            'ext': 'information/manage/delete',
                            'ids': _delId
                        })
                            .then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getNewsList();


                            })
                    }).catch(() => { })
                } else {

                    this.$confirm('请勾选您需要删除的资讯', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).catch(() => { })
                }
            },
            newsCurrentChange: function (res) {
                this.pageNum = res;
                this.getNewsList();
            },
            newPush: function (infoId) {
                this.editDialog = true;
                this.editForm = {
                    title: '',
                    text: '',
                    type: 1,
                    msgId: infoId
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
                                this.$confirm('新增资讯推送文本成功，是否推送？', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消'
                                }).then(() => {
                                    this.editDialog = false;
                                    this.editFormPush.id = res.data.data
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
            }
        }
    }

</script>
<style>
    .el-dialog__wrapper img {
        width: 200px;
    }
</style>