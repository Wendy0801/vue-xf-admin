<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="输入用户名" v-model="cust_name" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="demonstration">用户来源:</span>
                    <el-select v-model="acti_id" placeholder="请选择用户来源">
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item.actiTitle" :value="item.actiId" v-for="item in source"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getSignList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--//表格列表-->
        <template>
            <el-table :data="signList" stripe style="width: 100%;" v-loading="listLoading">
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="custId" label="用户ID" width="200">
                </el-table-column>
                <el-table-column prop="playId" label="选手ID" width="200">
                </el-table-column>
                <el-table-column prop="custName" label="用户名" width="150">
                </el-table-column>
                <el-table-column prop="custMobile" label="手机号">
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间">
                </el-table-column>
                <el-table-column prop="updateTime" label="报名时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="text" @click="signEdit(scope.row)">查看用户信息</el-button>
                        <el-button type="text" size="small" @click="signStatus(scope.row)" v-if="scope.row.playStatus==0">冻结</el-button>
                        <el-button type="text" size="small" @click="signStatus(scope.row)" v-if="scope.row.playStatus==1">删除</el-button>
                        <el-button type="text" size="small" @click="signStatus(scope.row)" v-if="scope.row.playStatus==2">解冻</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="signCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px">
                <el-form-item label="用户ID">
                    <el-input v-model="editForm.custId" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="">
                    <el-input v-model="editForm.custName" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="editForm.custMobile" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-input v-model="editForm.createTime" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="报名时间">
                    <el-input v-model="editForm.updateTime" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="editForm.playStatus" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="editFormVisible = false" :loading="editLoading">{{btnEditText}}</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'sign',
        data() {
            return {
                signList: [],
                source: [],
                cust_name: '',
                acti_id: this.$route.params['actiId']||'',
                total: 0,
                pageNum: 1,
                listLoading: true,
                editFormVisible: false, //编辑界面显是否显示
                editFormTtile: '编辑', //编辑界面标题
                pSize: 10,
                statusBtn: '',
                //编辑界面数据
                editForm: {
                    playId: '',
                    custName: '',
                    custMobile: '',
                    createTime: '',
                    updateTime: '',
                    playStatus: ''

                },
                editLoading: false,
                btnEditText: '确 定',

            }
        },
        computed: {
            // currentsignList :function(){
            //     return this.Lists.slice((this.page-1)*this.pSize,this.page*this.pSize) ; 
            // }
        },
        mounted: function () {
            this.getSignList();
            this.sourceList();
        },
        methods: {
            getSignList(pIndex = 1) {
                ApiService.post({
                    'ext': 'homepage/player/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'cust_name': this.cust_name,
                    'acti_id': this.acti_id
                })
                    .then(res => {
                        console.log(res.data);
                        this.signList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },
            sourceList: function () {
                ApiService.get({
                    'ext': 'activity/readList',
                }).then(res => {
                    console.log(res);
                    this.source = res.data.data;
                })
            },
            allList: function () {
                if (!this.cust_name) {
                    this.getSignList();
                }
            },
            signStatus(row) {
                console.log(row);
                if (row.playStatus == 0) {
                    if (row.playHomepage == 1) {
                        this.$confirm('您冻结的用户已设置为主页选手,无法冻结', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                        }).then(() => { }).catch(() => { })
                    } else {
                        this.$confirm('您确定要冻结该用户', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                        }).then(() => {
                            ApiService.put({
                                'ext': 'activity/second-talent-show-sign-up/play_status',
                                'ids': row.playId,
                                'play_status': 2
                            }).then(res => {
                                if (res.data.code == 1) {
                                    this.$notify({
                                        title: '成功',
                                        message: '操作成功',
                                        type: 'success'
                                    })
                                    this.listLoading = true;
                                    this.getSignList();
                                } else {
                                    this.$notify({
                                        title: '失败',
                                        message: res.data.msg,
                                        type: 'error'
                                    })
                                }
                            })
                        }).catch(() => { })
                    }
                } else {
                    this.$confirm('您确定要解冻该用户', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.put({
                            'ext': 'activity/second-talent-show-sign-up/play_status',
                            'ids': row.playId,
                            'play_status': 0
                        }).then(res => {
                            if (res.data.code == 1) {
                                this.$notify({
                                    title: '成功',
                                    message: '操作成功',
                                    type: 'success'

                                })
                                this.listLoading = true;
                                this.getSignList();
                            }else{
                                this.$notify({
                                    title: '失败',
                                    message: res.data.msg,
                                    type: 'error'

                                })                               
                            }


                        })
                    }).catch(() => { })
                }

            },
            signCurrentChange(val) {
                this.pageNum = val;
                this.getSignList(val);

            },
            signEdit(row) {

                this.editFormVisible = true;
                this.editFormTtile = '查看用户信息';

                this.editForm.custId = row.custId;
                this.editForm.custName = row.custName;
                this.editForm.custMobile = row.custMobile;
                this.editForm.createTime = row.createTime;
                this.editForm.updateTime = row.updateTime;
                this.editForm.playStatus = row.playStatus == 0 ? '解冻' : '冻结';


            },
        },
    }

</script>
<style>

</style>