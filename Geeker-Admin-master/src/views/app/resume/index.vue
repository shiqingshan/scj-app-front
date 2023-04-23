<template>
	<n-layout embedded content-style="padding: 24px;">
		<n-grid :cols="24" :x-gap="24" item-responsive responsive="screen">
			<n-grid-item :span="3">
				<div>
					<n-anchor affix listen-to=".resumeOnline" :trigger-top="24" :top="88" style="z-index: 1" :bound="24">
						<n-anchor-link title="个人简历" href="#演示">
							<n-anchor-link title="个人信息" href="#basic.vue" />
							<n-anchor-link title="个人优势" href="#ignore-gap.vue" />
							<n-anchor-link title="期望职位" href="#affix.vue" />
						</n-anchor-link>
					</n-anchor>
				</div>
			</n-grid-item>
			<n-grid-item :span="15">
				<div class="resumeOnline">
					<n-form
						ref="formRef"
						:model="form"
						:rules="rules"
						label-placement="top"
						label-width="auto"
						require-mark-placement="right-hanging"
						:size="size"
					>
						<n-card
							title="个人信息"
							hoverable
							:segmented="{
								content: true
							}"
							:bordered="false"
						>
							<template #header-extra> #header-extra </template>

							<n-grid :cols="24" :x-gap="24">
								<n-form-item-gi :span="12" label="姓名" path="fullName">
									<n-input v-model:value="form.fullName" placeholder="请输入姓名" />
								</n-form-item-gi>
								<n-form-item-gi :span="12" label="当前求职状态" path="jobStatus">
									<n-input v-model:value="form.jobStatus" placeholder="当前求职状态" />
								</n-form-item-gi>
							</n-grid>
							<n-grid :cols="24" :x-gap="24">
								<n-form-item-gi :span="12" label="性别" path="sex">
									<n-input v-model:value="form.sex" placeholder="性别" />
								</n-form-item-gi>
								<n-form-item-gi :span="12" label="生日" path="birthday">
									<n-input v-model:value="form.birthday" placeholder="生日" />
								</n-form-item-gi>
							</n-grid>
							<n-grid :cols="24" :x-gap="24">
								<n-form-item-gi :span="12" label="电话" path="contactPhone">
									<n-input v-model:value="form.contactPhone" placeholder="电话" />
								</n-form-item-gi>
								<n-form-item-gi :span="12" label="邮箱" path="contactEmail">
									<n-input v-model:value="form.contactEmail" placeholder="邮箱" />
								</n-form-item-gi>
							</n-grid>
							<n-grid :cols="24" :x-gap="24">
								<n-form-item-gi :span="12" label="最高学历" path="education">
									<n-input v-model:value="form.education" placeholder="最高学历" />
								</n-form-item-gi>
							</n-grid>
						</n-card>
						<n-card
							title="个人优势"
							hoverable
							:segmented="{
								content: true
							}"
							:bordered="false"
						>
							<template #header-extra> #header-extra </template>
							<n-grid :cols="24">
								<n-form-item-gi :span="24" label="个人优势" path="advantage">
									<n-input
										v-model:value="form.advantage"
										placeholder="Textarea"
										type="textarea"
										:autosize="{
											minRows: 3,
											maxRows: 5
										}"
									/>
								</n-form-item-gi>
							</n-grid>
						</n-card>
						<n-card
							title="期望职位"
							hoverable
							:segmented="{
								content: true
							}"
							:bordered="false"
						>
							<template #header-extra> #header-extra </template>
							<n-grid :cols="24" :x-gap="24">
								<n-form-item-gi :span="12" label="求职类型" path="jobType">
									<n-input v-model:value="form.jobType" placeholder="求职类型" />
								</n-form-item-gi>
								<n-form-item-gi :span="12" label="工作地点" path="expectAddr">
									<n-input v-model:value="form.expectAddr" placeholder="工作地点" />
								</n-form-item-gi>
							</n-grid>
							<n-grid :cols="24" :x-gap="24">
								<n-form-item-gi :span="12" label="期望职位" path="expectJob">
									<n-input v-model:value="form.expectJob" placeholder="期望职位" />
								</n-form-item-gi>
								<n-form-item-gi :span="12" label="期望薪资" path="expectAddr">
									<n-input v-model:value="form.expectSalary" placeholder="期望薪资" />
								</n-form-item-gi>
							</n-grid>
						</n-card>
						<n-grid :cols="24" :x-gap="24">
							<n-gi :span="24">
								<n-space>
									<n-button m-l-60 type="primary" size="large" @click="submit">提交</n-button>
									<n-button type="primary" size="large" @click="reset">重置</n-button>
								</n-space>
							</n-gi>
						</n-grid>
					</n-form>
				</div>
			</n-grid-item>
			<n-grid-item :span="6">
				<n-card
					title="附件管理"
					hoverable
					:segmented="{
						content: true
					}"
					:bordered="false"
				>
					<n-list>
						<template #footer>
							<n-grid :x-gap="12" :y-gap="8" :cols="1">
								<n-grid-item>
									<!-- <n-upload action="#" :custom-request="customRequest" @finish="handleFinish">
										<n-button block type="primary" round>上传文件</n-button>
									</n-upload> -->
									<el-upload
										v-model:file-list="fileList"
										:on-preview="handlePreview"
										:on-remove="handleRemove"
										:before-remove="beforeRemove"
										:limit="1"
										:on-exceed="handleExceed"
										accept=".doc,.pdf"
										:http-request="uploadHttpRequest"
									>
										<el-button class="w-50" color="#18a058">文件上传</el-button>
										<template #tip>
											<div class="el-upload__tip">pdf,doc</div>
										</template>
									</el-upload>
								</n-grid-item>
							</n-grid>
						</template>
						<n-list-item v-for="(item, key) in resumeFileList" :key="key">
							<n-space>
								<n-text>{{ item.fileName }}</n-text>
								<n-button type="primary" size="small" @click="downloadResumeFile(item.id, item.fileName)">下载</n-button>
								<n-button type="primary" size="small" @click="deleteFile(item.id)">删除</n-button>
							</n-space>
						</n-list-item>
					</n-list>
				</n-card>
			</n-grid-item>
		</n-grid>
		<!-- <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
			<template #header>
				<div>简历附件上传</div>
			</template>
			<div>
				<UploadResume />
			</div>
			<template #action>
				<div>操作</div>
			</template>
		</n-modal> -->
	</n-layout>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import {
	getUseOnlineResume,
	updateUserResume,
	listUserResumeFile,
	addUserResumeFile,
	downloadResumeFile,
	removeResumeFile
} from "@/api/app/resume";
import { ElMessage, ElMessageBox } from "element-plus";
import { FormInst } from "naive-ui";
import type { UploadProps, UploadUserFile } from "element-plus";
//import UploadResume from "./upload/index.vue";
const formRef = ref<FormInst | null>(null);
//const showModal = ref(false);
const fileList = ref<UploadUserFile[]>([]);
const resumeFileList = ref<any[]>([]);
const data = reactive<{
	form: any;
	rules: any;
	size: "small" | "medium" | "large";
}>({
	form: {},
	size: "medium",
	rules: {
		fullName: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
		contactPhone: [{ required: true, message: "电话号码不能为空", trigger: "blur" }],
		contactEmail: [{ required: true, message: "邮箱不能为空", trigger: "blur" }]
	}
});
const { size, rules, form } = toRefs(data);

function getResumeOnline() {
	getUseOnlineResume().then(res => {
		console.log(res);
		data.form = res.data;
	});
}
function getFileList() {
	listUserResumeFile().then(res => {
		console.log(res);
		resumeFileList.value = res.data;
	});
}

const submit = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			updateUserResume(form.value).then(res => {
				console.log(res);
				ElMessage.success("保存成功");
				getResumeOnline();
			});
		} else {
			console.log(errors);
		}
	});

	console.log("submit");
};
const deleteFile = (id: any) => {
	ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	})
		.then(() => {
			removeResumeFile(id).then(res => {
				console.log(res);
				ElMessage.success("删除成功");
				getFileList();
			});
		})
		.catch(() => {
			ElMessage.info("已取消删除");
		});
};

const reset = () => {
	console.log("reset");
};
// const uploadFile = () => {
// 	//showModal.value = true;
// 	console.log("uploadFile");
// };
// const customRequest = (file: any) => {
// 	let formData = new FormData();
// 	formData.append("file", file.file);
// 	addUserResumeFile(formData).then(res => {
// 		console.log(res);
// 		ElMessage.success("上传成功");
// 		getFileList();
// 	});
// 	console.log(file);
// };
// const handleFinish = (file: any) => {
// 	console.log(file);
// };
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
	console.log(file, uploadFiles);
};
const handlePreview: UploadProps["onPreview"] = uploadFile => {
	console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
	ElMessage.warning(
		`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`
	);
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
	console.log(uploadFiles);
	return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
		() => true,
		() => false
	);
};
const uploadHttpRequest = () => {
	console.log(fileList);
	let formData = new FormData();
	formData.append("file", fileList.value[0].raw);
	addUserResumeFile(formData).then(res => {
		console.log(res);
		ElMessage.success("上传成功");
		fileList.value = [];
		getFileList();
	});
	console.log(data);
};
getResumeOnline();
getFileList();
</script>

<style scoped>
.light-green {
	background-color: rgb(0 128 0 / 12%);
}
.green {
	background-color: rgb(0 128 0 / 24%);
}
</style>
