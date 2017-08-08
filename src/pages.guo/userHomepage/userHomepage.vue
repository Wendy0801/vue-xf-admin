<template>
    <section>

        <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="待设置选手" name="first">
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input placeholder="输入选手名称" v-model="cust_name" @change="allList"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getUserList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--//表格列表-->
                <template>
                    <el-table :data="userList" stripe style="width: 100%;" v-loading="listLoading">
                        <el-table-column prop="sequenceNumber" width="100" label="序号">
                        </el-table-column>
                        <el-table-column prop="playId" label="选手ID" width="200">
                        </el-table-column>
                        <el-table-column prop="custName" label="选手名称">
                        </el-table-column>
                        <el-table-column prop="custMobile" label="手机号">
                        </el-table-column>
                        <el-table-column prop="createTime" label="注册时间">
                        </el-table-column>
                        <el-table-column prop="updateTime" label="最近登录时间">
                        </el-table-column>
                        <el-table-column inline-template :context="_self" label="设为主页选手">
                            <span>
                                <el-button size="small"   type="text" @click="setUser(row)">设为主页选手</el-button>
                            </span>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="已设置选手" name="second">
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input placeholder="输入选手名称" v-model="cust_name" @change="allList"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getUserList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--//表格列表-->
                <template>
                    <el-table :data="userList" stripe style="width: 100%;" v-loading="listLoading">
                        <el-table-column prop="sequenceNumber" width="100" label="序号">
                        </el-table-column>
                        <el-table-column prop="playId" label="选手ID" width="200">
                        </el-table-column>
                        <el-table-column prop="custName" label="选手名称">
                        </el-table-column>>
                        <el-table-column label="排序管理">
                            <template scope="scope">
                                <el-input :value="scope.row.playSort" @focus="changesort(scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column inline-template :context="_self" label="操作">
                            <span>
                                <el-button type="text" @click="userDisplay(row)">移除</el-button>
                            </span>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>

        </el-tabs>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="userCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>

    </section>
</template>



<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'banner',
        data() {
            return {
                activeName: 'first',
                userList: [],
                cust_name: '',
                play_homepage: 0,
                total: 0,
                pageNum: 1,
                listLoading: true,
                pSize: 10,
                userId: '',
                userName: ''

            }
        },
        computed: {},
        mounted: function () {
            this.getUserList();
            this.getSessionID();
        },
        methods: {
            getSessionID: function () {
                ApiService.get({
                    'ext': 'system/session/info',
                    'ss_id': sessionStorage.getItem('ssId')
                }).then(res => {
                    console.log(res);
                    this.userId = res.data.data.ssUserId;
                    this.userName = res.data.data.ssUserName;
                })
            },
            getUserList() {
                ApiService.post({
                    'ext': 'homepage/player/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'cust_name': this.cust_name,
                    'play_homepage': this.play_homepage,
                })
                    .then(res => {
                        console.log(res.data);
                        this.userList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },
            allList: function () {
                if (!this.cust_name) {
                    this.getUserList();
                }
            },
            changeTab(tab, event) {
                console.log(tab, event);
                if (tab.index == 0) {
                    this.play_homepage = 0;
                    this.getUserList();
                } else {
                    this.play_homepage = 1;
                    this.getUserList();
                }
            },
            setUser: function (row) {
                this.$confirm('您确定设置为主页选手?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.put({
                        'ext': 'homepage/player/play_homepage',
                        'ids': row.playId,
                        'play_homepage': 1,
                        'user_id': this.userId,
                        'user_name': this.userName
                    }).then(res => {
                        this.listLoading = true;
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getUserList();
                    })
                }).catch(() => { })
            },
            changesort: function (row) {
                console.log(row);
                this.$prompt('请输入序列号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'homepage/player/play_sort',
                            'ids': row.playId,
                            'play_sort': value
                        }).then(res => {
                            this.listLoading = true;
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.getUserList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定'
                        }).then(() => { }).catch(() => { })
                        return false;
                    }

                }).catch(() => { })
            },
            userCurrentChange(val) {
                this.pageNum = val;
                this.getUserList();

            },
            userDisplay: function (row) {
                console.log(row);
                this.$confirm('您确定要移除该选手', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.put({
                        'ext': 'homepage/player/play_homepage',
                        'ids': row.playId,
                        'play_homepage': 0,
                        'user_id': this.userId,
                        'user_name': this.userName
                    }).then(res => {
                        this.listLoading = true;
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getUserList();
                    })
                }).catch(() => { })
            }

        }
    }

</script>
<style>

</style>