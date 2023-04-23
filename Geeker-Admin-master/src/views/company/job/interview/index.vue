<template>
	<div>
		<div>
			<el-table v-loading="loading" :data="companyList">
				<el-table-column type="index" label="序号" width="50" />
				<el-table-column prop="id" label="邀请编号" width="260"></el-table-column>
				<el-table-column prop="userInfo.userName" label="邀请用户" width="260"></el-table-column>
				<el-table-column prop="jobApplyInfo.jobInfo.jobName" label="职位名称" width="260"></el-table-column>
				<el-table-column prop="status" label="邀请状态" width="100">
					<template #default="scope">
						<el-tag>{{ selectDictLabel(dicts, scope.row.status) }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="邀请日期" align="center" prop="invitationDate" width="200">
					<template #default="scope">
						<span>{{ parseTime(scope.row.invitationDate) }}</span>
					</template>
				</el-table-column>
				<el-table-column label="面试日期" align="center" prop="interviewDate" width="200">
					<template #default="scope">
						<span>{{ parseTime(scope.row.interviewDate) }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template #default="scope">
						<el-button link type="primary" icon="view" @click="handleView(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--element-plus 分页-->
			<el-pagination
				v-model:current-page="queryParams.pageNum"
				v-model:page-size="total"
				:page-sizes="queryParams.pageSizes"
				:total="total"
				@size-change="getList"
				@current-change="getList"
			/>
			<!--添加或修改用戶配置對話框-->
			<el-dialog v-model="open" :title="title" width="600px" append-to-body>
				<el-form ref="jobApplyRef" :model="form" :rules="rules" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="邀请用户" prop="userInfo.userName">
								<el-input v-model="form.userInfo.userName" disabled placeholder="请输入用户名" maxlength="30" />
							</el-form-item>
							<el-form-item label="申请职位名称" prop="jobInfo.jobName">
								<el-input v-model="form.jobApplyInfo.jobInfo.jobName" disabled placeholder="申请职位名称" maxlength="30" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="简历附件" prop="resumeFileId">
								<el-input v-model="form.jobApplyInfo.resumeFileInfo.fileName" disabled placeholder="简历名称" maxlength="30" />
							</el-form-item>
							<el-form-item>
								<n-button text color="#ff69b4" @click="download(form.jobApplyInfo.resumeId)"> 下载 </n-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="面试日期" prop="interviewDate">
								<el-date-picker v-model="form.interviewDate" type="date" disabled placeholder="请选择面试日期" size="default" />
							</el-form-item>
							<el-form-item label="面试地点" prop="interviewLocation">
								<el-input v-model="form.interviewLocation" disabled placeholder="请输入面试地点" maxlength="30" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<template #footer>
					<div class="dialog-footer">
						<el-button type="primary" disabled @click="submitForm">邀请面试</el-button>
						<el-button @click="cancel">取 消</el-button>
					</div>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, toRefs } from "vue";
import { listCompanyInterView, getInterview, addInterview } from "@/api/app/apply";
import { downloadResumeFile } from "@/api/app/resume";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const total = ref(0);
const loading = ref(true);
const open = ref(false);
const title = ref("");

const companyList = ref<any[]>([]);

const dicts = [
	{
		value: "1",
		label: "待处理"
	},
	{
		value: "2",
		label: "已接受"
	},
	{
		value: "3",
		label: "已拒绝"
	}
];

const data = reactive<{
	form: any;
	queryParams: any;
	rules: any;
}>({
	form: {},
	queryParams: {
		pageNum: 1,
		pageSize: 10
	},
	rules: {
		interviewLocation: [{ required: true, message: "面试地点不能为空" }],
		interviewDate: [{ required: true, message: "面试日期不能为空" }]
	}
});

const { queryParams, form, rules } = toRefs(data);

function reset() {
	form.value = {
		jobApplyInfo: {
			jobInfo: {
				id: undefined,
				jobName: undefined
			},
			resumeFileId: undefined,
			resumeFileInfo: {
				fileName: undefined
			}
		},
		applyId: undefined,
		userInfo: {
			userName: undefined
		},
		coId: undefined,
		userId: undefined,
		interviewLocation: undefined,
		interviewDate: undefined,
		status: undefined
	};
	proxy!.resetForm("jobApplyRef");
}
function handleView(row: any) {
	reset();
	const id = row.id;
	getInterview(id).then(res => {
		console.log(res);
		form.value = res.data;
		open.value = true;
		title.value = "查看申请信息";
	});
}
function download(id: any) {
	console.log(id);
	downloadResumeFile(id, form.value.jobApplyInfo.resumeFileInfo.fileName);
}

function submitForm() {
	(proxy?.$refs["jobApplyRef"] as any).validate((valid: any) => {
		if (valid) {
			console.log(form.value);
			if (form.value.id !== undefined) {
				form.value.applyId = form.value.id;
				form.value.coId = form.value.jobInfo.coId;
				form.value.status = null;
				addInterview(form.value).then(() => {
					proxy!.$modal.msgSuccess("邀请成功");
					open.value = false;
					getList();
				});
			}
		}
	});
}
function cancel() {
	open.value = false;
	reset();
}

function getList() {
	loading.value = true;
	listCompanyInterView(queryParams.value).then((res: any) => {
		loading.value = false;
		console.log(res);
		companyList.value = res.data.list;
		total.value = res.data.total;
	});
}
getList();
</script>

<style scoped></style>
