<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="userAdd">新增用户</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table stripe :data="userList" v-loading="listLoading">
                <el-table-column type="index" width="100" label="序号">
                </el-table-column>
                <el-table-column label="用户名" prop="userName">
                </el-table-column>
                <el-table-column label="手机号" prop="phone">
                </el-table-column>
                <el-table-column label="角色">
                    <template scope="scope">
                        <span v-for="(item, index) in scope.row.roles">{{item.roleName}},</span>
                    </template>
                </el-table-column>
                </el-table-column>
                <el-table-column label="状态" prop="state">
                    <template scope="scope"><span>{{scope.row.state==1?'冻结':'解冻'}}</span></template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="roleEdit(scope.row)">配置角色类型</el-button>
                        <el-button type="text" @click="statusOper(scope.row)">{{scope.row.state==1?'解冻':'冻结'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" :total="total" style="float: right" @current-change="userCurrentChange"></el-pagination>
        </el-col>
        <!--新增页面-->
        <el-dialog title="新增" v-model="editFormAdd" @close="editCancel">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model="editForm.user_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="avatar">
                    <!--<el-input v-model="editForm.avatar" auto-complete="off"></el-input>-->
                    <template>
                        <!--<img :src="editForm.avatar" alt="" id="bannerImg" style="display:none;">-->
                        <img v-show="editForm.avatar" :src="editForm.avatar" alt="">
                    </template>
                    <el-upload :action="uploadUrl" :on-success="UploadImgSucess">
                        <el-button size="small" type="primary" style="margin-top: 12px">上传用户头像</el-button>
                    </el-upload>
                </el-form-item prop="area">
                <el-form-item label="地区">
                    <el-input v-model="editForm.area" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="个性签名" prop="signature">
                    <el-input v-model="editForm.signature" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch on-text="冻结" off-text="解冻" v-model="editForm.state"></el-switch>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <template>
                        <el-radio class="radio" v-model="editForm.gender" label="1">男</el-radio>
                        <el-radio class="radio" v-model="editForm.gender" label="2">女</el-radio>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary " @click="AddSumbit">确 定</el-button>
            </div>
        </el-dialog>


        <!--编辑角色-->
        <el-dialog title="编辑角色" v-model="editFormVisible" @close="editCancel">
            <template>
                <!--<el-checkbox v-model="checkAll" @change="roleCheckAllChange">全选</el-checkbox>-->
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedRole" @change="roleCheckedCitiesChange">
                    <el-checkbox v-for="role in roleList" :label="role.roleId">{{role.roleName}}</el-checkbox>
                </el-checkbox-group>
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
                userList: [],
                roleList: [],
                name: '',
                pageSize: 10,
                pageNum: 1,
                total: 0,
                listLoading: false,
                editFormVisible: false,
                editFormAdd: false,
                checkedRole: [],
                checkAll: false,
                userId: '',
                editForm: {
                    'user_name': '',
                    'password': '',
                    'phone': '',
                    'avatar': '',
                    'area': '',
                    'signature': '',
                    'state': true,
                    'gender': ''
                },
                editFormRules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    avatar: [
                        { required: true, message: '请上传用户头像' }
                    ],

                    area: [
                        { required: true, message: '请填写地区' }
                    ],
                    gender: [
                        { required: true, message: '请选择用户性别' }
                    ]
                },
                uploadUrl: ApiService.getUploadUrl(),
            }
        },
        mounted: function () {
            this.getUserList();
            this.getRoleList();
        },
        methods: {
            getUserList: function () {
                // 获取分类列表
                ApiService.get({
                    'ext': 'system/user/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }).then(res => {
                    this.userList = res.data.data.list;
                    this.total = res.data.data.total;
                })
                this.listLoading = false;
            },
            getRoleList: function () {
                ApiService.get({
                    'ext': 'system/role/readList'
                }).then(res => {
                    console.log(res);
                    this.roleList = res.data.data;
                    console.log(this.roleList);
                })
            },
            roleEdit: function (row) {
                console.log(row);
                // 编辑
                this.editFormVisible = true;

                ApiService.get({
                    'ext': 'system/user/role/readList',
                    'user_id': row.userId
                }).then(res => {
                    this.checkedRole = [];
                    console.log(res.data.data);
                    var data = res.data.data;
                    for (var i = 0; i < data.length; i++) {
                        this.checkedRole.push(data[i].roleId);
                    }

                })

                this.userId = row.userId;
            },
            statusOper: function (row) {
                console.log(row)
                if (row.state == 1) {
                    this.$confirm('您确定要解冻该用户', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.put({
                            'ext': 'system/user/state',
                            'ids': row.userId,
                            'state': 0
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getUserList();
                        })
                    }).catch(() => { })

                } else {

                    this.$confirm('您确定要冻结该用户', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.put({
                            'ext': 'system/user/state',
                            'ids': row.userId,
                            'state': 1
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getUserList();
                        })
                    }).catch(() => { })
                }


            },
            editCancel: function () {
                this.editFormVisible = false;
            },
            userCurrentChange: function (val) {
                this.pageNum = val;
                this.getUserList(this.pageNum);
            },
            roleCheckedCitiesChange: function () {
                console.log(this.checkedRole);
            },
            roleCheckAllChange: function (event) {
                if (event.target.checked) {
                    for (var i = 0; i < this.roleList.length; i++) {
                        this.checkedRole.push(this.roleList[i].roleId);
                    }
                } else {
                    this.checkedRole = [];
                }
            },
            userAdd: function () {
                this.editFormAdd = true;
                this.editForm = {
                    'user_name': '',
                    'password': '',
                    'phone': '',
                    'avatar': '',
                    'area': '',
                    'signature': '',
                    'state': '',
                    'gender': ''
                }
            },
            AddSumbit: function () {
                this.$refs.editForm.validate((vaild) => {
                    if (vaild) {
                        ApiService.post({
                            'ext': 'system/user/add',
                            'user_name': this.editForm.user_name,
                            'password': this.editForm.password,
                            'phone': this.editForm.phone,
                            'avatar': this.editForm.avatar,
                            'area': this.editForm.area,
                            'signature': this.editForm.signature,
                            'state': this.editForm.state ? 1 : 0,
                            'gender': this.editForm.gender
                        }).then(() => {
                            this.editFormAdd = false;
                            this.listLoading = true;
                            this.getUserList();
                        })
                    } else {
                        this.$alert('信息填写不完整!', '提示', {
                            confirmButtonText: '确定'
                        }).catch(() => { })
                        return false;
                    }


                })
            },
            editSumbit: function () {
                this.editFormVisible = false;
                var _role = this.checkedRole.join(',');
                ApiService.put({
                    'ext': 'system/user/role/edit',
                    'user_id': this.userId,
                    'role_id': _role
                }).then(res => {
                    this.$notify({
                        title: '成功',
                        message: '操作成功',
                        type: 'success'
                    });
                    this.listLoading = true;
                    this.getUserList();
                })

            },
            UploadImgSucess: function (response, file) {
                this.editForm.avatar = response.url;
            }

        }
    }

</script>
<style>
    .el-form-item img {
        width: 100px;
    }
</style>