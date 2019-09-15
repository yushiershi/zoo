import store from '../../store/store'
export default {
	/**登录**/
	//获取sessionid
	getSessionId: store.state.isUrl + '/essence/login/getsome',
	//登录
	login: store.state.isUrl + '/essence/login/login',
	//编辑密码
	editpwd: store.state.isUrl + '/essence/login/editpwd',
	//编辑支付密码
	editpaypwd: store.state.isUrl + '/essence/login/editpaypwd',
	//登出
	logout: store.state.isUrl + '/essence/login/logout',
	//注册
	register: store.state.isUrl + '/essence/login/register',
	//发送注册验证码短信
	registerCode: store.state.isUrl + '/essence/sms/sendRegistCode',
  //发送修改密码的验证码
  passCode: store.state.isUrl + '/essence/sms/sendChangePwdCode',
	//获取验证码
	getImg: store.state.isUrl+'/essence/login/loginCaptcha',
  //上传图片
  uploadImg: store.state.isUrl+'/essence/image/imageprodu',
	/**个人中心**/
  //个人信息
	getPersonInfo: store.state.isUrl+'/essence/personal/personal',
  //领养/转让记录
  adoptinfo: store.state.isUrl+'/essence/personal/adoptinfo',
  //flow/资产流水
  getPointList: store.state.isUrl+'/essence/integral/flow',
  //转让
  discount: store.state.isUrl+'/essence/personal/Discount',
  //预约记录
  getBespList: store.state.isUrl+'/essence/personal/appointment',
  //充值
  recharge: store.state.isUrl+'/essence/integral/recharge',
  //充值详情
  rechargeinfo: store.state.isUrl+'/essence/integral/rechargeinfo',
  //转赠
  giving: store.state.isUrl+'/essence/integral/giving',
  //提现
  discountzoo: store.state.isUrl+'/essence/personal/Discountzoo',
  //领养详情
  adopttrade: store.state.isUrl+'/essence/trade/adopttrade',
  //转让详情
  transfertrade: store.state.isUrl+'/essence/trade/transfertrade',
  //领养/转让确认
  tranconfirm: store.state.isUrl+'/essence/trade/tranconfirm',
  //系统消息
  sysmsg: store.state.isUrl+'/essence/mess/sysmsg',
  //个人消息
  usermsg: store.state.isUrl+'/essence/mess/usermsg',
  //团队信息
  teaminfo: store.state.isUrl+'/essence/personal/teaminfo',
  //实名认证
  idinfo: store.state.isUrl+'/essence/personal/idinfo',
  //银行卡信息
  creditinfo: store.state.isUrl+'/essence/personal/creditinfo',
  //账户信息
  payInfo: store.state.isUrl+'/essence/personal/PayInfo',
  /**宠物**/
  //首页
  getZooList: store.state.isUrl+'/essence/index/index',
  //预约
  bespeakAction: store.state.isUrl+'/essence/index/appoint',
  //抢购
  buyAction: store.state.isUrl+'/essence/index/buying',
  //结果
  result: store.state.isUrl+'/essence/index/result',
  /**服务**/
  //提交工单
  workorder: store.state.isUrl+'/essence/service/workorder',
  //常见问题
  getFagList: store.state.isUrl+'/essence/FAQ/faq',
}
