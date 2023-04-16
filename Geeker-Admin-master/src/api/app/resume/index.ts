import request from "@/utils/request";
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
