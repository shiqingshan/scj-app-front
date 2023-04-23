<template>
	<div>
		<template v-for="(item, index) in applyList" :key="index">
			<n-card title="职位名称" hoverable :header-style="headerStyle">
				<template #header>
					<div flex>{{ item.jobApplyInfo.jobInfo.contact }}</div>
				</template>
				<template #header-extra> {{ selectDictLabel(dicts, item.status) }} </template>
				<n-grid x-gap="12" :cols="6" mt-2>
					<n-grid-item :span="3">
						<n-grid :cols="24">
							<n-gi :span="24" text-4 font-500 flex
								>{{ item.jobApplyInfo.jobInfo.jobName }} {{ item.jobApplyInfo.jobInfo.jobSalary }}</n-gi
							>
						</n-grid>
						<n-grid :cols="24" mt-2>
							<n-gi :span="24" flex>
								<span>{{ item.jobApplyInfo.jobInfo.coName }}</span>
							</n-gi>
						</n-grid>
					</n-grid-item>
					<n-grid-item :span="3">
						<n-grid :cols="24">
							<n-gi :span="24" text-4 font-500 flex>面试时间：{{ parseTime(item.interviewDate) }}</n-gi>
						</n-grid>
						<n-grid :cols="24">
							<n-gi :span="24" text-4 font-500 flex>面试地点：{{ item.interviewLocation }}</n-gi>
						</n-grid>
					</n-grid-item>
				</n-grid>
				<template v-if="item.status == '1'" #action>
					<n-button-group>
						<n-button ghost type="success" @click="handleInterview(item.id, '2')">接受</n-button>
						<n-button ghost type="success" @click="handleInterview(item.id, '3')">拒绝</n-button>
					</n-button-group>
				</template>
			</n-card>
		</template>
		<n-pagination
			v-model:page="queryParams.pageNum"
			v-model:page-size="queryParams.pageSize"
			:item-count="total"
			show-size-picker
			:page-sizes="[10, 20, 30, 40]"
			:on-update:page="updatePage"
			:on-update:page-size="updateSizePage"
		/>
	</div>
</template>

<script setup lang="ts">
import { listUserInterView, updateInterview } from "@/api/app/apply";
import { reactive, ref, toRefs } from "vue";
const total = ref(0);
const applyList = ref<any[]>([]);

const data = reactive<{
	form: any;
	queryParams: any;
}>({
	form: {
		id: "",
		status: ""
	},
	queryParams: {
		pageNum: 1,
		pageSize: 10
	}
});
const { queryParams, form } = toRefs(data);

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
function updatePage(page: number) {
	queryParams.value.pageNum = page;
	console.log("updatePage", queryParams);
	getList();
}
function updateSizePage(pageSize: number) {
	queryParams.value.pageSize = pageSize;
	getList();
}

function handleInterview(id: any, status: any) {
	console.log("handleInterview", id, status);
	form.value.id = id;
	form.value.status = status;
	updateInterview(form.value).then(res => {
		console.log("handleInterview", res);
		getList();
	});
}

function getList() {
	listUserInterView(queryParams.value).then(res => {
		applyList.value = res.data.list;
		total.value = res.data.total;
	});
}

getList();

const headerStyle = {
	background: "linear-gradient(150deg, rgb(119 213 165), rgb(235 230 225))"
};
</script>

<style scoped>
.light-green {
	height: 108px;
	background-color: rgb(0 128 0 / 12%);
}
.green {
	height: 108px;
	background-color: rgb(0 128 0 / 24%);
}
</style>
