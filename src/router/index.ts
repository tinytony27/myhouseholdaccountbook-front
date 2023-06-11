import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { authorizeToken } from './guards';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import InputView from '@/views/InputView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/input',
    name: 'input',
    component: InputView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach(authorizeToken);

export default router
