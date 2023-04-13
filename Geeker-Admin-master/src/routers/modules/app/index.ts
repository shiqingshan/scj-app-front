import { RouteRecordRaw } from "vue-router";

export const appRouters: RouteRecordRaw[] = [
	{
		path: "/app",
		name: "appLayout",
		redirect: "/app/home",
		component: () => import("@/layouts/app-layout/HomeLayout.vue"),
		children: [
			{
				path: "home",
				name: "appHome",
				component: () => import("@/views/app/home/index.vue")
			},
			{
				path: "joblist",
				name: "joblist",
				component: () => import("@/views/app/job/list/index.vue")
			},
			{
				path: "jobdetail",
				name: "jobdetail",
				component: () => import("@/views/app/job/detail/index.vue")
			},
			{
				path: "companylist",
				name: "companylist",
				component: () => import("@/views/app/company/list/index.vue")
			}
		]
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/app/login/Login.vue")
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/app/register/Register.vue")
	}
];
