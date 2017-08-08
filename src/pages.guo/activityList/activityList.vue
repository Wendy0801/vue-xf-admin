<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="活动标题" v-model="acti_name" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getActivityList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="activityAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--//表格列表-->
        <template>
            <el-table :data="activityList" stripe style="width: 100%;" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection">

                </el-table-column>
                <el-table-column prop="sequenceNumber" width="80" label="序号">
                </el-table-column>
                <el-table-column prop="actiId" label="活动ID" width="100">

                </el-table-column>
                <el-table-column prop="actiName" label="活动名称" width="200">

                </el-table-column>
                <el-table-column prop="actiLabel" label="标签" width="150">

                </el-table-column>
                <el-table-column label="缩略图" width="150">
                    <template scope="scope">
                        <img :src="scope.row.actiCover" alt="" class="preview-img" @click="showPreview(scope.$index)">
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="80">
                    <template scope="scope">
                        <span>{{scope.row.actiDisplay==0?'是':'否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.actiSort" @focus="changeSort(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column inline-template :context="_self" label="操作" >
                    <span>
                        <el-button size="small" type="text" @click="activityEdit(row)">编辑</el-button>
                        <el-button type="text" size="small" @click="activityDel(row)">删除</el-button>
                        <el-button type="text" size="small" @click="activityApplyUser(row)">用户</el-button>
                        <el-button type="text" size="small" @click="activityVideoSort(row)">视频</el-button>
                        <el-button type="text" size="small" @click="activityPlyerSort(row)">达人</el-button>
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
        name: 'banner',
        data() {
            return {
                activityList: [],
                activityId: [],
                imgList:[],
                acti_name: '',
                total: 0,
                pSize: 10,
                pageNum: 1,
                listLoading: true,
                btnEditText: '提 交',

            }
        },
        computed: {
        },
        mounted: function () {
            this.getActivityList();
        },
        methods: {
            getActivityList() {
                ApiService.post({
                    'ext': 'activity/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'acti_name': this.acti_name
                })
                    .then(res => {
                        this.activityList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                        this.activityList.map(item=>{
                            this.imgList.push(item.actiCover);
                        })
                    })

            },
            allList: function () {
                if (!this.acti_name) {
                    this.getActivityList();
                }
            },
            activityAdd() {

                this.$router.push({ path: `/activityEdit` });
            },
            activityEdit(row) {

                this.$router.push({ path: `/activityEdit/${row.actiId}` });

            },
            activityApplyUser(row) {
                this.$router.push({ path: `/signUpList/${row.actiId}` });
            },
            activityVideoSort(row) {
                this.$router.push({ path: `/showVideoOrder/${row.actiId}` });
            },
            activityPlyerSort(row) {
                this.$router.push({ path: `/showplayerOrder/${row.actiId}` });
            },			
            activityDel(row) {
                this.$confirm('您确定要删除该活动', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'activity/delete',
                        'ids': row.actiId
                    })
                        .then(res => {
                            if (res.data.code == 1) {
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getActivityList();
                            } else {
                                 this.$notify({
                                    title: '失败',
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }

                        })
                }).catch(() => { })

            },
            activityCurrentChange(val) {
                this.pageNum = val;
                this.getActivityList();

            },
            changeSort: function (row) {
                this.$prompt('请输入序列号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'activity/acti_sort',
                            'ids': row.actiId,
                            'acti_sort': value
                        }).then(res => {
                            this.listLoading = true;
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.getActivityList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定',
                        }).then(() => { }).catch(() => { })
                        return false;
                    }

                }).catch(() => { })
            },
            batchSelect: function (checkList) {
                this.activityId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.activityId.push(checkList[i].actiId)
                }
            },
            batchDel: function () {
                if (this.activityId.length > 0) {
                    var _delId = this.activityId.join(',');
                    this.$confirm('您确定要删除该活动', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        ApiService.post({
                            'ext': 'activity/delete',
                            'ids': _delId
                        })
                            .then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getActivityList();
                            })
                    }).catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的活动', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).catch(() => { })
                }
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
    .el-form-item img {
        width: 200px;
    }
    
    .el-form-item .tip {
        color: #999;
    }
    
    #actiUrl,
    #actiParams,
    #url {
        display: none;
    }
</style>