<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="输入评论内容" v-model="contant" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="demonstration">来源:</span>
                    <el-select v-model="source" placeholder="请选择视频来源">
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item.source" :value="item.source" v-for="item in souceList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getCommentList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--//表格列表-->
        <template>
            <el-table :data="commentList" stripe style="width: 100%;" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="contant" label="评论内容">
                </el-table-column>
                <el-table-column prop="source" label="评论来源">
                </el-table-column>
                <el-table-column prop="target" label="具体评论对象">
                </el-table-column>
                <el-table-column prop="username" label="发布者">
                </el-table-column>
                <el-table-column inline-template :context="_self" label="操作">
                    <span>
                         <el-button size="small"   type="text" @click="commentDel(row)">删除</el-button>
                    </span>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination layout="total, prev, pager, next,jumper" @current-change="commentCurrentChange" :total="total" :page-size="10"
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
                commentList: [],
                commentId: [],
                souceList: [],
                contant: '',
                source: '',
                total: 0,
                pageNum: 1,
                pageSize: 10,
                listLoading: true,
            }
        },
        computed: {},
        mounted: function () {
            this.getCommentList();
            this.getSouceList();
        },
        methods: {
            getCommentList() {
                ApiService.post({
                    'ext': 'ugc/comments/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'contant': this.contant,
                    'source': this.source
                })
                    .then(res => {
                        this.commentList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },
            getSouceList: function () {
                ApiService.get({
                    'ext': 'ugc/comments/source-list',
                }).then(res => {
                    console.log(res.data);
                    this.souceList = res.data.data;
                });
            },
            allList:function(){
                if(!this.contant){
                    this.getCommentList();
                }
            },
            commentDel: function (row) {
                console.log(row);
                this.$confirm('您确定要删除该评论?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'ugc/comments/delete',
                        'ids': row.id
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getCommentList();
                    })
                }).catch(() => { })

            },
            batchSelect: function (checkList) {
                this.commentId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.commentId.push(checkList[i].id)
                }
            },
            batchDel: function () {
                if (this.commentId.length > 0) {
                    var _delId = this.commentId.join(',');
                    this.$confirm('您确定要删除评论?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'ugc/comments/delete',
                            'ids': _delId
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getCommentList();
                        })
                    }).catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的评论', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).catch(() => { })
                }
            },
            commentCurrentChange(val) {
                this.pageNum = val;
                this.getCommentList();
            },

        }
    }

</script>
<style>

</style>