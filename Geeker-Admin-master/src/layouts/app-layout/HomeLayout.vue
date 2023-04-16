<template>
	<div>
		<el-container>
			<LayoutHeader />
			<el-main class="text-center" style="padding: 0%">
				<MainHeader />
				<router-view ma ml-40 mr-60> </router-view>
			</el-main>
			<el-footer class="bottom-5 right-0 left-0 text-center op30 fw300"> SCJ </el-footer>
		</el-container>
		<ApplyDrawer />
	</div>
</template>
<script setup lang="ts">
import LayoutHeader from "./layout-header/index.vue";
import MainHeader from "./layout-header/MainHeader.vue";
import ApplyDrawer from "./apply-drawer/index.vue";
</script>

<style scoped></style>
