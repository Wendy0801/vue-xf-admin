<template>
    <section>
        <!--工具栏-->
        <el-col :span='24' class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="tb_type" placeholder="请选择类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="用户事件[默认]" value="0"></el-option>
                        <el-option label="定时刷内容" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="tb_action" placeholder="请选择行为">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="点赞(一级评论)" value="1"></el-option>
                        <el-option label="点赞(二级评论)" value="2"></el-option>
                        <el-option label="关注" value="3"></el-option>
                        <el-option label="投票" value="4"></el-option>
                        <el-option label="评论资讯" value="5"></el-option>
                        <el-option label="评论选手" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getRuleList()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addRule()">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="ruleList">
            <el-table-column label="序号" width="80">
                <template scope="scope">
                    {{(scope.$index+1)+(pageNum-1)*pageSize}}
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <template scope="scope">
                    <span v-show="scope.row.tbType==0">用户事件[默认]</span>
                    <span v-show="scope.row.tbType==1">定时刷内容</span>
                </template>
            </el-table-column>
            <el-table-column label="执行任务">
                <template scope="scope">
                    <span v-show='scope.row.tbAction==1'>点赞(一级评论)</span>
                    <span v-show='scope.row.tbAction==2'>点赞(二级评论)</span>
                    <span v-show='scope.row.tbAction==3'>关注</span>
                    <span v-show='scope.row.tbAction==4'>投票</span>
                    <span v-show='scope.row.tbAction==5'>评论资讯</span>
                    <span v-show='scope.row.tbAction==6'>评论选手</span>
                </template>
            </el-table-column>
            <el-table-column label="总数量(默认:10)" prop="tbNumber"></el-table-column>
            <el-table-column label="间隔分钟(默认:3) " prop="tbInterval"></el-table-column>
            <el-table-column label="时间段">
                <template scope="scope">
                    {{scope.row.tbTimeStart+'-'+scope.row.tbTimeEnd}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" @click="editRule(scope.row)">编辑</el-button>
                    <el-button type="text" @click="deleteRule(scope.row.tbId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-col :span='24' class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" :total="total" @current-change="ruleCurrentChange"></el-pagination>
        </el-col>

        <!--编辑-->
        <el-dialog title="编辑" v-model="dialogVisible" @close="editCancel">
            <el-form :model="editForm" label-width="145px" :rules="editFormRules" ref="editForm">
                <el-form-item label="类型" prop="tb_type">
                    <el-radio-group v-model="editForm.tb_type">
                        <el-radio :label="0">用户事件[默认]</el-radio>
                        <el-radio :label="1">定时刷内容</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="执行任务" prop="tb_action">
                    <el-radio-group v-model="editForm.tb_action">
                        <el-radio :label="1">点赞(一级评论)</el-radio>
                        <el-radio :label="2">点赞(二级评论)</el-radio>
                        <el-radio :label="3">关注</el-radio>
                        <el-radio :label="4">投票</el-radio>
                        <el-radio :label="5">评论资讯</el-radio>
                        <el-radio :label="6">评论选手</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="总数量(默认:10)" prop="tb_number">
                    <el-input placeholder="请输入总数量" v-model="editForm.tb_number"></el-input>
                </el-form-item>
                <el-form-item label="间隔分钟(默认:3)" prop="tb_interval">
                    <el-input placeholder="请输入间隔分钟" v-model="editForm.tb_interval"></el-input>
                </el-form-item>
                <el-form-item label="开始时区" prop="tb_time_start">
                    <el-time-select v-model="editForm.tb_time_start" placeholder="选择时间" :picker-options="{start: '00:00',step: '00:10', end: '24:00'}"></el-time-select>
                </el-form-item>
                <el-form-item label="结束时区" prop="tb_time_end">
                    <el-time-select v-model="editForm.tb_time_end" placeholder="选择时间" :picker-options="{start: '00:00',step: '00:10', end: '24:00'}"></el-time-select>
                </el-form-item>
                <el-form-item label="开始日期" prop="tb_date_start">
                    <el-date-picker type="date" v-model="editForm.tb_date_start" placeholder="选择日期" format="yyyy-MM-dd" @change="dateStart">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="tb_date_end">
                    <el-date-picker type="date" v-model="editForm.tb_date_end" placeholder="选择日期" format="yyyy-MM-dd" @change="dateEnd"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="tb_remark">
                    <el-input placeholder="请输入备注" v-model="editForm.tb_remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary" @click="editorSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        data() {
            return {
                ruleList: [],
                tb_type: '',
                tb_action: '',
                dialogVisible: false,
                pageNum: 1,
                pageSize: 10,
                total: 0,
                editForm: {
                    tb_id: '',
                    tb_type: '',
                    tb_action: '',
                    tb_number: '',
                    tb_interval: '',
                    tb_time_start: '',
                    tb_time_end: '',
                    tb_date_start: '',
                    tb_date_end: '',
                    tb_remark: ''
                },
                editFormRules: {
                    tb_type: [
                        { required: true, message: '请选择类型'}
                    ],
                    tb_action: [
                        { required: true, message: '请选择执行任务' }
                    ],
                    tb_number: [
                        { required: true, message: '请输入总数量'  }
                    ],
                    tb_interval: [
                        { required: true, message: '请输入间隔' }
                    ],
                    tb_time_start: [
                        { required: true, message: '请选择开始时间' }
                    ],
                    tb_time_end: [
                        { required: true, message: '请选择结束时间' }
                    ],
                    tb_date_start: [
                        { required: true, message: '请选择开始日期' }
                    ],
                    tb_date_end: [
                        { required: true, message: '请选择结束日期' }
                    ],
                    tb_remark: [
                        { required: true, message: '请输入备注' }
                    ],
                }

            }
        },
        mounted() {
            this.getRuleList();
        },
        methods: {
            getRuleList() {
                ApiService.post({
                    'ext': 'robot/rule/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'tb_type': this.tb_type,
                    'tb_action': this.tb_action
                }).then(res => {
                    this.ruleList = res.data.data.list;
                    this.total = res.data.data.total
                })
            },
            addRule() {
                this.dialogVisible = true;
                this.editForm = {
                    tb_id: '',
                    tb_type: '',
                    tb_action: '',
                    tb_number: '',
                    tb_interval: '',
                    tb_time_start: '',
                    tb_time_end: '',
                    tb_date_start: '',
                    tb_date_end: '',
                    tb_remark: ''
                }
            },
            editRule(row) {
                this.dialogVisible = true;
                this.editForm = {
                    tb_id: row.tbId,
                    tb_type: row.tbType,
                    tb_action: row.tbAction,
                    tb_number: row.tbNumber,
                    tb_interval: row.tbInterval,
                    tb_time_start: row.tbTimeStart,
                    tb_time_end: row.tbTimeEnd,
                    tb_date_start: row.tbDateStart,
                    tb_date_end: row.tbDateEnd,
                    tb_remark: row.tbRemark
                }
            },
            editorSubmit() {
                this.$refs.editForm.validate(res => {
                    if (res) {
                        if (this.editForm.tb_id == '') {
                            ApiService.post({
                                'ext': 'robot/rule/add',
                                'tb_type': this.editForm.tb_type,
                                'tb_action': this.editForm.tb_action,
                                'tb_number': this.editForm.tb_number,
                                'tb_interval': this.editForm.tb_interval,
                                'tb_time_start': this.editForm.tb_time_start,
                                'tb_time_end': this.editForm.tb_time_end,
                                'tb_date_start': this.editForm.tb_date_start,
                                'tb_date_end': this.editForm.tb_date_end,
                                'tb_remark': this.editForm.tb_remark
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        type: 'success',
                                        title: '成功',
                                        message: '添加成功'
                                    });
                                    this.dialogVisible = false;
                                    this.getRuleList();
                                }
                            })
                        } else {
                            ApiService.post({
                                'ext': 'robot/rule/edit',
                                'tb_id': this.editForm.tb_id,
                                'tb_type': this.editForm.tb_type,
                                'tb_action': this.editForm.tb_action,
                                'tb_number': this.editForm.tb_number,
                                'tb_interval': this.editForm.tb_interval,
                                'tb_time_start': this.editForm.tb_time_start,
                                'tb_time_end': this.editForm.tb_time_end,
                                'tb_date_start': this.editForm.tb_date_start,
                                'tb_date_end': this.editForm.tb_date_end,
                                'tb_remark': this.editForm.tb_remark
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        type: 'success',
                                        title: '成功',
                                        message: '修改成功'
                                    });
                                    this.dialogVisible = false;
                                    this.getRuleList();
                                }
                            })
                        }
                    }else{
                         this.$alert('信息填写不完整!', '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                        return false;
                    }
                });
            },
            editCancel() {
                this.$refs.editForm.resetFields();
                this.dialogVisible = false;
            },
            deleteRule(id) {
                this.$confirm('您确定要删除运营规则?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'robot/rule/delete',
                        'ids': id
                    }).then(res => {
                        if (res.data.code == 1) {
                            this.$notify({
                                type: 'success',
                                title: '成功',
                                message: '删除成功'
                            });
                            this.dialogVisible = false;
                            this.getRuleList();

                        }
                    })
                }).catch(() => { })
            },
            ruleCurrentChange(value) {
                this.pageNum = value;
                this.getRuleList();
            },
            dateStart(vm) {
                this.editForm.tb_date_start = vm;
            },
            dateEnd(vm) {
                this.editForm.tb_date_end = vm;
            },
        }

    }

</script>