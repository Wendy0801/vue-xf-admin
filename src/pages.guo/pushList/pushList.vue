<template>
    <section>
        <!--工具栏-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select placeholder="请选择推送消息类型" v-model="type">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="资讯" value="1"></el-option>
                        <el-option label="通知" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select placeholder="请选择推送状态" v-model="status">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已推送" value="1"></el-option>
                        <el-option label="撤销推送" value="2"></el-option>
                        <el-option label="已设置" value="3"></el-option>
                        <el-option label="未设置" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getPushList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="pushList">
            <el-table-column label="序号" width="80">
                <template scope="scope">
                    {{scope.$index+1+(pageNum-1)*pageSize}}
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="类型">
                <template scope="scope">
                    <span v-show="scope.row.type==1">资讯</span>
                    <span v-show="scope.row.type==2">通知</span>
                    <span v-show="scope.row.type==3">一级评论</span>
                    <span v-show="scope.row.type==4">二级评论</span>
                </template>
            </el-table-column>
            <el-table-column label="推送时间" prop="startTime"></el-table-column>
            <el-table-column label="推送状态">
                <template scope="scope">
                    <span v-show="scope.row.status==1">已推送</span>
                    <span v-show="scope.row.status==2">撤销推送</span>
                    <span v-show="scope.row.status==3">已设置</span>
                    <span v-show="scope.row.status==4">未设置</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" v-show="scope.row.status==1"></el-button>
                    <el-button type="text" v-show="scope.row.status==2" @click="editPush(scope.row.id,scope.row.status)">设置推送</el-button>
                    <el-button type="text" v-show="scope.row.status==3" @click="editPush(scope.row.id,scope.row.status)">取消推送</el-button>
                    <el-button type="text" v-show="scope.row.status==4" @click="editPush(scope.row.id,scope.row.status)">设置推送</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next, jumper" :total="total" @current-change="pusPage"></el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" @close="editCancel">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="推送时间" prop="startTime">
                    <el-date-picker type="datetime" v-model="editForm.startTime" placeholder="选择推送时间" format="yyyy-MM-dd HH:mm:ss" @change="startDateFormat"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取消</el-button>
                <el-button type="primary" @click="editSumit">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'pushList',
        data() {
            return {
                type: '',
                status: '',
                pushList: [],
                pageNum: 1,
                pageSize: 10,
                total: 0,
                editFormVisible: false,
                editForm: {
                    id: '',
                    startTime: ''
                },
                editFormRules: {
                    startTime: [
                        { required: true, message: '请选择推送时间' }
                    ]

                }
            }
        },
        mounted() {
            this.getPushList();
        },
        methods: {
            getPushList() {
                ApiService.post({
                    'ext': 'push/message/getPushMsgVoList',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'type': this.type,
                    'status': this.status
                }).then(res => {
                    this.pushList = res.data.data.list;
                    this.total = res.data.data.total;
                })
            },
            editPush(id, status) {
                this.editForm.id = id;
                if (status == 2 || status == 4) {
                    this.editFormVisible = true;
                } else if (status == 3) {
                    ApiService.post({
                        'ext': 'push/message/cancelPushMsg',
                        'id': id
                    }).then(res => {
                        console.log(res);
                        if (res.data.code == 1) {
                            this.$notify({
                                title: '提示',
                                message: '操作成功！',
                                type: 'success'
                            })
                        }
                        this.editFormVisible = false;
                        this.getPushList();
                    })
                }
            },
            editSumit() {
                this.$refs.editForm.validate(res => {
                    if (res) {
                        ApiService.post({
                            'ext': 'push/message/setStartTime',
                            'id': this.editForm.id,
                            'startTime': this.editForm.startTime
                        }).then(res => {
                            console.log(res);
                            if (res.data.code == 1) {
                                this.$notify({
                                    title: '提示',
                                    message: '操作成功！',
                                    type: 'success'
                                })
                            }
                            this.editFormVisible = false;
                            this.getPushList();

                        })
                    }
                })
            },
            editCancel() {
                this.editFormVisible = false;
                this.$refs.editForm.resetFields();
            },
            startDateFormat(vm) {
                this.editForm.startTime = vm;
            },
            pusPage(value) {
                this.pageNum = value;
                this.getPushList();
            }
        }

    }

</script>