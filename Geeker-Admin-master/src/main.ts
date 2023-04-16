import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark(自定义暗黑模式)
import "@/styles/theme/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers/index";
// vue i18n
import I18n from "@/languages/index";
// pinia store
import pinia from "@/stores/index";
// svg icons
import "virtual:svg-icons-register";
// errorHandler
import errorHandler from "@/utils/errorHandler";
import "@/assets/styles/index.scss"; // global css

import "uno.css";

import plugins from "./plugins"; // plugins

import { parseTime, resetForm, addDateRange, handleTree } from "@/utils/ruoyi";
// 分页组件
import Pagination from "@/components/Pagination/index.vue";
// 自定义树选择组件
import TreeSelect from "@/components/TreeSelect/index.vue";
// 字典标签组件
import DictTag from "@/components/DictTag/index.vue";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar/index.vue";

const app = createApp(App);

app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.resetForm = resetForm;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.addDateRange = addDateRange;

// 全局组件挂载
app.component("DictTag", DictTag);
app.component("Pagination", Pagination);
app.component("TreeSelect", TreeSelect);
app.component("RightToolbar", RightToolbar);

app.config.errorHandler = errorHandler;

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router).use(I18n).use(pinia).use(directives).use(ElementPlus).use(plugins).mount("#app");
