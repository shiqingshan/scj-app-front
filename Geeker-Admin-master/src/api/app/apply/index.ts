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
		url: "/job/apply/" + parseStrEmpty(id),
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
