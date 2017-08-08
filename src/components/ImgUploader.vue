<template>
  <div>
    <el-upload :action="uploadUrl" :data="uploadImgData" :name="'file'" :on-success="onSuccess"
    :before-upload="checkData">
      <el-button size="small" type="primary">{{btnText}}</el-button>
    </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uploadUrl: 'http://up-z2.qiniu.com/',
        qiniuImgUrl:this.qnImgUrl,
        uploadImgData: {
          token: ''
        }
      }
    },
    props: [
      'btnText',
      'token',
      'limit',
      'qnImgUrl'
    ],
    watch: {
      'token': function() {
        if (this.token && this.token !== '') {
          this.initConfig();
        }
      }
    },
    mounted() {

    },
    methods: {
      initConfig() {
        this.uploadImgData = {
          token: this.token
        }
      },
      checkData(file) {
        return new Promise((resolve, reject) => {
          if (this.limit) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
              var img = new Image();
              img.src = e.target.result;
              console.log(img.src)
              img.onload = (e) => {
                console.log(img.width,img.height)
                console.log(this.limit.width,this.limit.height)
                if (img.width <= this.limit.width && img.height <= this.limit.height) {
                  resolve(true);
                } else {
                  this.$emit('onSizeError','图片尺寸不符合规范');
                  reject('图片尺寸不符合规范');
                }
              }
            }
          } else {
            resolve(true);
          }
        })
      },
      onSuccess(data) {
        var _imgUrl = `${this.qiniuImgUrl}${data.key}` ;
        this.$emit('onSuccess', _imgUrl,data);
      }
    }
  }
</script>
<style>
  .el-upload{
    margin-top: 12px;
  }
</style>
