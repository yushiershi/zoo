/**
 * 模块
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
	state : {
		//isUrl: "http://localhost:8005",
		isUrl: "http://107.182.183.201:8006",
		imgUrl: "http://107.182.183.201:8080",
		isLogin: false,
		userName: "",
		account:"",
		pagesize:10,
		aesKey:"shoutouttothezoo",
		userid:null,
		timestamp:new Date().getTime(),
	},
	mutations : {
    ["SET_TIME"]:(state) =>{
      state.timestamp = new Date().getTime();
    },
    ["setUserId"]: (state, data) => {
      localStorage.userid = data;
      state.userid = data;
    },
    [types.LOGIN]: (state, data) => {
      localStorage.isLogin = data;
      state.isLogin = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userid');
      state.isLogin = false;
    },
    [types.USERNAME]: (state, data) => {
      localStorage.userName = data;
      state.userName = data;
    },
    [types.ACCOUNT]: (state, data) => {
      localStorage.account = data;
      state.account = data;
		}
	}
})
