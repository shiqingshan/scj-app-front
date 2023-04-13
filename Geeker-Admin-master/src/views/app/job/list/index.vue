<template>
	<div>
		<el-row>
			<el-col>
				<el-card shadow="hover" class="card" @click="toDetail()">
					<template #header>
						<div flex content-center items-center justify-between>
							<div>
								<span>工作1</span>
								<div><span>薪资</span><span>年限</span></div>
								<el-button class="button" text>立即沟通</el-button>
							</div>
							<div class="h-full flex justify-end">
								<span>XXX公司</span>
							</div>
						</div>
					</template>
					<div flex content-center items-center justify-between>
						<div>单证操作</div>
						<div>五险一金</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const toDetail = () => {
	router.push("/app/jobdetail");
};
</script>

<style scoped>
.card:hover {
	cursor: pointer;
}
</style>
