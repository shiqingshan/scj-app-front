<template>
	<div class="app-container">
		<el-row :gutter="10" class="mb8">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
			</el-col>
		</el-row>
		<el-table v-loading="loading" :data="jobList">
			<el-table-column type="index" label="序号" width="50" />
			<el-table-column prop="positionName" label="岗位类别" width="160"></el-table-column>
			<el-table-column prop="jobName" label="职位名称" width="160"></el-table-column>
			<el-table-column prop="jobStatus" label="发布状态" width="160">
				<template #default="scope">
					<el-tag>{{ selectDictLabel(jobStatusDicts, scope.row.jobStatus) }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime" width="160">
				<template #default="scope">
					<span>{{ parseTime(scope.row.createTime) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template #default="scope">
					<el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
					<el-button v-if="scope.row.parentId != 0" link type="primary" icon="Delete" @click="handleDelete(scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<pagination
			v-show="total > 0"
			v-model:page="queryParams.pageNum"
			v-model:limit="queryParams.pageSize"
			:total="total"
			@pagination="getList"
		/>

		<!--添加或修改用戶配置對話框-->
		<el-dialog v-model="open" :title="title" width="600px" append-to-body>
			<el-form ref="jobInfoRef" :model="form" :rules="rules" label-width="120px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="招聘企业" prop="coId">
							<el-tree-select
								v-model="form.coId"
								:data="companyOptions"
								:props="{ value: 'id', label: 'name', children: 'children' }"
								value-key="id"
								placeholder="请选择招聘企业"
								check-strictly
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="职位名称" prop="jobName">
							<el-input v-model="form.jobName" placeholder="请输入职位名称" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="岗位类别" prop="positionId">
							<el-tree-select
								v-model="form.positionId"
								:data="jobpositionOptions"
								:props="{ value: 'id', label: 'positionName', children: 'children' }"
								value-key="id"
								placeholder="请选择岗位"
								check-strictly
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="工作地点" prop="jobAddr">
							<el-input v-model="form.jobAddr" placeholder="请输入工作地点" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="教育要求" prop="jobEdu">
							<el-input v-model="form.jobEdu" placeholder="请输入教育要求" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="薪资" prop="jobSalary">
							<el-input v-model="form.jobSalary" placeholder="请输入薪资" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="资格要求" prop="jobQualification">
							<el-input v-model="form.jobQualification" placeholder="请输入资格要求" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="职位描述" prop="jobDescribe">
							<el-input v-model="form.jobDescribe" placeholder="请输入职位描述" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="职位状态" prop="jobStatus">
							<el-radio-group disabled v-model="form.jobStatus">
								<el-radio v-for="dict in jobStatusDicts" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button type="primary" @click="submitForm">确 定</el-button>
					<el-button @click="cancel">取 消</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
/* eslint-disable camelcase */
import { ref, toRefs, reactive, getCurrentInstance, ComponentInternalInstance } from "vue";
import { listUserJobInfo, getJobInfo, delJobInfo, updateJobInfo, addJobInfo } from "@/api/admin/job/info";
import { listJobPosition } from "@/api/admin/job/position";
import { listCompanyTree } from "@/api/admin/company/info";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const jobpositionOptions = ref<any[]>([]);
const companyOptions = ref<any[]>([]);
const total = ref(0);
const loading = ref(true);
const open = ref(false);
const title = ref("");

const jobStatusDicts = [
	{
		value: "0",
		label: "发布中"
	},
	{
		value: "1",
		label: "已下架"
	},
	{
		value: "2",
		label: "待审核"
	},
	{
		value: "3",
		label: "审核不通过"
	}
];

const data = reactive<{
	form: any;
	queryParams: any;
	rules: any;
}>({
	form: {
		jobStatus: "2"
	},
	queryParams: {
		pageNum: 1,
		pageSize: 10
	},
	rules: {}
});

const jobList = ref<any[]>([]);

const { queryParams, form, rules } = toRefs(data);

function reset() {
	form.value = {
		id: undefined,
		jobName: undefined,
		coId: undefined,
		positionId: undefined,
		jobAddr: undefined,
		jobEdu: undefined,
		jobSalary: undefined,
		jobQualification: undefined,
		jobDescribe: undefined,
		jobStatus: "2"
	};
	proxy!.resetForm("jobInfoRef");
}

function getList() {
	loading.value = true;
	listUserJobInfo(queryParams.value).then((res: any) => {
		loading.value = false;
		console.log(res);
		jobList.value = res.data.list;
		total.value = res.data.total;
	});
}

function submitForm() {
	(proxy?.$refs["jobInfoRef"] as any).validate((valid: any) => {
		if (valid) {
			if (form.value.id !== undefined) {
				updateJobInfo(form.value).then(() => {
					proxy!.$modal.msgSuccess("修改成功");
					open.value = false;
					getList();
				});
			} else {
				addJobInfo(form.value).then(() => {
					proxy!.$modal.msgSuccess("新增成功");
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

function handleUpdate(row: any) {
	reset();
	listJobPosition().then(response => {
		jobpositionOptions.value = proxy!.handleTree(response.data, "id");
	});
	listCompanyTree().then(response => {
		companyOptions.value = proxy!.handleTree(response.data, "id");
	});
	const id = row.id;
	getJobInfo(id).then(res => {
		form.value = res.data;
		open.value = true;
		title.value = "修改职位信息";
	});
}
function handleDelete(row: any) {
	const id = row.id;
	proxy!.$modal
		.confirm('是否确认删除职位编号编号为"' + id + '"的数据项？')
		.then(function () {
			return delJobInfo(id);
		})
		.then(() => {
			getList();
			proxy!.$modal.msgSuccess("删除成功");
		})
		.catch((e: any) => {
			console.log(e);
		});
}
function handleAdd() {
	reset();
	listCompanyTree().then(response => {
		companyOptions.value = proxy!.handleTree(response.data, "id");
	});
	listJobPosition().then(response => {
		jobpositionOptions.value = proxy!.handleTree(response.data, "id");
	});
	open.value = true;
	title.value = "新增职位信息";
}
getList();
</script>
