import { FormRules } from "element-plus";
import { defineStore } from "pinia";
import { register } from "@/api/app/user";

export const useRegisterStore = defineStore("userRegister", {
	state: () => ({
		form: {
			accountType: "0",
			userame: "",
			password: "",
			companyName: "",
			companyAddress: "",
			contact: "",
			contactPhone: "",
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
