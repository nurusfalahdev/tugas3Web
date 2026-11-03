import DashboardView from '@/views/dashboardView.vue'
import TrackingDoView from '@/views/trackingDoView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/td',
      name: 'tracking',
      component: TrackingDoView,
    },
  ],
})

export default router
