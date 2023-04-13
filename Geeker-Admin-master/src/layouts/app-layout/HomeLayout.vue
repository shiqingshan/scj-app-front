<template>
	<div>
		<el-container>
			<LayoutHeader />
			<el-main class="text-center" style="padding: 0%">
				<MainHeader ma pa w-full />
				<router-view ma ml-40> </router-view>
			</el-main>
			<el-footer class="absolute bottom-5 right-0 left-0 text-center op30 fw300"> SCJ </el-footer>
		</el-container>
	</div>
</template>
<script setup lang="ts">
import LayoutHeader from "./layout-header/index.vue";
import MainHeader from "./layout-header/MainHeader.vue";
</script>

<style scoped></style>
