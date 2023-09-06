import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    name: 'auth',
    component: () => import('./views/Index.vue'),
    meta: {
      layout: 'default',
    },
  },
] as RouteRecordRaw[];
