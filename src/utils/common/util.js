/**
 * 公共方法
 */
import router from '../../router'
import CryptoJS from 'crypto-js'
import store from '../../store/store'

//格式化时间时候用到
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}
function backHandler(){
    window.history.pushState(null, null, document.URL);
}
export default {

  	encodeAes(word){
  		if(!word){
  			return "";
  		}
  		let srcs = CryptoJS.enc.Utf8.parse(word);
  		let encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(store.state.aesKey), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  		return encrypted.ciphertext.toString();//还原;
  	},
  	decodeAes(word){
  		if(!word){
  			return "";
  		}
  		/* let key = CryptoJS.enc.Utf8.parse(store.state.aesKey2);
  		let decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  		return CryptoJS.enc.Utf8.stringify(decrypt).toString(); */
  		let key = CryptoJS.enc.Utf8.parse(store.state.aesKey);
  		let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  		let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  		let decrypt = CryptoJS.AES.decrypt(srcs, key, {
  			mode: CryptoJS.mode.ECB,
  			padding: CryptoJS.pad.Pkcs7
  		});
  		let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  		return decryptedStr.toString().replace(/\u0000/g,"");
  	},
	//后退一页
	goBack(){
		router.go(-1);
	},

	//导出
	downloadFile(name,url){
		let oldiframe = document.getElementById("downloadTmpIframe");
		if(oldiframe){
			document.body.removeChild(oldiframe);
		}
		let iframe = document.createElement("iframe");
		iframe.id = "downloadTmpIframe";
		iframe.name = "downloadTmpIframe";
		iframe.style.display = "none";
		document.body.appendChild(iframe);
		let a = document.createElement("a");
		if(name){
			a.setAttribute("download",name);
		}
		a.setAttribute("href",url);
		a.setAttribute("target","downloadTmpIframe");
		a.click();
	},
  //格式化时间
  specialDate(){
    /* let date = new Date();
    let mil = date.getTime()%1000;
    return this.formatDate(date,'yyyy-MM-ddThh:mm:ss.')+mil+"z"; */
    return this.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss')
  },
	//格式化时间
	formatDate(date, fmt) {
		if(!date){
			return "";
		}
		if(!fmt){
			fmt = "yyyy-MM-dd";
		}
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			}
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + ''
					fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
			}
		}
		return fmt;
	},

  //禁止浏览器返回键
  doStopReturn() {
	  if (window.history && window.history.pushState) {
	    window.addEventListener('popstate', backHandler, false);
	  }
	  window.history.pushState(null, null, document.URL);
  },
  removeStopReturn(){
    window.removeEventListener('popstate', backHandler, false);
  }

}
