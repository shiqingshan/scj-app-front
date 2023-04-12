import { RouteRecordRaw } from "vue-router";

export const adminRouters:Array<RouteRecordRaw>  = [
    {
        path: '/admin',
        name: 'admin',
        redirect: 'admin/adminHome',
        component: ()=> import("@/layouts/admin-layout/index.vue"),
        children:[
            {
                path: 'adminHome',
                name: 'adminHome',
                component: ()=> import("@/views/home/index.vue"),
                meta:{
                    isShow: true,
                    title: '首页',
                }
            },
            {
                path: 'system',
                name: 'system',
                component: ()=> import("@/views/home/index.vue"),
                meta:{
                    isShow: true,
                    title: '系统管理',
                }
            }
        ],
        meta: {
            isShow: false,
            accountType: 'admin'
        }
    },
]