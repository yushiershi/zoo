/**
 * axios封装
 */
import axios from 'axios'
import router from '../../router'
import qs from 'query-string';
import Vue from 'vue'
import { Message } from 'element-ui';
import urls from './url'

function getdescookie(matchcookie){
    let getMatchCookie;
    let arrCookie=document.cookie.split(";");
    for(let i=0;i<arrCookie.length;i++){
         let arr=arrCookie[i].split("=");
         if(matchcookie == arr[0]){
            getMatchCookie = arr[1];
            break;
         }
    }
    return getMatchCookie;
}
axios.defaults.withCredentials = true;
/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(config => {
	return config;
}, error => {
	return Promise.reject(error);
})

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(response => {
	if(response.data && response.data.status
		&& response.data.status.errCode){
		if(response.data.status.errCode === 200){
			return response.data;
		}else if (response.data.status.errCode === 506) {
			backLogin();
		}else if (response.data.status.errCode === 500) {
			errorMessaage('服务器开小差啦~');
		}else{
			errorMessaage(response.data.status.message);
		}
	}
	return response.data;
}, error => {  //响应错误处理
	if(error.response) {
		if (error.response.status === 504 || error.response.status === 404) {
			errorMessaage("请查看网络是否链接。");
		} else if (error.response.status === 403) {
		    errorMessaage('服务器开小差啦~');
		} else {
			errorMessaage('服务器开小差啦~');
		}
	}
	return Promise.reject(error);
})
//返回首页方法
function backLogin(){
	router.replace({name: 'login'});
}
//弹出错误信息弹框
function errorMessaage(msg){
  if(msg){
    Message.error(msg);
  }
}

export default {
	axioSessionId(url){
		let sessionid = localStorage.getItem("sessionid");
		axios.defaults.headers.common['wili-access-token'] = sessionid;
		return new Promise(function(resolve, reject){
			axios.get(url)
			.then(function (response) {
				if(response.data){
					localStorage.setItem("sessionid",response.data);
					axios.defaults.headers.common['wili-access-token'] = response.data;
					return resolve(response);
				}else{
					return reject(response);
				}
			})
		})
	},
	axiosLoginImg(url,params){
		if(!url){
			return;
		}
		if(!params){
			params = {};
		}
		let that = this;
		//params.Origin = "http://"+window.location.host;
		let sessionid = localStorage.getItem("sessionid");
		if(!sessionid){
			return new Promise(function(resolve, reject){
				axios.get(urls.getSessionId)
				.then(function (response) {
					localStorage.setItem("sessionid",response.data);
					sessionid = localStorage.getItem("sessionid");
					axios.defaults.headers.common['wili-access-token'] = response.data;
					resolve(new Promise(function(resolve, reject){
						axios.get(url+"?"+qs.stringify(params),{
							responseType: 'arraybuffer'
						}).then((response)=>{
							resolve(response);
						}).catch(res => {
							reject(res);
						})
					}))
				})
			})
		}
		axios.defaults.headers.common['wili-access-token'] = sessionid;
		return new Promise(function(resolve, reject){
			axios.get(url+"?"+qs.stringify(params),{
					responseType: 'arraybuffer'
				}).then((response)=>{
				resolve(response);
			}).catch(res => {
				reject(res);
			})
		})
	},
	axiosLoginGet(url,params){
		if(!url){
			return;
		}
		if(!params){
			params = {};
		}
		let that = this;
		//params.Origin = "http://"+window.location.host;
		let sessionid = localStorage.getItem("sessionid");
		if(!sessionid){
			return new Promise(function(resolve, reject){
				axios.get(urls.getSessionId)
				.then(function (response) {
					localStorage.setItem("sessionid",response.data);
					sessionid = localStorage.getItem("sessionid");
					axios.defaults.headers.common['wili-access-token'] = response.data;
					resolve(new Promise(function(resolve, reject){
						axios.get(url+"?"+qs.stringify(params)).then((response)=>{
							resolve(response);
						}).catch(res => {
							reject(res);
						})
					}))
				})
			})
		}
		axios.defaults.headers.common['wili-access-token'] = sessionid;
		return new Promise(function(resolve, reject){
			axios.get(url+"?"+qs.stringify(params)).then((response)=>{
				resolve(response);
			}).catch(res => {
				reject(res);
			})
		})
	},
	axiosLoginPost(url,params){
		if(!url){
			return;
		}
		if(!params){
			params = {};
		}
		let that = this;
		//params.Origin = "http://"+window.location.host;
		let sessionid = localStorage.getItem("sessionid");
		if(!sessionid){
			return new Promise(function(resolve, reject){
				axios.get(urls.getSessionId)
				.then(function (response) {
					localStorage.setItem("sessionid",response.data);
					sessionid = localStorage.getItem("sessionid");
					axios.defaults.headers.common['wili-access-token'] = response.data;
					document.cookie = 'session=' + response.data;
					resolve(new Promise(function(resolve, reject){
						axios.post(url,params).then((response)=>{
              let sessionid = getdescookie("session");
							resolve(response);
						}).catch(res => {
							reject(res);
						})
					}))
				})
			})
		}
		axios.defaults.headers.common['wili-access-token'] = sessionid;
		return new Promise(function(resolve, reject){
			axios.post(url,params).then((response)=>{
        let sessionid = getdescookie("session");
				resolve(response);
			}).catch(res => {
				reject(res);
			})
		})
	},
  axiosLogin(url,params){
  	if(!url){
  		return;
  	}
  	if(!params){
  		params = {};
  	}
  	let that = this;
  	let sessionid = localStorage.getItem("sessionid");
  	if(!sessionid){
  		return new Promise(function(resolve, reject){
  			axios.get(urls.getSessionId)
  			.then(function (response) {
  				localStorage.setItem("sessionid",response.data);
  				sessionid = localStorage.getItem("sessionid");
  				axios.defaults.headers.common['wili-access-token'] = response.data;
  				resolve(new Promise(function(resolve, reject){
  					axios.post(url,params).then((response)=>{
						localStorage.setItem("sessionid",response.data.val);
						axios.defaults.headers.common['wili-access-token'] = response.data.val;
  						resolve(response);
  					}).catch(res => {
  						reject(res);
  					})
  				}))
  			})
  		})
  	}
  	axios.defaults.headers.common['wili-access-token'] = sessionid;
  	return new Promise(function(resolve, reject){
  		axios.post(url,params).then((response)=>{
  			//document.cookie = 'session=' + response.data;
			localStorage.setItem("sessionid",response.data.val);
			axios.defaults.headers.common['wili-access-token'] = response.data.val;
  			resolve(response);
  		}).catch(res => {
  			reject(res);
  		})
  	})
  },
	axiosGet(url,params){
		if(!url){
			return;
		}
		if(!params){
			params = {};
		}
		/* let token = localStorage.getItem("token");
		if(token){
			//return errorMessaage('服务器开小差啦~');
			params.token = token;
		} */
		return new Promise(function(resolve, reject){
			axios.get(url+"?"+qs.stringify(params)).then((response)=>{
		    		resolve(response);
		    	})
		})
	},
	axiosPost(url,params){
		if(!url){
			return;
		}
		if(!params){
			params = {};
		}
		/* let token = localStorage.getItem("token");
		if(token){
			//return errorMessaage('服务器开小差啦~');
			params.token = token;
		} */
		return new Promise(function(resolve, reject){
			axios.post(url,params).then((response)=>{
				resolve(response);
			})
		})
	},
	axiosPostImg(url,params){
		if(!url){
			return;
		}
		if(!params){
			params = {};
		}
		/* let token = localStorage.getItem("token");
		if(token){
			//return errorMessaage('服务器开小差啦~');
			params.token = token;
		} */
		return new Promise(function(resolve, reject){
			axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response)=>{
				resolve(response);
			})
		})
	},
	axiosPut(url,params){
		if(!url){
			return;
		}
		if(!params){
			params = {};
		}
		/* let token = localStorage.getItem("token");
		if(token){
			//return errorMessaage('服务器开小差啦~');
			params.token = token;
		} */
		return new Promise(function(resolve, reject){
			axios.put(url,params).then((response)=>{
				resolve(response);
			})
		})
	},
	axiosDelete(url,params){
		if(!url){
			return;
		}
		if(!params){
			params = {};
		}
		/* let token = localStorage.getItem("token");
		if(token){
			//return errorMessaage('服务器开小差啦~');
			params.token = token;
		} */
		return new Promise(function(resolve, reject){
			axios.delete(url,params).then((response)=>{
				resolve(response);
			})
		})
	}
}
