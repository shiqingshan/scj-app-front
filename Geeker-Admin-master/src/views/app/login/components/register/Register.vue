<template>
	<div>
		<!--注册页面-->
		<div>
			<div class="register">
				<div class="register-form">
					<el-form ref="registerFormRef" :model="form" :rules="rules" label-width="130px">
						<el-form-item label="用户名：" prop="username">
							<el-input v-model="form.username" />
						</el-form-item>
						<el-form-item label="密码：" prop="password">
							<el-input v-model="form.password" />
						</el-form-item>
						<el-form-item label="手机号" prop="phoneNumber">
							<el-input v-model="form.phoneNumber" />
						</el-form-item>
						<el-form-item label="电子邮箱" prop="emailAddr">
							<el-input v-model="form.emailAddr" />
						</el-form-item>
						<div v-if="accountType === '1'">
							<el-form-item
								label="企业名称："
								prop="companyName"
								:rules="[{ required: true, message: '企业名称不能为空！', trigger: 'blur' }]"
							>
								<el-input v-model="form.companyName" />
							</el-form-item>
							<el-form-item
								label="工商注册号："
								prop="businessLicense"
								:rules="[{ required: true, message: '工商注册号不能为空！', trigger: 'blur' }]"
							>
								<el-input v-model="form.businessLicense" />
							</el-form-item>
						</div>
					</el-form>
					<n-grid :x-gap="12" :y-gap="8" :cols="1">
						<n-grid-item>
							<n-button block type="primary" ghost color="#6979cb" round @click="submitForm(registerFormRef)">注册</n-button>
						</n-grid-item>
						<n-grid-item>
							<n-button block type="primary" ghost color="#6979cb" round @click="restForm()">重置</n-button>
						</n-grid-item>
						<n-grid-item>
							<n-button block type="primary" ghost color="#6979cb" round @click="toLogin()">去登录</n-button>
						</n-grid-item>
					</n-grid>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GlobalStore } from "@/stores/index";
import { useRegisterStore } from "@/stores/register/index";
import { ElMessage, type FormInstance } from "element-plus";

const registerFormRef = ref<FormInstance>();
const loginStore = GlobalStore();
console.log(loginStore.$state.accountType);
const accountType = loginStore.accountType;
const registerStore = useRegisterStore();
registerStore.form.accountType = accountType;
const form = registerStore.form;
const rules = registerStore.rules;

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			registerStore.register().then((res: any) => {
				console.log(res);
				ElMessage.success("注册成功！");
			});
		} else {
			console.log("error submit!", fields);
		}
	});
};
const restForm = () => {};
const toLogin = () => {
	registerStore.formType = "login";
};
</script>

<style scoped>
.register-form {
	width: 300px;
	margin-top: 20px;
}
</style>
