import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import ScheduleBuild from './views/Schedule.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/schedule',
    component: ScheduleBuild
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
