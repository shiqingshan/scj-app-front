import request, { download } from "@/utils/request";
// import { parseStrEmpty } from "@/utils/ruoyi";
// 查询用户简历
export function getUseOnlineResume() {
	return request({
		url: "/user/resume/get/online",
		method: "get"
	});
}

//添加/修改简历
export function updateUserResume(data: any) {
	return request({
		url: "/user/resume/update",
		method: "post",
		data: data
	});
}

//获取登录用户简历文件列表
export function listUserResumeFile() {
	return request({
		url: "/user/resume/file/list",
		method: "get"
	});
}

//添加用户简历文件
export function addUserResumeFile(data: any) {
	return request({
		headers: {
			"Content-Type": "multipart/form-data"
		},
		url: "/user/resume/file/add",
		method: "post",
		data: data
	});
}

//简历下载
export function downloadResumeFile(id?: any, filename: string) {
	download("/user/resume/file/download", { id: id }, filename);
}

//删除简历文件
export function removeResumeFile(id?: any) {
	return request({
		url: "/user/resume/file/delete/" + id,
		method: "delete"
	});
}
