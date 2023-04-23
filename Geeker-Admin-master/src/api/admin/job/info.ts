import request from "@/utils/request";
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询招聘信息列表
export function listJobInfo(query?: any) {
	return request({
		url: "/job/jobInfo/page/list",
		method: "get",
		params: query
	});
}
//获取招聘信息
export function getJobInfo(id?: any) {
	return request({
		url: "/job/jobInfo/" + parseStrEmpty(id),
		method: "get"
	});
}

//删除招聘信息
export function delJobInfo(id?: any) {
	return request({
		url: "/job/jobInfo/delete/" + parseStrEmpty(id),
		method: "delete"
	});
}
//修改招聘信息
export function updateJobInfo(data: any) {
	return request({
		url: "/job/jobInfo/update",
		method: "post",
		data: data
	});
}
//新增招聘信息
export function addJobInfo(data: any) {
	return request({
		url: "/job/jobInfo/add",
		method: "post",
		data: data
	});
}

//根据当前用户招聘信息
export function listUserJobInfo(query?: any) {
	return request({
		url: "/job/jobInfo/user/page/list",
		method: "get",
		params: query
	});
}

//获取热门职位
export function listHotJobInfo(query?: any) {
	return request({
		url: "/job/jobInfo/hot/list",
		method: "get",
		params: query
	});
}
