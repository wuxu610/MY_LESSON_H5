//main.js
import 'element-plus/dist/index.css' //引入element-plus 样式
import router from './router'
import {createPinia} from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const pinia=createPinia()

const app=createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
