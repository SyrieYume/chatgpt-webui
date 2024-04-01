<script>
import {marked} from "marked";
export default {
  name: 'Message',
  props: {
    headIcon: String,
    msg: String,
    sender: String
  },
  computed:{
    markedMsg(){
        //var htmlStr = marked(this.msg,{headerIds:false,mangle:false});
        //return htmlStr.replace(/(^[\s\n\r\t]+|[\s\n\r\t]+$|<br\/>)/g,'').replace(/<([a-zA-Z]+)>/g,"<$1 style='margin:0;'>");
        return this.msg;
    }
  },
  methods:{
    setMessage(message){
        this.msg = message;
    }
  }
}
</script>

<template>
    <div :class="['message',sender]">
        <img class="headIcon" :src="headIcon"/>
        <div class="text" v-text="markedMsg"></div>
    </div>
</template>

<style scoped lang="scss">
$icon_size: 35px;
.message {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    padding:10px 0;
}
.user {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
}
.headIcon {
    display: inline-block;
    vertical-align: top;
    margin:0 8px;
    width: $icon_size;
    height: $icon_size;
}
.text {
    display: inline-block;
    vertical-align: top;
    padding: 8px;
    max-width: 70vw;
    word-wrap:break-word;
    white-space: pre-line;
    text-align: left;
    font-size: 1rem;
    border-radius: 5px 5px;
    background-color: rgb(239, 239, 239);
    overflow-x: auto;
}

</style>

