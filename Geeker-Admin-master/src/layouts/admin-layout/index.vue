<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<component :is="LayoutComponents[themeConfig.layout]" />
	<ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from "vue";
import { GlobalStore } from "@/stores";
import ThemeDrawer from "@/layouts/admin-layout/components/ThemeDrawer/index.vue";
import LayoutVertical from "@/layouts/admin-layout/LayoutVertical/index.vue";
import LayoutClassic from "@/layouts/admin-layout/LayoutClassic/index.vue";
import LayoutTransverse from "@/layouts/admin-layout/LayoutTransverse/index.vue";
import LayoutColumns from "@/layouts/admin-layout/LayoutColumns/index.vue";

const LayoutComponents: { [key: string]: Component } = {
	vertical: LayoutVertical,
	classic: LayoutClassic,
	transverse: LayoutTransverse,
	columns: LayoutColumns
};

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
