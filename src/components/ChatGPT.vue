<script>
import axios from 'axios';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import Common from './Common.vue';

function post(messages,callback){
    const data = {
        "messages":messages,
        "model":Common.config.apiModel,
        "temperature": Common.config.apiTemp,
        "max_tokens": Common.config.apiMaxTokens,
        "stop": Common.config.apiStop
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Common.config.apiKey,
    };
    
    axios.post(Common.config.apiUrl+"/v1/chat/completions", data, { headers })
    .then(response => {
        console.log(response);
        callback({message:response.data.choices[0].message,error:false});
    })
    .catch(error => {
        console.error(error);
        callback({message:{role:"assistant",content:error.message,error:true}});
    })
}

function getModels(callback){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Common.config.apiKey,
    };
    axios.get(Common.config.apiUrl+"/v1/models", { headers })
    .then(response => {
        console.log(response)
        if(response.status == 200){
            const models = []
            response.data.data.forEach(model => {
                models.push(model.id)
            });
            callback(models);
        }else
            callback(["gpt-3.5-turbo"])
    })
    .catch(error => {
        console.error(error);
        callback(["gpt-3.5-turbo"]);
    })
}

function streamPost(messages,callback){
    const data = {
        "messages":messages,
        "model":Common.config.apiModel,
        "temperature": Common.config.apiTemp,
        "max_tokens": Common.config.apiMaxTokens,
        "stop": Common.config.apiStop,
        "stream":true
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Common.config.apiKey,
    };
    const eventSource = fetchEventSource(Common.config.apiUrl+"/v1/chat/completions",{
        "method":"POST",
        "body":JSON.stringify(data),
        "headers":headers,
        "withCredentials": true, // 是否携带凭据信息
        "timeout": 60000, // 超时时间，单位为毫秒
        onopen(){
            console.log("SSE opened.")
        },
        onmessage(event){
            console.log(event.data);
            if(event.data == "[DONE]"){
                callback({"content":"","isDone":true});
                return ;
            }
            let jsonData = JSON.parse(event.data);
            let delta = jsonData.choices[0].delta;
            let content = "";
            if("content" in delta)
                content = delta.content;
            callback({"content":content,"isDone":false});
        },
        onerror(error){
            console.log(error);
            callback({"content":error,"isDone":true});
            if(close in eventSource)
                eventSource.close();
        }
    })

}
export default {
    name:"ChatGPT",
    post,
    streamPost,
    getModels
}
</script>