<template>
    <section>

        <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="待设置视频" name="first">
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input placeholder="输入视频关键字" v-model="vide_title" @change="allList"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getVideoList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--//表格列表-->
                <template>
                    <el-table :data="videoList" stripe style="width: 100%;" v-loading="listLoading">
                        <el-table-column prop="sequenceNumber" width="100" label="序号">
                        </el-table-column>
                        <el-table-column prop="videTitle" label="视频标题" width="200">
                        </el-table-column>
                        <el-table-column label="视频标签">
                            <template scope="scope">
                                {{scope.row.videType == 1?'才艺视频':'任务视频'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="source" label="视频来源">
                        </el-table-column>
                        <el-table-column prop="playName" label="发布者">
                        </el-table-column>
                        <el-table-column inline-template :context="_self" label="设为主页视频">
                            <span>
        <el-button size="small"   type="text" @click="setVideo(row)">设为主页视频</el-button>
    </span>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>

            <el-tab-pane label="已设置视频" name="second">
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input placeholder="输入视频关键字" v-model="vide_title" @change="allList"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getVideoList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--//表格列表-->
                <template>
                    <el-table :data="videoList" stripe style="width: 100%;" v-loading="listLoading">
                        <!--<el-table-column  width="60">
</el-table-column>-->
                        <el-table-column prop="sequenceNumber" width="100" label="序号">
                        </el-table-column>
                        <el-table-column prop="videTitle" label="视频标题" width="200">
                        </el-table-column>
                        <el-table-column prop="playName" label="发布者">
                        </el-table-column>
                        <el-table-column label="排序操作">
                            <template scope="scope">
                                <el-input :value="scope.row.videSort" @focus="changeSort(scope.row)"></el-button></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column inline-template :context="_self" label="操作">
                            <span>
                                <el-button type="text" @click="videoDisplay(row)">移除</el-button>
                            </span>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
        </el-tabs>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="videoCurrentChange" :total="total" :page-size="10"
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
                activeName: 'first',
                videoList: [],
                vide_title: '',
                vide_homepage: 0,
                total: 0,
                pageNum: 1,
                listLoading: true,
                pSize: 10,
                userId: '',
                userName: ''

            }
        },
        computed: {},
        mounted: function () {
            this.getVideoList();
            this.getSessionID();
        },
        methods: {
            getSessionID: function () {
                ApiService.get({
                    'ext': 'system/session/info',
                    'ss_id': sessionStorage.getItem('ssId')
                }).then(res => {
                    this.userId = res.data.data.ssUserId;
                    this.userName = res.data.data.ssUserName;
                })
            },
            getVideoList() {
                ApiService.post({
                    'ext': 'homepage/video/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pSize,
                    'vide_title': this.vide_title,
                    'vide_homepage': this.vide_homepage,
                })
                    .then(res => {
                        console.log(res.data);
                        this.videoList = res.data.data.list;
                        this.total = res.data.data.total;
                        this.listLoading = false;
                    })

            },
            allList: function () {
                if (!this.vide_title) {
                    this.getVideoList();
                }
            },
            changeTab(tab, event) {
                console.log(tab, event);
                if (tab.index == 0) {
                    this.pageNum = 1;
                    this.vide_homepage = 0;
                    this.getVideoList();
                } else {
                    this.pageNum = 1;
                    this.vide_homepage = 1;
                    this.getVideoList();
                }
            },
            setVideo: function (row) {
                console.log(row);
                this.$confirm('您确定设置为主页视频', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.put({
                        'ext': 'homepage/video/vide_homepage',
                        'ids': row.videId,
                        'vide_homepage': 1,
                        'user_id': this.userId,
                        'user_name': this.userName
                    }).then(res => {
                        this.listLoading = true;
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getVideoList();
                    })
                }).catch(() => { })

            },
            changeSort: function (row) {
                console.log(row);
                this.$prompt('请输入序列号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({
                    value
                }) => {
                    if (value) {
                        ApiService.put({
                            'ext': 'homepage/video/vide_sort',
                            'ids': row.videId,
                            'vide_sort': value
                        }).then(res => {
                            this.listLoading = true;
                            this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            });
                            this.getVideoList();
                        })
                    } else {
                        this.$alert('序列号不能为空', '提示', {
                            confirmButtonText: '确定',
                        }).then(() => { }).catch(() => { })
                        return false;
                    }

                }).catch(() => { })
            },
            videoCurrentChange(val) {
                this.pageNum = val;
                this.getVideoList();

            },
            videoDisplay: function (row) {
                this.$confirm('您确定要移除该视频', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    ApiService.post({
                        'ext': 'homepage/video/vide_homepage',
                        'ids': row.videId,
                        'vide_homepage': 0,
                        'user_id': this.userId,
                        'user_name': this.userName
                    }).then(res => {
                        this.listLoading = true;
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getVideoList();
                    })
                }).catch(() => { })
            }

        }
    }

</script>
<style>

</style>