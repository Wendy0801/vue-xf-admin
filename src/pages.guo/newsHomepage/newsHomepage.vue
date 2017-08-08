<template>
    <section>

        <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="待设置列表" name="first">
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input placeholder="输入关键字" v-model="info_title" @change="allList"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getNewList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--//表格列表-->
                <template>
                    <el-table :data="newsList" stripe style="width: 100%;" v-loading="listLoading">
                        <el-table-column prop="sequenceNumber" width="100" label="序号">
                        </el-table-column>
                        <el-table-column label="文章标题" width="200">
                            <template scope="scope">
                                <div :title="scope.row.infoTitle">{{scope.row.infoTitle}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="infoTypeName" label="文章分类">
                        </el-table-column>
                        <el-table-column prop="infoLableName" label="文章标签">

                        </el-table-column>
                        <el-table-column label="是否显示">
                            <template scope="scope">
                                {{scope.row.ihDisplay===1?"是":"否"}}
                            </template>
                        </el-table-column>
                        <el-table-column inline-template :context="_self" label="设为主页内容">
                            <span>
                        <el-button size="small"   type="text" @click="setNews(row)">设为主页内容</el-button>
                    </span>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="已设置列表" name="second">
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input placeholder="输入关键字" v-model="info_title" @change="allList"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getNewList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--//表格列表-->
                <template>
                    <el-table :data="newsList" stripe style="width: 100%;" v-loading="listLoading">
                        <el-table-column prop="sequenceNumber" width="100" label="序号">
                        </el-table-column>
                        <el-table-column label="文章标题" width="200">
                            <template scope="scope">
                                <div :title="scope.row.infoTitle">{{scope.row.infoTitle}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ihUrl" label="url">
                        </el-table-column>
                        <el-table-column prop="ihParams" label="参数">
                        </el-table-column>
                        <el-table-column label="是否显示">
                            <template scope="scope">
                                {{scope.row.ihDisplay===1?"是":"否"}}
                            </template>
                        </el-table-column>
                        <el-table-column label="排序管理">
                            <template scope="scope">
                                <el-input :value="scope.row.infoSort" @focus="changeSort(scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column inline-template :context="_self" label="操作">
                            <span>
                     <el-button type="text" @click="newsEdit(row)">编辑</el-button>
                     <el-button type="text" @click="newsDisplay(row)">移除</el-button>
                </span>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>

        </el-tabs>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="newsCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>


        <!--编辑界面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" @close="editCancel">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="文章标题">
                    <el-input v-model="editForm.info_title" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="ih_url">
                    <el-input v-model="editForm.ih_url" auto-complete="off" @change="preview"></el-input>
                </el-form-item>
                <el-form-item label="参数" prop="ih_params">
                    <el-input v-model="editForm.ih_params" auto-complete="off" @change="preview"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="editForm.preview" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
            </div>
        </el-dialog>
    </section>
</template>



<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'banner',
        data() {
            return {
                activeName: 'first',
                newsList: [],
                categorylList: [],
                info_title: '',
                info_homepage: 0,
                total: 0,
                pageNum: 1,
                listLoading: true,
                editFormVisible: false, //编辑界面显是否显示
                editFormTtile: '编辑', //编辑界面标题
                pSize: 10,
                userId: '',
                userName: '',
                //编辑界面数据
                editForm: {
                    info_id: '',
                    info_title: '',
                    ih_url: '',
                    ih_params: '',
                    preview: '',
                },
                editLoading: false,
                btnEditText: '提 交',
                editFormRules: {
                    ih_url: [
                        { required: true, message: '请输入url', trigger: 'blur' }
                    ],
                    ih_params: [
                        { required: true, message: '请输入url', trigger: 'blur' }
                    ]
                }

            }
        },
        computed: {},
        mounted: function () {
            this.getNewList();
            this.getSessionID();
        },
        methods: {
            getSessionID: function () {
                ApiService.get({
                    'ext': 'system/session/info',
                    'ss_id': sessionStorage.getItem('ssId')
                }).then(res => {
                    this.userId = res.data.data.ssUserId;
                    this.userName = res.data.data.ssUserName;
                })
            },
            getNewList() {
                ApiService.post({
                    'ext': 'homepage/information/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'info_title': this.info_title,
                    'info_homepage': this.info_homepage,
                })
                    .then(res => {
                        console.log(res.data);
                        this.newsList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },
            allList: function () {
                if (!this.info_title) {
                    this.getNewList();
                }
            },
            changeTab(tab, event) {
                console.log(tab, event);
                if (tab.index == 0) {
                    this.info_homepage = 0;
                    this.getNewList();
                } else {
                    this.info_homepage = 1;
                    this.getNewList();
                }
            },
            setNews: function (row) {
                console.log(row);
                this.$confirm('您确定设置为主页资讯?', '确定', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.put({
                        'ext': 'homepage/information/info_homepage',
                        'ids': row.infoId,
                        'info_homepage': 1,
                        'user_id': this.userId,
                        'user_name': this.userName
                    }).then(res => {
                        this.listLoading = true;
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getNewList();
                    })

                }).catch(() => { })
            },
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        ApiService.put({
                            'ext': 'homepage/information/edit',
                            'info_id': this.editForm.info_id,
                            'ih_url': this.editForm.ih_url,
                            'ih_params': this.editForm.ih_params,

                        })
                            .then(res => {
                                this.editFormVisible = false;
                                this.listLoading = true;
                                this.$notify({
                                    title: '成功',
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.getNewList();
                            })

                    } else {
                        return false;
                    }
                })
            },
            editCancel: function () {
                this.editFormVisible = false;
                this.$refs.editForm.resetFields();
            },
            newsDisplay(row) {
                console.log(row);
                this.$confirm('您确定要移除该条主页资讯?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {

                    ApiService.put({
                        'ext': 'homepage/information/info_homepage',
                        'ids': row.infoId,
                        'info_homepage': 0,
                        'user_id': this.userId,
                        'user_name': this.userName
                    })
                        .then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getNewList();
                        })

                }).catch(() => { })
            },
            newsCurrentChange(val) {
                this.pageNum = val;
                this.getNewList();

            },
            newsEdit(row) {
                console.log(row);
                this.editFormVisible = true;
                this.editFormTtile = '编辑';

                this.editForm.info_id = row.infoId;
                this.editForm.info_title = row.infoTitle;
                this.editForm.ih_url = row.ihUrl,
                    this.editForm.ih_params = row.ihParams;
                if (row.ihUrl + row.ihParams) {
                    this.editForm.preview = row.ihUrl + row.ihParams;
                } else {
                    this.editForm.preview = '';
                }

            },
            changeSort: function (row) {
                console.log(row);
                this.$prompt('请输入序列号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'homepage/information/info_sort',
                            'ids': row.infoId,
                            'info_sort': value
                        }).then(res => {
                            this.listLoading = true;
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.getNewList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定'
                        }).then(() => { }).catch(() => { })
                        return false;
                    }

                }).catch(() => { })
            },
            preview: function () {
                // this.editForm.ih_url = this.editForm.ih_url.replace('？', '?');
                this.editForm.preview = this.editForm.ih_url + this.editForm.ih_params
            }
        },
    }

</script>
<style>

</style>