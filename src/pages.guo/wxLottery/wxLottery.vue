<template>
    <section>
        <!--工具栏-->
        <el-col :span='24' class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入搜索的170号码" v-model="mobile170"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入搜索的抽奖码" v-model="number"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入搜索第几周" v-model="week"></el-input>
                </el-form-item>
                <el-form-item>
                    <span>是否中奖:</span>
                    <el-select v-model="result">
                        <el-option value="" label="全部"></el-option>
                        <el-option value="1" label="中奖"></el-option>
                        <el-option value="0" label="没中"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getLotteryList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="exportExcel">导出 Excel</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table :data="wxLotteryList">
                <el-table-column label="序号" width="80">
                    <template scope="scope">
                        <span>
                            {{(scope.$index+1)+pageSize*(pageNum-1)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="用户ID" prop="custId" show-overflow-tooltip></el-table-column>
                <el-table-column label="微信ID" prop="openid" show-overflow-tooltip></el-table-column>
                <el-table-column label="手机号码" prop="mobile"></el-table-column>
                <el-table-column label="170手机" prop="mobile170"></el-table-column>
                <el-table-column label="抽奖码" prop="number"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="第几周" prop="week"></el-table-column>
                <el-table-column label="是否中奖" prop="result">
                    <template scope="scope">
                        <span>{{scope.row.result==1?'中奖':'没中'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="备注" prop="remark"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="operateLottery(scope.row.loId,scope.row.result)">{{scope.row.result==1?'设置为未中':'设置为中奖'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span='24' class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="lotteryCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'wxLottery',
        data() {
            return {
                wxLotteryList: [],
                pageNum: 1,
                pageSize: 10,
                total: 0,
                mobile170: '',
                result: '',
                number: '',
                week: ''
            }
        },
        mounted() {
            this.getLotteryList();
        },
        methods: {
            getLotteryList: function () {
                ApiService.post({
                    'ext': 'lottery/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'result': this.result,
                    'mobile170': this.mobile170,
                    'number': this.number,
                    'week': this.week
                }).then(res => {
                    this.wxLotteryList = res.data.data.list
                    this.total = res.data.data.total
                })
            },
            exportExcel: function () {
                ApiService.get({
                    'ext': 'lottery/excel'
                }).then(res => {
                    window.location.href = res.url
                })
            },
            lotteryCurrentChange: function (val) {
                this.pageNum = val;
                this.getLotteryList();
            },
            operateLottery: function (id, result) {
                if (result == 1) {
                    this.$confirm('您确定要设置为未中奖?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        ApiService.post({
                            'ext':'lottery/result',
                            'ids':id,
                            'result':0
                        }).then(res=>{
                            console.log(res);
                            this.getLotteryList();
                        })
                    }).catch(() => { })
                } else {
                    this.$confirm('您确定要设置为中奖?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        ApiService.post({
                            'ext':'lottery/result',
                            'ids':id,
                            'result':1
                        }).then(res=>{
                            console.log(res);
                            this.getLotteryList();
                        })
                    }).catch(() => { })
                }

            }
        }
    }

</script>