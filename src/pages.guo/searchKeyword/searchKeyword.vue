<template>
    <section>
        <!--工具栏   -->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入搜索的关键字" v-model="k_keyword" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" placeholder="请输入搜索词" @click="getKeywordList">搜索</el-button>
                    <el-button type="primary" @click="keywordAdd">添加搜索词</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table stripe :data="keywordList" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection"></el-table-column>
                <el-table-column width="100" label="序号" prop="kno">
                </el-table-column>
                <el-table-column label="搜索词" prop="kkeyword"></el-table-column>
                <el-table-column label="分类">
                    <template scope='scope'>
                        {{scope.row.ktype==1?'选手':scope.row.ktype==2?'资讯':'活动'}}
                    </template>
                </el-table-column>
                <el-table-column label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.ksort" @focus="changeSort(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="keywordEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="keywordDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination layout="total, prev, pager, next, jumper" :total="total" @current-change="keywordCurrentChange"></el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" @close="editCancel">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="搜索词" prop="k_keyword">
                    <el-input v-model="editForm.k_keyword" placeholder="请输入搜索词"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="k_type">
                    <el-select v-model="editForm.k_type" placeholder="请选择分类">
                        <el-option :label="item.name" :value="item.value" v-for="item in KType"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editCancel" :loading="editLoading">取消</el-button>
                <el-button type="primary" @click="editSumit" :loading="editLoading">{{btnEditText}}</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'keyword',
        data() {
            return {
                keywordList: [],
                keywordId: [],
                KType: [
                    { name: '选手', value: 1 },
                    { name: '资讯', value: 2 },
                    { name: '活动', value: 3 },
                ],
                total: 0,
                pageSize: 10,
                pageNum: 1,
                k_keyword: '',
                listLoading: false,
                editFormTtile: '新增',
                editFormVisible: false,
                editForm: {
                    k_id: '',
                    k_keyword: '',
                    k_type: ''
                },
                editFormRules: {
                    k_keyword: [{
                        required: true,
                        message: '请输入搜索词',
                        trigger: 'blur'
                    },],
                    k_type: [{
                        required: true,
                        message: '请选择分类',
                    },]
                },
                btnEditText: '提交',
                editLoading: false
            }
        },
        mounted: function () {
            this.getKeywordList();
        },
        methods: {
            getKeywordList: function () {
                ApiService.post({
                    'ext': 'homepage/keyword/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'k_keyword': this.k_keyword
                }).then(res => {
                    this.keywordList = res.data.data.list;
                    this.total = res.data.data.total;
                    this.listLoading = false;
                });
            },
            allList: function () {
                if (!this.k_keyword) {
                    this.getKeywordList();
                }
            },
            keywordAdd: function () {
                this.editFormTtile = '新增';
                this.editFormVisible = true;

                this.editForm.k_id = '';
                this.editForm.k_keyword = '';
                this.editForm.k_type = '';
            },
            keywordEdit: function (row) {
                console.log(row);
                this.editFormTtile = '编辑';
                this.editFormVisible = true;

                this.editForm.k_id = row.kid;
                this.editForm.k_keyword = row.kkeyword;
                this.editForm.k_type = row.ktype;

            },
            editSumit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        if (this.editForm.k_id == "") {
                            ApiService.post({
                                'ext': 'homepage/keyword/add',
                                'k_keyword': this.editForm.k_keyword,
                                'k_type': this.editForm.k_type
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '成功',
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.editFormVisible = false;
                                    this.listLoading = true;
                                    this.getKeywordList();
                                } else {
                                    this.$alert(res.data.msg, '提示', {
                                        confirmButtonText: '确定'
                                    }).catch(() => { })
                                    return false;
                                }

                            })
                        } else {
                            ApiService.put({
                                'ext': 'homepage/keyword/edit',
                                'k_id': this.editForm.k_id,
                                'k_keyword': this.editForm.k_keyword,
                                'k_type': this.editForm.k_type
                            }).then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.editFormVisible = false;
                                this.listLoading = true;
                                this.getKeywordList();
                            })
                        }
                    } else {
                        this.$alert('信息填写不完整!', '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                        return false;
                    }
                })
            },
            editCancel: function () {
                this.editFormVisible = false;
                this.$refs.editForm.resetFields();
            },
            changeSort: function (row) {
                this.$prompt('请输入序号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'homepage/keyword/sort',
                            'ids': row.kid,
                            'k_sort': value
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getKeywordList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定'
                        }).then(() => { }).catch(() => { })
                        return false;
                    }

                }).catch(() => { })
            },
            keywordDel: function (row) {
                this.$confirm('您确定要删除该搜索词?', '提示', {
                    confirmButtonText: '确定',
                }).then(() => {
                    ApiService.post({
                        'ext': 'homepage/keyword/delete',
                        'ids': row.kid
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        })
                        this.listLoading = true;
                        this.getKeywordList();
                    })
                }).catch(() => { })
            },
            batchSelect: function (checkList) {
                this.keywordId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.keywordId.push(checkList[i].kid);
                }

            },
            batchDel: function () {
                if (this.keywordId.length > 0) {
                    var _delId = this.keywordId.join(',');
                    this.$confirm('您确定要删除搜索词?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'homepage/keyword/delete',
                            'ids': _delId
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            })
                            this.listLoading = true;
                            this.getKeywordList();
                        })
                    }).catch(() => { })
                } else {
                    this.$confirm('请勾选需要删除的搜索词', '提示', {
                        confirmButtonText: '确定',
                    }).catch(() => { });
                }

            },
            keywordCurrentChange: function (val) {
                this.pageNum = val;
                this.getKeywordList();
            }
        }
    }

</script>