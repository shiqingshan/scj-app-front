<template>
	<div>
		<n-tabs
			v-model:value="chatTabStore.name"
			type="line"
			animated
			tab-style="min-width: 80px;"
			:on-update="selectFunc(chatTabStore.name)"
		>
			<n-tab name="chatApply"> 投递列表 </n-tab>
			<n-tab name="interview"> 面试列表列表 </n-tab>
		</n-tabs>
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">
import { useChatTabStore } from "@/stores/modules/app/chattab";
import { useRouter } from "vue-router";
const router = useRouter();
const chatTabStore = useChatTabStore();
console.log("chat1111");
const selectFunc = (name: string) => {
	if (name === "chatApply") {
		router.push("/app/chat/apply");
		console.log("11111111111111111111111111");
	}
	if (name === "interview") {
		router.push("/app/chat/interview");
		console.log("22222222222222222222222222");
	}
};
</script>

<style scoped></style>
