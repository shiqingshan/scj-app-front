<template>
	<el-menu
		:default-active="activeIndex"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b"
		mode="horizontal"
		:ellipsis="false"
		:router="true"
		@select="handleSelect"
	>
		<el-menu-item>
			<img src="@/assets/images/logo.svg" alt="logo" />
			<span>SCJ</span>
		</el-menu-item>

		<el-menu-item index="home">首页</el-menu-item>
		<el-menu-item index="joblist">职位</el-menu-item>
		<el-menu-item index="companylist">公司</el-menu-item>
		<div class="flex-grow" />
		<el-menu-item index="4">上传简历</el-menu-item>
		<el-menu-item index="5">我要找工作</el-menu-item>
		<el-menu-item index="6">我要招聘</el-menu-item>
		<li style="margin-top: 10px">
			<el-button info round @click="toLogin()">注册/登录</el-button>
		</li>
	</el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMainHeader } from "@/stores/modules/app/mainHeader";

const router = useRouter();
const activeIndex = ref("1");
const mainHeader = useMainHeader();
const handleSelect = (key: string, keyPath: string[]) => {
	mainHeader.headerState = key;
	console.log(key, keyPath);
};
const toLogin = () => {
	router.push("/login");
};
</script>
