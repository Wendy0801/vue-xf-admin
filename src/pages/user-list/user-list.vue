<template>
    <el-col>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入用户名搜索"  v-model="searchKey" @change="allList">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" >查询</el-button>
                </el-form-item>
            </el-form>

        </el-col>
        <el-table :data="userList" stripe style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="序号" width="70">
                <template scope="scope">
                    <span>{{scope.$index+1+(pIndex-1)*pSize}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="custPortrait" label="用户头像" width="100">
                <template scope="scope">
                    <img :src="scope.row.custPortrait" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="custId" label="用户Id">
            </el-table-column>
            <el-table-column prop="playId" label="选手Id" 
            </el-table-column>
            <el-table-column prop="custName" label="用户名">
            </el-table-column>
            <el-table-column prop="custMobile" label="电话号码">
            </el-table-column>
            <el-table-column prop="createTime" label="注册时间">
            </el-table-column>
            <el-table-column prop="lastLoginTime" label="最近登陆">
            </el-table-column>
            <el-table-column label="操作" class="action-col">
                <template scope="scope">
                    <div class="form-action">
                        <el-button size="small" type="text" @click="readUser(scope.row.custId)">查看用户信息</el-button>
                        <el-button size="small" v-if="scope.row.custStatus===0" type="text" @click="frozenUser(scope.row)">冻结</el-button>
                        <el-button size="small" v-if="scope.row.custStatus===1" type="text" @click="frozenUser(scope.row)">解冻</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination @current-change="handleCurrentChange" :current-page="pIndex" :page-size="pSize" layout="total, prev, pager, next, jumper"
                :total="userListtotal">
                </el-pagination>
        </el-col>

        <div>
            <el-dialog title="用户详细信息" v-model="dialogVisible" size="small">
                <userinfo-modal :data="userDetail"></userinfo-modal>
            </el-dialog>
        </div>
        </div>
	</el-col>
</template>
<script>
    import ApiService from 'SERVICES/api.service';
    import UserinfoModal from 'MODALS/Userinfo.modal';
    export default {
        components: {
            UserinfoModal
        },
        data() {
            return {
                userList: [],
                userListtotal: 0,
                pSize: 10,
                pIndex: 1,
                searchKey: '',
                userDetail: {},
                dialogVisible: false
            }
        },
        mounted() {
            this.getCustomerList();
        },
        methods: {
            show(data) {
                console.log(data)
            },
            search() {
                this.getCustomerList();
            },
            handleCurrentChange(pIndex) {
                this.getCustomerList(pIndex);
                this.pIndex = pIndex ; 
            },
            getCustomerList(pIndex = 1, pSize = this.pSize) {
                let _reqData = {
                    'ext': 'system/customer/page',
                    'pageNum': pIndex,
                    'pageSize': pSize
                }
                if (this.searchKey) {
                    _reqData = Object.assign(_reqData, {
                        'cust_name': this.searchKey
                    });
                }
                ApiService.post(_reqData)
                    .then(res => {
                        if (res.data.code === 1) {
                            this.userList = res.data.data.list;
                            this.userListtotal = res.data.data.total;
                        }
                    })
            },
            allList(){
                if(!this.searchKey){
                    this.getCustomerList();
                }
            },
            readUser(custId) {
                ApiService.get({
                    'ext': 'system/customer/read',
                    'custId': custId
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.dialogVisible = true;
                            this.userDetail = res.data.data;
                        }
                    })
            },
            frozenUser(userDataRow) {
                let {custId, custStatus} = userDataRow;
                let _tipMessage = '';
                let _statusInput = 0;
                if (custStatus === 0) {  // 正常状态
                    _tipMessage = '确认冻结该用户吗';
                    _statusInput = 1;
                }
                else if (custStatus === 1) {
                    _tipMessage = '确认解冻该用户吗';
                    _statusInput = 0;
                }
                this.$confirm(`${_tipMessage}`, '提示', {
                    'type': 'warning'
                })
                    .then(() => {
                        ApiService.put({
                            'ext': 'system/customer/cust_status',
                            'ids': `${custId}`,
                            'cust_status': _statusInput
                        })
                            .then(res => {
                                if (res.data.code === 1) {
                                    this.$notify({
                                        type: 'success',
                                        message: '操作成功'
                                    });
                                    userDataRow.custStatus = (userDataRow.custStatus === 0) ? 1 : 0;
                                }
                                else {
                                    this.$notify({
                                        type: 'error',
                                        message: res.data.msg
                                    });
                                }
                            })
                    })
                    .catch(() => { })
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            }

        }
    }

</script>
<style lang="scss" src="./user-list.scss" scoped></style>