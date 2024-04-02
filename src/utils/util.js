// 储存一条cookie数据
export function saveCookie(key,value,day){
  var d = new Date();
  d.setTime(d.getTime()+(day*24*60*60*1000));
  var expires = d.toGMTString();
  document.cookie = key + "=" + value + "; expires="+ expires +";";
}

// 获取cookie数据
export function getCookie(key){
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split("=");
    if (temp[0] == key)
        return decodeURIComponent(arrStr[i].replace(temp[0]+"=",""));
  }
  return "";
}

// 获取所有cookie
export function getCookies(){
  const cookies = {}
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split("=");
    let key = temp[0]
    let value = decodeURIComponent(arrStr[i].replace(temp[0]+"=",""))
    cookies[key] = value
  }
  return cookies;
}


// 将图片转换为 Base64 编码的字符串
export function imageToBase64(image) {
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  var dataURL = canvas.toDataURL('image/png');
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}

// 保存Base64图片到本地存储
export function saveBase64(key, base64) {
  localStorage.setItem(key, base64);
}

// 从本地存储中读取图片
export function loadBase64(key) {
  var base64 = localStorage.getItem(key);
  return base64;
}

// 将body大小设置为浏览器显示区域的高度（不包含浏览器底栏和头部）
export function setBrowserInterfaceSize() {
  var pageWidth = window.innerWidth;
  var pageHeight = window.innerHeight;
  if(typeof pageWidth != "number") { //在标准模式下面
    if (document.compatMode == "CSS1Compat" ) {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } 
    else {
      pageWidth = document.body.clientWidth;
      pageHeight = window.body.clientHeight;
    }
  }
  document.body.style.height = pageHeight + 'px';
}