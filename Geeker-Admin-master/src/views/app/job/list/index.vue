<template>
	<div>
		<n-grid x-gap="12" :y-gap="8" :cols="3">
			<template v-for="(item, index) in jobList" :key="index">
				<n-gi span="3">
					<n-card hoverable @click="toDetail(item.id)">
						<template #header>
							<div flex content-center items-center justify-between>
								<div>
									<span text-2xl>{{ item.jobName }}</span>
									<div>
										<el-space>
											<span color="red">{{ item.jobDetail.jobSalary }}</span>
											<span>{{ item.jobDetail.jobQualification }}</span>
											<span>{{ item.jobDetail.jobEdu }}</span>
										</el-space>
									</div>
									<el-button class="button" text>立即沟通</el-button>
								</div>
								<div class="h-full flex justify-end">
									<span>{{ item.coName }}</span>
								</div>
							</div>
						</template>
					</n-card>
				</n-gi>
			</template>
			<n-gi :offset="1">
				<n-pagination
					v-model:page="queryParams.pageNum"
					v-model:page-size="queryParams.pageSize"
					:item-count="total"
					:page-sizes="[10, 20, 30, 40]"
					:on-update:page="updatePage"
					:on-update:page-size="updateSizePage"
				/>
			</n-gi>
		</n-grid>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { listJobInfo } from "@/api/admin/job/info";
import { ref, reactive, toRefs } from "vue";
const router = useRouter();
const total = ref(0);
const jobList = ref<any[]>([]);

// const jobList = [
// 	{
// 		jobId: "1",
// 		jobName: "工作1",
// 		jobSalary: "15-17K",
// 		jobAddr: "上海",
// 		jobQualification: "1-3年",
// 		contact: "xxx",
// 		coName: "xxx公司",
// 		positionName: "java",
// 		jobEdu: "本科"
// 	}
// ];

const data = reactive<{
	queryParams: any;
}>({
	queryParams: {
		pageNum: 1,
		pageSize: 10
	}
});
const { queryParams } = toRefs(data);

function getList() {
	listJobInfo(queryParams.value).then((res: any) => {
		console.log(res);
		jobList.value = res.data.list;
	});
}

const toDetail = (id: any) => {
	router.push("/app/jobdetail/" + id);
};
function updatePage(page: number) {
	queryParams.value.pageNum = page;
	console.log("updatePage", queryParams);
	getList();
}
function updateSizePage(pageSize: number) {
	queryParams.value.pageSize = pageSize;
	getList();
}
getList();
</script>

<style scoped>
.card:hover {
	cursor: pointer;
}
</style>
