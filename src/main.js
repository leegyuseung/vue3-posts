import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import funcPlugins from "./plugins/func";
import objPlugins from "./plugins/obj";
import person from "./plugins/person";
const app = createApp(App);
app.use(objPlugins, { name: "lee" });
app.use(funcPlugins);
app.use(person, { name: "홍길동" });
app.use(router);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";

// 어떤 모드인지 출력
// console.log("MODE:", import.meta.env.MODE);
// console.log("MODE:", import.meta.env.BASE_URL);
// Production모드이면 true
// console.log("MODE:", import.meta.env.PROD);
// Dev 모드면 true
// console.log("MODE:", import.meta.env.DEV);

// console.log("VITE_APP_API_URL", import.meta.env.VITE_APP_API_URL);
