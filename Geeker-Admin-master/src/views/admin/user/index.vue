<template>
	<div class="app-container">
		<el-row :gutter="10" class="mb8">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
			</el-col>
		</el-row>
		<el-table v-loading="loading" :data="userList">
			<el-table-column type="index" label="序号" width="50" />
			<el-table-column prop="userName" label="用户名" width="260"></el-table-column>
			<el-table-column prop="phoneNumber" label="手机号" width="260"></el-table-column>
			<el-table-column prop="emailAddr" label="邮箱地址" width="260"></el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime" width="200">
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
			<el-form ref="userRef" :model="form" :rules="rules" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户名" prop="userName">
							<el-input v-model="form.userName" placeholder="请输入用户名" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户昵称" prop="nickName">
							<el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="手机号" prop="phoneNumber">
							<el-input v-model="form.phoneNumber" placeholder="请输入手机号" maxlength="30" />
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item label="电子邮箱" prop="emailAddr">
							<el-input v-model="form.emailAddr" placeholder="请输入电子邮箱" maxlength="30" />
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
import { listUser, addUser, getUser, delUser, updateUser } from "@/api/admin/user";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

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
		userName: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
		phoneNumber: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
		emailAddr: [{ required: true, message: "邮箱不能为空", trigger: "blur" }]
	}
});

const userList = ref<any[]>([]);

const { queryParams, form, rules } = toRefs(data);

function reset() {
	form.value = {
		id: undefined,
		userName: undefined,
		nickName: undefined,
		phoneNumber: undefined,
		emailAddr: undefined
	};
	proxy!.resetForm("userRef");
}

function getList() {
	loading.value = true;
	listUser(queryParams.value).then((res: any) => {
		loading.value = false;
		console.log(res);
		userList.value = res.data.list;
		total.value = res.data.total;
	});
}
function handleAdd() {
	reset();
	open.value = true;
	title.value = "添加用户";
}
function submitForm() {
	(proxy?.$refs["userRef"] as any).validate((valid: any) => {
		if (valid) {
			if (form.value.id !== undefined) {
				updateUser(form.value).then(() => {
					proxy!.$modal.msgSuccess("修改成功");
					open.value = false;
					getList();
				});
			} else {
				addUser(form.value).then(() => {
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
	const id = row.id;
	getUser(id).then(res => {
		form.value = res.data;
		open.value = true;
		title.value = "修改用户";
	});
}
function handleDelete(row: any) {
	const id = row.id;
	proxy!.$modal
		.confirm('是否确认删除用户编号为"' + id + '"的数据项？')
		.then(function () {
			return delUser(id);
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
