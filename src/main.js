import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/main.css";

const app = createApp(App);

app.config.globalProperties.$hostname = "http://127.0.0.1:8000";
app.use(router);
app.use(VueAxios, axios);

app.mount("#app");
