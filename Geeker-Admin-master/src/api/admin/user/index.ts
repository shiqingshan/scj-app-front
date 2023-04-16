import request from "@/utils/request";
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询企业列表
export function listUser(query?: any) {
	return request({
		url: "/user/page/list",
		method: "get",
		params: query
	});
}
//获取企业
export function getUser(id?: any) {
	return request({
		url: "/user/" + parseStrEmpty(id),
		method: "get"
	});
}

//新增企业
export function addUser(data: any) {
	return request({
		url: "/user/add",
		method: "post",
		data: data
	});
}

//删除企业
export function delUser(id?: any) {
	return request({
		url: "/user/delete/" + parseStrEmpty(id),
		method: "delete"
	});
}
//修改企业
export function updateUser(data: any) {
	return request({
		url: "/user/update",
		method: "post",
		data: data
	});
}
