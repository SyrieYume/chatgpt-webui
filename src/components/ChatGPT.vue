<script>
import axios from 'axios';
import { fetchEventSource } from '@microsoft/fetch-event-source';

var config = {
    apiUrl:"",
    apiKey:"",
    model:"",
    temperature:0.5,
    max_tokens:100,
    stop:""
};

function setUrl(apiUrl){
    config.apiUrl = apiUrl;
}
function setModel(model){
    config.model = model;
}
function setApiKey(key){
    config.apiKey = key;
}
function setConfig(data){
    for(let key in data){
        config[key] = data[key];
    }
}
function getConfig(){
    return config;
}

function post(messages,callback){
    const data = {
        "messages":messages,
        //"messages": [{"role":"user","content":prompt}],
        "model":config.model,
        "temperature": config.temperature,
        "max_tokens": config.max_tokens,
        "stop": config.stop
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + config.apiKey,
    };
    console.log(config)
    axios.post(config.apiUrl+"/v1/chat/completions/", data, { headers })
    .then(response => {
        console.log(response);
        callback({message:response.data.choices[0].message,error:false});
    })
    .catch(error => {
        console.error(error);
        callback({message:{role:"assistant",content:error.message,error:true}});
    })
}

function streamPost(messages,callback){
    const data = {
        "messages":messages,
        "model":config.model,
        "temperature": config.temperature,
        "max_tokens": config.max_tokens,
        "stop": config.stop,
        "stream":true
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + config.apiKey,
    };
    const eventSource = fetchEventSource(config.apiUrl+"/v1/chat/completions/",{
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
export default{
    name:"ChatGPT",
    config,
    setUrl,
    setApiKey,
    setModel,
    setConfig,
    getConfig,
    post,
    streamPost
}
</script>