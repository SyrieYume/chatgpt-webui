<script>
import {saveCookie,getCookie} from "../utils/util"
import ImageCropper from "@/components/ImageCropper.vue";
import Common from "@/components/Common.vue";
import ChatGPT from "@/components/ChatGPT.vue"

export default {
  name:"SettingsView",
  components:{ ImageCropper,Common },
  data(){
    return {
      apiUrl:"",
      apiKey:"",
      headIcon:"",
      apiModel:"",
      apiTemp:0,
      apiMaxTokens:0,
      supportModels: [],
      stream: true
    };
  },
  mounted() {
    for(let key in Common.config)
      this.$data[key] = Common.config[key];
    this.supportModels = [this.apiModel]
    this.headIcon = Common.headIcon;
  },
  methods: {
    getModels(){
      if(this.supportModels.length < 2 && this.apiUrl!="" && this.apiKey!="")
        ChatGPT.getModels(models => {
          this.supportModels = models
        })
    },
    saveData(){
      for(let key in this.$data){
        saveCookie(key,this.$data[key],1000);
        Common.config[key] = this.$data[key];
      }
      alert("保存成功！");
    },
    saveImage(imageBase64){
      localStorage.setItem("headIcon",imageBase64);
      Common.headIcon = imageBase64;
    }
  }
}
</script>

<template>
  <div class="mainContent">
    <h2>设置</h2>

    <div class="column">
      <b>聊天头像: </b><br/>
      <p class="tip">显示在聊天界面的头像。</p>
      <ImageCropper :src="headIcon" :callback="saveImage"></ImageCropper>
    </div>

    <div class="column">
      <b>ChatGPT URL:</b><br/>
      <p class="tip">输入openAI chatGPT的API地址，或者第三方的chatGPT API地址。</p>
      <input class="input" type="text" placeholder="https://api.chatanywhere.cn" v-model="apiUrl"/>
    </div>

    <div class="column">
      <b>API Key: </b><br/>
      <p class="tip">输入你的api密钥，格式：sk-xxxxxxxxxxxxxxxx。</p>
      <input class="input" type="text" v-model="apiKey"/>
    </div>

    <div class="column">
      <b>模型: </b><br/>
      <p class="tip">选择使用的语言模型。</p>
      <select class="input" v-model="apiModel" v-on:focus="getModels()">
        <option v-for="model in supportModels">{{model}}</option>
      </select>
    </div>

    <div class="column">
      <b>创造性: </b><br/>
      <p class="tip">0.0到1.0，值越高，生成的回答的多样性和创造性越高，但也会更不准确，更不可预测，通常选择0.5到1.0之间。</p>
      <input class="input" type="number" step="0.1" min="0" max="1" v-model="apiTemp"/>
    </div>

    <div class="column">
      <b>最大token数量: </b><br/>
      <p class="tip">控制生成文本的长度，一个单词、空格、标点符号都可能占用一个token，建议50到200之间。</p>
      <input class="input" type="number" v-model="apiMaxTokens"/>
    </div>

    <div class="column">
      <b>流式传输: &nbsp;</b><input type="checkbox" v-model="stream">
      <br/>
      <p class="tip">关闭后，需要等整个回答生成完毕才能收到回复。</p>
    </div>

    <button class="button" @click="saveData">保存</button>
  </div>
  
</template>

<style scoped lang="scss">
.mainContent {
  flex-grow: 1;
  padding:1vh 2vw 1vh 2vw;
  text-align: left;
}
.column {
  margin: 2.5vh 1vw;
}
.column>* {
  margin:1vh 0;
  font-size: 1.1rem;
}
.tip {
  color:rgb(120,120,120);
  font-size: 0.9rem;
}
.input {
  font-size: 0.9rem;
  height:30px;
  width: 80%;
  border-radius: 5px 5px;
  border:2px solid gainsboro;
  padding-left: 5px;
  //caret-color: gainsboro;
}
.input:focus,.input:hover {
  border-color:rgb(172, 210, 223);
  outline:none;
}

.button {
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 3px;
  background-color: rgba(220, 220, 220, 0.6);
}
.button:hover {
  background-color: rgba(215, 215, 215, 1.0);
}

.headIcon {
  height:80px;
  width:auto;
  margin-right: 15px;
}

</style>