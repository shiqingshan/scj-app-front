<template>
	<div class="bg-#74d1af ma pa w-full color-white b" v-if="mainHeader.headerState == 'jobdetail'">
		<div ml-50>
			<el-row>
				<el-col :span="24" flex>{{ mainHeader.jobHeader.jobStatus }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" flex font-500 text-3xl>{{ mainHeader.jobHeader.jobName }}</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" flex>
					<el-space>
						<span>{{ mainHeader.jobHeader.jobAddr }}</span>
						<span>{{ mainHeader.jobHeader.jobQualification }}</span>
						<span>{{ mainHeader.jobHeader.jobEdu }}</span>
					</el-space>
				</el-col>
			</el-row>
		</div>
		<!-- <div v-if="mainHeader.headerState == 'home'">
			<el-row>
				<el-col>
					<el-select v-model="value" placeholder="Select" size="large">
						<el-option v-for="(item, index) in selectList" :value="item.value" :key="index" :label="item.label"></el-option>
					</el-select>
				</el-col>
			</el-row>
		</div> -->
	</div>
	<div mt-10 v-else></div>
</template>

<script setup lang="ts">
//import { ref } from "vue";
import { useMainHeader } from "@/stores/modules/app/mainHeader";
const mainHeader = useMainHeader();
console.log(mainHeader);
// const value = ref("");
// const selectList = [
// 	{
// 		value: "lll",
// 		label: "11"
// 	}
// ];
</script>

<style scoped></style>
