import request from "@/utils/request";
import { parseStrEmpty } from "@/utils/ruoyi";
// 查询投递申请
export function listApply(query?: any) {
	return request({
		url: "/job/apply/page/list",
		method: "get",
		params: query
	});
}
//获取投递申请
export function getApply(id?: any) {
	return request({
		url: "/job/apply/get/" + parseStrEmpty(id),
		method: "get"
	});
}
//投递简历
export function addApply(data: any) {
	return request({
		url: "/job/apply/add",
		method: "post",
		data: data
	});
}

//获取当前学生的投递申请
export function listUserApply(query?: any) {
	return request({
		url: "/job/apply/user/page/list",
		method: "get",
		params: query
	});
}
//获取当前用户企业下的投递申请
export function listCompanyApply(query?: any) {
	return request({
		url: "/job/apply/company/page/list",
		method: "get",
		params: query
	});
}

//发起面试邀请
export function addInterview(data: any) {
	return request({
		url: "/job/interview/add",
		method: "post",
		data: data
	});
}

//获取当前用户企业下的面试邀请
export function listCompanyInterView(query?: any) {
	return request({
		url: "/job/interview/company/page/list",
		method: "get",
		params: query
	});
}
//获取面试邀请信息
export function getInterview(id?: any) {
	return request({
		url: "/job/interview/get/" + parseStrEmpty(id),
		method: "get"
	});
}
//获取当前用户的面试邀请
export function listUserInterView(query?: any) {
	return request({
		url: "/job/interview/user/page/list",
		method: "get",
		params: query
	});
}

//修改面试邀请状态
export function updateInterview(data: any) {
	return request({
		url: "/job/interview/update",
		method: "post",
		data: data
	});
}
