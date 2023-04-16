import request from "@/utils/request";

// 登录方法
export function login(username: string, password: string, accountType: string) {
	const data = {
		userName: username,
		password: password,
		accountType: accountType
	};
	return request({
		url: "/user/auth/login",
		headers: {
			isToken: false
		},
		method: "post",
		data: data
	});
}

export function register(data: any) {
	return request({
		url: "/user/auth/register",
		headers: {
			isToken: false
		},
		method: "post",
		data: data
	});
}

export function getUserInfoApi() {
	return request({
		url: "/user/auth/getUserInfo",
		method: "get"
	});
}

export function logout() {
	return request({
		url: "/user/auth/logout",
		method: "post"
	});
}
