// 定义vue 路由的文件，路由就是控制各个链接对应的跳转方式
// import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// 引入Vue组件，这些组件将被映射到特定的路由
import Home from '../components/index.vue'   //声明每个组件对应的链接
import Create from '../components/create.vue'
import Mate from '../components/mateNew.vue'
import Test from '../components/test.vue'
import Login from '../components/login.vue'
import History from '../components/history.vue'
import Recommend from '../components/recommend.vue'
import tets2 from '../components/test2.vue'
import Header from '../components/header.vue'
// 定义路由数组，每个对象代表一个路由规则
const routes = [
  { path: '/', component: tets2 },
  {
    path: '/create/:initialRefImg?/:initialSrcImg?',
    name: 'Create',
    component: Create,
    props: true  // 启用 props 将路由参数作为 props 传递给组件
  },
  { path: '/mate', component: Mate },
  {
    path: '/test/:initialSrcImg?',
    name: 'Test',
    component: Test,
    props: true  // 启用 props 将路由参数作为 props 传递给组件
  },
  { path: '/login', component: Login },
  { path: '/history', component: History },
  { path: '/recommend', component: Recommend },
  { path: '/header', component: Header }
  // { path: '/tets2', component: tets2 }
]

// 创建路由器实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导出路由器实例，使其可以在其他部分（如main.js）中引用并使用
export default router
