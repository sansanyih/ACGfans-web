// import { createRouter, createWebHistory } from 'vue-router'
// import { routerArray } from './router'
// import { useUserStore } from '@/stores/user'

// const router = createRouter({
//    history: createWebHistory(import.meta.env.BASE_URL),
//    routes: routerArray
// })

// // 导航守卫
// router.beforeEach((to, from, next) => {
//    const userStore = useUserStore()
   
//    // 设置页面标题
//    document.title = to.meta.title ? `${to.meta.title} - CnAcg` : 'CnAcg'
   
//    // 权限验证
//    if (to.meta.noAuth) {
//       // 不需要登录的页面
//       next()
//    } else if (!userStore.isLoggedIn && to.path !== '/login') {
//       // 未登录跳转到登录页
//       next('/login')
//    } else {
//       next()
//    }
// })

// // 路由滚动行为
// router.afterEach(() => {
//    window.scrollTo(0, 0)
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'
import { routerArray } from './router'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: routerArray,
   // 添加滚动行为
   scrollBehavior() {
      return { top: 0 }
   }
})

// 只设置标题，不强制登录
router.beforeEach((to) => {
   document.title = to.meta.title ? `${to.meta.title} - CnAcg` : 'CnAcg'
})

export default router

