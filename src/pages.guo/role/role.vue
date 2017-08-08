<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="roleAdd">新增角色</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table stripe :data="roleList" v-loading="listLoading">
                <el-table-column type="index" width="100" label="序号">
                </el-table-column>
                <el-table-column label="角色类型" prop="roleName">
                    </label>></el-table-column>
                <el-table-column label="备注说明" prop="roleRemark">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="roleEdit(scope.row)">编辑权限</el-button>
                        <el-button type="text" @click="roleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" :total="total" style="float: right" @current-change="roleCurrentChange"></el-pagination>
        </el-col>

        <!--新增页面-->
        <el-dialog title="新增角色" v-model="editFormAdd" @close="editCancel">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="角色类型名称" prop="role_name">
                    <el-input v-model="editForm.role_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注说明" prop="role_remark">
                    <el-input v-model="editForm.role_remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary " @click="AddSumbit">确 定</el-button>
            </div>
        </el-dialog>

        <!--编辑页面-->
        <el-dialog title="编辑权限" v-model="editFormVisible" @close="editCancel">
            <template>
                <!--<el-checkbox v-model="checkAll" @change="powerCheckAllChange">全选</el-checkbox>-->
                <!--<div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedPower" @change="powerCheckedChange">
                    <el-checkbox v-for="power in powerList" :label="power.powerId">{{power.powerName}}</el-checkbox>
                </el-checkbox-group>-->

                <el-tree :data="arr" show-checkbox="" default-expand-all node-key="powerId" ref="tree" :props="defaultProps" :default-checked-keys="power">
                </el-tree>
            </template>
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
                roleList: [],
                powerList: [],
                pageSize: 10,
                pageNum: 1,
                total: 0,
                listLoading: false,
                editFormVisible: false,
                editFormTtile: '编辑',
                checkAll: false,
                roleId: '',
                editFormAdd: false,
                editForm: {
                    'role_name': '',
                    'role_remark': ''
                },
                editFormRules: {
                    role_name: [
                        { required: true, message: '请填写角色类型', trigger: 'blur' }
                    ],
                    role_remark: [
                        { required: true, message: '请填写备注说明', trigger: 'blur' }
                    ]
                },
                arr: [],
                power: [],
                defaultProps: {
                    children: 'children',
                    label: 'powerName'
                }
            }
        },
        mounted: function () {
            this.getRoleList();
            this.getPowerList();
        },
        methods: {
            getPowerFirst: function () {
                var first = [];
                for (var i = 0; i < this.powerList.length; i++) {
                    if (this.powerList[i].powerPid === 0) {
                        first.push({
                            'powerId': this.powerList[i].powerId,
                            'powerName': this.powerList[i].powerName,
                        })
                    }
                }
                this.getPowerSecond(first);
            },
            getPowerSecond: function (first) {
                var second = [];
                for (var index = 0; index < first.length; index++) {
                    second = [];
                    for (var i = 0; i < this.powerList.length; i++) {
                        if (this.powerList[i].powerPid === first[index].powerId) {
                            second.push({
                                'powerId': this.powerList[i].powerId,
                                'powerName': this.powerList[i].powerName,
                            })
                        }
                    }
                    first[index] = Object.assign(first[index], {
                        'children': second
                    })
                }

                this.getPowerThird(first);
            },
            getPowerThird: function (first) {
                var third = [];
                for (var index = 0; index < first.length; index++) {
                    for (var j = 0; j < first[index].children.length; j++) {
                        third = [];
                        for (var i = 0; i < this.powerList.length; i++) {
                            if (this.powerList[i].powerPid === first[index].children[j].powerId) {
                                third.push({
                                    'powerId': this.powerList[i].powerId,
                                    'powerName': this.powerList[i].powerName,
                                })
                            }
                        }
                        first[index].children[j] = Object.assign(first[index].children[j], {
                            'children': third
                        })
                    }
                }

                this.arr = first;
            },

            getRoleList: function () {
                // 获取分类列表
                ApiService.post({
                    'ext': 'system/role/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }).then(res => {
                    this.roleList = res.data.data.list;
                    this.total = res.data.data.total;
                })
                this.listLoading = false;
            },
            getPowerList: function () {
                ApiService.get({
                    'ext': 'system/power/readList',
                }).then(res => {
                    this.powerList = res.data.data;
                })

                setTimeout(() => { this.getPowerFirst() }, 500);
            },
            roleEdit: function (row) {
                // 编辑
                this.roleId = row.roleId;
                this.power = [];
                ApiService.get({
                    'ext': 'system/role/power/readList',
                    'role_id': row.roleId
                }).then(res => {
                    var data = res.data.data;
                    for (var i = 0; i < data.length; i++) {
                        this.power.push(data[i].powerId);
                    }
                    console.log(this.power);
                })

                setTimeout(() => {
                    this.editFormVisible = true;
                    this.editFormTtile = '编辑权限';
                }, 100)

            },
            roleAdd: function () {
                this.editFormAdd = true;
                this.editForm = {
                    'role_name': '',
                    'role_remark': ''
                }
            },
            AddSumbit: function () {
                this.$refs.editForm.validate((vaild) => {
                    if (vaild) {
                        ApiService.post({
                            'ext': 'system/role/add',
                            'role_name': this.editForm.role_name,
                            'role_remark': this.editForm.role_remark
                        }).then(() => {
                            this.editFormAdd = false;
                            this.listLoading = true;
                            this.getRoleList();
                        }).catch(() => { })
                    } else {
                        this.$alert('信息填写不完整!', '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                        return false;
                    }
                });

            },
            roleDel: function (row) {
                this.$confirm('您确定要删除该角色', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'system/role/delete',
                        'ids': row.roleId
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.listLoading = true;
                        this.getRoleList();
                    })
                }).catch(() => { })

            },
            powerCheckedChange: function (value) {
            },
            // powerCheckAllChange: function (event) {
            //     if (event.target.checked) {
            //         for (var i = 0; i < this.powerList.length; i++) {
            //             this.checkedPower.push(this.powerList[i].powerId);
            //         }
            //     } else {
            //         this.checkedPower = [];
            //     }
            // },
            editSumbit: function () {
                this.editFormVisible = false;

                var powerId = this.$refs.tree.getCheckedKeys().join(',');
                ApiService.put({
                    'ext': 'system/role/power/edit',
                    'role_id': this.roleId,
                    'power_id': powerId
                }).then(res => {
                    this.$notify({
                        title: '成功',
                        message: '操作成功',
                        type: 'success'
                    });
                    this.listLoading = true;
                    this.getRoleList();
                })

            },
            editCancel: function () {
                this.editFormVisible = false;
            },
            roleCurrentChange: function (val) {
                this.pageNum = val;
                this.getRoleList(this.pageNum);
            },

        }
    }

</script>