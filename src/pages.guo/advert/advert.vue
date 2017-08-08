<template>
    <section>
        <!--工具栏-->
        <el-col :span='24' class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="广告banner标题" v-model="ba_name" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getAvertList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="advertAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <template>
            <el-table :data="advertList" stripe style="width: 100%;" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号">
                    <template scope="scope">
                        {{(scope.$index+1)+(pageNum-1)*pSize}}
                    </template>
                </el-table-column>
                <el-table-column label="banner标题" prop="baName"></el-table-column>
                <el-table-column label="缩略图">
                    <template scope="scope">
                        <img :src="scope.row.baImage" alt='' class="preview-img" @click="showPreview(scope.$index)">
                    </template>
                </el-table-column>
                <el-table-column label="URL" prop="baUrl"></el-table-column>
                <el-table-column label="参数" prop="baParams"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="advertEdit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="advertDel(scope.row.baId)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>

        </template>

        <!--分页-->
        <el-col :span='24' class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination @current-change="advertCurrentChange" :current-page="pageNum" :page-size="pSize" layout="total, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
        </el-col>


    </section>
</template>
<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'advert',
        data() {
            return {
                advertList: [],
                avertId: [],
                imgList: [],
                ba_name: '',
                listLoading: false,
                pageNum: 1,
                pSize: 10,
                total: 0,
            }
        },
        mounted: function () {
            this.getAvertList();
        },
        methods: {
            getAvertList: function () {
                ApiService.post({
                    'ext': 'banners/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'ba_name': this.ba_name
                }).then((res) => {
                    this.advertList = res.data.data.list
                    this.total = res.data.data.total;
                    this.listLoading = false;
                    this.advertList.map(item => {
                        this.imgList.push(item.baImage);
                    })
                })
            },
            allList: function () {
                if (!this.ba_name) {
                    this.getAvertList();
                }
            },
            advertAdd: function () {
                this.$router.push({ path: `/advertEdit` });
            },
            advertEdit: function (row) {
                this.$router.push({ path: `/advertEdit/${row.baId}` });

            },

            advertDel: function (ids) {
                console.log(ids);
                this.$confirm('您确定要删除广告banner?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'banners/delete',
                        'ids': ids
                    }).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        });
                        this.listLoading = true;
                        this.getAvertList();
                    })
                }).catch(() => { })

            },
            batchSelect: function (checkList) {
                this.avertId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.avertId.push(checkList[i].baId)
                }
            },
            batchDel: function () {
                var ids = this.avertId.join(',');
                this.advertDel(ids);
            },
            editCancel: function () {
                this.editFormVisible = false;
                this.$refs.editForm.resetFields();
            },
            advertCurrentChange: function (val) {
                this.pageNum = val;
                this.getAvertList();
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
        }

    }

</script>
<style>
    .el-form-item img {
        width: 200px;
    }
</style>