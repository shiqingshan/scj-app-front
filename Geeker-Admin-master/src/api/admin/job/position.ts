import request from "@/utils/request";

export function listJobPosition(query?: any) {
	return request({
		url: "/job/position/list",
		method: "get",
		params: query
	});
}
export function getJobPosition(id: any) {
	return request({
		url: "/job/position/" + id,
		method: "get"
	});
}
export function delJobPosition(id: any) {
	return request({
		url: "/job/position/delete" + id,
		method: "delete"
	});
}
export function addJobPosition(data: any) {
	return request({
		url: "/job/position/add",
		method: "post",
		data: data
	});
}
export function updateJobPosition(data: any) {
	return request({
		url: "/job/position/update",
		method: "put",
		data: data
	});
}
export function listJobPositionExcludeChild(id: any) {
	return request({
		url: "/job/position/list/exclude/" + id,
		method: "get"
	});
}
