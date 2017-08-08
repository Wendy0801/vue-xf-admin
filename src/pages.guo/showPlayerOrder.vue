<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="输入达人名称" v-model="cust_name" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getPlayerOrderList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--//表格列表-->
        <template>
            <el-table :data="playerList" stripe style="width: 100%;" v-loading="listLoading">
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="playId" label="用户ID" width="200">
                </el-table-column>
                <el-table-column prop="custName" label="用户名" width="150">
                </el-table-column>
                <el-table-column prop="custMobile" label="手机号">
                </el-table-column>
                <el-table-column label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.playSort" @focus="changeSort(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="text" @click="playerEdit(scope.row)">查看用户信息</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="playerCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px">
                <el-form-item label="用户ID">
                    <el-input v-model="editForm.playId" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="">
                    <el-input v-model="editForm.custName" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="editForm.custMobile" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="editFormVisible = false" :loading="editLoading">{{btnEditText}}</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import ApiService from '../services/api.service'
    export default {
        name: 'sign',
        data() {
            return {
                playerList: [],
                cust_name: '',
                total: 0,
                pageNum: 1,
                listLoading: true,
                editFormVisible: false, //编辑界面显是否显示
                editFormTtile: '编辑', //编辑界面标题
                pSize: 10,
                //编辑界面数据
                editForm: {
                    playId: '',
                    custName: '',
                    custMobile: ''

                },
                editLoading: false,
                btnEditText: '确 定',

            }
        },
        computed: {
        },
        mounted: function () {
            this.getPlayerOrderList();
        },
        methods: {
            getPlayerOrderList() {
                ApiService.post({
                    'ext': 'activity/second-talent-show-player-sort/page',
                    'acti_id': this.$route.params['actiId']||'',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'cust_name': this.cust_name
                })
                    .then(res => {
                        console.log(res.data);
                        this.playerList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },

            allList: function () {
                if (!this.cust_name) {
                    this.getPlayerOrderList();
                }
            },
            playerCurrentChange(val) {
                this.pageNum = val;
                this.getPlayerOrderList(val);

            },
            playerEdit(row) {

                this.editFormVisible = true;
                this.editFormTtile = '查看用户信息';

                this.editForm.playId = row.playId;
                this.editForm.custName = row.custName;
                this.editForm.custMobile = row.custMobile;
            },
            changeSort: function (row) {
                console.log(row);
                this.$prompt('请输入序列号', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'activity/second-talent-show-player-sort/play_sort',
                            'ids': row.playId,
                            'play_sort': value
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            })
                            this.listLoading = true;
                            this.getPlayerOrderList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定',
                        }).then(() => { }).catch(() => { })
                        return false;
                    }

                }).catch(() => { })
            }
        },
    }

</script>
<style>

</style>