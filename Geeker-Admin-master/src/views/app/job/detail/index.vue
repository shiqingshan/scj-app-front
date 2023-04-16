<template>
	<div>
		<el-row>
			<el-col :span="4">
				<h2>职位描述</h2>
				<span>{{ jobDescribe }}</span>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { useMainHeader } from "@/stores/modules/app/mainHeader";
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { getJobInfo } from "@/api/admin/job/info";

const mainHeader = useMainHeader();
const router = useRouter();
mainHeader.headerState = "jobdetail";
const jobDescribe = ref("");
const id = router.currentRoute.value.params.id;
console.log("jobId", id);
getJobInfo(id).then((res: any) => {
	mainHeader.setJobHeader(res.data);
	jobDescribe.value = res.data.jobDescribe;
});
onBeforeUnmount(() => {
	console.log("likai");
	mainHeader.$reset();
});
</script>

<style scoped></style>
