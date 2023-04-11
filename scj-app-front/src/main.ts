import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import 'element-plus/dist/index.css';
// custom element dark(自定义暗黑模式)
import "@/styles/theme/element-dark.scss";
// custom element css
import "@/styles/element.scss";
import {createPinia} from 'pinia'
const store = createPinia()
// main.ts
import 'uno.css'

createApp(App).use(router).use(store).mount("#app");
