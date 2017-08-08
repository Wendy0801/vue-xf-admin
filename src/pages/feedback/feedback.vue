<template>
    <div>
        <el-table :data="feedbackList" stripe style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column width="100" label="序号">
                <template scope="scope"> 
                    <span>{{scope.$index+1+(pIndex-1)*pSize}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户名" width="180" prop="ifUserName">
            </el-table-column>
            <el-table-column label="时间" width="210" prop="ifTime">
            </el-table-column>
            <el-table-column label="反馈内容" prop="ifContent">
            </el-table-column>
            <el-table-column type="expand">
                <template scope="props">
                    <p><b>反馈详情:</b>{{ props.row.ifContent }}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="210" class="action-col">
                <template scope="scope">
                    <el-button class="delete-btn" size="small" type="text" @click="deleteFeedback(scope.row.ifId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination @current-change="handleCurrentChange" :current-page="pIndex" :page-size="pSize" layout=" prev, pager, next, jumper,total"
                :total="total">
                </el-pagination>
        </el-col>
    </div>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
    export default {
        data() {
            return {
                pIndex: 1,
                pSize: 10,
                total: 10,
                feedbackList: [],
                deleteIds: ''
            }
        },
        mounted() {
            this.getFeedbackList();
        },
        methods: {
            getFeedbackList(pIndex = 1, pSize = this.pSize) {
                ApiService.post({
                    'ext': 'idea/feedback/page',
                    'pageNum': pIndex,
                    'pageSize': pSize
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.feedbackList = res.data.data.list;
                            this.total = res.data.data.total;
                        }
                        console.log(res);
                    })
            },
            handleCurrentChange(pIndex) {
                this.pIndex = pIndex;
                this.getFeedbackList(pIndex);
            },
            deleteFeedback(id) {
                if(!id) return false ; 
                this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
                    this.deleteIds = `${id}`;
                    ApiService.post({
                        'ext': 'idea/feedback/delete',
                        'ids': this.deleteIds
                    })
                        .then(res => {
                            if (res.data.code === 1) {
                                this.$notify({
                                    showClose: true,
                                    type: 'success',
                                    message: '删除成功'
                                });
                                this.deleteIds = '' ;
                                this.getFeedbackList();
                            }
                        })
                    
				}).catch(() => {

				});
            },
        }
    }

</script>
<style lang="scss" src="./feedback.scss" scoped></style>