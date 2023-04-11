<template>
	<el-dropdown trigger="click" @command="handleSetLanguage">
		<i :class="'iconfont icon-zhongyingwen'" class="toolBar-icon"></i>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item :disabled="language && language === 'zh'" command="zh">简体中文</el-dropdown-item>
				<el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { GlobalStore } from "@/stores";

const globalStore = GlobalStore();
const language = computed((): string => globalStore.language);

// 切换语言
const handleSetLanguage = (lang: string) => {
	globalStore.updateLanguage(lang);
};

onMounted(() => {
	handleSetLanguage(language.value);
});
</script>
