<template>
    <div v-if="data">
        <el-row class="userinfo-row">
            <el-col :span="3" class="row-title">用户名</el-col>
            <el-col :span="17" class="row-content">{{data.custName}}</el-col>
        </el-row>
        <el-row class="userinfo-row">
            <el-col :span="3" class="row-title">用户头像</el-col>
            <el-col :span="17" class="row-content">
                <div class="user-face">
                    <img :src="data.custPortrait" alt="">
                </div>
            </el-col>
        </el-row>
        <!--<el-row class="userinfo-row">
            <el-col :span="3" class="row-title">用户ID</el-col>
            <el-col :span="17" class="row-content">{{data.cityId||'未知'}}</el-col>
        </el-row>-->
        <el-row class="userinfo-row">
            <el-col :span="3" class="row-title">手机号</el-col>
            <el-col :span="17" class="row-content">{{data.custMobile||'未知'}}</el-col>
        </el-row>
        <el-row class="userinfo-row">
            <el-col :span="3" class="row-title">地区</el-col>
            <el-col :span="17" class="row-content">{{data.cityName}}</el-col>
        </el-row>
        <el-row class="userinfo-row">
            <el-col :span="3" class="row-title">性别</el-col>
            <el-col :span="17" class="row-content">{{data.sex|sexTrans}}</el-col>
        </el-row>
        <el-row class="userinfo-row">
            <el-col :span="3" class="row-title">个性签名</el-col>
            <el-col :span="17" class="row-content">{{data.custDesc||'这个人很懒,没有签名'}}</el-col>
        </el-row>
        <el-row class="userinfo-row">
            <el-col :span="3" class="row-title">注册时间</el-col>
            <el-col :span="17" class="row-content">{{data.createTime||'未知'}}</el-col>
        </el-row>
        <el-row class="userinfo-row">
            <el-col :span="3" class="row-title">最近登陆</el-col>
            <el-col :span="17" class="row-content">{{data.updateTime||'未知'}}</el-col>
        </el-row>
       
    </div>
</template>
<script>
    export default {
        props : [
            'data'
        ]
    }
</script>
<style lang="scss" scoped>
    .userinfo-row {
        border: 1px solid #e1e1e1;
        margin-bottom:-1px;
        .el-col{
            padding:10px ; 
        }
        .row-title {
            font-size: 15px;
            font-weight: 600 ;
            border-right:1px solid #e1e1e1 ;
        }
        .row-content {
            margin-left:-1px;
            border-left:1px solid #e1e1e1;
        }
    }
</style>