<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="轮播标题" v-model="title" @change="allList"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getBannerList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="bannerAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--//表格列表-->
        <template>
            <el-table :data="bannerList" stripe style="width: 100%;" v-loading="listLoading" @selection-change="batchSelect">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="sequenceNumber" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="caroDesc" label="轮播标题" show-overflow-tooltip>

                    <!--<template scope="scope">
                        <div class="di" :title="scope.row.caroDesc">{{scope.row.caroDesc}}</div>
                    </template>-->
                </el-table-column>
                <el-table-column label="缩略图" width="150">
                    <template scope="scope">
                        <img :src="scope.row.caroCover" alt="" class="preview-img" @click="showPreview(scope.$index)">
                    </template>
                </el-table-column>
                <el-table-column prop="caroUrl" label="url" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caroParams" label="参数">
                </el-table-column>
                <el-table-column prop="caroSort" label="排序管理">
                    <template scope="scope">
                        <el-input :value="scope.row.caroSort" @focus="changeSort(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column inline-template :context="_self" label="操作">
                    <span>
                    	<el-button size="small"   type="text" @click="bannerEdit(row)">编辑</el-button>
					<el-button   type="text" size="small" @click="bannerDel(row)">删除</el-button>
                    				</span>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="bannerCurrentChange" :total="total" :page-size="10"
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
                abc: '',
                bannerList: [],
                bannerId: [],
                title: '',
                total: 0,
                pageNum: 1,
                listLoading: true,
                pSize: 10,
                imgList: [],

            }
        },
        computed: {
        },
        mounted: function () {
            this.getBannerList();
        },
        methods: {
            getBannerList() {
                ApiService.post({
                    'ext': 'homepage/carouse/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'title': this.title
                })
                    .then(res => {
                        this.bannerList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                        this.bannerList.map(item => {
                            this.imgList.push(item.caroCover);
                        })
                    })
            },
            allList: function () {
                if (!this.title) {
                    this.getBannerList();
                }
            },
            bannerAdd() {
                this.$store.commit('SETBANNERTITLE', '');
                this.$store.commit('SETBANNERTYPE', '');
                this.$store.commit('SETBANNERADMASTERTYPE', '');
                this.$store.commit('SETBANNEREXPOUSREADDRESS', '');
                this.$router.push({ path: `/bannerEdit` });

            },
            bannerEdit(row) {
                this.$router.push({ path: `/bannerEdit/${row.caroId}` });

            },
            bannerDel(row) {
                this.$confirm('您确定要删除该轮播?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(() => {
                        ApiService.post({
                            'ext': 'homepage/carouse/delete',
                            'ids': row.caroId
                        })
                            .then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.listLoading = true;
                                this.getBannerList();
                            })
                    })
                    .catch(() => { })

            },
            batchSelect(checkList) {
                this.bannerId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.bannerId.push(checkList[i].caroId);
                }
            },
            batchDel: function () {
                if (this.bannerId.length > 0) {
                    var _delIds = this.bannerId.join(',')
                    this.$confirm('您确定要删除该轮播?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    })
                        .then(() => {
                            ApiService.post({
                                'ext': 'homepage/carouse/delete',
                                'ids': _delIds
                            })
                                .then(res => {
                                    this.$notify({
                                        title: '成功',
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                    this.listLoading = true;
                                    this.getBannerList();
                                })
                        })
                        .catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的轮播图', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).catch(() => { })
                }
            },
            bannerCurrentChange(val) {
                this.pageNum = val;
                this.getBannerList();

            },
            changeSort: function (row) {
                this.$prompt('请输入序列号', '提示', {
                    confimButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'homepage/carouse/caro_sort',
                            'ids': row.caroId,
                            'caro_sort': value
                        }).then(() => {
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.getBannerList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定'
                        }).then(() => { }).catch(() => { })
                        return false;
                    }
                }).catch(() => { })
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