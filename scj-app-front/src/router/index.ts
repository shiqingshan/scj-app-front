import {RouteRecordRaw, createRouter,createWebHistory} from 'vue-router';
const routes:Array<RouteRecordRaw> =[{
    path: '/',
    name: 'index',
    redirect: 'home',
    component: ()=> import("@/layouts/HomeLayout.vue"),
    children:[
        {
            path: 'home',
            name: 'home',
            component: ()=> import("@/views/home/index.vue")
        }
    ],
},
{
    path: '/admin',
    name: 'admin',
    redirect: 'admin/adminHome',
    component: ()=> import("@/layouts/admin-layout/index.vue"),
    children:[
        {
            path: 'adminHome',
            name: 'adminHome',
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
    routes
})

export default router