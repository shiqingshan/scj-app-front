<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<LayoutClassic/>
</template>

<script setup lang="ts" name="layout">
import { GlobalStore } from "@/stores";
import LayoutClassic from "./LayoutClassic/index.vue";


const globalStore = GlobalStore();
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
