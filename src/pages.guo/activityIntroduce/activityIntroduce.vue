<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-form :model="editForm" :rules="formRule" ref="editForm">
                <el-form-item label="赛事介绍内容编辑">
                </el-form-item>
                <el-form-item prop="acti_desc">
                    <el-input type="textarea" :rows="9" placeholder="请输入赛事介绍" v-model="editForm.acti_desc">
                    </el-input>
                </el-form-item>
                <!--<el-form-item label="" prop="acti_desc">-->
                <!-- 加载编辑器的容器 -->
                <!--<script id="container" name="content" type="text/plain">
                        <div>{{editForm.acti_desc}}</div>
                    </script>
                </el-form-item>-->
                <el-form-item label="" style="float:right">
                    <el-button type="primary" @click="saveIntroduce">保存</el-button>
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
                editForm: {
                    'acti_desc': ''
                },
                formRule: {
                    acti_desc: [
                        { required: true, message: '请输入赛事介绍' }
                    ]
                }
            }
        },
        computed: {},
        mounted: function () {
            this.getIntroduce();
        },
        methods: {
            getIntroduce:function(){
                ApiService.get({
                    'ext':'activity/read',
                    'acti_id':1
                }).then(res=>{
                    console.log(res);
                    this.editForm.acti_desc=res.data.data.actiDesc;
                })
            },
            saveIntroduce: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        ApiService.post({
                            'ext': 'activity/second-talent-show-competition-introduce',
                            'acti_desc': this.editForm.acti_desc
                        }).then(res => {
                            if (res.data.code == 1) {
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success'
                                });
                            } else {
                                this.$alert(res.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                }).catch(() => { })
                            }

                        })
                    } else {
                        return false;
                    }
                })






            }
        },
    }

</script>
<style>

</style>