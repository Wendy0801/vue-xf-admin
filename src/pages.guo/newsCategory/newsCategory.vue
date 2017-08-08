<template>
    <section>
        <!--工具栏-->
        <!--<el-col :span="24" class="toolbar">
            <el-form>
                <el-form-item>
                    <el-button type="primary" @click="categoryAdd">添加分类</el-button>
                </el-form-item>
            </el-form>
        </el-col>-->
        <!--列表-->
        <template>
            <el-table stripe :data="categoryList" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column label="分类名称" prop="icName">
                    </label>></el-table-column>
                <el-table-column label="上级分类">
                    <template scope="scope">
                        <span>{{scope.row.icPname?scope.row.icPname:'无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.icOrder" @focus="changeSort(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="categoryEdit(scope.row)">编辑</el-button>
                        <!--<el-button type="text" @click="categoryDel(scope.row)">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="primary" @click="batchDel">批量删除</el-button>-->
            <el-pagination layout="total,prev, pager, next,jumper" :total="total" style="float: right" @current-change="categoryCurrentChange"></el-pagination>
        </el-col>
        <!--编辑页面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" @close="editCancel">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="分类名称" prop="ic_name">
                    <el-input v-model="editForm.ic_name"></el-input>
                </el-form-item>
                <el-form-item v-if="allClass.length>0" label="分类上级" prop="ic_pid">
                    <el-select v-model="editForm.ic_pid" placeholder="请选择分类">
                        <el-option :label="item.icPname" :value="item.icPid" v-for="item in allClass"></el-option>
                    </el-select>
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
                categoryList: [],
                categoryParentList: [],
                categoryId: [],
                pageSize: 10,
                pageNum: 1,
                total: 0,
                listLoading: false,
                editFormVisible: false,
                editFormTtile: '新增',
                editForm: {
                    ic_id: '',
                    ic_name: '',
                    ic_pid: '',
                    ic_order: ''
                },
                editFormRules: {
                    ic_name: [{
                        required: true,
                        message: '请填写分类名称',
                        trigger: 'blur'
                    }],
                    ic_pid: [{
                        required: true,
                        message: '请选择上级分类',
                        trigger: 'blur'
                    }]

                }
            }
        },
        mounted: function () {
            this.getCategoryList();
            this.getCategoryParentList();
        },
        computed: {
            'allClass': function () {
                let _arrClass = {};
                this.categoryParentList.filter(item => item.icPname)
                    .map(item => {
                        _arrClass[item.icPid] = item.icPname;
                    });
                let _arr = [];
                for (var item in _arrClass) {
                    _arr.push({
                        'icPid': item,
                        'icPname': _arrClass[item]
                    })
                }
                return _arr;
            }
        },
        methods: {
            getCategoryList: function () {
                // 获取分类列表
                ApiService.get({
                    'ext': 'information/category/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }).then(res => {
                    this.categoryList = res.data.data.list;
                    this.total = res.data.data.total;
                })
                this.listLoading = false;
            },
            getCategoryParentList: function () {
                // 获取分类上级下拉列表
                ApiService.get({
                    'ext': 'information/category/readList'
                }).then(res => {
                    this.categoryParentList = res.data.data;
                })
            },
            categoryAdd: function () {
                // 新增分类
                console.log(this.allClass);
                this.editFormVisible = true;
                this.editFormTtile = '新增';

                this.editForm.ic_id = '';
                this.editForm.ic_name = '';
                this.editForm.ic_pid = '';
            },
            categoryEdit: function (row) {
                // 编辑
                this.editFormVisible = true;
                this.editFormTtile = '编辑';

                this.editForm.ic_id = row.icId;
                this.editForm.ic_name = row.icName;
                this.editForm.ic_pid = row.icPid;
            },
            categoryDel: function (row) {
                this.$confirm('您确定要删除该分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'information/category/delete',
                        'ids': row.icId
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.listLoading = true;
                        this.getCategoryList();
                    })
                }).catch(() => { })

            },
            editSumbit: function () {

                this.$refs.editForm.validate((res) => {
                    if (res) {
                        this.editFormVisible = false;
                        if (this.editForm.ic_id == '') {
                            ApiService.post({
                                'ext': 'information/category/add',
                                'ic_pid': this.editForm.ic_pid,
                                'ic_name': this.editForm.ic_name,
                            }).then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getCategoryList();
                            })

                        } else {
                            ApiService.put({
                                'ext': 'information/category/edit',
                                'ic_id': this.editForm.ic_id,
                                'ic_pid': this.editForm.ic_pid,
                                'ic_name': this.editForm.ic_name,
                            }).then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getCategoryList();
                            })
                        }
                    } else {
                        return false;
                    }
                })

            },
            editCancel: function () {
                this.editFormVisible = false;
                this.$refs.editForm.resetFields();
            },
            categoryCurrentChange: function (val) {
                this.pageNum = val;
                this.getCategoryList();
            },
            batchSelect: function (checkList) {
                this.categoryId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.categoryId.push(checkList[i].icId);
                }
            },
            batchDel: function () {
                if (this.categoryId.length > 0) {
                    var _delId = this.categoryId.join(',');
                    this.$confirm('您确定要删除分类?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'information/category/delete',
                            'ids': _delId
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getCategoryList();
                        })
                    }).catch(() => { })

                } else {
                    this.$confirm('请勾选您需要删除的分类', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).catch(() => { })
                }
            },
            changeSort: function (row) {
                this.$prompt('请输入序号',
                    '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({
                        value
                    }) => {
                        if (value) {
                            ApiService.put({
                                'ext': 'information/category/order',
                                'ids': row.icId,
                                'order': value
                            }).then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getCategoryList();
                            })
                        } else {
                            this.$alert('序列号不能为空', '提示', {
                                confirmButtonText: '确定'
                            }).then(() => { }).catch(() => { })
                            return false;
                        }

                    }).catch(() => { })
            }

        }
    }

</script>