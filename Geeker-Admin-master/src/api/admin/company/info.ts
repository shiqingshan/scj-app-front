import request from "@/utils/request";
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询企业列表
export function listCompany(query?: any) {
	return request({
		url: "/company/page/list",
		method: "get",
		params: query
	});
}
//获取企业
export function getCompany(id?: any) {
	return request({
		url: "/company/" + parseStrEmpty(id),
		method: "get"
	});
}

//新增企业
export function addCompany(data: any) {
	return request({
		url: "/company/add",
		method: "post",
		data: data
	});
}

//删除企业
export function delCompany(id?: any) {
	return request({
		url: "/company/delete/" + parseStrEmpty(id),
		method: "delete"
	});
}
//修改企业
export function updateCompany(data: any) {
	return request({
		url: "/company/update",
		method: "post",
		data: data
	});
}

//根据用户ID查询企业
export function listCompanyByUserId(query?: any) {
	return request({
		url: "/company/loginUser/page/list",
		method: "get",
		params: query
	});
}
//获取登录企业树
export function listCompanyTree() {
	return request({
		url: "/company/loginUser/treeList",
		method: "get"
	});
}
