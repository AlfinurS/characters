import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axiosInstance from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import store from "./store";

const Vue = createApp(App);

export const axios = axiosInstance;
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

Vue.use(store as any);
Vue.use(router);
Vue.mount("#app");
