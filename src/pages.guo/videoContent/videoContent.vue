<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="输入视频标题" v-model="vide_title" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="demonstration">视频来源:</span>
                    <el-select v-model="acti_id" placeholder="请选择视频来源">
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item.actiTitle" :value="item.actiId" v-for="item in souceList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span class="demonstration">视频标签:</span>
                    <el-select v-model="vide_type" placeholder="请选择视频标签">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="才艺视频" value="1"></el-option>
                        <el-option label="任务视频" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getVideoList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--//表格列表-->
        <template>
            <el-table :data="videoList" stripe style="width: 100%;" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="videTitle" label="视频标题" width="200">
                </el-table-column>
                <el-table-column prop="videTypeName" label="视频标签">
                </el-table-column>
                <el-table-column prop="source" label="视频来源">
                </el-table-column>
                <el-table-column prop="playName" label="发布者">
                </el-table-column>
                <el-table-column inline-template :context="_self" label="操作">
                    <span>
                        <el-button size="small"   type="text" @click="videoWatch(row)">观看</el-button>
                         <el-button size="small"   type="text" @click="videoDel(row)">删除</el-button>
                    </span>
                </el-table-column>
            </el-table>
        </template>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination layout="total, prev, pager, next,jumper" @current-change="videoCurrentChange" :total="total" :page-size="10"
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
        name: 'banner',
        data() {
            return {
                videoList: [],
                souceList: [],
                videoId: [],
                vide_title: '',
                acti_id: '',
                vide_type: '',
                total: 0,
                pageNum: 1,
                listLoading: true,
                editFormVisible: false, //编辑界面显是否显示
                editFormTtile: '编辑', //编辑界面标题
                pSize: 10,
                editForm: {
                    videUrl: ''
                },
                editLoading: false,
                btnEditText: '确 定'
            }
        },
        computed: {},
        mounted: function () {
            this.getVideoList();
            this.getSouceList();
        },
        methods: {
            getVideoList() {
                ApiService.post({
                    'ext': 'ugc/video/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'vide_title': this.vide_title,
                    'vide_type': this.vide_type,
                    'acti_id': this.acti_id,
                })
                    .then(res => {
                        this.videoList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },
            getSouceList: function () {
                ApiService.get({
                    'ext': 'activity/readList',
                }).then(res => {
                    console.log(res.data);
                    this.souceList = res.data.data;
                });
            },
            allList: function () {
                if (!this.vide_title) {
                    this.getVideoList();
                }
            },
            videoWatch: function (row) {
                this.editFormVisible = true;
                this.editFormTtile = '观看视频';

                this.editForm.videUrl = row.videUrl;
            },
            videoDel: function (row) {
                if (row.videHomepage == 1) {
                    this.$alert('您删除的视频已设置为主页视频,无法删除', '提示', {
                        confirmButtonText: '确定'
                    }).catch(() => { })
                } else {
                    this.$confirm('您确定要删除该视频?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'ugc/video/delete',
                            'ids': row.videId
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.getVideoList();
                        })
                    }).catch(() => { })

                }


            },
            batchSelect: function (checkList) {
                this.videoId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.videoId.push(checkList[i].videId)
                }
            },
            batchDel: function () {
                if (this.videoId.length > 0) {
                    var _delId = this.videoId.join(',');
                    this.$confirm('您确定要删除视频', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'ugc/video/delete',
                            'ids': _delId
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getVideoList();
                        })
                    }).catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的视频', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).catch(() => { })
                }
            },
            videoCurrentChange(val) {
                this.pageNum = val;
                this.getVideoList();
            },

        }
    }

</script>
<style>

</style>