<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'ImageCropper',
  props: {
    src: String,
    callback: Function
  },
  data(){
    return {
      cropper: null,
      isCropping:false
    };
  },
  methods: {
    selectImgFile(event){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        //获取base64编码的图片数据
        const imageData = reader.result;
        if(imageData == null) 
          return;
        this.$refs.cropImg.src = imageData;
        this.$refs.cropImg.style.display = 'block';
        this.isCropping = true;
        this.cropImage();
      };
      
    },
    cropImage() {
      this.$data.cropper = new Cropper(this.$refs.cropImg,{
        aspectRatio:1 // 裁剪比例
      });
    },
    saveImage(){
      var canvas = this.cropper.getCroppedCanvas();
      var dataURL = canvas.toDataURL();
      this.$refs.image.src = dataURL;
      this.$data.cropper.destroy();
      this.isCropping = false;
      if(this.$props.callback != null) 
        this.callback(dataURL);
    }
  }
}
</script>

<template>
  <div>
    <img class="headIcon" ref="image" :src="src"/>
    <div class="button">
      <label for="file-input">选择图片</label>
    </div>
    <input id="file-input" type="file" @change="selectImgFile" style="width:2px;position:absolute;opacity:0;"/>

    <img :src="src" alt="图片" class="cropImg" ref="cropImg" v-show="isCropping"/>
    <button class="button" ref="cropBtn" @click="saveImage" v-show="isCropping">裁剪</button>

  </div>
</template>

<style>
.button {
  display: inline-block;
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: rgba(220, 220, 220, 0.6);
  vertical-align: bottom;
}
.button:hover {
  background-color: rgba(215, 215, 215, 1.0);
}

.headIcon {
  height:80px;
  width:auto;
  margin-right: 15px;
}

.cropImg {
  display: block;
  max-width: 100%;
  margin: 5px 2px;
  box-sizing: border-box;
}
</style>