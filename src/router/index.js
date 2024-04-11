import { createRouter, createWebHistory } from "vue-router";
import SSOLogin from "@/components/SSOLogin.vue";
import HomeDashboard from "@/components/HomeDashboard.vue";
import ChooseViewType from "@/components/ChooseViewType.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: SSOLogin
    },
    {
        path: '/home',
        component: HomeDashboard
    },
    {
        path: '/chooseViewType',
        component: ChooseViewType
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router