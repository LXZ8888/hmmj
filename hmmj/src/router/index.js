import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import layout from '@/views/layout'
import dashboard from '@/views/dashboard'
import article from '@/views/article'
// 默认找的是index.vue，不是就在后面加上呗

// 导入然后设置
// 名字-组件-路径，儿子children
Vue.use(VueRouter)
const routes = [
  { name: login, path: '/login', component: login },
  {
    name: layout,
    path: '/',
    component: layout,
    children: [
      { name: dashboard, path: 'dashboard', component: dashboard },
      { name: article, path: 'article', component: article }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
