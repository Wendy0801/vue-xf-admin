<template>
    <section>
        <!--工具栏-->
        <el-col :span="24" class="toolbar">
            <el-form>
                <el-form-item>
                    <el-button type="primary" @click="labelAdd">添加标签</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table stripe :data="labelList" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column label="标签名称" prop="name">
                    </label>></el-table-column>
                <el-table-column label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.sort" @focus="changeSort(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="labelEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="labelDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination layout="total,prev, pager, next,jumper" :total="total" style="float: right" @current-change="labelCurrentChange"></el-pagination>
        </el-col>
        <!--编辑页面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" @close="editCancel">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary " @click="editSumbit">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        data() {
            return {
                labelList: [],
                labelParentList: [],
                labelId: [],
                pageSize: 10,
                pageNum: 1,
                total: 0,
                listLoading: false,
                editFormVisible: false,
                editFormTtile: '新增',
                editForm: {
                    id: '',
                    name: '',
                },
                editFormRules: {
                    name: [{
                        required: true,
                        message: '请填写标签名称',
                        trigger: 'blur'
                    }]

                }
            }
        },
        mounted: function () {
            this.getLabelList();
        },
        methods: {
            getLabelList: function () {
                // 获取分类列表
                ApiService.post({
                    'ext': 'information/lable/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }).then(res => {
                    console.log(res);
                    this.labelList = res.data.data.list;
                    this.total = res.data.data.total;
                })
                this.listLoading = false;
            },
            labelAdd: function () {
                // 新增分类
                this.editFormVisible = true;
                this.editFormTtile = '新增';

                this.editForm.id = '';
                this.editForm.name = '';
            },
            labelEdit: function (row) {
                // 编辑
                this.editFormVisible = true;
                this.editFormTtile = '编辑';

                this.editForm.id = row.id;
                this.editForm.name = row.name;
            },
            labelDel: function (row) {
                console.log(row)
                this.$confirm('您确定要删除该标签', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'information/lable/delete',
                        'ids': row.id
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.listLoading = true;
                        this.getLabelList();
                    })
                }).catch(() => { })

            },
            editSumbit: function () {
                this.$refs.editForm.validate((res) => {
                    if (res) {
                        this.editFormVisible = false;
                        if (this.editForm.id == '') {
                            ApiService.post({
                                'ext': 'information/lable/add',
                                'name': this.editForm.name,
                            }).then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getLabelList();
                            })

                        } else {
                            ApiService.put({
                                'ext': 'information/lable/edit',
                                'id': this.editForm.id,
                                'name': this.editForm.name,
                            }).then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getLabelList();
                            })
                        }
                    } else {
                        return false;
                    }
                });

            },
            editCancel: function () {
                this.editFormVisible = false;
                this.$refs.editForm.resetFields();
            },
            batchSelect: function (checkList) {
                this.labelId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.labelId.push(checkList[i].id);
                }
            },
            batchDel: function () {
                if (this.labelId.length > 0) {
                    var _delId = this.labelId.join(',');
                    this.$confirm('您确定要删除该标签', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'information/lable/delete',
                            'ids': _delId
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getLabelList();
                        })
                    }).catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的标签', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).catch(() => { })
                }
            },
            labelCurrentChange: function (val) {
                this.pageNum = val;
                this.getLabelList(this.pageNum);
            },
            changeSort: function (row) {
                console.log(row);
                this.$prompt('请输入序号',
                    '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({
                        value
                    }) => {
                        if (value) {
                            ApiService.put({
                                'ext': 'information/lable/sort',
                                'ids': row.id,
                                'sort': value
                            }).then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getLabelList();
                            })
                        } else {
                            this.$alert('序列号不能为空', '提示', {
                                confirmButtonText: '确定',
                            }).then(() => { }).catch(() => { })
                            return false;
                        }

                    }).catch(() => { })
            }

        }
    }

</script>