import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import 'element-plus/dist/index.css';
import {createPinia} from 'pinia'
const store = createPinia()
// main.ts
import 'uno.css'

createApp(App).use(router).use(store).mount("#app");
