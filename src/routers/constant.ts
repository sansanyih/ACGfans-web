import { createRouter } from "vue-router";

export const constantRoutes = [
  {
    path: '/login',                    // URL路径
    name: 'Login',                     // 路由名称
    component: () => import('@/view/login/index.vue'),  // 懒加载组件
    hidden: true                       // 不在侧边菜单显示
  },
  {
    path: '/404',
    component: () => import('@/view/error/index.vue'),
    hidden: true
  },
  {
    path: '/',                         // 首页重定向
    redirect: '/dashboard',            // 访问/自动跳转到/dashboard
    hidden: true
  }
]
