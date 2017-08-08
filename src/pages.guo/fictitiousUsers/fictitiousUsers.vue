<template>
    <section>
        <!--工具栏-->
        <el-col :span='24' class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请选择输入查询昵称" v-model="cust_name" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getFictitiousList()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addFictitious()">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="fictitiousList">
            <el-table-column label="序号" width="80">
                <template scope="scope">
                    {{scope.$index+1+(pageNum-1)*pageSize}}
                </template>
            </el-table-column>
            <el-table-column label="昵称" prop="custName"></el-table-column>
            <el-table-column label="头像">
                <template scope="scope">
                    <img :src="scope.row.custPortrait" alt="">
                </template>
            </el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="手机" prop="custMobile"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" @click="editFictitious(scope.row.custId)">编辑</el-button>
                    <el-button type="text" @click="delectFictitious(scope.row.custId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-col :span='24' class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" :total="total" @current-change="fictitiousPage"></el-pagination>
        </el-col>

    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        data() {
            return {
                cust_name: '',
                fictitiousList: [],
                pageNum: 1,
                pageSize: 10,
                total: 0,
            }
        },
        mounted() {
            this.getFictitiousList();
        },
        methods: {
            getFictitiousList() {
                ApiService.post({
                    'ext': 'robot/user/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'cust_name': this.cust_name
                }).then(res => {
                    if (res.data.code == 1) {
                        this.fictitiousList = res.data.data.list
                        this.total = res.data.data.total
                    }
                })
            },
            addFictitious() {
                this.$router.push({ path: `/fictitiousEdit` })
            },
            editFictitious(custId) {
                this.$router.push({ path: `/fictitiousEdit/${custId}` })
            },
            delectFictitious(id) {
                this.$confirm('您确定要删除虚拟用户？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'robot/user/delete',
                        'ids': id
                    }).then(res => {
                        if (res.data.code == 1) {
                            this.$notify({
                                title: '提示',
                                message: '删除成功！',
                                type: 'success'
                            })
                            this.getFictitiousList();
                        }
                    })
                }).catch(() => { })
            },
            allList() {
                if (!this.cust_name) {
                    this.getFictitiousList();
                }
            },
            fictitiousPage(value) {
                this.pageNum = value;
                this.getFictitiousList();
            }
        }

    }

</script>