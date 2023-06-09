import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import 'element-plus/theme-chalk/dark/css-vars.css'
axios.defaults.baseURL = 'http://127.0.0.1:8080/';
const baseURL  = 'http://127.0.0.1:8080/';

const app = createApp(App)
app.use(router)
app.use(ElementPlus)

app.config.globalProperties.$http = axios
// app.config.globalProperties.$http = axios;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
