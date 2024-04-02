<script>
import { getCookies } from '@/utils/util';

var config = {
  apiUrl:"",
  apiKey:"",
  apiModel:"gpt-3.5-turbo",
  apiTemp:0.6,
  apiMaxTokens:200,
  apiStop:"\0",
  stream: true
};

let cookies = getCookies()
console.log(cookies)
for(let key in config){
  if(key in cookies){
    if(typeof config[key] == "string")
      config[key] = cookies[key];
    else
      config[key] = eval(cookies[key]);
  }
    
}

var headIcon = localStorage.getItem("headIcon");

if(headIcon == null)
  headIcon = require("@/assets/icon_user.jpg");

export default {
  config,
  headIcon,
  name:"Common"
}
</script>