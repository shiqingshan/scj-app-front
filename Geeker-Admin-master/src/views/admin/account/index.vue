<template>
	<div class="app-container">
		<el-table v-loading="loading" :data="userList">
			<el-table-column type="index" label="序号" width="50" />
			<el-table-column prop="id" label="账号编号" width="260"></el-table-column>
			<el-table-column prop="userName" label="用户名" width="260"></el-table-column>
			<el-table-column prop="accountType" label="账号类型" width="260">
				<template #default="scope">
					<el-tag>{{ accountTypeOps[scope.row.accountType].label }}</el-tag>
				</template>
			</el-table-column>
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
					<el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">更改状态</el-button>
					<el-button v-if="scope.row.parentId != 0" link type="primary" icon="Delete" @click="handleDelete(scope.row)"
						>删除</el-button
					>
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
			<el-form ref="accountRef" :model="form" :rules="rules" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户名" prop="userName">
							<el-input disabled v-model="form.userName" placeholder="请输入用户名" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="账号类型" prop="accountType">
							<el-select disabled v-model="form.accountType" class="m-2" placeholder="Select" size="large">
								<el-option v-for="item in accountTypeOps" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="账户状态" prop="status">
							<el-radio-group v-model="form.status">
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
import { listAccount, getAccount, updateAccount, delAccount } from "@/api/admin/account";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const total = ref(0);
const loading = ref(true);
const open = ref(false);
const title = ref("");

const accountTypeOps = [
	{
		value: "0",
		label: "学生用户"
	},
	{
		value: "1",
		label: "企业用户"
	},
	{
		value: "2",
		label: "管理员"
	}
];

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
		userName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
		accountType: [{ required: true, message: "账户类型", trigger: "blur" }],
		status: [{ required: true, message: "账户状态", trigger: "blur" }]
	}
});

const userList = ref<any[]>([]);

const { queryParams, form, rules } = toRefs(data);

function reset() {
	form.value = {
		id: undefined,
		userName: undefined,
		accountType: undefined,
		status: undefined
	};
	proxy!.resetForm("accountRef");
}

function getList() {
	loading.value = true;
	listAccount(queryParams.value).then((res: any) => {
		loading.value = false;
		console.log(res);
		userList.value = res.data.list;
		total.value = res.data.total;
	});
}
function submitForm() {
	(proxy?.$refs["accountRef"] as any).validate((valid: any) => {
		if (valid) {
			if (form.value.id !== undefined) {
				updateAccount(form.value).then(() => {
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
	getAccount(id).then(res => {
		form.value = res.data;
		open.value = true;
		title.value = "更改账号状态信息";
	});
}
function handleDelete(row: any) {
	const id = row.id;
	proxy!.$modal
		.confirm('是否确认删除账号编号为"' + id + '"的数据项？')
		.then(function () {
			return delAccount(id);
		})
		.then(() => {
			getList();
			proxy!.$modal.msgSuccess("删除成功");
		})
		.catch((e: any) => {
			console.log(e);
		});
}
getList();
</script>
