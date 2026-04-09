import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/view/Home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/articles/index/:id',
      name: 'ArticleDetail',
      component: () => import('@/view/ArticleDetail/index.vue')
    }
  ],
})

export default router

