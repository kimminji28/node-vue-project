import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
//Pinia 설치(김경환 2026.03.25) (추후 pull merge 후 client install 바람)
import { createPinia } from "pinia";
const pinia = createPinia();

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(pinia);
appInstance.mount("#app");
