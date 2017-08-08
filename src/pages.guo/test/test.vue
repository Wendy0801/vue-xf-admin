<template>

    <div>
        <div id="con">
            <p>你好</p>
        </div>
        <Hello :test="'12313'" @onDelete="doaaaaaa"/>
        <div>
             <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu index="1">
        <template slot="title">导航一</template>
        <el-menu-item-group title="分组一">
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">导航二</el-menu-item>
      <el-menu-item index="3">导航三</el-menu-item>
    </el-menu>
        </div>
    </div>
</template>
<script>
    import Hello from 'COMPONENTS/Hello' 
     import ApiService from 'SERVICES/api.service'
    export default {
        components : {
            Hello
        } ,
        mounted : function() {
            // ApiService.get({
            //     'ext' : 'homepage/carouse/read' ,
            //     'id' : '1' 
            // })
            // .then(res=>{
            //     console.log(res) ; 
            // })
            //  var editor = new wangEditor('con');
            //   editor.config.uploadImgUrl = 'http://192.168.68.23:30003/manager/ueditor';
            //   editor.create();
            

            
        },
        methods : {
            doaaaaaa() {
                alert('子组件触发删除！') ;
            }
        }
    }
</script>
<style lang="scss" src="./test.scss" scoped></style>
