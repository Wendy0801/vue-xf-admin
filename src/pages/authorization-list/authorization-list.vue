<template>
    <div>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入权限名称" v-model="searchKey">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getAuthList">查询</el-button>
                    <el-button type="primary" @click="showAuthModal({})">新建</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="authList" stripe style="width: 100%" v-loading="listLoading">
            <el-table-column label="序号" width="70">
                <template scope="scope">
                    <span>{{scope.$index+1+(pIndex-1)*pSize}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="powerName" label="权限名称">
            </el-table-column>
            <el-table-column prop="powerPath" label="权限路径">
            </el-table-column>
            <el-table-column prop="powerRemark" label="备注">
            </el-table-column>
            <el-table-column label="操作" class="action-col">
                <template scope="scope">
                    <div class="form-action">
                        <el-button size="small" type="text" @click="showAuthModal(scope.row)">编辑</el-button>
                        <el-button size="small" type="text" @click="deleteAuthRule(scope.row.powerId)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination @current-change="handleCurrentChange" :current-page="pIndex" :page-size="pSize" layout="total, prev, pager, next, jumper"
                :total="authTotal">
                </el-pagination>
        </el-col>

        <!--编辑权限-->
        <el-dialog :title="editFormTtile" v-model="authEditFormVisible" @close="authEditCancel">
            <el-form :model="authForm" label-width="100px" :rules="authFormRules" ref="authForm">
                <el-form-item label="分类名称" prop="powerName">
                    <el-input v-model="authForm.powerName"></el-input>
                </el-form-item>
                <el-form-item label="路径配置" prop="powerPath">
                    <el-input v-model="authForm.powerPath"></el-input>
                </el-form-item>
                <el-form-item label="一级菜单">
                    <el-select v-model="firstMenuValue" placeholder="请选择二级菜单" @change="getSecondMenu(firstMenuValue)">
                        <el-option v-for="item in firstMenuList" :label="item.powerName" :value="item.powerId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级菜单">
                    <el-select v-model="secondMenuValue" placeholder="请选择二级菜单" @change="getecondId(secondMenuValue)">
                        <el-option v-for="item in secondMenuList" :label="item.powerName" :value="item.powerId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="powerRemark">
                    <el-input v-model="authForm.powerRemark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="authEditCancel">取 消</el-button>
                <el-button type="primary " @click="authEditSumbit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
    export default {
        data() {
            return {
                authList: [],
                firstMenuList: [],
                secondMenuList: [],
                pIndex: 1,
                pSize: 10,
                authTotal: 0,
                authEditFormVisible: false,
                searchKey: '',
                editFormTtile: '编辑权限',
                authForm: {
                },
                authFormRules: {
                    powerName: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
                    powerPath: [{ required: true, message: '请填写权限Url路径分配', trigger: 'blur' }],
                },
                firstMenuValue: '',
                secondMenuValue: '',
                listLoading: false
            }
        },
        mounted() {
            this.getAuthList();
            this.getFirstMenuList();
        },
        methods: {
            // search(){

            // },
            getFirstMenuList: function () {
                ApiService.get({
                    'ext': 'system/power/readList',
                    'power_pid': 0
                }).then(res => {
                    this.firstMenuList = res.data.data;
                })
            },
            getSecondMenu: function (value) {
                this.authForm.power_pid = value;
                ApiService.get({
                    'ext': 'system/power/readList',
                    'power_pid': value
                }).then(res => {
                    this.secondMenuList = res.data.data;
                })
            },
            getecondId: function (value) {
                this.authForm.power_pid = value;
            },
            getAuthList() {
                let _reqData = {
                    'ext': 'system/power/page',
                    'pageNum': this.pIndex,
                    'pageSize': this.pSize,
                }
                if (this.searchKey) {
                    _reqData = Object.assign(_reqData, {
                        'power_name': this.searchKey
                    })
                }
                ApiService.post(_reqData)
                    .then(res => {
                        this.authList = res.data.data.list;
                        this.authTotal = res.data.data.total;
                    })

                this.listLoading = false;
            },
            handleCurrentChange(index) {
                this.pIndex = index;
                this.getAuthList();
            },
            showAuthModal(authInfo) {
                this.authEditFormVisible = true;
                this.authForm = authInfo;
                this.firstMenuValue = '';
                this.secondMenuValue = '';
            },
            authEditCancel() {
                this.authEditFormVisible = false;
            },
            addAuthRule() {
                ApiService.post({
                    'ext': 'system/power/add',
                    'power_pid': this.authForm.power_pid ? this.authForm.power_pid : 0,
                    'power_name': this.authForm.powerName,
                    'power_path': this.authForm.powerPath,
                    'power_remark': this.authForm.powerRemark
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.authEditFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getAuthList();
                        }
                        else {
                            this.$notify({
                                title: '失败',
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    })
            },
            eidtAuthRule() {
                ApiService.put({
                    'ext': 'system/power/edit',
                    'power_id': this.authForm.powerId,
                    'power_pid': this.authForm.power_pid ? this.authForm.power_pid : 0,
                    'power_name': this.authForm.powerName,
                    'power_path': this.authForm.powerPath,
                    'power_remark': this.authForm.powerRemark
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.authEditFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getAuthList();
                        }
                        else {
                            this.$notify({
                                title: '失败',
                                message: '编辑失败',
                                type: 'error'
                            });
                        }
                    })
            },
            authEditSumbit() {
                this.$refs.authForm.validate((isValid) => {
                    if (isValid) {
                        if (this.authForm.powerId) {
                            this.eidtAuthRule();
                        }
                        else {
                            this.addAuthRule();
                        }
                    }
                })
            },
            deleteAuthRule(id) {
                ApiService.post({
                    'ext': 'system/power/delete',
                    'ids': `${id}`
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getAuthList();
                        }
                        else {
                            this.$notify({
                                title: '失败',
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                    })
            }
        }
    }

</script>