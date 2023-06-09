import { RouteRecordRaw } from "vue-router";
import { ADMIN_HOME_URL, LOGIN_URL } from "@/config/config";

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/app/home"
	},
	{
		path: "/admin",
		redirect: ADMIN_HOME_URL
	},
	{
		path: LOGIN_URL,
		name: "adminLogin",
		component: () => import("@/views/admin/login/index.vue"),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/layout",
		name: "layout",
		component: () => import("@/layouts/admin-layout/index.vue"),
		// component: () => import("@/layouts/indexAsync.vue"),
		redirect: ADMIN_HOME_URL,
		children: []
	}
];

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
	{
		path: "/403",
		name: "403",
		component: () => import("@/components/ErrorMessage/403.vue"),
		meta: {
			title: "403页面"
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/ErrorMessage/404.vue"),
		meta: {
			title: "404页面"
		}
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/components/ErrorMessage/500.vue"),
		meta: {
			title: "500页面"
		}
	},
	// 解决刷新页面，路由警告
	{
		path: "/:pathMatch(.*)*",
		component: () => import("@/components/ErrorMessage/404.vue")
	}
];
