<template>
	<div>
		<template v-for="(item, key) in jobList" :key="key">
			<el-row>
				<el-col>
					<el-card shadow="hover" class="card" @click="toDetail(item.id)">
						<template #header>
							<div flex content-center items-center justify-between>
								<div>
									<span text-2xl>{{ item.jobName }}</span>
									<div>
										<el-space>
											<span color="red">{{ item.jobSalary }}</span>
											<span>{{ item.jobQualification }}</span>
											<span>{{ item.jobEdu }}</span>
										</el-space>
									</div>
									<el-button class="button" text>立即沟通</el-button>
								</div>
								<div class="h-full flex justify-end">
									<span>{{ item.coName }}</span>
								</div>
							</div>
						</template>
						<div flex content-center items-center justify-between>
							<div>{{ item.positionName }}</div>
							<div>五险一金</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { listJobInfo } from "@/api/admin/job/info";
import { ref, reactive, toRefs } from "vue";
const router = useRouter();

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
getList();
</script>

<style scoped>
.card:hover {
	cursor: pointer;
}
</style>
