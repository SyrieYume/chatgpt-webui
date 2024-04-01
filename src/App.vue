<script>
import {setBrowserInterfaceSize} from "./utils/util"

export default {
  name:"App",
  mounted() {
    // 将body大小设置为浏览器显示区域的高度（不包含浏览器底栏和头部）
    setBrowserInterfaceSize();
    // 监听页面大小变化
    window.addEventListener('resize',function(){
      document.body.style.height = window.innerHeight + "px";
    });
  },
  methods:{
    newConversation(){
      this.$refs.routerComponent.newConversation()
    }
  }
}

</script>

<template>
  <!-- 网页顶部区域 -->
  <div id="header">
    <!-- logo和标题（左侧） -->
    <router-link id="title" to="/">
      <img class="logo" src="./assets/icon_chatGPT.svg"/>
      <b>ChatGPT</b>
    </router-link>
    <!-- 选项按钮（右侧） -->
    <div id="headerButtonsBox">
      <!-- 新建对话按钮 -->
      <button class="imgButton" style="margin-right: 5px;" 
        @click="newConversation" 
        v-show="$router.currentRoute.value.name == 'ChatView'">
        <img src="./assets/icon_note.png"/>
        新建对话
      </button>
      <!-- 设置按钮 -->
      <router-link to="/settings" class="imgButton"> 
      <img src="./assets/icon_settings.png"/>
    </router-link>
    </div>
  </div>

  <!-- 内容区域 -->
  <router-view v-slot="{ Component }">
    <!-- keep-alive 保持每个页面的状态不会因为路由变化而丢失 -->
    <keep-alive>
      <component :is="Component" ref="routerComponent"/>
    </keep-alive>
  </router-view>
  
</template>

<style lang="scss">
$icon_size: 35px;
$icon_size_medium:25px;

html {
  font-size:16px;
}
html,body{
  margin: 0;
  padding: 0;
  border: none;
}
body{
  width: 100vw;
  height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  width:100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#header {
  width:100%;
  height:auto;
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  flex: 0;
  font-size: 0.9rem;
  justify-content: space-between;
  padding:5px;
  box-sizing: border-box;
}
#title {
  display: flex;
  width: auto;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color:inherit;
}
.logo {
  margin-right: 5px;
  width: $icon_size;
  height: $icon_size;
}
#headerButtonsBox {
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;
}

.imgButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: auto;
  font-size: 1rem;
  border: none;
  border-radius: 5px 5px;
  background: none;
  opacity: 0.8;
}
.imgButton:hover {
  background-color:gainsboro;
}
.imgButton>img {
  width: $icon_size;
  height: $icon_size;
  opacity: 0.8;
}
</style>
