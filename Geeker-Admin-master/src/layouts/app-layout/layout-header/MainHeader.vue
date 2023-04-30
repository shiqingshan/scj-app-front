<template>
	<div class="bg-#74d1af ma pa w-full color-white b" v-if="mainHeader.headerState == 'jobdetail'">
		<div ml-50>
			<el-row>
				<el-col :span="24" flex>{{ mainHeader.geStatusLabel }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" flex font-500 text-3xl>
					<el-space>
						<div>
							{{ mainHeader.jobHeader.jobName }}
						</div>
						<div color-red>
							{{ mainHeader.jobHeader.jobDetail.jobSalary }}
						</div>
					</el-space>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" flex>
					<el-space>
						<span>{{ mainHeader.jobHeader.jobDetail.jobAddr }}</span>
						<span>{{ mainHeader.jobHeader.jobDetail.jobQualification }}</span>
						<span>{{ mainHeader.jobHeader.jobDetail.jobEdu }}</span>
					</el-space>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-button plain type="primary" size="large" @click="toResume()">投递简历</el-button>
				</el-col>
			</el-row>
		</div>
		<!-- <div v-if="mainHeader.headerState == 'home'">
			<el-row>
				<el-col>
					<el-select v-model="value" placeholder="Select" size="large">
						<el-option v-for="(item, index) in selectList" :value="item.value" :key="index" :label="item.label"></el-option>
					</el-select>
				</el-col>
			</el-row>
		</div> -->

		<el-dialog v-model="open" :title="title" width="600px" append-to-body>
			<el-form :model="form" :rules="rules" ref="selectResumeForm" label-width="100px">
				<el-form-item label="简历" prop="resumeFileId">
					<el-select v-model="form.resumeFileId" placeholder="请选择">
						<el-option
							v-for="(item, index) in mainHeader.jobHeader.resumeList"
							:value="item.id"
							:key="index"
							:label="item.fileName"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="cancel">取 消</el-button>
					<el-button type="primary" @click="submitForm(selectResumeForm)">确 定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
	<div class="bg-#74d1af ma pa w-full color-white b" v-else-if="mainHeader.headerState == 'companydetail'">
		<div ml-50>
			<el-row>
				<el-col :span="24" flex font-500 text-3xl>
					<el-space>
						<div>
							{{ mainHeader.companyHeader.name }}
						</div>
					</el-space>
				</el-col>
			</el-row>
		</div>
	</div>
	<div mt-10 v-else></div>
</template>

<script setup lang="ts">
import { useMainHeader } from "@/stores/modules/app/mainHeader";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, toRefs } from "vue";
import { getUseOnlineResume, listUserResumeFile } from "@/api/app/resume";
import { GlobalStore } from "@/stores";
import router from "@/routers/index";
import { ElMessage, FormInstance } from "element-plus";
const mainHeader = useMainHeader();
const selectResumeForm = ref<FormInstance>();
import { addApply } from "@/api/app/apply";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
console.log(mainHeader);
const title = ref("选择简历文件");
const open = ref(false);

const data = reactive<{
	form: any;
	rules: any;
}>({
	form: {},
	rules: {
		resumeFileId: [{ required: true, message: "请选择一个简历文件", trigger: "blur" }]
	}
});
const { form, rules } = toRefs(data);
function reset() {
	form.value = {
		resumeFileId: undefined
	};
	proxy!.resetForm("selectResumeForm");
}

function cancel() {
	open.value = false;
	reset();
}

const toResume = () => {
	reset();
	console.log("toResume", mainHeader.jobHeader.id);
	//判断是否登录
	const globalStore = GlobalStore();
	const token = globalStore.token;
	if (!token) {
		ElMessage.error("用户未登录");
		router.push("/login");
		return;
	}
	//判断是否学生
	const accountType = globalStore.accountType;
	if (accountType != "0") {
		globalStore.logout();
		ElMessage.error("请先登录学生账号");
		router.push("/login");
		return;
	}
	//获取用户信息
	globalStore.getUserInfo().then((res: any) => {
		console.log(res);
		const applyForm: any = {};
		applyForm.jobId = mainHeader.jobHeader.id;
		listUserResumeFile().then((res: any) => {
			open.value = true;
			console.log("resumeFile", res.data);
			mainHeader.jobHeader.resumeList = res.data;
		});
	});
};
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(valid => {
		if (valid) {
			form.value.jobId = mainHeader.jobHeader.id;
			getUseOnlineResume().then((res: any) => {
				console.log("resume", res.data);
				form.value.resumeId = res.data.id;
				console.log("applyForm", form.value);
				//选择文件简历
				addApply(form.value).then((res: any) => {
					console.log(res);
					ElMessage.success("投递成功,编号为：" + res.data.id);
					cancel();
				});
			});
		}
	});
};

// const selectList = [
// 	{
// 		value: "lll",
// 		label: "11"
// 	}
// ];
//openSelectResume
</script>

<style scoped></style>
