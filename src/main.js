// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import './assets/css/public.css'
import './assets/css/icon.css'
import util from './utils/common/util'
import store from './store/store'
import * as types from './store/types'
import { Card,Message,InfiniteScroll,Loading,MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import cardLine from './components/cardLine';
import icon from './components/icon';
import inputLine from './components/inputLine';
import button from './components/button';
import commonCard from './components/commonCard';
import content from './components/content';
import lineItem from './components/lineItem';
import grayInput from './components/grayInput';
import noData from './components/noData';
import uploadImg from './components/uploadImg';
import { ptn } from './utils/common/validate'
import OnLoad from 'vue-onload'

Vue.component('zoo-card-line',cardLine);
Vue.component('zoo-icon',icon);
Vue.component('zoo-input-line',inputLine);
Vue.component('zoo-button',button);
Vue.component('zoo-common-card',commonCard);
Vue.component('zoo-content',content);
Vue.component('zoo-line-item',lineItem);
Vue.component('zoo-gray-input',grayInput);
Vue.component('zoo-no-data',noData);
Vue.component('zoo-upload-img',uploadImg);

Vue.use(Vuex);
Vue.use(router);
Vue.use(OnLoad);
Vue.use(Card);
Vue.use(InfiniteScroll);
Vue.use(Loading);

Vue.config.productionTip = false

//挂载的公共方法
Vue.prototype.$util = util;
Vue.prototype.$types = types;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$ptn = ptn;

if(localStorage.isLogin){
	store.commit(types.LOGIN,localStorage.isLogin);
	store.commit(types.USERNAME,localStorage.userName);
}
if(localStorage.userid){
	store.commit("setUserId",localStorage.userid);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  components: { App },
  template: '<App/>'
})
