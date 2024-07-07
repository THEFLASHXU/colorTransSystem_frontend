// 导入根组件App.vue，这是所有子组件的父容器
import './assets/main.scss'
import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import ElementPlus from 'element-plus'
import locale from 'element-plus/dist/locale/zh-cn.js'
import './style.css'
// 使用createApp函数创建一个新的Vue应用实例，并将根组件App作为参数传递给它
const app = createApp(App)
const pinia = createPinia();
const persist = createPersistedState();

pinia.use(persist)
app.use(pinia)
// 使用app.use()方法安装路由功能。这允许Vue应用使用Vue Router进行页面导航
app.use(router)
app.use(ElementPlus, { locale });
// 将Vue应用实例挂载到DOM上，'#app'是index.html中一个已存在的DOM元素的ID
app.mount('#app')
