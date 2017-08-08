<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="输入内容标题" v-model="home_title" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="generalContentList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--//表格列表-->
        <template>
            <el-table :data="generalList" stripe style="width: 100%;" v-loading="listLoading">
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="homeTitle" label="内容标题" width="150">
                </el-table-column>
                <el-table-column label="内容类型" width="150">
                    <template scope="scope">
                        <span v-if="scope.row.busiType==1">资讯</span>
                        <span v-if="scope.row.busiType==2">视频</span>
                        <span v-if="scope.row.busiType==3">活动选手</span>
                    </template>
                </el-table-column>
                <el-table-column label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.homeSort" @focus="changeSort(scope.row)"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="generalCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>

    </section>
</template>

<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'sign',
        data() {
            return {
                generalList: [],
                home_title: '',
                total: 0,
                pageNum: 1,
                listLoading: true,
                pSize: 10,


            }
        },
        computed: {
        },
        mounted: function () {
            this.generalContentList();
        },
        methods: {
            generalContentList() {
                ApiService.post({
                    'ext': 'homepage/manage/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'home_title': this.home_title
                })
                    .then(res => {
                        console.log(res.data);
                        this.generalList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },
            allList: function () {
                if (!this.home_title) {
                    this.generalContentList();
                }
            },
            generalCurrentChange(val) {
                this.pageNum = val;
                this.generalContentList();

            },
            changeSort: function (row) {
                console.log(row);
                this.$prompt('请输入序列号', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'homepage/manage/home_sort',
                            'ids': row.homeId,
                            'home_sort': value
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            })
                            this.listLoading = true;
                            this.generalContentList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定'
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