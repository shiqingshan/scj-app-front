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
const mainHeader = useMainHeader();
mainHeader.headerState = "jobdetail";
</script>

<style scoped></style>
