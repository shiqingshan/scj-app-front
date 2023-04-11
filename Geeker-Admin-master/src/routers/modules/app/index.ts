import { RouteRecordRaw } from "vue-router";

export const appRouters: RouteRecordRaw[] = [
	{
		path: "/home/index",
		name: "home",
		component: () => import("@/views/home/index.vue"),
		meta: {
			icon: "HomeFilled",
			title: "首页",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: true,
			isKeepAlive: true
		}
	}
];
