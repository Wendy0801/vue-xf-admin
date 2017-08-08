<template>
    <el-col>
        <el-table :data="authorList" border style="width: 100%" @selection-change="batchSelect">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="80" label="序号">
            </el-table-column>
            <el-table-column label="头像" prop="createTime">
                <template scope="scope">
                    <div class="user-face user-face-row">
                        <img :src="scope.row.eavatar" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="发布者" prop="ename">
            </el-table-column>
            <el-table-column label="操作" class="action-col">
                <template scope="scope">
                    <el-button type="text" @click="goEditAuthor(scope.row.eid)">编辑</el-button>
                    <el-button class="delete-btn" size="small" type="text" @click="deleteAuthor(scope.row.eid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="batchDel">批量删除</el-button>
            <el-pagination @current-change="handleCurrentChange" :current-page="pIndex" :page-size="pSize" layout=" prev, pager, next, jumper,total"
                :total="total">
                </el-pagination>
        </el-col>

     </el-col>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
    export default {
        data() {
            return {
                authorList: [],
                authorId: [],
                deleteIds: '',
                pIndex: 1,
                pSize: 10,
                total: 0,
            }
        },
        mounted() {
            this.getAuthorList();
        },
        methods: {
            getAuthorList(pIndex = 1, pSize = this.pSize) {
                ApiService.post({
                    'ext': 'editor/page',
                    'pageNum': pIndex,
                    'pageSize': pSize
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.authorList = res.data.data.list;
                            this.total = res.data.data.total;
                        }
                    })
            },
            handleCurrentChange(pIndex) {
                this.getAuthorList(pIndex);
            },
            goEditAuthor(id) {
                this.$router.push({ 'path': `/author-edit/${id}` });
            },
            deleteAuthor(id) {
                if (!id) return false;
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.deleteIds = `${id}`;
                        ApiService.post({
                            'ext': 'editor/delete',
                            'ids': this.deleteIds
                        })
                            .then(res => {
                                if (res.data.code === 1) {
                                    this.$notify({
                                        'showClose': true,
                                        'type': 'success',
                                        'message': '删除成功!'
                                    })
                                    this.deleteIds = '';
                                    this.getAuthorList();
                                }
                            })
                    })
                    .catch(() => { })
            },
            batchSelect:function(checkList) {
                this.authorId = [];
                for (var i = 0; i < checkList.length; i++) {
                    this.authorId.push(checkList[i].eid);
                }
            },
            batchDel: function () {
                if (this.authorId.length > 0) {
                    var _delIds = this.authorId.join(',')
                    this.$confirm('您确定要删除发布者?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    })
                        .then(() => {
                            ApiService.post({
                                'ext': 'editor/delete',
                                'ids': _delIds
                            })
                                .then(res => {
                                    this.$notify({
                                        title: '成功',
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                    this.listLoading = true;
                                    this.getAuthorList();
                                })
                        })
                        .catch(() => { })
                } else {
                    this.$confirm('请勾选您需要删除的发布者', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).catch(() => { })
                }
            },
        }
    }

</script>
<style lang="scss" src="./author-list.scss" scoped></style>