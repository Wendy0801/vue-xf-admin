<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="输入视频标题" v-model="vide_title" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getShowVideoList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--//表格列表-->
        <template>
            <el-table :data="showVideoList" stripe style="width: 100%;" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="videTitle" label="视频标题" width="150">
                </el-table-column>
                <el-table-column prop="playName" label="发布者" width="150">
                </el-table-column>
                <el-table-column label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.videSort" @focus="changeSort(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="text" @click="showVideoWatch(scope.row)">观看</el-button>
                        <el-button size="small" type="text" @click="showVideoDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">删除</el-button>
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="showVideoCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px">
                <el-form-item>
                    <template>
                        <video :src="editForm.videUrl" controls="controls" autoplay="autoplay">
                        </video>
                    </template>
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
                showVideoList: [],
                showVideoId: [],
                vide_title: '',
                total: 0,
                pageNum: 1,
                listLoading: true,
                editFormVisible: false, //编辑界面显是否显示
                editFormTtile: '编辑', //编辑界面标题
                pSize: 10,
                //编辑界面数据
                editForm: {
                    videUrl: '',

                },
                editLoading: false,
                btnEditText: '确 定',

            }
        },
        computed: {
        },
        mounted: function () {
            this.getShowVideoList();
        },
        methods: {
            getShowVideoList() {
                ApiService.post({
                    'ext': 'activity/second-talent-show-video-order/page',
                    'pageNum': this.pageNum,
                    'acti_id': this.$route.params['actiId'],
                    'pageSize': this.pSize,
                    'vide_title': this.vide_title
                })
                    .then(res => {
                        console.log(res.data);
                        this.showVideoList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },
            allList: function () {
                if (!this.vide_title) {
                    this.getShowVideoList();
                }
            },
            showVideoCurrentChange(val) {
                this.pageNum = val;
                this.getShowVideoList();

            },
            showVideoWatch(row) {
                this.editFormVisible = true;
                this.editFormTtile = '观看视频';

                this.editForm.videUrl = row.videUrl;
            },
            showVideoDel: function (row) {
                this.$confirm('您确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'activity/second-talent-show-video-order/delete',
                        'ids': row.videId
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        })
                        this.listLoading = true;
                        this.getShowVideoList();
                    })
                }).catch(() => { })
            },
            batchSelect: function (checkList) {
                this.showVideoId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.showVideoId.push(checkList[i].videId)
                }
            },
            batchDel: function () {
                if (this.showVideoId.length > 0) {
                    var _delId = this.showVideoId.join(',');
                    this.$confirm('您确定要删除该活动', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'activity/second-talent-show-video-order/delete',
                            'ids': _delId
                        })
                            .then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getShowVideoList();
                            })
                    }).catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的参赛视频', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).catch(() => { })
                }
            },
            changeSort: function (row) {
                this.$prompt('请输入序列号', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'activity/second-talent-show-video-order/vide_sort',
                            'ids': row.videId,
                            'vide_sort': value
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            })
                            this.listLoading = true;
                            this.getShowVideoList();
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