<template>
	<div class="bg-#37586c" v-if="mainHeader.headerState == 'jobdetail'">
		<el-row>
			<el-col :span="6">招聘中</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">职位信息</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">地点</el-col>
			<el-col :span="3">年限</el-col>
			<el-col :span="3">学历</el-col>
		</el-row>
	</div>
	<div bg-violet v-if="mainHeader.headerState == 'home'">
		<el-row>
			<el-select v-model="value" placeholder="">
				<el-option v-for="item in selectList" :key="item.value" :label="item.lable"></el-option>
			</el-select>
		</el-row>
	</div>
	<div mt-10 v-else></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMainHeader } from "@/stores/modules/app/mainHeader";
const mainHeader = useMainHeader();
console.log(mainHeader);
const value = ref("");
const selectList = [
	{
		value: "lll",
		lable: "11"
	}
];
</script>

<style scoped></style>
