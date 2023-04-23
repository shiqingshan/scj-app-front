<template>
	<div>
		<template v-for="(item, index) in applyList" :key="index">
			<n-card title="职位名称" hoverable :header-style="headerStyle">
				<template #header>
					<div flex>{{ item.jobInfo.contact }}</div>
				</template>
				<template #header-extra> {{ selectDictLabel(jobStatusDicts, item.jobInfo.jobStatus) }} </template>
				<n-grid x-gap="12" :cols="6" mt-2>
					<n-grid-item :span="3">
						<n-grid :cols="24">
							<n-gi :span="2" text-4 font-500>{{ item.jobInfo.jobName }}</n-gi>
							<n-gi :span="2" text-4 font-500>[{{ item.jobInfo.jobAddr }}]</n-gi>
						</n-grid>
						<n-grid :cols="24" mt-2>
							<n-gi :span="24"
								><n-space>
									<span color-red>{{ item.jobInfo.jobSalary }}</span>
									<span>{{ item.jobInfo.jobQualification }}</span>
									<span>{{ item.jobInfo.jobEdu }}</span>
								</n-space></n-gi
							>
						</n-grid>
					</n-grid-item>
					<n-grid-item :span="3">
						<n-grid :cols="24">
							<n-gi :span="2" text-4 font-500>{{ item.jobInfo.coName }}</n-gi>
						</n-grid>
					</n-grid-item>
				</n-grid>
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
import { listUserApply } from "@/api/app/apply";
import { reactive, ref, toRefs } from "vue";
const total = ref(0);
const applyList = ref<any[]>([]);

const data = reactive<{ queryParams: any }>({
	queryParams: {
		pageNum: 1,
		pageSize: 10
	}
});
const { queryParams } = toRefs(data);

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
function updatePage(page: number) {
	queryParams.value.pageNum = page;
	console.log("updatePage", queryParams);
	getList();
}
function updateSizePage(pageSize: number) {
	queryParams.value.pageSize = pageSize;
	getList();
}

function getList() {
	listUserApply(queryParams.value).then(res => {
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
