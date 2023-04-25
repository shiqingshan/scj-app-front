<template>
	<div class="app-container">
		<el-table v-loading="loading" :data="companyList">
			<el-table-column type="index" label="序号" width="50" />
			<el-table-column prop="name" label="公司名称" width="260"></el-table-column>
			<el-table-column prop="status" label="状态" width="100">
				<template #default="scope">
					<el-tag>{{ selectDictLabel(dicts, scope.row.status) }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime" width="200">
				<template #default="scope">
					<span>{{ parseTime(scope.row.createTime) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template #default="scope">
					<el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
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
			<el-form ref="companyRef" :model="form" :rules="rules" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="公司名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入公司名称" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="公司地址" prop="address">
							<el-input v-model="form.address" placeholder="请输入公司地址" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="公司联系人" prop="contact">
							<el-input v-model="form.contact" placeholder="请输入公司联系人" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item label="公司联系人电话" prop="contactPhone">
							<el-input v-model="form.contactPhone" placeholder="请输入公司联系人电话" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="工商注册号" prop="businessLicense">
							<el-input disabled v-model="form.businessLicense" placeholder="请输入公司工商注册号" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="公司状态" prop="status">
							<el-radio-group disabled v-model="form.status">
								<el-radio v-for="dict in dicts" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
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
import { listCompanyByUserId, getCompany, updateCompany } from "@/api/admin/company/info";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const dicts = [
	{
		value: "0",
		label: "正常"
	},
	{
		value: "1",
		label: "冻结"
	},
	{
		value: "2",
		label: "待审核"
	}
];

const total = ref(0);
const loading = ref(true);
const open = ref(false);
const title = ref("");

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
		name: [{ required: true, message: "公司名称不能为空", trigger: "blur" }],
		address: [{ required: true, message: "公司地址不能为空", trigger: "blur" }],
		contact: [{ required: true, message: "公司联系人不能为空", trigger: "blur" }],
		contactPhone: [{ required: true, message: "公司联系人电话不能为空", trigger: "blur" }],
		businessLicense: [{ required: true, message: "工商注册号不能为空", trigger: "blur" }],
		status: [{ required: true, message: "公司状态必须选择一个" }]
	}
});

const companyList = ref<any[]>([]);

const { queryParams, form, rules } = toRefs(data);

function reset() {
	form.value = {
		id: undefined,
		name: undefined,
		address: undefined,
		contact: undefined,
		contactPhone: undefined,
		businessLicense: undefined,
		status: undefined
	};
	proxy!.resetForm("companyRef");
}

function getList() {
	loading.value = true;
	listCompanyByUserId(queryParams.value).then((res: any) => {
		loading.value = false;
		console.log(res);
		companyList.value = res.data.list;
		total.value = res.data.total;
	});
}
function submitForm() {
	(proxy?.$refs["companyRef"] as any).validate((valid: any) => {
		if (valid) {
			if (form.value.id !== undefined) {
				updateCompany(form.value).then(() => {
					proxy!.$modal.msgSuccess("修改成功");
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
	const id = row.id;
	getCompany(id).then(res => {
		form.value = res.data;
		open.value = true;
		title.value = "修改公司信息";
	});
}
getList();
</script>
