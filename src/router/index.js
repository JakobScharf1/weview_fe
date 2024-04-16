import { createRouter, createWebHistory } from "vue-router";
import SSOLogin from "@/components/SSOLogin.vue";
import HomeDashboard from "@/components/HomeDashboard.vue";
import ChooseViewType from "@/components/ChooseViewType.vue";
import DataUpload from "@/components/DataUpload.vue";
import ContactData from "@/components/ContactData.vue";
import InfoData from "@/components/InfoData.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
            component: ChooseViewType,
        },
        {
            path: '/dataUpload',
            component: DataUpload
        },
        {
            path: '/contactData',
            component: ContactData
        },
        {
            path: '/infoData',
            component: InfoData
        }
    ]
})

export default router