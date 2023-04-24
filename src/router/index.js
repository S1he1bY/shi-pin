// 配置路由
import { createRouter,createWebHashHistory,createWebHistory } from "vue-router";

//引入组件
import Home from '../views/HomeView.vue'
import Index from '../views/IndexView.vue'

// 路由映射
const routes = [
    {
        path:'',
        component:Index,
        redirect:'/home',
        children:[
            {
                path:'/home',
                component:Home,
            },
            {
                path:'/search',
                component:()=>import('../views/SearchView.vue')
            },
            {
                path:'/note',
                component:()=>import('../views/NoteView.vue')
            },
            {
                path:'/user',
                component:()=>import('../views/UserView.vue')
            }
        ]
    },
    {
        path:"/play",
        component:()=>import('../views/PlayView.vue'),
    },
    {
        path:"/searcheffect",
        component:()=>import('../views/SearchEffect.vue'),
    },
    {
        path:"/login",
        component:()=>import('../views/LoginView.vue'),
    },
    {
        path:"/register",
        component:()=>import('../views/RegisterView.vue'),
    },
    {
        path:'/notecontent',
        component:()=>import('../views/NoteContent.vue')
    }
]

//创建路由实例对象
const router = createRouter({
    routes,
    history:createWebHashHistory()
})
export default router