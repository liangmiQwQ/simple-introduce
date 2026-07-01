import { createRouter, createWebHistory } from 'vue-router'
import SvgPage from './pages/SvgPage.vue'

const routes = [
  { path: '/', redirect: '/svg' },
  { path: '/svg', component: SvgPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
