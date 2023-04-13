<template>
	<div class="loginform">
		<div class="identity-tab">
			<n-tabs type="segment" style="width: 300px" ref="tabsInstRef" v-model:value="accountType" @update:value="handleUpdateValue">
				<n-tab name="0"> 求职 </n-tab>
				<n-tab name="1"> 招聘 </n-tab>
			</n-tabs>
		</div>
		<div class="form">
			<el-form ref="loginFormRef" :rules="rules" :model="form" label-width="90px">
				<el-form-item label="用户名：" prop="username">
					<el-input v-model="form.username" />
				</el-form-item>
				<el-form-item label="密码：" prop="password">
					<el-input v-model="form.password" type="password" show-password />
				</el-form-item>
			</el-form>
			<n-grid :x-gap="12" :y-gap="8" :cols="1">
				<n-grid-item>
					<n-button block type="primary" ghost color="#6979cb" round @click="submitForm(loginFormRef)">登录</n-button>
				</n-grid-item>
				<n-grid-item>
					<n-button block type="primary" ghost color="#6979cb" round @click="registerForm">注册</n-button>
				</n-grid-item>
			</n-grid>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { GlobalStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { FormInstance, FormRules } from "element-plus";
const loginStore = GlobalStore();
const route = useRouter();
const { accountType } = storeToRefs(loginStore);
const loginFormRef = ref<FormInstance>();
const form = reactive({
	username: "",
	password: "",
	accountType: accountType.value
});

const rules = reactive<FormRules>({
	username: [{ required: true, message: "用户名不能为空！", trigger: "blur" }],
	password: [{ required: true, message: "密码不能为空！", trigger: "blur" }]
});

const handleUpdateValue = (value: string) => {
	console.log(value);
};

const submitForm = async (formEl: FormInstance | undefined) => {
	console.log(formEl);
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			loginStore
				.login(form.username, form.password)
				.then(() => {
					route.push("/app/home");
				})
				.catch(() => {
					console.log("login error");
				});
		} else {
			console.log("error submit!", fields);
		}
	});
};
const registerForm = () => {
	// handle form registration
	route.push("/register");
};
</script>

<style lang="scss" scoped>
.loginform {
	margin-top: 20%;
	margin-left: 40%;
}
.form {
	width: 300px;
	margin-top: 20px;
}
</style>
