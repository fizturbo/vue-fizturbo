import { createRouter, createWebHistory } from 'vue-router'
import DiagnosisView from '@/views/DiagnosisView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DiagnosisView
    }
  ]
})