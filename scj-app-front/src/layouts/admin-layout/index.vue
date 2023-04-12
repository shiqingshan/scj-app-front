<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<LayoutClassic/>
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from "vue";
import { GlobalStore } from "@/stores";
import LayoutClassic from "./LayoutClassic/index.vue";

const LayoutComponents: { [key: string]: Component } = {
	classic: LayoutClassic,
};

const globalStore = GlobalStore();
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
