import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import * as types from '@/store/types'
import { Message } from 'element-ui';

Vue.use(Router);
const router = new Router({
	  //mode: 'history',  //去掉url中的#
	  routes: [
	    {
	      path: '/',
	      name: 'index',
	      component: resolve => require(['@/views/index'], resolve)
	    },
	    {
	      path: '/login',
	      name: 'login',
	      component: resolve => require(['@/views/login'], resolve)
	    },
	    {
	      path: '/regist',
	      name: 'regist',
	      component: resolve => require(['@/views/regist'], resolve)
	    },
	    {
	      path: '/forget',
	      name: 'forget',
	      component: resolve => require(['@/views/forget'], resolve)
	    },
	    {
		    path:"/main",
	        name:"main",
	        component: resolve => require(['@/views/main'], resolve),
	        children: [
	          {path: '/sx/index', name: 'sxIndex', meta:{requireAuth:true,tabIndex:1},
	        	  component: resolve => require(['@/views/sx/index'], resolve)},

	          {path: '/service/index', name: 'serviceIndex', meta:{requireAuth:true,tabIndex:2},
	        	  component: resolve => require(['@/views/service/index'], resolve)},
	          {path: '/service/gd', name: 'gd', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/service/gd'], resolve)},
	          {path: '/service/kf', name: 'kf', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/service/kf'], resolve)},
	          {path: '/service/online', name: 'online', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/service/online'], resolve)},

	          {path: '/my/index', name: 'myIndex', meta:{requireAuth:true,tabIndex:3},
	        	  component: resolve => require(['@/views/my/index'], resolve)},
	          {path: '/my/config', name: 'config', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/config'], resolve)},
	          {path: '/my/lyList', name: 'lyList', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/lyList'], resolve)},
	          {path: '/my/lyDetail/:id', name: 'lyDetail', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/lyDetail'], resolve)},
	          {path: '/my/lyContent/:id', name: 'lyContent', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/lyContent'], resolve)},
	          {path: '/my/zrList', name: 'zrList', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/zrList'], resolve)},
	          {path: '/my/zrDetail/:id', name: 'zrDetail', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/zrDetail'], resolve)},
	          {path: '/my/zrContent/:id', name: 'zrContent', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/zrContent'], resolve)},
	          {path: '/my/yyList', name: 'yyList', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/yyList'], resolve)},
	          {path: '/my/point', name: 'point', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/point'], resolve)},
	          {path: '/my/cz', name: 'cz', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/cz'], resolve)},
	          {path: '/my/zz', name: 'zz', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/zz'], resolve)},
	          {path: '/my/profit', name: 'profit', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/profit'], resolve)},
	          {path: '/my/cs', name: 'cs', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/cs'], resolve)},
	          {path: '/my/profitAll', name: 'profitAll', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/profitAll'], resolve)},
	          {path: '/my/zoo', name: 'zoo', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/zoo'], resolve)},
	          {path: '/my/tx', name: 'tx', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/tx'], resolve)},
	          {path: '/my/safe', name: 'safe', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/safe'], resolve)},
	          {path: '/my/verification', name: 'verification', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/verification'], resolve)},
	          {path: '/my/card', name: 'card', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/card'], resolve)},
	          {path: '/my/editPass', name: 'editPass', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/editPass'], resolve)},
	          {path: '/my/editCashPass', name: 'editCashPass', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/editCashPass'], resolve)},
	          {path: '/my/group', name: 'group', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/group'], resolve)},
	          {path: '/my/invite', name: 'invite', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/invite'], resolve)},
	          {path: '/my/msg', name: 'msg', meta:{requireAuth:true},
	        	  component: resolve => require(['@/views/my/msg'], resolve)},
	        ],
	    },
	  ]
});
router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {
		if(store.state.isLogin===true||store.state.isLogin==="true"){
			next();
		}else{
			store.commit(types.LOGOUT);
			Message.error("您没有权限访问该页面，请重新登录");
			next("/login");
		}
	}else{
		next();
	}
});

export default router;
