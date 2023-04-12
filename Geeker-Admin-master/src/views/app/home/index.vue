<template>
	<div>
		<h3 class="content-center">热招职位</h3>
		<el-row>
			<el-col :span="8">
				<el-card shadow="hover">
					<template #header>
						<div class="card-header">
							<span>Card name</span>
							<el-button class="button" text>Operation button</el-button>
						</div>
					</template>
					<div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
				</el-card>
			</el-col>
		</el-row>
		<h3 class="content-center">热门企业</h3>

		<el-row>
			<el-col :span="8">
				<el-card shadow="hover">
					<template #header>
						<div class="card-header">
							<span>Card name</span>
							<el-button class="button" text>Operation button</el-button>
						</div>
					</template>
					<div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script lang="ts" setup></script>
