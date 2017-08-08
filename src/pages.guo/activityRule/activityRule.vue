<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :model="editForm" :rules="formRule" ref="editForm">
                <el-form-item label="赛事规则内容编辑">
                </el-form-item>
                <el-form-item prop="acti_explain">
                    <el-input type="textarea" :rows="9" placeholder="请输入赛事规则" v-model="editForm.acti_explain">
                    </el-input>
                </el-form-item>
                <!--<el-form-item label="" prop="acti_explain">-->
                <!-- 加载编辑器的容器 -->
                <!--<script id="container" name="content" type="text/plain">
                        <div>{{editForm.acti_explain}}</div>
                    </script>
                </el-form-item>-->
                <el-form-item label="" style="float:right">
                    <el-button type="primary" @click="saveRule">保存</el-button>
                </el-form-item>


            </el-form>
        </el-col>
    </section>
</template>

<script>
    import ApiService from 'SERVICES/api.service'
    export default {
        name: 'sign',
        data() {
            return {
                myEditor: {},
                editorId: '',
                editForm: {
                    acti_explain: ''
                },
                formRule: {
                    acti_explain: [
                        { required: true, message: '请输入赛事规则' }
                    ]
                }
            }
        },
        computed: {},
        mounted: function () {
            this.getRule();
        },
        destroyed() {
        },
        methods: {
            getRule:function(){
                ApiService.get({
                    'ext':'activity/read',
                    'acti_id':1
                }).then(res=>{
                    console.log(res);
                    this.editForm.acti_explain=res.data.data.actiExplain;
                })
            },
            saveRule: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        ApiService.post({
                            'ext': 'activity/second-talent-show-competition-explain',
                            'acti_explain': this.editForm.acti_explain
                        }).then(res => {
                            if (res.data.code == 1) {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success'
                                });
                            } else {
                                this.$alert(res.data.msg, '提示', {
                                    confirmButtonText: '确定'
                                }).catch(() => { })
                            }

                        })
                    } else { return false; }
                })

            }
        },
    }

</script>
<style>

</style>