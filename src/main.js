import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import cors from 'cors';
import BeatLoader from 'vue-spinner/src/BeatLoader.vue';
import firebase from "firebase/compat/app";
import VueCookies from 'vue-cookies';

const firebaseConfig = {
    apiKey: "AIzaSyCBAEISxcDsr4NI5U80wNs6MeRFWP539HM",
    authDomain: "weview-1ed87.firebaseapp.com",
    projectId: "weview-1ed87",
    storageBucket: "weview-1ed87.appspot.com",
    messagingSenderId: "15269608390",
    appId: "1:15269608390:web:14dcb54e7255c0660e50c7",
    measurementId: "G-N254P2ESRP"
};

firebase.initializeApp(firebaseConfig);

createApp(App)
    .use(router)
    .use(cors)
    .use(VueCookies)
    .component('beat-loader', BeatLoader)
    .mount('#app')
