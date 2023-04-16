<template>
	<div>
		<n-card title="职位名称" :header-style="headerStyle">
			<template #header>
				<div flex>sss</div>
			</template>
			<template #header-extra> 职位状态 </template>
			<n-grid x-gap="12" :cols="6" mt-2>
				<n-grid-item :span="3">
					<n-grid :cols="24">
						<n-gi :span="2" text-4 font-500>JAVA</n-gi>
						<n-gi :span="2" text-4 font-500>[上海]</n-gi>
					</n-grid>
					<n-grid :cols="24" mt-2>
						<n-gi :span="24"
							><n-space>
								<span color-red>10-18k</span>
								<span>3-5年</span>
								<span>本科</span>
							</n-space></n-gi
						>
					</n-grid>
				</n-grid-item>
				<n-grid-item :span="3">
					<n-grid :cols="24">
						<n-gi :span="2" text-4 font-500>xxx公司</n-gi>
					</n-grid>
				</n-grid-item>
			</n-grid>
		</n-card>
	</div>
</template>

<script setup lang="ts">
import { listApply } from "@/api/app/apply";
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
