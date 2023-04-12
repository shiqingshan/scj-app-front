<!-- 经典布局 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="logo flx-center">
          <img src="@/assets/vue.svg" alt="logo" />
          <span>Geeker Admin</span>
        </div>
		<el-menu
							
							:router="false"
							:collapse="false"
							:collapse-transition="false"
							:unique-opened="true"
							background-color="#ffffff"
							text-color="#303133"
						>
							<SubMenu :menuList="menuItems" />
						</el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="layoutClassic">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {adminRouters} from "@/router/admin/index"
import { GlobalStore } from "@/stores";
import { useAuthStore } from "@/stores/modules/auth";
import Main from "@/layouts/admin-layout/components/Main/index.vue";
import SubMenu from "@/layouts/admin-layout/components/Menu/SubMenu.vue";
import ToolBarLeft from "@/layouts/admin-layout/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/admin-layout/components/Header/ToolBarRight.vue";

const route = useRoute();
const router = useRouter();
console.log(router.getRoutes());

let menuItems = adminRouters.filter(item => item.meta?.isShow) 
console.info(menuItems) 

const handleOpen = () => {};
const handleClose = () => {};
</script>

<style lang="scss">

</style>
