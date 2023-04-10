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
    path: '/login',
    name: 'login',
    component: ()=> import('@/views/login/Login.vue')
}
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router