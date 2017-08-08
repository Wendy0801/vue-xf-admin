<template>
  <div :id="editorId"></div>
</template>
<script>
  // 编辑器
  import $ from 'jquery';
  import 'wangeditor/dist/css/wangEditor.min.css';
  import 'wangeditor/dist/js/wangEditor.js';
  export default {
    data() {
      return {
        editor: null
      }
    },
    props: [
      'editorId',
      'token',
      'qnImgUrl',
      'editorText'
    ],
    watch: {
      'token': function () {
        if (this.token && this.token !== '') {
          this.initConfig();
        }
      },
      'editorText': function () {
        if (this.editorText && this.editorText !== '') {
          setTimeout(() => { this.setContent() }, 500);
        }
      }
    },
    mounted() {
      if (this.editorId && this.token && this.qnImgUrl) {
        this.initConfig();
      }
    },
    methods: {
      initConfig() {
        this.editor = new wangEditor(this.editorId);
        this.editor.config.uploadImgUrl = 'http://up-z2.qiniu.com/';
        this.editor.config.qiniuImgUrl = this.qnImgUrl;
        this.editor.config.uploadImgFileName = 'file';
        this.editor.config.uploadParams = {
          token: this.token
        };

        // 修改菜单栏fixed的上边距（单位 px）
        this.editor.config.menuFixed = 60;
        this.editor.create();
        $('#' + this.editorId).attr('style', 'height:auto');
      },
      getContent() {
        return this.editor.$txt.html();
      },
      getText() {
        return this.editor.$txt.text();
      },
      setContent() {
        this.editor.$txt.append(this.editorText);
      }
    }
  }

</script>