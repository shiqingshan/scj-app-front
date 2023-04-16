import { FormRules } from "element-plus";
import { defineStore } from "pinia";
import { register } from "@/api/app/user";

export const useRegisterStore = defineStore("userRegister", {
	state: () => ({
		formType: "login",
		form: {
			title: "校园招聘学生登录",
			accountType: "0",
			username: "",
			password: "",
			emailAddr: "",
			phoneNumber: "",
			nickName: "",
			companyName: "",
			businessLicense: ""
		},
		rules: <FormRules>{
			username: [{ required: true, message: "用户名不能为空！", trigger: "blur" }],
			password: [{ required: true, message: "密码不能为空！", trigger: "blur" }]
		}
	}),
	getters: {},
	actions: {
		//注册
		register() {
			return new Promise((resolve, reject) => {
				console.log(this.form);
				register(this.form)
					.then((res: any) => {
						console.log(res);
						resolve(1);
					})
					.catch(error => {
						reject(error);
					});
			});
		}
	}
});
