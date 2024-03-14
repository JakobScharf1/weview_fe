import { createRouter, createWebHistory } from "vue-router";
import SSOLogin from "@/components/SSOLogin.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: SSOLogin
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router