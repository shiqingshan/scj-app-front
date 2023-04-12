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
				component: () => import("@/views/admin/home/index.vue")
			}
		],
		meta: {
			icon: "HomeFilled",
			title: "首页",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: true,
			isKeepAlive: true
		}
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
