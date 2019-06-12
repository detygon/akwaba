import { AuthLayout, DefaultLayout } from './layouts'

export const publicRoute = [
  {
    path: '/auth',
    component: AuthLayout,
    meta: { title: 'Login' },
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { title: 'Login' },
        component: () => import('./views/auth/login.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('./views/error/not-found.vue'),
  },
]

export const protectedRoute = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { title: 'Home' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard', group: 'main', icon: 'dashboard' },
        component: () => import('./views/dashboard.vue'),
      },
    ],
  },
  {
    path: '/forms',
    component: DefaultLayout,
    meta: { title: 'Forms' },
    redirect: { name: 'forms' },
    children: [
      {
        path: 'all',
        meta: { title: 'List forms', group: 'form', icon: 'dashboard' },
        name: 'forms',
        component: () => import('./views/form/form-list.vue'),
      },
      {
        path: 'builder',
        meta: { title: 'Form builder', group: 'form', icon: 'dashboard' },
        name: 'form-builder',
        hidden: true,
        component: () => import('./views/form/form-builder.vue'),
      },
      {
        path: ':id/fill',
        meta: { title: 'Add data', group: 'form', icon: 'dashboard' },
        name: 'data-entry',
        hidden: true,
        component: () => import('./views/data-entry.vue'),
      },
      {
        path: ':id',
        meta: { title: 'Check data', group: 'form', icon: 'dashboard' },
        name: 'data-list',
        hidden: true,
        component: () => import('./views/data-list.vue'),
      },
    ],
  },
  {
    path: '/statistics',
    component: DefaultLayout,
    meta: { title: 'Statistics' },
    redirect: { name: 'statistics' },
    children: [
      {
        path: 'explore',
        meta: { title: 'Explore dataset', group: 'form', icon: 'dashboard' },
        name: 'statistics',
        hidden: true,
        component: () => import('./views/statistics.vue'),
      },
    ],
  },
]
