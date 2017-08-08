<template>
    <section>
        <!--工具栏-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入敏感词关键字" v-model="swSensitive" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="demonstration">添加人:</span>
                    <el-select v-model="userId" placeholder="请选择添加人">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in userList" :label="item.ename" :value="item.eid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span class="demonstration">敏感级别:</span>
                    <el-select v-model="swLevel" placeholder="请选择级别">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in levelList" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span class="demonstration">类别:</span>
                    <el-select v-model="swCategory" placeholder="请选择级别">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in categorList" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getSensitiveWords">查询</el-button>
                    <el-button type="primary" @click="sensitiveWordAdd">新增敏感词</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table stripe :data="sensitiveWordsList" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection" width="80">
                </el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="swSensitive" label="敏感词">
                </el-table-column>
                <el-table-column prop="userName" label="添加人">
                </el-table-column>
                <el-table-column label="敏感级别">
                    <template scope="scope">
                        <span v-for="item in levelList" v-if="item.value === scope.row.swLevel">{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类别">
                    <template scope="scope">
                        <span v-for="item in categorList" v-if="item.value === scope.row.swCategory">{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="swSource" label="来源">
                </el-table-column>
                <el-table-column prop="swCreateTime" label="添加时间">
                </el-table-column>
                <el-table-column prop="swUpdateTime" label="更新时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="sensitiveWordEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="sensitiveWordDel(scope.row.swId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination layout="total,prev,pager,next,jumper" :total="total" style="float: right" @current-change="sensitivCurrentChange"></el-pagination>
        </el-col>
        <!--编辑界面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" @close="editCancel">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="敏感词" prop="sw_sensitive">
                    <el-input v-model="editForm.sw_sensitive"></el-input>
                </el-form-item>
                <el-form-item label="添加人" prop="user_id">
                    <el-select v-model="editForm.user_id" placeholder="请选择添加人">
                        <el-option v-for="item in userList" :label="item.ename" :value="item.eid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述说明" prop="sw_desc">
                    <el-input v-model="editForm.sw_desc"></el-input>
                </el-form-item>
                <el-form-item label="敏感级别" prop="sw_level">
                    <el-select v-model="editForm.sw_level" placeholder="请选择级别">
                        <el-option v-for="item in levelList" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别" prop="sw_category">
                    <el-select v-model="editForm.sw_category" placeholder="请选择类别">
                        <el-option v-for="item in categorList" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源" prop="sw_source">
                    <el-input v-model="editForm.sw_source"></el-input>
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
        name: 'sensitiveWords',
        data() {
            return {
                sensitiveWordsList: [],
                sensitiveId: [],
                swSensitive: '',
                userId: '',
                swLevel: '',
                swCategory: '',
                userList: [],
                levelList: [
                    { name: '一级', value: 1 },
                    { name: '二级', value: 2 },
                    { name: '三级', value: 3 },
                    { name: '四级', value: 4 },
                    { name: '五级', value: 5 },
                ],
                categorList: [
                    { name: '政治类', value: 1 },
                    { name: '色情类', value: 2 },
                    { name: '侵权类', value: 3 },
                    { name: '其他', value: 4 },
                ],
                total: 0,
                pageNum: 1,
                pageSize: 10,
                editFormTtile: '编辑',
                editFormVisible: false,
                editForm: {
                    sw_id: '',
                    sw_sensitive: '',
                    user_id: '',
                    sw_desc: '',
                    sw_level: '',
                    sw_category: '',
                    sw_source: ''
                },
                listLoading: false,
                editFormRules: {
                    sw_sensitive: [
                        { required: true, message: '请填写敏感词名称', trigger: 'blur' },
                    ],
                    user_id: [
                        { required: true, message: '请选择添加人' },
                    ],
                    sw_desc: [
                        { required: true, message: '请填写描述说明', trigger: 'blur' },
                    ],
                    sw_level: [
                        { required: true, message: '请选择敏感级别' },
                    ],

                    sw_category: [
                        { required: true, message: '请选择敏感级别' },
                    ],
                    sw_source: [
                        { required: true, message: '请填写来源', trigger: 'blur' },
                    ]
                }
            }
        },
        mounted: function () {
            this.getSensitiveWords();
            this.getUser();
        },
        methods: {
            getSensitiveWords: function () {
                ApiService.post({
                    'ext': 'sensitive/word/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'sw_sensitive': this.swSensitive,
                    'user_id': this.userId,
                    'sw_level': this.swLevel,
                    'sw_category': this.swCategory
                }).then(res => {
                    if (res.data.code == 1) {
                        console.log(res);
                        this.sensitiveWordsList = res.data.data.list;
                        this.total = res.data.data.total;
                    } else {
                        this.$notify({
                            title: '失败',
                            message: 'res.data.msg',
                            type: 'error'
                        })
                    }
                    this.listLoading = false;
                })
            },
            getUser: function () {
                ApiService.get({
                    'ext': 'editor/readList',
                }).then(res => {
                    this.userList = res.data.data;
                })
            },
            allList: function () {
                if (!this.swSensitive) {
                    this.getSensitiveWords();
                }
            },
            sensitiveWordAdd: function () {
                this.editFormVisible = true;
                this.editForm = {
                    sw_id: '',
                    sw_sensitive: '',
                    user_id: '',
                    sw_desc: '',
                    sw_level: '',
                    sw_category: '',
                    sw_source: ''
                };
            },
            sensitiveWordEdit: function (row) {
                this.editFormVisible = true;
                this.editForm = {
                    sw_id: row.swId,
                    sw_sensitive: row.swSensitive,
                    user_id: row.userId,
                    sw_desc: row.swDesc,
                    sw_level: row.swLevel,
                    sw_category: row.swCategory,
                    sw_source: row.swSource
                };
            },
            editCancel: function () {
                this.editFormVisible = false;
                this.$refs.editForm.resetFields();
            },
            editSumbit: function () {
                this.$refs.editForm.validate((vallid) => {
                    if (vallid) {
                        if (this.editForm.sw_id == '') {
                            ApiService.post({
                                'ext': 'sensitive/word/add',
                                'sw_sensitive': this.editForm.sw_sensitive,
                                'user_id': this.editForm.user_id,
                                'sw_desc': this.editForm.sw_desc,
                                'sw_level': this.editForm.sw_level,
                                'sw_category': this.editForm.sw_category,
                                'sw_source': this.editForm.sw_source,
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '成功',
                                        message: '添加成功',
                                        type: 'success'
                                    })
                                    this.editFormVisible = false;
                                    this.listLoading = true;
                                    this.getSensitiveWords();
                                } else {
                                    this.$notify({
                                        title: '失败',
                                        message: res.data.msg,
                                        type: 'error'
                                    })
                                }
                            })
                        } else {
                            ApiService.put({
                                'ext': 'sensitive/word/edit',
                                'sw_id': this.editForm.sw_id,
                                'sw_sensitive': this.editForm.sw_sensitive,
                                'user_id': this.editForm.user_id,
                                'sw_desc': this.editForm.sw_desc,
                                'sw_level': this.editForm.sw_level,
                                'sw_category': this.editForm.sw_category,
                                'sw_source': this.editForm.sw_source,
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '成功',
                                        message: '操作成功',
                                        type: 'success'
                                    })
                                    this.listLoading = true;
                                    this.getSensitiveWords();
                                    this.editFormVisible = false;
                                } else {
                                    this.$notify({
                                        title: '失败',
                                        message: res.data.msg,
                                        type: 'error'
                                    })
                                }

                            })
                        }
                    } else {
                        return false;
                    }

                })
            },
            sensitiveWordDel: function (ids) {
                this.$confirm('您确定要删除评论?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'sensitive/word/delete',
                        'ids': ids
                    }).then(res => {
                        if (res.data.code == 1) {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            })
                            this.listLoading = true;
                            this.getSensitiveWords();
                            this.editFormVisible = false;
                        } else {
                            this.$notify({
                                title: '失败',
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    })
                }).catch(() => { })
            },
            batchSelect: function (value) {
                this.sensitiveId = [];
                for (var i = 0; i < value.length; i++) {
                    this.sensitiveId.push(value[i].swId)
                }
                console.log(this.sensitiveId);
            },
            batchDel: function () {
                var ids = this.sensitiveId.join(',');
                this.sensitiveWordDel(ids);
            },
            sensitivCurrentChange: function (value) {
                this.pageNum = value;
                this.getSensitiveWords();
            }
        }
    }

</script>