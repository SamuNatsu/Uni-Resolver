/// Router module
import { Router, createRouter, createWebHashHistory } from 'vue-router';

/* Export router */
export const router: Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: (): Promise<typeof import('@/views/Index.vue')> =>
        import('@/views/Index.vue')
    },
    {
      path: '/resolver',
      component: (): Promise<typeof import('@/views/Resolver.vue')> =>
        import('@/views/Resolver.vue')
    }
  ]
});
