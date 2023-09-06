import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/fulfill-request',
    name: 'fulfill-request',
    component: () => import('./views/Index.vue'),
    meta: {
      layout: 'main',
      previousRoute: 'home',
      previousRouteTitle: 'function list',
      routeTitle: 'Fulfill Request'
    },
  },
] as RouteRecordRaw[];
