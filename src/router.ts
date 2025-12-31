import { createRouter, createWebHistory } from 'vue-router'
import { GifPage } from './pages/gif.vine'
import { SvgPage } from './pages/svg.vine'

const routes = [
  { path: '/', redirect: '/gif' },
  { path: '/gif', component: GifPage },
  { path: '/svg', component: SvgPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
