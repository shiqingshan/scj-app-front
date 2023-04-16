<template>
	<div>
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
import { useRegisterStore } from "@/stores/register/index";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { TabsStore } from "@/stores/modules/tabs";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import { ElNotification } from "element-plus";
import { getTimeState } from "@/utils/util";

const registerStore = useRegisterStore();
const loginStore = GlobalStore();
const tabsStore = TabsStore();
const keepAlive = KeepAliveStore();
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
	if (value === "0") {
		registerStore.form.title = "校园招聘学生登录";
	} else {
		registerStore.form.title = "校园招聘企业登录";
	}
	console.log(value);
};

const submitForm = async (formEl: FormInstance | undefined) => {
	console.log(formEl);
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			loginStore
				.login(form.username, form.password)
				.then(async () => {
					if (loginStore.accountType == "0") {
						route.push("/app/home");
					} else {
						// 2.添加动态路由
						await initDynamicRouter();

						// 3.清空 tabs、keepAlive 保留的数据
						tabsStore.closeMultipleTab();
						keepAlive.setKeepAliveName();

						// 4.跳转到首页
						route.push("/company/home");
						ElNotification({
							title: getTimeState(),
							message: "欢迎登录",
							type: "success",
							duration: 3000
						});
					}
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
	//route.push("/register");
	registerStore.formType = "register";
	if (loginStore.accountType === "0") {
		registerStore.form.title = "校园招聘学生注册";
	} else {
		registerStore.form.title = "校园招聘企业注册";
	}
};
</script>

<style lang="scss" scoped>
.form {
	width: 300px;
	margin-top: 20px;
}
</style>
