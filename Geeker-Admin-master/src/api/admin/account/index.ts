import request from "@/utils/request";
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询企业列表
export function listAccount(query?: any) {
	return request({
		url: "/account/page/list",
		method: "get",
		params: query
	});
}
//获取企业
export function getAccount(id?: any) {
	return request({
		url: "/account/" + parseStrEmpty(id),
		method: "get"
	});
}

//删除企业
export function delAccount(id?: any) {
	return request({
		url: "/account/delete/" + parseStrEmpty(id),
		method: "delete"
	});
}
//修改企业
export function updateAccount(data: any) {
	return request({
		url: "/account/update",
		method: "post",
		data: data
	});
}
