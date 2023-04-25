<template>
	<div class="app-container">
		<el-form v-show="showSearch" ref="queryRef" :model="queryParams" :inline="true">
			<el-form-item label="岗位名称" prop="positionName">
				<el-input
					v-model="queryParams.positionName"
					placeholder="请输入岗位名称"
					clearable
					style="width: 200px"
					@keyup.enter="handleQuery"
				/>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select v-model="queryParams.status" placeholder="岗位状态" clearable style="width: 200px">
					<el-option v-for="dict in dicts" :key="dict.value" :label="dict.label" :value="dict.value" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
				<el-button icon="Refresh" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>

		<el-row :gutter="10" class="mb8">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
			</el-col>
			<right-toolbar v-model:showSearch="showSearch" @queryable="getList"></right-toolbar>
		</el-row>

		<el-table
			v-if="refreshTable"
			v-loading="loading"
			:data="jobPositionList"
			row-key="id"
			:default-expand-all="isExpandAll"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column type="index" label="序号" width="50" />
			<el-table-column prop="positionName" label="岗位名称" width="260"></el-table-column>
			<el-table-column prop="status" label="状态" width="100">
				<template #default="scope">
					<el-tag>{{ dicts[scope.row.status].label }}</el-tag>
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
					<el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)">新增</el-button>
					<el-button v-if="scope.row.parentId != 0" link type="primary" icon="Delete" @click="handleDelete(scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<!-- 添加或修改部门对话框 -->
		<el-dialog v-model="open" :title="title" width="600px" append-to-body>
			<el-form ref="jobpositionRef" :model="form" :rules="rules" label-width="80px">
				<el-row>
					<el-col v-if="form.parentId !== 0" :span="24">
						<el-form-item label="上级岗位" prop="parentId">
							<el-tree-select
								v-model="form.parentId"
								:data="jobpositionOptions"
								:props="{ value: 'id', label: 'positionName', children: 'children' }"
								value-key="id"
								placeholder="选择上级岗位"
								check-strictly
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="岗位名称" prop="positionName">
							<el-input v-model="form.positionName" placeholder="请输入岗位名称" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="岗位状态">
							<el-radio-group v-model="form.status">
								<el-radio v-for="dict in dicts" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button type="primary" @click="submitForm(jobpositionRef)">确 定</el-button>
					<el-button @click="cancel">取 消</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
/* eslint-disable camelcase */
import {
	listJobPosition,
	getJobPosition,
	delJobPosition,
	addJobPosition,
	updateJobPosition,
	listJobPositionExcludeChild
} from "@/api/admin/job/position";
import { parseTime } from "@/utils/ruoyi";
import { FormInstance } from "element-plus";
import { getCurrentInstance, ComponentInternalInstance, ref, reactive, toRefs, nextTick } from "vue";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const jobPositionList = ref<any[]>([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const jobpositionOptions = ref<any[]>([]);
const isExpandAll = ref(true);
const refreshTable = ref(true);

const jobpositionRef = ref<FormInstance>();

const data = reactive<{
	form: any;
	queryParams: any;
	rules: any;
	dicts: any;
}>({
	form: {},
	queryParams: {
		positionName: undefined,
		status: undefined
	},
	rules: {
		parentId: [{ required: true, message: "上级岗位不能为空", trigger: "blur" }],
		positionName: [{ required: true, message: "岗位名称不能为空", trigger: "blur" }]
	},
	dicts: [
		{
			value: "0",
			label: "正常"
		},
		{
			value: "1",
			label: "停用"
		}
	]
});

const { queryParams, form, rules, dicts } = toRefs(data);

/** 查询部门列表 */
function getList() {
	loading.value = true;
	listJobPosition(queryParams.value).then(response => {
		jobPositionList.value = proxy!.handleTree(response.data, "id");
		loading.value = false;
	});
}
/** 取消按钮 */
function cancel() {
	open.value = false;
	reset();
}
/** 表单重置 */
function reset() {
	form.value = {
		id: undefined,
		parentId: undefined,
		positionName: undefined,
		status: "0"
	};
	proxy!.resetForm("jobPositionRef");
}
/** 搜索按钮操作 */
function handleQuery() {
	getList();
}
/** 重置按钮操作 */
function resetQuery() {
	proxy!.resetForm("queryRef");
	handleQuery();
}

/** 新增按钮操作 */
function handleAdd(row: any) {
	reset();
	listJobPosition().then(response => {
		jobpositionOptions.value = proxy!.handleTree(response.data, "id");
	});
	if (row !== undefined) {
		form.value.parentId = row.id;
	}
	open.value = true;
	title.value = "添加岗位";
}
/** 展开/折叠操作 */
function toggleExpandAll() {
	refreshTable.value = false;
	isExpandAll.value = !isExpandAll.value;
	nextTick(() => {
		refreshTable.value = true;
	});
}
/** 修改按钮操作 */
function handleUpdate(row: any) {
	reset();
	listJobPositionExcludeChild(row.id).then(response => {
		jobpositionOptions.value = proxy!.handleTree(response.data, "id");
	});
	getJobPosition(row.id).then(response => {
		form.value = response.data;
		open.value = true;
		title.value = "修改部门";
	});
}

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(valid => {
		if (valid) {
			console.log(form.value);
			if (form.value.id !== undefined) {
				updateJobPosition(form.value).then(() => {
					proxy!.$modal.msgSuccess("修改成功");
					open.value = false;
					getList();
				});
			} else {
				addJobPosition(form.value).then(() => {
					proxy!.$modal.msgSuccess("新增成功");
					open.value = false;
					getList();
				});
			}
		}
	});
};

/** 提交按钮 */
// function submitForm() {

//     (proxy?.$refs['jobPositionRef'] as any).validate((valid: any) => {
//         console.log(valid);
//         if (valid) {
//             if (form.value.id !== undefined) {
//                 updateJobPosition(form.value).then(response => {
//                     proxy!.$modal.msgSuccess('修改成功');
//                     open.value = false;
//                     getList();
//                 });
//             } else {
//                 addJobPosition(form.value).then(response => {
//                     proxy!.$modal.msgSuccess('新增成功');
//                     open.value = false;
//                     getList();
//                 });
//             }
//         }
//     });
// }
/** 删除按钮操作 */
function handleDelete(row: any) {
	proxy!.$modal
		.confirm('是否确认删除名称为"' + row.positionName + '"的数据项?')
		.then(function () {
			return delJobPosition(row.id);
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
