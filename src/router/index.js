import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/collections', component: () => import('@/views/CollectionView.vue') },
    {
      path: '/collections/:collection',
      component: () => import('@/views/CardsView.vue'),
      name: 'cardsView',
    },
    { path: '/training', component: () => import('@/views/TrainingView.vue') },
  ],
})

export default router
