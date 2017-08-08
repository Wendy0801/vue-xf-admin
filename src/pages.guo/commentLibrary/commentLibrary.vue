<template>
    <section>
        <!--工具栏-->
        <el-col :span='24' class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select placeholder="请选择分类" v-model="rc_category">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="通用[默认]" value="0"></el-option>
                        <el-option label="资讯" value="1"></el-option>
                        <el-option label="选手" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入关键字" v-model="rc_keyword" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getCommentList()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addComment()">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="commentList">
            <el-table-column label="序号" width="80">
                <template scope="scope">
                    {{scope.$index+1+(pageNum-1)*pageSize}}
                </template>
            </el-table-column>
            <el-table-column label="分类">
                <template scope="scope">
                    {{scope.row.rcCategory==0?"通用[默认]":scope.row.rcCategory==1?'资讯':'选手'}}
                </template>
            </el-table-column>
            <el-table-column label="关键字" prop="rcKeyword"></el-table-column>
            <el-table-column label="评论内容" prop="rcContent" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" prop="rcCreateTime"></el-table-column>
            <el-table-column label="备注" prop="rcRemark"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" @click="editComment(scope.row)">编辑</el-button>
                    <el-button type="text" @click="delectComment(scope.row.rcId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-col :span='24' class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" :total="total" @current-change="commentPage"></el-pagination>
        </el-col>

        <!--编辑-->
        <el-dialog title="编辑" v-model="dialogVisible" @close="editCancel">
            <el-form :model="editForm" label-width="100px" :rules="editFormRule" ref="editForm">
                <el-form-item label="分类" prop="rc_category">
                    <el-radio-group v-model="editForm.rc_category">
                        <el-radio :label="0">通用</el-radio>
                        <el-radio :label="1">资讯</el-radio>
                        <el-radio :label="2">选手</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input v-model="editForm.rc_keyword"></el-input>
                </el-form-item>
                <el-form-item label="评论内容" prop="rc_content">
                    <el-input type="textarea" :rows="5" v-model="editForm.rc_content"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editForm.rc_remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        data() {
            return {
                dialogVisible: false,
                rc_category: '',
                rc_keyword: '',
                commentList: [],
                pageNum: 1,
                pageSize: 10,
                total: 0,
                editForm: {
                    rc_id: '',
                    rc_category: '',
                    rc_keyword: '',
                    rc_content: '',
                    rc_remark: ''
                },
                editFormRule: {
                    rc_category: [
                        { required: true, message: '请选择分类' }
                    ],
                    rc_content: [
                        { required: true, message: '请输入评论内容' }
                    ]
                }
            }
        },
        mounted() {
            this.getCommentList();
        },
        methods: {
            getCommentList() {
                ApiService.post({
                    'ext': 'robot/comment/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'rc_category': this.rc_category,
                    'rc_keyword': this.rc_keyword
                }).then(res => {
                    if (res.data.code == 1) {
                        this.commentList = res.data.data.list;
                        this.total = res.data.data.total;
                    }
                })
            },
            allList() {
                if (!this.rc_keyword) {
                    this.getCommentList();
                }
            },
            addComment() {
                this.dialogVisible = true;
                this.editForm = {
                    rc_id: '',
                    rc_category: '',
                    rc_keyword: '',
                    rc_content: '',
                    rc_remark: ''
                }
            },
            editComment(row) {
                this.dialogVisible = true;
                this.editForm = {
                    rc_id: row.rcId,
                    rc_category: row.rcCategory,
                    rc_keyword: row.rcKeyword,
                    rc_content: row.rcContent,
                    rc_remark: row.rcRemark
                }
            },
            editSubmit() {
                console.log(this.$refs.editForm);
                this.$refs.editForm.validate(res => {
                    if (res) {
                        if (this.editForm.rc_id == '') {
                            ApiService.post({
                                'ext': 'robot/comment/add',
                                'rc_category': this.editForm.rc_category,
                                'rc_keyword': this.editForm.rc_keyword,
                                'rc_content': this.editForm.rc_content,
                                'rc_remark': this.editForm.rc_remark
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '提示',
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.dialogVisible = false;
                                    this.getCommentList();
                                }
                            })
                        } else {
                            ApiService.post({
                                'ext': 'robot/comment/edit',
                                'rc_id': this.editForm.rc_id,
                                'rc_category': this.editForm.rc_category,
                                'rc_keyword': this.editForm.rc_keyword,
                                'rc_content': this.editForm.rc_content,
                                'rc_remark': this.editForm.rc_remark
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '提示',
                                        message: '编辑成功',
                                        type: 'success'
                                    });
                                    this.dialogVisible = false;
                                    this.getCommentList();
                                }
                            })
                        }
                    }
                })
            },
            editCancel() {
                this.dialogVisible = false;
                this.$refs.editForm.resetFields();
            },
            delectComment(id) {
                this.$confirm('您确定要删除评论?', '提示', {
                    confirmButttonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'robot/comment/delete',
                        'ids': id
                    }).then(res => {
                        if(res.data.code==1){
                            this.$notify({
                                title:'提示',
                                message:"删除成功!",
                                type:'success'
                            });
                            this.getCommentList();
                        }

                    })
                }).catch(() => { })
            },
            commentPage(value) {
                this.pageNum = value;
                this.getCommentList();
            }
        }

    }

</script>