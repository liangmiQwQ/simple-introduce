import { createRouter, createWebHistory } from 'vue-router'
import GifPage from './pages/GifPage.vue'
import SvgPage from './pages/SvgPage.vue'

const routes = [
  { path: '/', redirect: '/svg' },
  { path: '/gif', component: GifPage },
  { path: '/svg', component: SvgPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
