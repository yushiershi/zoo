
import axiosUtil from './axios'
import url from './url'

/**
 * 登录
 */
export function getSessionid() {
	return axiosUtil.axioSessionId(url.getSessionId);
}
export function login(data) {
	return axiosUtil.axiosLogin(url.login,data);
}
export function editpwd(data) {
	return axiosUtil.axiosPost(url.editpwd,data);
}
export function editpaypwd(data) {
	return axiosUtil.axiosPost(url.editpaypwd,data);
}
export function logout(data) {
	return axiosUtil.axiosPost(url.logout,data);
}
export function register(data) {
	return axiosUtil.axiosLoginPost(url.register,data);
}
export function registerCode(data) {
	return axiosUtil.axiosLoginGet(url.registerCode,data);
}
export function passCode(data) {
	return axiosUtil.axiosLoginGet(url.passCode,data);
}
export function getCodeImg(data) {
	return axiosUtil.axiosLoginImg(url.getImg,data);
}
export function uploadImg(data) {
	return axiosUtil.axiosPostImg(url.uploadImg,data);
}
/**
 * 个人中心
 */
export function getPersonInfo(data) {
	return axiosUtil.axiosGet(url.getPersonInfo,data);
}
export function adoptinfo(data) {
	return axiosUtil.axiosGet(url.adoptinfo,data);
}
export function getPointList(data) {
	return axiosUtil.axiosGet(url.getPointList,data);
}
export function getBespList(data) {
	return axiosUtil.axiosGet(url.getBespList,data);
}
export function recharge(data) {
	return axiosUtil.axiosGet(url.recharge,data);
}
export function rechargeinfo(data) {
	return axiosUtil.axiosGet(url.rechargeinfo,data);
}
export function giving(data) {
	return axiosUtil.axiosPost(url.giving,data);
}
export function discountzoo(data) {
	return axiosUtil.axiosPost(url.discountzoo,data);
}
export function adopttrade(data) {
	return axiosUtil.axiosGet(url.adopttrade,data);
}
export function transfertrade(data) {
	return axiosUtil.axiosGet(url.transfertrade,data);
}
export function tranconfirm(data) {
	return axiosUtil.axiosPost(url.tranconfirm,data);
}
export function sysmsg(data) {
	return axiosUtil.axiosGet(url.sysmsg,data);
}
export function usermsg(data) {
	return axiosUtil.axiosGet(url.usermsg,data);
}
export function teaminfo(data) {
	return axiosUtil.axiosGet(url.teaminfo,data);
}
export function idinfo(data) {
	return axiosUtil.axiosGet(url.idinfo,data);
}
export function creditinfo(data) {
	return axiosUtil.axiosGet(url.creditinfo,data);
}
export function payInfo(data) {
	return axiosUtil.axiosGet(url.payInfo,data);
}
export function discount(data) {
	return axiosUtil.axiosPost(url.discount,data);
}
/**
 * 宠物
 */
export function getZooList(data) {
	return axiosUtil.axiosGet(url.getZooList,data);
}
export function bespeakAction(data) {
	return axiosUtil.axiosGet(url.bespeakAction,data);
}
export function buyAction(data) {
	return axiosUtil.axiosGet(url.buyAction,data);
}
export function result(data) {
	return axiosUtil.axiosGet(url.result,data);
}
/**
 * 服务
 */
export function addWorkOrder(data) {
	return axiosUtil.axiosPost(url.workorder,data);
}
export function getFagList(data) {
	return axiosUtil.axiosGet(url.getFagList,data);
}
