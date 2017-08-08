<template>

    <div>
        <textarea id="textarea1" style="height:400px;">
            <p>请输入内容...</p>
        </textarea>
    </div>
</template>
<script>
    import Hello from 'COMPONENTS/Hello'
    import ApiService from 'SERVICES/api.service'
    export default {
        components: {
            Hello
        },
        mounted: function () {
           




            var editor = new wangEditor('textarea1');
            editor.config.uploadImgUrl = 'http://192.168.68.23:30003/manager/ueditor';
            // editor.config.hideLinkImg = true;
            editor.create();


        },
        methods: {
            doaaaaaa() {
                alert('子组件触发删除！');
            }
        }
    }

</script>
<style lang="scss" src="./test.scss" scoped></style>