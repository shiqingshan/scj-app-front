import {RouteRecordRaw, createRouter,createWebHistory} from 'vue-router';
import {adminRouters} from './admin/index'
const routes:Array<RouteRecordRaw> =[{
    path: '/',
    name: 'index',
    redirect: 'home',
    component: ()=> import("@/layouts/app-layout/HomeLayout.vue"),
    children:[
        {
            path: 'home',
            name: 'home',
            component: ()=> import("@/views/home/index.vue")
        }
    ],
},
{
    path: '/login',
    name: 'login',
    component: ()=> import('@/views/login/Login.vue')
},
{
    path: '/register',
    name: 'register',
    component: ()=> import('@/views/register/Register.vue')
}
]
const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...adminRouters],
})

export default router