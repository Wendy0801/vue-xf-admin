<template>
    <section>
        <!--工具条-->
        <!--<el-col :span="24" class="toolbar">
            <el-form :inline="true" >
                <el-form-item>
                    <el-input  placeholder="轮播标题" v-model="acti_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getActivityList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="activityAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>-->


        <!--//表格列表-->
        <template>
            <el-table :data="pictureList" stripe style="width: 100%;" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column label="缩略图" width="150">
                    <template scope="scope">
                        <img :src="scope.row.photUrl" alt="" class="preview-img" @click="showPreview(scope.$index)">
                    </template>
                </el-table-column>
                <el-table-column prop="photSource" label="图片位置">
                </el-table-column>
                <el-table-column prop="photUsername" label="发布者">
                </el-table-column>
                <el-table-column inline-template :context="_self" label="操作">
                    <span>
                        <el-button   type="text" size="small" @click="pictureDel(row)">删除</el-button>
                    </span>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="activityCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>

    </section>
</template>

<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'picture',
        data() {
            return {
                pictureList: [],
                pictureId: [],
                imgList:[],
                total: 0,
                pSize: 10,
                pageNum: 1,
                listLoading: true,
            }
        },
        computed: {
        },
        mounted: function () {
            this.getPictureList();
        },
        methods: {
            getPictureList() {
                ApiService.post({
                    'ext': 'ugc/photo/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                })
                    .then(res => {
                        this.pictureList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                         this.pictureList.map(item=>{
                            this.imgList.push(item.photUrl);
                        })
                    })

            },
            pictureDel(row) {
                console.log(row);
                this.$confirm('您确定要删除该图片', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'ugc/photo/delete',
                        'ids': row.photId
                    })
                        .then(res => {
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getPictureList();
                        })

                }).catch(() => { })
            },
            batchSelect: function (checkList) {
                this.pictureId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.pictureId.push(checkList[i].photId);
                }
            },
            batchDel: function () {
                if (this.pictureId.length > 0) {
                    var _delId = this.pictureId.join(',');
                    this.$confirm('您确定要删除图片', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'ugc/photo/delete',
                            'ids': _delId
                        }).then(res => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getPictureList();
                        })
                    }).catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的图片', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).catch(() => { })
                }
            },
            activityCurrentChange(val) {
                this.pageNum = val;
                this.getPictureList();

            },
            showPreview(index, imgList = this.imgList) {//缩略图预览
                // 获取尺寸
                var _dealList = [];
                var _loadedCount = 0;
                var self = this;

                imgList.map((item, index) => {
                    var _img = new Image();
                    _img.src = item;
                    _img.onload = function () {
                        _loadedCount++;
                        _dealList.push({
                            src: item,
                            w: _img.width,
                            h: _img.height
                        })
                        if (_loadedCount === imgList.length) {
                            _configPreview();
                        }
                    }
                    _img.onerror = function () {
                        _loadedCount++;
                        _dealList.splice(index, 0, {
                            src: '/static/images/default1.jpg',
                            w: 100,
                            h: 100
                        })
                        if (_loadedCount === imgList.length) {
                            _configPreview();
                        }
                    }
                })

                function _configPreview() {
                    self.$preview.open(index, _dealList)
                }
            },

        },
    }

</script>
<style>

</style>