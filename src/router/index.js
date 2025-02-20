import { createRouter, createWebHistory } from "vue-router";
import SSOLogin from "@/components/SSOLogin.vue";
import HomeDashboard from "@/components/HomeDashboard.vue";
import ChooseViewType from "@/components/ChooseViewType.vue";
import DataUpload from "@/components/DataUpload.vue";
import ContactData from "@/components/ContactData.vue";
import InfoData from "@/components/InfoData.vue";
import GeneratingSuccess from "@/components/GeneratingSuccess.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: SSOLogin,
            name: 'Login | WeView'
        },
        {
            path: '/home',
            component: HomeDashboard,
            name: 'Dashboard | WeView'
        },
        {
            path: '/chooseViewType',
            component: ChooseViewType,
            name: 'View-Typ | WeView'
        },
        {
            path: '/dataUpload',
            component: DataUpload,
            name: 'Daten-Upload | WeView'
        },
        {
            path: '/contactData',
            component: ContactData,
            name: 'Kontaktdaten | WeView'
        },
        {
            path: '/infoData',
            component: InfoData,
            name: 'Zusatzinfos | WeView'
        },
        {
            path: '/success',
            component: GeneratingSuccess,
            name: 'WeView generiert | WeView'
        },
    ]
})

export default router