<script>
import Message from '@/components/Message.vue'
import Common from '@/components/Common.vue';
import ChatGPT from '@/components/ChatGPT.vue';

export default {
  name:"ChatView",
  components: { Message,Common,ChatGPT },
  data(){
    return {
      conversation:[],
      inputText:"",
      headIcons:{
        chatGPT:null,
        user:null
      },
      loadingMessage:-1,
      loadingTimer:""
    }
  },
  activated(){
    this.headIcons.assistant = require("@/assets/icon_chatGPT.svg");
    this.headIcons.user = Common.headIcon;
  },
  mounted(){
    // inputBox根据文本行数自动调整高度
    this.$refs.inputBox.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  },
  methods: {
    newConversation(){
      this.conversation = [];
    },
    sendMessage(){
      if(this.inputText.length == 0)
        return;
      if(this.loadingMessage >= 0)
        return;
      
      this.loadingMessage = this.conversation.length+1;
      this.conversation.push({role:"user",content:this.inputText});
      var messages = JSON.parse(JSON.stringify(this.conversation));
      // 加载动画
      this.conversation.push({role:"assistant",content:"..."});
      this.loadingTimer = setInterval(() => {
        if (this.conversation[this.loadingMessage].content.length < 5) {
          this.conversation[this.loadingMessage].content += '.'
        } else {
          this.conversation[this.loadingMessage].content = '.'
        }
      },200);

      // 发送请求
      ChatGPT.setConfig({
        apiUrl:Common.config.apiUrl,
        apiKey:Common.config.apiKey,
        model:Common.config.apiModel,
        temperature:Common.config.apiTemp,
        max_tokens:Common.config.apiMaxTokens,
        stop:Common.config.apiStop
      });
      ChatGPT.streamPost(messages,this.getResponseStream);

      this.inputText = "";

      // 将滚动条滚动到底部
      this.$nextTick(() => {
        const scrollDiv = this.$refs.scrollDiv;
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
      })
    },

    // 获得回复
    getResponse(response){
      clearInterval(this.loadingTimer);
      this.loadingTimer = null;
      this.conversation[this.loadingMessage] = response.message;
      this.loadingMessage = -1;
    },
    // 获得回复（流式）
    getResponseStream(response){
      if(this.loadingTimer != null){
        clearInterval(this.loadingTimer);
        this.loadingTimer = null;
        this.conversation[this.loadingMessage].content = "";
      }
      this.conversation[this.loadingMessage].content += response.content;
      if(response.isDone)
        this.loadingMessage = -1;
    }
  },
  
}
</script>

<template>
  <div class="mainContent">
    <div class="conversation" ref="scrollDiv">
      <Message :headIcon="headIcons['assistant']" msg="Hello!I'm chatGPT." sender="assistant"></Message>
      <Message :headIcon="headIcons['assistant']" msg="What can I help you?" sender="assistant"></Message>
      <Message v-for="message in conversation" 
        :headIcon="headIcons[message.role]" :msg="message.content" :sender="message.role"></Message>
    </div>
    <div class="messageInput">
      <textarea class="inputBox" v-model="inputText" ref="inputBox" @keydown.enter.prevent="sendMessage" rows="1" cols="27" onpropertychange="this.style.posHeight=this.scrollHeight"/>
      <button class="button" @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mainContent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  padding:1vh 2vw 1vh 2vw;
}
.conversation {
  flex-grow: 1;
  height: 10px;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-face-color: rgba(100,100,100,0.4);
  scrollbar-arrow-color:rgba(100,100,100,0.1);
  scrollbar-shadow-color: rgba(100,100,100,0.1);
  scrollbar-track-color: rgba(100,100,100,0.1);
}
.messageInput {
  flex-shrink: 1;
  width:100%;
  box-sizing: border-box;
  text-align: right;
  border-radius: 5px 5px;
  border:2px solid gainsboro;
  padding:5px 5px;
}
.inputBox {
  width:100%;
  box-sizing: border-box;
  word-wrap: break-word;
  font-size: 1.1rem;
  border: none;
  outline: none;
  //caret-color: gainsboro;
  resize: none;
}
.button {
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 7px 15px;
  border-radius: 10px;
  color: rgb(70,70,70);
  background-color: rgba(16, 163, 127, 0.5);
}
.button:hover {
  background-color: rgba(16, 163, 127, 0.7);
}
</style>
