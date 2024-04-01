<script>
import { getCookie } from '@/utils/util';

var config = {
  apiUrl:"",
  apiKey:"",
  apiModel:"gpt-3.5-turbo",
  apiTemp:0.6,
  apiMaxTokens:200,
  apiStop:"\0"
};

for(let key in config){
  let cookie = getCookie(key);
  if(cookie != "")
    config[key] = config[key].constructor(cookie);
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