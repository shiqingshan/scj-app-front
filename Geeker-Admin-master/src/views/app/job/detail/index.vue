<template>
	<div>
		<el-row>
			<el-col :span="4">
				<h2>职位描述</h2>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { useMainHeader } from "@/stores/modules/app/mainHeader";
import { onBeforeUnmount } from "vue";

const mainHeader = useMainHeader();
mainHeader.headerState = "jobdetail";
const data = {
	jobId: "1",
	jobName: "工作1",
	jobSalary: "15-17K",
	jobAddr: "上海",
	jobQualification: "1-3年",
	contact: "xxx",
	coName: "xxx公司",
	positionName: "java",
	jobEdu: "本科",
	jobStatus: "招聘中"
};
mainHeader.setJobHeader(data);
onBeforeUnmount(() => {
	console.log("likai");
	mainHeader.$reset();
});
</script>

<style scoped></style>
